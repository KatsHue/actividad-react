/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
      },
      colors: {
        "satori-blue": "#A8C5E4",
        "satori-lavender": "#D4C5E0",
        "satori-beige": "#F5EFE6",
        "satori-green": "#B8D4C8",
      },
    },
  },
  plugins: [],
};
