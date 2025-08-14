// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.browser.shared.config.ts";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      fileParallelism: false,
      globalSetup: [resolve(__dirname, "test/utils/setup.ts")],
      setupFiles: [resolve(__dirname, "test/utils/logging.ts")],
    },
  }),
);
