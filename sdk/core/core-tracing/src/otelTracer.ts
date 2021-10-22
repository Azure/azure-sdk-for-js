import {
  SpanStatus,
  Tracer,
  TracerCreateSpanOptions,
  TracingContext,
  TracingSpan
} from "./interfaces";
import * as api from "@opentelemetry/api";
import { setSpan } from "@opentelemetry/api/build/src/trace/context-utils";
import { SpanAttributeValue } from "@opentelemetry/api";

export class OpenTelemetryTracer implements Tracer {
  startSpan(
    name: string,
    options: TracerCreateSpanOptions
  ): { span: TracingSpan; tracingContext: TracingContext } {
    let context = options.tracingContext || api.context.active();
    const span = api.trace.getTracer("@azure/core-tracing").startSpan(name);
    context = setSpan(context, span);
    return {
      span: new OpenTelemetrySpanWrapper(span),
      tracingContext: context
    };
  }
  withContext<
    CallbackArgs extends unknown[],
    Callback extends (...args: CallbackArgs) => ReturnType<Callback>
  >(
    context: TracingContext,
    callback: Callback,
    callbackThis?: ThisParameterType<Callback>,
    ...callbackArgs: CallbackArgs
  ): ReturnType<Callback> {
    return api.context.with(
      context || api.context.active(),
      callback,
      callbackThis,
      ...callbackArgs
    );
  }
}
/**
 * Shorthand enum for common traceFlags values inside SpanContext
 */
enum TraceFlags {
  /** No flag set. */
  NONE = 0x0,
  /** Caller is collecting trace information. */
  SAMPLED = 0x1
}

class OpenTelemetrySpanWrapper implements TracingSpan {
  VERSION = "00";
  constructor(private span: api.Span) {}
  setStatus(status: SpanStatus): void {
    if (status.status === "error") {
      this.span.setStatus({
        code: api.SpanStatusCode.ERROR,
        message: status.error.toString()
      });
      this.span.recordException(status.error);
    } else {
      this.span.setStatus({
        code: api.SpanStatusCode.OK
      });
    }
  }
  setAttribute(name: string, value: unknown): void {
    this.span.setAttribute(name, value as SpanAttributeValue);
  }
  end(): void {
    this.span.end();
  }
  unwrap(): unknown {
    return this.span;
  }
  serialize(): Record<string, string> {
    const spanContext = this.span.spanContext();
    if (!spanContext.traceId || !spanContext.spanId) {
      return {};
    }

    const flags = spanContext.traceFlags || TraceFlags.NONE;
    const hexFlags = flags.toString(16);
    const traceFlags = hexFlags.length === 1 ? `0${hexFlags}` : hexFlags;

    const result: Record<string, string> = {
      // https://www.w3.org/TR/trace-context/#traceparent-header-field-values
      traceparent: `${this.VERSION}-${spanContext.traceId}-${spanContext.spanId}-${traceFlags}`
    };

    if (spanContext.traceState) {
      result["tracestate"] = spanContext.traceState.serialize();
    }
    return result;
  }
}
