// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import { relativeRecordingsPath } from "@azure-tools/test-recorder";
import base from "./vitest.browser.base.config.ts";

process.env.RECORDINGS_RELATIVE_PATH = relativeRecordingsPath();

export default mergeConfig(
  base,
  defineConfig({
    optimizeDeps: {
      include: ["@azure-tools/test-recorder"],
    },
  }),
);
