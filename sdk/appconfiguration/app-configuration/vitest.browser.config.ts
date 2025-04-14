
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.browser.shared.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      fileParallelism: false,
      testTimeout: 60000,
      include: [
        "dist-test/browser/test/**/*.spec.js",
      ],
    },
  }),
);
