import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ocean: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          800: "#075985",
          900: "#0c4a6e",
          950: "#021526", // Deep coastal night black
        },
        beach: {
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          sand: "#fcf8f2", // Warm sand white
          luxury: "#ffffff",
        },
        neon: {
          blue: "#00E5FF", // Tech blue glow
          violet: "#8B5CF6", // AI voice agent/CRM highlight
          teal: "#0D9488",
        }
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-medium": "float 5s ease-in-out infinite",
        "wave-drift": "drift 20s linear infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-15px) rotate(1deg)" },
        },
        drift: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        }
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "glass-light": "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
        glow: "0 0 15px rgba(0, 229, 255, 0.4)",
        "glow-violet": "0 0 15px rgba(139, 92, 246, 0.4)",
      }
    },
  },
  plugins: [],
};
export default config;
