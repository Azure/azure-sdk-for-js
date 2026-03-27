// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.shared.config.ts";

const isPreview = process.env.TEST_PREVIEW === "true";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      exclude: isPreview
        ? ["test/**/browser/*.spec.ts", "test/snippets.spec.ts", "test/integration/**/*.spec.ts", "test/stress/**/*.ts"]
        : ["test/**/browser/*.spec.ts", "test/snippets.spec.ts", "test/integration/**/*.spec.ts", "test/stress/**/*.ts", "test/**/preview/**/*.spec.ts"],
    },
  }),
);
