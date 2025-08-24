/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Make sure this is set
  theme: {
    extend: {
      // ...existing code...
    },
  },
  plugins: [],
}

