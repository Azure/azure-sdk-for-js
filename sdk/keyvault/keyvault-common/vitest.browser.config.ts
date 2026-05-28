// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import base from "../../../eng/vitestconfigs/browser.config.ts";

export default mergeConfig(
  base,
  defineConfig({
    test: {
      exclude: ["test/**/node/**", "test/**/react-native/**", "test/snippets.spec.ts"],
    },
  }),
);
