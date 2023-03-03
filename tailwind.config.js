/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#fd2133",
        secondary: "#161616",
        accent: "#ed8936",
        "accent-light": "#f6ad55",
      },
    },
  },
  plugins: [],
}
