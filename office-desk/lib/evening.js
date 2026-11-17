// Evening planner: drafts tomorrow's emails, asks the owner to approve, then sends them.
import { q, readPlan, savePlan } from "./db.js";
import { draftEmail } from "./ai.js";
import { sendMail } from "./mail.js";
import { AREA_NAME } from "../public/content.js";
import { istDay, istHM, istHuman, istDayStart, nextWorkDay } from "./time.js";

const REVIEW_TIME = process.env.REVIEW_TIME || "18:30"; // IST: owner gets the drafts to approve
const AUTO_SEND_TIME = process.env.AUTO_SEND_TIME || ""; // IST, optional: send anyway if not approved by then
const APP_URL = (process.env.APP_URL || "http://localhost:3000").replace(/\/$/, "");

/** Open items for one employee: the latest entry per client+area that is not done. */
export function suggestFor(userId, sinceDays = 14) {
  const logs = q.logsForUserSince.all(userId, Date.now() - sinceDays * 864e5);
  const last = new Map();
  for (const l of logs) last.set(`${l.client}|${l.area}`, l);
  return [...last.values()].filter((l) => l.status !== "done").map((l) =>
    `${l.status === "blocked" ? "Follow up" : "Continue"}: ${l.client ? l.client + " – " : ""}${AREA_NAME[l.area] || l.area} – ${l.text}${l.next ? ` (next: ${l.next})` : ""}`
  ).join("\n");
}

/** Build email drafts for every active employee for `day`. Keeps the owner's written plan; fills blanks from open items. */
export async function buildDrafts(day = nextWorkDay()) {
  const plan = readPlan(day);
  const owner = q.owner.get();
  const team = q.activeEmployees.all().filter((e) => e.email);
  const todayStart = istDayStart(istDay());
  const emails = [];
  for (const e of team) {
    const planText = (plan.items[e.id] || "").trim() || suggestFor(e.id);
    if (!plan.items[e.id]?.trim() && planText) plan.items[e.id] = planText;
    try {
      const d = await draftEmail({ employee: e, day, planText, note: plan.note, recentLogs: q.logsForUserSince.all(e.id, todayStart), ownerName: owner.name });
      emails.push({ userId: e.id, to: e.email, name: e.name, ...d });
    } catch (err) {
      emails.push({ userId: e.id, to: e.email, name: e.name, subject: `Your plan for ${istHuman(day)}`, body: `Hi ${e.name},\n\nHere is your plan for ${istHuman(day)}:\n\n${planText || "Please check with me in the morning."}\n\n${plan.note || ""}\n\n${owner.name}`.replace(/\n{3,}/g, "\n\n").trim() });
      console.error("[evening] draft failed for", e.name, err.message);
    }
  }
  savePlan(day, { items: plan.items, note: plan.note, status: "awaiting_approval", emails });
  return readPlan(day);
}

/** Email the owner asking for approval. */
export async function askOwner(day) {
  const plan = readPlan(day);
  const owner = q.owner.get();
  const preview = plan.emails.map((m) => `── ${m.name} <${m.to}>\nSubject: ${m.subject}\n\n${m.body}`).join("\n\n");
  await sendMail({
    to: owner.email,
    subject: `Approve tomorrow's plan (${istHuman(day)}) – ${plan.emails.length} emails ready`,
    text: `Hi ${owner.name},\n\nThe team's emails for ${istHuman(day)} are drafted from today's updates and your plan.\n\nReview, edit and send them here:\n${APP_URL}/#office\n\nNothing is sent until you press "Approve and send".${AUTO_SEND_TIME ? ` If you don't, they go out automatically at ${AUTO_SEND_TIME} IST.` : ""}\n\n${preview || "No team members with email addresses yet. Add them in the Office tab."}`,
  });
  q.markReviewSent.run(Date.now(), day);
}

/** Send the approved emails to the team. */
export async function sendPlan(day) {
  const plan = readPlan(day);
  if (plan.status === "sent") return { sent: 0, already: true };
  const owner = q.owner.get();
  let sent = 0;
  for (const m of plan.emails) {
    if (!m.to || !m.body?.trim()) continue;
    await sendMail({ to: m.to, subject: m.subject, text: m.body, replyTo: owner.email });
    sent++;
  }
  q.markPlanSent.run(Date.now(), day);
  return { sent };
}

let busy = false;
export function startScheduler() {
  setInterval(async () => {
    if (busy) return;
    busy = true;
    try {
      const now = istHM();
      const day = nextWorkDay();
      const plan = q.plan.get(day);
      if (now >= REVIEW_TIME && !plan?.review_sent_at && plan?.status !== "sent") {
        console.log(`[evening] drafting plan for ${day}`);
        if (!plan || plan.status === "draft") await buildDrafts(day);
        await askOwner(day);
      }
      if (AUTO_SEND_TIME && now >= AUTO_SEND_TIME) {
        const p = q.plan.get(day);
        if (p && p.status === "awaiting_approval") { console.log(`[evening] auto-sending ${day}`); await sendPlan(day); }
      }
    } catch (err) {
      console.error("[evening]", err);
    } finally {
      busy = false;
    }
  }, 60_000);
}
