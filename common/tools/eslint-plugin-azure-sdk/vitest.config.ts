// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig } from "vitest/config";
import { AzureSDKReporter } from "../../../vitest.shared.config.js";

export default defineConfig({
  test: {
    reporters: [new AzureSDKReporter(), "junit"],
    outputFile: {
      junit: "test-results.xml",
    },
    fakeTimers: {
      toFake: ["setTimeout", "Date"],
    },
    watch: false,
    include: ["tests/**/*.ts"],
    exclude: ["tests/ruleTester.ts", "tests/fixture/**"],
    testTimeout: 10000,
    coverage: {
      include: ["src/**/*.ts"],
      exclude: ["vitest*.config.ts", "tests/fixture/**"],
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      reportsDirectory: "coverage",
    },
  },
});
