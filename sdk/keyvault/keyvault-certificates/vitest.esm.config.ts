// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import vitestConfig from "./vitest.config.ts";
import vitestEsmConfig from "../../../vitest.esm.shared.config.ts";

export default mergeConfig(
  mergeConfig(
    vitestConfig,
    vitestEsmConfig,
  ),
  defineConfig({
    test: {
      testTimeout: 350000,
      hookTimeout: 100000,
    },
  }),
);
