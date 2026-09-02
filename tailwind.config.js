/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#13100d',
          secondary: '#1c1712',
          surface: '#211b15',
          elevated: '#2a2219',
        },
        gold: {
          DEFAULT: '#b8965a',
          muted: '#9a7d4a',
          bright: '#d4af6e',
          glow: 'rgba(184, 150, 90, 0.12)',
        },
        cream: {
          DEFAULT: '#ede5d8',
          soft: 'rgba(237, 229, 216, 0.72)',
          muted: 'rgba(237, 229, 216, 0.45)',
        },
        burgundy: '#5c1a2a',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Amiri', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}
