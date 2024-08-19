
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.shared.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      testTimeout: 170000,
      hookTimeout: 25000,
      fileParallelism: false,
      include: ["test/public/**/*.spec.ts"],
    },
  }),
);
