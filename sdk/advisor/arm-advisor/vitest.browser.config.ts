// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import browserConfig from "../../../eng/vitestconfigs/browser.config.ts";

export default mergeConfig(
  browserConfig,
  defineConfig({
    test: {
      passWithNoTests: true,
    },
  }),
);
