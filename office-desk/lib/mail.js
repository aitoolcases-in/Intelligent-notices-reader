// Email through any SMTP account (Gmail with an app password, Zoho, Outlook, your domain host).
// Without SMTP settings, emails are written to data/outbox/ so you can test safely.
import nodemailer from "nodemailer";
import fs from "node:fs";
import path from "node:path";

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM } = process.env;
const transport = SMTP_HOST
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT || 465),
      secure: Number(SMTP_PORT || 465) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })
  : null;

export const mailConfigured = () => Boolean(transport);

export async function sendMail({ to, subject, text, replyTo }) {
  if (!transport) {
    const dir = path.join(process.env.DATA_DIR || "./data", "outbox");
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, `${Date.now()}-${String(to).replace(/[^a-z0-9@.]/gi, "_")}.txt`);
    fs.writeFileSync(file, `To: ${to}\nSubject: ${subject}\n\n${text}\n`);
    console.log(`[mail] SMTP not set up; saved ${file}`);
    return { saved: file };
  }
  return transport.sendMail({ from: MAIL_FROM || SMTP_USER, to, subject, text, replyTo });
}
