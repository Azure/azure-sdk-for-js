// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import viteConfig from "../../../vitest.shared.config.ts";
import { fileURLToPath } from "node:url";

viteConfig.test.alias?.unshift({
  find: "@azure/storage-blob/package.json",
  replacement: fileURLToPath(import.meta.resolve("@azure/storage-blob/package.json")),
});

export default viteConfig;
