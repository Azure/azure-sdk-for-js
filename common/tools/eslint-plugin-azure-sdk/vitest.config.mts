// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import vitestConfig from "../../../vitest.shared.config.ts";
import { defineConfig, mergeConfig } from "vitest/config";
import { resolve } from "node:path";

export default mergeConfig(
  vitestConfig,
  defineConfig({
    test: {
      include: ["tests/**/*.ts"],
      exclude: ["tests/ruleTester.ts", "tests/fixture/**"],
      coverage: {
        include: ["src/**/*.ts"],
        exclude: ["vitest*.config.ts", "tests/fixture/**"],
      },
    },
  })
);
