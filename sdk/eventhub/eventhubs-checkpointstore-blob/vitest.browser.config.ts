// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.browser.shared.config.ts";
import browserMap from "@azure-tools/vite-plugin-browser-test-map";
import { relativeRecordingsPath } from "@azure-tools/test-recorder";
import { resolve } from "node:path";

process.env.RECORDINGS_RELATIVE_PATH = relativeRecordingsPath();

export default mergeConfig(
  viteConfig,
  defineConfig({
    optimizeDeps: {
      include: ["@azure-tools/test-recorder", "process", "buffer", "stream"],
    },
    plugins: [browserMap()],
    test: {
      fileParallelism: false,
      // browser-polyfills.ts installs the `Buffer` / `process` globals the
      // runtime dependency graph expects, replacing the previous
      // `@rollup/plugin-inject` approach that hangs under Vite 8's rolldown
      // dependency optimizer. See test/browser-polyfills.ts for details.
      setupFiles: [
        "./test/browser-polyfills.ts",
        ...(!process.env["AZURE_LOG_LEVEL"] ? [] : ["./test/activate-browser-logging.ts"]),
      ],
    },
  })
);
