// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.shared.config.ts";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      fileParallelism: false,
      testTimeout: 30000,
      globalSetup: [path.resolve(__dirname, "test/utils/server/start.mts")],
    },
  }),
);
