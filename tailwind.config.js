module.exports = {
  darkMode: 'class',
  content: [
    './name.html',
    './index.html',
    './pages/**/*.html',
    './scripts/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        primaryStart: '#8b5cf6',
        primaryEnd: '#6366f1',
        accent: '#06b6d4',
        muted: '#64748b',
        textDark: '#1e293b',
        darkBg: '#0f172a',
        darkText: '#f1f5f9'
      },
      fontFamily: {
        vazir: ['"Vazirmatn"', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'typing': 'typing 3.5s steps(40, end)',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
        'shimmer': 'shimmer 2s linear infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        typing: {
          from: { width: '0' },
          to: { width: '100%' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' }
        }
      }
    }
  },
  plugins: []
};
