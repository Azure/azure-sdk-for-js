// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig } from "vitest/config";
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

export default defineConfig({
  test: {
    testTimeout: 18000,
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
    typecheck: {
      enabled: true,
      tsconfig: "tsconfig.test.json",
      include: ["test/**/*.ts", "test/**/*.mts", "test/**/*.cts"],
    },
  },
});
