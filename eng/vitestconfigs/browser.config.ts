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
      // Vite's dependency scanner fails to statically detect some of @opentelemetry/api's CJS
      // named exports (e.g. SpanStatusCode, SpanKind) exported via Object.defineProperty
      // getters, causing "does not provide an export named ..." errors for some importers.
      // Preferring its ESM build ("module" condition) avoids CJS named-export detection
      // entirely for this package.
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
