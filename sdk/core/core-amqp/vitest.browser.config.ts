// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import base from "../../../eng/vitestconfigs/browser.config.ts";

export default mergeConfig(
  base,
  defineConfig({
    optimizeDeps: {
      include: ["process", "buffer"],
    },
    test: {
      // Provide the `Buffer` / `process` globals expected by the runtime
      // dependency graph. See test/browser-polyfills.ts for why this replaces
      // the previous `@rollup/plugin-inject` based approach.
      setupFiles: ["./test/browser-polyfills.ts"],
    },
  }),
);
