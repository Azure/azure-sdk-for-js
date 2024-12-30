// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.browser.base.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ["dist-test/browser/test/internal/unit/**/*.spec.js"],
      exclude: [
        "dist-test/browser/test/public/**/*.spec.js",
        "dist-test/browser/test/internal/session.spec.js",
        "dist-test/browser/test/internal/unit/client.spec.js",
      ],
    },
  }),
);
