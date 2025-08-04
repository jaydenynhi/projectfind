/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf2f8', // pastel pink
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        secondary: {
          50: '#f7f0ff', // pastel purple
          100: '#ede4ff',
          200: '#d1b8ff',
          300: '#b48aff',
          400: '#975cff',
          500: '#7a2eff',
          600: '#6626e0',
          700: '#511fb3',
          800: '#3d1886',
          900: '#290f59',
        },
        accent: {
          50: '#f0faff', // pastel blue
          100: '#e0f4ff',
          200: '#b8e4ff',
          300: '#8ad4ff',
          400: '#5cc4ff',
          500: '#2eb4ff',
          600: '#2699e0',
          700: '#1f7bb3',
          800: '#185d86',
          900: '#103f59',
        },
        yellow: {
          50: '#fffbe6', // pastel yellow
          100: '#fff7cc',
          200: '#ffef99',
          300: '#ffe766',
          400: '#ffdf33',
          500: '#ffd700',
          600: '#e0bc00',
          700: '#b39600',
          800: '#867000',
          900: '#594a00',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      }
    },
  },
  plugins: [],
} 