// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.browser.base.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ["dist-test/browser/**/*.spec.js"],
    },
  }),
);
