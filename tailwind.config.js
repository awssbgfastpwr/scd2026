/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFDF5',
        surface: '#FFFFFF',
        primary: '#FF6B6B',
        secondary: '#FFE66D',
        tertiary: '#4ECDC4',
        success: '#2ECC71',
        warning: '#F39C12',
        danger: '#E74C3C',
        textPrimary: '#0A0A0A',
        textSecondary: '#555555',
        border: '#000000',
        footer: '#0A0A0A'
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'neo': '6px 6px 0px 0px #000000',
        'neo-hover': '8px 8px 0px 0px #000000',
        'neo-sm': '4px 4px 0px 0px #000000',
      },
      borderRadius: {
        none: '0px',
      }
    },
  },
  plugins: [],
}
