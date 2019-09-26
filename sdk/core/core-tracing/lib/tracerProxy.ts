// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { NoOpTracer } from "./wrappers/noop/noOpTracer";
import { Tracer } from "./interfaces/tracer";


let _tracerPlugin: Tracer;

/**
   * Sets the global tracer, enabling tracing for the AzureSDK.
   * @param tracer An OpenTelemetry Tracer instance.
   */
export function setTracer(tracer: Tracer) {
  _tracerPlugin = tracer;
}

/**
   * Retrieves the active tracer, or returns a
   * no-op implementation if one is not set.
   */
export function getTracer() {
  if (!_tracerPlugin) {
    _tracerPlugin = new NoOpTracer();
  }
  return _tracerPlugin;
}
