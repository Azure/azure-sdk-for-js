// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as nodeModule from "node:module";
import { Logger } from "../shared/logging/index.js";
import { getModuleParentURL } from "../shared/module.js";

const OTEL_LOADER_SPECIFIER = "@opentelemetry/instrumentation/hook.mjs";
let loaderRegistrationAttempted = false;

/**
 * Registers the OpenTelemetry instrumentation loader using Node's module hooks.
 * This enables auto instrumentation for both CommonJS and ESM consumers without
 * requiring users to pass --experimental-loader flags.
 * @internal
 */
export function registerInstrumentationLoader(): void {
  if (loaderRegistrationAttempted) {
    return;
  }
  loaderRegistrationAttempted = true;

  const registerFn = (nodeModule as { register?: (specifier: string, parentURL?: string) => unknown })
    .register;
  if (typeof registerFn !== "function") {
    return;
  }

  try {
    const parentURL = getModuleParentURL();
    const result = registerFn(OTEL_LOADER_SPECIFIER, parentURL);
    if (typeof (result as Promise<unknown>)?.catch === "function") {
      void (result as Promise<unknown>).catch((error: Error) => {
        Logger.getInstance().warn("Failed to register OpenTelemetry instrumentation loader", error);
      });
    }
  } catch (error) {
    Logger.getInstance().warn("Failed to register OpenTelemetry instrumentation loader", error);
  }
}
