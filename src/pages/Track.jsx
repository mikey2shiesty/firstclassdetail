import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  BadgeCheck,
  Star,
  Phone,
  MessageSquare,
  Truck,
  CheckCircle2,
  Clock,
  Navigation,
  CarFront,
} from "lucide-react";
import Reveal from "../components/Reveal";
import { ZONES } from "../lib/data";

const STAGES = [
  { id: "confirmed", label: "Confirmed", icon: CheckCircle2 },
  { id: "dispatched", label: "Dispatched", icon: Navigation },
  { id: "enroute", label: "En Route", icon: Truck },
  { id: "arrived", label: "Arrived", icon: CarFront },
  { id: "complete", label: "Complete", icon: CheckCircle2 },
];

export default function Track() {
  const operator = ZONES[0].operator; // Michael — Cockburn
  const [stageIdx, setStageIdx] = useState(2); // En Route
  const [eta, setEta] = useState(12);

  // Decrement ETA every 4s for demo "movement"
  useEffect(() => {
    const i = setInterval(() => {
      setEta((e) => (e <= 1 ? 12 : e - 1));
    }, 4000);
    return () => clearInterval(i);
  }, []);

  return (
    <section className="bg-navy-50/40">
      <div className="container-x py-10 md:py-14">
        {/* ETA banner */}
        <Reveal>
          <div className="overflow-hidden rounded-3xl bg-navy text-white shadow-elevated">
            <div className="grid items-center gap-4 p-6 md:grid-cols-12 md:gap-6 md:p-8">
              <div className="flex items-center gap-4 md:col-span-7">
                <div className="relative">
                  <img
                    src={operator.avatar}
                    alt={operator.name}
                    className="h-16 w-16 rounded-full object-cover ring-2 ring-gold/60"
                  />
                  <span className="absolute -bottom-1 -right-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-navy">
                    <CheckCircle2 className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
                    On Your Way
                  </div>
                  <div className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                    {operator.name} is on the way
                  </div>
                  <div className="text-sm text-white/65">
                    Cockburn Zone · ETA{" "}
                    <span className="font-semibold text-gold">
                      {eta} minute{eta === 1 ? "" : "s"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 md:col-span-5 md:justify-end">
                <button className="btn border border-white/15 bg-white/[0.06] text-white hover:bg-white/[0.12]">
                  <Phone className="h-4 w-4" /> Call {operator.name}
                </button>
                <button className="btn-gold">
                  <MessageSquare className="h-4 w-4" /> Message
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="border-t border-white/10 bg-white/[0.03] p-6 md:p-8">
              <div className="relative">
                <div className="absolute left-0 right-0 top-5 h-1 rounded-full bg-white/10" />
                <motion.div
                  className="absolute left-0 top-5 h-1 rounded-full bg-gradient-to-r from-gold via-gold-300 to-gold"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(stageIdx / (STAGES.length - 1)) * 100}%`,
                  }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                />
                <ol className="relative grid grid-cols-5 gap-1">
                  {STAGES.map((s, i) => {
                    const Icon = s.icon;
                    const done = i < stageIdx;
                    const active = i === stageIdx;
                    return (
                      <li
                        key={s.id}
                        className="flex flex-col items-center gap-2 text-center"
                      >
                        <motion.div
                          initial={{ scale: 0.7 }}
                          animate={{ scale: 1 }}
                          className={`relative inline-flex h-11 w-11 items-center justify-center rounded-full ring-2 transition ${
                            done
                              ? "bg-gold text-navy ring-gold"
                              : active
                                ? "bg-white text-navy ring-gold shadow-gold"
                                : "bg-white/5 text-white/45 ring-white/10"
                          }`}
                        >
                          {active && (
                            <span className="absolute inset-0 animate-ping rounded-full bg-gold/40" />
                          )}
                          <Icon className="relative h-5 w-5" strokeWidth={2.4} />
                        </motion.div>
                        <span
                          className={`text-[11px] font-semibold uppercase tracking-wider ${
                            done || active ? "text-white" : "text-white/45"
                          }`}
                        >
                          {s.label}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/55">
                <button
                  className="rounded-full border border-white/15 px-3 py-1 hover:border-gold hover:text-gold"
                  onClick={() => setStageIdx((s) => Math.min(STAGES.length - 1, s + 1))}
                >
                  Demo · Advance stage
                </button>
                <span>Reference · FCD-2487</span>
                <span>·</span>
                <span>Premium Detail · 1:00 pm</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Map + sidebar */}
        <div className="mt-8 grid gap-6 md:grid-cols-12">
          <Reveal className="md:col-span-8">
            <MapView />
          </Reveal>

          <Reveal className="md:col-span-4" delay={0.1}>
            <OperatorCard operator={operator} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MapView() {
  const [t, setT] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setT((x) => (x + 1) % 1000), 80);
    return () => clearInterval(i);
  }, []);

  // route bezier — start (operator) -> end (customer)
  const start = { x: 80, y: 320 };
  const c1 = { x: 250, y: 120 };
  const c2 = { x: 470, y: 420 };
  const end = { x: 700, y: 220 };

  const progress = (t % 200) / 200;
  const p = bezier(start, c1, c2, end, 0.05 + progress * 0.6);

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-navy/5 bg-gradient-to-br from-navy-50 via-white to-gold-50 shadow-soft">
      <svg
        viewBox="0 0 800 500"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <pattern id="streets" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M0 0 L48 0 M0 0 L0 48" stroke="#1A2744" strokeOpacity="0.05" strokeWidth="1" />
          </pattern>
          <linearGradient id="route" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C9A84C" />
            <stop offset="100%" stopColor="#1A2744" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="800" height="500" fill="url(#streets)" />

        {/* Major roads */}
        <path d="M0 380 L800 380" stroke="#5A6A8E" strokeOpacity="0.18" strokeWidth="6" />
        <path d="M0 200 L800 200" stroke="#5A6A8E" strokeOpacity="0.18" strokeWidth="6" />
        <path d="M280 0 L280 500" stroke="#5A6A8E" strokeOpacity="0.18" strokeWidth="6" />
        <path d="M540 0 L540 500" stroke="#5A6A8E" strokeOpacity="0.18" strokeWidth="6" />

        {/* river */}
        <path
          d="M0 460 Q 200 420 380 470 Q 580 510 800 450"
          fill="none"
          stroke="#8E9BB6"
          strokeOpacity="0.45"
          strokeWidth="14"
          strokeLinecap="round"
        />

        {/* park polygons */}
        <rect x="320" y="240" width="160" height="100" rx="14" fill="#C9A84C" opacity="0.12" />
        <rect x="600" y="60" width="120" height="80" rx="14" fill="#C9A84C" opacity="0.12" />

        {/* route line (full) */}
        <path
          d={`M${start.x} ${start.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${end.x} ${end.y}`}
          fill="none"
          stroke="url(#route)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="2 14"
          opacity="0.85"
        />
        {/* route line (traveled) */}
        <path
          d={`M${start.x} ${start.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${end.x} ${end.y}`}
          fill="none"
          stroke="#C9A84C"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={`${pathLength(progress)} 9999`}
        />

        {/* Origin pin (operator base) */}
        <g transform={`translate(${start.x} ${start.y})`}>
          <circle r="22" fill="#1A2744" opacity="0.1" />
          <circle r="11" fill="#1A2744" />
          <circle r="4" fill="#fff" />
        </g>

        {/* Destination pin (customer) */}
        <g transform={`translate(${end.x} ${end.y})`}>
          <circle r="22" fill="#C9A84C" opacity="0.18" />
          <circle r="14" fill="#C9A84C" />
          <path
            d="M -4 0 L -1 3 L 5 -3"
            stroke="#1A2744"
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Moving van */}
        <g transform={`translate(${p.x} ${p.y})`}>
          <circle r="22" fill="#1A2744" opacity="0.18" />
          <g transform="translate(-14 -10)">
            <rect width="28" height="20" rx="4" fill="#1A2744" />
            <rect x="2" y="4" width="10" height="8" rx="1.5" fill="#C9A84C" />
            <circle cx="8" cy="22" r="3.2" fill="#1A2744" stroke="#C9A84C" strokeWidth="1.5" />
            <circle cx="22" cy="22" r="3.2" fill="#1A2744" stroke="#C9A84C" strokeWidth="1.5" />
          </g>
        </g>
      </svg>

      {/* Top-left "you are here" tag */}
      <div className="pointer-events-none absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-navy shadow-soft ring-1 ring-navy/5">
        <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
        Live tracking · Cockburn → Customer
      </div>

      {/* Bottom-right scale */}
      <div className="pointer-events-none absolute bottom-5 right-5 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-navy/60 shadow-soft ring-1 ring-navy/5">
        Perth · Demo Map
      </div>
    </div>
  );
}

function bezier(p0, p1, p2, p3, t) {
  const u = 1 - t;
  return {
    x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
    y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
  };
}

function pathLength(progress) {
  // Rough approximation for the dash (the SVG length is ~900px in our viewBox)
  return 900 * (0.05 + progress * 0.6);
}

function OperatorCard({ operator }) {
  return (
    <div className="rounded-2xl border border-navy/5 bg-white p-6 shadow-soft">
      <div className="flex items-center gap-4">
        <img
          src={operator.avatar}
          alt={operator.name}
          className="h-16 w-16 rounded-full object-cover ring-2 ring-gold/40"
        />
        <div>
          <div className="font-display text-xl font-semibold text-navy">
            {operator.name}
          </div>
          <div className="text-xs text-navy/55">Operator · Cockburn Zone</div>
          <div className="mt-1 flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-gold text-gold" strokeWidth={0} />
            <span className="font-semibold text-navy">
              {operator.rating.toFixed(1)}
            </span>
            <span className="text-navy/50">·</span>
            <span className="text-navy/65">
              {operator.jobs.toLocaleString()} jobs
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-2">
        <Trust icon={ShieldCheck} label="Police Cleared" sub="Verified · WA Police" />
        <Trust icon={BadgeCheck} label="ID Verified" sub="100-point check" />
        <Trust icon={Clock} label="On time, 98%" sub="Last 500 jobs" />
      </div>

      <div className="mt-5 rounded-xl border border-navy/5 bg-navy-50/40 p-4 text-xs text-navy/65">
        Your operator's location is shared securely for 30 minutes around your
        booking window. Tracking ends automatically once your detail is
        complete.
      </div>
    </div>
  );
}

function Trust({ icon: Icon, label, sub }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-navy/5 bg-white p-3 shadow-soft">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-navy text-gold">
        <Icon className="h-4 w-4" />
      </span>
      <div className="flex-1">
        <div className="text-sm font-semibold text-navy">{label}</div>
        <div className="text-[11px] text-navy/55">{sub}</div>
      </div>
      <span className="badge-success">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Active
      </span>
    </div>
  );
}
