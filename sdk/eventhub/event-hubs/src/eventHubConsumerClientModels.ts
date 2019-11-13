
import { CloseReason, PartitionContext } from './eventProcessor';
import { PartitionCheckpointer, SubscriptionPartitionInitializer } from './eventHubConsumerClient';
import { ReceivedEventData } from './eventData';
import { LastEnqueuedEventProperties } from './eventHubReceiver';

/**
 * An interface with identifying information for a partition that can also update checkpoints.
 */
export interface SubscriptionPartitionContext extends PartitionContext, PartitionCheckpointer {
  /**
   * Information on the last enqueued event in the partition that is being processed.
   * This property is only updated if the `trackLastEnqueuedEventInfo` option is set to true
   * when creating an instance of EventProcessor
   * @readonly
   */
  lastEnqueuedEventProperties?: LastEnqueuedEventProperties;
}

/**
 * Event handler called when events are received. The `context` parameter can be 
 * used to get partition information as well as to checkpoint.
 */
export type ProcessEventHandler = (
  receivedEvent: ReceivedEventData,
  context: PartitionContext & PartitionCheckpointer
) => Promise<void>;

/**
 * Called when errors occur during event receiving.
 */
export type ProcessErrorHandler = (error: Error, context: SubscriptionPartitionContext) => Promise<void>;

/**
 * Called when we first start processing events from a partition.
 */
export type ProcessInitializeHandler = (context: SubscriptionPartitionContext & SubscriptionPartitionInitializer) => Promise<void>;

/**
 * Called when we stop processing events from a partition.
 */
export type ProcessCloseHandler = (reason: CloseReason, context: SubscriptionPartitionContext) => Promise<void>;

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
  trackLastEnqueuedEventInfo?: boolean;

  /**
   * The max size of the batch of events passed each time to user code for processing.
   */
  maxBatchSize?: number;
  /**
   * The maximum amount of time to wait to build up the requested message count before
   * passing the data to user code for processing. If not provided, it defaults to 60 seconds.
   */
  maxWaitTimeInSeconds?: number;

  /**
   * The owner level to use as this subscription subscribes to partitions.
   */
  // TODO: plumb this through
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
