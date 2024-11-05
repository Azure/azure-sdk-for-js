// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.shared.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      fileParallelism: false,
      testTimeout: 30000,
      typecheck: {
        enabled: true,
      },
      globalSetup: "test/server/start.mts",
      include: ["test/**/*.spec.ts"],
      exclude: ["test/snippets.spec.ts"],
    },
  }),
);
