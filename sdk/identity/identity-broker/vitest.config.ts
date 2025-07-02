// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import { fileURLToPath } from "url";
import path from "node:path";
import viteConfig from "../../../vitest.shared.config.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      setupFiles: [path.resolve(__dirname, "test/utils/setup.ts")],
    },
  })
);
