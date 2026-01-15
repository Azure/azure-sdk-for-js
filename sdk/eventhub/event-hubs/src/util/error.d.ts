import type { ConnectionContext } from "../connectionContext.js";
import type { AmqpError } from "rhea-promise";
import type { MessagingError } from "@azure/core-amqp";
/**
 * @internal
 * Logs and throws Error if the current AMQP connection is closed.
 * @param context - The ConnectionContext associated with the current AMQP connection.
 */
export declare function throwErrorIfConnectionClosed(context: ConnectionContext): void;
/**
 * @internal
 * Logs and Throws TypeError if given parameter is undefined or null
 * @param connectionId - Id of the underlying AMQP connection used for logging
 * @param methodName - Name of the method that was passed the parameter
 * @param parameterName - Name of the parameter to check
 * @param parameterValue - Value of the parameter to check
 */
export declare function throwTypeErrorIfParameterMissing(connectionId: string, methodName: string, parameterName: string, parameterValue: unknown): void;
/**
 * @internal
 */
export declare function translateError(err: AmqpError | Error): MessagingError | Error;
/**
 * @internal
 */
export declare const idempotentAlreadyPublished = "These events have already been successfully published. When idempotent publishing is enabled, events that were acknowledged by the Event Hubs service may not be published again.";
/**
 * @internal
 */
export declare const idempotentSomeAlreadyPublished = "1 or more of these events have already been successfully published. When idempotent publishing is enabled, events that were acknowledged by the Event Hubs service may not be published again.";
/**
 * @internal
 */
export declare function validateProducerPartitionSettings({ enableIdempotentRetries, partitionId, partitionKey, }: {
    enableIdempotentRetries?: boolean;
    partitionId?: string;
    partitionKey?: string;
}): void;
//# sourceMappingURL=error.d.ts.map