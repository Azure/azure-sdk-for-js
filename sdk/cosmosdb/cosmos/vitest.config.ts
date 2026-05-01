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
      include: ["test/internal/**/*.spec.ts", "test/public/**/*.spec.ts"],
      exclude: ["test/**/browser/**", "test/**/react-native/**", "test/snippets.spec.ts"],
      globalSetup: ["test/public/common/globalSetup.ts"],
    },
  }),
);
