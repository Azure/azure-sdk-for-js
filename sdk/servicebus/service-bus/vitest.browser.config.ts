// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.browser.shared.config.ts";
import browserMap from "@azure-tools/vite-plugin-browser-test-map";
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
    plugins: [browserMap()],
    test: {
      fileParallelism: false,
      globalSetup: [path.resolve(__dirname, "test/utils/setup.ts")],
      // browser-polyfills.ts installs the `Buffer` / `process` globals the
      // runtime dependency graph expects, replacing the previous
      // `@rollup/plugin-inject` approach that hangs under Vite 8's rolldown
      // dependency optimizer. See test/browser-polyfills.ts for details.
      setupFiles: ["./test/browser-polyfills.ts"],
    },
  }),
);

delete config.test.fakeTimers;

if (process.env.TEST_MODE !== "live") {
  config.test.include = ["dist-test/browser/test/internal/unit/*.spec.js"];
}

export default config;
