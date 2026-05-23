export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Sofia Sans"', "sans-serif"],
        mono: ['"Roboto Mono"', "monospace"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(34, 211, 238, 0.18), 0 20px 80px rgba(0, 0, 0, 0.45)",
      },
    },
  },
  plugins: [],
};
