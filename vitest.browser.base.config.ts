// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";
import browserMap from "@azure-tools/vite-plugin-browser-test-map";
import {
  AzureSDKReporter,
  makeAliases,
  fixCoreLroExternalization,
} from "./vitest.shared.config.js";

function makeBrowserAliases(rootDir: string) {
  return makeAliases(rootDir, { distDir: `./dist/browser`, indexFile: `index.js` });
}

export default defineConfig({
  plugins: [fixCoreLroExternalization()],
  define: {
    "process.env": process.env,
  },
  test: {
    testTimeout: 1200000,
    hookTimeout: 1200000,
    reporters: [new AzureSDKReporter(), "junit"],
    outputFile: {
      junit: "test-results.browser.xml",
    },
    include: ["dist-test/**/*.spec.js"],
    exclude: [
      "dist-test/**/node/*.spec.js",
      "dist-test/snippets.spec.js",
      "dist-test/integration/**/*.spec.js",
      "dist-test/stress/**/*.js",
    ],
    browser: {
      api: 43315,
      instances: [
        {
          browser: "chromium",
        },
      ],
      enabled: true,
      headless: true,
      provider: playwright({
        launchOptions: {
          args: ["--disable-web-security"],
        },
      }),
    },
    fakeTimers: {
      toFake: ["setTimeout", "Date"],
    },
    watch: false,
    alias: [...makeBrowserAliases(process.cwd())],
    coverage: {
      include: ["dist-test/browser/**/*.js"],
      exclude: [
        "dist-test/browser/**/*./*-browser.mjs",
        "dist-test/browser/**/*./*-react-native.mjs",
        "dist-test/browser/**/snippets.spec.js",
      ],
      provider: "istanbul",
      reporter: ["text", "cobertura", "html"],
      reportsDirectory: "coverage-browser",
    },
  },
});
