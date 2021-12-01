// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Instrumentation,
  InstrumentationBase,
  InstrumentationConfig,
  InstrumentationModuleDefinition,
  InstrumentationNodeModuleDefinition
} from "@opentelemetry/instrumentation";
import type * as coreTracing from "@azure/core-tracing"
import { OpenTelemetryInstrumenter } from "./instrumenter";
import { SDK_VERSION } from "./constants";

/**
 * Configuration options that can be passed to {@link AzureSDKInstrumentation}'s constructor
 */
export interface AzureSDKInstrumentationOptions extends InstrumentationConfig {}

/**
 * The instrumentation module for the Azure SDK. Implements OpenTelemetry's {@link Instrumentation}.
 */
class AzureSDKInstrumentation extends InstrumentationBase {
  constructor(options: AzureSDKInstrumentationOptions = {}) {
    super("@azure/instrumentation-opentelemetry", SDK_VERSION, Object.assign({}, options));
  }
  /**
   * Entrypoint for the module registration.
   * 
   * @returns The patched \@azure/core-tracing module after setting its instrumenter.
   */
  protected init():
    | void
    | InstrumentationModuleDefinition<typeof coreTracing>
    | InstrumentationModuleDefinition<typeof coreTracing>[] {
    const result: InstrumentationModuleDefinition<typeof coreTracing> = new InstrumentationNodeModuleDefinition(
      "@azure/core-tracing",
      ["^1.0.0-preview.14", "^1.0.0"],
      (moduleExports) => {
        if (typeof moduleExports.useInstrumenter === "function") {
          moduleExports.useInstrumenter(new OpenTelemetryInstrumenter());
        }

        return moduleExports;
      }
    );
    // Needed to support 1.0.0-preview.14
    result.includePrerelease = true;
    return result;
  }
}

/**
 * Enables Azure SDK Instrumentation using OpenTelemetry for Azure SDK client libraries.
 *
 * When registerd, any Azure data plane package will begin emitting tracing spans for internal calls
 * as well as network calls
 * 
 * Example usage:
 * ```ts
 * const openTelemetryInstrumentation = require("@opentelemetry/instrumentation");
 * openTelemetryInstrumentation.registerInstrumentations({
 *   instrumentations: [createAzureInstrumentation()],
 * })
 * ```
 *
 * @remarks
 *
 * As OpenTelemetry instrumentations rely on patching required modules, you should register
 * this instrumentation as early as possible and before loading any Azure Client Libraries.
 */
export function createAzureInstrumentation(options: AzureSDKInstrumentationOptions = {}): Instrumentation {
  return new AzureSDKInstrumentation(options);
}
