// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.browser.shared.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ["dist-test/browser/test/**/*.spec.js"],
      exclude: ["dist-test/browser/test/snippets.spec.js"],
      hookTimeout: 500000,
      testTimeout: 500000,
    },
  }),
);
