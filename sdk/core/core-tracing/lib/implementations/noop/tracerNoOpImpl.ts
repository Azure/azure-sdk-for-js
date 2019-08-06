import { Tracer } from "../../interfaces/tracer";
import { SpanOptions } from "../../interfaces/SpanOptions";
import { Span } from "../../interfaces/span";
import { SpanNoOpImpl } from "./spanNoOpImpl";
import { SupportedPlugins } from '../../utils/supportedPlugins';

export class TracerNoOpImpl implements Tracer {
  public readonly pluginType = SupportedPlugins.NOOP;
  
  getCurrentSpan(): Span {
    throw new Error("Method not implemented.");
  }
  startSpan(name: string, options?: SpanOptions | undefined): Span {
    return new SpanNoOpImpl();
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
