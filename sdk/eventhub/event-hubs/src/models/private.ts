// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RetryOptions } from "@azure/core-amqp";
import { SubscribeOptions } from "../eventHubConsumerClientModels";
import { LoadBalancingStrategy } from "../loadBalancerStrategies/loadBalancingStrategy";

/**
 * The set of options to configure the behavior of an `EventHubProducer`.
 * These can be specified when creating the producer via the `createProducer` method.
 * - `partitionId`  : The string identifier of the partition that the producer can be bound to.
 * - `retryOptions` : The retry options used to govern retry attempts when an issue is encountered while sending events.
 * A simple usage can be `{ "maxRetries": 4 }`.
 * @ignore
 * @internal
 */
export interface EventHubProducerOptions {
  /**
   * @property
   * The identifier of the partition that the producer will be bound to.
   * If a value is provided, all events sent using the producer will reach the same partition.
   * If no value is provided, the service will determine the partition to which the event will be sent.
   */
  partitionId?: string;
  /**
   * @property
   * The retry options used to govern retry attempts when an issue is encountered while sending events.
   * If no value is provided here, the retry options set when creating the `EventHubClient` is used.
   */
  retryOptions?: RetryOptions;
}

/**
 * @internal
 * @ignore
 */
export type OperationNames = "getEventHubProperties" | "getPartitionIds" | "getPartitionProperties";

/**
 * @internal
 * @ignore
 */
export interface CommonEventProcessorOptions
  extends Required<Pick<SubscribeOptions, "maxBatchSize" | "maxWaitTimeInSeconds">>,
    Pick<
      SubscribeOptions,
      Exclude<
        keyof SubscribeOptions,
        // (made required above)
        "maxBatchSize" | "maxWaitTimeInSeconds"
      >
    > {
  /**
   * A load balancing strategy that determines how to claim partitions.
   */
  loadBalancingStrategy: LoadBalancingStrategy;

  /**
   * An optional ownerId to use rather than using an internally generated ID
   * This allows you to logically group a series of processors together (for instance
   * like we do with EventHubConsumerClient)
   */
  ownerId?: string;

  /**
   * The maximum amount of time since a PartitionOwnership was updated
   * to use to determine if a partition is no longer claimed.
   * Setting this value to 0 will cause the default value to be used.
   */
  inactiveTimeLimitInMs?: number;
  /**
   * Retry Options to be used when receiving events
   */
  retryOptions?: RetryOptions;
}

/**
 * The set of options to configure the behavior of an `EventHubConsumer`.
 * These can be specified when creating the consumer using the `createConsumer` method.
 * - `ownerLevel`  : A number indicating that the consumer intends to be an exclusive consumer of events resulting in other
 * consumers to fail if their `ownerLevel` is lower or doesn't exist.
 * - `retryOptions`: The retry options used to govern retry attempts when an issue is encountered while receiving events.
 * A simple usage can be `{ "maxRetries": 4 }`.
 *
 * Example usage:
 * ```js
 * {
 *     retryOptions: {
 *         maxRetries: 4
 *     },
 *     trackLastEnqueuedEventProperties: false
 * }
 * ```
 * @internal
 * @ignore
 */
export interface EventHubConsumerOptions {
  /**
   * @property
   * The owner level associated with an exclusive consumer.
   *
   * When provided, the owner level indicates that a consumer is intended to be the exclusive receiver of events for the
   * requested partition and the associated consumer group.
   * When multiple consumers exist for the same partition/consumer group pair, then the ones with lower or no
   * `ownerLevel` will get a `ReceiverDisconnectedError` during the next attempted receive operation.
   */
  ownerLevel?: number;
  /**
   * @property
   * The retry options used to govern retry attempts when an issue is encountered while receiving events.
   * If no value is provided here, the retry options set when creating the `EventHubClient` is used.
   */
  retryOptions?: RetryOptions;
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
}
