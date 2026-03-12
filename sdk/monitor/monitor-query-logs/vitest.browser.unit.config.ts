// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.browser.shared.config.js";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      exclude: ["dist-test/browser/test/internal/{,!(unit)/**/}*.spec.js", "dist-test/browser/test/public/**/*.spec.js"],
      typecheck: {
        enabled: false,
      },
    },
  }),
);
