// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

export default defineConfig({
  test: {
    reporters: ["basic", "junit"],
    outputFile: {
      junit: "test-results.xml",
    },
    fakeTimers: {
      toFake: ["setTimeout", "Date"],
    },
    watch: false,
    alias: {
      "../commonjs/state.js": resolve("./src/state-cjs.cts"),
    },
    include: ["test/**/*.spec.ts"],
    exclude: ["test/**/browser/*.spec.ts"],
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
      reportsDirectory: "coverage",
    },
  },
});
