import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#D4AF37",
          light: "#F0D060",
          dark: "#A88A20",
        },
        primary: {
          DEFAULT: "#003366", // Deep Blue
          light: "#004080",
          dark: "#002244",
        },
        neutral: {
          50: "#f8fafc", // Very light blue/gray (backgrounds)
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a", // Deep slate for text
        },
        // Keeping legacy names for backward compatibility if needed, but redefining them for a clean layout
        dark: {
          DEFAULT: "#002244", // Deep blue
          card: "#ffffff",
          nav: "#ffffff",
          border: "#e2e8f0",
          hover: "#f8fafc",
        },
        silver: {
          DEFAULT: "#64748b",
          light: "#cbd5e1",
          dark: "#334155",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #A88A20 100%)",
        "hero-gradient": "linear-gradient(180deg, rgba(0,34,68,0.7) 0%, rgba(0,34,68,0.4) 100%)",
        "card-gradient": "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
      },
      boxShadow: {
        gold: "0 4px 14px rgba(212,175,55,0.3)",
        "gold-lg": "0 8px 30px rgba(212,175,55,0.4)",
        card: "0 10px 30px -10px rgba(0,34,68,0.1)",
        soft: "0 20px 40px -15px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
