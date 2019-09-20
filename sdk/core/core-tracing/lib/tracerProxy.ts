// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { NoOpTracePlugin } from "./plugins/noop/noOpTracePlugin";
import { Plugin } from "./interfaces/plugin";


let _tracerPlugin: Plugin;

export interface ITracerProxy {
  setTracer(tracer: Plugin): void;
  getTracer(): Plugin;
}

export function setTracer(tracer: Plugin) {
  _tracerPlugin = tracer;
}

export function getTracer() {
  if (!_tracerPlugin) {
    _tracerPlugin = new NoOpTracePlugin();
  }
  return _tracerPlugin;
}
