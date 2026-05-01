// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import base from "../../../vitest.browser.base.config.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default mergeConfig(
  base,
  defineConfig({
    resolve: {
      conditions: ["browser"],
    },
    test: {
      fileParallelism: false,
      globalSetup: [resolve(__dirname, "test/public/common/globalSetup.browser.ts")],
      include: ["test/public/functional/clientSideEncryption.spec.ts"],
      exclude: ["test/**/node/**"],
    },
  }),
);
