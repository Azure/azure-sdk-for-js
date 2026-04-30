// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import viteConfig from "../../../vitest.browser.shared.config.ts";
import { defineConfig, mergeConfig } from "vitest/config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    optimizeDeps: {
      // Prevent Vite from pre-bundling @azure/core-lro into a single shared chunk.
      // Without this, Vite caches the first resolution (2.x from @azure/arm-storage
      // or @azure/arm-resources devDeps) and serves it to all importers, including
      // arm-batch's own code which requires the workspace 3.x version.
      exclude: ["@azure/core-lro"],
      include: [
        "@azure/arm-resources > @azure/core-lro",
        "@azure/arm-storage > @azure/core-lro",
      ],
    },
  }),
);
