import { AREAS, AREA_NAME, MODULES } from "./content.js";
import { TOPICS, FAQ, UPDATE_WORDS, TECH_WORDS, searchFaq } from "./faq.js";

/* ---------------- Helpers ---------------- */
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const istDay = (d = new Date()) => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(d);
const istHuman = (day) => new Date(day + "T12:00:00+05:30").toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", timeZone: "Asia/Kolkata" });
const istTime = (ts) => new Date(ts).toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "2-digit" });
const istWhen = (ts) => (istDay(new Date(ts)) === istDay() ? istTime(ts) : istHuman(istDay(new Date(ts))));
const ls = {
  get(k, f) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : f; } catch { return f; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};
let toastTimer;
function toast(t) {
  let el = $(".toast");
  if (!el) { el = document.createElement("div"); el.className = "toast"; el.setAttribute("role", "status"); document.body.append(el); }
  el.textContent = t; el.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => (el.hidden = true), 2800);
}
async function api(path, opts = {}) {
  const res = await fetch(path, { method: opts.body ? "POST" : "GET", ...opts, headers: { "Content-Type": "application/json" }, body: opts.body ? JSON.stringify(opts.body) : undefined });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401 && path !== "/api/login") { S.user = null; renderAll(); }
  if (!res.ok) throw new Error(data.error || "Something went wrong. Try again.");
  return data;
}

/* ---------------- State ---------------- */
const S = { user: null, training: {}, logs: [], myPlans: [], office: null };
const role = () => S.user?.kind || "";

