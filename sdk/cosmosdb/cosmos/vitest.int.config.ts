// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import viteConfig from "../../../vitest.shared.config.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      typecheck: {
        enabled: false,
      },
      fileParallelism: false,
      globalSetup: [resolve(__dirname, "test/public/common/globalSetup.ts")],
      exclude: ["test/internal/unit/**/*.spec.ts"],
    },
  }),
);
