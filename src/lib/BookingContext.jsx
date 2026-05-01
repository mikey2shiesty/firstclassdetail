import { createContext, useContext, useMemo, useState } from "react";

const BookingCtx = createContext(null);

export function useBooking() {
  const ctx = useContext(BookingCtx);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}

const initial = {
  serviceId: null,
  zoneId: null,
  date: null,
  time: null,
  details: {
    name: "",
    email: "",
    phone: "",
    address: "",
    vehicle: "",
    notes: "",
    isGift: false,
    giftRecipient: "",
    giftMessage: "",
  },
  fragranceId: null,
  reference: null,
};

export function BookingProvider({ children }) {
  const [booking, setBooking] = useState(initial);

  const value = useMemo(
    () => ({
      booking,
      update: (patch) => setBooking((b) => ({ ...b, ...patch })),
      updateDetails: (patch) =>
        setBooking((b) => ({ ...b, details: { ...b.details, ...patch } })),
      reset: () => setBooking(initial),
    }),
    [booking],
  );
  return <BookingCtx.Provider value={value}>{children}</BookingCtx.Provider>;
}
