// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import "dotenv/config";
import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.browser.shared.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    optimizeDeps: {
      // @azure/core-lro must be excluded from Vite's dependency optimization
      // because it's a workspace dependency that Vite cannot properly pre-bundle.
      // This is required when tests import @azure/ai-projects which uses core-lro.
      exclude: ["@azure/core-lro"],
    },
  }),
);
