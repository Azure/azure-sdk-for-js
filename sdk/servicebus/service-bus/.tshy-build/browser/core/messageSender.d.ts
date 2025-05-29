import type { AwaitableSender, AwaitableSenderOptions } from "rhea-promise";
import type { RetryOptions, AmqpAnnotatedMessage } from "@azure/core-amqp";
import type { ServiceBusMessage } from "../serviceBusMessage.js";
import type { ConnectionContext } from "../connectionContext.js";
import { LinkEntity } from "./linkEntity.js";
import type { ServiceBusMessageBatch } from "../serviceBusMessageBatch.js";
import type { CreateMessageBatchOptions } from "../models.js";
import type { OperationOptionsBase } from "../modelsToBeSharedWithEventHubs.js";
import type { AbortSignalLike } from "@azure/abort-controller";
/**
 * @internal
 * Describes the MessageSender that will send messages to ServiceBus.
 */
export declare class MessageSender extends LinkEntity<AwaitableSender> {
    private identifier;
    /**
     * The handler function to handle errors that happen on the
     * underlying sender.
     * @readonly
     */
    private readonly _onAmqpError;
    /**
     * The handler function to handle "sender_close" event
     * that happens on the underlying sender.
     * @readonly
     */
    private readonly _onAmqpClose;
    /**
     * The message handler that will be set as the handler on
     * the underlying rhea sender's session for the "session_error" event.
     */
    private _onSessionError;
    /**
     * The message handler that will be set as the handler on
     * the underlying rhea sender's session for the "session_close" event.
     */
    private _onSessionClose;
    private _retryOptions;
    constructor(identifier: string, connectionContext: ConnectionContext, entityPath: string, retryOptions: RetryOptions);
    private _createSenderOptions;
    /**
     * Tries to send the message to ServiceBus if there is enough credit to send them
     * and the circular buffer has available space to settle the message after sending them.
     *
     * We have implemented a synchronous send over here in the sense that we shall be waiting
     * for the message to be accepted or rejected and accordingly resolve or reject the promise.
     *
     * @param encodedMessage - The encoded message to be sent to ServiceBus.
     * @param sendBatch - Boolean indicating whether the encoded message represents a batch of messages or not
     */
    private _trySend;
    protected createRheaLink(options: AwaitableSenderOptions): Promise<AwaitableSender>;
    /**
     * Initializes the sender session on the connection.
     */
    open(options?: AwaitableSenderOptions, abortSignal?: AbortSignalLike): Promise<void>;
    /**
     * Closes the rhea link.
     * To be called when connection is disconnected, onAmqpClose and onSessionClose events.
     */
    onDetached(): Promise<void>;
    /**
     * Determines whether the AMQP sender link is open. If open then returns true else returns false.
     */
    isOpen(): boolean;
    /**
     * Sends the given message, with the given options on this link
     *
     * @param data - Message to send. Will be sent as UTF8-encoded JSON string.
     */
    send(data: ServiceBusMessage | AmqpAnnotatedMessage, options?: OperationOptionsBase): Promise<void>;
    /**
     * Returns maximum message size on the AMQP sender link.
     *
     * Options to configure the `createBatch` method on the `Sender`.
     * - `maxSizeInBytes`: The upper limit for the size of batch.
     *
     * Example usage:
     * ```ts snippet:ignore
     * {
     *     retryOptions: { maxRetries: 5; timeoutInMs: 10 }
     * }
     * ```
     */
    getMaxMessageSize(options?: {
        retryOptions?: RetryOptions;
    } & Pick<OperationOptionsBase, "abortSignal">): Promise<number>;
    createBatch(options?: CreateMessageBatchOptions): Promise<ServiceBusMessageBatch>;
    sendBatch(batchMessage: ServiceBusMessageBatch, options?: OperationOptionsBase): Promise<void>;
    static create(identifier: string, context: ConnectionContext, entityPath: string, retryOptions: RetryOptions): MessageSender;
    protected removeLinkFromContext(): void;
}
//# sourceMappingURL=messageSender.d.ts.map