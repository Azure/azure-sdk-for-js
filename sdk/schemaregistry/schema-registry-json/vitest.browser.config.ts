// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.browser.shared.config.ts";
import browserMap from "@azure-tools/vite-plugin-browser-test-map";
import inject from "@rollup/plugin-inject";

export default mergeConfig(
  viteConfig,
  defineConfig({
    optimizeDeps: {
      include: ["buffer"],
    },
    plugins: [browserMap(), inject({ Buffer: ["buffer", "Buffer"] })],
    test: {
      include: ["dist-test/browser/test/**/*.spec.js"],
      hookTimeout: 5000000,
      testTimeout: 5000000,
    },
  }),
);
