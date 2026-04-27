// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import base from "../../../eng/vitestconfigs/browser.config.ts";
import inject from "@rollup/plugin-inject";

export default mergeConfig(
  base,
  defineConfig({
    optimizeDeps: {
      include: ["process", "buffer"],
    },
    plugins: [inject({ process: "process", Buffer: ["buffer", "Buffer"] })],
  }),
);
