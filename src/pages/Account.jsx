import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Gift,
  Sparkles,
  Star,
  CalendarClock,
  MapPinned,
  RotateCcw,
  Crown,
  Trophy,
  Bell,
  ChevronRight,
} from "lucide-react";
import Reveal from "../components/Reveal";
import GoldDivider from "../components/GoldDivider";
import BeforeAfter from "../components/BeforeAfter";
import { MOCK_HISTORY } from "../lib/data";
import { useToast } from "../lib/ToastProvider";

const PROFILE = {
  name: "Olivia Reid",
  suburb: "Cottesloe, WA",
  memberSince: "Jan 2024",
  loyalty: 3,
  loyaltyMax: 5,
  points: 1240,
  email: "olivia.reid@email.com",
  avatar:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&w=200&h=200&q=80&facepad=3",
};

export default function Account() {
  const toast = useToast();
  const [active, setActive] = useState(MOCK_HISTORY[0].id);
  const activeBooking = MOCK_HISTORY.find((b) => b.id === active);

  return (
    <>
      {/* Profile header */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 bg-grid-light opacity-30" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(circle at 20% 0%, rgba(201,168,76,0.35), transparent 50%)",
          }}
        />
        <div className="container-x relative grid items-end gap-8 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-7">
            <div className="flex items-center gap-5">
              <img
                src={PROFILE.avatar}
                alt={PROFILE.name}
                className="h-20 w-20 rounded-full object-cover ring-2 ring-gold/60 md:h-24 md:w-24"
              />
              <div>
                <div className="eyebrow text-gold">Member since {PROFILE.memberSince}</div>
                <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight md:text-5xl">
                  Welcome back, <span className="text-gold">{PROFILE.name.split(" ")[0]}.</span>
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/65">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPinned className="h-4 w-4 text-gold" /> {PROFILE.suburb}
                  </span>
                  <span className="hidden h-3.5 w-px bg-white/20 sm:block" />
                  <span className="inline-flex items-center gap-1.5">
                    <Trophy className="h-4 w-4 text-gold" />
                    {PROFILE.points.toLocaleString()} loyalty pts
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-5 md:flex md:justify-end">
            <div className="flex flex-wrap items-center gap-2">
              <Link to="/book" className="btn-gold">
                Book a Detail <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/track" className="btn border border-white/15 bg-white/[0.04] text-white hover:bg-white/10">
                Track your operator
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gold-line" />
      </section>

      {/* Reminder banner */}
      <section className="container-x mt-8">
        <Reveal>
          <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-gold/30 bg-gradient-to-r from-gold/10 via-white to-gold/5 p-5 shadow-soft">
            <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold-700">
              <Bell className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-navy">
                It's been 6 weeks since your last detail — time to rebook?
              </div>
              <div className="text-xs text-navy/65">
                Your last Premium with Michael is showing well. A Mini refresh
                will keep the protection topped up.
              </div>
            </div>
            <Link to="/book" className="btn-primary">
              Rebook now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Loyalty + Gift */}
      <section className="container-x mt-8 grid gap-6 md:grid-cols-12">
        <Reveal className="md:col-span-8">
          <div className="rounded-2xl border border-navy/5 bg-white p-6 shadow-soft md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="eyebrow">Loyalty Rewards</div>
                <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-navy md:text-3xl">
                  {PROFILE.loyalty} of {PROFILE.loyaltyMax} details completed —{" "}
                  <span className="text-gold">
                    {PROFILE.loyaltyMax - PROFILE.loyalty} more for your free
                    discount!
                  </span>
                </h2>
              </div>
              <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy text-gold md:inline-flex">
                <Crown className="h-7 w-7" />
              </div>
            </div>

            <div className="mt-6">
              <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-navy-50">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{
                    width: `${(PROFILE.loyalty / PROFILE.loyaltyMax) * 100}%`,
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full bg-gradient-to-r from-gold-300 via-gold to-gold-700"
                />
              </div>
              <div className="mt-5 grid grid-cols-5 gap-3">
                {Array.from({ length: PROFILE.loyaltyMax }).map((_, i) => {
                  const filled = i < PROFILE.loyalty;
                  return (
                    <div
                      key={i}
                      className={`flex flex-col items-center gap-2 rounded-2xl border p-3 text-center transition-all ${
                        filled
                          ? "border-gold/50 bg-gold/10 ring-1 ring-gold/30"
                          : "border-navy/5 bg-white"
                      }`}
                    >
                      <div
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${
                          filled
                            ? "bg-gold text-navy shadow-gold"
                            : "bg-navy/5 text-navy/40"
                        }`}
                      >
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <div
                        className={`text-[10px] font-bold uppercase tracking-wider ${
                          filled ? "text-gold-700" : "text-navy/40"
                        }`}
                      >
                        Detail {i + 1}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-navy-50/40 p-4 text-xs text-navy/65">
              At 5 completed details, you unlock a complimentary upgrade — your
              next Mini becomes a Full Detail, on us.
            </div>
          </div>
        </Reveal>

        <Reveal className="md:col-span-4" delay={0.1}>
          <div className="flex h-full flex-col rounded-2xl border border-gold/30 bg-gradient-to-br from-navy via-navy-600 to-navy-700 p-6 text-white shadow-elevated md:p-8">
            <Gift className="h-8 w-8 text-gold" />
            <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight">
              Send a detail as a <span className="text-gold">gift.</span>
            </h3>
            <p className="mt-2 text-sm text-white/70">
              Birthday, thank-you, parents, partner. We'll deliver the booking
              and a personalised card.
            </p>
            <div className="mt-auto pt-6">
              <Link to="/book" className="btn-gold w-full justify-center">
                Book as a Gift <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Booking history */}
      <section className="container-x mt-12 md:mt-16">
        <Reveal>
          <div className="flex items-end justify-between">
            <div>
              <div className="eyebrow">Booking History</div>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-navy md:text-4xl">
                Every detail we've delivered
              </h2>
            </div>
            <Link to="/" className="hidden text-sm font-semibold text-navy/65 hover:text-gold md:inline-flex md:items-center md:gap-1">
              Export <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <GoldDivider className="mt-6" />
        </Reveal>

        <Reveal className="mt-6 overflow-hidden rounded-2xl border border-navy/5 bg-white shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-navy/5 bg-navy-50/40 text-[11px] font-bold uppercase tracking-[0.16em] text-navy/55">
                  <th className="py-3 pl-6 pr-3">Reference</th>
                  <th className="px-3 py-3">Date</th>
                  <th className="px-3 py-3">Service</th>
                  <th className="px-3 py-3">Operator</th>
                  <th className="px-3 py-3">Zone</th>
                  <th className="px-3 py-3">Price</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="py-3 pl-3 pr-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_HISTORY.map((b) => (
                  <tr
                    key={b.id}
                    onClick={() => setActive(b.id)}
                    className={`cursor-pointer border-b border-navy/5 transition hover:bg-gold/5 ${
                      active === b.id ? "bg-gold/5" : ""
                    }`}
                  >
                    <td className="py-4 pl-6 pr-3 font-semibold text-navy">{b.id}</td>
                    <td className="px-3 py-4 text-navy/75">
                      {new Date(b.date).toLocaleDateString("en-AU", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-3 py-4 text-navy">{b.service}</td>
                    <td className="px-3 py-4 text-navy/75">{b.operator}</td>
                    <td className="px-3 py-4 text-navy/75">{b.zone}</td>
                    <td className="px-3 py-4 font-semibold text-navy">${b.price}</td>
                    <td className="px-3 py-4">
                      <span className="badge-success">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        {b.status}
                      </span>
                    </td>
                    <td className="py-4 pl-3 pr-6 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.success("Loaded last booking into form");
                        }}
                        className="inline-flex items-center gap-1.5 rounded-full bg-navy px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-gold hover:text-navy"
                      >
                        <RotateCcw className="h-3.5 w-3.5" /> Book again
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      {/* Before & After */}
      <section className="container-x mt-16 md:mt-20">
        <Reveal>
          <div className="flex items-end justify-between">
            <div>
              <div className="eyebrow">Before & After</div>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-navy md:text-4xl">
                Drag the slider — see the difference.
              </h2>
            </div>
            <div className="hidden items-center gap-2 md:flex">
              {MOCK_HISTORY.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setActive(b.id)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    active === b.id
                      ? "bg-navy text-white shadow-soft"
                      : "bg-navy/5 text-navy/65 hover:bg-navy/10"
                  }`}
                >
                  {b.id}
                </button>
              ))}
            </div>
          </div>
          <GoldDivider className="mt-6" />
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-12">
          <Reveal className="md:col-span-8">
            <BeforeAfter before={activeBooking.before} after={activeBooking.after} />
          </Reveal>
          <Reveal className="md:col-span-4" delay={0.1}>
            <div className="flex h-full flex-col gap-4">
              <div className="rounded-2xl border border-navy/5 bg-white p-6 shadow-soft">
                <div className="eyebrow">Booking</div>
                <div className="mt-3 flex items-center gap-2 text-sm text-navy/75">
                  <CalendarClock className="h-4 w-4 text-gold" />
                  {new Date(activeBooking.date).toLocaleDateString("en-AU", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold text-navy">
                  {activeBooking.service}
                </h3>
                <div className="mt-1 text-sm text-navy/65">
                  Operator · {activeBooking.operator} · {activeBooking.zone}
                </div>
                <div className="mt-4 flex items-center gap-1 text-sm">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-gold text-gold"
                      strokeWidth={0}
                    />
                  ))}
                  <span className="ml-1 text-navy/65">— You rated 5 stars</span>
                </div>
                <Link
                  to="/book"
                  className="btn-gold mt-5 w-full justify-center"
                >
                  <RotateCcw className="h-4 w-4" /> Book again
                </Link>
              </div>

              <div className="rounded-2xl border border-navy/5 bg-navy-50/50 p-5 text-xs text-navy/65">
                Photos are uploaded by your operator at the end of every detail
                and stored privately to your account.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Quick links */}
      <section className="container-x mt-16 md:mt-24">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { to: "/services", label: "Services & Pricing", sub: "Compare tiers" },
            { to: "/book", label: "Book a New Detail", sub: "Takes 60 seconds" },
            { to: "/track", label: "Track Your Operator", sub: "Live ETA & route" },
          ].map((q) => (
            <Link
              key={q.to}
              to={q.to}
              className="group flex items-center justify-between rounded-2xl border border-navy/5 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-elevated"
            >
              <div>
                <div className="text-sm font-semibold text-navy">{q.label}</div>
                <div className="text-xs text-navy/55">{q.sub}</div>
              </div>
              <ChevronRight className="h-5 w-5 text-navy/40 transition group-hover:translate-x-0.5 group-hover:text-gold" />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
