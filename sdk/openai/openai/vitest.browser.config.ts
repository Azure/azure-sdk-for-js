
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.browser.shared.config.ts";
import { resolve } from "node:path";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      testTimeout: 500000,
      hookTimeout: 25000,
      fileParallelism: false,
      globalSetup: [resolve(__dirname, "test/utils/setup.ts")],
      setupFiles: [resolve(__dirname, "test/utils/logging.ts")],
      include: [
        "dist-test/browser/test/**/*.spec.js",
      ],
    },
  }),
);
