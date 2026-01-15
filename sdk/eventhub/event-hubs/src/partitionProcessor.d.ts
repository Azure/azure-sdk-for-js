import type { BasicPartitionProperties, PartitionContext, SubscriptionEventHandlers } from "./eventHubConsumerClientModels.js";
import type { CheckpointStore } from "./eventProcessor.js";
import type { CloseReason } from "./models/public.js";
import type { LastEnqueuedEventProperties } from "./partitionReceiver.js";
import type { ReceivedEventData } from "./eventData.js";
/**
 * A checkpoint is meant to represent the last successfully processed event by the user from a particular
 * partition of a consumer group in an Event Hub instance.
 *
 * When the `updateCheckpoint()` method on the `PartitionProcessor` class is called by the user, a
 * `Checkpoint` is created internally. It is then stored in the storage solution implemented by the
 * `CheckpointManager` chosen by the user when creating an `EventProcessor`.
 *
 * Users are never expected to interact with `Checkpoint` directly. This interface exists to support the
 * internal workings of `EventProcessor` and `CheckpointManager`.
 **/
export interface Checkpoint {
    /**
     * The fully qualified Event Hubs namespace. This is likely to be similar to
     * <yournamespace>.servicebus.windows.net
     */
    fullyQualifiedNamespace: string;
    /**
     * The event hub name
     */
    eventHubName: string;
    /**
     * The consumer group name
     */
    consumerGroup: string;
    /**
     * The identifier of the Event Hub partition
     */
    partitionId: string;
    /**
     * The sequence number of the event
     */
    sequenceNumber: number;
    /**
     * The offset of the event.
     */
    offset: string;
}
/**
 * The `PartitionProcessor` is responsible for processing events received from Event Hubs when using `EventProcessor`
 *
 * The EventProcessor creates a new instance of the PartitionProcessor for each partition of the event hub it starts processing. When you extend the `PartitionProcessor` in order to customize it as you see fit,
 * - Override the `processEvents()` method to add the code to process the received events. This is also a good place to update the checkpoints using the `updateCheckpoint()` method
 * - Optionally override the `processError()` method to handle any error that might have occurred when processing the events.
 * - Optionally override the `initialize()` method to implement any set up related tasks you would want to carry out before starting to receive events from the partition
 * - Optionally override the `close()` method to implement any tear down or clean up tasks you would want to carry out.
 * @internal
 */
export declare class PartitionProcessor implements PartitionContext {
    private _eventHandlers;
    private _checkpointStore;
    private _context;
    private _lastEnqueuedEventProperties?;
    constructor(_eventHandlers: SubscriptionEventHandlers, _checkpointStore: CheckpointStore, _context: BasicPartitionProperties & {
        eventProcessorId: string;
    });
    /**
     * Information on the last enqueued event in the partition that is being processed.
     * This property is updated by the `EventProcessor` if the `trackLastEnqueuedEventProperties` option is set to true
     * when creating an instance of EventProcessor
     * @readonly
     */
    get lastEnqueuedEventProperties(): LastEnqueuedEventProperties;
    /**
     * Information on the last enqueued event in the partition that is being processed.
     * This property is updated by the `EventProcessor` if the `trackLastEnqueuedEventProperties` option is set to true
     * when creating an instance of EventProcessor
     */
    set lastEnqueuedEventProperties(properties: LastEnqueuedEventProperties);
    /**
     * The fully qualified namespace from where the current partition is being processed. It is set by the `EventProcessor`
     * @readonly
     */
    get fullyQualifiedNamespace(): string;
    /**
     * The name of the consumer group from where the current partition is being processed. It is set by the `EventProcessor`
     * @readonly
     */
    get consumerGroup(): string;
    /**
     * The name of the event hub to which the current partition belongs. It is set by the `EventProcessor`
     * @readonly
     */
    get eventHubName(): string;
    /**
     * The identifier of the Event Hub partition that is being processed. It is set by the `EventProcessor`
     * @readonly
     */
    get partitionId(): string;
    /**
     * The unique identifier of the `EventProcessor` that has spawned the current instance of `PartitionProcessor`. This is set by the `EventProcessor`
     */
    get eventProcessorId(): string;
    /**
     * This method is called when the `EventProcessor` takes ownership of a new partition and before any
     * events are received.
     */
    initialize(): Promise<void>;
    /**
     * This method is called before the partition processor is closed by the EventProcessor.
     *
     * @param reason - The reason for closing this partition processor.
     */
    close(reason: CloseReason): Promise<void>;
    /**
     * This method is called when new events are received.
     *
     * This is also a good place to update checkpoints as appropriate.
     *
     * @param event - The received events to be processed.
     */
    processEvents(events: ReceivedEventData[]): Promise<void>;
    /**
     * This method is called when an error occurs while receiving events from Event Hubs.
     *
     * @param error - The error to be processed.
     */
    processError(error: Error): Promise<void>;
    /**
     * Updates the checkpoint using the event data.
     *
     * A checkpoint is meant to represent the last successfully processed event by the user from a particular
     * partition of a consumer group in an Event Hub instance.
     *
     * @param eventData - The event that you want to update the checkpoint with.
     */
    updateCheckpoint(eventData: ReceivedEventData): Promise<void>;
}
//# sourceMappingURL=partitionProcessor.d.ts.map