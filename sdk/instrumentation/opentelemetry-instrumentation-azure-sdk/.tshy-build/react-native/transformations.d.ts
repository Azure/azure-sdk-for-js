import type { InstrumenterSpanOptions, TracingSpanKind } from "@azure/core-tracing";
import type { SpanOptions } from "@opentelemetry/api";
import { SpanKind } from "@opentelemetry/api";
/**
 * Converts our TracingSpanKind to the corresponding OpenTelemetry SpanKind.
 *
 * By default it will return {@link SpanKind.INTERNAL}
 * @param tracingSpanKind - The core tracing {@link TracingSpanKind}
 * @returns - The OpenTelemetry {@link SpanKind}
 */
export declare function toOpenTelemetrySpanKind<K extends TracingSpanKind>(tracingSpanKind?: K): SpanKindMapping[K];
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
 * Converts core-tracing span options to OpenTelemetry options.
 *
 * @param spanOptions - The {@link InstrumenterSpanOptions} to convert.
 * @returns An OpenTelemetry {@link SpanOptions} that can be used when creating a span.
 */
export declare function toSpanOptions(spanOptions?: InstrumenterSpanOptions): SpanOptions;
export {};
//# sourceMappingURL=transformations.d.ts.map