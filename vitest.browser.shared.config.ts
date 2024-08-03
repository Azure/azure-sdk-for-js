// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { defineConfig } from "vitest/config";
import browserMap from "@azure-tools/vite-plugin-browser-test-map";
import { relativeRecordingsPath } from "@azure-tools/test-recorder";

process.env.RECORDINGS_RELATIVE_PATH = relativeRecordingsPath();

export default defineConfig({
  define: {
    "process.env": process.env,
  },
  optimizeDeps: {
    include: ["@azure-tools/test-recorder"],
  },
  test: {
    testTimeout: 18000,
    reporters: ["verbose", "junit"],
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
