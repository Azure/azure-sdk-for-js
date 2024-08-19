
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.browser.shared.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    optimizeDeps: {
      include: ["@azure/openai", "@azure/openai/types"],
    },
    test: {
      testTimeout: 170000,
      hookTimeout: 25000,
      fileParallelism: false,
      include: [
        "dist-test/browser/test/**/*.spec.js",
      ],
    },
  }),
);
