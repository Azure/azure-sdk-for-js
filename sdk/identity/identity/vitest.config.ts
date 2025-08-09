// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.shared.config.ts";

import { makeNodeAliases } from "../../../vitest.shared.config.ts";
const __dirname = dirname(fileURLToPath(import.meta.url));

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      hookTimeout: 500000,
      testTimeout: 500000,
      alias: [...makeNodeAliases(__dirname)],
      typecheck: {
        enabled: false,
      },
    },
  }),
);
