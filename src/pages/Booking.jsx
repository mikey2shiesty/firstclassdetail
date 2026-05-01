import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Sparkles,
  Crown,
  Wand2,
  ShieldCheck,
  BadgeCheck,
  Star,
  Gift,
  CreditCard,
  CheckCircle2,
  Loader2,
  MapPinned,
  CalendarDays,
} from "lucide-react";
import Reveal from "../components/Reveal";
import Calendar from "../components/Calendar";
import { useBooking } from "../lib/BookingContext";
import { useToast } from "../lib/ToastProvider";
import { SERVICES, ZONES, TIME_SLOTS, FRAGRANCES } from "../lib/data";

// helper to determine which steps are visible
function getSteps(serviceId) {
  const base = ["service", "zone", "datetime", "details"];
  if (serviceId === "premium") base.push("fragrance");
  base.push("confirm");
  return base;
}

const STEP_META = {
  service: { label: "Service" },
  zone: { label: "Zone & Operator" },
  datetime: { label: "Date & Time" },
  details: { label: "Your Details" },
  fragrance: { label: "Scented Finish" },
  confirm: { label: "Confirm & Pay" },
};

// Some time slots are unavailable at random (deterministic by date)
function unavailableSlots(date) {
  if (!date) return new Set();
  const seed =
    new Date(date).getDate() + new Date(date).getMonth() * 31;
  const set = new Set();
  if (seed % 3 === 0) set.add("0700");
  if (seed % 4 === 0) set.add("1100");
  if (seed % 5 === 0) set.add("1500");
  return set;
}

