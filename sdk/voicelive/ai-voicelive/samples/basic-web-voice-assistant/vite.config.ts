import { defineConfig } from "vite";
import { localAzureDevelopmentPlugin } from "./server/localAzureDevelopmentPlugin.js";

export default defineConfig({
  root: ".",
  plugins: [localAzureDevelopmentPlugin()],
  build: {
    target: "es2020",
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      input: {
        main: "index.html",
      },
    },
  },
  server: {
    port: 3000,
    host: "127.0.0.1",
    strictPort: true,
    // Enable file watching for SDK source changes
    watch: {
      usePolling: true,
      interval: 300,
    },
  },
  // Configure to watch node_modules changes
  optimizeDeps: {
    force: true, // Force dependency re-optimization on restart
  },
});
