import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: "#101820",
        panel: "#17212b",
        clinical: "#2b7a78",
        signal: "#d1495b",
        bone: "#f2efe6",
        amber: "#f4a261"
      },
      boxShadow: {
        workstation: "0 18px 60px rgba(0,0,0,0.26)"
      }
    }
  },
  plugins: []
};

export default config;

