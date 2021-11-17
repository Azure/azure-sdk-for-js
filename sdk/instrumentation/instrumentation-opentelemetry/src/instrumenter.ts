// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Instrumenter,
  InstrumenterSpanOptions,
  SpanStatus,
  TracingContext,
  TracingSpan,
  TracingSpanContext,
  TracingSpanKind,
  TracingSpanLink
} from "@azure/core-tracing";

import {
  SpanContext,
  TraceFlags,
  TraceState,
  trace,
  context,
  Span,
  SpanStatusCode,
  SpanAttributeValue,
  SpanAttributes,
  SpanOptions,
  SpanKind,
  Link
} from "@opentelemetry/api";

const VERSION = "00";

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
      .startSpan(name, this.toSpanOptions(spanOptions));

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

  private toSpanOptions(spanOptions: InstrumenterSpanOptions): SpanOptions {
    const { spanAttributes, spanLinks, spanKind } = spanOptions;

    const attributes: SpanAttributes = toOpenTelemetrySpanAttributes(spanAttributes);
    const kind = toOpenTelemetrySpanKind(spanKind);
    const links = toOpenTelemetryLinks(spanLinks);

    return {
      attributes,
      kind,
      links
    };
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

  /**
   * Allows getting the wrapped span as needed.
   *
   * @returns The underlying span
   */
  unwrap(): unknown {
    return this._span;
  }
}

/**
 * Converts our TracingSpanKind to the corresponding OpenTelemetry SpanKind.
 *
 * By default it will return {@link SpanKind.INTERNAL}
 * @param tracingSpanKind - The core tracing {@link TracingSpanKind}
 * @returns - The OpenTelemetry {@link SpanKind}
 */
function toOpenTelemetrySpanKind<K extends TracingSpanKind>(
  tracingSpanKind?: K
): SpanKindMapping[K] {
  const key = (tracingSpanKind || "internal").toUpperCase() as keyof typeof SpanKind;
  return SpanKind[key] as SpanKindMapping[K];
}

type SpanKindMapping = {
  client: SpanKind.CLIENT;
  server: SpanKind.SERVER;
  producer: SpanKind.PRODUCER;
  consumer: SpanKind.CONSUMER;
  internal: SpanKind.INTERNAL;
};

function toOpenTelemetryLinks(spanLinks: TracingSpanLink[] = []): Link[] {
  return spanLinks.map((tracingSpanLink) => {
    return {
      context: {
        ...tracingSpanLink.spanContext,
        traceState: tracingSpanLink.spanContext.traceState as TraceState
      },
      attributes: toOpenTelemetrySpanAttributes(tracingSpanLink.attributes)
    };
  });
}

function toOpenTelemetrySpanAttributes(
  spanAttributes: { [key: string]: unknown } | undefined
): SpanAttributes {
  const attributes: ReturnType<typeof toOpenTelemetrySpanAttributes> = {};
  for (const key in spanAttributes) {
    // Any non-nullish value is allowed.
    if (spanAttributes[key] !== null && spanAttributes[key] !== undefined) {
      attributes[key] = spanAttributes[key] as SpanAttributeValue;
    }
  }
  return attributes;
}
