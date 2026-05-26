// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../eng/vitestconfigs/browser.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    optimizeDeps: {
      // Prevent Vite from pre-bundling @azure/core-lro into a single shared chunk.
      // Without this, Vite caches the first resolution (2.x from the older
      // @azure/arm-network / @azure/arm-storage / @azure/arm-authorization /
      // @azure/arm-resources devDeps used by the cross-sub scenario tests) and
      // serves it to all importers, including arm-storagemover's own code which
      // requires the workspace 3.x version (which dropped the `deserializeState`
      // export). Mirrors the pattern used by sdk/batch/arm-batch.
      exclude: ["@azure/core-lro"],
      include: [
        "@azure/arm-authorization > @azure/core-lro",
        "@azure/arm-network > @azure/core-lro",
        "@azure/arm-resources > @azure/core-lro",
        "@azure/arm-storage > @azure/core-lro",
      ],
    },
  }),
);
