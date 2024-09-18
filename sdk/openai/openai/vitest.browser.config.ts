
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
      include: ["@azure/openai", "@azure/openai/types", "buffer"],
    }, 
    plugins: [
      browserMap(),
      inject({ Buffer: ["buffer", "Buffer"], stream: ["stream", "stream"] }),
    ],
    test: {
      testTimeout: 250000,
      hookTimeout: 25000,
      fileParallelism: false,
      include: [
        "dist-test/browser/test/**/*.spec.js",
      ],
    },
  }),
);
