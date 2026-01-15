import type { AmqpAnnotatedMessage } from "@azure/core-amqp";
import type { EventData } from "./eventData.js";
import type { ConnectionContext } from "./connectionContext.js";
import type { OperationTracingOptions, TracingContext } from "@azure/core-tracing";
import type { PartitionPublishingProperties } from "./models/private.js";
/**
 * Checks if the provided eventDataBatch is an instance of `EventDataBatch`.
 * @param eventDataBatch - The instance of `EventDataBatch` to verify.
 * @internal
 */
export declare function isEventDataBatch(eventDataBatch: unknown): eventDataBatch is EventDataBatch;
/**
 * Options to configure the behavior of the `tryAdd` method on the `EventDataBatch` class.
 */
export interface TryAddOptions {
    /**
     * The options to use when creating Spans for tracing.
     */
    tracingOptions?: OperationTracingOptions;
}
/**
 * An interface representing a batch of events which can be used to send events to Event Hub.
 *
 * To create the batch, use the `createBatch()` method on the `EventHubProducerClient`.
 * To send the batch, use the `sendBatch()` method on the same client.
 * To fill the batch, use the `tryAdd()` method on the batch itself.
 *
 */
export interface EventDataBatch {
    /**
     * A value that is hashed and used by the Azure Event Hubs service to determine the partition to
     * which the events are sent. Use the `createBatch()` method on the `EventHubProducerClient` to
     * set the partitionKey.
     * @readonly
     * @internal
     */
    readonly partitionKey?: string;
    /**
     * Id of the partition to which the batch of events are sent. Use the `createBatch()` method on
     * the `EventHubProducerClient` to set the partitionId.
     * @readonly
     * @internal
     */
    readonly partitionId?: string;
    /**
     * Size of the batch in bytes after the events added to it have been encoded into a single AMQP
     * message.
     * @readonly
     */
    readonly sizeInBytes: number;
    /**
     * Number of events added to the batch.
     * @readonly
     */
    readonly count: number;
    /**
     * The maximum size of the batch, in bytes. The `tryAdd` function on the batch will return `false`
     * if the event being added causes the size of the batch to exceed this limit. Use the `createBatch()` method on
     * the `EventHubProducerClient` to set the maxSizeInBytes.
     * @readonly
     */
    readonly maxSizeInBytes: number;
    /**
     * Adds an event to the batch if permitted by the batch's size limit.
     * **NOTE**: Always remember to check the return value of this method, before calling it again
     * for the next event.
     *
     * @param eventData -  An individual event data object or AmqpAnnotatedMessage.
     * @returns A boolean value indicating if the event data has been added to the batch or not.
     */
    tryAdd(eventData: EventData | AmqpAnnotatedMessage, options?: TryAddOptions): boolean;
}
/**
 * An internal class representing a batch of events which can be used to send events to Event Hub.
 *
 * @internal
 */
