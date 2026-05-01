// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import base from "../../../vitest.browser.base.config.ts";

export default mergeConfig(
  base,
  defineConfig({
    resolve: {
      conditions: ["browser"],
    },
    test: {
      fileParallelism: false,
      include: ["test/public/functional/clientSideEncryption.spec.ts"],
      exclude: ["test/**/node/**"],
    },
  }),
);
