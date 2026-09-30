/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkBg: '#0A0A0F',
        darkCard: '#16161F',
        darkBorder: '#262636',
        amberAccent: '#F59E0B',
      },
      boxShadow: {
        'amber-glow': '0 0 25px -5px rgba(245, 158, 11, 0.3)',
        'amber-glow-lg': '0 0 40px -5px rgba(245, 158, 11, 0.4)',
      }
    },
  },
  plugins: [],
}
