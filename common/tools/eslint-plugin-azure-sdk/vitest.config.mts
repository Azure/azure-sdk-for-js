// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    reporters: ["basic", "junit"],
    outputFile: {
      junit: "test-results.xml",
    },
    fakeTimers: {
      toFake: ["setTimeout", "Date"],
    },
    watch: false,
    include: ["tests/**/*.ts"],
    exclude: ["tests/ruleTester.ts", "tests/fixture/**"],
    coverage: {
      include: ["src/**/*.ts"],
      exclude: ["vitest*.config.ts", "tests/fixture/**"],
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      reportsDirectory: "coverage",
    },
  },
});
