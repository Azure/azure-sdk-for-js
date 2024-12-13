// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.shared.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      typecheck: {
        enabled: true,
        tsconfig: "tsconfig.test.json",
        include: ["test/**/*.ts", "test/**/*.mts", "test/**/*.cts"],
      },
      testTimeout: 600000,
      hookTimeout: 60000,
      fileParallelism: false,
      include: ["test/**/*.spec.ts"],
      exclude: ["./node_modules/**/*"],
    },
  })
);
