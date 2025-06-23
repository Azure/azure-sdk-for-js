// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig } from "vitest/config";
import { AzureSDKReporter } from "../../../vitest.shared.config.js";

export default defineConfig({
  test: {
    testTimeout: 18000,
    reporters: [new AzureSDKReporter()],
    watch: false,
    include: ["test/**/*.spec.js"],
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      reportsDirectory: "coverage",
    },
  },
});
