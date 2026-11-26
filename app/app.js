/* Accrevise Workspace — single-page app, no build step.
 * Data lives in this browser's localStorage (demo mode). See README.md. */
(function () {
  "use strict";

  // ---------------------------------------------------------------- constants
  const DB_KEY = "accrevise.workspace.v1";
  const SESSION_KEY = "accrevise.session";
  const STATUSES = ["To do", "In progress", "Waiting on client", "Under review", "Done"];
  const STATUS_CLASS = { "To do": "st-todo", "In progress": "st-progress", "Waiting on client": "st-waiting", "Under review": "st-review", "Done": "st-done" };
  const STATUS_COLOR = { "To do": "#9fbfab", "In progress": "#6fa3c0", "Waiting on client": "#e2b04a", "Under review": "#8a77b8", "Done": "#034620" };
  const SERVICES = ["GST", "Income Tax", "TDS", "Bookkeeping", "Audit", "Payroll", "ROC / MCA", "CFO Advisory"];
  const ENTITY_TYPES = ["Individual", "Proprietorship", "Partnership", "LLP", "Private Limited", "HUF", "Trust"];
  const PRIORITIES = ["Low", "Normal", "High"];
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const ICONS = {
    dash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>',
    clients: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.8c1.9.7 3.1 2.4 3.5 5.2"/></svg>',
    work: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h10l-1 4H8z"/><rect x="4" y="6" width="16" height="15" rx="2"/><path d="m8.5 13 2.5 2.5L16 11"/></svg>',
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/><path d="M8 14h2M14 14h2M8 17.5h2"/></svg>',
    team: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7.5" r="3.5"/><path d="M5 21c.6-4 3.4-6.5 7-6.5s6.4 2.5 7 6.5"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/></svg>',
    install: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>',
    receipt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/></svg>'
  };

  // ---------------------------------------------------------------- helpers
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const uid = (p) => p + "_" + Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-3);
  const pad = (n) => String(n).padStart(2, "0");
  const iso = (d) => d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  const parse = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const todayISO = () => iso(new Date());
  const daysUntil = (s) => Math.round((parse(s) - parse(todayISO())) / 86400000);
  const fmtDate = (s) => { const d = parse(s); return d.getDate() + " " + MONTHS[d.getMonth()] + " " + d.getFullYear(); };
  const fmtShort = (s) => { const d = parse(s); return d.getDate() + " " + MONTHS[d.getMonth()]; };
  const fmtStamp = (ms) => { const d = new Date(ms); return d.getDate() + " " + MONTHS[d.getMonth()] + ", " + pad(d.getHours()) + ":" + pad(d.getMinutes()); };
  const initials = (name) => String(name || "?").split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
  const firstName = (name) => String(name || "").split(/\s+/)[0];
  const plural = (n, w) => n + " " + w + (n === 1 ? "" : "s");

  function relDue(s) {
    const n = daysUntil(s);
    if (n === 0) return "Due today";
    if (n === 1) return "Due tomorrow";
    if (n === -1) return "1 day overdue";
    if (n < 0) return -n + " days overdue";
    if (n < 7) return "Due in " + n + " days";
    return "Due " + fmtShort(s);
  }
  const isOverdue = (t) => t.status !== "Done" && daysUntil(t.due) < 0;
  const dueClass = (t) => (t.status === "Done" ? "" : daysUntil(t.due) < 0 ? "loss" : daysUntil(t.due) <= 3 ? "soon" : "");

  // Small non-crypto fallback, only used if SubtleCrypto is unavailable (e.g. plain http on a LAN IP).
  function fallbackHash(str) {
    let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
    for (let i = 0; i < str.length; i++) { const c = str.charCodeAt(i); h1 = Math.imul(h1 ^ c, 2654435761); h2 = Math.imul(h2 ^ c, 1597334677); }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return "f" + (h2 >>> 0).toString(16) + (h1 >>> 0).toString(16);
  }
  async function hashPassword(pw, salt) {
    const input = salt + ":" + pw;
    if (window.crypto && crypto.subtle) {
      const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
      return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
    }
    return fallbackHash(input);
  }

  // ---------------------------------------------------------------- compliance calendar
  // Usual statutory due dates in India. Extensions by CBIC / CBDT are announced from time to time.
  function complianceFor(client, year, month /* 0-based */) {
    const out = [];
    const s = client.services || [];
    const d = (day, m = month, y = year) => iso(new Date(y, m, Math.min(day, new Date(y, m + 1, 0).getDate())));
    const prev = new Date(year, month - 1, 1);
    const periodLabel = MONTHS[prev.getMonth()] + " " + prev.getFullYear();
    if (s.includes("GST")) {
      out.push({ title: "GSTR-1 for " + periodLabel, service: "GST", due: d(11) });
      out.push({ title: "GSTR-3B for " + periodLabel, service: "GST", due: d(20) });
    }
    if (s.includes("TDS")) {
      out.push({ title: "TDS deposit for " + periodLabel, service: "TDS", due: month === 3 ? d(30) : d(7) });
      const q = { 6: "Q1 (Apr–Jun)", 9: "Q2 (Jul–Sep)", 0: "Q3 (Oct–Dec)", 4: "Q4 (Jan–Mar)" }[month];
      if (q) out.push({ title: "TDS return 24Q/26Q " + q, service: "TDS", due: d(31) });
    }
    if (s.includes("Bookkeeping")) out.push({ title: "Books close for " + periodLabel, service: "Bookkeeping", due: d(10) });
    if (s.includes("Payroll")) out.push({ title: "Payroll, PF & ESI for " + periodLabel, service: "Payroll", due: d(15) });
    if (s.includes("Income Tax")) {
      const adv = { 5: "15%", 8: "45%", 11: "75%", 2: "100%" }[month];
      if (adv) out.push({ title: "Advance tax instalment (" + adv + ")", service: "Income Tax", due: d(15) });
      if (month === 6 && !s.includes("Audit")) out.push({ title: "Income tax return", service: "Income Tax", due: d(31) });
      if (month === 9 && s.includes("Audit")) out.push({ title: "Income tax return (audit case)", service: "Income Tax", due: d(31) });
    }
    if (s.includes("Audit") && month === 8) out.push({ title: "Tax audit report (Form 3CA/3CB-3CD)", service: "Audit", due: d(30) });
    if (s.includes("ROC / MCA")) {
      if (month === 9) out.push({ title: "AOC-4 financial statements", service: "ROC / MCA", due: d(29) });
      if (month === 10) out.push({ title: "MGT-7 annual return", service: "ROC / MCA", due: d(29) });
    }
    return out;
  }

  // ---------------------------------------------------------------- seed data
  async function seed() {
    const t = new Date();
    const D = (n) => iso(addDays(t, n));
    const users = [
      { id: "u_admin", name: "Priya Sharma", email: "admin@accrevise.demo", role: "admin", title: "Partner" },
      { id: "u_arjun", name: "Arjun Mehta", email: "arjun@accrevise.demo", role: "staff", title: "Senior associate" },
      { id: "u_neha", name: "Neha Iyer", email: "neha@accrevise.demo", role: "staff", title: "Tax associate" },
      { id: "u_kabir", name: "Kabir Khan", email: "kabir@accrevise.demo", role: "staff", title: "Bookkeeper" }
    ];
    const clients = [
      { id: "c_gupta", name: "Gupta Traders", type: "Proprietorship", contact: "Ramesh Gupta", email: "ramesh@guptatraders.demo", phone: "+91 98100 22114", city: "Delhi", pan: "AKLPG4821K", gstin: "07AKLPG4821K1Z3", services: ["GST", "Income Tax", "Bookkeeping"], manager: "u_arjun", status: "Active", since: "2023-04-01" },
      { id: "c_bloom", name: "Bloom Organics Pvt Ltd", type: "Private Limited", contact: "Ananya Rao", email: "ananya@bloomorganics.demo", phone: "+91 98450 77120", city: "Bengaluru", pan: "AAICB7712M", gstin: "29AAICB7712M1ZQ", services: ["GST", "TDS", "Bookkeeping", "Payroll", "Audit", "ROC / MCA", "CFO Advisory"], manager: "u_admin", status: "Active", since: "2022-07-15" },
      { id: "c_rohan", name: "Rohan Verma", type: "Individual", contact: "Rohan Verma", email: "rohan@client.demo", phone: "+91 99300 41582", city: "Mumbai", pan: "BKVPV3391R", gstin: "", services: ["Income Tax"], manager: "u_neha", status: "Active", since: "2024-06-10" },
      { id: "c_kiran", name: "Kiran Design Studio LLP", type: "LLP", contact: "Kiran Desai", email: "kiran@kirandesign.demo", phone: "+91 98250 66390", city: "Ahmedabad", pan: "AAPFK6639D", gstin: "24AAPFK6639D1Z8", services: ["GST", "TDS", "Income Tax", "Bookkeeping"], manager: "u_arjun", status: "Active", since: "2024-01-08" },
      { id: "c_sai", name: "Sai Medicals", type: "Proprietorship", contact: "Suresh Reddy", email: "suresh@saimedicals.demo", phone: "+91 90000 51833", city: "Hyderabad", pan: "ATRPR5183E", gstin: "36ATRPR5183E1ZK", services: ["GST", "Bookkeeping"], manager: "u_kabir", status: "Active", since: "2025-02-01" },
      { id: "c_meera", name: "Meera Nair", type: "Individual", contact: "Meera Nair", email: "meera@client.demo", phone: "+91 94470 28816", city: "Kochi", pan: "CDNPN2881H", gstin: "", services: ["Income Tax", "CFO Advisory"], manager: "u_neha", status: "Active", since: "2025-05-20" },
      { id: "c_patel", name: "Patel & Sons", type: "Partnership", contact: "Harsh Patel", email: "harsh@patelsons.demo", phone: "+91 98980 11447", city: "Surat", pan: "AAEFP1144L", gstin: "24AAEFP1144L1ZB", services: ["GST", "TDS", "Income Tax", "Audit"], manager: "u_admin", status: "Active", since: "2021-11-11" },
      { id: "c_old", name: "Northwind Exports", type: "Private Limited", contact: "Vikram Bose", email: "vikram@northwind.demo", phone: "+91 98300 90021", city: "Kolkata", pan: "AABCN9002F", gstin: "19AABCN9002F1ZD", services: ["GST"], manager: "u_kabir", status: "Inactive", since: "2020-03-02" }
    ];
    // client portal logins
    users.push({ id: "u_rohan", name: "Rohan Verma", email: "rohan@client.demo", role: "client", clientId: "c_rohan" });
    users.push({ id: "u_ramesh", name: "Ramesh Gupta", email: "ramesh@guptatraders.demo", role: "client", clientId: "c_gupta" });
    users.push({ id: "u_ananya", name: "Ananya Rao", email: "ananya@bloomorganics.demo", role: "client", clientId: "c_bloom" });

    for (const u of users) {
      u.salt = Math.random().toString(36).slice(2);
      u.passHash = await hashPassword(u.role === "client" ? "client123" : "accrevise123", u.salt);
    }

    const now = Date.now();
    const mk = (clientId, title, service, assignee, due, status, priority, notes) => ({
      id: uid("t"), clientId, title, service, assignee, due, status, priority: priority || "Normal", createdAt: now - 864e5 * 10,
      notes: (notes || []).map((n, i) => ({ id: uid("n"), at: now - 864e5 * (5 - i), ...n }))
    });
    const tasks = [
      mk("c_gupta", "Reconcile purchase register with GSTR-2B", "GST", "u_arjun", D(-2), "In progress", "High", [{ by: "u_arjun", text: "Three supplier invoices missing in 2B. Following up.", shared: false }]),
      mk("c_gupta", "Share October bank statements", "Bookkeeping", "u_kabir", D(1), "Waiting on client", "Normal", [{ by: "u_kabir", text: "Please upload the HDFC current account statement for October.", shared: true }]),
      mk("c_bloom", "Monthly MIS & cash-flow pack", "CFO Advisory", "u_admin", D(3), "In progress", "High"),
      mk("c_bloom", "Vendor TDS reconciliation (26AS vs books)", "TDS", "u_neha", D(5), "To do", "Normal"),
      mk("c_bloom", "Board meeting minutes draft", "ROC / MCA", "u_admin", D(9), "To do", "Low"),
      mk("c_bloom", "Payroll inputs for November", "Payroll", "u_kabir", D(2), "Waiting on client", "Normal", [{ by: "u_kabir", text: "Need attendance sheet and new joiner details.", shared: true }]),
      mk("c_rohan", "Capital gains statement from broker", "Income Tax", "u_neha", D(4), "Waiting on client", "Normal", [{ by: "u_neha", text: "Hi Rohan, please share your FY 2025-26 capital gains report from your broker.", shared: true }]),
      mk("c_rohan", "Advance tax estimate (3rd instalment)", "Income Tax", "u_neha", D(12), "To do", "Normal"),
      mk("c_rohan", "Revised ITR acknowledgement", "Income Tax", "u_neha", D(-20), "Done", "Normal", [{ by: "u_neha", text: "Filed and verified. Acknowledgement shared on email.", shared: true }]),
      mk("c_kiran", "GST notice reply (ASMT-10)", "GST", "u_arjun", D(-1), "Under review", "High", [{ by: "u_arjun", text: "Draft reply ready for partner review.", shared: false }]),
      mk("c_kiran", "Fixed asset register update", "Bookkeeping", "u_kabir", D(14), "To do", "Low"),
      mk("c_sai", "Stock valuation for half-year", "Bookkeeping", "u_kabir", D(6), "In progress", "Normal"),
      mk("c_sai", "E-invoice setup check", "GST", "u_arjun", D(-6), "Done", "Normal"),
      mk("c_meera", "Rental income & HRA working", "Income Tax", "u_neha", D(8), "To do", "Normal"),
      mk("c_meera", "Personal budget & SIP review", "CFO Advisory", "u_admin", D(16), "To do", "Low"),
      mk("c_patel", "Partnership deed amendment", "Audit", "u_admin", D(-4), "In progress", "High"),
      mk("c_patel", "Fixed deposit interest certificates", "Income Tax", "u_neha", D(0), "Waiting on client", "Normal", [{ by: "u_neha", text: "Please send FD interest certificates from all banks.", shared: true }])
    ];

    const db = { version: 1, users, clients, tasks, activity: [] };
    // add this month's statutory work for active clients
    generateCompliance(db, t.getFullYear(), t.getMonth(), true);
    db.activity.unshift({ at: now, by: "u_admin", text: "Workspace created with demo data" });
    return db;
  }

  function generateCompliance(db, year, month, silent) {
    const existing = new Set(db.tasks.map((t) => t.clientId + "|" + t.title + "|" + t.due));
    let added = 0;
    const today = todayISO();
    for (const c of db.clients) {
      if (c.status !== "Active") continue;
      for (const item of complianceFor(c, year, month)) {
        const key = c.id + "|" + item.title + "|" + item.due;
        if (existing.has(key)) continue;
        existing.add(key);
        db.tasks.push({
          id: uid("t"), clientId: c.id, title: item.title, service: item.service, assignee: c.manager,
          due: item.due, status: silent && item.due < today ? "Done" : "To do", priority: "Normal",
          createdAt: Date.now(), recurring: true, notes: []
        });
        added++;
      }
    }
    return added;
  }

  // ---------------------------------------------------------------- store
  let db = null;
  let me = null;
  function save() { try { localStorage.setItem(DB_KEY, JSON.stringify(db)); } catch (e) { toast("Could not save in this browser"); } }
  async function load() {
    try { const raw = localStorage.getItem(DB_KEY); if (raw) { db = JSON.parse(raw); return; } } catch (e) { /* fall through */ }
    db = await seed();
    save();
  }
  const user = (id) => db.users.find((u) => u.id === id);
  const client = (id) => db.clients.find((c) => c.id === id);
  const task = (id) => db.tasks.find((t) => t.id === id);
  const staff = () => db.users.filter((u) => u.role !== "client");
  const isFirm = () => me && me.role !== "client";
  function log(text) { db.activity.unshift({ at: Date.now(), by: me.id, text }); db.activity = db.activity.slice(0, 80); }

  // ---------------------------------------------------------------- UI primitives
  let toastTimer;
  function toast(msg) {
    const el = $("#toast"); el.textContent = msg; el.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove("show"), 2400);
  }
  function openModal(html, onMount) {
    const root = $("#modal-root");
    root.innerHTML = '<div class="overlay"><div class="modal" role="dialog" aria-modal="true"><button class="x" aria-label="Close">×</button>' + html + "</div></div>";
    const ov = $(".overlay", root);
    ov.addEventListener("mousedown", (e) => { if (e.target === ov) closeModal(); });
    $(".x", root).addEventListener("click", closeModal);
    const first = $("input, select, textarea", root); if (first) setTimeout(() => first.focus(), 30);
    if (onMount) onMount($(".modal", root));
  }
  function closeModal() { $("#modal-root").innerHTML = ""; }
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  const statusPill = (t) => isOverdue(t)
    ? '<span class="pill st-overdue">Overdue · ' + esc(t.status) + "</span>"
    : '<span class="pill ' + STATUS_CLASS[t.status] + '">' + esc(t.status) + "</span>";
  const avatar = (u, cls) => u ? '<span class="avatar ' + (cls || "") + '" title="' + esc(u.name) + '">' + esc(initials(u.name)) + "</span>" : "";
  const options = (list, sel, labelFn) => list.map((v) => { const val = typeof v === "object" ? v.id : v; const lbl = labelFn ? labelFn(v) : v; return '<option value="' + esc(val) + '"' + (val === sel ? " selected" : "") + ">" + esc(lbl) + "</option>"; }).join("");
  function dateBox(t) {
    const d = parse(t.due);
    return '<div class="datebox ' + dueClass(t) + '"><b>' + d.getDate() + "</b><span>" + MONTHS[d.getMonth()] + "</span></div>";
  }
  function taskRow(t, showClient = true, compact = false) {
    const c = client(t.clientId);
    const when = t.status === "Done" ? "Completed" : relDue(t.due);
    return '<li class="click" data-task="' + t.id + '">' + dateBox(t) +
      '<div class="grow"><div class="t">' + esc(t.title) + '</div><div class="sub">' + (showClient ? esc(c ? c.name : "—") + " · " : "") + esc(compact ? t.status : when) + "</div></div>" +
      (compact ? "" : statusPill(t)) + (isFirm() ? avatar(user(t.assignee), "sm") : "") + "</li>";
  }
  function bindTaskClicks(root) { $$("[data-task]", root).forEach((el) => el.addEventListener("click", () => openTask(el.dataset.task))); }

  // ---------------------------------------------------------------- install as an app (PWA)
  let installPrompt = null;
  const isStandalone = () => window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  window.addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); installPrompt = e; refreshInstallButtons(); });
  window.addEventListener("appinstalled", () => { installPrompt = null; toast("Accrevise is installed. Open it from your home screen or apps."); refreshInstallButtons(); });
  function refreshInstallButtons() { $$("[data-install]").forEach((b) => b.classList.toggle("hidden", isStandalone())); }
  function installButton(cls) { return isStandalone() ? "" : '<button type="button" class="install-btn ' + (cls || "") + '" data-install>' + ICONS.install + '<span class="lbl">Install app</span></button>'; }
  function bindInstall(root) { $$("[data-install]", root).forEach((b) => b.addEventListener("click", installApp)); }
  async function installApp() {
    if (installPrompt) {
      installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      installPrompt = null;
      if (choice.outcome !== "accepted") toast("No problem. You can install it any time.");
      return;
    }
    const ua = navigator.userAgent;
    let steps;
    if (isIOS()) steps = ["Open this page in <b>Safari</b>.", "Tap the <b>Share</b> button (the square with an arrow).", "Scroll down and tap <b>Add to Home Screen</b>.", "Tap <b>Add</b>. Accrevise now opens like an app from your home screen."];
    else if (/android/i.test(ua)) steps = ["Open this page in <b>Chrome</b>.", "Tap the <b>⋮</b> menu at the top right.", "Tap <b>Install app</b> (or <b>Add to Home screen</b>).", "Tap <b>Install</b>."];
    else if (/safari/i.test(ua) && !/chrome|chromium|edg/i.test(ua)) steps = ["In Safari’s menu bar, choose <b>File → Add to Dock</b>.", "Click <b>Add</b>. Accrevise opens in its own window from the Dock."];
    else steps = ["Look for the <b>install icon</b> at the right end of the address bar (a screen with a down arrow), or open the browser menu <b>⋮</b>.", "Choose <b>Install Accrevise Workspace</b> (in Edge: <b>Apps → Install this site as an app</b>).", "Click <b>Install</b>. It opens in its own window and appears with your other apps."];
    const secure = window.isSecureContext;
    openModal(
      '<p class="kicker">Install as an app</p><h2 style="margin-bottom:6px">Put Accrevise on your <span class="mark">home screen</span></h2>' +
      '<p class="muted" style="margin:0 0 14px">It opens full-screen in its own window, with the Accrevise icon, and keeps working offline.</p>' +
      '<ol class="install-steps">' + steps.map((x) => "<li>" + x + "</li>").join("") + "</ol>" +
      (secure ? "" : '<p class="error" style="margin-top:12px">Installing needs a secure address (https:// or localhost). Open the app from its https link and try again.</p>') +
      '<div class="foot"><button type="button" class="btn" id="ok">Got it</button></div>',
      (m) => $("#ok", m).addEventListener("click", closeModal));
  }

  // ---------------------------------------------------------------- router
  function route() {
    const app = $("#app");
    if (!me) return renderLogin(app);
    const hash = location.hash.replace(/^#\/?/, "") || (isFirm() ? "dashboard" : "portal");
    const [page, arg] = hash.split("/");
    if (!isFirm() && page !== "portal") { location.hash = "#/portal"; return; }
    if (isFirm() && page === "portal") { location.hash = "#/dashboard"; return; }
    renderShell(app, page);
    const main = $(".main", app);
    const pages = { dashboard: renderDashboard, clients: arg ? (m) => renderClient(m, arg) : renderClients, work: renderWork, schedule: renderSchedule, team: renderTeam, portal: renderPortal };
    (pages[page] || renderDashboard)(main);
    main.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", route);

  function renderShell(app, page) {
    const open = db.tasks.filter((t) => t.status !== "Done");
    const navFirm = [
      ["dashboard", "Dashboard", ICONS.dash, ""],
      ["clients", "Clients", ICONS.clients, db.clients.filter((c) => c.status === "Active").length],
      ["work", "Work", ICONS.work, open.filter(isOverdue).length || ""],
      ["schedule", "Schedule", ICONS.cal, ""],
      ["team", "Team", ICONS.team, ""]
    ];
    const navClient = [["portal", "My account", ICONS.home, ""]];
    const nav = (isFirm() ? navFirm : navClient).map(([k, label, icon, count]) =>
      '<a href="#/' + k + '" class="' + (page === k ? "active" : "") + '">' + icon + '<span class="lbl">' + label + "</span>" + (count ? '<span class="count">' + count + "</span>" : "") + "</a>").join("");
    const roleLbl = me.role === "client" ? (client(me.clientId) || {}).name || "Client" : me.title || (me.role === "admin" ? "Admin" : "Staff");
    app.innerHTML =
      '<div class="shell"><aside class="sidebar"><span class="ring"></span><img class="logo" src="assets/logo-paper.png" alt="Accrevise">' +
      '<nav class="nav">' + nav + "</nav>" + installButton("side") +
      '<div class="me">' + avatar(me) + '<div class="who"><b>' + esc(me.name) + "</b><span>" + esc(roleLbl) + '</span></div><button id="logout">Log out</button></div></aside>' +
      '<main class="main" tabindex="-1"></main></div>';
    bindInstall(app);
    $("#logout").addEventListener("click", () => { sessionStorage.removeItem(SESSION_KEY); me = null; location.hash = ""; route(); });
  }

  // ---------------------------------------------------------------- login
  function renderLogin(app) {
    let mode = "firm";
    app.innerHTML =
      '<div class="login-wrap"><section class="login-brand">' +
      '<span class="ring" style="width:520px;height:520px;right:-180px;top:-160px"></span><span class="ring" style="width:300px;height:300px;left:-120px;bottom:-140px"></span>' +
      '<img src="assets/logo-paper.png" alt="Accrevise — an AI-powered CFO">' +
      '<h1>Every client, every deadline, <span class="mark">one desk.</span></h1>' +
      "<p>The Accrevise workspace keeps your practice on time: clients, filings and the team’s work in one calm place.</p>" +
      "<ul><li>Work dashboard with overdue and due-this-week at a glance</li><li>Client records with PAN, GSTIN and services</li><li>Compliance schedule built from each client’s services</li><li>A client portal to share documents and track status</li></ul>" +
      '</section><section class="login-form"><div class="login-card">' +
      '<p class="kicker">Sign in</p><h1>Welcome <span class="mark">back.</span></h1>' +
      '<div class="tabs" role="tablist"><button type="button" data-mode="firm" class="active" role="tab">Firm team</button><button type="button" data-mode="client" role="tab">Client login</button></div>' +
      '<form id="login-form" novalidate><label class="field"><span>Email</span><input class="input" name="email" type="email" autocomplete="username" required></label>' +
      '<label class="field"><span>Password</span><input class="input" name="password" type="password" autocomplete="current-password" required></label>' +
      '<div class="error" id="login-error"></div><button class="btn" style="width:100%" type="submit">Sign in</button></form>' +
      '<div class="demo-creds" id="demo"></div>' +
      installButton("wide") +
      '<p class="footnote">Demo workspace: data is stored only in this browser.</p></div></section></div>';
    bindInstall(app);
    const demo = () => {
      $("#demo").innerHTML = mode === "firm"
        ? '<b>Demo firm login</b><br><code>admin@accrevise.demo</code> / <code>accrevise123</code><br><button type="button" id="fill">Fill it in</button>'
        : '<b>Demo client login</b><br><code>rohan@client.demo</code> / <code>client123</code><br><button type="button" id="fill">Fill it in</button>';
      $("#fill").addEventListener("click", () => {
        $("[name=email]").value = mode === "firm" ? "admin@accrevise.demo" : "rohan@client.demo";
        $("[name=password]").value = mode === "firm" ? "accrevise123" : "client123";
      });
    };
    demo();
    $$(".tabs button").forEach((b) => b.addEventListener("click", () => {
      mode = b.dataset.mode; $$(".tabs button").forEach((x) => x.classList.toggle("active", x === b)); $("#login-error").textContent = ""; demo();
    }));
    $("#login-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const f = e.target; const email = f.email.value.trim().toLowerCase(); const pw = f.password.value;
      const u = db.users.find((x) => x.email.toLowerCase() === email);
      const ok = u && u.passHash && (await hashPassword(pw, u.salt)) === u.passHash;
      if (!ok) { $("#login-error").textContent = "That email and password don’t match."; return; }
      if (mode === "client" && u.role !== "client") { $("#login-error").textContent = "This is a firm account. Use the Firm team tab."; return; }
      if (mode === "firm" && u.role === "client") { $("#login-error").textContent = "This is a client account. Use the Client login tab."; return; }
      if (u.role === "client") { const c = client(u.clientId); if (!c || c.status !== "Active") { $("#login-error").textContent = "Portal access for this account is paused. Please contact your Accrevise manager."; return; } }
      me = u; sessionStorage.setItem(SESSION_KEY, u.id);
      location.hash = u.role === "client" ? "#/portal" : "#/dashboard"; route();
    });
  }

  // ---------------------------------------------------------------- dashboard
  let dashScope = "all";
  function renderDashboard(main) {
    const mine = dashScope === "mine";
    const tasks = db.tasks.filter((t) => !mine || t.assignee === me.id);
    const open = tasks.filter((t) => t.status !== "Done");
    const overdue = open.filter(isOverdue).sort((a, b) => a.due.localeCompare(b.due));
    const week = open.filter((t) => { const n = daysUntil(t.due); return n >= 0 && n <= 7; });
    const waiting = open.filter((t) => t.status === "Waiting on client");
    const now = new Date(); const monthKey = now.getFullYear() + "-" + pad(now.getMonth() + 1);
    const doneMonth = tasks.filter((t) => t.status === "Done" && (t.completedAt ? iso(new Date(t.completedAt)).startsWith(monthKey) : t.due.startsWith(monthKey))).length;
    const activeClients = db.clients.filter((c) => c.status === "Active").length;
    const ahead = open.filter((t) => daysUntil(t.due) <= 14).sort((a, b) => a.due.localeCompare(b.due)).slice(0, 9);
    const hour = now.getHours(); const greet = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

    const byStatus = STATUSES.map((s) => [s, tasks.filter((t) => t.status === s).length]);
    const total = tasks.length || 1;
    const team = staff().map((u) => [u, db.tasks.filter((t) => t.assignee === u.id && t.status !== "Done").length, db.tasks.filter((t) => t.assignee === u.id && isOverdue(t)).length]);
    const maxLoad = Math.max(1, ...team.map((x) => x[1]));

    main.innerHTML =
      '<div class="page-head"><div><p class="kicker">Work dashboard · ' + esc(fmtDate(todayISO())) + "</p><h1>" + greet + ", " + esc(firstName(me.name)) + ". " +
      (overdue.length ? '<span class="mark loss">' + plural(overdue.length, "item") + "</span> overdue." : '<span class="mark">' + plural(week.length, "deadline") + "</span> this week.") + "</h1></div>" +
      '<div class="actions"><div class="tabs" style="margin:0"><button data-scope="all" class="' + (mine ? "" : "active") + '">Everyone</button><button data-scope="mine" class="' + (mine ? "active" : "") + '">My work</button></div>' +
      '<button class="btn amber" id="new-task">+ New task</button></div></div>' +
      '<div class="kpis">' +
      '<div class="card kpi hi"><p class="kicker">Active clients</p><div class="v">' + activeClients + '</div><div class="s">' + db.clients.length + " on record</div></div>" +
      '<div class="card kpi"><p class="kicker">Open work</p><div class="v">' + open.length + '</div><div class="s">across all services</div></div>' +
      '<div class="card kpi"><p class="kicker">Due in 7 days</p><div class="v">' + week.length + '</div><div class="s">' + open.filter((t) => daysUntil(t.due) === 0).length + " due today</div></div>" +
      '<div class="card kpi ' + (overdue.length ? "loss" : "") + '"><p class="kicker">Overdue</p><div class="v">' + overdue.length + '</div><div class="s">' + (overdue.length ? "needs attention" : "all on time") + "</div></div>" +
      '<div class="card kpi"><p class="kicker">Done this month</p><div class="v">' + doneMonth + '</div><div class="s">' + plural(waiting.length, "item") + " waiting on clients</div></div></div>" +
      '<div class="dash-grid"><div class="col">' +
      '<div class="card"><div class="card-head"><h2>Deadlines ahead</h2><a href="#/schedule">Open schedule →</a></div><ul class="rows">' + (ahead.length ? ahead.map((t) => taskRow(t)).join("") : '<li class="empty">Nothing due in the next two weeks.</li>') + "</ul></div>" +
      '<div class="card"><div class="card-head"><h2>Waiting on clients</h2><a href="#/work">All work →</a></div><ul class="rows">' + (waiting.length ? waiting.slice(0, 6).map((t) => taskRow(t)).join("") : '<li class="empty">No one owes us anything. Rare and lovely.</li>') + "</ul></div>" +
      '</div><div class="col">' +
      '<div class="card"><div class="card-head"><h2>Work by status</h2></div><div class="stack">' + byStatus.map(([s, n]) => n ? '<i style="width:' + (n / total) * 100 + "%;background:" + STATUS_COLOR[s] + '" title="' + esc(s) + ": " + n + '"></i>' : "").join("") + '</div><div class="legend">' + byStatus.map(([s, n]) => '<span><i style="background:' + STATUS_COLOR[s] + '"></i>' + esc(s) + " <b>" + n + "</b></span>").join("") + "</div></div>" +
      '<div class="card"><div class="card-head"><h2>Team workload</h2><a href="#/team">Team →</a></div>' + team.map(([u, n, o]) =>
        '<div class="bar-row"><span class="name">' + esc(u.name) + '</span><div class="bar"><i style="width:' + ((n - o) / maxLoad) * 100 + '%;background:var(--green-600)"></i><i style="width:' + (o / maxLoad) * 100 + '%;background:var(--loss)"></i></div><span class="n">' + n + "</span></div>").join("") +
      '<div class="legend small" style="margin-top:8px"><span><i style="background:var(--green-600)"></i>Open</span><span><i style="background:var(--loss)"></i>Overdue</span></div></div>' +
      '<div class="card"><div class="card-head"><h2>Recent activity</h2></div><ul class="rows">' + (db.activity.slice(0, 6).map((a) => { const u = user(a.by); return "<li>" + avatar(u, "sm g") + '<div class="grow"><div class="sub" style="white-space:normal;color:var(--ink)">' + esc(a.text) + '</div><div class="sub">' + esc(u ? u.name : "") + " · " + fmtStamp(a.at) + "</div></div></li>"; }).join("") || '<li class="empty">No activity yet.</li>') + "</ul></div>" +
      "</div></div>";
    $$("[data-scope]", main).forEach((b) => b.addEventListener("click", () => { dashScope = b.dataset.scope; renderDashboard(main); }));
    $("#new-task", main).addEventListener("click", () => editTask(null));
    bindTaskClicks(main);
  }

  // ---------------------------------------------------------------- clients
  const clientFilter = { q: "", service: "", status: "Active" };
  function renderClients(main) {
    main.innerHTML =
      '<div class="page-head"><div><p class="kicker">Client management</p><h1>Your <span class="mark">clients</span></h1></div>' +
      '<div class="actions"><button class="btn ghost" id="export">Export CSV</button><button class="btn amber" id="add-client">+ Add client</button></div></div>' +
      '<div class="card"><div class="toolbar"><input class="input search" id="q" placeholder="Search name, PAN, GSTIN, city…" value="' + esc(clientFilter.q) + '">' +
      '<select class="input" id="fs"><option value="">All services</option>' + options(SERVICES, clientFilter.service) + "</select>" +
      '<select class="input" id="fst"><option value="">Any status</option>' + options(["Active", "Inactive"], clientFilter.status) + "</select></div>" +
      '<div class="table-wrap"><table class="data"><thead><tr><th>Client</th><th>Type</th><th>PAN</th><th>Services</th><th>Manager</th><th>Open work</th><th>Next due</th></tr></thead><tbody id="ct"></tbody></table></div></div>';
    const draw = () => {
      const q = clientFilter.q.toLowerCase();
      const rows = db.clients.filter((c) =>
        (!clientFilter.status || c.status === clientFilter.status) &&
        (!clientFilter.service || c.services.includes(clientFilter.service)) &&
        (!q || [c.name, c.pan, c.gstin, c.city, c.contact, c.email].join(" ").toLowerCase().includes(q))
      ).sort((a, b) => a.name.localeCompare(b.name));
      $("#ct").innerHTML = rows.length ? rows.map((c) => {
        const open = db.tasks.filter((t) => t.clientId === c.id && t.status !== "Done").sort((a, b) => a.due.localeCompare(b.due));
        const od = open.filter(isOverdue).length;
        return '<tr data-id="' + c.id + '"><td><div class="name">' + esc(c.name) + '</div><div class="small muted">' + esc(c.contact) + " · " + esc(c.city) + (c.status === "Inactive" ? " · Inactive" : "") + "</div></td>" +
          "<td>" + esc(c.type) + '</td><td class="mono">' + esc(c.pan) + "</td><td>" + c.services.slice(0, 3).map((s) => '<span class="chip">' + esc(s) + "</span> ").join("") + (c.services.length > 3 ? '<span class="chip">+' + (c.services.length - 3) + "</span>" : "") + "</td>" +
          "<td>" + avatar(user(c.manager), "sm") + "</td><td><b>" + open.length + "</b>" + (od ? ' <span class="pill st-overdue">' + od + " overdue</span>" : "") + "</td>" +
          "<td>" + (open[0] ? '<span class="due ' + dueClass(open[0]) + '">' + esc(fmtShort(open[0].due)) + "</span>" : '<span class="muted">—</span>') + "</td></tr>";
      }).join("") : '<tr><td colspan="7" class="empty">No clients match.</td></tr>';
      $$("#ct tr[data-id]").forEach((tr) => tr.addEventListener("click", () => { location.hash = "#/clients/" + tr.dataset.id; }));
    };
    draw();
    $("#q").addEventListener("input", (e) => { clientFilter.q = e.target.value; draw(); });
    $("#fs").addEventListener("change", (e) => { clientFilter.service = e.target.value; draw(); });
    $("#fst").addEventListener("change", (e) => { clientFilter.status = e.target.value; draw(); });
    $("#add-client").addEventListener("click", () => editClient(null));
    $("#export").addEventListener("click", exportClients);
  }

  function exportClients() {
    const cols = ["name", "type", "contact", "email", "phone", "city", "pan", "gstin", "services", "manager", "status", "since"];
    const cell = (v) => '"' + String(v == null ? "" : v).replace(/"/g, '""') + '"';
    const lines = [cols.join(",")].concat(db.clients.map((c) => cols.map((k) => cell(k === "services" ? c.services.join("; ") : k === "manager" ? (user(c.manager) || {}).name : c[k])).join(",")));
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "accrevise-clients-" + todayISO() + ".csv"; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  function editClient(id) {
    const c = id ? client(id) : { name: "", type: "Proprietorship", contact: "", email: "", phone: "", city: "", pan: "", gstin: "", services: [], manager: me.id, status: "Active", since: todayISO() };
    openModal(
      '<p class="kicker">' + (id ? "Edit client" : "New client") + "</p><h2 style=\"margin-bottom:16px\">" + (id ? esc(c.name) : "Add a client") + "</h2>" +
      '<form id="cf"><div class="grid-2">' +
      '<label class="field"><span>Client / business name</span><input class="input" name="name" required value="' + esc(c.name) + '"></label>' +
      '<label class="field"><span>Entity type</span><select class="input" name="type">' + options(ENTITY_TYPES, c.type) + "</select></label>" +
      '<label class="field"><span>Contact person</span><input class="input" name="contact" value="' + esc(c.contact) + '"></label>' +
      '<label class="field"><span>Email</span><input class="input" type="email" name="email" value="' + esc(c.email) + '"></label>' +
      '<label class="field"><span>Phone</span><input class="input" name="phone" value="' + esc(c.phone) + '"></label>' +
      '<label class="field"><span>City</span><input class="input" name="city" value="' + esc(c.city) + '"></label>' +
      '<label class="field"><span>PAN</span><input class="input mono" name="pan" maxlength="10" placeholder="AAAAA9999A" value="' + esc(c.pan) + '"></label>' +
      '<label class="field"><span>GSTIN</span><input class="input mono" name="gstin" maxlength="15" placeholder="Optional" value="' + esc(c.gstin) + '"></label>' +
      '<label class="field"><span>Relationship manager</span><select class="input" name="manager">' + options(staff(), c.manager, (u) => u.name) + "</select></label>" +
      '<label class="field"><span>Status</span><select class="input" name="status">' + options(["Active", "Inactive"], c.status) + "</select></label></div>" +
      '<div class="field"><span class="kicker" style="display:block;margin-bottom:6px">Services</span><div class="checks">' + SERVICES.map((s) => '<label><input type="checkbox" name="svc" value="' + esc(s) + '"' + (c.services.includes(s) ? " checked" : "") + ">" + esc(s) + "</label>").join("") + "</div></div>" +
      '<div class="error" id="cf-err"></div><div class="foot">' + (id && me.role === "admin" ? '<button type="button" class="btn danger left" id="del">Delete client</button>' : "") +
      '<button type="button" class="btn ghost" id="cancel">Cancel</button><button class="btn" type="submit">' + (id ? "Save changes" : "Add client") + "</button></div></form>",
      (m) => {
        $("#cancel", m).addEventListener("click", closeModal);
        $("#cf", m).addEventListener("submit", (e) => {
          e.preventDefault();
          const f = e.target; const v = (k) => f[k].value.trim();
          const pan = v("pan").toUpperCase(); const gstin = v("gstin").toUpperCase();
          if (!v("name")) { $("#cf-err").textContent = "Please enter the client’s name."; return; }
          if (pan && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan)) { $("#cf-err").textContent = "PAN should look like AAAAA9999A."; return; }
          if (gstin && !/^[0-9]{2}[A-Z0-9]{10}[0-9A-Z]Z[0-9A-Z]$/.test(gstin)) { $("#cf-err").textContent = "GSTIN should be 15 characters, e.g. 07AKLPG4821K1Z3."; return; }
          if (gstin && pan && gstin.slice(2, 12) !== pan) { $("#cf-err").textContent = "GSTIN characters 3–12 should match the PAN."; return; }
          const data = { name: v("name"), type: f.type.value, contact: v("contact"), email: v("email"), phone: v("phone"), city: v("city"), pan, gstin, manager: f.manager.value, status: f.status.value, services: $$("[name=svc]:checked", f).map((x) => x.value) };
          if (id) { Object.assign(c, data); log("Updated client " + c.name); }
          else { const nc = Object.assign({ id: uid("c"), since: todayISO() }, data); db.clients.push(nc); log("Added client " + nc.name); id = nc.id; }
          save(); closeModal(); toast("Client saved"); location.hash = "#/clients/" + id; route();
        });
        const del = $("#del", m);
        if (del) del.addEventListener("click", () => {
          if (!confirm("Delete " + c.name + " and all their work items? This cannot be undone.")) return;
          db.tasks = db.tasks.filter((t) => t.clientId !== id);
          db.users = db.users.filter((u) => u.clientId !== id);
          db.clients = db.clients.filter((x) => x.id !== id);
          log("Deleted client " + c.name); save(); closeModal(); toast("Client deleted"); location.hash = "#/clients";
        });
      });
  }

  function renderClient(main, id) {
    const c = client(id);
    if (!c) { main.innerHTML = '<a class="back" href="#/clients">← All clients</a><div class="card empty">That client no longer exists.</div>'; return; }
    const tasks = db.tasks.filter((t) => t.clientId === id).sort((a, b) => a.due.localeCompare(b.due));
    const open = tasks.filter((t) => t.status !== "Done");
    const done = tasks.filter((t) => t.status === "Done").reverse();
    const logins = db.users.filter((u) => u.clientId === id);
    const mgr = user(c.manager);
    main.innerHTML =
      '<a class="back" href="#/clients">← All clients</a>' +
      '<div class="page-head"><div><p class="kicker">' + esc(c.type) + " · client since " + esc(fmtDate(c.since)) + "</p><h1>" + esc(c.name) + (c.status === "Inactive" ? ' <span class="pill st-todo" style="vertical-align:middle">Inactive</span>' : "") + "</h1></div>" +
      '<div class="actions"><button class="btn ghost" id="edit">Edit details</button><button class="btn amber" id="add">+ Add work</button></div></div>' +
      '<div class="detail-grid"><div class="col" style="display:flex;flex-direction:column;gap:18px">' +
      '<div class="card"><h2 style="margin-bottom:12px">Details</h2><dl class="kv">' +
      "<dt>Contact</dt><dd>" + esc(c.contact || "—") + "</dd><dt>Email</dt><dd>" + (c.email ? '<a href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a>" : "—") + "</dd>" +
      "<dt>Phone</dt><dd>" + esc(c.phone || "—") + "</dd><dt>City</dt><dd>" + esc(c.city || "—") + "</dd>" +
      '<dt>PAN</dt><dd class="mono">' + esc(c.pan || "—") + '</dd><dt>GSTIN</dt><dd class="mono">' + esc(c.gstin || "—") + "</dd>" +
      "<dt>Manager</dt><dd>" + esc(mgr ? mgr.name : "—") + "</dd><dt>Services</dt><dd>" + (c.services.map((s) => '<span class="chip">' + esc(s) + "</span>").join(" ") || "—") + "</dd></dl></div>" +
      '<div class="card"><div class="card-head"><h2>Portal access</h2><button class="btn sm ghost" id="invite">' + (logins.length ? "+ Add login" : "Give access") + "</button></div>" +
      (logins.length ? '<ul class="rows">' + logins.map((u) => "<li>" + avatar(u, "sm") + '<div class="grow"><div class="t">' + esc(u.name) + '</div><div class="sub">' + esc(u.email) + '</div></div><button class="btn sm ghost" data-reset="' + u.id + '">Reset</button><button class="btn sm danger" data-revoke="' + u.id + '">Remove</button></li>').join("") + "</ul>"
        : '<p class="muted small" style="margin:0">No client login yet. Give access so ' + esc(firstName(c.contact) || "the client") + " can see status, deadlines and requests.</p>") + "</div>" +
      "</div>" +
      '<div class="col" style="display:flex;flex-direction:column;gap:18px">' +
      '<div class="card"><div class="card-head"><h2>Open work <span class="muted small">(' + open.length + ')</span></h2></div><ul class="rows">' + (open.map((t) => taskRow(t, false)).join("") || '<li class="empty">All caught up for this client.</li>') + "</ul></div>" +
      '<div class="card"><div class="card-head"><h2>Completed <span class="muted small">(' + done.length + ')</span></h2></div><ul class="rows">' + (done.slice(0, 8).map((t) => taskRow(t, false)).join("") || '<li class="empty">Nothing completed yet.</li>') + "</ul></div>" +
      "</div></div>";
    $("#edit", main).addEventListener("click", () => editClient(id));
    $("#add", main).addEventListener("click", () => editTask(null, { clientId: id }));
    $("#invite", main).addEventListener("click", () => inviteClient(c));
    $$("[data-reset]", main).forEach((b) => b.addEventListener("click", () => setPassword(user(b.dataset.reset))));
    $$("[data-revoke]", main).forEach((b) => b.addEventListener("click", () => {
      const u = user(b.dataset.revoke);
      if (!confirm("Remove portal login for " + u.email + "?")) return;
      db.users = db.users.filter((x) => x.id !== u.id); log("Removed portal login " + u.email + " for " + c.name); save(); route();
    }));
    bindTaskClicks(main);
  }

  function randomPassword() {
    const a = "abcdefghjkmnpqrstuvwxyz23456789"; let s = "";
    const r = new Uint32Array(10); (window.crypto || {}).getRandomValues ? crypto.getRandomValues(r) : r.forEach((_, i) => (r[i] = Math.random() * 1e9));
    r.forEach((n) => (s += a[n % a.length])); return s;
  }

  function inviteClient(c) {
    openModal(
      '<p class="kicker">Client portal</p><h2 style="margin-bottom:16px">Give ' + esc(c.name) + " access</h2>" +
      '<form id="inv"><label class="field"><span>Name</span><input class="input" name="name" required value="' + esc(c.contact) + '"></label>' +
      '<label class="field"><span>Login email</span><input class="input" type="email" name="email" required value="' + esc(c.email) + '"></label>' +
      '<label class="field"><span>Temporary password</span><input class="input mono" name="pw" required minlength="8" value="' + randomPassword() + '"></label>' +
      '<p class="small muted">Share the password with the client over a separate channel (phone or WhatsApp), not in the same email.</p>' +
      '<div class="error" id="inv-err"></div><div class="foot"><button type="button" class="btn ghost" id="cancel">Cancel</button><button class="btn" type="submit">Create login</button></div></form>',
      (m) => {
        $("#cancel", m).addEventListener("click", closeModal);
        $("#inv", m).addEventListener("submit", async (e) => {
          e.preventDefault();
          const f = e.target; const email = f.email.value.trim().toLowerCase();
          if (!/^\S+@\S+\.\S+$/.test(email)) { $("#inv-err").textContent = "Enter a valid email."; return; }
          if (db.users.some((u) => u.email.toLowerCase() === email)) { $("#inv-err").textContent = "That email already has a login."; return; }
          if (f.pw.value.length < 8) { $("#inv-err").textContent = "Use at least 8 characters."; return; }
          const u = { id: uid("u"), name: f.name.value.trim() || c.contact, email, role: "client", clientId: c.id, salt: Math.random().toString(36).slice(2) };
          u.passHash = await hashPassword(f.pw.value, u.salt);
          db.users.push(u); log("Gave portal access to " + email + " (" + c.name + ")"); save(); closeModal(); toast("Portal login created"); route();
        });
      });
  }

  function setPassword(u) {
    openModal(
      '<p class="kicker">Reset password</p><h2 style="margin-bottom:16px">' + esc(u.name) + "</h2>" +
      '<form id="rp"><label class="field"><span>New password</span><input class="input mono" name="pw" minlength="8" required value="' + (u.role === "client" ? randomPassword() : "") + '"></label>' +
      '<div class="error" id="rp-err"></div><div class="foot"><button type="button" class="btn ghost" id="cancel">Cancel</button><button class="btn" type="submit">Set password</button></div></form>',
      (m) => {
        $("#cancel", m).addEventListener("click", closeModal);
        $("#rp", m).addEventListener("submit", async (e) => {
          e.preventDefault();
          const pw = e.target.pw.value; if (pw.length < 8) { $("#rp-err").textContent = "Use at least 8 characters."; return; }
          u.salt = Math.random().toString(36).slice(2); u.passHash = await hashPassword(pw, u.salt);
          log("Reset password for " + u.email); save(); closeModal(); toast("Password updated");
        });
      });
  }

  // ---------------------------------------------------------------- tasks
  function editTask(id, preset) {
    const t = id ? task(id) : Object.assign({ clientId: (db.clients.find((c) => c.status === "Active") || {}).id, title: "", service: "GST", assignee: me.id, due: todayISO(), status: "To do", priority: "Normal" }, preset || {});
    if (preset && preset.clientId && !id) { const c = client(preset.clientId); if (c) { t.assignee = c.manager; t.service = c.services[0] || "GST"; } }
    openModal(
      '<p class="kicker">' + (id ? "Edit work item" : "New work item") + '</p><h2 style="margin-bottom:16px">' + (id ? esc(t.title) : "Add work") + "</h2>" +
      '<form id="tf"><label class="field"><span>Task</span><input class="input" name="title" required placeholder="e.g. GSTR-3B for October" value="' + esc(t.title) + '"></label>' +
      '<div class="grid-2"><label class="field"><span>Client</span><select class="input" name="clientId">' + options(db.clients.filter((c) => c.status === "Active" || c.id === t.clientId).sort((a, b) => a.name.localeCompare(b.name)), t.clientId, (c) => c.name) + "</select></label>" +
      '<label class="field"><span>Service</span><select class="input" name="service">' + options(SERVICES, t.service) + "</select></label>" +
      '<label class="field"><span>Assigned to</span><select class="input" name="assignee">' + options(staff(), t.assignee, (u) => u.name) + "</select></label>" +
      '<label class="field"><span>Due date</span><input class="input" type="date" name="due" required value="' + esc(t.due) + '"></label>' +
      '<label class="field"><span>Status</span><select class="input" name="status">' + options(STATUSES, t.status) + "</select></label>" +
      '<label class="field"><span>Priority</span><select class="input" name="priority">' + options(PRIORITIES, t.priority) + "</select></label></div>" +
      '<div class="error" id="tf-err"></div><div class="foot">' + (id ? '<button type="button" class="btn danger left" id="del">Delete</button>' : "") +
      '<button type="button" class="btn ghost" id="cancel">Cancel</button><button class="btn" type="submit">' + (id ? "Save" : "Add work") + "</button></div></form>",
      (m) => {
        $("#cancel", m).addEventListener("click", () => (id ? openTask(id) : closeModal()));
        $("#tf", m).addEventListener("submit", (e) => {
          e.preventDefault();
          const f = e.target;
          if (!f.title.value.trim()) { $("#tf-err").textContent = "Give the task a name."; return; }
          if (!f.clientId.value) { $("#tf-err").textContent = "Add a client first."; return; }
          const data = { title: f.title.value.trim(), clientId: f.clientId.value, service: f.service.value, assignee: f.assignee.value, due: f.due.value, priority: f.priority.value };
          if (id) { const before = t.status; Object.assign(t, data); setStatus(t, f.status.value, before); log("Updated “" + t.title + "” for " + client(t.clientId).name); }
          else { const nt = Object.assign({ id: uid("t"), createdAt: Date.now(), notes: [], status: "To do" }, data); setStatus(nt, f.status.value, "To do"); db.tasks.push(nt); log("Added “" + nt.title + "” for " + client(nt.clientId).name); }
          save(); closeModal(); toast("Work saved"); route();
        });
        const del = $("#del", m);
        if (del) del.addEventListener("click", () => {
          if (!confirm("Delete “" + t.title + "”?")) return;
          db.tasks = db.tasks.filter((x) => x.id !== id); log("Deleted “" + t.title + "”"); save(); closeModal(); toast("Deleted"); route();
        });
      });
  }

  function setStatus(t, status, before) {
    t.status = status;
    if (status === "Done" && before !== "Done") t.completedAt = Date.now();
    if (status !== "Done") delete t.completedAt;
  }

  function openTask(id) {
    const t = task(id); if (!t) return;
    const c = client(t.clientId); const a = user(t.assignee);
    const firm = isFirm();
    const notes = t.notes.filter((n) => firm || n.shared);
    openModal(
      '<p class="kicker">' + esc(t.service) + " · " + esc(c ? c.name : "") + '</p><h2 style="margin-bottom:10px;padding-right:36px">' + esc(t.title) + "</h2>" +
      '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:16px">' + statusPill(t) + '<span class="due ' + dueClass(t) + '" style="font-family:var(--sans);font-weight:700;font-size:13px">' + esc(t.status === "Done" ? "Due " + fmtDate(t.due) : relDue(t.due) + " · " + fmtDate(t.due)) + "</span>" + (t.priority === "High" ? '<span class="chip prio-high">High priority</span>' : "") + "</div>" +
      (firm ? '<dl class="kv" style="margin-bottom:16px"><dt>Assigned</dt><dd>' + esc(a ? a.name : "—") + "</dd><dt>Client</dt><dd><a href=\"#/clients/" + esc(t.clientId) + '" id="to-client">' + esc(c ? c.name : "") + "</a></dd>" + (t.recurring ? "<dt>Source</dt><dd>Compliance schedule</dd>" : "") + "</dl>" +
        '<label class="field"><span>Move to</span><div class="checks" id="mv">' + STATUSES.map((s) => '<label><input type="radio" name="st" value="' + esc(s) + '"' + (s === t.status ? " checked" : "") + ">" + esc(s) + "</label>").join("") + "</div></label>" : "") +
      '<h3 style="margin:6px 0 8px">Conversation</h3><div class="thread">' + (notes.map((n) => { const u = user(n.by); const cls = u && u.role === "client" ? "client" : n.shared ? "" : "internal"; return '<div class="note ' + cls + '"><header><b>' + esc(u ? u.name : "Someone") + "</b><span>" + (firm && !n.shared && !(u && u.role === "client") ? "Internal · " : "") + fmtStamp(n.at) + "</span></header>" + esc(n.text) + "</div>"; }).join("") || '<div class="muted small">No notes yet.</div>') + "</div>" +
      '<form id="nf"><textarea class="input" name="text" placeholder="' + (firm ? "Add a note…" : "Write to your Accrevise team…") + '" required></textarea>' +
      '<div class="foot">' + (firm ? '<label class="small left" style="display:flex;align-items:center;gap:6px"><input type="checkbox" name="shared" style="accent-color:var(--green-900)"> Visible to client</label><button type="button" class="btn ghost" id="edit">Edit details</button>' : "") +
      '<button class="btn" type="submit">' + (firm ? "Add note" : "Send") + "</button></div></form>",
      (m) => {
        if (firm) {
          $("#edit", m).addEventListener("click", () => editTask(id));
          $("#to-client", m).addEventListener("click", closeModal);
          $$("[name=st]", m).forEach((r) => r.addEventListener("change", () => {
            const before = t.status; setStatus(t, r.value, before); log("Moved “" + t.title + "” to " + r.value); save(); toast("Moved to " + r.value); route(); openTask(id);
          }));
        }
        $("#nf", m).addEventListener("submit", (e) => {
          e.preventDefault();
          const text = e.target.text.value.trim(); if (!text) return;
          t.notes.push({ id: uid("n"), at: Date.now(), by: me.id, text, shared: firm ? e.target.shared.checked : true });
          if (!firm && t.status === "Waiting on client") { setStatus(t, "In progress", t.status); }
          log((firm ? "Note on “" : "Client replied on “") + t.title + "”"); save(); route(); openTask(id);
        });
      });
  }

  // ---------------------------------------------------------------- work board
  const workFilter = { q: "", assignee: "", clientId: "", service: "", view: "board", showDone: false };
  function renderWork(main) {
    main.innerHTML =
      '<div class="page-head"><div><p class="kicker">Work</p><h1>What the team is <span class="mark">on</span></h1></div>' +
      '<div class="actions"><div class="tabs" style="margin:0"><button data-view="board">Board</button><button data-view="list">List</button></div><button class="btn amber" id="new-task">+ New task</button></div></div>' +
      '<div class="toolbar"><input class="input search" id="wq" placeholder="Search work…" value="' + esc(workFilter.q) + '">' +
      '<select class="input" id="wa"><option value="">Everyone</option>' + options(staff(), workFilter.assignee, (u) => u.name) + "</select>" +
      '<select class="input" id="wc"><option value="">All clients</option>' + options(db.clients.slice().sort((a, b) => a.name.localeCompare(b.name)), workFilter.clientId, (c) => c.name) + "</select>" +
      '<select class="input" id="wsv"><option value="">All services</option>' + options(SERVICES, workFilter.service) + "</select>" +
      '<label class="small" style="display:flex;gap:6px;align-items:center"><input type="checkbox" id="wd"' + (workFilter.showDone ? " checked" : "") + ' style="accent-color:var(--green-900)"> Show all done</label></div><div id="wbody"></div>';
    const draw = () => {
      $$("[data-view]", main).forEach((b) => b.classList.toggle("active", b.dataset.view === workFilter.view));
      const q = workFilter.q.toLowerCase();
      const recentDone = (t) => workFilter.showDone || (t.completedAt ? Date.now() - t.completedAt < 14 * 864e5 : daysUntil(t.due) >= -14);
      const list = db.tasks.filter((t) =>
        (!workFilter.assignee || t.assignee === workFilter.assignee) &&
        (!workFilter.clientId || t.clientId === workFilter.clientId) &&
        (!workFilter.service || t.service === workFilter.service) &&
        (t.status !== "Done" || recentDone(t)) &&
        (!q || (t.title + " " + ((client(t.clientId) || {}).name || "")).toLowerCase().includes(q))
      ).sort((a, b) => a.due.localeCompare(b.due));
      const body = $("#wbody");
      if (workFilter.view === "board") {
        body.innerHTML = '<div class="board">' + STATUSES.map((s) => {
          const col = list.filter((t) => t.status === s);
          return '<section class="col-k" data-status="' + esc(s) + '"><header>' + esc(s) + "<span>" + col.length + "</span></header>" + col.map((t) => {
            const c = client(t.clientId);
            return '<article class="tcard" draggable="true" data-task="' + t.id + '"><div class="c">' + esc(c ? c.name : "") + '</div><div class="t">' + esc(t.title) + '</div><div class="meta"><span class="due ' + dueClass(t) + '">' + esc(t.status === "Done" ? fmtShort(t.due) : relDue(t.due)) + '</span><span class="chip ' + (t.priority === "High" ? "prio-high" : "") + '">' + esc(t.service) + "</span>" + avatar(user(t.assignee), "sm") + "</div></article>";
          }).join("") + "</section>";
        }).join("") + '</div><p class="footnote">Drag a card to another column to change its status.</p>';
        bindTaskClicks(body); bindDrag(body);
      } else {
        body.innerHTML = '<div class="card"><div class="table-wrap"><table class="data"><thead><tr><th>Due</th><th>Task</th><th>Client</th><th>Service</th><th>Assigned</th><th>Status</th></tr></thead><tbody>' +
          (list.map((t) => '<tr data-task="' + t.id + '"><td><span class="due ' + dueClass(t) + '" style="font-family:var(--sans);font-weight:700;font-size:13px">' + esc(fmtShort(t.due)) + '</span></td><td class="name">' + esc(t.title) + (t.priority === "High" ? ' <span class="chip prio-high">High</span>' : "") + "</td><td>" + esc((client(t.clientId) || {}).name || "") + '</td><td><span class="chip">' + esc(t.service) + "</span></td><td>" + esc((user(t.assignee) || {}).name || "") + "</td><td>" + statusPill(t) + "</td></tr>").join("") || '<tr><td colspan="6" class="empty">No work matches.</td></tr>') +
          "</tbody></table></div></div>";
        bindTaskClicks(body);
      }
    };
    draw();
    $$("[data-view]", main).forEach((b) => b.addEventListener("click", () => { workFilter.view = b.dataset.view; draw(); }));
    $("#wq").addEventListener("input", (e) => { workFilter.q = e.target.value; draw(); });
    $("#wa").addEventListener("change", (e) => { workFilter.assignee = e.target.value; draw(); });
    $("#wc").addEventListener("change", (e) => { workFilter.clientId = e.target.value; draw(); });
    $("#wsv").addEventListener("change", (e) => { workFilter.service = e.target.value; draw(); });
    $("#wd").addEventListener("change", (e) => { workFilter.showDone = e.target.checked; draw(); });
    $("#new-task").addEventListener("click", () => editTask(null));
  }

  function bindDrag(root) {
    let dragId = null;
    $$(".tcard", root).forEach((el) => {
      el.addEventListener("dragstart", (e) => { dragId = el.dataset.task; el.classList.add("dragging"); e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", dragId); });
      el.addEventListener("dragend", () => el.classList.remove("dragging"));
    });
    $$(".col-k", root).forEach((col) => {
      col.addEventListener("dragover", (e) => { e.preventDefault(); col.classList.add("drag-over"); });
      col.addEventListener("dragleave", () => col.classList.remove("drag-over"));
      col.addEventListener("drop", (e) => {
        e.preventDefault(); col.classList.remove("drag-over");
        const t = task(e.dataTransfer.getData("text/plain") || dragId); const s = col.dataset.status;
        if (!t || t.status === s) return;
        const before = t.status; setStatus(t, s, before); log("Moved “" + t.title + "” to " + s); save(); toast("Moved to " + s); route();
      });
    });
  }

  // ---------------------------------------------------------------- schedule
  const sched = { y: new Date().getFullYear(), m: new Date().getMonth(), sel: todayISO(), who: "" };
  function renderSchedule(main) {
    const { y, m } = sched;
    const first = new Date(y, m, 1);
    const start = addDays(first, -((first.getDay() + 6) % 7)); // Monday start
    const tasks = db.tasks.filter((t) => !sched.who || t.assignee === sched.who);
    const byDay = {};
    tasks.forEach((t) => (byDay[t.due] = byDay[t.due] || []).push(t));
    let cells = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => '<div class="dow">' + d + "</div>").join("");
    const cellCount = Math.ceil((((first.getDay() + 6) % 7) + new Date(y, m + 1, 0).getDate()) / 7) * 7;
    for (let i = 0; i < cellCount; i++) {
      const d = addDays(start, i); const k = iso(d);
      const list = (byDay[k] || []).sort((a, b) => (a.status === "Done") - (b.status === "Done"));
      cells += '<div class="day' + (d.getMonth() !== m ? " out" : "") + (k === todayISO() ? " today" : "") + (k === sched.sel ? " sel" : "") + '" data-day="' + k + '"><span class="n">' + d.getDate() + "</span>" +
        list.slice(0, 3).map((t) => '<div class="ev ' + (t.status === "Done" ? "done" : isOverdue(t) ? "loss" : t.status === "Waiting on client" ? "waiting" : "") + '" title="' + esc(t.title + " · " + ((client(t.clientId) || {}).name || "")) + '">' + esc(((client(t.clientId) || {}).name || "").split(" ")[0] + " · " + t.title) + "</div>").join("") +
        (list.length > 3 ? '<div class="ev more">+' + (list.length - 3) + " more</div>" : "") + "</div>";
    }
    const dayList = (byDay[sched.sel] || []).slice().sort((a, b) => a.status.localeCompare(b.status));
    const monthKey = y + "-" + pad(m + 1);
    const monthTasks = tasks.filter((t) => t.due.startsWith(monthKey));
    const preview = db.clients.filter((c) => c.status === "Active").reduce((n, c) => n + complianceFor(c, y, m).filter((it) => !db.tasks.some((t) => t.clientId === c.id && t.title === it.title && t.due === it.due)).length, 0);

    main.innerHTML =
      '<div class="page-head"><div><p class="kicker">Work schedule</p><h1>The month at a <span class="mark">glance</span></h1></div>' +
      '<div class="actions"><select class="input" id="who" style="width:auto"><option value="">Everyone</option>' + options(staff(), sched.who, (u) => u.name) + "</select>" +
      '<button class="btn amber" id="gen"' + (preview ? "" : " disabled title=\"Already generated\"") + ">Generate compliance (" + preview + ")</button></div></div>" +
      '<div class="sched-grid"><div><div class="cal-head"><button class="btn ghost sm" id="prev" aria-label="Previous month">←</button><h2>' + MONTHS_LONG[m] + " " + y + '</h2><button class="btn ghost sm" id="next" aria-label="Next month">→</button><button class="btn ghost sm" id="today">Today</button>' +
      '<span class="small muted" style="margin-left:auto">' + plural(monthTasks.length, "item") + " · " + monthTasks.filter((t) => t.status === "Done").length + " done · " + monthTasks.filter(isOverdue).length + " overdue</span></div>" +
      '<div class="cal">' + cells + "</div>" +
      '<div class="legend small" style="margin-top:10px"><span><i style="background:var(--green-600)"></i>Scheduled</span><span><i style="background:var(--amber-deep)"></i>Waiting on client</span><span><i style="background:var(--loss)"></i>Overdue</span><span><i style="background:var(--green-200)"></i>Done</span></div>' +
      '<p class="footnote">“Generate compliance” adds the usual statutory due dates for each active client’s services (GSTR-1 on the 11th, GSTR-3B on the 20th, TDS deposit on the 7th, advance tax on 15 Jun/Sep/Dec/Mar, ITR, tax audit and ROC dates). Always check for CBIC/CBDT extensions and QRMP clients before filing.</p></div>' +
      '<div class="card"><div class="card-head"><div><p class="kicker" style="margin:0">' + esc(["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][parse(sched.sel).getDay()]) + '</p><h2>' + esc(fmtDate(sched.sel)) + '</h2></div><button class="btn sm" id="add-day">+ Add</button></div>' +
      '<ul class="rows">' + (dayList.map((t) => taskRow(t, true, true)).join("") || '<li class="empty">Nothing scheduled.</li>') + "</ul></div></div>";
    $("#prev").addEventListener("click", () => { sched.m--; if (sched.m < 0) { sched.m = 11; sched.y--; } renderSchedule(main); });
    $("#next").addEventListener("click", () => { sched.m++; if (sched.m > 11) { sched.m = 0; sched.y++; } renderSchedule(main); });
    $("#today").addEventListener("click", () => { const n = new Date(); sched.y = n.getFullYear(); sched.m = n.getMonth(); sched.sel = todayISO(); renderSchedule(main); });
    $("#who").addEventListener("change", (e) => { sched.who = e.target.value; renderSchedule(main); });
    $$("[data-day]", main).forEach((el) => el.addEventListener("click", () => { sched.sel = el.dataset.day; const d = parse(sched.sel); if (d.getMonth() !== sched.m) { sched.m = d.getMonth(); sched.y = d.getFullYear(); } renderSchedule(main); }));
    $("#add-day").addEventListener("click", () => editTask(null, { due: sched.sel }));
    $("#gen").addEventListener("click", () => {
      if (!confirm("Add " + plural(preview, "compliance task") + " for " + MONTHS_LONG[m] + " " + y + "? Each goes to the client’s relationship manager.")) return;
      const n = generateCompliance(db, y, m, false); log("Generated " + plural(n, "compliance task") + " for " + MONTHS_LONG[m] + " " + y); save(); toast(plural(n, "task") + " added"); route();
    });
    bindTaskClicks(main);
  }

  // ---------------------------------------------------------------- team
  function renderTeam(main) {
    const admin = me.role === "admin";
    main.innerHTML =
      '<div class="page-head"><div><p class="kicker">Team</p><h1>The people behind the <span class="mark">numbers</span></h1></div>' +
      '<div class="actions">' + (admin ? '<button class="btn amber" id="add-staff">+ Add team member</button>' : "") + '<button class="btn ghost" id="mypw">Change my password</button></div></div>' +
      '<div class="card"><div class="table-wrap"><table class="data"><thead><tr><th>Name</th><th>Role</th><th>Email</th><th>Clients</th><th>Open</th><th>Overdue</th><th></th></tr></thead><tbody>' +
      staff().map((u) => {
        const open = db.tasks.filter((t) => t.assignee === u.id && t.status !== "Done");
        return '<tr style="cursor:default"><td><div style="display:flex;gap:10px;align-items:center">' + avatar(u, "sm") + '<span class="name">' + esc(u.name) + "</span></div></td><td>" + esc(u.title || u.role) + (u.role === "admin" ? ' <span class="chip">Admin</span>' : "") + "</td><td>" + esc(u.email) + "</td><td>" + db.clients.filter((c) => c.manager === u.id && c.status === "Active").length + "</td><td><b>" + open.length + "</b></td><td>" + (open.filter(isOverdue).length ? '<span class="pill st-overdue">' + open.filter(isOverdue).length + "</span>" : "0") + "</td><td>" +
          (admin && u.id !== me.id ? '<button class="btn sm ghost" data-reset="' + u.id + '">Reset password</button>' : "") + "</td></tr>";
      }).join("") + "</tbody></table></div></div>" +
      (admin ? '<div class="card" style="margin-top:18px"><h2 style="margin-bottom:6px">Demo data</h2><p class="muted small" style="margin:0 0 12px">Everything in this workspace is stored in this browser only. Reset to start again from the sample practice.</p><button class="btn danger sm" id="reset">Reset demo data</button></div>' : "");
    $("#mypw").addEventListener("click", () => setPassword(me));
    $$("[data-reset]", main).forEach((b) => b.addEventListener("click", () => setPassword(user(b.dataset.reset))));
    if (admin) {
      $("#add-staff").addEventListener("click", addStaff);
      $("#reset").addEventListener("click", async () => {
        if (!confirm("Erase all workspace data in this browser and reload the demo practice?")) return;
        localStorage.removeItem(DB_KEY); sessionStorage.removeItem(SESSION_KEY); me = null; await load(); location.hash = ""; route(); toast("Demo data restored");
      });
    }
  }

  function addStaff() {
    openModal(
      '<p class="kicker">Team</p><h2 style="margin-bottom:16px">Add a team member</h2><form id="sf"><div class="grid-2">' +
      '<label class="field"><span>Name</span><input class="input" name="name" required></label>' +
      '<label class="field"><span>Job title</span><input class="input" name="title" placeholder="e.g. Tax associate"></label>' +
      '<label class="field"><span>Email</span><input class="input" type="email" name="email" required></label>' +
      '<label class="field"><span>Access</span><select class="input" name="role"><option value="staff">Staff</option><option value="admin">Admin</option></select></label></div>' +
      '<label class="field"><span>Temporary password</span><input class="input mono" name="pw" minlength="8" required value="' + randomPassword() + '"></label>' +
      '<div class="error" id="sf-err"></div><div class="foot"><button type="button" class="btn ghost" id="cancel">Cancel</button><button class="btn" type="submit">Add</button></div></form>',
      (m) => {
        $("#cancel", m).addEventListener("click", closeModal);
        $("#sf", m).addEventListener("submit", async (e) => {
          e.preventDefault(); const f = e.target; const email = f.email.value.trim().toLowerCase();
          if (!f.name.value.trim()) { $("#sf-err").textContent = "Enter a name."; return; }
          if (db.users.some((u) => u.email.toLowerCase() === email)) { $("#sf-err").textContent = "That email is already in use."; return; }
          const u = { id: uid("u"), name: f.name.value.trim(), title: f.title.value.trim(), email, role: f.role.value, salt: Math.random().toString(36).slice(2) };
          u.passHash = await hashPassword(f.pw.value, u.salt);
          db.users.push(u); log("Added team member " + u.name); save(); closeModal(); toast("Team member added"); route();
        });
      });
  }

  // ---------------------------------------------------------------- client portal
  function renderPortal(main) {
    const c = client(me.clientId);
    if (!c) { main.innerHTML = '<div class="card empty">Your account is not linked to a client yet.</div>'; return; }
    const tasks = db.tasks.filter((t) => t.clientId === c.id);
    const open = tasks.filter((t) => t.status !== "Done").sort((a, b) => a.due.localeCompare(b.due));
    const needs = open.filter((t) => t.status === "Waiting on client");
    const progress = open.filter((t) => t.status !== "Waiting on client");
    const done = tasks.filter((t) => t.status === "Done").sort((a, b) => b.due.localeCompare(a.due));
    const mgr = user(c.manager);
    main.innerHTML =
      '<div class="portal-hero"><span class="ring"></span><p class="kicker" style="color:var(--green-200)">' + esc(c.name) + "</p><h1>Hello, " + esc(firstName(me.name)) + ". " +
      (needs.length ? '<span class="mark">' + plural(needs.length, "thing") + "</span> need" + (needs.length === 1 ? "s" : "") + " you." : 'You’re <span class="mark">all set.</span>') + "</h1>" +
      "<p>" + (needs.length ? "Send these over and we’ll take it from there. Everything else is on track with your Accrevise team." : "Nothing is waiting on you. Here’s what your Accrevise team is working on.") + "</p></div>" +
      '<div class="kpis" style="grid-template-columns:repeat(3,minmax(0,1fr))">' +
      '<div class="card kpi"><p class="kicker">Needs you</p><div class="v" style="color:' + (needs.length ? "var(--amber-deep)" : "inherit") + '">' + needs.length + "</div></div>" +
      '<div class="card kpi"><p class="kicker">In progress</p><div class="v">' + progress.length + "</div></div>" +
      '<div class="card kpi"><p class="kicker">Completed</p><div class="v">' + done.length + "</div></div></div>" +
      '<div class="dash-grid"><div class="col">' +
      (needs.length ? '<div class="card"><div class="card-head"><h2>Needs your action</h2></div>' + needs.map((t) => {
        const ask = t.notes.filter((n) => n.shared).slice(-1)[0];
        return '<div class="action-item"><div class="row"><div><b>' + esc(t.title) + '</b><div class="small muted">' + esc(t.service) + " · " + esc(relDue(t.due)) + "</div></div>" + statusPill(t) + "</div>" +
          (ask ? '<p class="small" style="margin:8px 0 0">“' + esc(ask.text) + "”</p>" : "") +
          '<form class="reply" data-reply="' + t.id + '"><input class="input" name="text" placeholder="e.g. Uploaded to the shared folder / sent by email" required><button class="btn sm amber" type="submit">Mark as sent</button></form></div>';
      }).join("") + "</div>" : "") +
      '<div class="card"><div class="card-head"><h2>What we’re working on</h2></div><ul class="rows">' + (progress.map((t) => taskRow(t, false)).join("") || '<li class="empty">Nothing open right now.</li>') + "</ul></div>" +
      '<div class="card"><div class="card-head"><h2>Completed for you</h2></div><ul class="rows">' + (done.slice(0, 8).map((t) => taskRow(t, false)).join("") || '<li class="empty">Nothing yet.</li>') + "</ul></div>" +
      '</div><div class="col">' +
      '<div class="card"><p class="kicker">Your Accrevise manager</p><div style="display:flex;gap:12px;align-items:center;margin:8px 0 6px">' + avatar(mgr) + "<div><b style=\"font-family:var(--sans)\">" + esc(mgr ? mgr.name : "Accrevise team") + '</b><div class="small muted">' + esc(mgr ? mgr.title || "" : "") + "</div></div></div>" + (mgr ? '<a href="mailto:' + esc(mgr.email) + '" class="small">' + esc(mgr.email) + "</a>" : "") + "</div>" +
      '<div class="card"><p class="kicker">On file</p><dl class="kv"><dt>PAN</dt><dd class="mono">' + esc(c.pan || "—") + '</dd><dt>GSTIN</dt><dd class="mono">' + esc(c.gstin || "—") + "</dd><dt>Services</dt><dd>" + c.services.map((s) => '<span class="chip">' + esc(s) + "</span>").join(" ") + "</dd></dl></div>" +
      '<div class="card"><p class="kicker">Upcoming deadlines</p><ul class="rows">' + (open.slice(0, 6).map((t) => '<li class="click" data-task="' + t.id + '">' + dateBox(t) + '<div class="grow"><div class="t">' + esc(t.title) + '</div><div class="sub">' + esc(relDue(t.due)) + "</div></div></li>").join("") || '<li class="empty">No upcoming deadlines.</li>') + "</ul></div>" +
      "</div></div>" +
      '<p class="footnote">Questions about a filing? Open it and send a message; your manager sees it straight away.</p>';
    $$("[data-reply]", main).forEach((f) => f.addEventListener("submit", (e) => {
      e.preventDefault(); const t = task(f.dataset.reply); const text = f.text.value.trim(); if (!text) return;
      t.notes.push({ id: uid("n"), at: Date.now(), by: me.id, text, shared: true });
      setStatus(t, "In progress", t.status); log(me.name + " sent documents for “" + t.title + "”"); save(); toast("Thanks! Your team has been told."); route();
    }));
    bindTaskClicks(main);
  }

  // ---------------------------------------------------------------- boot
  if ("serviceWorker" in navigator && window.isSecureContext && location.protocol !== "file:") {
    window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
  }

  (async function boot() {
    await load();
    const sid = sessionStorage.getItem(SESSION_KEY);
    me = sid ? user(sid) || null : null;
    route();
  })();
})();
