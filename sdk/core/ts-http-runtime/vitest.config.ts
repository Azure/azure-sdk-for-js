// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.shared.config.ts";
import { resolve } from "node:path";

// Put subpath aliases BEFORE the shared config aliases so the more-specific
// paths match before the package root alias does.
export default mergeConfig(
  defineConfig({
    resolve: {
      alias: [
        {
          find: "@typespec/ts-http-runtime/internal/policies",
          replacement: resolve(import.meta.dirname, "src/policies/internal.ts"),
        },
        {
          find: "@typespec/ts-http-runtime/internal/util",
          replacement: resolve(import.meta.dirname, "src/util/internal.ts"),
        },
        {
          find: "@typespec/ts-http-runtime/internal/logger",
          replacement: resolve(import.meta.dirname, "src/logger/internal.ts"),
        },
      ],
    },
  }),
  viteConfig,
);
