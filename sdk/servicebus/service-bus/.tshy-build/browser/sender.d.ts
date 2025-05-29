import type Long from "long";
import type { ServiceBusMessage } from "./serviceBusMessage.js";
import type { ConnectionContext } from "./connectionContext.js";
import type { ServiceBusMessageBatch } from "./serviceBusMessageBatch.js";
import type { CreateMessageBatchOptions } from "./models.js";
import type { RetryOptions, AmqpAnnotatedMessage } from "@azure/core-amqp";
import type { OperationOptionsBase } from "./modelsToBeSharedWithEventHubs.js";
/**
 * A Sender can be used to send messages, schedule messages to be sent at a later time
 * and cancel such scheduled messages.
 * Use the `createSender` function on the ServiceBusClient to instantiate a Sender.
 * The Sender class is an abstraction over the underlying AMQP sender link.
 */
export interface ServiceBusSender {
    /**
     * A name used to identify the sender. This can be used to correlate logs and exceptions.
     * If not specified or empty, a random unique one will be generated.
     */
    identifier: string;
    /**
     * Sends the given messages after creating an AMQP Sender link if it doesn't already exist.
     *
     * - To send messages to a `session` and/or `partition` enabled Queue/Topic, set the `sessionId`
     * and/or `partitionKey` properties respectively on the messages.
     * - All messages passed to the same sendMessages() call should have the same `sessionId` (if using
     *  sessions) and the same `partitionKey` (if using partitions).
     *
     * **Note:**
     *
     *    __If you want to send messages of size greater than 1MB, please send individual messages instead of sending a batched message or an array of messages like below.__
     *
     *  `await sender.sendMessages(message);`
     *
     * __This is because the batched messages are not capable of sending the larger messages yet. You'll hit the `force detached` error in this case otherwise. Read [service-bus-premium-messaging#large-messages-support](https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-premium-messaging#large-messages-support). More info at [#23014](https://github.com/Azure/azure-sdk-for-js/pull/23014).__
     *
     * @param messages - A single message or an array of messages or a batch of messages created via the createBatch()
     * method to send.
     * @param options - Options bag to pass an abort signal or tracing options.
     * @throws `ServiceBusError` with the code `MessageSizeExceeded` if the provided messages do not fit in a single `ServiceBusMessageBatch`.
     * @throws Error if the underlying connection, client or sender is closed.
     * @throws `ServiceBusError` if the service returns an error while sending messages to the service.
     */
    sendMessages(messages: ServiceBusMessage | ServiceBusMessage[] | ServiceBusMessageBatch | AmqpAnnotatedMessage | AmqpAnnotatedMessage[], options?: OperationOptionsBase): Promise<void>;
    /**
     * Creates an instance of `ServiceBusMessageBatch` to which one can add messages until the maximum supported size is reached.
     * The batch can be passed to the {@link send} method to send the messages to Azure Service Bus.
     * @param options - Configures the behavior of the batch.
     * - `maxSizeInBytes`: The upper limit for the size of batch. The `tryAdd` function will return `false` after this limit is reached.
     *
     * @throws `ServiceBusError` if an error is encountered while sending a message.
     * @throws Error if the underlying connection or sender has been closed.
     */
    createMessageBatch(options?: CreateMessageBatchOptions): Promise<ServiceBusMessageBatch>;
    /**
     * Returns `true` if either the sender or the client that created it has been closed.
     * @readonly
     */
    isClosed: boolean;
    /**
     * Schedules given messages to appear on Service Bus Queue/Subscription at a later time.
     *
     * @param messages - Message or an array of messages that need to be scheduled.
     * @param scheduledEnqueueTimeUtc - The UTC time at which the messages should be enqueued.
     * @param options - Options bag to pass an abort signal or tracing options.
     * @returns The sequence numbers of messages that were scheduled.
     * You will need the sequence number if you intend to cancel the scheduling of the messages.
     * Save the `Long` type as-is in your application without converting to number. Since JavaScript
     * only supports 53 bit numbers, converting the `Long` to number will cause loss in precision.
     * @throws Error if the underlying connection, client or sender is closed.
     * @throws `ServiceBusError` if the service returns an error while scheduling messages.
     */
    scheduleMessages(messages: ServiceBusMessage | ServiceBusMessage[] | AmqpAnnotatedMessage | AmqpAnnotatedMessage[], scheduledEnqueueTimeUtc: Date, options?: OperationOptionsBase): Promise<Long[]>;
    /**
     * Cancels multiple messages that were scheduled to appear on a ServiceBus Queue/Subscription.
     * @param sequenceNumbers - Sequence number or an array of sequence numbers of the messages to be cancelled.
     * @param options - Options bag to pass an abort signal or tracing options.
     * @throws Error if the underlying connection, client or sender is closed.
     * @throws `ServiceBusError` if the service returns an error while canceling scheduled messages.
     */
    cancelScheduledMessages(sequenceNumbers: Long | Long[], options?: OperationOptionsBase): Promise<void>;
    /**
     * Path of the entity for which the sender has been created.
     */
    entityPath: string;
    /**
     * Closes the underlying AMQP sender link.
     * Once closed, the sender cannot be used for any further operations.
     * Use the `createSender` function on the QueueClient or TopicClient to instantiate a new Sender
     *
     */
    close(): Promise<void>;
}
/**
 * @internal
 */
export declare class ServiceBusSenderImpl implements ServiceBusSender {
    private _context;
    private _entityPath;
    identifier: string;
    private _retryOptions;
    /**
     * Denotes if close() was called on this sender
     */
    private _isClosed;
    private _sender;
    entityPath: string;
    private get logPrefix();
    /**
     * @internal
     * @throws Error if the underlying connection is closed.
     */
    constructor(_context: ConnectionContext, _entityPath: string, retryOptions?: RetryOptions, identifier?: string);
    private _throwIfSenderOrConnectionClosed;
    get isClosed(): boolean;
    sendMessages(messages: ServiceBusMessage | ServiceBusMessage[] | ServiceBusMessageBatch | AmqpAnnotatedMessage | AmqpAnnotatedMessage[], options?: OperationOptionsBase): Promise<void>;
    createMessageBatch(options?: CreateMessageBatchOptions): Promise<ServiceBusMessageBatch>;
    scheduleMessages(messages: ServiceBusMessage | ServiceBusMessage[] | AmqpAnnotatedMessage | AmqpAnnotatedMessage[], scheduledEnqueueTimeUtc: Date, options?: OperationOptionsBase): Promise<Long[]>;
    cancelScheduledMessages(sequenceNumbers: Long | Long[], options?: OperationOptionsBase): Promise<void>;
    close(): Promise<void>;
}
/**
 * @internal
 */
export declare function isServiceBusMessageBatch(messageBatchOrAnything: unknown): messageBatchOrAnything is ServiceBusMessageBatch;
//# sourceMappingURL=sender.d.ts.map