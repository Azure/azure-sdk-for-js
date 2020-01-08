import { CloseReason } from "./eventProcessor";
import { ReceivedEventData } from "./eventData";
import { LastEnqueuedEventProperties } from "./eventHubReceiver";
import { EventPosition } from "./eventPosition";
import { TracingOptions } from "./util/operationOptions";
import { MessagingError } from "@azure/core-amqp";

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
   * @property The event hub name.
   */
  eventHubName: string;
  /**
   * @property The consumer group name.
   */
  consumerGroup: string;
  /**
   * @property The identifier of the Event Hub partition.
   */
  partitionId: string;
}

/**
 * Interface that describes the context passed to each of the functions that are a part
 * of the `SubscriptionEventHandlers`. When implementing any of these functions, use
 * the context object to get information about the partition as well as the
 * ability to checkpoint.
 */
export interface PartitionContext {
  /**
   * @property The fully qualified Event Hubs namespace. This is likely to be similar to
   * <yournamespace>.servicebus.windows.net
   */
  readonly fullyQualifiedNamespace: string;
  /**
   * @property The event hub name.
   */
  readonly eventHubName: string;
  /**
   * @property The consumer group name.
   */
  readonly consumerGroup: string;
  /**
   * @property The identifier of the Event Hub partition.
   */
  readonly partitionId: string;
  /**
   * Information on the last enqueued event in the partition that is being processed.
   * This property is only updated if the `trackLastEnqueuedEventProperties` option is set to true
   * when creating an instance of EventProcessor.
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
 * Signature of the user provided function invoked by `EventHubConsumerClient` when a set of events is received.
 */
export type ProcessEventsHandler = (
  events: ReceivedEventData[],
  context: PartitionContext
) => Promise<void>;

/**
 * Signature of the user provided function invoked by `EventHubConsumerClient` for errors that occur when
 * receiving events or when executing any of the user provided functions passed to the `subscribe()` method.
 */
export type ProcessErrorHandler = (
  error: Error | MessagingError,
  context: PartitionContext
) => Promise<void>;

/**
 * Signature of the user provided function invoked by `EventHubConsumerClient` just before starting to receive 
 * events from a partition.
 */
export type ProcessInitializeHandler = (context: PartitionContext) => Promise<void>;

/**
 * Signature of the user provided function invoked by `EventHubConsumerClient` just after stopping to receive
 * events from a partition.
 */
export type ProcessCloseHandler = (reason: CloseReason, context: PartitionContext) => Promise<void>;

/**
 * Interface that describes the functions to be implemented by the user which are invoked by
 * the `EventHubConsumerClient` when the `subscribe()` method is called to receive events
 * from Event Hub.
 */
export interface SubscriptionEventHandlers {
  /**
   * The function invoked by `EventHubConsumerClient` when a set of events is received.
   */
  processEvents: ProcessEventsHandler;
  /**
   * The function invoked by `EventHubConsumerClient` for errors that occur when receiving events
   * or when executing any of the user provided functions passed to the `subscribe()` method.
   */
  processError: ProcessErrorHandler;
  /**
   * The function invoked by `EventHubConsumerClient` just before starting to receive events from
   * a partition. Use this to carry out any setup tasks you would like to have before the client
   * starts processing a partition.
   */
  processInitialize?: ProcessInitializeHandler;
  /**
   * The function invoked by `EventHubConsumerClient` just before stopping to receive events from
   * a partition. Use this to carry out any teardown tasks you would like to have for the partition.
   */
  processClose?: ProcessCloseHandler;
}

/**
 * Options to configure the `subscribe` method on the `EventHubConsumerClient`.
 * For example, `{ maxBatchSize: 20, maxWaitTimeInSeconds: 120, startPosition: { sequenceNumber: 123 } }
 */
export interface SubscribeOptions extends TracingOptions {
  /**
   * The number of events to request per batch
   */
  maxBatchSize?: number;
  /**
   * The maximum amount of time to wait to build up the requested message count before
   * passing the data to user code for processing. If not provided, it defaults to 60 seconds.
   */
  maxWaitTimeInSeconds?: number;
  /**
   * The event position in a partition to start receiving events from if no checkpoint is found.
   * Pass a map of partition id to position if you would like to use different starting
   * position for each partition.
   */
  startPosition?: EventPosition | { [partitionId: string]: EventPosition };
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
 * Interface that describes the object returned by the `subscribe()` method on the `EventHubConsumerClient`.
 */
export interface Subscription {
  /**
   * Stops the subscription from receiving more messages.
   * @returns Promise<void>
   * @throws Error if the underlying connection encounters an error while closing.
   */
  close(): Promise<void>;
  /**
   * Indicates whether the receiver is running.
   * `true` - is running; `false` otherwise.
   * @readonly
   */
  isRunning: boolean;
}
