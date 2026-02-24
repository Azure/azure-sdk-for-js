// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.shared.config.ts";
import { makeAliases } from "../../../vitest.shared.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      typecheck: {
        enabled: false,
      },
      fileParallelism: false,
      exclude: [
        "test/internal/**/*.spec.ts",
        "test/public/common/**/*.spec.ts",
        "test/public/functional/**/*.spec.ts",
        "test/public/integration/**/*.spec.ts",
        "test/snippets.spec.ts",
      ],
      alias: [
        ...makeAliases(process.cwd(), {
          distDir: "./dist/react-native",
          indexFile: "index.js",
        }),
      ],
    },
  }),
);
