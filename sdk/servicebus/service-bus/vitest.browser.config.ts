// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig } from "vitest/config";
import browserMap from "@azure-tools/vite-plugin-browser-test-map";
import inject from "@rollup/plugin-inject";

export default defineConfig({
  define: {
    "process.env": process.env,
  },
  optimizeDeps: {
    include: ["process", "buffer"],
  },
  plugins: [
    browserMap(),
    inject({ process: "process", Buffer: ["buffer", "Buffer"], stream: ["stream", "stream"] }),
  ],
  test: {
    testTimeout: 600000,
    hookTimeout: 60000,
    fileParallelism: false,
    include: ["dist-test/browser/**/*.spec.js"],
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
          bypassCSP: true,
          args: ["--no-sandbox", "--disable-web-security"],
        },
      },
    },
    watch: false,
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
