import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import Track from "./pages/Track";
import Account from "./pages/Account";
import { ToastProvider } from "./lib/ToastProvider";
import { BookingProvider } from "./lib/BookingContext";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ToastProvider>
      <BookingProvider>
        <ScrollToTop />
        <div className="flex min-h-screen flex-col bg-white">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/book" element={<Booking />} />
              <Route path="/track" element={<Track />} />
              <Route path="/account" element={<Account />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BookingProvider>
    </ToastProvider>
  );
}
