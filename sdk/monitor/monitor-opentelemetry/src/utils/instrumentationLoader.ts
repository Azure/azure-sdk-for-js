// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as nodeModule from "node:module";
import { Logger } from "../shared/logging/index.js";
import { getModuleParentURL } from "../shared/module.js";

const OTEL_LOADER_SPECIFIER = "@opentelemetry/instrumentation/hook.mjs";

let loaderRegistrationAttempted = false;

/**
 * Registers the OpenTelemetry instrumentation loader using Node's module hooks.
 * This enables auto instrumentation for ESM consumers.
 *
 * For ESM applications, this registration should happen early via the --import flag:
 *   node --import @azure/monitor-opentelemetry/loader <your-app-entry-point>
 *
 * This ensures that the loader is registered before any instrumented modules are loaded.
 *
 * @internal
 */
export function registerInstrumentationLoader(): void {
  if (loaderRegistrationAttempted) {
    return;
  }
  loaderRegistrationAttempted = true;

  const registerFn = (nodeModule as { register?: (specifier: string, parentURL?: string) => void })
    .register;

  if (typeof registerFn !== "function") {
    return;
  }

  const parentURL = getModuleParentURL();
  if (!parentURL) {
    return;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = registerFn(OTEL_LOADER_SPECIFIER, parentURL) as any;

    // Handle potential promise rejection (Node.js 20.6+ returns a promise-like object)
    if (result && typeof result.catch === "function") {
      void result.catch((error: unknown) => {
        Logger.getInstance().warn("Failed to register OpenTelemetry instrumentation loader", error);
      });
    }
  } catch (error) {
    Logger.getInstance().warn("Failed to register OpenTelemetry instrumentation loader", error);
  }
}
