// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { InstrumenterSpanOptions, TracingSpanKind, TracingSpanLink } from "@azure/core-tracing";
import {
  Link,
  SpanAttributeValue,
  SpanAttributes,
  SpanKind,
  SpanOptions,
  trace,
} from "@opentelemetry/api";

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
  return spanLinks.reduce((acc, tracingSpanLink) => {
    const spanContext = trace.getSpanContext(tracingSpanLink.tracingContext);
    if (spanContext) {
      acc.push({
        context: spanContext,
        attributes: toOpenTelemetrySpanAttributes(tracingSpanLink.attributes),
      });
    }
    return acc;
  }, [] as Link[]);
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
export function toSpanOptions(spanOptions?: InstrumenterSpanOptions): SpanOptions {
  const { spanAttributes, spanLinks, spanKind } = spanOptions || {};

  const attributes: SpanAttributes = toOpenTelemetrySpanAttributes(spanAttributes);
  const kind = toOpenTelemetrySpanKind(spanKind);
  const links = toOpenTelemetryLinks(spanLinks);

  return {
    attributes,
    kind,
    links,
  };
}
