// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.browser.shared.config.ts";
import browserMap from "@azure-tools/vite-plugin-browser-test-map";
import inject from "@rollup/plugin-inject";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = mergeConfig(
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
      fileParallelism: false,
      globalSetup: [path.resolve(__dirname, "test/utils/setup.ts")],
    },
  }),
);

delete config.test.fakeTimers;

if (process.env.TEST_MODE !== "live") {
  config.test.include = ["dist-test/browser/test/internal/unit/*.spec.js"];
}

export default config;
