
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "payment-dark": "#0F1116",
        "payment-purple": "#9F3FFF",
        "payment-pink": "#FF3FED",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient":
          "linear-gradient(to right, rgba(159, 63, 255, 0.1), rgba(255, 63, 237, 0.1))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
