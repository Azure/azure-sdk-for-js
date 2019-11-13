
import { CloseReason, PartitionContext } from './eventProcessor';
import { PartitionCheckpointer } from './eventHubConsumerClient';
import { ReceivedEventData } from './eventData';
import { EventPosition } from './eventPosition';

/**
 * Event handler called when events are received. The `context` parameter can be 
 * used to get partition information as well as to checkpoint.
 */
export type ProcessEvents = (
  receivedEvents: ReceivedEventData[],
  context: PartitionContext & PartitionCheckpointer
) => Promise<void>;

/**
 * Called when errors occur during event receiving.
 */
export type ProcessErrorHandler = (error: Error, context: PartitionContext) => Promise<void>;

/**
 * Called when we first start processing events from a partition.
 */
export type ProcessInitializeHandler = (context: PartitionContext) => Promise<void>;

/**
 * Called when we stop processing events from a partition.
 */
export type ProcessCloseHandler = (reason: CloseReason, context: PartitionContext & PartitionCheckpointer) => Promise<void>;

/**
 * Optional event handlers that provide more context when subscribing to events.
 */
export interface SubscriptionEventHandlers {
  /**
   * Event handler called when events are received.    
   */
  processEvents: ProcessEvents
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
export interface SubscriptionOptions extends SubscriptionEventHandlers {
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
   * The event position to use when claiming a partition if not already
   * initialized.
   * 
   * Defaults to EventPosition.earliest()
   */
  defaultEventPosition?: EventPosition;  

  /**
   * The max size of the batch of events passed each time to user code for processing.
   */
  maxBatchSize?: number;
  /**
   * The maximum amount of time to wait to build up the requested message count before
   * passing the data to user code for processing. If not provided, it defaults to 60 seconds.
   */
  maxWaitTimeInSeconds?: number;
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
