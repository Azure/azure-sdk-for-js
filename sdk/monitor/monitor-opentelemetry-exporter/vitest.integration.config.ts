
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.shared.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      testTimeout: 600000,
      exclude: ["test/internal/{,!(functional)/**/}*.spec.ts", "test/public/**/*.spec.ts"],
      typecheck: {
        enabled: false,
      },
    },
  }),
);
