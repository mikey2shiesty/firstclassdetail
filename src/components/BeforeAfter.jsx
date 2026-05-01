import { useRef, useState, useCallback } from "react";
import { ArrowLeftRight } from "lucide-react";

export default function BeforeAfter({ before, after }) {
  const ref = useRef(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const setFromEvent = useCallback((clientX) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, x)));
  }, []);

  const onMove = useCallback(
    (e) => {
      if (!dragging.current) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      setFromEvent(x);
    },
    [setFromEvent],
  );

  const startDrag = useCallback(
    (e) => {
      dragging.current = true;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      setFromEvent(x);
      window.addEventListener("mousemove", onMove);
      window.addEventListener("touchmove", onMove, { passive: false });
      const stop = () => {
        dragging.current = false;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("touchmove", onMove);
        window.removeEventListener("mouseup", stop);
        window.removeEventListener("touchend", stop);
      };
      window.addEventListener("mouseup", stop);
      window.addEventListener("touchend", stop);
    },
    [onMove, setFromEvent],
  );

  return (
    <div
      ref={ref}
      className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-navy/5 bg-navy shadow-soft select-none"
      onMouseDown={startDrag}
      onTouchStart={startDrag}
    >
      <img
        src={after}
        alt="After detail"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${pos}%` }}
      >
        <img
          src={before}
          alt="Before detail"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ width: `${(100 / Math.max(pos, 0.0001)) * 100}%` }}
        />
      </div>

      {/* labels */}
      <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-navy/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
        Before
      </div>
      <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-navy">
        After
      </div>

      {/* divider */}
      <div
        className="absolute inset-y-0 w-[3px] bg-white/90 shadow-elevated"
        style={{ left: `calc(${pos}% - 1.5px)` }}
      />
      <div
        className="absolute top-1/2 inline-flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy shadow-elevated ring-2 ring-gold cursor-ew-resize"
        style={{ left: `${pos}%` }}
      >
        <ArrowLeftRight className="h-4 w-4" />
      </div>
    </div>
  );
}
