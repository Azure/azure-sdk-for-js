// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { SpanKind, trace } from "@opentelemetry/api";
import { sanitizeAttributes } from "@opentelemetry/core";
/**
 * Converts our TracingSpanKind to the corresponding OpenTelemetry SpanKind.
 *
 * By default it will return {@link SpanKind.INTERNAL}
 * @param tracingSpanKind - The core tracing {@link TracingSpanKind}
 * @returns - The OpenTelemetry {@link SpanKind}
 */
export function toOpenTelemetrySpanKind(tracingSpanKind) {
    const key = (tracingSpanKind || "internal").toUpperCase();
    return SpanKind[key];
}
/**
 * Converts core-tracing's TracingSpanLink to OpenTelemetry's Link
 *
 * @param spanLinks - The core tracing {@link TracingSpanLink} to convert
 * @returns A set of {@link Link}s
 */
function toOpenTelemetryLinks(spanLinks = []) {
    return spanLinks.reduce((acc, tracingSpanLink) => {
        const spanContext = trace.getSpanContext(tracingSpanLink.tracingContext);
        if (spanContext) {
            acc.push({
                context: spanContext,
                attributes: sanitizeAttributes(tracingSpanLink.attributes),
            });
        }
        return acc;
    }, []);
}
/**
 * Converts core-tracing span options to OpenTelemetry options.
 *
 * @param spanOptions - The {@link InstrumenterSpanOptions} to convert.
 * @returns An OpenTelemetry {@link SpanOptions} that can be used when creating a span.
 */
export function toSpanOptions(spanOptions) {
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
//# sourceMappingURL=transformations.js.map