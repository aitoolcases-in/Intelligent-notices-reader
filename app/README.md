# Accrevise Workspace

A practice-management web app in the Accrevise look (ledger green `#034620`, paper `#F7F5EF`, one amber pop `#E2B04A`, Montserrat headlines, Source Serif 4 body, the ring-and-receipt logo).

## What's inside
- **Login**: two tabs, *Firm team* and *Client login*. Passwords are salted and hashed (SHA-256).
- **Work dashboard**: active clients, open work, due in 7 days, overdue, done this month; deadlines ahead, work waiting on clients, work by status, team workload, recent activity. Switch between *Everyone* and *My work*.
- **Clients**: search and filter, add/edit/delete, PAN and GSTIN checks, services, relationship manager, CSV export. Each client page shows open and completed work and **portal access** (create, reset or remove client logins).
- **Work**: a Kanban board (To do → In progress → Waiting on client → Under review → Done) with drag and drop, or a list view. Each task has a notes thread; a note can be internal or visible to the client.
- **Schedule**: a month calendar of all due dates, filter by team member, and **Generate compliance**, which adds the usual Indian statutory dates for each active client's services (GSTR-1, GSTR-3B, TDS, advance tax, ITR, tax audit, ROC, books close, payroll).
- **Team**: workload per person, add team members, reset passwords, reset demo data.
- **Client portal**: what needs the client's action (they reply "Mark as sent"), what's in progress, what's completed, upcoming deadlines and their manager's contact.

## Install as an app
The workspace is a Progressive Web App (PWA). Click **Install app** on the sign-in page or in the sidebar (the download icon on phones):
- **Chrome / Edge (Windows, Mac, Android):** the browser's own install prompt opens; it then runs in its own window with the Accrevise icon.
- **iPhone / iPad:** a short guide shows the steps: Safari → Share → Add to Home Screen.
- **Safari on Mac:** File → Add to Dock.

Once installed it opens full-screen, has shortcuts to Dashboard, Schedule and Clients (right-click / long-press the icon), and keeps working offline. The button hides itself inside the installed app.
Installing needs the app to be served over **https** (or localhost). Any static host works: GitHub Pages, Netlify, Vercel or Cloudflare Pages.

## Run it
No build step. Serve the folder and open it:

```bash
cd app && python3 -m http.server 8080
```

Then go to http://localhost:8080.

Demo logins:
- Firm (admin): `admin@accrevise.demo` / `accrevise123` (staff: `arjun@`, `neha@`, `kabir@accrevise.demo`, same password)
- Client: `rohan@client.demo` / `client123` (also `ramesh@guptatraders.demo`, `ananya@bloomorganics.demo`)

## Important: demo mode
All data is stored in the browser's `localStorage`, and login is checked in the browser. That is fine for a demo or a single-person trial, but it is **not secure for real client data**: anyone with the browser can read it, and clients on other devices won't see the firm's updates. To go live, move the data and the login to a backend (for example Supabase or Firebase with row-level rules so each client sees only their own records) and keep this UI.

Due dates are the usual statutory dates; always check for CBIC/CBDT extensions and QRMP clients.
