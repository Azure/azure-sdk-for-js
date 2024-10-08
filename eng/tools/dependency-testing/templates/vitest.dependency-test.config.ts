// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import path from "node:path";
import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../../../vitest.shared.config.ts";

// The idea is as follows:

// 1. Try to load the package vite config from the package's vitest.config.ts file, using an empty object if it fails to load
let packageConfig = {};
try {
  packageConfig = (await import("../../vitest.config.ts")).default;
} catch (e: any) {
  if (e.code === "ERR_MODULE_NOT_FOUND") {
    // If the file does not exist, log a message and default to an empty config
    console.warn(
      `vitest.config.ts not found in expected location ${path.resolve(__dirname, "../../vitest.config.ts")} - using default min/max vitest config`,
    );
  } else {
    // If there's another error, rethrow it
    throw e;
  }
}

// Taking the base vite config and merging it with the vitest template config we have here
const config = mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ["./**/*.spec.ts"],
      exclude: ["**/node_modules/**"],
    },
  }),
);

// Finally, the default export mixes in the package config with the merged config, producing the final result
export default mergeConfig(mergedTestConfig, packageConfig);
