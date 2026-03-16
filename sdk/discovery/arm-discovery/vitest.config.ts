// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.shared.config.ts";

// LRO operations (workspace, supercomputer, etc.) can take up to 2 hours during recording.
// Increase timeout for record/live modes; playback uses instant polling so 20min is fine.
const isRecordOrLive = ["record", "live"].includes(process.env.TEST_MODE ?? "");

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      testTimeout: isRecordOrLive ? 7_200_000 : undefined, // 2 hours for record/live
      hookTimeout: isRecordOrLive ? 7_200_000 : undefined,
    },
  }),
);
