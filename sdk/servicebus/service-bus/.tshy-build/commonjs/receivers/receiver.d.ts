import type { PeekMessagesOptions, GetMessageIteratorOptions, MessageHandlers, ReceiveMessagesOptions, SubscribeOptions, DeleteMessagesOptions, PurgeMessagesOptions } from "../models.js";
import type { OperationOptionsBase } from "../modelsToBeSharedWithEventHubs.js";
import type { ServiceBusReceivedMessage } from "../serviceBusMessage.js";
import type { ConnectionContext } from "../connectionContext.js";
import type Long from "long";
import type { DeadLetterOptions } from "../serviceBusMessage.js";
import type { RetryOptions } from "@azure/core-amqp";
/**
 * The default time to wait for messages _after_ the first message
 * has been received.
 *
 * This timeout only applies to receiveMessages()
 *
 * @internal
 */
export declare const defaultMaxTimeAfterFirstMessageForBatchingMs = 1000;
/**
 * The maximum number of messages to delete in a single batch.  This cap is established and enforced by the service.
 * @internal
 */
export declare const MaxDeleteMessageCount = 4000;
/**
 * A receiver that does not handle sessions.
 */
export interface ServiceBusReceiver {
    /**
     * A name used to identify the receiver. This can be used to correlate logs and exceptions.
     * If not specified or empty, a random unique one will be generated.
     */
    identifier: string;
    /**
     * Streams messages to message handlers.
     * @param handlers - A handler that gets called for messages and errors.
     * @param options - Options for subscribe.
     * @returns An object that can be closed, sending any remaining messages to `handlers` and
     * stopping new messages from arriving.
     */
    subscribe(handlers: MessageHandlers, options?: SubscribeOptions): {
        /**
         * Causes the subscriber to stop receiving new messages.
         */
        close(): Promise<void>;
    };
    /**
     * Returns an iterator that can be used to receive messages from Service Bus.
     *
     * @param options - A set of options to control the receive operation.
     * - `abortSignal`: The signal to use to abort the ongoing operation.
     *
     * @throws Error if the underlying connection, client or receiver is closed.
     * @throws Error if current receiver is already in state of receiving messages.
     * @throws `ServiceBusError` if the service returns an error while receiving messages.
     */
    getMessageIterator(options?: GetMessageIteratorOptions): AsyncIterableIterator<ServiceBusReceivedMessage>;
    /**
     * Returns a promise that resolves to an array of messages received from Service Bus.
     *
     * @param maxMessageCount - The maximum number of messages to receive.
     * @param options - A set of options to control the receive operation.
     * - `maxWaitTimeInMs`: The maximum time to wait for the first message before returning an empty array if no messages are available.
     * - `abortSignal`: The signal to use to abort the ongoing operation.
     * @returns A promise that resolves with an array of messages.
     * @throws Error if the underlying connection, client or receiver is closed.
     * @throws Error if current receiver is already in state of receiving messages.
     * @throws `ServiceBusError` if the service returns an error while receiving messages.
     */
    receiveMessages(maxMessageCount: number, options?: ReceiveMessagesOptions): Promise<ServiceBusReceivedMessage[]>;
    /**
     * Returns a promise that resolves to an array of deferred messages identified by given `sequenceNumbers`.
     * @param sequenceNumbers - The sequence number or an array of sequence numbers for the messages that need to be received.
     * @param options - Options bag to pass an abort signal or tracing options.
     * @returns A list of messages identified by the given sequenceNumbers or an empty list if no messages are found.
     * @throws Error if the underlying connection or receiver is closed.
     * @throws `ServiceBusError` if the service returns an error while receiving deferred messages.
     */
    receiveDeferredMessages(sequenceNumbers: Long | Long[], options?: OperationOptionsBase): Promise<ServiceBusReceivedMessage[]>;
    /**
     * Peek the next batch of active messages (including deferred but not deadlettered messages) on the
     * queue or subscription without modifying them.
     * - The first call to `peekMessages()` fetches the first active message. Each subsequent call fetches the
     * subsequent message.
     * - Unlike a "received" message, "peeked" message is a read-only version of the message.
     * It cannot be `Completed/Abandoned/Deferred/Deadlettered`.
     * @param maxMessageCount - The maximum number of messages to peek.
     * @param options - Options that allow to specify the maximum number of messages to peek,
     * the sequenceNumber to start peeking from or an abortSignal to abort the operation.
     */
    peekMessages(maxMessageCount: number, options?: PeekMessagesOptions): Promise<ServiceBusReceivedMessage[]>;
    /**
     * Delete messages. If no option is specified, all messages will be deleted.
     *
     * @param options - Options to configure the operation.
     * @returns number of messages that have been deleted.
     */
    deleteMessages(options: DeleteMessagesOptions): Promise<number>;
    /**
     * Attempts to purge all messages from an entity.  Locked messages are not eligible for removal and
     * will remain in the entity.
     *
     * @param options - Options that allow to specify the cutoff time for deletion. Only messages that were enqueued
     *                  before this time will be deleted.  If not specified, current time will be used.
     * @returns number of messages deleted.
     */
    purgeMessages(options?: PurgeMessagesOptions): Promise<number>;
    /**
     * Path of the entity for which the receiver has been created.
     */
    entityPath: string;
    /**
     * The receive mode used to create the receiver.
     */
    receiveMode: "peekLock" | "receiveAndDelete";
    /**
     * Returns `true` if either the receiver or the client that created it has been closed.
     * @readonly
     */
    isClosed: boolean;
    /**
     * Closes the receiver.
     * Once closed, the receiver cannot be used for any further operations.
     * Use the `createReceiver()` method on the ServiceBusClient to create a new Receiver.
     */
    close(): Promise<void>;
    /**
     * Removes the message from Service Bus.
     *
     * @throws Error with name `SessionLockLostError` (for messages from a Queue/Subscription with sessions enabled)
     * if the AMQP link with which the message was received is no longer alive. This can
     * happen either because the lock on the session expired or the receiver was explicitly closed by
     * the user or the AMQP link is closed by the library due to network loss or service error.
     * @throws Error with name `MessageLockLostError` (for messages from a Queue/Subscription with sessions not enabled)
     * if the lock on the message has expired or the AMQP link with which the message was received is
     * no longer alive. The latter can happen if the receiver was explicitly closed by the user or the
     * AMQP link got closed by the library due to network loss or service error.
     * @throws Error if the message is already settled.
     * property on the message if you are not sure whether the message is settled.
     * @throws Error if used in `receiveAndDelete` mode because all messages received in this mode
     * are pre-settled. To avoid this error, update your code to not settle a message which is received
     * in this mode.
     * @throws Error with name `ServiceUnavailableError` if Service Bus does not acknowledge the request to settle
     * the message in time. The message may or may not have been settled successfully.
     */
    completeMessage(message: ServiceBusReceivedMessage): Promise<void>;
    /**
     * The lock held on the message by the receiver is let go, making the message available again in
     * Service Bus for another receive operation.
     *
     * @throws `ServiceBusError` with the code `SessionLockLost` (for messages from a Queue/Subscription with sessions enabled)
     * if the AMQP link with which the message was received is no longer alive. This can
     * happen either because the lock on the session expired or the receiver was explicitly closed by
     * the user or the AMQP link is closed by the library due to network loss or service error.
     * @throws `ServiceBusError` with the code `MessageLockLost` (for messages from a Queue/Subscription with sessions not enabled)
     * if the lock on the message has expired or the AMQP link with which the message was received is
     * no longer alive. The latter can happen if the receiver was explicitly closed by the user or the
     * AMQP link got closed by the library due to network loss or service error.
     * @throws Error if the message is already settled.
     * property on the message if you are not sure whether the message is settled.
     * @throws Error if used in `receiveAndDelete` mode because all messages received in this mode
     * are pre-settled. To avoid this error, update your code to not settle a message which is received
     * in this mode.
     * @throws `ServiceBusError` with the code `ServiceTimeout` if Service Bus does not acknowledge the request to settle
     * the message in time. The message may or may not have been settled successfully.
     *
     * @param propertiesToModify - The properties of the message to modify while abandoning the message.
     */
    abandonMessage(message: ServiceBusReceivedMessage, propertiesToModify?: {
        [key: string]: number | boolean | string | Date | null;
    }): Promise<void>;
    /**
     * Defers the processing of the message. Save the `sequenceNumber` of the message, in order to
     * receive it message again in the future using the `receiveDeferredMessage` method.
     *
     * @throws `ServiceBusError` with the code `SessionLockLost` (for messages from a Queue/Subscription with sessions enabled)
     * if the AMQP link with which the message was received is no longer alive. This can
     * happen either because the lock on the session expired or the receiver was explicitly closed by
     * the user or the AMQP link is closed by the library due to network loss or service error.
     * @throws `ServiceBusError` with the code `MessageLockLost` (for messages from a Queue/Subscription with sessions not enabled)
     * if the lock on the message has expired or the AMQP link with which the message was received is
     * no longer alive. The latter can happen if the receiver was explicitly closed by the user or the
     * AMQP link got closed by the library due to network loss or service error.
     * @throws Error if the message is already settled.
     * property on the message if you are not sure whether the message is settled.
     * @throws Error if used in `receiveAndDelete` mode because all messages received in this mode
     * are pre-settled. To avoid this error, update your code to not settle a message which is received
     * in this mode.
     * @throws `ServiceBusError` with the code `ServiceTimeout` if Service Bus does not acknowledge the request to settle
     * the message in time. The message may or may not have been settled successfully.
     *
     * @param propertiesToModify - The properties of the message to modify while deferring the message
     */
    deferMessage(message: ServiceBusReceivedMessage, propertiesToModify?: {
        [key: string]: number | boolean | string | Date | null;
    }): Promise<void>;
    /**
     * Moves the message to the deadletter sub-queue. To receive a deadletted message, create a new
     * QueueClient/SubscriptionClient using the path for the deadletter sub-queue.
     *
     * @throws `ServiceBusError` with the code `SessionLockLost` (for messages from a Queue/Subscription with sessions enabled)
     * if the AMQP link with which the message was received is no longer alive. This can
     * happen either because the lock on the session expired or the receiver was explicitly closed by
     * the user or the AMQP link is closed by the library due to network loss or service error.
     * @throws `ServiceBusError` with the code `MessageLockLost` (for messages from a Queue/Subscription with sessions not enabled)
     * if the lock on the message has expired or the AMQP link with which the message was received is
     * no longer alive. The latter can happen if the receiver was explicitly closed by the user or the
     * AMQP link got closed by the library due to network loss or service error.
     * @throws Error if the message is already settled.
     * property on the message if you are not sure whether the message is settled.
     * @throws Error if used in `receiveAndDelete` mode because all messages received in this mode
     * are pre-settled. To avoid this error, update your code to not settle a message which is received
     * in this mode.
     * @throws `ServiceBusError` with the code `ServiceTimeout` if Service Bus does not acknowledge the request to settle
     * the message in time. The message may or may not have been settled successfully.
     *
     * @param options - The DeadLetter options that can be provided while
     * rejecting the message.
     */
    deadLetterMessage(message: ServiceBusReceivedMessage, options?: DeadLetterOptions & {
        [key: string]: number | boolean | string | Date | null;
    }): Promise<void>;
    /**
     * Renews the lock on the message for the duration as specified during the Queue/Subscription
     * creation.
     * - Check the `lockedUntilUtc` property on the message for the time when the lock expires.
     * - If a message is not settled (using either `complete()`, `defer()` or `deadletter()`,
     * before its lock expires, then the message lands back in the Queue/Subscription for the next
     * receive operation.
     *
     * @returns New lock token expiry date and time in UTC format.
     * @throws Error if the underlying connection, client or receiver is closed.
     * @throws ServiceBusError if the service returns an error while renewing message lock.
     */
    renewMessageLock(message: ServiceBusReceivedMessage): Promise<Date>;
}
/**
 * @internal
 */
