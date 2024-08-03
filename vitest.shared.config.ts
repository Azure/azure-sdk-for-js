// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    testTimeout: 18000,
    typecheck: {
      enabled: true,
    },
    reporters: ["verbose", "junit"],
    outputFile: {
      junit: "test-results.xml",
    },
    fakeTimers: {
      toFake: ["setTimeout", "Date"],
    },
    watch: false,
    include: ["test/**/*.spec.ts"],
    exclude: ["test/**/browser/*.spec.ts"],
    coverage: {
      enable: true,
      include: ["src/**/*.ts"],
      exclude: [
        "src/**/*-browser.mts",
        "src/**/*-react-native.mts",
        "vitest*.config.ts",
        "samples-dev/**/*.ts",
      ],
      provider: "istanbul",
      reporter: ["text", "html", "cobertura"],
      reportsDirectory: "coverage",
    },
  },
});
