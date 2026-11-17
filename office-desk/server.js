import "dotenv/config";
import express from "express";
import crypto from "node:crypto";
import { db, q, newId, hashPin, checkPin, ensureOwner, readPlan, savePlan } from "./lib/db.js";
import { chat } from "./lib/ai.js";
import { mailConfigured } from "./lib/mail.js";
import { buildDrafts, askOwner, sendPlan, suggestFor, startScheduler } from "./lib/evening.js";
import { AREAS, MODULES } from "./public/content.js";
import { istDay, istDayStart, nextWorkDay } from "./lib/time.js";

ensureOwner({ name: process.env.OWNER_NAME, email: process.env.OWNER_EMAIL, password: process.env.OWNER_PASSWORD });

const app = express();
app.set("trust proxy", 1);
app.use(express.json({ limit: "200kb" }));
app.use(express.static("public", { extensions: ["html"] }));

/* ---------- sessions ---------- */
const COOKIE = "od_session";
const secure = (process.env.APP_URL || "").startsWith("https://");
function readCookie(req) {
  const m = (req.headers.cookie || "").match(new RegExp(`(?:^|; )${COOKIE}=([^;]+)`));
  return m ? decodeURIComponent(m[1]) : null;
}
function startSession(res, user) {
  const token = crypto.randomBytes(24).toString("base64url");
  q.insertSession.run(token, user.id, Date.now());
  res.setHeader("Set-Cookie", `${COOKIE}=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${60 * 60 * 24 * 60}${secure ? "; Secure" : ""}`);
}
app.use((req, _res, next) => {
  const t = readCookie(req);
  req.user = t ? q.session.get(t) : null;
  next();
});
const need = (...kinds) => (req, res, next) =>
  !req.user ? res.status(401).json({ error: "Please sign in." }) :
  kinds.length && !kinds.includes(req.user.kind) ? res.status(403).json({ error: "Not allowed." }) : next();
const publicUser = (u) => u && { id: u.id, kind: u.kind, name: u.name, email: u.email, phone: u.phone, area: u.area };

/* ---------- simple rate limits ---------- */
const hits = new Map();
function limited(key, max, windowMs) {
  const now = Date.now();
  const arr = (hits.get(key) || []).filter((t) => now - t < windowMs);
  arr.push(now);
  hits.set(key, arr);
  return arr.length > max;
}

/* ---------- auth ---------- */
const cleanPhone = (p) => String(p || "").replace(/[^\d+]/g, "").replace(/^\+?91(?=\d{10}$)/, "");
const okPin = (p) => /^\d{4,8}$/.test(String(p || ""));

app.post("/api/login", (req, res) => {
  if (limited("login:" + req.ip, 10, 10 * 60e3)) return res.status(429).json({ error: "Too many attempts. Wait 10 minutes and try again." });
  const { id, pin } = req.body || {};
  const ident = String(id || "").trim();
  const user = ident.includes("@") ? q.userByEmail.get(ident) : q.userByPhone.get(cleanPhone(ident));
  if (!user || !user.active || !checkPin(pin, user.pin_hash)) return res.status(401).json({ error: "That email/phone and PIN don't match." });
  startSession(res, user);
  res.json({ user: publicUser(user) });
});

app.post("/api/register", (req, res) => {
  if (limited("reg:" + req.ip, 5, 60 * 60e3)) return res.status(429).json({ error: "Too many sign-ups from this network. Try again later." });
  const name = String(req.body?.name || "").trim().slice(0, 80);
  const phone = cleanPhone(req.body?.phone);
  const email = String(req.body?.email || "").trim().slice(0, 120) || null;
  const pin = String(req.body?.pin || "");
  if (!name) return res.status(400).json({ error: "Enter your name or business name." });
  if (!/^\d{10}$/.test(phone)) return res.status(400).json({ error: "Enter a 10-digit mobile number." });
  if (!okPin(pin)) return res.status(400).json({ error: "Choose a PIN of 4 to 8 digits." });
  if (q.userByPhone.get(phone)) return res.status(409).json({ error: "This number is already registered. Sign in instead." });
  if (email && q.userByEmail.get(email)) return res.status(409).json({ error: "This email is already registered. Sign in instead." });
  const id = newId();
  q.insertUser.run(id, "client", name, email, phone, "", hashPin(pin), Date.now());
  const user = q.userById.get(id);
  startSession(res, user);
  res.json({ user: publicUser(user) });
});