export declare class EventDataBatchImpl implements EventDataBatch {
    /**
     * Describes the amqp connection context for the Client.
     */
    private _context;
    /**
     * The Id of the partition to which the batch is expected to be sent to.
     * Specifying this will throw an error if the batch was created using a `partitionKey`.
     */
    private _partitionId?;
    /**
     * A value that is hashed to produce a partition assignment.
     * It guarantees that messages with the same partitionKey end up in the same partition.
     * Specifying this will throw an error if the batch was created using a `partitionId`.
     */
    private _partitionKey?;
    /**
     * The maximum size allowed for the batch.
     */
    private _maxSizeInBytes;
    /**
     * Current size of the batch in bytes.
     */
    private _sizeInBytes;
    /**
     * Encoded amqp messages.
     */
    private _encodedMessages;
    /**
     * Number of events in the batch.
     */
    private _count;
    /**
     * List of 'message' span contexts.
     */
    private _spanContexts;
    /**
     * The message annotations to apply on the batch envelope.
     * This will reflect the message annotations on the first event
     * that was added to the batch.
     * A common annotation is the partition key.
     */
    private _batchAnnotations?;
    /**
     * Indicates that the batch should be treated as idempotent.
     */
    private _isIdempotent;
    /**
     * The sequence number assigned to the first event in the batch while
     * the batch is being sent to the service.
     */
    private _pendingStartingSequenceNumber?;
    /**
     * The publishing sequence number assigned to the first event in the batch at the time
     * the batch was successfully published.
     * If the producer was not configured to apply sequence numbering or if the batch
     * has not yet been successfully published, the value will be `undefined`.
     */
    private _startingPublishSequenceNumber?;
    /**
     * EventDataBatch should not be constructed using `new EventDataBatch()`
     * Use the `createBatch()` method on your `EventHubProducer` instead.
     * @internal
     */
    constructor(context: ConnectionContext, maxSizeInBytes: number, isIdempotent: boolean, partitionKey?: string, partitionId?: string);
    /**
     * The maximum size of the batch, in bytes.
     * @readonly
     */
    get maxSizeInBytes(): number;
    /**
     * The partitionKey set during `EventDataBatch` creation. This value is hashed to
     * produce a partition assignment when the producer is created without a `partitionId`
     * @readonly
     */
    get partitionKey(): string | undefined;
    /**
     * The partitionId set during `EventDataBatch` creation.
     * If this value is set then partitionKey can not be set.
     * @readonly
     */
    get partitionId(): string | undefined;
    /**
     * Size of the `EventDataBatch` instance after the events added to it have been
     * encoded into a single AMQP message.
     * @readonly
     */
    get sizeInBytes(): number;
    /**
     * Number of events in the `EventDataBatch` instance.
     * @readonly
     */
    get count(): number;
    /**
     * The publishing sequence number assigned to the first event in the batch at the time
     * the batch was successfully published.
     * If the producer was not configured to apply sequence numbering or if the batch
     * has not yet been successfully published, the value will be `undefined`.
     */
    get startingPublishedSequenceNumber(): number | undefined;
    /**
     * Gets the "message" span contexts that were created when adding events to the batch.
     * @internal
     */
    get _messageSpanContexts(): TracingContext[];
    /**
     * Generates an AMQP message that contains the provided encoded events and annotations.
     * @param encodedEvents - The already encoded events to include in the AMQP batch.
     * @param annotations - The message annotations to set on the batch.
     * @param publishingProps - Idempotent publishing properties used to decorate the events in the batch while sending.
     */
    private _generateBatch;
    /**
     * Uses the publishingProps to add idempotent properties as message annotations to rhea messages.
     */
    private _decorateRheaMessagesWithPublishingProps;
    /**
     * Annotates a rhea message with placeholder idempotent properties if the batch is idempotent.
     * This is necessary so that we can accurately calculate the size of the batch while adding events.
     * Placeholder values are used because real values won't be known until we attempt to send the batch.
     */
    private _decorateRheaMessageWithPlaceholderIdempotencyProps;
    /**
     * Generates the single AMQP message which is the result of encoding all the events
     * added into the `EventDataBatch` instance.
     *
     * This is not meant for the user to use directly.
     *
     * When the `EventDataBatch` instance is passed to the `send()` method on the `EventHubProducer`,
     * this single batched AMQP message is what gets sent over the wire to the service.
     * @readonly
     */
    _generateMessage(publishingProps?: PartitionPublishingProperties): Buffer;
    /**
     * Sets startingPublishSequenceNumber to the pending publish sequence number.
     */
    _commitPublish(): void;
    /**
     * Tries to add an event data to the batch if permitted by the batch's size limit.
     * **NOTE**: Always remember to check the return value of this method, before calling it again
     * for the next event.
     *
     * @param eventData -  An individual event data object.
     * @returns A boolean value indicating if the event data has been added to the batch or not.
     */
    tryAdd(eventData: EventData | AmqpAnnotatedMessage, options?: TryAddOptions): boolean;
}
//# sourceMappingURL=eventDataBatch.d.ts.map