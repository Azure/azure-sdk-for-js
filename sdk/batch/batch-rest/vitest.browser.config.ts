// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import viteConfig from "../../../vitest.browser.shared.config.ts";

import { mergeConfig } from "vitest/config";

export default mergeConfig(viteConfig, {
  test: {
    setupFiles: ["test/setup.ts"],
  },
});
