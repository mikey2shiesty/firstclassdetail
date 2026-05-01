import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { BRAND } from "../lib/data";

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M14 9h2.5l.5-3.5H14V3.7c0-1 .3-1.7 1.7-1.7H17V0h-2.4c-2.6 0-4 1.5-4 4v1.5H8V9h2.6v9H14V9z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 bg-grid-light opacity-[.35]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gold-line" />
      <div className="container-x relative grid gap-12 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="max-w-sm text-sm leading-relaxed text-white/65">
            Perth's premium mobile car detailing service. Police-cleared
            operators, GPS-tracked vans, fully insured. We come to your home,
            office or anywhere across the metro.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="#"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-gold hover:text-gold"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-gold hover:text-gold"
              aria-label="Facebook"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${BRAND.email}`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-gold hover:text-gold"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="eyebrow text-gold">Explore</div>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            <li><Link to="/" className="hover:text-gold">Home</Link></li>
            <li><Link to="/services" className="hover:text-gold">Services & Pricing</Link></li>
            <li><Link to="/book" className="hover:text-gold">Book a Detail</Link></li>
            <li><Link to="/track" className="hover:text-gold">Track Your Operator</Link></li>
            <li><Link to="/account" className="hover:text-gold">My Account</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="eyebrow text-gold">Contact</div>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-gold" /> {BRAND.phone}
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-gold" /> {BRAND.email}
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 text-gold" /> {BRAND.city}
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 text-gold" /> {BRAND.hours}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-start justify-between gap-3 py-6 text-xs text-white/55 sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} First Class Detail Pty Ltd · {BRAND.abn}</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-gold">Privacy</a>
            <a href="#" className="hover:text-gold">Terms</a>
            <a href="#" className="hover:text-gold">Insurance</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
