
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.browser.shared.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    optimizeDeps: {
      include: ["@azure/openai", "@azure/openai/types"],
    },
    test: {
      testTimeout: 250000,
      hookTimeout: 25000,
      fileParallelism: false,
      include: [
        "dist-test/browser/test/**/*.spec.js",
      ],
    },
  }),
);
