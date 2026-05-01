import {
  Sparkles,
  Wand2,
  Crown,
  ShieldCheck,
  MapPin,
  Star,
  Clock,
} from "lucide-react";

export const BRAND = {
  name: "First Class Detail",
  tagline: "Premium Mobile Car Detailing — We Come To You",
  city: "Perth, Western Australia",
  abn: "ABN 00 000 000 000",
  email: "bookings@firstclassdetail.com.au",
  phone: "+61 400 000 000",
  hours: "Mon — Sun · 7:00am to 6:00pm",
  ig: "@firstclassdetail",
};

export const SERVICES = [
  {
    id: "mini",
    name: "Mini Detail",
    price: 120,
    duration: "~1 hour",
    tagline: "Quick refresh, showroom shine.",
    icon: Sparkles,
    badge: "Most Affordable",
    color: "from-navy-50 to-white",
    accent: "navy",
    bestFor:
      "Regular maintenance, Bentley zone budget-conscious customers.",
    includes: [
      "Quick exterior wash and dry",
      "Window clean inside and out",
      "Tyre shine and rim wipe",
      "Interior vacuum",
      "Dashboard wipe down",
    ],
  },
  {
    id: "full",
    name: "Full Detail",
    price: 220,
    duration: "~2 hours",
    tagline: "The signature First Class clean.",
    icon: Wand2,
    badge: "Most Popular",
    color: "from-gold-50 to-white",
    accent: "gold",
    popular: true,
    bestFor: "Most customers — our most popular service.",
    includes: [
      "Everything in Mini",
      "Full interior deep clean — seats, door pockets, cup holders, floor mats",
      "Glass cleaner on all interior windows",
      "Dashboard and trim dressing",
      "Odour eliminator spray",
      "Wheel and rim full clean",
      "Paint sealant spray finish",
    ],
  },
  {
    id: "premium",
    name: "Premium Detail",
    price: 320,
    duration: "3 — 4 hours",
    tagline: "Concours-level finish, by appointment.",
    icon: Crown,
    badge: "Flagship",
    color: "from-navy-50 to-gold-50",
    accent: "gold",
    bestFor: "Car enthusiasts, special occasions, vehicle sale prep.",
    includes: [
      "Everything in Full",
      "Machine polish with dual-action polisher",
      "Paint decontamination and clay bar treatment",
      "Professional grade paint sealant and protective coating",
      "Scratch and swirl mark removal",
      "Scented finish — choose from 5 fragrances",
    ],
  },
];

export const ZONES = [
  {
    id: "cockburn",
    name: "Cockburn",
    region: "South Perth",
    operator: {
      name: "Michael",
      avatar:
        "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=facearea&w=256&h=256&q=80&facepad=3",
      rating: 5.0,
      jobs: 842,
      since: "2022",
      cleared: true,
      idVerified: true,
    },
  },
  {
    id: "morley",
    name: "Morley",
    region: "North Perth",
    operator: {
      name: "Seamus",
      avatar:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=facearea&w=256&h=256&q=80&facepad=3",
      rating: 4.9,
      jobs: 711,
      since: "2023",
      cleared: true,
      idVerified: true,
    },
  },
  {
    id: "bentley",
    name: "Bentley",
    region: "Central Perth",
    operator: {
      name: "AC",
      avatar:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&w=256&h=256&q=80&facepad=3",
      rating: 5.0,
      jobs: 619,
      since: "2023",
      cleared: true,
      idVerified: true,
    },
  },
];

export const TIME_SLOTS = [
  { id: "0700", label: "7:00 am" },
  { id: "0900", label: "9:00 am" },
  { id: "1100", label: "11:00 am" },
  { id: "1300", label: "1:00 pm" },
  { id: "1500", label: "3:00 pm" },
];

export const FRAGRANCES = [
  { id: "linen", emoji: "🌿", name: "Fresh Linen" },
  { id: "citrus", emoji: "🍊", name: "Citrus Burst" },
  { id: "floral", emoji: "🌸", name: "Floral Bloom" },
  { id: "cedar", emoji: "🌲", name: "Cedar & Pine" },
  { id: "newcar", emoji: "☁️", name: "New Car" },
];

export const TESTIMONIALS = [
  {
    name: "Olivia R.",
    suburb: "Cottesloe",
    rating: 5,
    quote:
      "Showed up early, treated my X3 like it was their own. The interior actually looked better than the day I bought it. Already booked the next one.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&w=200&h=200&q=80&facepad=3",
  },
  {
    name: "Hamish T.",
    suburb: "South Perth",
    rating: 5,
    quote:
      "Booked the Premium before selling my Audi. The clay bar and machine polish results were unreal — sold the car for $1,800 over asking.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&w=200&h=200&q=80&facepad=3",
  },
  {
    name: "Priya K.",
    suburb: "Morley",
    rating: 5,
    quote:
      "Loved being able to track Seamus on the way. Polite, fast, and the car smelt incredible. Genuinely the most premium service in Perth.",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&w=200&h=200&q=80&facepad=3",
  },
];

export const STATS = [
  { value: 2400, suffix: "+", label: "WA Registered Vehicles Served", icon: ShieldCheck },
  { value: 3, suffix: "", label: "Zones Across Perth", icon: MapPin },
  { value: 5, suffix: "★", label: "Customer Rated", icon: Star },
  { value: 60, suffix: "min", label: "Service Minimum", icon: Clock },
];

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2000&q=80";
export const SECONDARY_IMAGE =
  "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1600&q=80";
export const INTERIOR_IMAGE =
  "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1600&q=80";
export const POLISH_IMAGE =
  "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1600&q=80";

// Mock booking history
export const MOCK_HISTORY = [
  {
    id: "FCD-2487",
    date: "2026-04-12",
    service: "Premium Detail",
    operator: "Michael",
    zone: "Cockburn",
    price: 320,
    status: "Completed",
    before:
      "https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=1200&q=80",
    after:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "FCD-2310",
    date: "2026-02-28",
    service: "Full Detail",
    operator: "Seamus",
    zone: "Morley",
    price: 220,
    status: "Completed",
    before:
      "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=1200&q=80",
    after:
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "FCD-2094",
    date: "2026-01-09",
    service: "Mini Detail",
    operator: "AC",
    zone: "Bentley",
    price: 120,
    status: "Completed",
    before:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80",
    after:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
  },
];
