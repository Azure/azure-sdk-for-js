// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.shared.config.js";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ["test/internal/**/*.unittest.spec.ts"],
      exclude: ["test/snippets.spec.ts"],
    },
  }),
);
