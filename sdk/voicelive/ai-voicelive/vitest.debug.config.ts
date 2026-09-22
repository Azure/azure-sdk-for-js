// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig } from "vitest/config";
import config from "./vitest.config.ts";

export default defineConfig({
  ...config,
  test: {
    ...config.test,
    // Enable verbose reporting
    reporter: ["verbose", "junit"],
    // Show console.log statements
    silent: false,
    // Increase test timeout for debugging
    testTimeout: 60000,
    // Enable coverage for debugging
    coverage: {
      enabled: true,
      reporter: ["text", "html"],
    },
    // Environment variables for debugging
    env: {
      ...config.test?.env,
      AZURE_LOG_LEVEL: "verbose",
      DEBUG: "azure:ai-voicelive:*",
    },
  },
});