app.post("/api/logout", (req, res) => {
  const t = readCookie(req);
  if (t) q.deleteSession.run(t);
  res.setHeader("Set-Cookie", `${COOKIE}=; Path=/; Max-Age=0`);
  res.json({ ok: true });
});

app.get("/api/me", (req, res) => {
  if (!req.user) return res.json({ user: null });
  const training = Object.fromEntries(q.myTraining.all(req.user.id).map((t) => [t.module, { score: t.score, at: t.at }]));
  res.json({ user: publicUser(req.user), training });
});

/* ---------- chat ---------- */
app.post("/api/chat", need(), async (req, res) => {
  const max = req.user.kind === "client" ? 20 : 60;
  if (limited("chat:" + req.user.id, max, 60 * 60e3)) return res.status(429).json({ error: "You've asked a lot this hour. Please wait a little and try again." });
  const history = (Array.isArray(req.body?.messages) ? req.body.messages : [])
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .slice(-16)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 6000) }));
  while (history.length && history[0].role !== "user") history.shift();
  if (!history.length || history.at(-1).role !== "user") return res.status(400).json({ error: "Send a question." });

  res.setHeader("Content-Type", "application/x-ndjson; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("X-Accel-Buffering", "no");
  const send = (o) => res.write(JSON.stringify(o) + "\n");
  try {
    const answer = await chat({
      user: req.user,
      history,
      onText: (d) => send({ t: "text", d }),
      onNote: (d) => send({ t: "note", d }),
      record: (u) => addLog(req.user, { ...u, via: "chat" }),
    });
    q.insertAsk.run(req.user.id, Date.now(), history.at(-1).content.slice(0, 1000), answer.slice(0, 2000));
    send({ t: "done" });
  } catch (err) {
    console.error("[chat]", err.status || "", err.message);
    send({ t: "error", d: err.status === 429 ? "The assistant is busy right now. Try again in a minute." : "The assistant could not answer just now. Try again in a moment." });
  }
  res.end();
});

/* ---------- work log ---------- */
const AREA_KEYS = AREAS.map((a) => a[0]);
function addLog(user, { area, client, text, status, next, via }) {
  const entry = {
    id: newId(), user_id: user.id, ts: Date.now(), day: istDay(),
    area: AREA_KEYS.includes(area) ? area : "other",
    client: String(client || "").slice(0, 120), text: String(text).slice(0, 1000),
    status: ["done", "in-progress", "blocked"].includes(status) ? status : "done",
    next: String(next || "").slice(0, 300), via: via || "form",
  };
  q.insertLog.run(entry.id, entry.user_id, entry.ts, entry.day, entry.area, entry.client, entry.text, entry.status, entry.next, entry.via);
  return entry;
}
app.get("/api/logs", need(), (req, res) => res.json({ logs: q.myLogs.all(req.user.id) }));
app.post("/api/logs", need(), (req, res) => {
  const text = String(req.body?.text || "").trim();
  if (!text) return res.status(400).json({ error: "Write what was done." });
  const client = req.user.kind === "client" ? req.user.name : req.body.client;
  res.json({ entry: addLog(req.user, { ...req.body, client, text }) });
});

/* ---------- training ---------- */
app.post("/api/training", need("employee", "owner"), (req, res) => {
  const { module, score } = req.body || {};
  if (!MODULES.some((m) => m.id === module)) return res.status(400).json({ error: "Unknown module." });
  q.upsertTraining.run(req.user.id, module, Math.max(0, Math.min(3, Number(score) || 0)), Date.now());
  res.json({ ok: true });
});

/* ---------- my plan (employees) ---------- */
app.get("/api/my-plan", need(), (req, res) => {
  const days = [istDay(), nextWorkDay()];
  res.json({
    plans: days.map((day) => {
      const p = readPlan(day);
      const mail = p.emails.find((m) => m.userId === req.user.id);
      return { day, text: p.status === "sent" && mail ? mail.body : (p.items[req.user.id] || ""), note: p.note, sent: p.status === "sent" };
    }),
  });
});

