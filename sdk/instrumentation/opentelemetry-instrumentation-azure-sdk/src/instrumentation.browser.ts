// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Instrumentation,
  InstrumentationBase,
  InstrumentationConfig,
} from "@opentelemetry/instrumentation";
import { SDK_VERSION } from "./constants";
import { useInstrumenter } from "@azure/core-tracing";
import { OpenTelemetryInstrumenter } from "./instrumenter";

/**
 * Configuration options that can be passed to {@link AzureSDKInstrumentation}'s constructor
 */
export interface AzureSDKInstrumentationOptions extends InstrumentationConfig {}

/**
 * The instrumentation module for the Azure SDK. Implements OpenTelemetry's {@link Instrumentation}.
 */
class AzureSDKInstrumentation extends InstrumentationBase {
  constructor(options: AzureSDKInstrumentationOptions = {}) {
    super(
      "@azure/opentelemetry-instrumentation-azure-sdk",
      SDK_VERSION,
      Object.assign({}, options)
    );
  }
  /** In the browser we rely on overriding the `enable` function instead as there are no modules to patch. */
  protected init(): void {
    // no-op
  }

  /**
   * Entrypoint for the module registration. Ensures the global instrumenter is set to use OpenTelemetry.
   */
  enable(): void {
    useInstrumenter(new OpenTelemetryInstrumenter());
  }

  disable(): void {
    // no-op
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
 *   instrumentations: [createAzureSDKInstrumentation()],
 * })
 * ```
 */
export function createAzureSDKInstrumentation(
  options: AzureSDKInstrumentationOptions = {}
): Instrumentation {
  return new AzureSDKInstrumentation(options);
}
