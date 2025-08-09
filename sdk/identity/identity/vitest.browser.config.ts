// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.browser.shared.config.ts";
import { makeBrowserAliases } from "../../../vitest.shared.config.ts";

// Use shared helper to create standard aliases for browser build

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ["dist-test/browser/test/**/*.spec.js"],
      alias: [...makeBrowserAliases(process.cwd())],
      hookTimeout: 500000,
      testTimeout: 500000,
    },
  }),
);
