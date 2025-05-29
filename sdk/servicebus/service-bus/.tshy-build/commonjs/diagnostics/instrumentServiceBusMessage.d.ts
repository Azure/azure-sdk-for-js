import type { TracingContext, TracingSpanOptions } from "@azure/core-tracing";
import type { ConnectionContext } from "../connectionContext.js";
import type { OperationOptionsBase } from "../modelsToBeSharedWithEventHubs.js";
import type { ServiceBusReceiver } from "../receivers/receiver.js";
import type { ServiceBusMessage, ServiceBusReceivedMessage } from "../serviceBusMessage.js";
import type { MessagingOperationNames } from "./tracing.js";
/**
 * @internal
 */
export declare const TRACEPARENT_PROPERTY = "Diagnostic-Id";
/**
 * @hidden
 */
export interface InstrumentableMessage {
    /**
     * The application specific properties which can be
     * used for custom message metadata.
     */
    applicationProperties?: {
        [key: string]: number | boolean | string | Date | null;
    };
}
/**
 * Instruments an AMQP message with a proper `Diagnostic-Id` for tracing.
 *
 * @hidden
 */
export declare function instrumentMessage<T extends InstrumentableMessage>(message: T, options: OperationOptionsBase, entityPath: string, host: string, operation: MessagingOperationNames): {
    /**
     * If instrumentation was done, a copy of the message with
     * message.applicationProperties['Diagnostic-Id'] filled
     * out appropriately.
     */
    message: T;
    /**
     * A valid SpanContext if this message should be linked to a parent span, or undefined otherwise.
     */
    spanContext: TracingContext | undefined;
};
/**
 * Extracts the `SpanContext` from an `ServiceBusMessage` if the context exists.
 * @param message - An individual `ServiceBusMessage` object.
 * @internal
 */
export declare function extractSpanContextFromServiceBusMessage(message: ServiceBusMessage): TracingContext | undefined;
/**
 * @internal
 */
export declare function toProcessingSpanOptions(receivedMessages: ServiceBusReceivedMessage | ServiceBusReceivedMessage[], receiver: Pick<ServiceBusReceiver, "entityPath">, connectionConfig: Pick<ConnectionContext["config"], "host">, operation: MessagingOperationNames): TracingSpanOptions;
//# sourceMappingURL=instrumentServiceBusMessage.d.ts.map