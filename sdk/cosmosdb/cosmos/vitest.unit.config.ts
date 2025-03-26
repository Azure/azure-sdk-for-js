// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.shared.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      testTimeout: 1200000,
      hookTimeout: 1200000,
      typecheck: {
        enabled: false,
      },
      fileParallelism: false,
      include: ["test/internal/unit/**/*.spec.ts"],
      exclude: ["test/public/**/*.spec.ts"],
    },
  }),
);
