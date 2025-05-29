import type { Checkpoint } from "./partitionProcessor.js";
import type { PumpManager } from "./pumpManager.js";
import type { CommonEventProcessorOptions } from "./models/private.js";
import type { ConnectionContext } from "./connectionContext.js";
import type { OperationOptions } from "./util/operationOptions.js";
import type { SubscriptionEventHandlers } from "./eventHubConsumerClientModels.js";
/**
 * An interface representing the details on which instance of a `EventProcessor` owns processing
 * of a given partition from a consumer group of an Event Hub instance.
 *
 * **Note**: This is used internally by the `EventProcessor` and user never has to create it directly.
 */
export interface PartitionOwnership {
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
     * The identifier of the Event Hub partition.
     */
    partitionId: string;
    /**
     * The unique identifier of the event processor.
     */
    ownerId: string;
    /**
     * The last modified time.
     */
    lastModifiedTimeInMs?: number;
    /**
     * The unique identifier for the operation.
     */
    etag?: string;
}
/**
 * A checkpoint store stores and retrieves partition ownership information and checkpoint details
 * for each partition in a given consumer group of an event hub instance.
 *
 * Users are not meant to implement an `CheckpointStore`.
 * Users are expected to choose existing implementations of this interface, instantiate it, and pass
 * it to the `EventHubConsumerClient` class constructor when instantiating a client.
 * Users are not expected to use any of the methods on a checkpoint store, these are used internally by
 * the client.
 *
 * Implementations of `CheckpointStore` can be found on npm by searching for packages with the prefix &commat;azure/eventhub-checkpointstore-.
 */
export interface CheckpointStore {
    /**
     * Called to get the list of all existing partition ownership from the underlying data store. Could return empty
     * results if there are is no existing ownership information.
     *
     * @param fullyQualifiedNamespace - The fully qualified Event Hubs namespace. This is likely to be similar to
     * <yournamespace>.servicebus.windows.net.
     * @param eventHubName - The event hub name.
     * @param consumerGroup - The consumer group name.
     * @param options - A set of options that can be specified to influence the behavior of this method.
     *  - `abortSignal`: A signal used to request operation cancellation.
     *  - `tracingOptions`: Options for configuring tracing.
     * @returns A list of partition ownership details of all the partitions that have/had an owner.
     */
    listOwnership(fullyQualifiedNamespace: string, eventHubName: string, consumerGroup: string, options?: OperationOptions): Promise<PartitionOwnership[]>;
    /**
     * Called to claim ownership of a list of partitions. This will return the list of partitions that were owned
     * successfully.
     *
     * @param partitionOwnership - The list of partition ownership this instance is claiming to own.
     * @param options - A set of options that can be specified to influence the behavior of this method.
     *  - `abortSignal`: A signal used to request operation cancellation.
     *  - `tracingOptions`: Options for configuring tracing.
     * @returns A list of partitions this instance successfully claimed ownership.
     */
    claimOwnership(partitionOwnership: PartitionOwnership[], options?: OperationOptions): Promise<PartitionOwnership[]>;
    /**
     * Updates the checkpoint in the data store for a partition.
     *
     * @param checkpoint - The checkpoint.
     * @param options - A set of options that can be specified to influence the behavior of this method.
     *  - `abortSignal`: A signal used to request operation cancellation.
     *  - `tracingOptions`: Options for configuring tracing.
     */
    updateCheckpoint(checkpoint: Checkpoint, options?: OperationOptions): Promise<void>;
    /**
     * Lists all the checkpoints in a data store for a given namespace, eventhub and consumer group.
     *
     * @param fullyQualifiedNamespace - The fully qualified Event Hubs namespace. This is likely to be similar to
     * <yournamespace>.servicebus.windows.net.
     * @param eventHubName - The event hub name.
     * @param consumerGroup - The consumer group name.
     * @param options - A set of options that can be specified to influence the behavior of this method.
     *  - `abortSignal`: A signal used to request operation cancellation.
     *  - `tracingOptions`: Options for configuring tracing.
     * @returns A list of checkpoints for a given namespace, eventhub, and consumer group.
     */
    listCheckpoints(fullyQualifiedNamespace: string, eventHubName: string, consumerGroup: string, options?: OperationOptions): Promise<Checkpoint[]>;
}
/**
 * A set of options to pass to the constructor of `EventProcessor`.
 * You can specify
 * - `maxBatchSize`: The max size of the batch of events passed each time to user code for processing.
 * - `maxWaitTimeInSeconds`: The maximum amount of time to wait to build up the requested message count before
 * passing the data to user code for processing. If not provided, it defaults to 60 seconds.
 *
 * Example usage with default values:
 * ```ts snippet:ignore
 * {
 *     maxBatchSize: 1,
 *     maxWaitTimeInSeconds: 60,
 * }
 * ```
 * @internal
 */
