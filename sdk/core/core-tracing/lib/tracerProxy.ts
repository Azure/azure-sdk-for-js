// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { SupportedPlugins } from "./utils/supportedPlugins";
import { OpenCensusTracePlugin } from "./plugins/opencensus/openCensusTracePlugin";
import { NoOpTracePlugin } from "./plugins/noop/noOpTracePlugin";
import { Plugin } from "./interfaces/plugin";

export class TracerProxy {
  private static _tracerPlugin: Plugin;

  private constructor() { }

  public static setTracer(tracer: any, tracerPluginType: SupportedPlugins) {
    if (tracerPluginType === SupportedPlugins.OPENCENSUS) {
      TracerProxy._tracerPlugin = new OpenCensusTracePlugin(tracer);
    } else {
      TracerProxy._tracerPlugin = new NoOpTracePlugin();
    }
  }

  public static getTracer() {
    if (!TracerProxy._tracerPlugin) {
      TracerProxy._tracerPlugin = new NoOpTracePlugin();
    }
    return TracerProxy._tracerPlugin;
  }
}
