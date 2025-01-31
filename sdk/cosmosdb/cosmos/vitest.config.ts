// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.shared.config.ts";
import "dotenv/config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ["test/internal/unit/**/*.spec.ts"],
      exclude: ["test/public/**/*.spec.ts"],
      hookTimeout: 500000,
      testTimeout: 500000,
      typecheck: {
        enabled: false,
      },
    },
  }),
);
