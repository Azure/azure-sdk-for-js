
import { CloseReason, PartitionContext, EventProcessorCommonOptions } from './eventProcessor';
import { PartitionCheckpointer } from './eventHubConsumerClient';

/**
 * Called when errors occur during event receiving.
 */
export type OnErrorHandler = (error: Error, context: PartitionContext) => Promise<void>;

/**
 * Called when we first start processing events from a partition.
 */
export type OnInitializeHandler = (context: PartitionContext) => Promise<void>;

/**
 * Called when we stop processing events from a partition.
 */
export type OnCloseHandler = (reason: CloseReason, context: PartitionContext & PartitionCheckpointer) => Promise<void>;

/**
 * Optional event handlers that provide more context when subscribing to events.
 */
export interface OptionalEventHandlers {
  /**
   * Called when errors occur during event receiving.
   */
  onError?: OnErrorHandler;
  /**
   * Called when we first start processing events from a partition.
   */
  onInitialize?: OnInitializeHandler;
  /**
   * Called when we stop processing events from a partition.
   */
  onClose?: OnCloseHandler;

}

/**
 * Options for subscribe.
 */
export interface SubscriptionOptions extends OptionalEventHandlers, EventProcessorCommonOptions {
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
