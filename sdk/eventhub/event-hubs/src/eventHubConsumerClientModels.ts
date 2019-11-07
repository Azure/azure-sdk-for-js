
import { CloseReason, PartitionContext, EventProcessorOptions, EventProcessorBatchOptions } from './eventProcessor';
import { PartitionCheckpointer } from './eventHubConsumerClient';
import { ReceivedEventData } from './eventData';

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
