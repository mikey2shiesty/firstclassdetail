import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function sameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function Calendar({ value, onChange }) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [month, setMonth] = useState(() => {
    const d = value ? new Date(value) : new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const firstWeekday = month.getDay();
  const daysInMonth = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0,
  ).getDate();
  const cells = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++)
    cells.push(new Date(month.getFullYear(), month.getMonth(), d));

  const selected = value ? new Date(value) : null;

  return (
    <div className="rounded-2xl border border-navy/5 bg-white p-5 shadow-soft">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() =>
            setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))
          }
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-navy/10 text-navy transition hover:border-gold hover:text-gold-700"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="font-display text-lg font-semibold tracking-tight text-navy">
          {MONTHS[month.getMonth()]} {month.getFullYear()}
        </div>
        <button
          type="button"
          onClick={() =>
            setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))
          }
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-navy/10 text-navy transition hover:border-gold hover:text-gold-700"
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold uppercase tracking-wider text-navy/45">
        {DAYS.map((d, i) => (
          <div key={i} className="py-1.5">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const isPast = d < today;
          const isToday = sameDay(d, today);
          const isSelected = selected && sameDay(d, selected);
          // Make Sundays unavailable as a stylistic touch
          const isClosed = d.getDay() === 0;
          const disabled = isPast || isClosed;
          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => onChange(d.toISOString())}
              className={`relative aspect-square rounded-xl text-sm font-semibold transition-all ${
                disabled
                  ? "cursor-not-allowed text-navy/25 line-through"
                  : isSelected
                    ? "bg-navy text-white shadow-soft ring-2 ring-gold"
                    : isToday
                      ? "bg-gold/15 text-navy ring-1 ring-gold/40 hover:bg-gold/25"
                      : "text-navy hover:bg-navy/5"
              }`}
              aria-label={d.toDateString()}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-navy/5 pt-3 text-[11px] text-navy/55">
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-navy" /> Selected
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-gold/40" /> Today
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-navy/20" /> Unavailable
        </div>
      </div>
    </div>
  );
}
