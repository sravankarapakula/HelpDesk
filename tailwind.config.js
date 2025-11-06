/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
      colors: {
        snuBlue: { 50: "#eff6ff", 100: "#dbeafe", 600: "#2563eb", 700: "#1d4ed8" }
      }
    }
  },
  // needed because you used template strings like border-${color}-600
  safelist: [
    "border-blue-600",
    "border-yellow-600",
    "border-green-600",
    "border-gray-600",
    "bg-blue-100",
    "text-blue-800",
    "bg-yellow-100",
    "text-yellow-800",
    "bg-green-100",
    "text-green-800",
    "bg-gray-100",
    "text-gray-800",
    "text-red-600",
    "text-yellow-600",
    "text-green-600"
  ],
  plugins: []
};
