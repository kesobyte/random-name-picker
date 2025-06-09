/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        fuzzy: ["Fuzzy Bubbles", "cursive"],
        blackHan: ["Black Han Sans", "sans-serif"],
        oi: ["Oi", "cursive"],
      },
    },
  },
  plugins: [],
};
