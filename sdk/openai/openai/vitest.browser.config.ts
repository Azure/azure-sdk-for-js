
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.browser.shared.config.ts";
import { resolve } from "node:path";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      testTimeout: 250000,
      hookTimeout: 25000,
      fileParallelism: false,
      setupFiles: ["./test/public/utils/logging.ts"],
      include: [
        "dist-test/browser/test/**/*.spec.js",
      ],
      alias: {
        "@azure/openai/types": resolve("./dist/browser/types/index.js"),
        "@azure/openai": resolve("./dist/browser/index.js"),
        "../../dist/esm": resolve("./dist/browser"),
      },
    },
  }),
);
