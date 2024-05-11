import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary": "#273548",
        "secondary": "#F3F6F8",
        "dark": "#31363F",
        "c-gray-300": "#61677A",
        "c-gray-200": "#EEEFF1",
        "c-gray-100": "#F7F7F9",
        "c-info": "#F2F5F2",
        "success": "#0CAB72",
        "success-100": "#D9F4E0",
        "wrong": "#CC3201"
      }
    },
  },
  plugins: [],
};
export default config;
