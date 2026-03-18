// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import viteConfig from "../../../vitest.shared.config.ts";
import { mergeConfig } from "vitest/config";

export default mergeConfig(viteConfig, {
  test: {
    globalSetup: ["test/global-setup.ts"],
  },
});
