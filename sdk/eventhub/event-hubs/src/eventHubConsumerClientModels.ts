
import { CloseReason, PartitionContext, EventProcessorOptions, EventProcessorBatchOptions } from './eventProcessor';
import { ReceivedEventData } from './eventData';
import { EventPosition } from './eventPosition';

/**
 * Allow for checkpointing
 */
export interface PartitionCheckpointer {
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
  /**
   * Updates the checkpoint using the given offset and sequence number.
   *
   * A checkpoint is meant to represent the last successfully processed event by the user from a particular
   * partition of a consumer group in an Event Hub instance.
   *
   * @param sequenceNumber The sequence number of the event that you want to update the checkpoint with.
   * @param offset The offset of the event that you want to update the checkpoint with.
   * @return  Promise<void>.
   */
  updateCheckpoint(sequenceNumber: number, offset: number): Promise<void>;
  /**
   * @internal
   * @ignore
   */
  updateCheckpoint(
    eventDataOrSequenceNumber: ReceivedEventData | number,
    offset?: number
  ): Promise<void>;
}

/**
 * Allows for configuring initialization of partition processors
 */
export interface PartitionInitializer {
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
export type ProcessInitializeHandler = (context: PartitionContext & PartitionInitializer) => Promise<void>;

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
export interface SubscriptionOptions extends SubscriptionEventHandlers, EventProcessorOptions, EventProcessorBatchOptions {  
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
   * @property Indicates whether the receiver is running.
   * `true` - is running; `false` otherwise.
   * @readonly
   */
  isRunning(): boolean;
}
