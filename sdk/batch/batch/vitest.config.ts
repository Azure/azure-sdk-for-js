// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import viteConfig from "../../../vitest.shared.config.ts";
import { mergeConfig } from "vitest/config";

export default mergeConfig(viteConfig, {
  test: {
    globalSetup: ["test/global-setup.ts"],
  },
  resolve: {
    // Force Vite to resolve @azure/core-lro from the workspace root (3.x) for all importers.
    // Without this, published devDependencies like @azure/arm-resources resolve core-lro@2.7.2
    // first, Vite caches that version, and @azure/arm-batch's `import { deserializeState }`
    // fails because deserializeState only exists in core-lro 3.x.
    dedupe: ["@azure/core-lro"],
  },
});
