// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { NoOpTracer } from "./wrappers/noop/noOpTracer";
import { Tracer } from "./interfaces/tracer";


let _tracerPlugin: Tracer;

export interface ITracerProxy {
  setTracer(tracer: Tracer): void;
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
