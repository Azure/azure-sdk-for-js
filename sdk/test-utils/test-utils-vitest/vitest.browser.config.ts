// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig } from "vitest/config";
import { AzureSDKReporter } from "../../../vitest.shared.config.js";

export default defineConfig({
  test: {
    reporters: [new AzureSDKReporter(), "junit"],
    outputFile: {
      junit: "test-results.browser.xml",
    },
    browser: {
      instances: [
        {
          browser: "chromium",
        },
      ],
      enabled: true,
      headless: true,
      provider: "playwright",
    },
    fakeTimers: {
      toFake: ["setTimeout"],
    },
    watch: false,
    include: ["dist-test/browser/**/*.spec.js"],
    coverage: {
      include: ["dist-test/browser/**/*.js"],
      exclude: [
        "dist-test/browser/**/*./*-browser.mjs",
        "dist-test/browser/**/*./*-react-native.mjs",
      ],
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      reportsDirectory: "coverage-browser",
    },
  },
});
