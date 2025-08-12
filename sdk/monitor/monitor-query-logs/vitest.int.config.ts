// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.shared.config.js";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      testTimeout: 1200000,
      hookTimeout: 1200000,
      include: ["test/internal/**/*.spec.ts", "test/public/**/*.spec.ts"],
      exclude: ["test/snippets.spec.ts"],
    },
  }),
);
