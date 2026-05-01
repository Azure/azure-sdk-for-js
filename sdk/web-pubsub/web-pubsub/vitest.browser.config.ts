// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../eng/vitestconfigs/browser.config.ts";
import { relativeRecordingsPath } from "@azure-tools/test-recorder";
import { fileURLToPath } from "node:url";
import path from "node:path";

process.env.RECORDINGS_RELATIVE_PATH = relativeRecordingsPath();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globalSetup: [path.resolve(__dirname, "test/utils/setup.ts")],
    },
    optimizeDeps: {
      include: ["@azure-tools/test-recorder"],
    },
  }),
);
