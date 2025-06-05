// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig } from "vitest/config";
import { AzureSDKReporter } from "../../../vitest.shared.config.js";
import browserMap from "@azure-tools/vite-plugin-browser-test-map";
import inject from "@rollup/plugin-inject";
import { resolve } from "node:path";

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
    testTimeout: 6000000,
    hookTimeout: 6000000,
    fileParallelism: false,
    include: ["dist-test/browser/**/*.spec.js"],
    globalSetup: ["./test/utils/setup.ts"],
    setupFiles: ["./test/utils/logging.ts"],
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
    alias: {
      "@azure/event-hubs": resolve("./dist/browser/index.js"),
      "../../../src": resolve("./dist/browser"),
      "../../src": resolve("./dist/browser"),
    },
  },
});
