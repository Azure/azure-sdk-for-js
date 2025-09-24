// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import { fileURLToPath } from "node:url";
import path from "node:path";
import viteConfig from "../../../vitest.shared.config.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globalSetup: [path.resolve(__dirname, "test/utils/globalSetup.ts")],
    },
  })
);
