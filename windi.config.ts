import { defineConfig } from "windicss/helpers";

export default defineConfig({
  attributify: false,
  extract: {
    include: ["./src/**/*.{svelte,html,ts,js}"],
    exclude: ["node_modules", "node_modules/**"],
  },
  theme: {
    extend: {},
    container: {
      center: true,
      padding: "2rem",
    },
  },
});
