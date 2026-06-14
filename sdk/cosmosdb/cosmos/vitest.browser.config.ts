// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import base from "../../../eng/vitestconfigs/browser.config.ts";

export default mergeConfig(
  base,
  defineConfig({
    test: {
      fileParallelism: false,
      globalSetup: ["test/public/common/globalSetup.ts"],
    },
  }),
);
