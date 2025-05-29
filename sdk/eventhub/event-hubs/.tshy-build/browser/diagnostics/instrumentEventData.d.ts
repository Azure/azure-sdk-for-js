import type { EventData } from "../eventData.js";
import type { TracingContext } from "@azure/core-tracing";
import type { AmqpAnnotatedMessage } from "@azure/core-amqp";
import type { OperationOptions } from "../util/operationOptions.js";
import type { MessagingOperationNames } from "./tracing.js";
/**
 * @internal
 */
export declare const TRACEPARENT_PROPERTY = "Diagnostic-Id";
/**
 * Populates the `EventData` with `SpanContext` info to support trace propagation.
 * Creates and returns a copy of the passed in `EventData` unless the `EventData`
 * has already been instrumented.
 * @param eventData - The `EventData` or `AmqpAnnotatedMessage` to instrument.
 * @param span - The `Span` containing the context to propagate tracing information.
 * @param operation - The type of the operation being performed.
 */
export declare function instrumentEventData(eventData: EventData | AmqpAnnotatedMessage, options: OperationOptions, entityPath: string, host: string, operation?: MessagingOperationNames): {
    event: EventData;
    spanContext: TracingContext | undefined;
};
/**
 * Extracts the `SpanContext` from an `EventData` if the context exists.
 * @param eventData - An individual `EventData` object.
 * @internal
 */
export declare function extractSpanContextFromEventData(eventData: EventData): TracingContext | undefined;
//# sourceMappingURL=instrumentEventData.d.ts.map