/* ---------------- Routing ---------------- */
const VIEWS = ["login", "learn", "ask", "updates", "office"];
function route() {
  let v = location.hash.slice(1);
  if (!S.user) v = "login";
  else if (!VIEWS.includes(v) || v === "login" || (v === "office" && role() !== "owner") || (v === "learn" && role() === "client")) v = role() === "client" ? "ask" : role() === "owner" ? "office" : "learn";
  VIEWS.forEach((n) => ($("#view-" + n).hidden = n !== v));
  document.querySelectorAll("nav.tabs a").forEach((a) => (a.dataset.tab === v ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current")));
  if (v === "office") loadOffice();
}
addEventListener("hashchange", route);

/* ---------------- Sign in ---------------- */
$("#loginForm").addEventListener("submit", async (e) => {
  e.preventDefault(); $("#loginMsg").textContent = "";
  try { const r = await api("/api/login", { body: { id: $("#loginId").value, pin: $("#loginPin").value } }); $("#loginPin").value = ""; await loadMe(r.user); }
  catch (err) { $("#loginMsg").textContent = err.message; }
});
$("#registerForm").addEventListener("submit", async (e) => {
  e.preventDefault(); $("#regMsg").textContent = "";
  try {
    const r = await api("/api/register", { body: { name: $("#regName").value, phone: $("#regPhone").value, email: $("#regEmail").value, pin: $("#regPin").value } });
    $("#regPin").value = ""; await loadMe(r.user); location.hash = "ask"; toast("Welcome! Ask your first question.");
  } catch (err) { $("#regMsg").textContent = err.message; }
});
$("#logout").onclick = async () => { await api("/api/logout", { body: {} }).catch(() => {}); S.user = null; convo = []; ls.set("od.desk", []); location.hash = ""; renderAll(); };

async function loadMe() {
  const me = await api("/api/me");
  S.user = me.user; S.training = me.training || {};
  if (S.user) {
    const [l, p] = await Promise.all([api("/api/logs"), api("/api/my-plan")]);
    S.logs = l.logs; S.myPlans = p.plans;
  }
  renderAll();
}

/* ---------------- Training ---------------- */
let currentMod = ls.get("od.mod", "itr");
function renderModList() {
  const done = S.training;
  $("#modlist").innerHTML = MODULES.map((m) => `<button type="button" role="listitem" data-mod="${m.id}" aria-current="${m.id === currentMod}"><span>${esc(m.title)}</span><span class="tick ${done[m.id] ? "yes" : ""}">${done[m.id] ? "✓ " + done[m.id].score + "/3" : m.tag}</span></button>`).join("");
}
function renderLesson() {
  const m = MODULES.find((x) => x.id === currentMod) || MODULES[0];
  const n = MODULES.indexOf(m) + 1;
  $("#lesson").innerHTML = `
  <div class="stack" style="gap:6px"><span class="eyebrow">Module ${n} of ${MODULES.length} · ${esc(m.tag)}</span><h1>${esc(m.title)}</h1><p class="lede">${esc(m.intro)}</p></div>
  <section class="card"><h3>Step by step</h3><ol>${m.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol></section>
  <div class="grid2">
    <section class="card"><h3>${m.id === "billing" ? "Must be on every invoice" : "Checklist"}</h3><ul class="checklist">${m.docs.map((s) => `<li>${esc(s)}</li>`).join("")}</ul></section>
    <section class="card"><h3>Common mistakes</h3><ul>${m.mistakes.map((s) => `<li>${esc(s)}</li>`).join("")}</ul></section>
  </div>
  ${m.script ? `<section class="card"><h3>Call script</h3><div class="script">${esc(m.script)}</div></section>` : ""}
  <section class="card"><h3>Key dates and numbers</h3><div class="facts"><table><tbody>${m.facts.map(([a, b]) => `<tr><th scope="row">${esc(a)}</th><td>${esc(b)}</td></tr>`).join("")}</tbody></table></div><p class="small muted">Limits and dates change with each Budget and GST Council meeting. Confirm on the official portal before relying on them.</p></section>
  <section class="card quiz" id="quiz"><div class="row" style="justify-content:space-between"><h3>Check yourself</h3><span class="small muted mono" id="quizScore"></span></div>
    ${m.quiz.map((q, i) => `<div class="q" data-i="${i}"><strong>${i + 1}. ${esc(q.q)}</strong><div class="opts">${q.o.map((o, j) => `<button type="button" data-j="${j}">${esc(o)}</button>`).join("")}</div><p class="why" hidden>${esc(q.why)}</p></div>`).join("")}
  </section>
  <div class="row"><button type="button" class="ghost" id="askTutor">Ask the desk about ${esc(m.tag)}</button>${n < MODULES.length ? `<button type="button" class="quiet" id="nextMod">Next: ${esc(MODULES[n].title)}</button>` : ""}</div>`;
  const answers = {};
  $("#quiz").addEventListener("click", async (e) => {
    const b = e.target.closest(".opts button"); if (!b) return;
    const qd = b.closest(".q"), i = +qd.dataset.i; if (i in answers) return;
    const j = +b.dataset.j, right = m.quiz[i].a; answers[i] = j === right;
    qd.querySelectorAll("button").forEach((x, k) => { x.disabled = true; if (k === right) x.classList.add("right"); else if (k === j) x.classList.add("wrong"); });
    qd.querySelector(".why").hidden = false;
    const got = Object.values(answers).filter(Boolean).length;
    $("#quizScore").textContent = `${got} / ${Object.keys(answers).length}`;
    if (Object.keys(answers).length === m.quiz.length) {
      try { await api("/api/training", { body: { module: m.id, score: got } }); S.training[m.id] = { score: got }; renderModList(); toast(`Module saved: ${got}/3`); }
      catch (err) { toast(err.message); }
    }
  });
  $("#askTutor").onclick = () => { location.hash = "ask"; $("#askInput").value = `Explain ${m.title.toLowerCase()} with a worked example for a new team member.`; $("#askInput").focus(); };
  const nx = $("#nextMod"); if (nx) nx.onclick = () => selectMod(MODULES[n].id);
}
function selectMod(id) { currentMod = id; ls.set("od.mod", id); renderModList(); renderLesson(); window.scrollTo({ top: 0 }); }
$("#modlist").addEventListener("click", (e) => { const b = e.target.closest("button[data-mod]"); if (b) selectMod(b.dataset.mod); });

/* ---------------- Help desk (ready-made answers) ---------------- */
let OFFICE_EMAIL = "";
api("/api/config").then((c) => { OFFICE_EMAIL = c.officeEmail || ""; renderThread(); }).catch(() => {});
let convo = ls.get("od.desk", []);
const TOPIC_AREA = { itr: "itr", gst: "gst", notice: "drafting", trademark: "trademark", loans: "loans", docs: "docs", books: "accounting" };

function md(t) {
  const lines = esc(t).split("\n"); let out = "", list = null;
  const inline = (s) => s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  const close = () => { if (list) { out += `</${list}>`; list = null; } };
  for (const raw of lines) {
    const l = raw.trimEnd(); let m;
    if ((m = l.match(/^\s*[-•]\s+(.*)/))) { if (list !== "ul") { close(); out += "<ul>"; list = "ul"; } out += `<li>${inline(m[1])}</li>`; }
    else if ((m = l.match(/^\s*\d+[.)]\s+(.*)/))) { if (list !== "ol") { close(); out += "<ol>"; list = "ol"; } out += `<li>${inline(m[1])}</li>`; }
    else if (!l.trim()) close();
    else { close(); out += `<p>${inline(l)}</p>`; }
  }
  close(); return out;
}
const faqIndex = (f) => FAQ.indexOf(f);
const topicButtons = () => `<div class="chips">${TOPICS.map(([k, v]) => `<button type="button" data-topic="${k}">${esc(v)}</button>`).join("")}</div>`;
function emailBox(i, question) {
  const addr = esc(OFFICE_EMAIL || "the office email");
  return `<div class="mailbox stack"><p><strong>Please email this to the office</strong> and a team member will reply within one working day. Write your question below and press Send, or email <span class="mono">${addr}</span> yourself.</p>
    <label for="mq${i}">Your question<textarea id="mq${i}" data-mq="${i}" rows="3">${esc(question || "")}</textarea></label>
    <div class="row"><button type="button" data-send="${i}">Send to office</button><button type="button" class="quiet" data-copy="${i}">Copy email address</button>${OFFICE_EMAIL ? `<a class="small" href="mailto:${encodeURIComponent(OFFICE_EMAIL)}?subject=${encodeURIComponent("Question from " + (S.user?.name || "a client"))}&body=${encodeURIComponent(question || "")}">Open my email app</a>` : ""}</div></div>`;
}
function itemHTML(m, i) {
  if (m.role === "user") return `<div class="msg me">${esc(m.content).replace(/\n/g, "<br>")}</div>`;
  if (m.role === "note") return `<div class="msg note">${esc(m.content)}</div>`;
  let h = m.content ? md(m.content) : "";
  if (m.kind === "topics") h += topicButtons();
  if (m.kind === "questions") h += `<div class="qlist">${m.list.map((k) => `<button type="button" data-faq="${k}">${esc(FAQ[k].q)}</button>`).join("")}</div>`;
  if (m.related?.length) h += `<p class="small muted">Related questions</p><div class="qlist">${m.related.map((k) => `<button type="button" data-faq="${k}">${esc(FAQ[k].q)}</button>`).join("")}</div>`;
  if (m.email && !m.emailed) h += emailBox(i, m.question);
  if (m.emailed) h += `<p class="small" style="color:var(--ok)">Sent to the office. We'll reply by email or phone.</p>`;
  if (m.kind === "update" && !m.saved) h += `<div class="mailbox stack"><label for="ua${i}">Work area<select id="ua${i}" data-ua="${i}">${AREAS.map(([k, v]) => `<option value="${k}" ${k === m.area ? "selected" : ""}>${esc(v)}</option>`).join("")}</select></label><div class="row"><button type="button" data-save="${i}">Save as update</button><button type="button" class="quiet" data-search="${i}">No, find an answer instead</button></div></div>`;
  if (m.kind === "update" && m.saved) h += `<p class="small" style="color:var(--ok)">Saved. The team will see it today.</p>`;
  return `<div class="msg bot">${h}</div>`;
}
function greeting() {
  return { role: "bot", kind: "topics", content: role() === "client"
    ? `Namaste ${S.user?.name || ""}! Pick a topic or type your question. You can also type an update like “Sent bank statements for October”.`
    : "Pick a topic or type a question. Type what you finished (for example “Filed GSTR-1 for Sharma Traders”) to save it as an update." };
}
function renderThread() {
  const items = convo.length ? convo : [greeting()];
  $("#thread").innerHTML = items.map(itemHTML).join("");
}
function push(...items) { convo.push(...items); ls.set("od.desk", convo.slice(-60)); renderThread(); $("#thread").lastElementChild?.scrollIntoView({ block: "nearest" }); }
function showTopic(k) {
  const name = TOPICS.find((t) => t[0] === k)?.[1] || "";
  if (!convo.length) convo.push(greeting());
  push({ role: "user", content: name }, { role: "bot", kind: "questions", content: `Common questions about **${name}**:`, list: FAQ.map((f, i) => (f.topic === k ? i : -1)).filter((i) => i >= 0) });
}
function showAnswer(i, asked) {
  const f = FAQ[i];
  if (!convo.length) convo.push(greeting());
  const related = FAQ.map((g, j) => (g.topic === f.topic && j !== i ? j : -1)).filter((j) => j >= 0).slice(0, 3);
  push({ role: "user", content: asked || f.q }, { role: "bot", content: f.a, email: !!f.email, question: asked || f.q, related });
}
function answerTyped(text, skipUpdate) {
  const low = " " + text.toLowerCase() + " ";
  api("/api/asks", { body: { q: text, matched: "" } }).catch(() => {});
  if (!convo.length) convo.push(greeting());
  if (!skipUpdate && UPDATE_WORDS.some((w) => low.includes(" " + w))) {
    const guess = searchFaq(text, 1)[0];
    push({ role: "user", content: text }, { role: "bot", kind: "update", content: "Is this an update on your work? Save it so the team sees it.", text: text.replace(/^log:\s*/i, ""), area: TOPIC_AREA[guess?.topic] || "other" });
    return;
  }
  const hits = searchFaq(text);
  const tech = TECH_WORDS.some((w) => low.includes(w));
  if (tech) {
    push({ role: "user", content: text }, { role: "bot", content: "The answer depends on your own details, so a person at the office should reply to this.", email: true, question: text, related: hits.map(faqIndex) });
  } else if (hits.length) {
    const best = hits[0];
    push({ role: "user", content: text }, { role: "bot", content: `**${best.q}**\n\n${best.a}`, email: !!best.email, question: text, related: hits.slice(1).map(faqIndex) });
  } else {
    push({ role: "user", content: text }, { role: "bot", kind: "topics", content: "I don't have a ready answer for that. Please send it to the office, or pick a topic below.", email: true, question: text });
  }
}
$("#thread").addEventListener("input", (e) => {
  const i = e.target.dataset.mq; if (i !== undefined) convo[+i].question = e.target.value;
  const u = e.target.dataset.ua; if (u !== undefined) convo[+u].area = e.target.value;
});
$("#thread").addEventListener("change", (e) => { const u = e.target.dataset.ua; if (u !== undefined) convo[+u].area = e.target.value; });
$("#thread").addEventListener("click", async (e) => {
  const b = e.target.closest("button"); if (!b) return;
  const d = b.dataset;
  if (d.topic) showTopic(d.topic);
  else if (d.faq) showAnswer(+d.faq);
  else if (d.copy !== undefined) {
    try { await navigator.clipboard.writeText(OFFICE_EMAIL); toast("Email address copied"); } catch { toast(OFFICE_EMAIL); }
  } else if (d.send !== undefined) {
    const m = convo[+d.send]; b.disabled = true;
    try { await api("/api/ask-office", { body: { q: m.question } }); m.emailed = true; ls.set("od.desk", convo); renderThread(); toast("Sent to the office"); }
    catch (err) { toast(err.message); b.disabled = false; }
  } else if (d.save !== undefined) {
    const m = convo[+d.save]; b.disabled = true;
    try {
      const r = await api("/api/logs", { body: { area: m.area || "other", client: "", text: m.text, status: "done", next: "" } });
      S.logs.unshift(r.entry); renderMyEntries(); m.saved = true; ls.set("od.desk", convo); renderThread(); toast("Update saved");
    } catch (err) { toast(err.message); b.disabled = false; }
  } else if (d.search !== undefined) {
    const m = convo[+d.search]; m.saved = true; m.content = "OK, searching the answers instead."; m.kind = ""; answerTyped(m.text, true);
  }
});
function renderChips() { $("#chips").innerHTML = TOPICS.map(([k, v]) => `<button type="button" data-topic="${k}">${esc(v)}</button>`).join(""); }
$("#chips").addEventListener("click", (e) => { const b = e.target.closest("button[data-topic]"); if (b) showTopic(b.dataset.topic); });
$("#clearChat").onclick = () => { convo = []; ls.set("od.desk", convo); renderThread(); };
$("#askInput").addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); ask(); } });
$("#composer").addEventListener("submit", (e) => { e.preventDefault(); ask(); });
function ask() { const t = $("#askInput").value.trim(); if (!t) return; $("#askInput").value = ""; answerTyped(t); }

