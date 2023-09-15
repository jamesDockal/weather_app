/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        350: "350px",
      },
      spacing: {
        32: "32px",
        130: "130px",
      },
    },
  },
  plugins: [],
};
