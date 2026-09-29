/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {
    colors: { primary: '#6366F1', secondary: '#6B7280' },
    fontFamily: { sans: ['Inter', 'sans-serif'] },
  }},
  plugins: [],
}
