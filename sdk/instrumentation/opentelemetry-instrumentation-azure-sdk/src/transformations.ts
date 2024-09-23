// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { InstrumenterSpanOptions, TracingSpanKind, TracingSpanLink } from "@azure/core-tracing";
import { Link, SpanKind, SpanOptions, trace } from "@opentelemetry/api";
import { sanitizeAttributes } from "@opentelemetry/core";

/**
 * Converts our TracingSpanKind to the corresponding OpenTelemetry SpanKind.
 *
 * By default it will return {@link SpanKind.INTERNAL}
 * @param tracingSpanKind - The core tracing {@link TracingSpanKind}
 * @returns - The OpenTelemetry {@link SpanKind}
 */
export function toOpenTelemetrySpanKind<K extends TracingSpanKind>(
  tracingSpanKind?: K,
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
  return spanLinks.reduce((acc, tracingSpanLink) => {
    const spanContext = trace.getSpanContext(tracingSpanLink.tracingContext);
    if (spanContext) {
      acc.push({
        context: spanContext,
        attributes: sanitizeAttributes(tracingSpanLink.attributes),
      });
    }
    return acc;
  }, [] as Link[]);
}

/**
 * Converts core-tracing span options to OpenTelemetry options.
 *
 * @param spanOptions - The {@link InstrumenterSpanOptions} to convert.
 * @returns An OpenTelemetry {@link SpanOptions} that can be used when creating a span.
 */
export function toSpanOptions(spanOptions?: InstrumenterSpanOptions): SpanOptions {
  const { spanAttributes, spanLinks, spanKind } = spanOptions || {};

  const attributes = sanitizeAttributes(spanAttributes);
  const kind = toOpenTelemetrySpanKind(spanKind);
  const links = toOpenTelemetryLinks(spanLinks);

  return {
    attributes,
    kind,
    links,
  };
}
