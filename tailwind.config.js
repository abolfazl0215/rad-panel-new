/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./store/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body:    ["var(--font-body)", "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          950: "#0a0a0f",
          900: "#111118",
          800: "#1a1a26",
          700: "#242433",
          600: "#2e2e42",
          500: "#3d3d55",
          400: "#55557a",
        },
        gold: {
          300: "#f5d580",
          400: "#f0c060",
          500: "#e8aa30",
          600: "#d4941a",
        },
      },
      animation: {
        "fade-in":  "fadeIn 0.35s ease forwards",
        "slide-up": "slideUp 0.35s ease forwards",
        shimmer:    "shimmer 1.4s infinite",
      },
      keyframes: {
        fadeIn:  { from: { opacity: "0", transform: "translateY(8px)" },  to: { opacity: "1", transform: "translateY(0)" } },
        slideUp: { from: { opacity: "0", transform: "translateY(16px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        shimmer: {
          "0%":   { backgroundPosition: "-600px 0" },
          "100%": { backgroundPosition:  "600px 0" },
        },
      },
    },
  },
  plugins: [],
};
