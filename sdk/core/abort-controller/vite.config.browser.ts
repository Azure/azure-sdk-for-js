import { defineConfig } from "vitest/config";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "AbortController",
      fileName: (format) => `abort-controller.${format}.js`,
    },
    rollupOptions: {
      output: {
        esModule: true,
        format: "umd",
      },
    },
    outDir: "dist-browser",
    sourcemap: true,
  },
  test: {
    browser: {
      enabled: true,
      headless: true,
      name: "chrome",
    },
    include: ["./dist-test/index.browser.js"],
    reporters: ["basic", "junit"],
    outputFile: {
      junit: "test-results.browser.xml",
    },
    coverage: {
      provider: "v8",
      reporter: ["html", "lcov", "text"],
      reportsDirectory: "coverage-browser",
    },
  },
});
