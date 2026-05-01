import { useState } from "react";

export default function Logo({
  className = "h-9",
  variant = "dark",
  showText = true,
}) {
  const [usePng, setUsePng] = useState(true);
  const navy = variant === "light" ? "#FFFFFF" : "#1A2744";
  const subText = variant === "light" ? "#E9D693" : "#C9A84C";

  // If the brand PNG loads, render it on its own — most logo PNGs already
  // contain the wordmark, so we don't want to double up.
  if (usePng) {
    return (
      <img
        src="/logo.png"
        alt="First Class Detail"
        onError={() => setUsePng(false)}
        className={`${className} w-auto object-contain`}
        style={
          variant === "light"
            ? { filter: "brightness(0) invert(1)" }
            : undefined
        }
      />
    );
  }

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span className="relative inline-flex h-full aspect-square shrink-0 items-center justify-center">
        <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id="lg-mark" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E9D693" />
              <stop offset="50%" stopColor="#C9A84C" />
              <stop offset="100%" stopColor="#7D672A" />
            </linearGradient>
          </defs>
          <path
            d="M40 6 L70 22 V58 L40 74 L10 58 V22 Z"
            fill={navy}
            stroke="url(#lg-mark)"
            strokeWidth="2.5"
          />
          <path
            d="M40 16 L60 27 V53 L40 64 L20 53 V27 Z"
            fill="none"
            stroke="url(#lg-mark)"
            strokeWidth="1"
            opacity="0.55"
          />
          <text
            x="40"
            y="50"
            textAnchor="middle"
            fontFamily="'Playfair Display', Inter, serif"
            fontWeight="700"
            fontSize="28"
            fill="url(#lg-mark)"
          >
            F
          </text>
        </svg>
      </span>
      {showText && (
        <span className="flex flex-col leading-none">
          <span
            className="font-display text-[15px] font-bold tracking-[0.16em]"
            style={{ color: navy }}
          >
            FIRST CLASS
          </span>
          <span
            className="mt-1 text-[10px] font-semibold tracking-[0.42em]"
            style={{ color: subText }}
          >
            — DETAIL —
          </span>
        </span>
      )}
    </span>
  );
}
