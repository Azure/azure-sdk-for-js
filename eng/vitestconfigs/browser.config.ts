// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import base from "../../vitest.browser.base.config.ts";

// Set recordings path if test-recorder is available (for packages with recorded tests)
try {
  const { relativeRecordingsPath } = await import("@azure-tools/test-recorder");
  process.env.RECORDINGS_RELATIVE_PATH = relativeRecordingsPath();
} catch {
  // Package doesn't use test-recorder, skip setting recordings path
}

export default mergeConfig(
  base,
  defineConfig({
    resolve: {
      conditions: ["browser"],
    },
    test: {
      include: ["test/**/*.spec.ts"],
      exclude: ["test/**/node/**", "test/**/react-native/**", "test/snippets.spec.ts"],
    },
  }),
);
