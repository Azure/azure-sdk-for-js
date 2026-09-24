// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import base from "../../vitest.browser.base.config.ts";

// Set recordings path if test-recorder is available (for packages with recorded tests)
try {
  const { relativeRecordingsPath } = await import("@azure-tools/test-recorder");
  process.env.RECORDINGS_RELATIVE_PATH = relativeRecordingsPath();
} catch (e: unknown) {
  // Only ignore module-not-found errors (package doesn't use test-recorder)
  // Rethrow any other errors to avoid masking real issues
  if (e instanceof Error && "code" in e && e.code === "ERR_MODULE_NOT_FOUND") {
    // Package doesn't use test-recorder, skip setting recordings path
  } else {
    throw e;
  }
}

export default mergeConfig(
  base,
  defineConfig({
    resolve: {
      // Vite 6 (required by Vitest 5) stopped implicitly merging the default "module"
      // condition with a custom resolve.conditions value (Vite 5 did this silently). Some
      // dependencies (e.g. @opentelemetry/api) don't declare a "browser" condition in their
      // package.json "exports" map, so resolution falls back to their CJS "default" build.
      // Vite's esbuild-based dependency scanner can't always statically detect CJS named
      // exports defined via Object.defineProperty getters (as @opentelemetry/api does for
      // SpanStatusCode, SpanKind, etc.), causing "does not provide an export named ..."
      // errors. Explicitly keeping "module" avoids falling back to the CJS build.
      conditions: ["browser", "module"],
    },
    optimizeDeps: {
      include: ["@azure-tools/test-recorder"],
    },
    test: {
      include: ["test/**/*.spec.ts"],
      exclude: ["test/**/node/**", "test/**/react-native/**", "test/snippets.spec.ts"],
    },
  }),
);
