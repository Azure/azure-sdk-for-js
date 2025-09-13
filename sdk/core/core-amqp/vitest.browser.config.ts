// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.browser.base.config.ts";
import browserMap from "@azure-tools/vite-plugin-browser-test-map";
import inject from "@rollup/plugin-inject";

export default mergeConfig(
  viteConfig,
  defineConfig({
    optimizeDeps: {
      include: ["process", "buffer"],
    },
    plugins: [browserMap(), inject({ process: "process", Buffer: ["buffer", "Buffer"] })],
  }),
);
