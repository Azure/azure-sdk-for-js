import {
  SpanStatus,
  Tracer,
  TracerCreateSpanOptions,
  TracingContext,
  TracingSpan
} from "./interfaces";
import { createTracingContext } from "./tracingContext";
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

class OpenTelemetrySpanWrapper implements TracingSpan {
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
}
