// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.shared.config.ts";
import { resolve } from "node:path";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      alias: {
        "../commonjs/state.js": resolve("./src/state-cjs.cts"),
      },
      include: ["test/**/*.spec.ts"],
      exclude: ["test/**/browser/*.spec.ts"],
    },
  }),
);
