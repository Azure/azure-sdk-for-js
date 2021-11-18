// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Instrumentation,
  InstrumentationBase,
  InstrumentationConfig
} from "@opentelemetry/instrumentation";
import { SDK_VERSION } from "./constants";
import { useInstrumenter } from "@azure/core-tracing";
import { OpenTelemetryInstrumenter } from "./instrumenter";

/**
 * Configuration options that can be passed to {@link AzureSDKInstrumentation}'s constructor
 */
export interface AzureSDKInstrumentationOptions extends InstrumentationConfig {}

/**
 * The instrumentation module for the Azure SDK. Implement's OpenTelemetry's {@link Instrumentation}.
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
  protected init() {}

  enable() {
    useInstrumenter(new OpenTelemetryInstrumenter());
  }

  disable() {}
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
export function createAzureInstrumentation(
  options: AzureSDKInstrumentationOptions = {}
): Instrumentation {
  return new AzureSDKInstrumentation(options);
}
