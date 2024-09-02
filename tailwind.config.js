/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cyan: "#82E9EF",
        "light-violet": "#DF63FF",
        midnight: "#040406",
      },
      screens: {
        xs: "480px",
        "3xl": "1650px",
        "4xl": "2200px",
      },
    },
  },
  plugins: [],
};