export declare class ServiceBusReceiverImpl implements ServiceBusReceiver {
    private _context;
    entityPath: string;
    receiveMode: "peekLock" | "receiveAndDelete";
    private skipParsingBodyAsJson;
    private skipConvertingDate;
    identifier: string;
    private _retryOptions;
    /**
     * Denotes if close() was called on this receiver
     */
    private _isClosed;
    /**
     * Instance of the BatchingReceiver class to use to receive messages in pull mode.
     */
    private _batchingReceiver?;
    /**
     * Instance of the StreamingReceiver class to use to receive messages in push mode.
     */
    private _streamingReceiver?;
    private _lockRenewer;
    private get logPrefix();
    /**
     * @throws Error if the underlying connection is closed.
     */
    constructor(_context: ConnectionContext, entityPath: string, receiveMode: "peekLock" | "receiveAndDelete", maxAutoRenewLockDurationInMs: number, skipParsingBodyAsJson: boolean, skipConvertingDate?: boolean, retryOptions?: RetryOptions, identifier?: string);
    private _throwIfAlreadyReceiving;
    private _throwIfReceiverOrConnectionClosed;
    get isClosed(): boolean;
    receiveMessages(maxMessageCount: number, options?: ReceiveMessagesOptions): Promise<ServiceBusReceivedMessage[]>;
    getMessageIterator(options?: GetMessageIteratorOptions): AsyncIterableIterator<ServiceBusReceivedMessage>;
    receiveDeferredMessages(sequenceNumbers: Long | Long[], options?: OperationOptionsBase): Promise<ServiceBusReceivedMessage[]>;
    deleteMessages(options: DeleteMessagesOptions): Promise<number>;
    purgeMessages(options?: PurgeMessagesOptions): Promise<number>;
    peekMessages(maxMessageCount: number, options?: PeekMessagesOptions): Promise<ServiceBusReceivedMessage[]>;
    subscribe(handlers: MessageHandlers, options?: SubscribeOptions): {
        close(): Promise<void>;
    };
    completeMessage(message: ServiceBusReceivedMessage): Promise<void>;
    abandonMessage(message: ServiceBusReceivedMessage, propertiesToModify?: {
        [key: string]: number | boolean | string | Date | null;
    }): Promise<void>;
    deferMessage(message: ServiceBusReceivedMessage, propertiesToModify?: {
        [key: string]: number | boolean | string | Date | null;
    }): Promise<void>;
    deadLetterMessage(message: ServiceBusReceivedMessage, options?: DeadLetterOptions & {
        [key: string]: number | boolean | string | Date | null;
    }): Promise<void>;
    renewMessageLock(message: ServiceBusReceivedMessage): Promise<Date>;
    close(): Promise<void>;
    /**
     * Indicates whether the receiver is currently receiving messages or not.
     * When this returns true, new `registerMessageHandler()` or `receiveMessages()` calls cannot be made.
     */
    private _isReceivingMessages;
    private _createBatchingReceiver;
    /**
     * Helper function to retrieve any active receiver name, regardless of streaming or
     * batching if it exists. This is used for optimization on the service side
     */
    private _getAssociatedReceiverName;
}
//# sourceMappingURL=receiver.d.ts.map