import { TokenCredential } from "@azure/identity";
import { CloseReason, PartitionContext, EventProcessorOptions } from './eventProcessor';

/**
 * 
 */
export interface HostAndTokenCredential {
  host: string;
  credential: TokenCredential;
  eventHubName: string;
}

/**
 * 
 */
export interface EventHubConnectionString {
  connectionString: string;
  eventHubName?: string;
}

export interface OptionalEventHandlers {
  onError?: (error: Error, context: PartitionContext) => Promise<void>;
  onInitialize?: (context: PartitionContext) => Promise<void>;
  onClose?: (reason: CloseReason, context: PartitionContext) => Promise<void>;

}

/**
 * Options for subscribe.
 */
export interface SubscriptionOptions extends OptionalEventHandlers, Pick<EventProcessorOptions, Exclude<keyof EventProcessorOptions, 'partitionLoadBalancer'>> {
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
