import { useMemo, useState } from "react";
import { Calendar, Mail, MessageCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { CONTACT } from "@/lib/contact";

const pad = (n: number) => String(n).padStart(2, "0");

function defaultDate() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function buildMessage(opts: {
  name: string;
  guests: number;
  date: string;
  time: string;
  notes: string;
}) {
  const lines = [
    `Sultan Grill House — Rezervasyon / Reservation`,
    `Ad / Name: ${opts.name}`,
    `Tarih / Date: ${opts.date}`,
    `Saat / Time: ${opts.time}`,
    `Kişi / Guests: ${opts.guests}`,
  ];
  if (opts.notes.trim()) lines.push(`Not / Notes: ${opts.notes.trim()}`);
  return lines.join("\n");
}

export function ReservationForm() {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState(defaultDate());
  const [time, setTime] = useState("19:30");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);

  const minDate = useMemo(() => defaultDate(), []);

  // Generate 30-min time slots within opening hours.
  const timeSlots = useMemo(() => {
    const slots: string[] = [];
    for (let h = 9; h <= 22; h++) {
      slots.push(`${pad(h)}:00`);
      slots.push(`${pad(h)}:30`);
    }
    slots.push("23:00");
    return slots;
  }, []);

  const validate = () => {
    if (!name.trim() || !date || !time) {
      setError(t("reserve.fillRequired"));
      return false;
    }
    setError(null);
    return true;
  };

  const sendWhatsApp = () => {
    if (!validate()) return;
    const msg = buildMessage({ name, guests, date, time, notes });
    const url = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const sendEmail = () => {
    if (!validate()) return;
    const subject = `Rezervasyon — ${name} (${date} ${time}, ${guests} kişi)`;
    const body = buildMessage({ name, guests, date, time, notes });
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="rounded-md border border-border bg-card p-6 md:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Calendar size={18} />
        </div>
        <div>
          <p className="font-body text-xs uppercase tracking-[0.3em] text-primary">
            {t("reserve.kicker")}
          </p>
          <h3 className="font-display text-2xl text-foreground">
            {t("reserve.title")}
          </h3>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{t("reserve.subtitle")}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Field label={t("reserve.name")}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            autoComplete="name"
            required
          />
        </Field>
        <Field label={t("reserve.guests")}>
          <input
            type="number"
            min={1}
            max={30}
            value={guests}
            onChange={(e) => setGuests(Math.max(1, Number(e.target.value) || 1))}
            className="input"
          />
        </Field>
        <Field label={t("reserve.date")}>
          <input
            type="date"
            min={minDate}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input"
            required
          />
        </Field>
        <Field label={t("reserve.time")}>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="input"
            required
          >
            {timeSlots.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <div className="md:col-span-2">
          <Field label={t("reserve.notes")}>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder={t("reserve.notesPh")}
              className="input resize-none"
            />
          </Field>
        </div>
      </div>

      {error && (
        <p className="mt-3 text-sm text-burgundy-deep" role="alert">
          {error}
        </p>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={sendWhatsApp}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-deep px-6 py-3 font-body text-sm uppercase tracking-[0.18em] text-ivory transition-opacity hover:opacity-90"
        >
          <MessageCircle size={16} /> {t("reserve.viaWhatsapp")}
        </button>
        <button
          type="button"
          onClick={sendEmail}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-body text-sm uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Mail size={16} /> {t("reserve.viaEmail")}
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
