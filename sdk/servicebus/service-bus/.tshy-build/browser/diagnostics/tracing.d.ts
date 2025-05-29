import type { TracingSpanOptions, TracingSpanKind } from "@azure/core-tracing";
import type { ConnectionConfig } from "@azure/core-amqp";
/**
 * The names of the operations that can be instrumented.
 */
export type MessagingOperationNames = "publish" | "receive" | "process" | "settle";
/**
 * The {@link TracingClient} that is used to add tracing spans.
 */
export declare const tracingClient: import("@azure/core-tracing").TracingClient;
/**
 * Creates {@link TracingSpanOptions} from the provided data.
 * @param serviceBusConfig - The configuration object containing initial attributes to set on the span.
 * @param spanKind - The {@link TracingSpanKind} for the newly created span.
 * @param operation - The operation type.
 * @returns a {@link TracingSpanOptions} that can be passed to a {@link TracingClient}
 */
export declare function toSpanOptions(serviceBusConfig: Pick<ConnectionConfig, "host"> & {
    entityPath: string;
}, operation: MessagingOperationNames, spanKind?: TracingSpanKind): TracingSpanOptions;
//# sourceMappingURL=tracing.d.ts.map