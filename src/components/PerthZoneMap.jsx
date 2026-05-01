import { motion } from "framer-motion";
import { ZONES } from "../lib/data";

// Stylized Perth metro graphic — abstract illustration, not a real map.
const PINS = {
  cockburn: { x: 360, y: 470, label: "Cockburn", region: "South" },
  bentley: { x: 470, y: 350, label: "Bentley", region: "Central" },
  morley: { x: 530, y: 215, label: "Morley", region: "North" },
};

export default function PerthZoneMap() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-navy/5 bg-gradient-to-br from-navy-50 via-white to-gold-50 shadow-soft">
      <svg
        viewBox="0 0 800 600"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="land" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E8EBF1" />
          </linearGradient>
          <linearGradient id="ocean" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#E8EBF1" />
            <stop offset="100%" stopColor="#C5CCDC" />
          </linearGradient>
          <pattern id="dots" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#1A2744" opacity="0.06" />
          </pattern>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ocean (left) */}
        <path
          d="M0 0 H 280 Q 300 120 270 220 Q 235 320 285 430 Q 320 510 270 600 H 0 Z"
          fill="url(#ocean)"
        />
        {/* coastline highlight */}
        <path
          d="M280 0 Q 300 120 270 220 Q 235 320 285 430 Q 320 510 270 600"
          stroke="#1A2744"
          strokeOpacity="0.18"
          strokeWidth="1.5"
          fill="none"
        />

        {/* land */}
        <path
          d="M280 0 Q 300 120 270 220 Q 235 320 285 430 Q 320 510 270 600 H 800 V 0 Z"
          fill="url(#land)"
        />
        <path
          d="M280 0 Q 300 120 270 220 Q 235 320 285 430 Q 320 510 270 600 H 800 V 0 Z"
          fill="url(#dots)"
        />

        {/* Swan River squiggle */}
        <path
          d="M260 310 Q 380 290 440 360 Q 520 430 700 380"
          fill="none"
          stroke="#5A6A8E"
          strokeOpacity="0.35"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Highway lines */}
        <path d="M310 80 L 760 540" stroke="#1A2744" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="4 6" />
        <path d="M380 30 L 380 580" stroke="#1A2744" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="4 6" />
        <path d="M540 20 L 540 590" stroke="#1A2744" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="4 6" />

        {/* Service area glow */}
        <circle cx="430" cy="350" r="240" fill="url(#glow)" />

        {/* Pins */}
        {ZONES.map((z, i) => {
          const p = PINS[z.id];
          return (
            <g key={z.id}>
              <motion.circle
                cx={p.x}
                cy={p.y}
                r="36"
                fill="#C9A84C"
                opacity="0.18"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.35, 0, 0.35] }}
                transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.4 }}
                style={{ transformOrigin: `${p.x}px ${p.y}px` }}
              />
              <circle cx={p.x} cy={p.y} r="14" fill="#1A2744" />
              <circle cx={p.x} cy={p.y} r="6" fill="#C9A84C" />
            </g>
          );
        })}
      </svg>

      {/* Pin labels (HTML overlay so we can style with Tailwind) */}
      {ZONES.map((z) => {
        const p = PINS[z.id];
        const left = (p.x / 800) * 100;
        const top = (p.y / 600) * 100;
        return (
          <div
            key={z.id}
            className="absolute flex flex-col items-center"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              transform: "translate(-50%, -130%)",
            }}
          >
            <div className="rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold tracking-wide text-navy shadow-soft ring-1 ring-navy/10">
              {z.name} · {z.region}
            </div>
          </div>
        );
      })}

      {/* Indian Ocean caption */}
      <div className="pointer-events-none absolute left-6 top-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-navy/40">
        Indian Ocean
      </div>
      <div className="pointer-events-none absolute bottom-5 right-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-navy/40">
        Perth Metro
      </div>
    </div>
  );
}
