// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.browser.shared.config.ts";
import { resolve } from "node:path";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ["dist-test/browser/test/**/*.spec.js"],
      alias: [
        {
          find: "@azure/identity",
          replacement: resolve("./dist/browser/index.js"),
        },
        {
          find: /^\$internal\/(.*)$/,
          replacement: resolve("./dist/browser/$1"),
        },
      ],
      hookTimeout: 500000,
      testTimeout: 500000,
    },
  }),
);
