# Office Desk

One web app for the office:

- **Training** – 9 modules for new staff (ITR, GST, contracts and notice replies, trademark, bank/NBFC loans, document preparation, accounting, billing, cold calling), each with steps, checklists, key dates, common mistakes and a 3-question quiz. Scores are saved.
- **Ask the desk** – a Claude-powered chatbot. Clients ask about their tax, GST, loan or trademark work and which documents to send; staff use it as a tutor and for drafts. Anyone can say “I finished X” or “I sent my bank statements” and it is logged automatically.
- **Work log / My updates** – staff and clients record what is done, in progress, or stuck.
- **Office** (owner only) – today's activity, open and stuck items, client questions, client list, the team list with sign-in PINs, and tomorrow's plan for each person.
- **Evening emails** – at `REVIEW_TIME` (default 18:30 IST) Claude drafts each team member's email for the next working day from your plan and their open items, and emails you the drafts. You review and edit them in the Office tab and press **Approve and send**. Nothing reaches the team before you approve (unless you set `AUTO_SEND_TIME`).

## Run it

Needs Node.js 22.13 or newer.

```bash
cd office-desk
npm install
cp .env.example .env      # then edit .env
npm start
```

Open http://localhost:3000 and sign in with `OWNER_EMAIL` and `OWNER_PASSWORD`. In **Office → Team**, add each employee with their email and a PIN, and tell them their PIN. Clients create their own account from the sign-in page with their mobile number and a PIN.

Without SMTP settings, emails are saved in `data/outbox/` instead of being sent, which is handy for a trial run.

## Hosting options

**On the office network (simplest).** Run it on one always-on office PC. Others open `http://<that-PC's-IP>:3000` (find the IP with `ipconfig` on Windows). Clients outside the office cannot reach it this way.

**On the internet (so clients can use it).** Rent a small Linux server (any VPS with 1 GB RAM is enough), point a sub-domain such as `desk.yourfirm.in` at it, and run:

```bash
docker build -t office-desk .
docker run -d --name office-desk --restart unless-stopped -p 3000:3000 --env-file .env -v office-desk-data:/app/data office-desk
```

Put HTTPS in front of it. With Caddy, a two-line `Caddyfile` does it and fetches the certificate automatically:

```
desk.yourfirm.in {
  reverse_proxy localhost:3000
}
```

Set `APP_URL=https://desk.yourfirm.in` in `.env` so links in the evening email work and the sign-in cookie is marked secure.

**Back up** the `data/` folder (or the `office-desk-data` Docker volume). It holds every account, log and plan in one SQLite file.

## Costs and limits

- Each chat answer and each evening email is one Claude API call, billed to your Anthropic account. Clients are limited to 20 questions an hour, staff to 60. Set `CHAT_EFFORT=low` for cheaper, faster answers.
- If the main model declines a request, the API retries it on a fallback model automatically (`fallbacks: "default"`).
- The training content reflects rules as of November 2026 (including the Income-tax Act, 2025 from tax year 2026-27 and the September 2025 GST rate changes). Edit `public/content.js` to change modules, dates, or add your own procedures; the chatbot uses the same text as its knowledge base.

## Files

| Path | What it is |
|---|---|
| `server.js` | Web server and API |
| `lib/ai.js` | Claude chat and email drafting |
| `lib/evening.js` | Evening schedule, approval and sending |
| `lib/mail.js` | SMTP email |
| `lib/db.js` | SQLite tables |
| `public/` | The web pages; `content.js` holds the training material |
