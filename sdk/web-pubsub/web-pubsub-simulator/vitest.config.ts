// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.shared.config.ts";


export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      testTimeout: 30000,
      hookTimeout: 10000,
      fileParallelism: false,
    },
  }),
);
