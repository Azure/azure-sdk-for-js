import { Tracer } from "../../interfaces/tracer";
import { SpanOptions } from "../../interfaces/SpanOptions";
import { Span } from "../../interfaces/span";
import { TracerProxy } from "../../tracerProxy";
import { OpenCensusSpanPlugin } from "../opencensus/openCensusSpanPlugin";

export class OpenCensusTracePlugin implements Tracer {
  startSpan(name: string, options?: SpanOptions): Span {
    const span = TracerProxy.getTracer().startChildSpan({
      name: name,
      childOf: options ? options.parent : undefined
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
