// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.shared.config.ts";
import { resolve } from "node:path";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      alias: [
        {
          find: "../commonjs/state.js",
          replacement: resolve("./src/state-cjs.cts"),
        },
      ],
    },
  }),
);
