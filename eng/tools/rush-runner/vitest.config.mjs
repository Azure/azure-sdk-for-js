// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    testTimeout: 18000,
    reporters: ["verbose"],
    watch: false,
    include: ["test/**/*.spec.js"],
    coverage: {
      include: ["index.js"],
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      reportsDirectory: "coverage",
    },
  },
});
