// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig } from "vitest/config";
import { AzureSDKReporter, makeAliases, packageNameFrom } from "../../../vitest.shared.config.ts";

export default defineConfig({
  test: {
    testTimeout: 120000,
    hookTimeout: 120000,
    reporters: [new AzureSDKReporter(), "junit"],
    outputFile: {
      junit: "test-results.integration.xml",
    },
    watch: false,
    include: ["test/integration/**/*.spec.ts"],
    exclude: ["test/**/browser/*.spec.ts", "test/snippets.spec.ts", "test/stress/**/*.ts"],
    alias: [
      ...makeAliases(process.cwd(), {
        distDir: "./src",
        indexFile: "index.ts",
        packageName: packageNameFrom(process.cwd()),
      }),
    ],
    fakeTimers: {
      toFake: [],
    },
    coverage: {
      enabled: false,
    },
  },
});
