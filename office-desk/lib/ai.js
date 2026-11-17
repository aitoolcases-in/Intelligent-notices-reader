// Claude calls: the help-desk chat and the evening email drafts.
import Anthropic from "@anthropic-ai/sdk";
import { KNOWLEDGE_BASE, AREAS } from "../public/content.js";
import { istDay, istHuman } from "./time.js";

const client = new Anthropic(); // reads ANTHROPIC_API_KEY from the environment
const MODEL = process.env.CLAUDE_MODEL || "claude-opus-5-5";
const CHAT_EFFORT = process.env.CHAT_EFFORT || "medium";
const OFFICE = process.env.OFFICE_NAME || "our office";
// If the main model declines a request, the API retries it on a suitable fallback model in the same call.
const FALLBACK = { betas: ["server-side-fallback-2026-07-01"], fallbacks: "default" };

// Stable instructions first so the prompt cache can reuse them across every chat.
const SYSTEM_STATIC = `You are the help desk and training tutor of ${OFFICE}, a practice in India that handles income tax returns, GST returns, contract drafting and replies to tax notices, trademark filing, bank and NBFC loan files, document preparation, accounting, billing and client outreach.

How to answer:
- Reply in the user's language (English, Hindi or Hinglish). Short paragraphs, numbered steps and bullet checklists. Use **bold** for key terms. No tables.
- Be accurate for India. Name the form, section, portal and due date where relevant. Income of FY 2025-26 (AY 2026-27) falls under the Income-tax Act, 1961; from tax year 2026-27 the Income-tax Act, 2025 applies. If a rate, limit or date may have changed, say it should be confirmed on the official portal.
- Never ask for or accept passwords, OTPs, or full card or account numbers. Tell people to share documents through the office's usual channel.
- For positions specific to one client's case, give general guidance and say a senior at the office will review it.
- When the user reports work they did, documents they sent, or a status change ("uploaded Form 16", "finished GSTR-1 for X", "waiting for the client's bank statement"), call record_update once, then confirm in one line what was logged.
- If you cannot help, say so and offer to log the question for the office with record_update and status "blocked".

Office knowledge base:
${KNOWLEDGE_BASE}`;

const RECORD_TOOL = {
  name: "record_update",
  description: "Save a work update or client update to the office log. The owner reads it in the evening when planning the next day.",
  eager_input_streaming: true,
  input_schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      area: { type: "string", enum: AREAS.map((a) => a[0]) },
      client: { type: "string", description: "Client or file name, if known" },
      text: { type: "string", description: "What was done or reported, one sentence" },
      status: { type: "string", enum: ["done", "in-progress", "blocked"] },
      next: { type: "string", description: "Next step, if any" },
    },
    required: ["area", "text", "status"],
  },
};

function viewerLine(user) {
  if (user.kind === "client")
    return `The person chatting is a CLIENT named "${user.name}". Speak simply and explain any jargon. Tell them exactly which documents to send and how. Do not quote fees. For the status of their own file, say the team will confirm and offer to log the question.`;
  if (user.kind === "employee")
    return `The person chatting is a TEAM MEMBER named ${user.name}, still in training. Teach step by step with worked examples using Indian forms and portals, and point out common mistakes.`;
  return `The person chatting is the OWNER of the practice, ${user.name}.`;
}

function validUpdate(inp) {
  const areas = AREAS.map((a) => a[0]);
  return inp && typeof inp === "object" && areas.includes(inp.area) && typeof inp.text === "string" && inp.text.trim() &&
    ["done", "in-progress", "blocked"].includes(inp.status);
}

/**
 * Run one chat turn. Streams text through onText(delta). `record(update)` saves a log entry.
 * history: [{role: "user"|"assistant", content: string}], ending with the user's message.
 */
export async function chat({ user, history, onText, onNote, record }) {
  const messages = history.map((m) => ({ role: m.role, content: m.content }));
  let full = "";
  const emit = (d) => { full += d; onText(d); };
  for (let turn = 0; turn < 4; turn++) {
    const stream = client.beta.messages.stream({
      model: MODEL,
      max_tokens: 16000,
      ...FALLBACK,
      thinking: { type: "adaptive" },
      output_config: { effort: CHAT_EFFORT },
      system: [
        { type: "text", text: SYSTEM_STATIC, cache_control: { type: "ephemeral" } },
        { type: "text", text: `${viewerLine(user)}\nToday is ${istHuman(istDay())} (IST).` },
      ],
      tools: [RECORD_TOOL],
      messages,
    });
    if (turn > 0 && full) emit("\n\n");
    stream.on("text", emit);
    const msg = await stream.finalMessage();
    if (msg.stop_reason === "refusal") { emit("\n\nI can't help with that here. Please contact the office directly."); break; }
    const uses = msg.content.filter((b) => b.type === "tool_use");
    if (msg.stop_reason !== "tool_use" || uses.length === 0) break;
    messages.push({ role: "assistant", content: msg.content });
    const results = [];
    for (const u of uses) {
      if (u.name !== "record_update" || !validUpdate(u.input)) {
        results.push({ type: "tool_result", tool_use_id: u.id, is_error: true, content: "Invalid input: area, text and status are required." });
        continue;
      }
      const saved = record({ area: u.input.area, client: u.input.client || "", text: u.input.text.trim(), status: u.input.status, next: u.input.next || "" });
      onNote(`Logged: ${saved.text}`);
      results.push({ type: "tool_result", tool_use_id: u.id, content: "Saved to the office log." });
    }
    messages.push({ role: "user", content: results });
  }
  return full;
}

/** Write tomorrow's email for one team member from the owner's plan and their recent log. */
export async function draftEmail({ employee, day, planText, note, recentLogs, ownerName }) {
  const logLines = recentLogs.length
    ? recentLogs.map((l) => `- [${l.status}] ${l.client ? l.client + " – " : ""}${l.text}${l.next ? ` (next: ${l.next})` : ""}`).join("\n")
    : "- No updates logged today.";
  const prompt = `Write a short work-plan email from ${ownerName} to team member ${employee.name} for ${istHuman(day)}.

Owner's plan for ${employee.name} (follow it exactly; do not add tasks that are not here or in the open items):
${planText || "(no specific plan written)"}

${note ? `Note for everyone: ${note}\n` : ""}${employee.name}'s updates from today:
${logLines}

Format:
- First line: "Subject: " followed by a subject such as "Your plan for <day>".
- Then a greeting and the plan under three headings, leaving out any that would be empty: "Finish", "Pick up", "Continue".
- One bullet per task, with the client name first where there is one.
- Close with one encouraging line and the owner's name. Plain text only, under 180 words.`;
  const msg = await client.beta.messages.create({
    model: MODEL,
    max_tokens: 4000,
    ...FALLBACK,
    thinking: { type: "adaptive" },
    output_config: { effort: "low" },
    messages: [{ role: "user", content: prompt }],
  });
  if (msg.stop_reason === "refusal") throw new Error("Claude declined to draft this email");
  const text = msg.content.filter((b) => b.type === "text").map((b) => b.text).join("").trim();
  const m = text.match(/^Subject:\s*(.+)\n+/i);
  return { subject: m ? m[1].trim() : `Your plan for ${istHuman(day)}`, body: m ? text.slice(m[0].length).trim() : text };
}
