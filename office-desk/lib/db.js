// SQLite storage using Node's built-in driver (no native build needed).
import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const DATA_DIR = process.env.DATA_DIR || "./data";
fs.mkdirSync(DATA_DIR, { recursive: true });
export const db = new DatabaseSync(path.join(DATA_DIR, "office-desk.db"));

db.exec(`
PRAGMA journal_mode = WAL;
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  kind TEXT NOT NULL CHECK (kind IN ('owner','employee','client')),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  area TEXT DEFAULT '',
  pin_hash TEXT,
  active INTEGER NOT NULL DEFAULT 1,
  created_at INTEGER NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS users_email ON users(lower(email)) WHERE email IS NOT NULL AND email <> '';
CREATE UNIQUE INDEX IF NOT EXISTS users_phone ON users(phone) WHERE phone IS NOT NULL AND phone <> '';
CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS logs (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  ts INTEGER NOT NULL,
  day TEXT NOT NULL,
  area TEXT NOT NULL,
  client TEXT DEFAULT '',
  text TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('done','in-progress','blocked')),
  next TEXT DEFAULT '',
  via TEXT DEFAULT 'form'
);
CREATE INDEX IF NOT EXISTS logs_user ON logs(user_id, ts);
CREATE INDEX IF NOT EXISTS logs_day ON logs(day);
CREATE TABLE IF NOT EXISTS asks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  ts INTEGER NOT NULL,
  q TEXT NOT NULL,
  a TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS training (
  user_id TEXT NOT NULL,
  module TEXT NOT NULL,
  score INTEGER NOT NULL,
  at INTEGER NOT NULL,
  PRIMARY KEY (user_id, module)
);
CREATE TABLE IF NOT EXISTS plans (
  day TEXT PRIMARY KEY,
  items TEXT NOT NULL DEFAULT '{}',
  note TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft',
  emails TEXT NOT NULL DEFAULT '[]',
  updated_at INTEGER NOT NULL,
  review_sent_at INTEGER,
  sent_at INTEGER
);
`);

export const newId = () => crypto.randomBytes(9).toString("base64url");

export function hashPin(pin) {
  const salt = crypto.randomBytes(16);
  const hash = crypto.scryptSync(String(pin), salt, 32);
  return `${salt.toString("hex")}:${hash.toString("hex")}`;
}
export function checkPin(pin, stored) {
  if (!stored) return false;
  const [salt, hash] = stored.split(":");
  const test = crypto.scryptSync(String(pin), Buffer.from(salt, "hex"), 32);
  return crypto.timingSafeEqual(test, Buffer.from(hash, "hex"));
}

export const q = {
  userById: db.prepare("SELECT * FROM users WHERE id = ?"),
  userByEmail: db.prepare("SELECT * FROM users WHERE lower(email) = lower(?)"),
  userByPhone: db.prepare("SELECT * FROM users WHERE phone = ?"),
  owner: db.prepare("SELECT * FROM users WHERE kind = 'owner' LIMIT 1"),
  employees: db.prepare("SELECT id, name, email, area, active FROM users WHERE kind = 'employee' ORDER BY created_at"),
  activeEmployees: db.prepare("SELECT id, name, email, area FROM users WHERE kind = 'employee' AND active = 1 ORDER BY created_at"),
  clients: db.prepare("SELECT id, name, phone, email, created_at FROM users WHERE kind = 'client' ORDER BY created_at DESC"),
  insertUser: db.prepare("INSERT INTO users (id, kind, name, email, phone, area, pin_hash, active, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?)"),
  session: db.prepare("SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token = ? AND u.active = 1"),
  insertSession: db.prepare("INSERT INTO sessions (token, user_id, created_at) VALUES (?, ?, ?)"),
  deleteSession: db.prepare("DELETE FROM sessions WHERE token = ?"),
  insertLog: db.prepare("INSERT INTO logs (id, user_id, ts, day, area, client, text, status, next, via) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"),
  myLogs: db.prepare("SELECT * FROM logs WHERE user_id = ? ORDER BY ts DESC LIMIT 50"),
  logsSince: db.prepare("SELECT l.*, u.name AS who, u.kind AS kind FROM logs l JOIN users u ON u.id = l.user_id WHERE l.ts >= ? ORDER BY l.ts DESC"),
  logsForUserSince: db.prepare("SELECT * FROM logs WHERE user_id = ? AND ts >= ? ORDER BY ts"),
  insertAsk: db.prepare("INSERT INTO asks (user_id, ts, q, a) VALUES (?, ?, ?, ?)"),
  clientAsks: db.prepare("SELECT a.ts, a.q, a.a, u.name AS who, u.kind AS kind FROM asks a JOIN users u ON u.id = a.user_id WHERE u.kind <> 'owner' ORDER BY a.ts DESC LIMIT 25"),
  myTraining: db.prepare("SELECT module, score, at FROM training WHERE user_id = ?"),
  allTraining: db.prepare("SELECT user_id, module, score FROM training"),
  upsertTraining: db.prepare("INSERT INTO training (user_id, module, score, at) VALUES (?, ?, ?, ?) ON CONFLICT(user_id, module) DO UPDATE SET score = excluded.score, at = excluded.at"),
  plan: db.prepare("SELECT * FROM plans WHERE day = ?"),
  upsertPlan: db.prepare(`INSERT INTO plans (day, items, note, status, emails, updated_at) VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(day) DO UPDATE SET items = excluded.items, note = excluded.note, status = excluded.status, emails = excluded.emails, updated_at = excluded.updated_at`),
  markReviewSent: db.prepare("UPDATE plans SET review_sent_at = ? WHERE day = ?"),
  markPlanSent: db.prepare("UPDATE plans SET status = 'sent', sent_at = ? WHERE day = ?"),
};

export function readPlan(day) {
  const p = q.plan.get(day);
  if (!p) return { day, items: {}, note: "", status: "draft", emails: [] };
  return { ...p, items: JSON.parse(p.items), emails: JSON.parse(p.emails) };
}
export function savePlan(day, { items, note, status, emails }) {
  q.upsertPlan.run(day, JSON.stringify(items || {}), note || "", status || "draft", JSON.stringify(emails || []), Date.now());
}

/** Create or update the owner account from environment variables on every start. */
export function ensureOwner({ name, email, password }) {
  if (!email || !password) throw new Error("Set OWNER_EMAIL and OWNER_PASSWORD in .env");
  const existing = q.owner.get();
  if (existing) {
    db.prepare("UPDATE users SET name = ?, email = ?, pin_hash = ? WHERE id = ?").run(name || existing.name, email, checkPin(password, existing.pin_hash) ? existing.pin_hash : hashPin(password), existing.id);
  } else {
    q.insertUser.run(newId(), "owner", name || "Owner", email, null, "", hashPin(password), Date.now());
  }
}
