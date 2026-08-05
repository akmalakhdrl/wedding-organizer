/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          gold: "#D4AF37",
          "gold-light": "#E6C280",
          "gold-dark": "#997A37",
          "gold-metallic": "#C5A059",
          rosegold: "#B76E79",
          "rosegold-light": "#E8C5C8",
          cream: "#FAF7F2",
          "cream-light": "#FFFDF9",
          "cream-dark": "#EFE6DD",
          beige: "#F4EFEA",
          dark: "#1A1817",
          "dark-soft": "#2C2825",
          "dark-muted": "#3D3732",
          champagne: "#F7E7CE"
        }
      },
      fontFamily: {
        heading: ["'Playfair Display'", "serif"],
        body: ["'Poppins'", "sans-serif"],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F7E7CE 50%, #C5A059 100%)',
        'rosegold-gradient': 'linear-gradient(135deg, #B76E79 0%, #E8C5C8 50%, #B76E79 100%)',
        'dark-gradient': 'linear-gradient(180deg, rgba(26,24,23,0.85) 0%, rgba(26,24,23,0.98) 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.3) 100%)',
      },
      boxShadow: {
        'luxury': '0 20px 50px rgba(0, 0, 0, 0.08)',
        'luxury-hover': '0 30px 60px rgba(212, 175, 55, 0.18)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.35)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
