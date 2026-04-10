// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.shared.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      typecheck: {
        enabled: false,
      },
      fileParallelism: false,
      exclude: ["test/internal/unit/**/*.spec.ts"],
    },
  }),
);
