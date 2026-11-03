// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import { relativeRecordingsPath } from "./src/index.js";
import base from "../../../vitest.browser.base.config.ts";

process.env.RECORDINGS_RELATIVE_PATH = relativeRecordingsPath();

export default mergeConfig(
  base,
  defineConfig({
    resolve: {
      conditions: ["browser"],
    },
    test: {
      include: ["test/**/*.spec.ts"],
      exclude: ["test/**/node/**"],
    },
  }),
);
