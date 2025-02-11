// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.browser.base.config.ts";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ["dist-test/browser/test/**/*.spec.js"],
      globalSetup: [path.resolve(__dirname, "test/utils/server/start.mts")],
    },
  }),
);
