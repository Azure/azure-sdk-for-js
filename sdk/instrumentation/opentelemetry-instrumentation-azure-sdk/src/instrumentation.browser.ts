// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Instrumentation,
  InstrumentationBase,
  InstrumentationConfig,
} from "@opentelemetry/instrumentation";
import { OpenTelemetryInstrumenter } from "./instrumenter";
import { SDK_VERSION } from "./configuration";
import { useInstrumenter } from "@azure/core-tracing";

/**
 * Configuration options that can be passed to {@link createAzureSdkInstrumentation} function.
 */
export interface AzureSdkInstrumentationOptions extends InstrumentationConfig {}

/**
 * The instrumentation module for the Azure SDK. Implements OpenTelemetry's {@link Instrumentation}.
 */
class AzureSdkInstrumentation extends InstrumentationBase {
  constructor(options: AzureSdkInstrumentationOptions = {}) {
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
 *   instrumentations: [createAzureSdkInstrumentation()],
 * })
 * ```
 */
export function createAzureSdkInstrumentation(
  options: AzureSdkInstrumentationOptions = {}
): Instrumentation {
  return new AzureSdkInstrumentation(options);
}
