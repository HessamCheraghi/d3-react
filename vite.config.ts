import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve("./src"),
    },
  },
  base: "./",
  server: {
    host: true,
    port: 3000,
  },
  preview: {
    host: true,
    port: 8080,
  },
});
