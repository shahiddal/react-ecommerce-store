/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // ✅ 1. Custom Animations add karein
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        shimmer: "shimmer 2s infinite", // Skeleton loading ke liye
        fadeIn: "fadeIn 0.5s ease-out forwards", // Page elements ke liye
      },

      // ✅ 2. Custom Border Radius (Professional look ke liye)
      borderRadius: {
        "4xl": "2rem",
        "5xl": "3rem",
      },

      // ✅ 3. Custom Colors (Agar aapko indigo ke saath purple blend karna ho)
      colors: {
        brand: {
          light: "#6366f1", // Indigo-500
          dark: "#4f46e5", // Indigo-600
        },
      },
    },
  },
  plugins: [
    // ✅ 4. Scrollbar hide karne ya customize karne ke liye utility
    function ({ addUtilities }) {
      addUtilities({
        ".hide-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
        ".custom-scrollbar": {
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#6366f1",
            borderRadius: "10px",
          },
        },
      });
    },
  ],
};
