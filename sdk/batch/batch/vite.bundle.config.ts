import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "dist/browser/index.js"),
      name: "AzureBatchModular",
      fileName: "azure-batch-modular",
      formats: ["es"],
    },
    outDir: "bundle-analysis",
    minify: "terser",
    sourcemap: false,
    rollupOptions: {
      // Don't externalize dependencies - bundle everything
      external: [],
    },
    reportCompressedSize: true,
  },
});
