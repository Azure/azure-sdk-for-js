// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig } from "vitest/config";
import {
  AzureSDKReporter,
  fixCoreLroExternalization,
  makeAliases,
  isInDevopsPipeline,
} from "../../../vitest.shared.config.ts";

function makeNodeAliases(rootDir: string) {
  const [dist, indexFile] = isInDevopsPipeline() ? ["dist/esm", "index.js"] : ["src", "index.ts"];
  return makeAliases(rootDir, { distDir: `./${dist}`, indexFile });
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
    typecheck: {
      enabled: false,
    },
    fileParallelism: false,
    include: ["test/internal/**/*.spec.ts"],
    exclude: [
      "test/**/browser/**",
      "test/**/react-native/**",
      "test/snippets.spec.ts",
    ],
    alias: [...makeNodeAliases(process.cwd())],
  },
});
