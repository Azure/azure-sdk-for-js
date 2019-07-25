import { SupportedPlugins } from "./utils/supportedPlugins";
import { SpanOptions } from "./interfaces/SpanOptions";
import { Span } from "./interfaces/span";
import { OpenCensusTracePlugin } from "./plugins/opencensus/openCensusTracePlugin";
import { NoOpTracePlugin } from "./plugins/noop/noOpTracePlugin";
import { TracerNoOpImpl } from "./implementations/noop/tracerNoOpImpl";

export class TracerProxy {
  private static _tracer: any;
  private static _tracerPlugin: SupportedPlugins;

  private constructor() {}

  public static setTracer(tracer: any, tracerPlugin: SupportedPlugins) {
    TracerProxy._tracer = tracer;
    TracerProxy._tracerPlugin = tracerPlugin;
  }

  public static getTracer() {
    if (!TracerProxy._tracer) {
      TracerProxy._tracer = new TracerNoOpImpl();
      TracerProxy._tracerPlugin = SupportedPlugins.NOOP;
    }
    return TracerProxy._tracer;
  }

  public static startSpan(spanName: string, options: SpanOptions): Span {
    if (TracerProxy._tracerPlugin === SupportedPlugins.OPENCENSUS) {
      const openCensusTracerPlugin = new OpenCensusTracePlugin();
      const openCensusSpanPlugin = openCensusTracerPlugin.startSpan(spanName, options);
      return openCensusSpanPlugin;
    } else {
      const noOpTracerPlugin = new NoOpTracePlugin();
      const noOpSpanPlugin = noOpTracerPlugin.startSpan(spanName, options);
      return noOpSpanPlugin;
    }
  }
}
