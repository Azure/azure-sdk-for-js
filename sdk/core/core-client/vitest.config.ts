// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import vitestConfig from "../../../vitest.shared.config.ts";
import { defineConfig, mergeConfig } from "vitest/config";
import { resolve } from "node:path";

export default mergeConfig(
  vitestConfig,
  defineConfig({
    test: {
      alias: {
        "../commonjs/state.js": resolve("./src/state-cjs.cts"),
      },
    }
  })
);