/* ---------------- Updates ---------------- */
$("#logArea").innerHTML = AREAS.map(([k, v]) => `<option value="${k}">${esc(v)}</option>`).join("");
function entryHTML(e, who) {
  return `<div class="entry"><span class="when">${esc(istWhen(e.ts))}</span><div class="what">${who ? `<strong>${esc(who)}</strong> · ` : ""}<span class="muted small">${esc(AREA_NAME[e.area] || e.area)}${e.client ? ` · ${esc(e.client)}` : ""}</span><br>${esc(e.text)}</div><span class="pill ${e.status}">${e.status === "in-progress" ? "in progress" : e.status}</span>${e.next ? `<div class="next">Next: ${esc(e.next)}</div>` : ""}</div>`;
}
function renderMyEntries() {
  $("#myEntries").innerHTML = S.logs.length ? S.logs.slice(0, 30).map((e) => entryHTML(e)).join("") : `<div class="empty">No updates yet. Add your first one above, or tell the desk in chat what you finished.</div>`;
}
$("#logForm").addEventListener("submit", async (ev) => {
  ev.preventDefault();
  const text = $("#logText").value.trim(); if (!text) return;
  try {
    const r = await api("/api/logs", { body: { area: $("#logArea").value, client: $("#logClient").value.trim(), text, status: $("#logStatus").value, next: $("#logNext").value.trim() } });
    S.logs.unshift(r.entry); renderMyEntries(); $("#logText").value = ""; $("#logNext").value = ""; toast("Update saved");
  } catch (err) { $("#logMsg").textContent = err.message; }
});
function renderMyPlan() {
  const r = role();
  $("#myPlanCard").hidden = r === "client";
  const parts = S.myPlans.map((p, i) => (p.text || p.note) ? `<div><span class="eyebrow">${i === 0 ? "Today" : "Next working day"} · ${esc(istHuman(p.day))}</span><p style="white-space:pre-wrap">${esc(p.text)}</p>${p.note ? `<p class="muted">${esc(p.note)}</p>` : ""}</div>` : "").join("");
  $("#myPlan").innerHTML = parts || `<p class="muted">The office sets each person's plan in the evening. It will show here and arrive by email.</p>`;
}
function renderProfile() {
  const r = role(), u = S.user;
  $("#profileView").innerHTML = !u ? "" : r === "owner" ? `Owner · ${esc(u.email)}` : r === "employee" ? `<strong>${esc(u.name)}</strong><br>${esc(u.email || "")}` : `<strong>${esc(u.name)}</strong><br>${esc(u.phone || "")}`;
  const isClient = r === "client";
  $("#updEyebrow").textContent = isClient ? "Client updates" : "Work log";
  $("#updTitle").textContent = isClient ? "Send an update to the office" : "My updates";
  $("#updLede").textContent = isClient ? "Tell us what you have sent, what you need, or anything that changed. The team sees it the same day." : "Record what you finished, what is still going on, and what is stuck. The office reads this every evening to plan the next day.";
  $("#logClientLabel").hidden = isClient;
  document.querySelector('a[data-tab="learn"]').hidden = isClient;
  document.querySelector('a[data-tab="updates"]').textContent = isClient ? "My updates" : "Work log";
  $("#officeTab").hidden = r !== "owner";
  $("nav.tabs").hidden = !u;
  $("#who").hidden = !u; $("#whoName").textContent = u?.name || "";
}

