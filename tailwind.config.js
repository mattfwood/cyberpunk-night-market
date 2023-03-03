/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#fd2133',
          100: 'rgba(253,33,51,0.1)',
          200: 'rgba(253,33,51,0.25)',
          300: 'rgba(253,33,51,0.5)',
        },
        secondary: '#161616',
        accent: '#ed8936',
        'accent-light': '#f6ad55',
      },
    },
  },
  plugins: [],
};
