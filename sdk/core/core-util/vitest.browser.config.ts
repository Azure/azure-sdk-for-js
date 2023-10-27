// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    reporters: ["basic", "junit"],
    outputFile: {
      junit: "test-results.browser.xml",
    },
    browser: {
      enabled: true,
      headless: true,
      name: "chrome",
      provider: "webdriverio",
      slowHijackESM: false,
    },
    fakeTimers: {
      toFake: ["setTimeout"],
    },
    watch: false,
    include: ["./dist-test/browser/**/*.spec.js"],
    coverage: {
      include: ["src/**/*.ts"],
      exclude: [
        "src/**/*-browser.mts",
        "src/**/*-react-native.mts",
        "vitest*.config.ts",
        "samples-dev/**/*.ts",
      ],
      provider: "v8",
      reporter: ["text", "json", "html"],
      reportsDirectory: "coverage-browser",
    },
  },
});
