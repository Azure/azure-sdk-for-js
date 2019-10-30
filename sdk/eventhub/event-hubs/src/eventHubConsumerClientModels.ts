
import { CloseReason, PartitionContext, EventProcessorCommonOptions } from './eventProcessor';

/**
 * Optional event handlers that provide more context when subscribing to events.
 */
export interface OptionalEventHandlers {
  onError?: (error: Error, context: PartitionContext) => Promise<void>;
  onInitialize?: (context: PartitionContext) => Promise<void>;
  onClose?: (reason: CloseReason, context: PartitionContext) => Promise<void>;

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
  stop(): Promise<void>;
  /**
   * @property Indicates whether the receiver is running.
   * `true` - is running; `false` otherwise.
   * @readonly
   */
  isRunning(): boolean;
}
