// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import base from "../../../vitest.browser.base.config.ts";

export default mergeConfig(
  base,
  defineConfig({
    resolve: {
      conditions: ["browser"],
    },
    test: {
      fileParallelism: false,
      include: ["test/internal/**/*.spec.ts", "test/public/**/*.spec.ts"],
      globalSetup: ["test/public/common/globalSetup.ts"],
      exclude: ["test/**/node/**", "test/**/react-native/**", "test/snippets.spec.ts"],
    },
  }),
);
