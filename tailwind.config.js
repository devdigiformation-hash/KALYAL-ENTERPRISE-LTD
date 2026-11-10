/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kalyal: {
          navy: '#0B2545',
          dark: '#081426',
          darker: '#050D1A',
          card: '#0D1B2A',
          blue: '#134074',
          accent: '#007ACC',
          gold: '#EE964B',
          amber: '#F4A261',
          goldLight: '#FAD02C',
          light: '#EEF4F8',
          border: 'rgba(255, 255, 255, 0.1)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Outfit', 'sans-serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 35px -5px rgba(238, 150, 75, 0.35)',
        'glow-blue': '0 0 40px -5px rgba(19, 64, 116, 0.5)',
      }
    },
  },
  plugins: [],
}