/* ---------- office (owner) ---------- */
app.get("/api/office", need("owner"), (req, res) => {
  const today = istDay();
  const planDay = nextWorkDay();
  const recent = q.logsSince.all(Date.now() - 14 * 864e5);
  const latest = new Map();
  [...recent].reverse().forEach((l) => latest.set(`${l.user_id}|${l.client}|${l.area}`, l));
  const training = {};
  q.allTraining.all().forEach((t) => ((training[t.user_id] ||= {})[t.module] = t.score));
  res.json({
    today, planDay,
    todayLogs: recent.filter((l) => l.ts >= istDayStart(today)),
    open: [...latest.values()].filter((l) => l.status !== "done").sort((a, b) => b.ts - a.ts).slice(0, 30),
    asks: q.clientAsks.all(),
    team: q.employees.all().map((e) => ({ ...e, training: training[e.id] || {} })),
    clients: q.clients.all().slice(0, 50),
    plan: readPlan(planDay),
    mailConfigured: mailConfigured(),
    reviewTime: process.env.REVIEW_TIME || "18:30",
  });
});

app.put("/api/team", need("owner"), (req, res) => {
  const list = Array.isArray(req.body?.team) ? req.body.team : [];
  for (const t of list) {
    const name = String(t.name || "").trim().slice(0, 80);
    const email = String(t.email || "").trim().slice(0, 120);
    if (!name) continue;
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: `Check the email for ${name}.` });
    if (t.pin && !okPin(t.pin)) return res.status(400).json({ error: `PIN for ${name} must be 4 to 8 digits.` });
    const clash = email && q.userByEmail.get(email);
    if (clash && clash.id !== t.id) return res.status(409).json({ error: `${email} is already used by another account.` });
    if (t.id && q.userById.get(t.id)?.kind === "employee") {
      const fields = ["name = ?", "email = ?", "area = ?", "active = ?"];
      const vals = [name, email || null, String(t.area || "").slice(0, 80), t.active === false ? 0 : 1];
      if (t.pin) { fields.push("pin_hash = ?"); vals.push(hashPin(t.pin)); }
      db.prepare(`UPDATE users SET ${fields.join(", ")} WHERE id = ?`).run(...vals, t.id);
    } else {
      if (!t.pin) return res.status(400).json({ error: `Set a PIN for ${name} so they can sign in.` });
      q.insertUser.run(newId(), "employee", name, email || null, null, String(t.area || "").slice(0, 80), hashPin(t.pin), Date.now());
    }
  }
  res.json({ team: q.employees.all() });
});

app.put("/api/plan", need("owner"), (req, res) => {
  const day = nextWorkDay();
  const cur = readPlan(day);
  const items = typeof req.body?.items === "object" && req.body.items ? req.body.items : cur.items;
  const emails = Array.isArray(req.body?.emails) ? req.body.emails.map((m) => ({ ...cur.emails.find((c) => c.userId === m.userId), subject: String(m.subject || ""), body: String(m.body || "") })) : cur.emails;
  savePlan(day, { items, note: String(req.body?.note ?? cur.note), status: cur.status === "sent" ? "sent" : cur.status, emails });
  res.json({ plan: readPlan(day) });
});

app.get("/api/plan/suggest", need("owner"), (_req, res) => {
  res.json({ items: Object.fromEntries(q.activeEmployees.all().map((e) => [e.id, suggestFor(e.id)])) });
});

app.post("/api/plan/draft", need("owner"), async (_req, res) => {
  try { res.json({ plan: await buildDrafts(nextWorkDay()) }); }
  catch (err) { console.error(err); res.status(500).json({ error: "Could not draft the emails. Check the Claude API key." }); }
});

app.post("/api/plan/send", need("owner"), async (_req, res) => {
  const day = nextWorkDay();
  try {
    let plan = readPlan(day);
    if (!plan.emails.length) plan = await buildDrafts(day);
    const r = await sendPlan(day);
    res.json({ ...r, plan: readPlan(day) });
  } catch (err) { console.error(err); res.status(500).json({ error: "Sending failed. Check the email settings in .env." }); }
});

app.post("/api/plan/ask-me", need("owner"), async (_req, res) => {
  try { const day = nextWorkDay(); if (!readPlan(day).emails.length) await buildDrafts(day); await askOwner(day); res.json({ ok: true }); }
  catch (err) { console.error(err); res.status(500).json({ error: "Could not send the review email." }); }
});

const PORT = Number(process.env.PORT || 3000);
app.listen(PORT, () => {
  console.log(`Office Desk running on http://localhost:${PORT}`);
  if (!process.env.ANTHROPIC_API_KEY) console.warn("ANTHROPIC_API_KEY is not set: the chatbot and email drafts will not work.");
  if (!mailConfigured()) console.warn("SMTP is not set: emails will be saved to data/outbox instead of being sent.");
  startScheduler();
});
