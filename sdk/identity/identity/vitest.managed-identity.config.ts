// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.shared.config.ts";

const config = mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ["test/integration/**/*.spec.ts"],
      hookTimeout: 500000,
      testTimeout: 500000,
    },
  }),
);

console.log("vitest.managed-identity.config.ts", config);
export default config;
