import { createContext, useCallback, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, AlertCircle, X } from "lucide-react";

const ToastCtx = createContext(null);

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

let _id = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const push = useCallback(
    (msg, opts = {}) => {
      const id = ++_id;
      const toast = {
        id,
        message: msg,
        kind: opts.kind || "success",
        title: opts.title,
      };
      setToasts((t) => [...t, toast]);
      setTimeout(() => dismiss(id), opts.duration ?? 3500);
      return id;
    },
    [dismiss],
  );

  const api = {
    push,
    success: (m, o) => push(m, { ...o, kind: "success" }),
    info: (m, o) => push(m, { ...o, kind: "info" }),
    error: (m, o) => push(m, { ...o, kind: "error" }),
    dismiss,
  };

  return (
    <ToastCtx.Provider value={api}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-20 z-[100] flex flex-col items-center gap-2 px-4 sm:top-24">
        <AnimatePresence>
          {toasts.map((t) => {
            const Icon =
              t.kind === "error"
                ? AlertCircle
                : t.kind === "info"
                  ? Info
                  : CheckCircle2;
            const tone =
              t.kind === "error"
                ? "border-red-200 bg-red-50 text-red-700"
                : t.kind === "info"
                  ? "border-navy/15 bg-white text-navy"
                  : "border-emerald-200 bg-emerald-50 text-emerald-700";
            return (
              <motion.div
                key={t.id}
                initial={{ y: -12, opacity: 0, scale: 0.96 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -12, opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className={`pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-2xl border ${tone} px-4 py-3 shadow-elevated backdrop-blur`}
              >
                <Icon className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={2} />
                <div className="flex-1 text-sm">
                  {t.title && (
                    <div className="font-semibold leading-tight">{t.title}</div>
                  )}
                  <div className="leading-snug">{t.message}</div>
                </div>
                <button
                  onClick={() => dismiss(t.id)}
                  className="rounded-full p-1 hover:bg-black/5"
                  aria-label="Dismiss"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  );
}
