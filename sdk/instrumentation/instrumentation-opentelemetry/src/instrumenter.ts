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

import {
  SpanContext,
  TraceFlags,
  TraceState,
  trace,
  context,
  Span,
  SpanStatusCode,
  SpanAttributeValue
} from "@opentelemetry/api";

const VERSION = "00";

export class OpenTelemetryInstrumenter implements Instrumenter {
  startSpan(
    name: string,
    _spanOptions?: InstrumenterSpanOptions
  ): { span: TracingSpan; tracingContext: TracingContext } {
    const span = trace.getTracer("foo").startSpan(name);
    const ctx = context.active();

    return {
      span: new OpenTelemetrySpanWrapper(span),
      tracingContext: trace.setSpan(ctx, span)
    };
  }
  withContext<
    CallbackArgs extends unknown[],
    Callback extends (...args: CallbackArgs) => ReturnType<Callback>
  >(
    _context: TracingContext,
    _callback: Callback,
    _callbackThis?: ThisParameterType<Callback>,
    ..._callbackArgs: CallbackArgs
  ): ReturnType<Callback> {
    throw new Error("Method not implemented.");
  }

  parseTraceparentHeader(traceparentHeader: string) {
    const parts = traceparentHeader.split("-");

    if (parts.length !== 4) {
      return;
    }

    const [version, traceId, spanId, traceOptions] = parts;

    if (version !== VERSION) {
      return;
    }

    const traceFlags = parseInt(traceOptions, 16);

    const spanContext: SpanContext = {
      spanId,
      traceId,
      traceFlags
    };

    return spanContext;
  }

  createRequestHeaders(spanContext: TracingSpanContext): Record<string, string> {
    const headers: Record<string, string> = {};
    const traceparentHeader = createTraceparentHeader(spanContext);
    if (traceparentHeader) {
      headers["traceparent"] = traceparentHeader;

      // if tracestate is set, traceparent MUST be set, so only set tracestate after traceparent
      const tracestateHeader = createTracestateHeader(spanContext);
      if (tracestateHeader) {
        headers["tracestate"] = tracestateHeader;
      }
    }

    return headers;
  }
}

function createTraceparentHeader(spanContext: TracingSpanContext): string | undefined {
  const missingFields: string[] = [];
  if (!spanContext.traceId) {
    missingFields.push("traceId");
  }
  if (!spanContext.spanId) {
    missingFields.push("spanId");
  }

  if (missingFields.length) {
    return;
  }

  const flags = spanContext.traceFlags || TraceFlags.NONE;
  const hexFlags = flags.toString(16);
  const traceFlags = hexFlags.length === 1 ? `0${hexFlags}` : hexFlags;

  // https://www.w3.org/TR/trace-context/#traceparent-header-field-values
  return `${VERSION}-${spanContext.traceId}-${spanContext.spanId}-${traceFlags}`;
}

function createTracestateHeader(spanContext: TracingSpanContext): string | undefined {
  const traceState = spanContext.traceState;

  if (traceState === undefined || traceState === null) {
    return;
  }

  if (typeof traceState !== "object") {
    return;
  }

  if (typeof (traceState as TraceState).serialize !== "function") {
    return;
  }

  const serializedTraceState = (traceState as TraceState).serialize();

  // https://www.w3.org/TR/trace-context/#tracestate-header-field-values
  // Return undefined instead of an empty string to indicate that the tracestate header should not be set.
  return serializedTraceState || undefined;
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
}
