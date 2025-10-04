/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Cyberpunk color palette
        neon: {
          pink: '#FF10F0',
          purple: '#8B5CF6',
          blue: '#06B6D4',
          cyan: '#00FFFF',
          magenta: '#FF00FF',
        },
        dark: {
          900: '#0A0A0A',
          800: '#1A1A1A',
          700: '#2A2A2A',
          600: '#3A3A3A',
        },
        glow: {
          pink: 'rgba(255, 16, 240, 0.3)',
          purple: 'rgba(139, 92, 246, 0.3)',
          blue: 'rgba(6, 182, 212, 0.3)',
          cyan: 'rgba(0, 255, 255, 0.3)',
        }
      },
      fontFamily: {
        'cyber': ['Orbitron', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
      },
      keyframes: {
        glow: {
          '0%': { 
            boxShadow: '0 0 5px rgba(255, 16, 240, 0.5), 0 0 10px rgba(255, 16, 240, 0.3), 0 0 15px rgba(255, 16, 240, 0.2)',
          },
          '100%': { 
            boxShadow: '0 0 10px rgba(255, 16, 240, 0.8), 0 0 20px rgba(255, 16, 240, 0.6), 0 0 30px rgba(255, 16, 240, 0.4)',
          },
        },
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 0 5px rgba(139, 92, 246, 0.5)',
          },
          '50%': {
            opacity: '0.8',
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.8), 0 0 30px rgba(139, 92, 246, 0.6)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'neon-pink': '0 0 5px rgba(255, 16, 240, 0.5), 0 0 10px rgba(255, 16, 240, 0.3), 0 0 15px rgba(255, 16, 240, 0.2)',
        'neon-purple': '0 0 5px rgba(139, 92, 246, 0.5), 0 0 10px rgba(139, 92, 246, 0.3), 0 0 15px rgba(139, 92, 246, 0.2)',
        'neon-blue': '0 0 5px rgba(6, 182, 212, 0.5), 0 0 10px rgba(6, 182, 212, 0.3), 0 0 15px rgba(6, 182, 212, 0.2)',
        'neon-cyan': '0 0 5px rgba(0, 255, 255, 0.5), 0 0 10px rgba(0, 255, 255, 0.3), 0 0 15px rgba(0, 255, 255, 0.2)',
      },
    },
  },
  plugins: [],
}
