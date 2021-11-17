// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Instrumenter,
  InstrumenterSpanOptions,
  SpanStatus,
  TracingContext,
  TracingSpan,
  TracingSpanContext
} from "@azure/core-tracing";

import { trace, context, Span, SpanStatusCode, SpanAttributeValue } from "@opentelemetry/api";

import {
  toTracestateHeader,
  toTraceparentHeader,
  toSpanOptions,
  fromTraceparentHeader
} from "./transformations";

export class OpenTelemetryInstrumenter implements Instrumenter {
  startSpan(
    name: string,
    spanOptions?: InstrumenterSpanOptions
  ): { span: TracingSpan; tracingContext: TracingContext } {
    if (!spanOptions) {
      spanOptions = {
        packageInformation: {
          name: "@azure/instrumentation-opentelemetry"
        }
      };
    }

    const span = trace
      .getTracer(spanOptions.packageInformation.name, spanOptions.packageInformation.version)
      .startSpan(name, toSpanOptions(spanOptions));

    const ctx = spanOptions?.tracingContext || context.active();

    return {
      span: new OpenTelemetrySpanWrapper(span),
      tracingContext: trace.setSpan(ctx, span)
    };
  }
  withContext<
    CallbackArgs extends unknown[],
    Callback extends (...args: CallbackArgs) => ReturnType<Callback>
  >(
    tracingContext: TracingContext,
    callback: Callback,
    callbackThis?: ThisParameterType<Callback>,
    ...callbackArgs: CallbackArgs
  ): ReturnType<Callback> {
    return context.with(tracingContext, callback, callbackThis, ...callbackArgs);
  }

  parseTraceparentHeader(traceparentHeader: string) {
    return fromTraceparentHeader(traceparentHeader);
  }

  createRequestHeaders(spanContext: TracingSpanContext): Record<string, string> {
    const headers: Record<string, string> = {};
    const traceparentHeader = toTraceparentHeader(spanContext);
    if (traceparentHeader) {
      headers["traceparent"] = traceparentHeader;

      // if tracestate is set, traceparent MUST be set, so only set tracestate after traceparent
      const tracestateHeader = toTracestateHeader(spanContext);
      if (tracestateHeader) {
        headers["tracestate"] = tracestateHeader;
      }
    }

    return headers;
  }
}

export class OpenTelemetrySpanWrapper implements TracingSpan {
  private _span: Span;

  constructor(span: Span) {
    this._span = span;
  }

  setStatus(status: SpanStatus): void {
    if (status.status === "error") {
      if (status.error) {
        this._span.setStatus({ code: SpanStatusCode.ERROR, message: status.error.toString() });
        this.recordException(status.error);
      } else {
        this._span.setStatus({ code: SpanStatusCode.ERROR });
      }
    } else if (status.status === "success") {
      this._span.setStatus({ code: SpanStatusCode.OK });
    }
  }
  setAttribute(name: string, value: unknown): void {
    if (value !== null && value !== undefined) {
      this._span.setAttribute(name, value as SpanAttributeValue);
    }
  }
  end(): void {
    this._span.end();
  }
  recordException(exception: string | Error): void {
    this._span.recordException(exception);
  }
  isRecording(): boolean {
    return this._span.isRecording();
  }

  get spanContext() {
    return this._span.spanContext();
  }

  /**
   * Allows getting the wrapped span as needed.
   * @internal
   *
   * @returns The underlying span
   */
  unwrap(): unknown {
    return this._span;
  }
}
