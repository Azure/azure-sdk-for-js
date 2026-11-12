// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.shared.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [
      {
        name: "resolve-distro-azure-instrumentation",
        configEnvironment(name, config) {
          if (name === "__vitest__") {
            // Resolve the distro's published SDK 2 dependency per importer instead
            // of externalizing to the hoisted SDK 3 workspace package.
            config.resolve ??= {};
            const instrumentation = "@azure/opentelemetry-instrumentation-azure-sdk";
            if (Array.isArray(config.resolve.noExternal)) {
              config.resolve.noExternal.push(instrumentation);
            } else if (!config.resolve.noExternal) {
              config.resolve.noExternal = [instrumentation];
            }
          }
        },
      },
    ],
    test: {
      include: ["./test/**/*.test.ts"],
    },
  }),
);
