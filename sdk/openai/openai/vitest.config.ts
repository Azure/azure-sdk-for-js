
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.shared.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      testTimeout: 250000,
      hookTimeout: 25000,
      fileParallelism: false,
      include: ["test/public/**/*.spec.ts"],
      typecheck: {
        enabled: true,
        tsconfig: "tsconfig.tests.json",
        include: ["test/**/*.ts", "test/**/*.mts", "test/**/*.cts"]
      }
    },
  }),
);
