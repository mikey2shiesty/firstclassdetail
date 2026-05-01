import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  Clock,
  ChevronDown,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Reveal from "../components/Reveal";
import GoldDivider from "../components/GoldDivider";
import { SERVICES, FRAGRANCES } from "../lib/data";

export default function Services() {
  const [open, setOpen] = useState("full");

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 bg-grid-light opacity-30" />
        <div className="container-x relative grid gap-8 py-24 md:grid-cols-12 md:py-32">
          <div className="md:col-span-8">
            <div className="eyebrow text-gold">Services & Pricing</div>
            <h1 className="mt-3 text-balance font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Three services. <span className="text-gold">Fixed pricing.</span>{" "}
              Every detail performed by a police-cleared operator.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              Tap any tier below to see exactly what's included. Square
              tap-and-go on completion — no deposit required.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/book" className="btn-gold">
                Book Now <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#tiers"
                className="btn border border-white/20 bg-white/[0.03] text-white hover:bg-white/10"
              >
                Compare Tiers
              </a>
            </div>
          </div>
          <div className="hidden md:col-span-4 md:flex md:items-end md:justify-end">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
              <div className="flex items-center gap-2 text-gold">
                <ShieldCheck className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">
                  Trust Guarantee
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/75">
                Every operator is police-cleared, ID-verified, GPS-tracked, and
                insured under our $20M public liability policy.
              </p>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gold-line" />
      </section>

      {/* Tiers */}
      <section id="tiers" className="container-x py-20 md:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="eyebrow">Choose Your Tier</div>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-navy md:text-5xl">
            Tap a card to <span className="text-gold">see everything included.</span>
          </h2>
          <GoldDivider className="mt-8" />
        </Reveal>

        <div className="mt-12 space-y-5">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            const isOpen = open === s.id;
            return (
              <Reveal key={s.id} delay={i * 0.05}>
                <div
                  className={`overflow-hidden rounded-2xl border bg-white shadow-soft transition-all duration-300 ${
                    isOpen
                      ? "border-gold ring-2 ring-gold/20 shadow-elevated"
                      : "border-navy/5 hover:border-gold/40 hover:shadow-elevated"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : s.id)}
                    className="flex w-full items-center gap-5 p-6 text-left md:gap-8 md:p-8"
                  >
                    <div
                      className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl md:h-16 md:w-16 ${
                        s.popular
                          ? "bg-gold text-navy shadow-gold"
                          : "bg-navy text-gold"
                      }`}
                    >
                      <Icon className="h-7 w-7" strokeWidth={2} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-2xl font-semibold tracking-tight text-navy md:text-3xl">
                          {s.name}
                        </h3>
                        {s.popular && (
                          <span className="badge-gold">Most Popular</span>
                        )}
                        {!s.popular && s.id === "premium" && (
                          <span className="badge-navy">Flagship</span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-navy/60 md:text-base">
                        {s.tagline}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-navy/60">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-gold" /> {s.duration}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Sparkles className="h-4 w-4 text-gold" />
                          {s.includes.length} inclusions
                        </span>
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-col items-end gap-2">
                      <div className="font-display text-3xl font-semibold tracking-tight text-navy md:text-4xl">
                        ${s.price}
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 text-navy/55 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-navy/5 bg-gradient-to-b from-navy-50/40 to-white p-6 md:p-8">
                          <div className="grid gap-8 md:grid-cols-12">
                            <div className="md:col-span-7">
                              <div className="eyebrow">What's Included</div>
                              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                                {s.includes.map((f) => (
                                  <li
                                    key={f}
                                    className="flex items-start gap-2.5 text-sm text-navy/85"
                                  >
                                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-700">
                                      <Check className="h-3 w-3" strokeWidth={3} />
                                    </span>
                                    <span>{f}</span>
                                  </li>
                                ))}
                              </ul>

                              {s.id === "premium" && (
                                <div className="mt-6 rounded-2xl border border-gold/30 bg-gold/5 p-5">
                                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">
                                    Choose your scent
                                  </div>
                                  <div className="mt-3 flex flex-wrap gap-2">
                                    {FRAGRANCES.map((f) => (
                                      <span
                                        key={f.id}
                                        className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-navy shadow-soft ring-1 ring-navy/5"
                                      >
                                        <span>{f.emoji}</span>
                                        {f.name}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="md:col-span-5">
                              <div className="rounded-2xl border border-navy/5 bg-white p-6 shadow-soft">
                                <div className="eyebrow">Best For</div>
                                <p className="mt-3 text-sm leading-relaxed text-navy/80">
                                  {s.bestFor}
                                </p>
                                <div className="mt-6 grid gap-3">
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-navy/60">Price</span>
                                    <span className="font-semibold text-navy">
                                      ${s.price}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-navy/60">Duration</span>
                                    <span className="font-semibold text-navy">
                                      {s.duration}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-navy/60">Pay on</span>
                                    <span className="font-semibold text-navy">
                                      Completion (Square)
                                    </span>
                                  </div>
                                </div>
                                <Link
                                  to="/book"
                                  state={{ serviceId: s.id }}
                                  className="btn-gold mt-6 w-full"
                                >
                                  Book {s.name}
                                  <ArrowRight className="h-4 w-4" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Comparison strip */}
      <section className="container-x pb-24 md:pb-32">
        <Reveal className="rounded-3xl border border-navy/5 bg-gradient-to-br from-navy-50/60 via-white to-gold-50 p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <div className="eyebrow">Not sure which to pick?</div>
              <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy md:text-4xl">
                90% of customers choose <span className="text-gold">Full Detail.</span>
              </h3>
              <p className="mt-3 max-w-xl text-sm text-navy/70 md:text-base">
                It's the sweet spot — interior deep clean, exterior wash and
                seal, wheels, glass, and paint protection. Most cars only need
                a Premium for sale prep or annual treatment.
              </p>
            </div>
            <div className="md:col-span-5">
              <div className="flex flex-wrap items-center gap-3 md:justify-end">
                <Link to="/book" className="btn-primary">
                  Book Full Detail
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/" className="btn-outline">
                  Back to home
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
