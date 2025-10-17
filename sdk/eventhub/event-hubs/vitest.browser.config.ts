// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.shared.config.js";
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
      testTimeout: 6000000,
      hookTimeout: 6000000,
      fileParallelism: false,
      globalSetup: [path.resolve(__dirname, "test/utils/setup.ts")],
    },
  }),
);

const unitTests = [
  "dist-test/browser/test/internal/impl/awaitableQueue.spec.js",
  "dist-test/browser/test/internal/impl/partitionGate.spec.js",
  "dist-test/browser/test/internal/amqp.spec.js",
  "dist-test/browser/test/internal/error.spec.js",
  "dist-test/browser/test/internal/eventdata.spec.js",
];

if (process.env.TEST_MODE !== "live") {
  // only run a couple of unit tests for browser if it's not live mode
  config.test.include = unitTests;
}

export default config;