export interface FullEventProcessorOptions extends CommonEventProcessorOptions {
    /**
     * An optional pump manager to use, rather than instantiating one internally
     * @internal
     */
    pumpManager?: PumpManager;
    /**
     * The amount of time between load balancing attempts.
     */
    loopIntervalInMs: number;
    /**
     * A specific partition to target.
     */
    processingTarget?: string;
}
/**
 * Event Processor based applications consist of one or more instances of EventProcessor which have been
 * configured to consume events from the same Event Hub and consumer group. They balance the
 * workload across different instances by distributing the partitions to be processed among themselves.
 * They also allow the user to track progress when events are processed using checkpoints.
 *
 * A checkpoint is meant to represent the last successfully processed event by the user from a particular
 * partition of a consumer group in an Event Hub instance.
 *
 * @internal
 */
export declare class EventProcessor {
    private _consumerGroup;
    private _context;
    private _subscriptionEventHandlers;
    private _checkpointStore;
    private _processorOptions;
    private _pumpManager;
    private _id;
    private _isRunning;
    private _loopTask?;
    private _abortController?;
    /**
     * A specific partition to target.
     */
    private _processingTarget?;
    /**
     * Determines which partitions to claim as part of load balancing.
     */
    private _loadBalancingStrategy;
    /**
     * The amount of time between load balancing attempts.
     */
    private _loopIntervalInMs;
    private _eventHubName;
    private _fullyQualifiedNamespace;
    /**
     * @param consumerGroup - The name of the consumer group from which you want to process events.
     * @param eventHubClient - An instance of `EventHubClient` that was created for the Event Hub instance.
     * @param PartitionProcessorClass - A user-provided class that extends the `PartitionProcessor` class.
     * This class will be responsible for processing and checkpointing events.
     * @param checkpointStore - An instance of `CheckpointStore`. See &commat;azure/eventhubs-checkpointstore-blob for an implementation.
     * For production, choose an implementation that will store checkpoints and partition ownership details to a durable store.
     * @param options - A set of options to configure the Event Processor
     * - `maxBatchSize`         : The max size of the batch of events passed each time to user code for processing.
     * - `maxWaitTimeInSeconds` : The maximum amount of time to wait to build up the requested message count before
     * passing the data to user code for processing. If not provided, it defaults to 60 seconds.
     */
    constructor(_consumerGroup: string, _context: ConnectionContext, _subscriptionEventHandlers: SubscriptionEventHandlers, _checkpointStore: CheckpointStore, options: FullEventProcessorOptions);
    /**
     * The unique identifier for the EventProcessor.
     */
    get id(): string;
    private _createPartitionOwnershipRequest;
    private _claimOwnership;
    private _startPump;
    private _getStartingPosition;
    private _runLoopForSinglePartition;
    /**
     * Every loop to this method will result in this EventProcessor owning at most one new partition.
     *
     * The load is considered balanced when no active EventProcessor owns 2 partitions more than any other active
     * EventProcessor. Given that each invocation to this method results in ownership claim of at most one partition,
     * this algorithm converges gradually towards a steady state.
     *
     * When a new partition is claimed, this method is also responsible for starting a partition pump that creates an
     * EventHubConsumer for processing events from that partition.
     */
    private _runLoopWithLoadBalancing;
    private _performLoadBalancing;
    /**
     * This is called when there are errors that are not specific to a partition (ex: load balancing)
     */
    private _handleSubscriptionError;
    /**
     * Starts the `EventProcessor`. Based on the number of instances of `EventProcessor` that are running for the
     * same consumer group, the partitions are distributed among these instances to process events.
     *
     * For each partition, the user provided `PartitionProcessor` is instantiated.
     *
     * Subsequent calls to start will be ignored if this event processor is already running.
     * Calling `start()` after `stop()` is called will restart this event processor.
     *
     */
    start(): void;
    isRunning(): boolean;
    /**
     * Stops processing events for all partitions owned by this event processor.
     * All `PartitionProcessor` will be shutdown and any open resources will be closed.
     *
     * Subsequent calls to stop will be ignored if the event processor is not running.
     *
     */
    stop(): Promise<void>;
    private abandonPartitionOwnerships;
}
//# sourceMappingURL=eventProcessor.d.ts.map