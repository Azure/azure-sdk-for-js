import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["test/**/*.spec.ts"],
    reporters: ["basic", "junit"],
    outputFile: {
      junit: "test-results.xml",
    },
    coverage: {
      provider: "v8",
      reporter: ["html", "lcov", "text"],
      reportsDirectory: "coverage",
    },
  },
});
