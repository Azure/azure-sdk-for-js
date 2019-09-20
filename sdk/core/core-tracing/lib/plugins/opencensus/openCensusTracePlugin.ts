import { Tracer } from "../../interfaces/tracer";
import { SpanOptions } from "../../interfaces/SpanOptions";
import { Span } from "../../interfaces/span";
import { OpenCensusSpanPlugin } from "../opencensus/openCensusSpanPlugin";
import { SupportedPlugins } from '../../utils/supportedPlugins';
import { BinaryFormat } from "../../interfaces/BinaryFormat";
import { HttpTextFormat } from "../../interfaces/HttpTextFormat";

export class OpenCensusTracePlugin implements Tracer {
  private _tracer: any;

  public getWrappedTracer() {
    return this._tracer;
  }

  public constructor(tracer: any) {
    this._tracer = tracer;
  }

  public readonly pluginType = SupportedPlugins.OPENCENSUS;

  startSpan(name: string, options?: SpanOptions): Span {
    const openCensusSpanPlugin = new OpenCensusSpanPlugin(this, name, options);
    return openCensusSpanPlugin;
  }

  getCurrentSpan(): Span {
    throw new Error("Method not implemented.");
  }

  withSpan<T extends (...args: unknown[]) => unknown>(span: Span, fn: T): ReturnType<T> {
    throw new Error("Method not implemented.");
  }
  bind<T>(target: T, span?: Span): T {
    throw new Error("Method not implemented.");
  }
  recordSpanData(span: Span): void {
    throw new Error("Method not implemented.");
  }
  getBinaryFormat(): BinaryFormat {
    throw new Error("Method not implemented.");
  }
  getHttpTextFormat(): HttpTextFormat {
    throw new Error("Method not implemented.");
  }
}
