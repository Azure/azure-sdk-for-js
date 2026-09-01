// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.shared.config.ts";
import { fileURLToPath } from "url";

viteConfig.test.alias?.unshift({
  find: "@azure/storage-blob/package.json",
  replacement: fileURLToPath(import.meta.resolve("@azure/storage-blob/package.json")),
});

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {},
  }),
);
