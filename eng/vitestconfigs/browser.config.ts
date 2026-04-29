// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import base from "../../vitest.browser.base.config.ts";

export default mergeConfig(
  base,
  defineConfig({
    resolve: {
      conditions: ["browser"],
    },
    test: {
      include: ["test/**/*.spec.ts"],
      exclude: ["test/**/node/**", "test/**/react-native/**", "test/snippets.spec.ts"],
    },
  }),
);
