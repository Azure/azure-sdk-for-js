// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.shared.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      testTimeout: 600000,
      hookTimeout: 60000,
      fileParallelism: false,
      exclude: ["test/internal/connectionManagement.spec.ts"],
      fakeTimers: {
        toFake: [
          "setTimeout",
          "clearTimeout",
          "setImmediate",
          "clearImmediate",
          "setInterval",
          "clearInterval",
          "Date",
        ],
      },
      typecheck: {
        enabled: false,
      },
    },
  }),
);
