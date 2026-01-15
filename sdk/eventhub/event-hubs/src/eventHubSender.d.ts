import type { RetryOptions } from "@azure/core-amqp";
import type { EventData } from "./eventData.js";
import type { EventDataBatch } from "./eventDataBatch.js";
import type { AbortSignalLike } from "@azure/abort-controller";
import type { ConnectionContext } from "./connectionContext.js";
import type { EventHubProducerOptions, IdempotentLinkProperties } from "./models/private.js";
import type { SendOptions } from "./models/public.js";
import type { PartitionPublishingOptions, PartitionPublishingProperties } from "./models/private.js";
/**
 * @internal
 */
export interface EventHubSenderOptions {
    /**
     * Indicates whether or not the sender should enable idempotent publishing to Event Hub partitions.
     */
    enableIdempotentProducer: boolean;
    /**
     * The EventHub partition id to which the sender wants to send the event data.
     */
    partitionId?: string;
    /**
     * The set of options that can be specified to influence publishing behavior
     * specific to a partition.
     */
    partitionPublishingOptions?: PartitionPublishingOptions;
}
/**
 * Describes the EventHubSender that will send event data to EventHub.
 * @internal
 */
export declare class EventHubSender {
    /**
     * The unique lock name per connection that is used to acquire the
     * lock for establishing a sender link by an entity on that connection.
     */
    private readonly senderLock;
    /**
     * The handler function to handle errors that happen on the
     * underlying sender.
     */
    private readonly _onAmqpError;
    /**
     * The handler function to handle "sender_close" event
     * that happens on the underlying sender.
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
    /**
     * The AMQP sender link.
     */
    private _sender?;
    /**
     * The partition ID.
     */
    private readonly partitionId?;
    /**
     * Indicates whether the sender is configured for idempotent publishing.
     */
    private _isIdempotentProducer;
    /**
     * Indicates whether the sender has an in-flight send while idempotent
     * publishing is enabled.
     */
    private _hasPendingSend?;
    /**
     * A local copy of the PartitionPublishingProperties that can be mutated to
     * keep track of the lastSequenceNumber used.
     */
    private _localPublishingProperties?;
    /**
     * The user-provided set of options that can be specified to influence
     * publishing behavior specific to a partition.
     */
    private _userProvidedPublishingOptions?;
    /**
     * Indicates whether the link is in the process of connecting
     * (establishing) itself. Default value: `false`.
     */
    private isConnecting;
    /**
     * The unique name for the entity (mostly a guid).
     */
    private readonly name;
    /**
     * The address in the following form:
     * - `"<hubName>"`
     * - `"<hubName>/Partitions/<partitionId>"`.
     */
    private readonly address;
    /**
     * The token audience in the following form:
     * - `"sb://<yournamespace>.servicebus.windows.net/<hubName>"`
     * - `"sb://<yournamespace>.servicebus.windows.net/<hubName>/Partitions/<partitionId>"`.
     */
    private readonly audience;
    /**
     * Provides relevant information about the amqp connection,
     * cbs and $management sessions, token provider, sender and receivers.
     */
    private readonly _context;
    /**
     * The auth loop.
     */
    private authLoop?;
    /**
     * The logger.
     */
    private readonly logger;
    /** The client identifier */
    private _id;
    /**
     * Creates a new EventHubSender instance.
     * @param context - The connection context.
     * @param options - Options used to configure the EventHubSender.
     */
    constructor(context: ConnectionContext, senderId: string, { partitionId, enableIdempotentProducer, partitionPublishingOptions }: EventHubSenderOptions);
    /**
     * Deletes the sender from the context. Clears the token renewal timer. Closes the sender link.
     */
    close(): Promise<void>;
    /**
     * Determines whether the AMQP sender link is open. If open then returns true else returns false.
     * @returns boolean
     */
    isOpen(): boolean;
    /**
     * Returns maximum message size on the AMQP sender link.
     * @param abortSignal - An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     * @returns Promise<number>
     * @throws AbortError if the operation is cancelled via the abortSignal.
     */
    getMaxMessageSize(options?: {
        retryOptions?: RetryOptions;
        abortSignal?: AbortSignalLike;
    }): Promise<number>;
    /**
     * Get the information about the state of publishing for a partition as observed by the `EventHubSender`.
     * This data can always be read, but will only be populated with information relevant to the active features
     * for the producer client.
     */
    getPartitionPublishingProperties(options?: {
        retryOptions?: RetryOptions;
        abortSignal?: AbortSignalLike;
    }): Promise<PartitionPublishingProperties>;
    /**
     * Send a batch of EventData to the EventHub. The "message_annotations",
     * "application_properties" and "properties" of the first message will be set as that
     * of the envelope (batch message).
     * @param events -  An array of EventData objects to be sent in a Batch message.
     * @param options - Options to control the way the events are batched along with request options
     */
    send(events: EventData[] | EventDataBatch, options?: SendOptions & EventHubProducerOptions & {
        tracingProperties?: Array<EventData["properties"]>;
    }): Promise<void>;
    /**
     * @param sender - The rhea sender that contains the idempotent producer properties.
     */
    private _populateLocalPublishingProperties;
    private _deleteFromCache;
    private _createSenderOptions;
    /**
     * Tries to send the message to EventHub if there is enough credit to send them
     * and the circular buffer has available space to settle the message after sending them.
     *
     * We have implemented a synchronous send over here in the sense that we shall be waiting
     * for the message to be accepted or rejected and accordingly resolve or reject the promise.
     * @param rheaMessage - The message to be sent to EventHub.
     * @returns Promise<void>
     */
    private _trySendBatch;
    private _getLink;
    /**
     * Initializes the sender session on the connection.
     * Should only be called from _createLinkIfNotOpen
     */
    private _init;
    /**
     * Creates a new sender to the given event hub, and optionally to a given partition if it is
     * not present in the context or returns the one present in the context.
     * @hidden
     * @param options - Options used to configure the EventHubSender.
     */
    static create(context: ConnectionContext, senderId: string, options: EventHubSenderOptions): EventHubSender;
}
/**
 * Generates the link properties for an indemopotent sender given
 * based on the user-provided and locally-cached publishing options.
 *
 * Note: The set of idempotent properties a user specifies at EventHubProducerClient instantiation-time
 * is slightly different than what the service returns and the EventHubSender keeps track of locally.
 *
 * The difference is that the user specifies the `startingSequenceNumber`, whereas the local options
 * (those returned by getPartitionPublishingProperties) specifies `lastPublishedSequenceNumber`.
 *
 * These _can_ be the same, but the user is technically free to set any `startingSequenceNumber` they want.
 * @internal
 */
export declare function generateIdempotentLinkProperties(userProvidedPublishingOptions: PartitionPublishingOptions | undefined, localPublishingOptions: PartitionPublishingProperties | undefined): IdempotentLinkProperties | Record<string, never>;
/**
 * Encodes a list or batch of events into a single binary message that can be sent to the service.
 *
 * Prior to encoding, any special properties not specified by the user, such as tracing or idempotent
 * properties, are assigned to the list or batch of events as needed.
 *
 * @internal
 * @param events - Events to transform for sending to the service.
 * @param publishingProps - Describes the current publishing state for the partition.
 * @param options - Options used to configure this function.
 */
export declare function transformEventsForSend(events: EventData[] | EventDataBatch, publishingProps: PartitionPublishingProperties, options?: SendOptions & {
    /**
     * A list containing the `Diagnostic-Id` tracing property that is associated with each EventData.
     * The index of tracingProperties corresponds to the same index in `events` when `events` is EventData[].
     */
    tracingProperties?: Array<EventData["properties"]>;
}): Buffer;
//# sourceMappingURL=eventHubSender.d.ts.map