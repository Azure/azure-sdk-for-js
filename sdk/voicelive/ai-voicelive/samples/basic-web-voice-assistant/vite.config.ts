import { defineConfig } from 'vite';
import path from 'path';

// Azure SDK packages use nested conditional exports that Vite's esbuild
// dep scanner cannot resolve. Alias each to its browser entry point.
const azurePkgs = [
  "@azure/ai-voicelive",
  "@azure/logger",
  "@azure/core-util",
  "@azure/core-auth",
  "@azure/abort-controller",
  "@azure/core-rest-pipeline",
];

export default defineConfig({
  root: '.',
  build: {
    target: 'es2020',
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: 'index.html'
      }
    }
  },
  resolve: {
    alias: azurePkgs.map((pkg) => ({
      find: pkg,
      replacement: path.resolve(__dirname, "node_modules", pkg, "dist/browser/index.js"),
    })),
  },
  server: {
    port: 3000,
    host: true,
    // Enable file watching for SDK source changes
    watch: {
      usePolling: true,
      interval: 300
    }
  },
  optimizeDeps: {
    exclude: azurePkgs,
    force: true
  }
});