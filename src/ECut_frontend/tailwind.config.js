/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary : "#FDC315",
        secondary : "#9E9E9E",
        tertiary : "#3D3D3D"
      }
    },
  },
  plugins: [],
}

