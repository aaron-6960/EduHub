/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'main': {
          '50': '#f4f0ff',
          '100': '#ece4ff',
          '200': '#daccff',
          '300': '#bfa4ff',
          '400': '#a270ff',
          '500': '#8937ff',
          '600': '#7f0fff',
          '700': '#7300ff',
          '800': '#6000da',
          '900': '#4e00ad',
          '950': '#2f007a',
        },
      },
    },
  },
  plugins: [],
}