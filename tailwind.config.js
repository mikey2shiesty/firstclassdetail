/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1A2744",
          50: "#E8EBF1",
          100: "#C5CCDC",
          200: "#8E9BB6",
          300: "#5A6A8E",
          400: "#324166",
          500: "#1A2744",
          600: "#152038",
          700: "#10182A",
          800: "#0B111E",
          900: "#070B14",
        },
        gold: {
          DEFAULT: "#C9A84C",
          50: "#FBF7EC",
          100: "#F4EAC7",
          200: "#E9D693",
          300: "#DCC066",
          400: "#D1B257",
          500: "#C9A84C",
          600: "#A88A37",
          700: "#7D672A",
          800: "#54461C",
          900: "#2D260F",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 6px 24px -8px rgba(26, 39, 68, 0.18)",
        elevated:
          "0 20px 50px -20px rgba(26, 39, 68, 0.35), 0 8px 16px -8px rgba(26, 39, 68, 0.15)",
        gold: "0 12px 30px -10px rgba(201, 168, 76, 0.45)",
      },
      backgroundImage: {
        "gold-line":
          "linear-gradient(90deg, rgba(201,168,76,0) 0%, #C9A84C 50%, rgba(201,168,76,0) 100%)",
        "navy-radial":
          "radial-gradient(circle at top right, #324166 0%, #1A2744 55%, #10182A 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "van-move": {
          "0%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(60%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up .6s ease-out both",
        shimmer: "shimmer 2.5s linear infinite",
        "van-move": "van-move 12s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
