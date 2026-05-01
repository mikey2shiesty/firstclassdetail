import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Star,
  ShieldCheck,
  MapPinned,
  BadgeCheck,
  Sparkles,
  Calendar,
  Car,
  CreditCard,
  Quote,
} from "lucide-react";
import Logo from "../components/Logo";
import Reveal from "../components/Reveal";
import AnimatedCounter from "../components/AnimatedCounter";
import GoldDivider from "../components/GoldDivider";
import PerthZoneMap from "../components/PerthZoneMap";
import {
  BRAND,
  HERO_IMAGE,
  INTERIOR_IMAGE,
  POLISH_IMAGE,
  SECONDARY_IMAGE,
  SERVICES,
  STATS,
  TESTIMONIALS,
} from "../lib/data";

const HOW_STEPS = [
  {
    icon: Calendar,
    title: "Book Online",
    body: "Pick a service, zone, date and time in 60 seconds.",
  },
  {
    icon: Car,
    title: "We Come To You",
    body: "GPS-tracked, insured, fully self-contained. Home or office.",
  },
  {
    icon: Sparkles,
    title: "Professional Detail",
    body: "Police-cleared operators, premium products, concours finish.",
  },
  {
    icon: CreditCard,
    title: "Pay & Review",
    body: "Square tap-and-go on completion. Drop us a quick review.",
  },
];

