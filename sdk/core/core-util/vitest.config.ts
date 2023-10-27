// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    reporters: ["basic", "junit"],
    outputFile: {
      junit: "test-results.browser.xml",
    },
    watch: false,
    include: ["test/**/*.spec.ts"],
    exclude: ["test/**/browser/*.spec.ts"],
  },
});
