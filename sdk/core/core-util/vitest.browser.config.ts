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
    },
    fakeTimers: {
      toFake: ["setTimeout"],
    },
    watch: false,
    include: ["./dist-test/browser/**/*.spec.js"],
  },
});
