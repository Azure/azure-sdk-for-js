// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { defineConfig, mergeConfig } from "vitest/config";
import { relativeRecordingsPath } from "@azure-tools/test-recorder";
import viteConfig from "./vitest.base.config.ts";

process.env.RECORDINGS_RELATIVE_PATH = relativeRecordingsPath();

export default mergeConfig(
  viteConfig,
  defineConfig({
    optimizeDeps: {
      include: ["@azure-tools/test-recorder"],
    },
  }),
);
