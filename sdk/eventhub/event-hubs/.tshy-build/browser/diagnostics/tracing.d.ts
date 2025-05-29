import type { TracingSpanOptions, TracingSpanKind } from "@azure/core-tracing";
import type { EventHubConnectionConfig } from "../eventhubConnectionConfig.js";
/**
 * The names of the operations that can be instrumented.
 */
export type MessagingOperationNames = "publish" | "receive" | "process";
/**
 * The {@link TracingClient} that is used to add tracing spans.
 */
export declare const tracingClient: import("@azure/core-tracing").TracingClient;
/**
 * Creates {@link TracingSpanOptions} from the provided data.
 * @param eventHubConfig - The configuration object containing initial attributes to set on the span.
 * @param spanKind - The {@link TracingSpanKind} for the newly created span.
 * @param operation - The operation type.
 * @returns a {@link TracingSpanOptions} that can be passed to a {@link TracingClient}
 */
export declare function toSpanOptions(eventHubConfig: Pick<EventHubConnectionConfig, "entityPath" | "host">, operation?: MessagingOperationNames, spanKind?: TracingSpanKind): TracingSpanOptions;
//# sourceMappingURL=tracing.d.ts.map