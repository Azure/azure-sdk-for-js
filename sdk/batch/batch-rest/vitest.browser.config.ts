// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../eng/vitestconfigs/browser.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globalSetup: ["test/global-setup.ts"],
    },
    optimizeDeps: {
      // Exclude the bare specifier so Vite doesn't flatten it
      exclude: ["@azure/core-lro"],
      // Explicitly include both resolved paths so each gets its own pre-bundle chunk
      include: [
        // v2
        "@azure/arm-authorization > @azure/core-lro",
        "@azure/arm-batch > @azure/core-lro",
        "@azure/arm-compute > @azure/core-lro",
        "@azure/arm-resources > @azure/core-lro",
        "@azure/keyvault-keys > @azure/core-lro",
        // v3
        "@azure/arm-keyvault > @azure/core-lro",
      ],
    },
  }),
);
