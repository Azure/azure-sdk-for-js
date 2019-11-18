
import { CloseReason } from './eventProcessor';
import { ReceivedEventData } from './eventData';
import { LastEnqueuedEventProperties } from './eventHubReceiver';
import { EventPosition } from './eventPosition';

/**
 * @internal
 * @ignore
 */
export interface BasicPartitionProperties {
  /**
   * @property The fully qualified Event Hubs namespace. This is likely to be similar to
   * <yournamespace>.servicebus.windows.net
   */
  fullyQualifiedNamespace: string;
  /**
   * @property The event hub name
   */
  eventHubName: string;
  /**
   * @property The consumer group name
   */
  consumerGroup: string;
  /**
   * @property The identifier of the Event Hub partition
   */
  partitionId: string;
}

/**
 * Provides a set of basic information about the partition as well as the 
 * ability to checkpoint.
 */
export interface PartitionContext {
  /**
   * @property The fully qualified Event Hubs namespace. This is likely to be similar to
   * <yournamespace>.servicebus.windows.net
   */
  readonly fullyQualifiedNamespace: string;
  /**
   * @property The event hub name
   */
  readonly eventHubName: string;
  /**
   * @property The consumer group name
   */
  readonly consumerGroup: string;
  /**
   * @property The identifier of the Event Hub partition
   */
  readonly partitionId: string;
  /**
   * Information on the last enqueued event in the partition that is being processed.
   * This property is only updated if the `trackLastEnqueuedEventProperties` option is set to true
   * when creating an instance of EventProcessor
   * @readonly
   */
  readonly lastEnqueuedEventProperties?: LastEnqueuedEventProperties;
  /**
   * Updates the checkpoint using the event data.
   *
   * A checkpoint is meant to represent the last successfully processed event by the user from a particular
   * partition of a consumer group in an Event Hub instance.
   *
   * @param eventData The event that you want to update the checkpoint with.
   * @return Promise<void>
   */
  updateCheckpoint(eventData: ReceivedEventData): Promise<void>;
}

/**
 * A `PartitionContext` with the ability to also provide a default start
 * position if no checkpoint is found.
 */
export interface InitializationContext extends PartitionContext {
  /**
   * Allows for setting the start position of a partition.
   * Default (if not called) is `EventPosition.earliest()`
   */
  setStartPosition(startPosition: EventPosition): void;
}

/**
 * Event handler called when events are received. The `context` parameter can be 
 * used to get partition information as well as to checkpoint.
 */
export type ProcessEventHandler = (
  receivedEvent: ReceivedEventData,
  context: PartitionContext
) => Promise<void>;

/**
 * Called when errors occur during event receiving.
 */
export type ProcessErrorHandler = (error: Error, context: PartitionContext) => Promise<void>;

/**
 * Called when we first start processing events from a partition.
 */
export type ProcessInitializeHandler = (context: InitializationContext) => Promise<void>;

/**
 * Called when we stop processing events from a partition.
 */
export type ProcessCloseHandler = (reason: CloseReason, context: PartitionContext) => Promise<void>;

/**
 * Optional event handlers that provide more context when subscribing to events.
 */
export interface SubscriptionEventHandlers {
  /**
   * Event handler called when events are received.    
   */
  processEvent: ProcessEventHandler
  /**
   * Called when errors occur during event receiving.
   */
  processError?: ProcessErrorHandler;
  /**
   * Called when we first start processing events from a partition.
   */
  processInitialize?: ProcessInitializeHandler;
  /**
   * Called when we stop processing events from a partition.
   */
  processClose?: ProcessCloseHandler;
}

/**
 * Options for subscribe.
 */
export interface SubscriptionOptions {
    /**
   * @property
   * Indicates whether or not the consumer should request information on the last enqueued event on its
   * associated partition, and track that information as events are received.

   * When information about the partition's last enqueued event is being tracked, each event received 
   * from the Event Hubs service will carry metadata about the partition that it otherwise would not. This results in a small amount of
   * additional network bandwidth consumption that is generally a favorable trade-off when considered
   * against periodically making requests for partition properties using the Event Hub client.
   */
  trackLastEnqueuedEventProperties?: boolean;
  /**
   * The owner level to use as this subscription subscribes to partitions.
   */
  ownerLevel?: number;
}

/**
 * Represents the status of a subscribe() call and can be used to stop a subscription.
 */
export interface Subscription {
  /**
   * Stops the subscription from receiving more messages.
   * @returns Promise<void>
   * @throws {Error} Thrown if the underlying connection encounters an error while closing.
   */
  close(): Promise<void>;
  /**
   * Indicates whether the receiver is running.
   * `true` - is running; `false` otherwise.
   * @readonly
   */
  isRunning: boolean;
}
