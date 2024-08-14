
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.shared.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      testTimeout: 300000,
      hookTimeout: 18000,
      fileParallelism: false,
      include: ["test/**/*.spec.ts"],
    },
  }),
);