const TRUST = [
  { icon: ShieldCheck, label: "Police Cleared Operators" },
  { icon: MapPinned, label: "GPS Tracked Vans" },
  { icon: BadgeCheck, label: "Fully Insured · $20M Public Liability" },
  { icon: Star, label: "5-Star Rated · 600+ Reviews" },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[92vh] overflow-hidden bg-navy text-white">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Premium black sedan being detailed"
            className="h-full w-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/55 via-navy/70 to-navy" />
          <div className="absolute inset-0 bg-grid-light opacity-40" />
        </div>

        <div className="container-x relative z-10 flex min-h-[92vh] flex-col justify-end pb-20 pt-32 md:pb-28 md:pt-36">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-2">
              <Logo variant="light" className="h-20 md:h-24" />
            </div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-gold backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              PERTH · WESTERN AUSTRALIA
            </div>
            <h1 className="text-balance font-display text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
              Premium Mobile <span className="text-gold">Car Detailing</span>
              <br className="hidden sm:block" /> — We Come To You.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
              Concours-level finishes by police-cleared, GPS-tracked operators.
              From a 60-minute mini detail to a full clay-bar and machine
              polish — booked in under a minute.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/book" className="btn-gold group">
                Book Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/services"
                className="btn border border-white/20 bg-white/[0.03] text-white backdrop-blur hover:bg-white/10"
              >
                View Services & Pricing
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/65">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-gold text-gold"
                      strokeWidth={0}
                    />
                  ))}
                </div>
                <span>5.0 · 600+ Perth reviews</span>
              </div>
              <div className="hidden h-4 w-px bg-white/15 sm:block" />
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-gold" /> Police-cleared
                operators
              </div>
              <div className="hidden h-4 w-px bg-white/15 sm:block" />
              <div className="flex items-center gap-2">
                <MapPinned className="h-4 w-4 text-gold" /> 3 zones across the
                metro
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative gold gradient bottom line */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gold-line" />
      </section>

      {/* STATS */}
      <section className="relative -mt-12 z-10">
        <div className="container-x">
          <div className="grid grid-cols-2 gap-3 rounded-3xl border border-navy/5 bg-white p-3 shadow-elevated md:grid-cols-4 md:p-4">
            {STATS.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal
                  key={s.label}
                  delay={i * 0.08}
                  className="flex flex-col items-start gap-3 rounded-2xl bg-gradient-to-b from-navy-50/60 to-white p-6 md:p-8"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-gold">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="font-display text-3xl font-semibold tracking-tight text-navy md:text-4xl">
                    <AnimatedCounter to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-xs font-medium uppercase tracking-[0.18em] text-navy/55">
                    {s.label}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="container-x py-24 md:py-32">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="eyebrow">Our Services</div>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-navy md:text-5xl">
            Three tiers. <span className="text-gold">One standard.</span>
          </h2>
          <p className="mt-4 text-base text-navy/65 md:text-lg">
            Every detail is performed by a police-cleared operator using
            professional-grade equipment. Pricing is fixed — no surprises.
          </p>
          <GoldDivider className="mt-8" />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.id} delay={i * 0.1}>
                <Link
                  to="/book"
                  className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border ${
                    s.popular
                      ? "border-gold/50 ring-1 ring-gold/20"
                      : "border-navy/5"
                  } bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated md:p-8`}
                >
                  {s.popular && (
                    <div className="absolute right-5 top-5 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-navy">
                      Most Popular
                    </div>
                  )}
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${
                      s.popular ? "bg-gold/15 text-gold-700" : "bg-navy/5 text-navy"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-navy">
                    {s.name}
                  </h3>
                  <p className="mt-1.5 text-sm text-navy/60">{s.tagline}</p>
                  <div className="mt-6 flex items-end gap-1.5">
                    <span className="font-display text-4xl font-semibold tracking-tight text-navy">
                      ${s.price}
                    </span>
                    <span className="pb-1 text-sm text-navy/55">flat · {s.duration}</span>
                  </div>
                  <ul className="mt-6 space-y-2.5 text-sm text-navy/75">
                    {s.includes.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-7">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-navy transition group-hover:text-gold-700">
                      Book {s.name}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <div className="container-x">
        <GoldDivider />
      </div>

      {/* HOW IT WORKS */}
      <section className="relative overflow-hidden bg-navy py-24 text-white md:py-32">
        <div className="absolute inset-0 bg-grid-light opacity-30" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${POLISH_IMAGE})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "luminosity",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/95 to-navy" />

        <div className="container-x relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <div className="eyebrow text-gold">How It Works</div>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              Booked in 60 seconds. <span className="text-gold">Detailed in hours.</span>
            </h2>
          </Reveal>

          <div className="relative mt-14 grid gap-6 md:grid-cols-4">
            <div
              aria-hidden
              className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent md:block"
            />
            {HOW_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.title} delay={i * 0.1}>
                  <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:bg-white/[0.06]">
                    <div className="flex items-center gap-3">
                      <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gold text-navy shadow-gold">
                        <Icon className="h-6 w-6" strokeWidth={2.2} />
                      </div>
                      <div className="font-display text-3xl font-semibold tracking-tight text-white/15">
                        0{i + 1}
                      </div>
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <Link to="/book" className="btn-gold">
              Book a Detail
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/services"
              className="btn border border-white/20 bg-white/[0.03] text-white hover:bg-white/10"
            >
              Compare Services
            </Link>
          </Reveal>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="container-x py-16 md:py-20">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {TRUST.map((t, i) => {
            const Icon = t.icon;
            return (
              <Reveal
                key={t.label}
                delay={i * 0.05}
                className="group flex items-center gap-4 rounded-2xl border border-navy/5 bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-elevated"
              >
                <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-gold">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-sm font-semibold leading-snug text-navy">
                  {t.label}
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container-x py-24 md:py-32">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="eyebrow">Loved across Perth</div>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-navy md:text-5xl">
            Customers who never <span className="text-gold">go back.</span>
          </h2>
          <GoldDivider className="mt-8" />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <article className="flex h-full flex-col rounded-2xl border border-navy/5 bg-white p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated md:p-8">
                <Quote className="h-7 w-7 text-gold" strokeWidth={1.5} />
                <p className="mt-4 text-base leading-relaxed text-navy/85">
                  "{t.quote}"
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-navy/5 pt-5">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-gold/40"
                  />
                  <div>
                    <div className="text-sm font-semibold text-navy">
                      {t.name}
                    </div>
                    <div className="text-xs text-navy/55">{t.suburb}</div>
                  </div>
                  <div className="ml-auto flex">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-gold text-gold"
                        strokeWidth={0}
                      />
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ZONE COVERAGE */}
      <section className="relative bg-navy-50/60">
        <div className="container-x grid gap-10 py-24 md:grid-cols-12 md:gap-12 md:py-32">
          <Reveal className="md:col-span-5">
            <div className="eyebrow">Zone Coverage</div>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-navy md:text-5xl">
              Three zones. <br />
              <span className="text-gold">All of Perth metro.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-navy/70">
              We've split the metro into three specialist zones — each operated
              by a dedicated, police-cleared, GPS-tracked detailer who knows
              the suburbs inside out.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                { name: "Cockburn", region: "South Perth", lead: "Michael" },
                { name: "Bentley", region: "Central Perth", lead: "AC" },
                { name: "Morley", region: "North Perth", lead: "Seamus" },
              ].map((z) => (
                <li
                  key={z.name}
                  className="flex items-center justify-between rounded-2xl border border-navy/5 bg-white p-4 shadow-soft"
                >
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold-700">
                      <MapPinned className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-navy">
                        {z.name} <span className="text-navy/45">·</span>{" "}
                        <span className="text-navy/65">{z.region}</span>
                      </div>
                      <div className="text-xs text-navy/55">
                        Lead operator · {z.lead}
                      </div>
                    </div>
                  </div>
                  <span className="badge-success">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Available today
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link to="/book" className="btn-primary">
                Book a Detail in Your Zone
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <Reveal className="md:col-span-7" delay={0.1}>
            <PerthZoneMap />
          </Reveal>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="container-x py-24 md:py-32">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-navy p-10 text-white shadow-elevated md:p-16">
            <div className="absolute inset-0 bg-grid-light opacity-30" />
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url(${INTERIOR_IMAGE})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
            <div className="relative grid items-center gap-8 md:grid-cols-2">
              <div>
                <div className="eyebrow text-gold">Ready when you are</div>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                  Book your first detail today.
                  <br />
                  <span className="text-gold">Pay on completion.</span>
                </h2>
                <p className="mt-4 max-w-md text-sm text-white/70">
                  Square tap-and-go on the day. No deposit. No commitment. Just
                  a flawless car when we're done.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 md:justify-end">
                <Link to="/book" className="btn-gold">
                  Book Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/services"
                  className="btn border border-white/20 bg-white/[0.03] text-white hover:bg-white/10"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
