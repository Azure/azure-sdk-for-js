import { Tracer } from "../../interfaces/tracer";
import { SpanOptions } from "../../interfaces/SpanOptions";
import { Span } from "../../interfaces/span";
import { OpenCensusSpanPlugin } from "../opencensus/openCensusSpanPlugin";
import { SupportedPlugins } from '../../utils/supportedPlugins';

export class OpenCensusTracePlugin implements Tracer {
  private _tracer: any;

  public constructor(tracer: any) {
    this._tracer = tracer;
  }
  
  public readonly pluginType = SupportedPlugins.OPENCENSUS;
  
  startSpan(name: string, options?: SpanOptions): Span {
    const parent = options
      ? options.parent
        ? options.parent instanceof OpenCensusSpanPlugin
          ? options.parent.getSpan()
          : options.parent
        : undefined
      : undefined;

    const span = this._tracer.startChildSpan({
      name: name,
      childOf: parent
    });

    const openCensusSpanPlugin = new OpenCensusSpanPlugin(span);
    return openCensusSpanPlugin;
  }

  getCurrentSpan(): Span {
    throw new Error("Method not implemented.");
  }

  withSpan<T extends (...args: unknown[]) => unknown>(span: Span, fn: T): ReturnType<T> {
    throw new Error("Method not implemented.");
  }
  recordSpanData(span: Span): void {
    throw new Error("Method not implemented.");
  }
  getBinaryFormat(): unknown {
    throw new Error("Method not implemented.");
  }
  getHttpTextFormat(): unknown {
    throw new Error("Method not implemented.");
  }
}
