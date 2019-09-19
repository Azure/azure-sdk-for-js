// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { SupportedPlugins } from "./utils/supportedPlugins";
import { OpenCensusTracePlugin } from "./plugins/opencensus/openCensusTracePlugin";
import { NoOpTracePlugin } from "./plugins/noop/noOpTracePlugin";
import { Plugin } from "./interfaces/plugin";


let _tracerPlugin: Plugin;

export interface ITracerProxy {
  setTracer(tracer: any, tracerPluginType: SupportedPlugins): void;
  getTracer(): Plugin;
}

export function setTracer(tracer: any, tracerPluginType: SupportedPlugins) {
  if (tracerPluginType === SupportedPlugins.OPENCENSUS) {
    _tracerPlugin = new OpenCensusTracePlugin(tracer);
  } else {
    _tracerPlugin = new NoOpTracePlugin();
  }
}

export function getTracer() {
  if (!_tracerPlugin) {
    _tracerPlugin = new NoOpTracePlugin();
  }
  return _tracerPlugin;
}
