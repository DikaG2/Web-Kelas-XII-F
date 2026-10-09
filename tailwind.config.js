/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1F87FF',
          dark: '#0066DD',
          light: '#E6F2FF',
        }
      }
    },
  },
  plugins: [],
}