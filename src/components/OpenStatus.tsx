import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { useI18n, type DictKey } from "@/lib/i18n";
import { CONTACT } from "@/lib/contact";

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

function computeStatus(now: Date) {
  const day = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  const today = CONTACT.hoursByDay.find((h) => h.day === day);
  if (today) {
    const o = toMin(today.open);
    const c = toMin(today.close);
    if (mins >= o && mins < c) return { open: true, until: today.close };
  }
  // find next opening
  for (let i = 1; i <= 7; i++) {
    const next = CONTACT.hoursByDay.find((h) => h.day === (day + i) % 7);
    if (next) return { open: false, nextDay: (day + i) % 7, nextOpen: next.open };
  }
  return { open: false };
}

export function OpenStatus({ className = "" }: { className?: string }) {
  const { t } = useI18n();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;
  const s = computeStatus(now);

  if (!s.open) return null;

  return (
    <span
      className={
        "inline-flex items-center gap-2 rounded-full border border-emerald-deep/40 bg-emerald-deep/10 px-3 py-1 text-xs font-medium text-emerald-deep " +
        className
      }
    >
      <span className="h-2 w-2 rounded-full bg-emerald-deep" />
      {t("hours.openNow")} · {t("hours.closesAt")} {s.until}
    </span>
  );
}

export function HoursTable() {
  const { t } = useI18n();
  const today = new Date().getDay();
  const order = [1, 2, 3, 4, 5, 6, 0];
  return (
    <div className="rounded-md border border-border bg-card p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Clock size={18} />
        </div>
        <h3 className="font-display text-lg text-foreground">{t("hours.title")}</h3>
        <div className="ml-auto">
          <OpenStatus />
        </div>
      </div>
      <ul className="mt-4 divide-y divide-border text-sm">
        {order.map((d) => {
          const h = CONTACT.hoursByDay.find((x) => x.day === d);
          const isToday = d === today;
          return (
            <li
              key={d}
              className={
                "flex items-center justify-between py-2 " +
                (isToday ? "font-semibold text-foreground" : "text-muted-foreground")
              }
            >
              <span>{t(("hours.day." + d) as DictKey)}</span>
              <span className="tabular-nums">
                {h ? `${h.open} — ${h.close}` : "—"}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
