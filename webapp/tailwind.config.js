/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "secondary-fixed-dim": "#cdc0e9",
        "error": "#ffb4ab",
        "inverse-primary": "#6750a4",
        "on-primary-container": "#e0d2ff",
        "on-secondary-container": "#bfb2da",
        "inverse-surface": "#e6e0e9",
        "on-secondary-fixed-variant": "#4b4263",
        "on-tertiary-container": "#503d00",
        "surface-dim": "#141218",
        "secondary-fixed": "#e9ddff",
        "on-error-container": "#ffdad6",
        "error-container": "#93000a",
        "on-primary-fixed": "#22005d",
        "on-primary-fixed-variant": "#4f378a",
        "surface-bright": "#3b383e",
        "surface-container-highest": "#36343a",
        "surface-container-high": "#2b292f",
        "surface-container": "#211f24",
        "on-tertiary": "#3e2e00",
        "surface": "#141218",
        "on-error": "#690005",
        "on-tertiary-fixed": "#241a00",
        "surface-tint": "#cfbcff",
        "primary": "#cfbcff",
        "tertiary-fixed-dim": "#e7c365",
        "on-secondary-fixed": "#1f1635",
        "secondary-container": "#4d4465",
        "primary-fixed-dim": "#cfbcff",
        "on-surface": "#e6e0e9",
        "on-surface-variant": "#cbc4d2",
        "primary-fixed": "#e9ddff",
        "background": "#000000",
        "outline-variant": "#494551",
        "secondary": "#cdc0e9",
        "inverse-on-surface": "#322f35",
        "tertiary-container": "#c9a74d",
        "tertiary-fixed": "#ffdf93",
        "surface-container-low": "#1d1b20",
        "on-background": "#e6e0e9",
        "outline": "#948e9c",
        "on-primary": "#381e72",
        "surface-container-lowest": "#0f0d13",
        "on-tertiary-fixed-variant": "#594400",
        "tertiary": "#e7c365",
        "on-secondary": "#342b4b",
        "primary-container": "#6750a4",
        "surface-variant": "#36343a",
        "emerald-accent": "#10B981",
        "purple-accent": "#A855F7"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "container-padding": "1.5rem",
        "unit": "4px",
        "bento-gap": "0.75rem",
        "gutter": "1rem"
      },
      fontFamily: {
        "headline-lg-mobile": ["Geist"],
        "headline-lg": ["Geist"],
        "title-md": ["Geist"],
        "body-base": ["Geist"],
        "display-xl": ["Geist"],
        "label-sm": ["Geist"]
      },
      fontSize: {
        "headline-lg-mobile": ["26px", { "lineHeight": "32px", "letterSpacing": "-0.03em", "fontWeight": "700" }],
        "headline-lg": ["38px", { "lineHeight": "44px", "letterSpacing": "-0.04em", "fontWeight": "700" }],
        "title-md": ["18px", { "lineHeight": "24px", "fontWeight": "600" }],
        "body-base": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
        "display-xl": ["58px", { "lineHeight": "64px", "letterSpacing": "-0.05em", "fontWeight": "700" }],
        "label-sm": ["11px", { "lineHeight": "14px", "letterSpacing": "0.05em", "fontWeight": "500" }]
      },
      backgroundImage: {
        'tech-grid': 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-up-delay': 'fadeInUp 0.8s ease-out 0.2s forwards',
        'fade-in-up-delay-2': 'fadeInUp 0.8s ease-out 0.4s forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/container-queries')
  ],
}
