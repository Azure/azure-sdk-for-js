// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig } from "vitest/config";
import { resolve } from "node:path";
import { readFileSync } from "node:fs";
import { VerboseReporter } from "vitest/reporters";

/**
 * vitest reporter that does not output "serialized error" to console which may contain secrets
 */
export class AzureSDKReporter extends VerboseReporter {
  /**
   * the `verbose` flag is used by VerboseReporter solely to control whether the serialized error should be output, so all we need to do
   * is set it to false
   */
  protected verbose = false;
}

export function isInDevopsPipeline() {
  return process.env["SYSTEM_TEAMPROJECTID"] !== undefined;
}

/**
 * Reads the package name from a package.json in the provided root directory.
 */
export function packageNameFrom(rootDir: string): string {
  const pkgJsonPath = resolve(rootDir, "package.json");
  const pkg = JSON.parse(readFileSync(pkgJsonPath, "utf-8"));
  return pkg.name as string;
}

/**
 * Creates standard alias mappings for tests given a root directory and outputs.
 * - Maps the package name (from package.json) to the given distDir/indexFile
 * - Maps "$internal/..." to the same distDir
 */
export function makeAliases(
  rootDir: string,
  options: {
    distDir: string; // e.g. "./src", "./dist/esm", "./dist/browser"
    indexFile?: string; // e.g. "index.ts" or "index.js" (default: index.js)
    packageName?: string; // optional override
    internalPattern?: RegExp; // optional override for the internal alias pattern
  },
) {
  const {
    distDir,
    indexFile = "index.js",
    packageName = packageNameFrom(rootDir),
    internalPattern = /^\$internal\/(.*)$/,
  } = options;

  return [
    {
      find: packageName,
      replacement: resolve(rootDir, `${distDir}/${indexFile}`),
    },
    {
      find: internalPattern,
      replacement: resolve(rootDir, `${distDir}/$1`),
    },
  ] as const;
}

function makeNodeAliases(rootDir: string) {
  const [dist, indexFile] = isInDevopsPipeline() ? ["dist/esm", "index.js"] : ["src", "index.ts"];
  return makeAliases(rootDir, { distDir: `./${dist}`, indexFile });
}

export default defineConfig({
  test: {
    testTimeout: 1200000,
    hookTimeout: 1200000,
    reporters: [new AzureSDKReporter(), "junit"],
    outputFile: {
      junit: "test-results.xml",
    },
    fakeTimers: {
      toFake: ["setTimeout", "Date"],
    },
    watch: false,
    include: ["test/**/*.spec.ts"],
    exclude: [
      "test/**/browser/*.spec.ts",
      "test/snippets.spec.ts",
      "test/integration/**/*.spec.ts",
      "test/stress/**/*.ts",
    ],
    alias: [...makeNodeAliases(process.cwd())],
    coverage: {
      include: ["src/**/*.ts"],
      exclude: [
        "src/**/*-browser.mts",
        "src/**/*-react-native.mts",
        "vitest*.config.ts",
        "samples-dev/**/*.ts",
        "test/snippets.spec.ts",
      ],
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      reportsDirectory: "coverage",
    },
  },
});
