// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.browser.shared.config.ts";
import browserMap from "@azure-tools/vite-plugin-browser-test-map";

export default mergeConfig(
  viteConfig,
  defineConfig({
    optimizeDeps: {
      include: ["buffer"],
    },
    plugins: [browserMap()],
    test: {
      fileParallelism: false,
      // browser-polyfills.ts installs the `Buffer` global the runtime
      // dependency graph expects, replacing the previous
      // `@rollup/plugin-inject` approach that hangs under Vite 8's rolldown
      // dependency optimizer. See test/browser-polyfills.ts for details.
      setupFiles: ["./test/browser-polyfills.ts"],
    },
  }),
);
