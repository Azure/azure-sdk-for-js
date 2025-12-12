// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * ESM Loader entry point for Azure Monitor OpenTelemetry.
 *
 * For ESM applications, this loader MUST be used with the --import flag to ensure
 * instrumentation hooks are registered before any application modules are loaded.
 * This is required because ESM modules cannot be instrumented after they are loaded.
 *
 * Usage: node --import @azure/monitor-opentelemetry/loader <your-app-entry-point>
 */

import * as nodeModule from "node:module";
import { Logger } from "./shared/logging/index.js";
import { getModuleParentURL } from "./shared/module.js";

const OTEL_LOADER_SPECIFIER = "@opentelemetry/instrumentation/hook.mjs";

// Register the OpenTelemetry instrumentation loader immediately when this module is imported
const registerFn = (nodeModule as { register?: (specifier: string, parentURL?: string) => void })
  .register;

if (typeof registerFn === "function") {
  const parentURL = getModuleParentURL();
  if (parentURL) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = registerFn(OTEL_LOADER_SPECIFIER, parentURL) as any;

      // Handle potential promise rejection (Node.js 20.6+ returns a promise-like object)
      if (result && typeof result.catch === "function") {
        void result.catch((error: unknown) => {
          Logger.getInstance().warn(
            "Failed to register OpenTelemetry instrumentation loader",
            error,
          );
        });
      }
    } catch (error) {
      Logger.getInstance().warn("Failed to register OpenTelemetry instrumentation loader", error);
    }
  }
}
