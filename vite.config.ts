import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "./src/assets/scss/var.colors.scss" as colors;
          @use "./src/assets/scss/var.grid.scss" as grid;
          @import "./src/assets/scss/var.mixins.scss";
       `,
      },
    },
  },
});
