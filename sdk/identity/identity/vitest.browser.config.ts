// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import base from "../../../eng/vitestconfigs/browser.config.ts";

export default mergeConfig(
  base,
  defineConfig({
    resolve: {
      // Vite's dependency scanner fails to statically detect some of @opentelemetry/api's CJS
      // named exports (e.g. SpanStatusCode, SpanKind), which are exported via
      // Object.defineProperty getters rather than plain assignments, causing "does not
      // provide an export named ..." errors for some importers under Vitest 5's browser mode.
      // Preferring its ESM build ("module" condition) avoids CJS named-export detection
      // entirely for this package. Scoped to this package since it's the only one that
      // imports @opentelemetry/api values directly in its browser test suite (via
      // @azure-tools/test-utils-vitest's tracing test doubles).
      conditions: ["browser", "module"],
    },
    test: {
      exclude: [
        "test/**/node/**",
        "test/**/react-native/**",
        "test/snippets.spec.ts",
        "test/integration/**/*.spec.ts",
      ],
    },
  }),
);
