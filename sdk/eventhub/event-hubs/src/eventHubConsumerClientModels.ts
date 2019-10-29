
import { CloseReason, PartitionContext } from './eventProcessor';

/**
 * Optional event handlers that provide more context when subscribing to events.
 */
export interface OptionalEventHandlers {
  onError?: (error: Error, context: PartitionContext) => Promise<void>;
  onInitialize?: (context: PartitionContext) => Promise<void>;
  onClose?: (reason: CloseReason, context: PartitionContext) => Promise<void>;

}

/**
 * 
 */
export interface SubscriptionOptions extends OptionalEventHandlers{
}

/**
 * 
 */
export interface Subscription {
  stop(): Promise<void>;
  isReceiverOpen(): boolean;

  // TODO: why is this a property and not just a plain old field?
  consumerGroup(): string;
}
