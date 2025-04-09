// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.shared.config.js";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import MatrixReporter from "./test/utils/matrixReporter.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      testTimeout: 500000,
      hookTimeout: 25000,
      fileParallelism: false,
      globalSetup: [resolve(__dirname, "test/utils/setup.ts")],
      reporters: [new MatrixReporter()]
    },
  }),
);
