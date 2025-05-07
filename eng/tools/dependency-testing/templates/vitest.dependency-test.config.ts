// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../../../vitest.shared.config.ts";

// The goal of this file is to create a unified test configuration for Vitest
// by combining a base configuration for dependency testing with package-specific settings.
// This ensures that we maintain consistent test behavior when running min/max tests,
// while allowing for individual package overrides where necessary.

// 1. Try to load the package-specific vitest config, if available.
// This allows each package to have its own tailored test configuration,
// but it's optional. 
let packageConfig = undefined;

try {
  packageConfig = (await import("../../vitest.config.ts")).default;
} catch (e: any) {
  if (e.code === "ERR_MODULE_NOT_FOUND") {
    // If no specific config is found, we log this fact.
    // This ensures developers know when package-specific settings are missing,
    // but it's not an error — we simply default to the shared config.
    console.warn(
      `vitest.config.ts not found in the expected location (sdk/<service-directory>/<package-directory>/vitest.config.ts) - package's vitest config will not be included`,
    );
  } else {
    // Any other error here indicates a real issue, so we rethrow it.
    throw e;
  }
}
// If the package config isn't present, we proceed with the default shared setup.
const baseConfig = packageConfig ?? viteConfig;

// 2. Merge the shared base config/ package specific config with the standard test settings for min/max tests.
// These settings apply to all packages.
const finalViteConfig = mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      include: ["./**/*.spec.ts"],
      exclude: [
        "**/node_modules/**",
        "**/browser/*.spec.ts"
      ],
    },
  }),
);

console.log("Using the following Vitest configuration:");
console.log(JSON.stringify(finalViteConfig, null, 2));

export default finalViteConfig;
