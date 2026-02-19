/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        /* ===== BRAND ===== */
        primary: "#134E4A",     // Dark Green–Teal
        accent: "#F59E0B",      // Amber (sparingly)

        /* ===== BACKGROUNDS ===== */
        background: "#FAFAF9", // Page background
        card: "#FFFFFF",       // Cards / sections

        /* ===== TEXT ===== */
        text: {
          primary: "#1C1917",
          muted: "#78716C"
        },

        /* ===== UI ===== */
        border: "#E7E5E4",

        /* ===== ADMIN LIGHT THEME (matches main site) ===== */
        "a-bg": "#F5F3F0",
        "a-surface": "#FFFFFF",
        "a-sf-hover": "#F5F5F4",
        "a-sf-active": "#EEECEB",
        "a-border": "#E7E5E4",
        "a-brd-lt": "#D6D3D1",
        "a-text": "#1C1917",
        "a-text-s": "#57534E",
        "a-text-m": "#A8A29E",
        "a-accent": "#134E4A",
        "a-accent-2": "#0D9488",
        "a-success": "#16a34a",
        "a-danger": "#dc2626",
        "a-warning": "#d97706",
        "a-info": "#0891b2",
      },
      fontFamily: {
        sans: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        admin: ['Inter', 'system-ui', 'sans-serif'],
      },
    }
  },
  plugins: []
};
