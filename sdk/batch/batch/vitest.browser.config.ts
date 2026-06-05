// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import viteConfig from "../../../vitest.browser.shared.config.ts";
import { defineConfig, mergeConfig } from "vitest/config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    optimizeDeps: {
      exclude: ["@azure/core-lro"],
    },
    test: {
      globalSetup: ["test/global-setup.ts"],
      server: {
        deps: {
          inline: [/@azure\/core-lro/],
        },
      },
    },
  }),
);
