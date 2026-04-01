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

function shouldCollectCoverage(rootDir: string) {
  return (
    process.env["TEST_MODE"] === "live" ||
    rootDir.includes("/sdk/core/") ||
    rootDir.includes("\\sdk\\core\\")
  );
}

function makeNodeAliases(rootDir: string) {
  const [dist, indexFile] = isInDevopsPipeline() ? ["dist/esm", "index.js"] : ["src", "index.ts"];
  return makeAliases(rootDir, { distDir: `./${dist}`, indexFile });
}

/**
 * Vite plugin that works around a processedIds cache bug in Vite's import analysis.
 * The __vitest__ environment defaults to noExternal: [], which lets Vite cache the first
 * externalization decision for a bare specifier across all importers. When multiple versions
 * of @azure/core-lro coexist (v2 from published deps, v3 from workspace), the first resolution
 * gets cached and subsequent importers get the wrong version. Adding core-lro to noExternal
 * forces Vite to transform (not externalize) each import, resolving per-importer correctly.
 * See https://github.com/vitest-dev/vitest/issues/10028
 */
export function fixCoreLroExternalization() {
  return {
    name: "fix-core-lro-externalization",
    configEnvironment(name: string, config: { resolve?: { noExternal?: string[] | boolean } }) {
      if (name === "__vitest__") {
        config.resolve ??= {};
        if (Array.isArray(config.resolve.noExternal)) {
          config.resolve.noExternal.push("@azure/core-lro");
        } else if (!config.resolve.noExternal) {
          config.resolve.noExternal = ["@azure/core-lro"];
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [fixCoreLroExternalization()],
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
      enabled: shouldCollectCoverage(process.cwd()),
      include: ["src/**/*.ts"],
      exclude: [
        "src/**/*-browser.mts",
        "src/**/*-react-native.mts",
        "vitest*.config.ts",
        "samples-dev/**/*.ts",
        "test/snippets.spec.ts",
      ],
      provider: "istanbul",
      reporter: ["text", "cobertura", "html"],
      reportsDirectory: "coverage",
    },
  },
});
