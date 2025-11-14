// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.browser.shared.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      browser: {
        api: {
          host: '127.0.0.1',
          port: 54322,
        },
      },
    },
    optimizeDeps: {
      exclude: ["@azure/core-lro"],
    },
  }),
);
