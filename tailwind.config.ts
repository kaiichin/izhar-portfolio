import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#141414",
        paper: "#f7f4ee",
        moss: "#52614a",
        rust: "#b45f3a",
        steel: "#53606f",
        line: "#ded8ce"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "Arial", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 50px rgba(20, 20, 20, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
