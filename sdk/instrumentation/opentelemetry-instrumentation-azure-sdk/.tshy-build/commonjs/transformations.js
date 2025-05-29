"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.toOpenTelemetrySpanKind = toOpenTelemetrySpanKind;
exports.toSpanOptions = toSpanOptions;
const api_1 = require("@opentelemetry/api");
const core_1 = require("@opentelemetry/core");
/**
 * Converts our TracingSpanKind to the corresponding OpenTelemetry SpanKind.
 *
 * By default it will return {@link SpanKind.INTERNAL}
 * @param tracingSpanKind - The core tracing {@link TracingSpanKind}
 * @returns - The OpenTelemetry {@link SpanKind}
 */
function toOpenTelemetrySpanKind(tracingSpanKind) {
    const key = (tracingSpanKind || "internal").toUpperCase();
    return api_1.SpanKind[key];
}
/**
 * Converts core-tracing's TracingSpanLink to OpenTelemetry's Link
 *
 * @param spanLinks - The core tracing {@link TracingSpanLink} to convert
 * @returns A set of {@link Link}s
 */
function toOpenTelemetryLinks(spanLinks = []) {
    return spanLinks.reduce((acc, tracingSpanLink) => {
        const spanContext = api_1.trace.getSpanContext(tracingSpanLink.tracingContext);
        if (spanContext) {
            acc.push({
                context: spanContext,
                attributes: (0, core_1.sanitizeAttributes)(tracingSpanLink.attributes),
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
function toSpanOptions(spanOptions) {
    const { spanAttributes, spanLinks, spanKind } = spanOptions || {};
    const attributes = (0, core_1.sanitizeAttributes)(spanAttributes);
    const kind = toOpenTelemetrySpanKind(spanKind);
    const links = toOpenTelemetryLinks(spanLinks);
    return {
        attributes,
        kind,
        links,
    };
}
//# sourceMappingURL=transformations.js.map