export default function Booking() {
  const { booking, update, updateDetails, reset } = useBooking();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Allow deep-link selection from /services
  useEffect(() => {
    const sid = location.state?.serviceId;
    if (sid && !booking.serviceId) update({ serviceId: sid });
  }, [location.state, booking.serviceId, update]);

  const steps = useMemo(
    () => getSteps(booking.serviceId),
    [booking.serviceId],
  );
  const [stepIdx, setStepIdx] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);

  const step = steps[stepIdx];

  function go(delta) {
    setStepIdx((i) => Math.max(0, Math.min(steps.length - 1, i + delta)));
  }

  // Auto-advance friendly handlers
  function pickService(id) {
    update({ serviceId: id });
    toast.success(
      `${SERVICES.find((s) => s.id === id).name} selected`,
      { title: "Service selected!" },
    );
    // Re-derive steps if Premium gets added/removed; ensure step index stays valid
    setTimeout(() => setStepIdx(1), 250);
  }
  function pickZone(id) {
    update({ zoneId: id });
    toast.success(`${ZONES.find((z) => z.id === id).name} zone selected`);
    setTimeout(() => setStepIdx(2), 250);
  }
  function pickDate(iso) {
    update({ date: iso, time: null });
  }
  function pickTime(t) {
    update({ time: t });
  }
  function pickFragrance(id) {
    update({ fragranceId: id });
    toast.success(
      `${FRAGRANCES.find((f) => f.id === id).name} chosen`,
      { title: "Scent locked in" },
    );
  }

  async function submit() {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1400));
    const ref = `FCD-${Math.floor(1000 + Math.random() * 9000)}`;
    update({ reference: ref });
    setSuccess(ref);
    setSubmitting(false);
    toast.success("Booking confirmed!", {
      title: `Reference ${ref}`,
      duration: 5000,
    });
  }

  const service = SERVICES.find((s) => s.id === booking.serviceId);
  const zone = ZONES.find((z) => z.id === booking.zoneId);
  const fragrance = FRAGRANCES.find((f) => f.id === booking.fragranceId);

  const canNext = (() => {
    switch (step) {
      case "service":
        return !!booking.serviceId;
      case "zone":
        return !!booking.zoneId;
      case "datetime":
        return !!booking.date && !!booking.time;
      case "details":
        return (
          !!booking.details.name &&
          !!booking.details.email &&
          !!booking.details.phone &&
          !!booking.details.address &&
          !!booking.details.vehicle
        );
      case "fragrance":
        return !!booking.fragranceId;
      case "confirm":
        return true;
      default:
        return false;
    }
  })();

  if (success) {
    return (
      <SuccessView
        reference={success}
        service={service}
        zone={zone}
        booking={booking}
        fragrance={fragrance}
        onAnother={() => {
          reset();
          setSuccess(null);
          setStepIdx(0);
          navigate("/book");
        }}
      />
    );
  }

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 bg-grid-light opacity-30" />
        <div className="container-x relative py-16 md:py-20">
          <div className="eyebrow text-gold">Book Your Detail</div>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Booked in <span className="text-gold">60 seconds.</span>
          </h1>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gold-line" />
      </section>

      <section className="container-x py-10 md:py-14">
        {/* Step indicator */}
        <Stepper steps={steps} stepIdx={stepIdx} setStepIdx={setStepIdx} />

        <div className="mt-10 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {step === "service" && (
                  <StepService
                    selected={booking.serviceId}
                    onPick={pickService}
                  />
                )}
                {step === "zone" && (
                  <StepZone selected={booking.zoneId} onPick={pickZone} />
                )}
                {step === "datetime" && (
                  <StepDateTime
                    date={booking.date}
                    time={booking.time}
                    onDate={pickDate}
                    onTime={pickTime}
                  />
                )}
                {step === "details" && (
                  <StepDetails
                    details={booking.details}
                    update={updateDetails}
                  />
                )}
                {step === "fragrance" && (
                  <StepFragrance
                    selected={booking.fragranceId}
                    onPick={pickFragrance}
                  />
                )}
                {step === "confirm" && (
                  <StepConfirm
                    service={service}
                    zone={zone}
                    booking={booking}
                    fragrance={fragrance}
                    submitting={submitting}
                    onSubmit={submit}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between">
              <button
                type="button"
                disabled={stepIdx === 0}
                onClick={() => go(-1)}
                className="btn-ghost disabled:opacity-40"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              {step !== "confirm" ? (
                <button
                  type="button"
                  disabled={!canNext}
                  onClick={() => go(1)}
                  className="btn-primary disabled:opacity-40"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={submitting}
                  onClick={submit}
                  className="btn-gold disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Confirming…
                    </>
                  ) : (
                    <>
                      Confirm Booking <CheckCircle2 className="h-4 w-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Summary sidebar */}
          <aside className="md:col-span-4">
            <SummaryCard
              service={service}
              zone={zone}
              booking={booking}
              fragrance={fragrance}
            />
          </aside>
        </div>
      </section>
    </>
  );
}

function Stepper({ steps, stepIdx, setStepIdx }) {
  return (
    <div className="overflow-x-auto">
      <ol className="flex min-w-max items-center gap-2 md:gap-3">
        {steps.map((id, i) => {
          const done = i < stepIdx;
          const active = i === stepIdx;
          return (
            <li key={id} className="flex items-center gap-2 md:gap-3">
              <button
                type="button"
                onClick={() => i <= stepIdx && setStepIdx(i)}
                className={`flex items-center gap-2.5 rounded-full px-3 py-2 text-xs font-semibold transition-all md:px-4 md:text-sm ${
                  active
                    ? "bg-navy text-white shadow-soft"
                    : done
                      ? "bg-gold/15 text-gold-700 hover:bg-gold/25"
                      : "bg-navy/5 text-navy/55"
                }`}
              >
                <span
                  className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                    active
                      ? "bg-gold text-navy"
                      : done
                        ? "bg-gold-700 text-white"
                        : "bg-white text-navy/55"
                  }`}
                >
                  {done ? <Check className="h-3 w-3" strokeWidth={3} /> : i + 1}
                </span>
                {STEP_META[id].label}
              </button>
              {i < steps.length - 1 && (
                <div className="h-px w-4 bg-navy/15 md:w-8" />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function StepService({ selected, onPick }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold tracking-tight text-navy md:text-3xl">
        Choose your service
      </h2>
      <p className="mt-2 text-sm text-navy/65">
        Tap a tier — you can always change it later.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => {
          const Icon = s.icon;
          const isSelected = selected === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onPick(s.id)}
              className={`group relative flex h-full flex-col rounded-2xl border bg-white p-6 text-left shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated ${
                isSelected
                  ? "border-gold ring-2 ring-gold/30"
                  : "border-navy/5 hover:border-gold/40"
              }`}
            >
              {s.popular && !isSelected && (
                <span className="absolute right-4 top-4 rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-navy">
                  Popular
                </span>
              )}
              {isSelected && (
                <span className="absolute right-4 top-4 inline-flex h-7 w-7 items-center justify-center rounded-full bg-gold text-navy shadow-gold">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
              )}
              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${
                  isSelected
                    ? "bg-navy text-gold"
                    : "bg-navy/5 text-navy group-hover:bg-gold/15 group-hover:text-gold-700"
                }`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold text-navy">
                {s.name}
              </h3>
              <p className="mt-1 text-sm text-navy/60">{s.tagline}</p>
              <div className="mt-4 flex items-end gap-1">
                <span className="font-display text-3xl font-semibold text-navy">
                  ${s.price}
                </span>
                <span className="pb-1 text-xs text-navy/55">· {s.duration}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepZone({ selected, onPick }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold tracking-tight text-navy md:text-3xl">
        Choose your zone
      </h2>
      <p className="mt-2 text-sm text-navy/65">
        Each zone is operated by a dedicated, police-cleared detailer.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {ZONES.map((z) => {
          const isSelected = selected === z.id;
          return (
            <button
              key={z.id}
              type="button"
              onClick={() => onPick(z.id)}
              className={`group relative flex flex-col rounded-2xl border bg-white p-6 text-left shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated ${
                isSelected
                  ? "border-gold ring-2 ring-gold/30"
                  : "border-navy/5 hover:border-gold/40"
              }`}
            >
              {isSelected && (
                <span className="absolute right-4 top-4 inline-flex h-7 w-7 items-center justify-center rounded-full bg-gold text-navy shadow-gold">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
              )}

              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={z.operator.avatar}
                    alt={z.operator.name}
                    className="h-16 w-16 rounded-full object-cover ring-2 ring-gold/40"
                  />
                  <span className="absolute -bottom-1 -right-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-white">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">
                    {z.region}
                  </div>
                  <div className="font-display text-xl font-semibold text-navy">
                    {z.name}
                  </div>
                  <div className="text-sm text-navy/65">
                    Operator · {z.operator.name}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-1.5 text-sm">
                <Star className="h-4 w-4 fill-gold text-gold" strokeWidth={0} />
                <span className="font-semibold text-navy">
                  {z.operator.rating.toFixed(1)}
                </span>
                <span className="text-navy/50">·</span>
                <span className="text-navy/65">
                  {z.operator.jobs.toLocaleString()} jobs
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                <span className="badge-success">
                  <ShieldCheck className="h-3 w-3" /> Police Cleared ✓
                </span>
                <span className="badge-gold">
                  <BadgeCheck className="h-3 w-3" /> ID Verified ✓
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepDateTime({ date, time, onDate, onTime }) {
  const blocked = unavailableSlots(date);
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold tracking-tight text-navy md:text-3xl">
        Pick a date & time
      </h2>
      <p className="mt-2 text-sm text-navy/65">
        We operate Mon–Sat. Greyed-out slots are already booked.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-12">
        <div className="md:col-span-7">
          <Calendar value={date} onChange={onDate} />
        </div>
        <div className="md:col-span-5">
          <div className="rounded-2xl border border-navy/5 bg-white p-5 shadow-soft">
            <div className="eyebrow">Time slots</div>
            <p className="mt-2 text-sm text-navy/65">
              {date
                ? new Date(date).toLocaleDateString("en-AU", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })
                : "Select a date first"}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {TIME_SLOTS.map((t) => {
                const disabled = !date || blocked.has(t.id);
                const isSelected = time === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    disabled={disabled}
                    onClick={() => onTime(t.id)}
                    className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition-all ${
                      disabled
                        ? "cursor-not-allowed border-navy/5 bg-navy/[0.03] text-navy/30 line-through"
                        : isSelected
                          ? "border-gold bg-navy text-white ring-2 ring-gold/30 shadow-soft"
                          : "border-navy/10 bg-white text-navy hover:border-gold hover:bg-gold/5"
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepDetails({ details, update }) {
  const {
    register,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: details,
    mode: "onChange",
  });

  // Sync RHF -> context
  const watched = watch();
  useEffect(() => {
    update(watched);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(watched)]);

  const isGift = watched.isGift;

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold tracking-tight text-navy md:text-3xl">
        Your details
      </h2>
      <p className="mt-2 text-sm text-navy/65">
        We'll send an SMS confirmation and tracking link to this number.
      </p>

      <form className="mt-6 grid gap-5 md:grid-cols-2">
        <Field
          label="Full name"
          error={errors.name?.message}
          {...register("name", { required: "Required" })}
          placeholder="Jane Smith"
        />
        <Field
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register("email", {
            required: "Required",
            pattern: { value: /^\S+@\S+$/i, message: "Enter a valid email" },
          })}
          placeholder="you@email.com"
        />
        <Field
          label="Phone"
          type="tel"
          error={errors.phone?.message}
          {...register("phone", {
            required: "Required",
            minLength: { value: 8, message: "Too short" },
          })}
          placeholder="+61 400 000 000"
        />
        <Field
          label="Vehicle make & model"
          error={errors.vehicle?.message}
          {...register("vehicle", { required: "Required" })}
          placeholder="BMW X3 · 2022"
        />
        <div className="md:col-span-2">
          <label className="label">Service address</label>
          <div className="relative">
            <input
              {...register("address", { required: true })}
              className="input pl-10"
              placeholder="Start typing — Google Maps autocomplete"
            />
            <MapPinned className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-gold" />
            <span className="absolute right-3.5 top-3.5 text-[10px] font-bold uppercase tracking-[0.18em] text-navy/40">
              Demo
            </span>
          </div>
          <p className="mt-1.5 text-xs text-navy/50">
            Address must have safe outdoor parking and access to water + power.
          </p>
        </div>
        <div className="md:col-span-2">
          <label className="label">Special notes (optional)</label>
          <textarea
            {...register("notes")}
            rows={3}
            className="input"
            placeholder="Pet hair, child seat, any specific concerns…"
          />
        </div>

        <div className="md:col-span-2">
          <label className="flex items-start gap-3 rounded-2xl border border-gold/30 bg-gold/5 p-4 cursor-pointer">
            <input
              type="checkbox"
              {...register("isGift")}
              className="peer sr-only"
            />
            <span className="mt-0.5 inline-flex h-6 w-11 items-center rounded-full bg-navy/10 transition-colors peer-checked:bg-gold">
              <span className="ml-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
            </span>
            <span className="flex-1">
              <span className="flex items-center gap-2 text-sm font-semibold text-navy">
                <Gift className="h-4 w-4 text-gold" /> Book as a gift for someone
                else
              </span>
              <span className="mt-0.5 block text-xs text-navy/55">
                We'll send them the booking confirmation & a personalised
                message.
              </span>
            </span>
          </label>
        </div>

        <AnimatePresence>
          {isGift && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden md:col-span-2"
            >
              <div className="grid gap-4 rounded-2xl border border-navy/5 bg-white p-5 md:grid-cols-2">
                <Field
                  label="Recipient name"
                  {...register("giftRecipient")}
                  placeholder="Sarah Smith"
                />
                <div>
                  <label className="label">Personal message</label>
                  <textarea
                    {...register("giftMessage")}
                    rows={2}
                    className="input"
                    placeholder="Happy birthday — enjoy the spa day for your car!"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}

const Field = ({ label, error, ...rest }) => (
  <div>
    <label className="label">{label}</label>
    <input
      {...rest}
      className={`input ${error ? "border-red-300 ring-red-200/40" : ""}`}
    />
    {error && (
      <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>
    )}
  </div>
);

function StepFragrance({ selected, onPick }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold tracking-tight text-navy md:text-3xl">
        Choose your scent
      </h2>
      <p className="mt-2 text-sm text-navy/65">
        Premium details finish with a long-lasting scent of your choosing.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-3 md:grid-cols-5">
        {FRAGRANCES.map((f) => {
          const isSelected = selected === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => onPick(f.id)}
              className={`group flex flex-col items-center rounded-2xl border bg-white p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated ${
                isSelected
                  ? "border-gold ring-2 ring-gold/30"
                  : "border-navy/5 hover:border-gold/40"
              }`}
            >
              <span className="text-4xl">{f.emoji}</span>
              <span className="mt-3 text-sm font-semibold text-navy">
                {f.name}
              </span>
              {isSelected && (
                <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-700">
                  <Check className="h-3 w-3" strokeWidth={3} /> Selected
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepConfirm({ service, zone, booking, fragrance, submitting }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold tracking-tight text-navy md:text-3xl">
        Confirm & pay
      </h2>
      <p className="mt-2 text-sm text-navy/65">
        We'll lock in your slot and send you an SMS confirmation right away.
      </p>

      <div className="mt-6 rounded-2xl border border-navy/5 bg-white p-6 shadow-soft md:p-8">
        <div className="grid gap-4 md:grid-cols-2">
          <SummaryRow label="Service" value={service?.name} sub={`$${service?.price} · ${service?.duration}`} />
          <SummaryRow
            label="Zone"
            value={zone ? `${zone.name} · ${zone.region}` : "—"}
            sub={zone ? `Operator · ${zone.operator.name}` : ""}
          />
          <SummaryRow
            label="Date"
            value={
              booking.date
                ? new Date(booking.date).toLocaleDateString("en-AU", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })
                : "—"
            }
            sub={booking.time ? prettyTime(booking.time) : ""}
          />
          {fragrance && (
            <SummaryRow
              label="Scent"
              value={`${fragrance.emoji} ${fragrance.name}`}
            />
          )}
          <SummaryRow
            label="Customer"
            value={booking.details.name || "—"}
            sub={booking.details.email}
          />
          <SummaryRow
            label="Address"
            value={booking.details.address || "—"}
            sub={booking.details.vehicle}
          />
          {booking.details.isGift && (
            <SummaryRow
              label="Gift for"
              value={booking.details.giftRecipient || "Recipient"}
              sub={booking.details.giftMessage}
            />
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2 rounded-2xl border border-gold/30 bg-gold/5 p-4 text-sm text-navy/85">
          <CreditCard className="h-4 w-4 text-gold" />
          <span className="font-semibold">Pay on completion</span>
          <span className="text-navy/55">·</span>
          <span>Square tap-and-go on the day. No deposit required.</span>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-navy/5 pt-6">
          <div className="text-sm font-medium text-navy/65">Total</div>
          <div className="font-display text-3xl font-semibold tracking-tight text-navy">
            ${service?.price ?? 0}
          </div>
        </div>
      </div>

      {submitting && (
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-navy/65">
          <Loader2 className="h-4 w-4 animate-spin text-gold" />
          Securing your booking…
        </div>
      )}
    </div>
  );
}

function SummaryRow({ label, value, sub }) {
  return (
    <div className="rounded-xl bg-navy-50/50 p-4">
      <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-navy/55">
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-navy">{value}</div>
      {sub && <div className="mt-0.5 text-xs text-navy/55">{sub}</div>}
    </div>
  );
}

function SummaryCard({ service, zone, booking, fragrance }) {
  return (
    <div className="sticky top-24 rounded-2xl border border-navy/5 bg-gradient-to-br from-navy-50/60 via-white to-gold-50 p-6 shadow-soft">
      <div className="eyebrow">Booking Summary</div>
      <div className="mt-4 space-y-3 text-sm">
        <SummaryLine
          icon={Sparkles}
          label="Service"
          value={service?.name || "Not selected"}
        />
        <SummaryLine
          icon={MapPinned}
          label="Zone"
          value={
            zone
              ? `${zone.name} · ${zone.operator.name}`
              : "Not selected"
          }
        />
        <SummaryLine
          icon={CalendarDays}
          label="When"
          value={
            booking.date
              ? `${new Date(booking.date).toLocaleDateString("en-AU", {
                  day: "numeric",
                  month: "short",
                })} · ${booking.time ? prettyTime(booking.time) : "—"}`
              : "Not selected"
          }
        />
        {fragrance && (
          <SummaryLine
            icon={Crown}
            label="Scent"
            value={`${fragrance.emoji} ${fragrance.name}`}
          />
        )}
      </div>

      <div className="mt-5 border-t border-navy/10 pt-5">
        <div className="flex items-center justify-between">
          <div className="text-sm text-navy/65">Estimated total</div>
          <div className="font-display text-2xl font-semibold text-navy">
            ${service?.price ?? 0}
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-xl border border-gold/30 bg-white px-3 py-2.5 text-xs text-navy/75">
        <ShieldCheck className="h-4 w-4 text-gold" />
        Police-cleared, GPS-tracked, fully insured.
      </div>
    </div>
  );
}

function SummaryLine({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-navy shadow-soft ring-1 ring-navy/5">
        <Icon className="h-4 w-4 text-gold-700" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-navy/55">
          {label}
        </div>
        <div className="truncate text-sm font-semibold text-navy">{value}</div>
      </div>
    </div>
  );
}

function prettyTime(id) {
  return TIME_SLOTS.find((t) => t.id === id)?.label || id;
}

function SuccessView({
  reference,
  service,
  zone,
  booking,
  fragrance,
  onAnother,
}) {
  return (
    <section className="container-x py-20 md:py-28">
      <Reveal>
        <div className="mx-auto max-w-3xl rounded-3xl border border-navy/5 bg-white p-8 shadow-elevated md:p-12">
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-elevated">
              <CheckCircle2 className="h-8 w-8" />
            </span>
            <div className="mt-5 eyebrow">Booking confirmed</div>
            <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-navy md:text-5xl">
              You're all set, <span className="text-gold">{booking.details.name?.split(" ")[0] || "friend"}.</span>
            </h1>
            <p className="mt-3 max-w-lg text-sm text-navy/65 md:text-base">
              We've sent a confirmation to <strong>{booking.details.email}</strong>.
              You will receive an SMS confirmation shortly with your live
              tracking link.
            </p>

            <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-gold/30 bg-gold/10 px-5 py-2.5">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-gold-700">
                Reference
              </span>
              <span className="font-display text-lg font-semibold tracking-tight text-navy">
                {reference}
              </span>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <SummaryRow
              label="Service"
              value={service?.name}
              sub={`$${service?.price} · ${service?.duration}`}
            />
            <SummaryRow
              label="Zone"
              value={zone ? `${zone.name} · ${zone.region}` : "—"}
              sub={zone ? `Operator · ${zone.operator.name}` : ""}
            />
            <SummaryRow
              label="Date"
              value={
                booking.date
                  ? new Date(booking.date).toLocaleDateString("en-AU", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })
                  : "—"
              }
              sub={booking.time ? prettyTime(booking.time) : ""}
            />
            <SummaryRow
              label="Address"
              value={booking.details.address || "—"}
              sub={booking.details.vehicle}
            />
            {fragrance && (
              <SummaryRow
                label="Scent"
                value={`${fragrance.emoji} ${fragrance.name}`}
              />
            )}
            <SummaryRow
              label="Pay on"
              value="Completion · Square tap-and-go"
            />
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link to="/track" className="btn-gold">
              Track your operator
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/account" className="btn-outline">
              View in My Account
            </Link>
            <button onClick={onAnother} className="btn-ghost">
              Book another
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
