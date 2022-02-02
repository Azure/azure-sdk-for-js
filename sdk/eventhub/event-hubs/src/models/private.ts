// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LoadBalancingStrategy } from "../loadBalancerStrategies/loadBalancingStrategy";
import { RetryOptions } from "@azure/core-amqp";
import { Typed } from "rhea-promise";
import { SubscribeOptions } from "../eventHubConsumerClientModels";
import { idempotentProducerAmqpPropertyNames } from "../util/constants";

/**
 * The set of options to configure the behavior of an `EventHubProducer`.
 * These can be specified when creating the producer via the `createProducer` method.
 * - `partitionId`  : The string identifier of the partition that the producer can be bound to.
 * - `retryOptions` : The retry options used to govern retry attempts when an issue is encountered while sending events.
 * A simple usage can be `{ "maxRetries": 4 }`.
 * @internal
 */
export interface EventHubProducerOptions {
  /**
   * The identifier of the partition that the producer will be bound to.
   * If a value is provided, all events sent using the producer will reach the same partition.
   * If no value is provided, the service will determine the partition to which the event will be sent.
   */
  partitionId?: string;
  /**
   * The retry options used to govern retry attempts when an issue is encountered while sending events.
   * If no value is provided here, the retry options set when creating the `EventHubClient` is used.
   */
  retryOptions?: RetryOptions;
}

/**
 * @internal
 */
export type OperationNames = "getEventHubProperties" | "getPartitionIds" | "getPartitionProperties";

/**
 * @internal
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
 * - `skipParsingBodyAsJson` : Option to disable the client from running JSON.parse() on the message body when receiving the message.
 * Not applicable if the message was sent with AMQP body type value or sequence. Use this option when you prefer to work directly with
 * the bytes present in the message body than have the client attempt to parse it.
 *
 * Example usage:
 * ```js
 * {
 *     retryOptions: {
 *         maxRetries: 4
 *     },
 *     trackLastEnqueuedEventProperties: false,
 *     skipParsingBodyAsJson: true
 * }
 * ```
 * @internal
 */
export interface EventHubConsumerOptions {
  /**
   * The owner level associated with an exclusive consumer.
   *
   * When provided, the owner level indicates that a consumer is intended to be the exclusive receiver of events for the
   * requested partition and the associated consumer group.
   * When multiple consumers exist for the same partition/consumer group pair, then the ones with lower or no
   * `ownerLevel` will get a `ReceiverDisconnectedError` during the next attempted receive operation.
   */
  ownerLevel?: number;
  /**
   * The retry options used to govern retry attempts when an issue is encountered while receiving events.
   * If no value is provided here, the retry options set when creating the `EventHubClient` is used.
   */
  retryOptions?: RetryOptions;
  /**
   * Indicates whether or not the consumer should request information on the last enqueued event on its
   * associated partition, and track that information as events are received.

   * When information about the partition's last enqueued event is being tracked, each event received
   * from the Event Hubs service will carry metadata about the partition that it otherwise would not. This results in a small amount of
   * additional network bandwidth consumption that is generally a favorable trade-off when considered
   * against periodically making requests for partition properties using the Event Hub client.
   */
  trackLastEnqueuedEventProperties?: boolean;
  /**
   * Option to disable the client from running JSON.parse() on the message body when receiving the message.
   * Not applicable if the message was sent with AMQP body type value or sequence. Use this option when you
   * prefer to work directly with the bytes present in the message body than have the client attempt to parse it.
   */
  skipParsingBodyAsJson?: boolean;
}

/**
 * @internal
 */
export interface IdempotentLinkProperties {
  [idempotentProducerAmqpPropertyNames.epoch]: Typed | null;
  [idempotentProducerAmqpPropertyNames.producerId]: Typed | null;
  [idempotentProducerAmqpPropertyNames.producerSequenceNumber]: Typed | null;
}

/**
 * The set of options that can be specified for an `EventHubProducerClient`
 * to influence its behavior when publishing directly to an Event Hub partition.
 *
 * These options are ignored when publishing to the Event Hubs gateway for automatic
 * routing or when using a partition key.
 */
export interface PartitionPublishingOptions {
  /**
   * The owner level indicates that a publishing is intended to be performed exclusively for events in the
   * requested partition in the context of the associated producer group.
   *
   * To do so, publishing will attempt to assert ownership over the partition;
   * in the case where more than one publisher in the producer group attempts to assert ownership for the same partition,
   * the one having a larger `ownerLevel` value will "win".
   */
  ownerLevel?: number;
  /**
   * The identifier of the producer group that this producer is associated with when publishing to the associated partition.
   * Events will be published in the context of this group.
   *
   * If `undefined`, the Event Hubs service will control the value.
   *
   * The producer group is only recognized and relevant when certain features of the producer are enabled.
   * For example, it is used by idempotent publishing.
   */
  producerGroupId?: number;
  /**
   * The starting number that should be used for the automatic sequencing of events for the associated partition, when published by this producer.
   *
   * If `undefined`, the Event Hubs service will control the value.
   *
   * The producer group is only recognized and relevant when certain features of the producer are enabled.
   * For example, it is used by idempotent publishing.
   */
  startingSequenceNumber?: number;
}

/**
 * Describes the information about the state of publishing for a partition.
 */
export interface PartitionPublishingProperties {
  /**
   * Indicates whether or not idempotent publishing is enabled for the producer and, by extension, the associated partition.
   */
  isIdempotentPublishingEnabled: boolean;
  /**
   * The owner level of the producer publishing to the associated partition.
   */
  ownerLevel?: number;
  /**
   * The partition id the properties are associated with.
   */
  partitionId: string;
  /**
   * The identifier of the producer group for which this producer is publishing to the associated partition.
   */
  producerGroupId?: number;
  /**
   * The sequence number assigned to the event that was most recently published to the associated partition successfully.
   */
  lastPublishedSequenceNumber?: number;
}
