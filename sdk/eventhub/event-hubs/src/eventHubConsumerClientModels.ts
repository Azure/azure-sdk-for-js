// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CloseReason } from "./models/public";
import { ReceivedEventData } from "./eventData";
import { LastEnqueuedEventProperties } from "./eventHubReceiver";
import { EventPosition } from "./eventPosition";
import { OperationTracingOptions } from "@azure/core-tracing";
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
   * The function invoked by `EventHubConsumerClient` when a set of events is received. The
   * `PartitionContext` passed to this function can be used to determine which partition is being read from.
   *
   * The `updateCheckpoint()` method on the context can be used to update checkpoints in the `CheckpointStore`
   * (if one was provided to the client). Use this in frequent intervals to mark events that have been processed
   * so that the client can restart from such checkpoints in the event of a restart or error recovery.
   *
   * Note: It is possible for received events to be an empty array.
   * This can happen if there are no new events to receive
   * in the `maxWaitTimeInSeconds`, which is defaulted to 60 seconds.
   * The `maxWaitTimeInSeconds` can be changed by setting
   * it in the `options` passed to `subscribe()`.
   */
  processEvents: ProcessEventsHandler;
  /**
   * The function invoked by `EventHubConsumerClient` for errors that occur when receiving events
   * or when executing any of the user provided functions passed to the `subscribe()` method.
   *
   * The `PartitionContext` passed to this function will indicate the partition that was being processed
   * when the error was thrown. In cases where an error is thrown outside of processing events from a
   * partition(e.g. failure to perform load balancing), the `partitionId` on the context will be an empty string.
   *
   * After the client completes executing this function, the `partitionClose` function is invoked.
   */
  processError: ProcessErrorHandler;
  /**
   * The function invoked by `EventHubConsumerClient` each time the subscription is about to begin
   * reading from a partition. The `PartitionContext` passed to this function can be used to determine
   * which partition is about to be read from.
   *
   * The client will start receiving events for the partition only after completing the execution of
   * this function (if provided). Therefore, use this function to carry out any setup work including
   * async tasks.
   */
  processInitialize?: ProcessInitializeHandler;
  /**
   * The function invoked by `EventHubConsumerClient` each time the subscription stops reading events from
   * a partition. The information on this partition will be available on the `PartitionContext` passed to the
   * function `processClose`.
   *
   * If the `CloseReason` passed to this function is `OwnershipLost`, then another subscription has taken over
   * reading from the same partition using the same consumer group. This is expected if you have multiple
   * instances of your application running and have passed the `CheckpointStore` to the client to load balance.
   *
   * If the `CloseReason` is `Shutdown`, this indicates that either `subscription.close()` was called, or an
   * error occured. Unless the subscription was explicitly closed via `subscription.close()`, the subscription
   * will attempt to resume reading events from the last checkpoint for the partition.
   */
  processClose?: ProcessCloseHandler;
}

/**
 * Options to configure the `subscribe` method on the `EventHubConsumerClient`.
 * For example, `{ maxBatchSize: 20, maxWaitTimeInSeconds: 120, startPosition: { sequenceNumber: 123 } }
 */
export interface SubscribeOptions {
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
  /**
   * Options for configuring tracing.
   */
  tracingOptions?: OperationTracingOptions;
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
