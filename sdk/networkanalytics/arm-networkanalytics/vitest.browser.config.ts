// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { defineConfig } from "vitest/config";

export default defineConfig({
  define: {
    "process.env": process.env,
  },
  test: {
    reporters: ["basic", "junit"],
    outputFile: {
      junit: "test-results.browser.xml",
    },
    browser: {
      enabled: true,
      headless: true,
      name: "chromium",
      provider: "playwright",
    },
    fakeTimers: {
      toFake: ["setTimeout", "Date"],
    },
    watch: false,
    include: ["test/**/*.spec.ts"],
    coverage: {
      include: ["test/**/*.spec.ts"],
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      reportsDirectory: "coverage-browser",
    },
  },
});
