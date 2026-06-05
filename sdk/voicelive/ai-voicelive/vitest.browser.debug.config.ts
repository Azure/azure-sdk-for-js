// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import "dotenv/config";
import { defineConfig, mergeConfig } from "vitest/config";
import { relativeRecordingsPath } from "@azure-tools/test-recorder";
import base from "../../../vitest.browser.base.config.ts";

process.env.RECORDINGS_RELATIVE_PATH = relativeRecordingsPath();

export default mergeConfig(
  base,
  defineConfig({
    optimizeDeps: {
      include: ["@azure-tools/test-recorder"],
      // @azure/core-lro must be excluded from Vite's dependency optimization
      // because it's a workspace dependency that Vite cannot properly pre-bundle.
      exclude: ["@azure/core-lro"],
    },
    test: {
      // Enable verbose reporting for debugging
      reporter: ["verbose", "junit"],
      // Show console.log statements
      silent: false,
      // Increase test timeout for debugging
      testTimeout: 60000,
      // Environment variables for debugging
      env: {
        AZURE_LOG_LEVEL: "verbose",
        DEBUG: "azure:ai-voicelive:*",
      },
    },
  }),
);