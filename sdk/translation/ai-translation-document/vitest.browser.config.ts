// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../eng/vitestconfigs/browser.config.ts";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globalSetup: [path.resolve(__dirname, "test/utils/setup.ts")],
      // All recorded tests are Node-only (they rely on Node stream/file APIs and
      // only have Node recordings), so they live under test/**/node/ and are
      // excluded from the browser run. Allow the (currently empty) browser suite
      // to pass instead of failing with "No test files found"; any browser test
      // added later will run automatically.
      passWithNoTests: true,
    },
  }),
);
