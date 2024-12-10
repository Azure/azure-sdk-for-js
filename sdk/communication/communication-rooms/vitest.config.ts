// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.shared.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ["test/**/*.spec.ts"],
      hookTimeout: 5000000,
      testTimeout: 5000000,
      typecheck: {
        enabled: true,
        tsconfig: "tsconfig.test.json",
        include: ["test/**/*.ts", "test/**/*.mts", "test/**/*.cts"],
      }
    },
  }),
);
