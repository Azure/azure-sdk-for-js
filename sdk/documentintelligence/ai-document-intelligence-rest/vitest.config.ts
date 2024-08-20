// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { defineConfig } from "vitest/config";
import { relativeRecordingsPath } from "@azure-tools/test-recorder";

export default defineConfig({
  test: {
    reporters: ["verbose", "basic"],
    outputFile: {
      junit: "test-results.browser.xml",
    },
    fakeTimers: {
      toFake: ["setTimeout", "Date"],
    },
    watch: false,
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
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      reportsDirectory: "coverage",
    },
    testTimeout: 1200000,
  },
});
