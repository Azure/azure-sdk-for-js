// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import viteConfig from "../../../vitest.browser.shared.config.ts";
import { defineConfig, mergeConfig } from "vitest/config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    optimizeDeps: {
      include: [
        "node-forge/lib/forge.js",
        "node-forge/lib/asn1.js",
        "node-forge/lib/rsa.js",
        "node-forge/lib/sha256.js",
      ],
    },
  }),
);
