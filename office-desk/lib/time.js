// All office dates are India time (IST).
const fmt = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" });
export const istDay = (d = new Date()) => fmt.format(d);
export const istHM = (d = new Date()) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(d);
export const istHuman = (day) =>
  new Date(day + "T12:00:00+05:30").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", timeZone: "Asia/Kolkata" });
/** Start of the given IST day as a UTC timestamp. */
export const istDayStart = (day) => Date.parse(day + "T00:00:00+05:30");
/** Next working day after `day` (WORK_DAYS env, default Mon–Sat = "1,2,3,4,5,6", Sunday = 0). */
export function nextWorkDay(day = istDay()) {
  const work = (process.env.WORK_DAYS || "1,2,3,4,5,6").split(",").map(Number);
  let t = Date.parse(day + "T12:00:00+05:30");
  for (let i = 0; i < 7; i++) {
    t += 864e5;
    const d = new Date(t);
    const dow = new Date(istDay(d) + "T12:00:00Z").getUTCDay();
    if (work.includes(dow)) return istDay(d);
  }
  return istDay(new Date(Date.parse(day + "T12:00:00+05:30") + 864e5));
}
