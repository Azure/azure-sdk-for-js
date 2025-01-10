// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig } from "vitest/config";
import { relativeRecordingsPath } from "@azure-tools/test-recorder";

process.env.RECORDINGS_RELATIVE_PATH = relativeRecordingsPath();

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
    include: ["dist-test/browser/**/*.spec.js"],
    coverage: {
      include: ["dist-test/browser/**/*.spec.js"],
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      reportsDirectory: "coverage-browser",
    },
    testTimeout: 1200000,
    hookTimeout: 1200000,
  },
});
