// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig } from "vitest/config";
import { AzureSDKReporter, makeAliases } from "../../../vitest.shared.config.ts";
import { resolve } from "node:path";
import { readFileSync } from "node:fs";

function packageNameFrom(rootDir: string): string {
  const pkgJsonPath = resolve(rootDir, "package.json");
  const pkg = JSON.parse(readFileSync(pkgJsonPath, "utf-8"));
  return pkg.name as string;
}

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

