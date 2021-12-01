// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  InstrumenterSpanOptions,
  TracingSpanContext,
  TracingSpanKind,
  TracingSpanLink
} from "@azure/core-tracing";
import {
  Link,
  SpanAttributeValue,
  SpanAttributes,
  SpanContext,
  SpanKind,
  SpanOptions,
  TraceFlags,
  TraceState
} from "@opentelemetry/api";

import { TRACEPARENT_HEADER_VERSION } from "./constants";

/**
 * Converts our TracingSpanKind to the corresponding OpenTelemetry SpanKind.
 *
 * By default it will return {@link SpanKind.INTERNAL}
 * @param tracingSpanKind - The core tracing {@link TracingSpanKind}
 * @returns - The OpenTelemetry {@link SpanKind}
 */
export function toOpenTelemetrySpanKind<K extends TracingSpanKind>(
  tracingSpanKind?: K
): SpanKindMapping[K] {
  const key = (tracingSpanKind || "internal").toUpperCase() as keyof typeof SpanKind;
  return SpanKind[key] as SpanKindMapping[K];
}

/**
 * A mapping between our {@link TracingSpanKind} union type and OpenTelemetry's {@link SpanKind}.
 */
type SpanKindMapping = {
  client: SpanKind.CLIENT;
  server: SpanKind.SERVER;
  producer: SpanKind.PRODUCER;
  consumer: SpanKind.CONSUMER;
  internal: SpanKind.INTERNAL;
};

/**
 * Converts core-tracing's TracingSpanLink to OpenTelemetry's Link
 *
 * @param spanLinks - The core tracing {@link TracingSpanLink} to convert
 * @returns A set of {@link Link}s
 */
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

/**
 * Converts core-tracing's span attributes to OpenTelemetry attributes.
 *
 * @param spanAttributes - The set of attributes to convert.
 * @returns An {@link SpanAttributes} to set on a span.
 */
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

/**
 * Converts core-tracing span options to OpenTelemetry options.
 *
 * @param spanOptions - The {@link InstrumenterSpanOptions} to convert.
 * @returns An OpenTelemetry {@link SpanOptions} that can be used when creating a span.
 */
export function toSpanOptions(spanOptions: InstrumenterSpanOptions): SpanOptions {
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

/**
 * Creates a traceparent header from a Span's context.
 * @param spanContext - The Span's context.
 * @returns A formatted traceparent header if {@link spanContext} is valid, otherwise undefined.
 *
 * See https://www.w3.org/TR/trace-context/#traceparent-header for more information.
 */
export function toTraceparentHeader(spanContext: TracingSpanContext): string | undefined {
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
  return `${TRACEPARENT_HEADER_VERSION}-${spanContext.traceId}-${spanContext.spanId}-${traceFlags}`;
}

/**
 * Creates a {@link SpanContext} from a valid traceparent header.
 *
 * @param traceparentHeader - The traceparent header.
 * @returns A formatted traceparent header if {@link spanContext} is valid, otherwise undefined.
 *
 * See https://www.w3.org/TR/trace-context/#traceparent-header for more information.
 */
export function fromTraceparentHeader(traceparentHeader: string): SpanContext | undefined {
  const parts = traceparentHeader.split("-");

  if (parts.length !== 4) {
    return;
  }

  const [version, traceId, spanId, traceOptions] = parts;

  if (version !== TRACEPARENT_HEADER_VERSION) {
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

/**
 * Creates a tracestate header from a Span's context.
 *
 *
 * @param spanContext - The Span's context
 * @returns - A serialized tracestate header if {@link spanContext.traceState} is valid, otherwise undefined.
 */
export function toTracestateHeader(spanContext: TracingSpanContext): string | undefined {
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
