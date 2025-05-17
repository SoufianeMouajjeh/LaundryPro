/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#a1e3c2", // Mint green
          foreground: "#FFFFFF",
          "50": "#f0fdf6",
          "100": "#dcfce9",
          "200": "#a1e3c2", // Main primary color
          "300": "#7ed4a9",
          "400": "#4cbc8a",
          "500": "#2ea36f",
          "600": "#1f8559",
          "700": "#1a6a48",
          "800": "#17543b",
          "900": "#154532",
        },
        secondary: {
          DEFAULT: "#0891B2", // Rich cyan
          foreground: "#FFFFFF",
          "50": "#ECFEFF",
          "100": "#CFFAFE",
          "200": "#A5F3FC",
          "300": "#67E8F9",
          "400": "#22D3EE",
          "500": "#06B6D4",
          "600": "#0891B2",
          "700": "#0E7490",
          "800": "#155E75",
          "900": "#164E63",
        },
        accent: {
          DEFAULT: "#F97316", // Vibrant orange
          foreground: "#FFFFFF",
          "50": "#FFF7ED",
          "100": "#FFEDD5",
          "200": "#FED7AA",
          "300": "#FDBA74",
          "400": "#FB923C",
          "500": "#F97316",
          "600": "#EA580C",
          "700": "#C2410C",
          "800": "#9A3412",
          "900": "#7C2D12",
        },
        success: {
          DEFAULT: "#10B981", // Emerald green
          foreground: "#FFFFFF",
          "50": "#ECFDF5",
          "100": "#D1FAE5",
          "200": "#A7F3D0",
          "300": "#6EE7B7",
          "400": "#34D399",
          "500": "#10B981",
          "600": "#059669",
          "700": "#047857",
          "800": "#065F46",
          "900": "#064E3B",
        },
        warning: {
          DEFAULT: "#F59E0B", // Amber
          foreground: "#FFFFFF",
          "50": "#FFFBEB",
          "100": "#FEF3C7",
          "200": "#FDE68A",
          "300": "#FCD34D",
          "400": "#FBBF24",
          "500": "#F59E0B",
          "600": "#D97706",
          "700": "#B45309",
          "800": "#92400E",
          "900": "#78350F",
        },
        error: {
          DEFAULT: "#EF4444", // Red
          foreground: "#FFFFFF",
          "50": "#FEF2F2",
          "100": "#FEE2E2",
          "200": "#FECACA",
          "300": "#FCA5A5",
          "400": "#F87171",
          "500": "#EF4444",
          "600": "#DC2626",
          "700": "#B91C1C",
          "800": "#991B1B",
          "900": "#7F1D1D",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundColor: {
        DEFAULT: "hsl(var(--background))"
      },
      textColor: {
        DEFAULT: "hsl(var(--foreground))"
      },
      borderColor: {
        DEFAULT: "hsl(var(--border))"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "fade-out": {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        "slide-up": {
          "0%": { transform: "translateY(10px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        "slide-down": {
          "0%": { transform: "translateY(-10px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-out": "fade-out 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        "slide-down": "slide-down 0.5s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(to right, #a1e3c2, #7ed4a9)',
        'gradient-secondary': 'linear-gradient(to right, #0891B2, #06B6D4)',
        'gradient-accent': 'linear-gradient(to right, #F97316, #FB923C)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} 