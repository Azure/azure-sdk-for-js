// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { resolve } from "node:path";
import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.browser.base.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      alias: [
        {
          find: "@azure/core-sse",
          replacement: resolve("./dist/browser/index.js"),
        },
        {
          find: /^internal\/(.*)$/,
          replacement: resolve("./dist/browser/$1"),
        },
      ],
      include: ["dist-test/browser/test/**/*.spec.js"],
    },
  }),
);
