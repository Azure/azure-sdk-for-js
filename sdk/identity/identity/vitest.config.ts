// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.shared.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      hookTimeout: 500000,
      testTimeout: 500000,
      typecheck: {
        exclude: ["test/manual-integration/**/*.ts", "test/manual/**/*.ts"]
      }
    },
  }),
);
