// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { NoOpTracer } from "./wrappers/noop/noOpTracer";
import { Tracer } from "./interfaces/tracer";


let _tracerPlugin: Tracer;

/**
 * A global registry for the active OpenTelemtry Tracer.
 * Clients inside the Azure SDK will use this Tracer for all trace logging.
 */
export interface ITracerProxy {
  /**
   * Sets the global tracer, enabling tracing.
   * @param tracer An OpenTelemetry Tracer instance.
   */
  setTracer(tracer: Tracer): void;
  /**
   * Retrieves the active tracer, or returns a
   * no-op implementation if one is not set.
   */
  getTracer(): Tracer;
}

export function setTracer(tracer: Tracer) {
  _tracerPlugin = tracer;
}

export function getTracer() {
  if (!_tracerPlugin) {
    _tracerPlugin = new NoOpTracer();
  }
  return _tracerPlugin;
}
