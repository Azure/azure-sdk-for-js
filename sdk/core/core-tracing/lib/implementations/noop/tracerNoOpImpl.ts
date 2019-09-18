import { Tracer } from "../../interfaces/tracer";
import { SpanOptions } from "../../interfaces/SpanOptions";
import { Span } from "../../interfaces/span";
import { SpanNoOpImpl } from "./spanNoOpImpl";
import { SupportedPlugins } from '../../utils/supportedPlugins';
import { BinaryFormat } from "../../interfaces/BinaryFormat";
import { HttpTextFormat } from "../../interfaces/HttpTextFormat";

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
