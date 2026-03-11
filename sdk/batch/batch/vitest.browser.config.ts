// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import viteConfig from "../../../vitest.browser.shared.config.ts";
import { mergeConfig } from "vitest/config";

export default mergeConfig(viteConfig, {
  optimizeDeps: {
    exclude: ["@azure/core-lro"],
  },
  test: {
    globalSetup: ["test/global-setup.ts"],
  },
});
