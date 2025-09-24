// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import path from "node:path";
import fs from "node:fs";
import { defineConfig } from "vitest/config";
import browserMap from "@azure-tools/vite-plugin-browser-test-map";
import { AzureSDKReporter, makeAliases } from "./vitest.shared.config.js";

function makeBrowserAliases(rootDir: string) {
  return makeAliases(rootDir, { distDir: `./dist/browser`, indexFile: `index.js` });
}

const maybeGlobalSetup = (() => {
  const setupPath = path.resolve(process.cwd(), "test/utils/setup.ts");
  return fs.existsSync(setupPath) ? [setupPath] : undefined;
})();

export default defineConfig({
  define: {
    "process.env": process.env,
  },
  test: {
    testTimeout: 1200000,
    hookTimeout: 1200000,
    globalSetup: maybeGlobalSetup,
    reporters: [new AzureSDKReporter(), "junit"],
    outputFile: {
      junit: "test-results.browser.xml",
    },
    include: ["dist-test/**/*.spec.js"],
    exclude: [
      "test-dist/**/node/*.spec.js",
      "test-dist/snippets.spec.js",
      "test-dist/integration/**/*.spec.js",
      "test-dist/stress/**/*.js",
    ],
    browser: {
      instances: [
        {
          browser: "chromium",
          launch: {
            args: ["--disable-web-security"],
          },
        },
      ],
      enabled: true,
      headless: true,
      provider: "playwright",
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
      reporter: ["text", "json", "html"],
      reportsDirectory: "coverage-browser",
    },
  },
});
