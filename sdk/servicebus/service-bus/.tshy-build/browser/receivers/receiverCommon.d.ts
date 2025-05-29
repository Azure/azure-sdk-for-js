import type { MessageHandlers } from "../models.js";
import type { ServiceBusReceiver } from "./receiver.js";
import type { OperationOptionsBase } from "../modelsToBeSharedWithEventHubs.js";
import type { createServiceBusLogger, ServiceBusLogger } from "../log.js";
import type { DeadLetterOptions, ServiceBusMessageImpl, ServiceBusReceivedMessage } from "../serviceBusMessage.js";
import { DispositionType } from "../serviceBusMessage.js";
import type { DispositionStatusOptions } from "../core/managementClient.js";
import type { ConnectionContext } from "../connectionContext.js";
import type { RetryConfig, RetryOptions } from "@azure/core-amqp";
import { retry } from "@azure/core-amqp";
/**
 * @internal
 */
export declare function assertValidMessageHandlers(handlers: {
    processMessage?: unknown;
    processError?: unknown;
}): void;
/**
 * @internal
 */
export declare function getMessageIterator(receiver: Pick<ServiceBusReceiver, "receiveMessages">, options?: OperationOptionsBase): AsyncIterableIterator<ServiceBusReceivedMessage>;
/**
 * @internal
 */
export declare function wrapProcessErrorHandler(handlers: Pick<MessageHandlers, "processError">, loggerParam?: ServiceBusLogger): MessageHandlers["processError"];
/**
 * @internal
 *
 */
export declare function completeMessage(message: ServiceBusMessageImpl, context: ConnectionContext, entityPath: string, retryOptions: RetryOptions | undefined): Promise<void>;
/**
 * @internal
 *
 */
export declare function abandonMessage(message: ServiceBusMessageImpl, context: ConnectionContext, entityPath: string, propertiesToModify: {
    [key: string]: number | boolean | string | Date | null;
} | undefined, retryOptions: RetryOptions | undefined): Promise<void>;
/**
 * @internal
 *
 */
export declare function deferMessage(message: ServiceBusMessageImpl, context: ConnectionContext, entityPath: string, propertiesToModify: {
    [key: string]: number | boolean | string | Date | null;
} | undefined, retryOptions: RetryOptions | undefined): Promise<void>;
/**
 * @internal
 *
 */
export declare function deadLetterMessage(message: ServiceBusMessageImpl, context: ConnectionContext, entityPath: string, propertiesToModify: (DeadLetterOptions & {
    [key: string]: number | boolean | string | Date | null;
}) | undefined, retryOptions: RetryOptions | undefined): Promise<void>;
/**
 * @internal
 */
export declare function settleMessage(message: ServiceBusMessageImpl, operation: DispositionType, context: ConnectionContext, entityPath: string, options: DispositionStatusOptions, _settleMessageOperation?: typeof settleMessageOperation): Promise<void>;
/**
 * @internal
 *
 * NOTE: it's tempting to make this method non-async. However, doing so makes it too easy
 * to throw exceptions that will not be "catchable" by people chaining to the returned Promise
 * since we can throw exceptions outside of the Promise's scope.
 */
export declare function settleMessageOperation(message: ServiceBusMessageImpl, operation: DispositionType, context: ConnectionContext, entityPath: string, options: DispositionStatusOptions): Promise<void>;
/** @internal */
export interface RetryForeverArgs<T> {
    retryConfig: RetryConfig<T>;
    onError: (err: Error) => void;
    logger: ReturnType<typeof createServiceBusLogger>;
    logPrefix: string;
}
/**
 * Retry infinitely until success, reporting in between retry attempts.
 *
 * This function will only stop retrying if:
 * - args.retryConfig.operation resolves successfully
 * - args.retryConfig.operation rejects with an `AbortError`
 *
 * @internal
 */
export declare function retryForever<T>(args: RetryForeverArgs<T>, retryFn?: typeof retry): Promise<T>;
//# sourceMappingURL=receiverCommon.d.ts.map