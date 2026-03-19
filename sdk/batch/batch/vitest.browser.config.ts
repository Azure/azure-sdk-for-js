// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import viteConfig from "../../../vitest.browser.shared.config.ts";
import { defineConfig, mergeConfig } from "vitest/config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globalSetup: ["test/global-setup.ts"],
      // Exclude byos.spec from browser tests due to @azure/core-lro version conflict:
      // @azure/arm-keyvault requires core-lro v3 (has deserializeState), while
      // @azure/keyvault-keys requires core-lro v2 (no deserializeState).
      // Vite pre-bundles only one version, causing import failures in browser.
      // Node tests handle this correctly via pnpm's isolated dependency resolution.
      exclude: ["**/byos.spec.*"],
    },
    optimizeDeps: {
      exclude: ["@azure/core-lro"],
    },
  }),
);
