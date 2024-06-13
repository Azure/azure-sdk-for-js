// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { defineConfig } from "vitest/config";
import dotenv from "dotenv";

// Load environment variables from .env file for local development
dotenv.config();

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
      providerOptions: {
        launch: {
          args: ["--disable-web-security"],
        },
      },
    },
    fakeTimers: {
      toFake: ["setTimeout", "Date"],
    },
    watch: false,
    include: ["dist-test/browser/test/public/**/*.spec.js",],
    coverage: {
      include: ["dist-test/browser/**/*.spec.js"],
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      reportsDirectory: "coverage-browser",
    },
  },
});
