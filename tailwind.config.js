/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Primary background — Dark Organic Green
        "bg-base": "#0A0F0A",
        // Sedikit lebih terang, dipakai untuk section alternating
        "bg-surface": "#0F150F",
        // Accent utama — Moss / Sage Green
        "accent-primary": "#7A9B5C",
        // Glow accent — dipakai terbatas untuk highlight
        "accent-glow": "#B8E986",
        // Secondary accent — Soft Teal (tidak dominan)
        "accent-cyan": "#5FD3C4",
        // Text
        "text-primary": "#E8EDE4",
        "text-secondary": "#9BA894",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        serif: ["Fraunces", "serif"],
      },
      borderRadius: {
        pill: "9999px",
      },
    },
  },
  plugins: [],
};
