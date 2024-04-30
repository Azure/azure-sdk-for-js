// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { defineConfig } from "vitest/config";
import browserMap from "@azure-tools/vite-plugin-browser-test-map";

export default defineConfig({
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
      toFake: ["setTimeout"],
    },
    watch: false,
    coverage: {
      enable: true,
      include: ["dist-test/browser/**/*.js"],
      exclude: [
        "dist-test/browser/**/*./*-browser.mjs",
        "dist-test/browser/**/*./*-react-native.mjs",
      ],
      provider: "istanbul",
      reporter: ["text", "html", "cobertura"],
      reportsDirectory: "coverage-browser",
    },
  },
});
