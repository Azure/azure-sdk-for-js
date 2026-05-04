// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { resolve } from "node:path";
import viteConfig from "../../../vitest.shared.config.ts";
import dotenv from "dotenv/config";

/**
 * Vite plugin that forces @azure/core-tracing into noExternal so that Vite resolves
 * it per-importer instead of caching the first resolution. Without this, the workspace
 * version (used by test-utils-vitest) and the npm-published copy (in node_modules) may
 * coexist, causing useInstrumenter() in supportsTracing tests to set state on a different
 * module instance than the SDK reads from.
 * Same pattern as fixCoreLroExternalization in vitest.shared.config.ts.
 */
function fixCoreTracingExternalization() {
  return {
    name: "fix-core-tracing-externalization",
    configEnvironment(name: string, config: { resolve?: { noExternal?: string[] | boolean } }) {
      if (name === "__vitest__") {
        config.resolve ??= {};
        if (Array.isArray(config.resolve.noExternal)) {
          config.resolve.noExternal.push("@azure/core-tracing");
        } else if (!config.resolve.noExternal) {
          config.resolve.noExternal = ["@azure/core-tracing"];
        }
      }
    },
  };
}

const config = {
    ...viteConfig,
    plugins: [...(viteConfig.plugins ?? []), fixCoreTracingExternalization()],
    test: {
        ...viteConfig.test,
        exclude: ["test/**/browser/*.spec.ts", "test/snippets.spec.ts", "test/stress/**/*.ts"],
        alias: [
            ...(Array.isArray(viteConfig.test?.alias) ? viteConfig.test.alias : []),
            {
                // Ensure test-utils-vitest and SDK source share the same @azure/core-tracing
                // instance so useInstrumenter() in supportsTracing tests is visible to both.
                //
                // We deliberately point at core-tracing's built ESM output rather than its
                // src/. Aliasing to src/index.ts breaks because state.ts uses tshy's
                // CJS-bridge import "../commonjs/state-cjs.js", which only exists under
                // dist/ after a build. Prerequisite: core-tracing must be built before
                // running these tests (handled by the workspace build/CI; for local runs,
                // run `rush build -t @azure/core-tracing` or `npm run build` in
                // sdk/core/core-tracing first).
                find: "@azure/core-tracing",
                replacement: resolve(process.cwd(), "../../core/core-tracing/dist/esm/index.js"),
            },
        ],
    },
}
export default config;

