import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/index.js`, // Consistent filename for JS
        assetFileNames: `assets/[name].[ext]`, // Consistent filename for assets (e.g., CSS)
      },
    },
  },
});