/* ---------------- Office (owner) ---------------- */
let teamDraft = null, planDraft = null, mailDraft = null;
async function loadOffice() {
  try { S.office = await api("/api/office"); teamDraft = null; planDraft = null; mailDraft = null; renderOffice(); }
  catch (err) { toast(err.message); }
}
function renderOffice() {
  const o = S.office; if (!o) return;
  $("#officeDate").textContent = istHuman(o.today) + " · IST";
  $("#planDay").textContent = istHuman(o.planDay);
  $("#mailWarn").hidden = o.mailConfigured;
  $("#officeLede").textContent = `Today's work from the team and clients, and the plan for ${istHuman(o.planDay)}. At ${o.reviewTime} IST you get an email with every team member's draft. Nothing goes out until you approve it here.`;
  $("#todayCount").textContent = `${o.todayLogs.length} update${o.todayLogs.length === 1 ? "" : "s"}`;
  const groups = {};
  o.todayLogs.forEach((e) => (groups[e.who] ||= []).push(e));
  $("#todayList").innerHTML = o.todayLogs.length ? Object.entries(groups).map(([who, list]) =>
    `<div class="person"><div class="row"><strong>${esc(who)}</strong>${list[0].kind === "client" ? '<span class="pill client">client</span>' : ""}</div><div class="entries">${list.map((e) => entryHTML(e)).join("")}</div></div>`).join("") :
    `<div class="empty">No updates yet today. Team members and clients add them from “Work log”, or by telling the desk in chat.</div>`;
  $("#openList").innerHTML = o.open.length ? o.open.map((e) => entryHTML(e, e.who)).join("") : `<div class="empty">Nothing open or stuck.</div>`;
  $("#askList").innerHTML = o.asks.length ? o.asks.map((a) => `<div class="entry"><span class="when">${esc(istWhen(a.ts))}</span><div class="what"><strong>${esc(a.who)}</strong>${a.kind === "client" ? ' <span class="pill client">client</span>' : ""}<br>${esc(a.q)}</div><span class="pill ${a.a === "(emailed to the office)" ? "blocked" : ""}">${a.a === "(emailed to the office)" ? "emailed" : "asked"}</span></div>`).join("") : `<div class="empty">No questions yet.</div>`;
  $("#clientList").innerHTML = o.clients.length ? o.clients.map((c) => `<div class="entry"><span class="when">${esc(istHuman(istDay(new Date(c.created_at))))}</span><div class="what"><strong>${esc(c.name)}</strong><br><span class="mono small">${esc(c.phone || "")}</span>${c.email ? ` · ${esc(c.email)}` : ""}</div><span></span></div>`).join("") : `<div class="empty">No clients have signed up yet. Share this site's link with them.</div>`;
  const st = o.plan.status;
  $("#planStatus").textContent = st === "sent" ? "Sent" : st === "awaiting_approval" ? "Waiting for your approval" : "Draft";
  $("#planStatus").classList.toggle("sent", st === "sent");
  $("#planHelp").textContent = st === "sent" ? "These emails have gone out. You can still change the plan; employees see it under “Your plan”." : "Write what each person should finish, pick up or continue. Empty boxes are filled from their open items when the emails are drafted.";
  renderPlanEditor(); renderMails(); renderTeamEditor();
}
function renderPlanEditor() {
  const o = S.office;
  if (planDraft === null) { planDraft = { items: { ...o.plan.items }, note: o.plan.note || "" }; $("#planNote").value = planDraft.note; }
  const team = o.team.filter((t) => t.active);
  $("#planEditor").innerHTML = team.length ? team.map((t) => `<label for="plan-${t.id}">${esc(t.name)} <span class="small muted">${esc(t.email || "no email yet")}${t.area ? " · " + esc(t.area) : ""} · training ${Object.keys(t.training).length}/${MODULES.length}</span><textarea id="plan-${t.id}" data-key="${t.id}" rows="3" placeholder="Finish… / Pick up… / Continue…">${esc(planDraft.items[t.id] || "")}</textarea></label>`).join("") : `<div class="empty">Add your team below first.</div>`;
}
$("#planEditor").addEventListener("input", (e) => { const k = e.target.dataset.key; if (k) planDraft.items[k] = e.target.value; });
$("#planNote").addEventListener("input", (e) => { if (planDraft) planDraft.note = e.target.value; });
$("#planSuggest").onclick = async () => {
  const r = await api("/api/plan/suggest");
  Object.entries(r.items).forEach(([k, v]) => { if (!planDraft.items[k]?.trim() && v) planDraft.items[k] = v; });
  renderPlanEditor(); $("#planMsg").textContent = "Filled empty boxes from open items. Review, then save.";
};
async function savePlan(extra = {}) {
  const r = await api("/api/plan", { method: "PUT", body: { items: planDraft.items, note: planDraft.note, ...extra } });
  S.office.plan = r.plan; return r.plan;
}
$("#planSave").onclick = async () => { try { await savePlan(); $("#planMsg").textContent = "Plan saved."; } catch (e) { $("#planMsg").textContent = e.message; } };
$("#planDraft").onclick = async () => {
  $("#planDraft").disabled = true; $("#planMsg").textContent = "Writing emails…";
  try { await savePlan(); const r = await api("/api/plan/draft", { body: {} }); S.office.plan = r.plan; mailDraft = null; planDraft = null; renderOffice(); $("#planMsg").textContent = "Emails drafted. Review them below."; }
  catch (e) { $("#planMsg").textContent = e.message; } finally { $("#planDraft").disabled = false; }
};
function renderMails() {
  const p = S.office.plan;
  $("#mailsCard").hidden = !p.emails.length;
  if (mailDraft === null) mailDraft = p.emails.map((m) => ({ ...m }));
  $("#mails").innerHTML = mailDraft.map((m, i) => `<div class="mailcard" data-i="${i}"><div class="small"><strong>${esc(m.name)}</strong> · <span class="mono">${esc(m.to)}</span></div>
    <label for="ms${i}">Subject<input id="ms${i}" data-f="subject" value="${esc(m.subject)}"></label>
    <label for="mb${i}">Message<textarea id="mb${i}" data-f="body">${esc(m.body)}</textarea></label></div>`).join("");
  $("#mailsSend").disabled = p.status === "sent";
  $("#mailsSend").textContent = p.status === "sent" ? "Sent" : "Approve and send";
}
$("#mails").addEventListener("input", (e) => { const c = e.target.closest(".mailcard"); if (c && e.target.dataset.f) mailDraft[+c.dataset.i][e.target.dataset.f] = e.target.value; });
$("#mailsSave").onclick = async () => { try { await savePlan({ emails: mailDraft }); $("#mailsMsg").textContent = "Edits saved."; } catch (e) { $("#mailsMsg").textContent = e.message; } };
$("#mailsSend").onclick = async () => {
  $("#mailsSend").disabled = true; $("#mailsMsg").textContent = "Sending…";
  try { await savePlan({ emails: mailDraft }); const r = await api("/api/plan/send", { body: {} }); S.office.plan = r.plan; renderOffice(); $("#mailsMsg").textContent = `Sent ${r.sent} email${r.sent === 1 ? "" : "s"}.`; toast("Plan sent to the team"); }
  catch (e) { $("#mailsMsg").textContent = e.message; $("#mailsSend").disabled = false; }
};
function renderTeamEditor() {
  if (teamDraft === null) teamDraft = S.office.team.map((t) => ({ ...t, pin: "" }));
  $("#teamEditor").innerHTML = teamDraft.length ? teamDraft.map((t, i) => `<div class="teamrow" data-i="${i}">
    <label for="tn${i}">Name<input id="tn${i}" data-f="name" value="${esc(t.name)}"></label>
    <label for="te${i}">Email<input id="te${i}" data-f="email" type="email" value="${esc(t.email || "")}" placeholder="name@example.com"></label>
    <label for="ta${i}">Main work<input id="ta${i}" data-f="area" value="${esc(t.area || "")}" placeholder="e.g. GST, loans"></label>
    <label for="tp${i}">${t.id ? "New PIN" : "PIN"}<input id="tp${i}" data-f="pin" inputmode="numeric" value="${esc(t.pin)}" placeholder="${t.id ? "unchanged" : "4–8 digits"}"></label>
    <button type="button" class="quiet" data-toggle="${i}">${t.active === 0 || t.active === false ? "Turn on" : "Turn off"}</button></div>`).join("") : `<div class="empty">No team members yet. Add each person with their email address and a PIN.</div>`;
}
$("#teamEditor").addEventListener("input", (e) => { const r = e.target.closest(".teamrow"); if (r && e.target.dataset.f) teamDraft[+r.dataset.i][e.target.dataset.f] = e.target.value; });
$("#teamEditor").addEventListener("click", (e) => {
  const i = e.target.dataset.toggle; if (i === undefined) return;
  const t = teamDraft[+i];
  if (!t.id) teamDraft.splice(+i, 1); else t.active = t.active === 0 || t.active === false ? 1 : false;
  renderTeamEditor();
});
$("#teamAdd").onclick = () => { teamDraft.push({ name: "", email: "", area: "", pin: "", active: 1 }); renderTeamEditor(); $("#tn" + (teamDraft.length - 1)).focus(); };
$("#teamSave").onclick = async () => {
  try {
    const team = teamDraft.filter((t) => t.name.trim()).map((t) => ({ id: t.id, name: t.name, email: t.email, area: t.area, pin: t.pin, active: !(t.active === 0 || t.active === false) }));
    await api("/api/team", { method: "PUT", body: { team } });
    $("#teamMsg").textContent = "Team saved."; toast("Team saved"); await loadOffice();
  } catch (e) { $("#teamMsg").textContent = e.message; }
};

/* ---------------- Render + boot ---------------- */
function renderAll() { renderProfile(); renderModList(); renderLesson(); renderChips(); renderThread(); renderMyEntries(); renderMyPlan(); route(); }
renderAll();
loadMe().catch(() => toast("Could not reach the server."));
