// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.shared.config.ts";

const mergedConfig = mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      hookTimeout: 500000,
      testTimeout: 500000,
    },
  }),
);

const config = {
  ...mergedConfig,
  test: {
    ...mergedConfig.test,
    include: ["test/integration/**/*.spec.ts"],
        exclude: [
          "test/**/browser/*.spec.ts",
          "test/snippets.spec.ts",
          "test/stress/**/*.ts",
        ],
  },
};

console.log("vitest.managed-identity.config.ts", config);
export default config;
