// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.shared.config.ts";
import "dotenv/config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      outputFile: {
        junit: "test-results-int.xml",
      },
      hookTimeout: 500000,
      testTimeout: 500000,
      typecheck: {
        enabled: false,
      },
    },
  }),
);
