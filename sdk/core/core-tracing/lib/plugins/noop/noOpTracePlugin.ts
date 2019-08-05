import { Tracer } from "../../interfaces/tracer";
import { Span } from "../../interfaces/span";
import { SpanOptions } from "../../interfaces/SpanOptions";
import { NoOpSpanPlugin } from "./noOpSpanPlugin";
import { SpanNoOpImpl } from "../../implementations/noop/spanNoOpImpl";
import { SupportedPlugins } from '../../utils/supportedPlugins';

export class NoOpTracePlugin implements Tracer {
  private _tracer: any;

  public constructor(tracer: any) {
    this._tracer = tracer;
  }

  public readonly pluginType = SupportedPlugins.NOOP;

  startSpan(name: string, options?: SpanOptions): Span {
    const span = new SpanNoOpImpl();
    const noOpSpanPlugin = new NoOpSpanPlugin(span);
    return noOpSpanPlugin;
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
