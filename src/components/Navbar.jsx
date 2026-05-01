import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import Logo from "./Logo";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/track", label: "Track" },
  { to: "/account", label: "My Account" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl shadow-soft border-b border-navy/5"
          : "bg-white/60 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <Link to="/" className="group inline-flex items-center" aria-label="First Class Detail home">
          <Logo className="h-12 md:h-14" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-navy"
                    : "text-navy/65 hover:text-navy"
                }`
              }
            >
              {({ isActive }) => (
                <span className="relative">
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/book" className="btn-gold group">
            Book Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy/10 text-navy md:hidden"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-navy/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-elevated"
            >
              <div className="flex items-center justify-between border-b border-navy/5 p-5">
                <Logo className="h-11" />
                <button
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy/10 text-navy"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1 p-5">
                {LINKS.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    end={l.to === "/"}
                    className={({ isActive }) =>
                      `rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                        isActive
                          ? "bg-navy text-white"
                          : "text-navy hover:bg-navy/5"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
                <Link to="/book" className="btn-gold mt-3 w-full justify-center">
                  Book Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </nav>
              <div className="mt-auto border-t border-navy/5 p-5 text-xs text-navy/50">
                © {new Date().getFullYear()} First Class Detail · Perth WA
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
