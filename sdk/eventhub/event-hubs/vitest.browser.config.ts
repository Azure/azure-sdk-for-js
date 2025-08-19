// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.shared.config.js";
import browserMap from "@azure-tools/vite-plugin-browser-test-map";
import inject from "@rollup/plugin-inject";

export default mergeConfig(
  viteConfig,
  defineConfig({
    optimizeDeps: {
      include: ["process", "buffer"],
    },
    plugins: [
      browserMap(),
      inject({ process: "process", Buffer: ["buffer", "Buffer"], stream: ["stream", "stream"] }),
    ],
    test: {
      testTimeout: 6000000,
      hookTimeout: 6000000,
      fileParallelism: false,
      globalSetup: ["./test/utils/setup.ts"],
      setupFiles: ["./test/utils/logging.ts"],
    },
  })
);
