// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { PartitionLoadBalancer } from "../partitionLoadBalancer";
import { RetryOptions } from "@azure/core-amqp";
import { SubscribeOptions } from "../eventHubConsumerClientModels";

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
export interface CommonEventProcessorOptions  // make the 'maxBatchSize', 'maxWaitTimeInSeconds', 'ownerLevel' fields required extends // for our internal classes (these are optional for external users)
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
   * The amount of time to wait between each attempt at claiming partitions.
   */
  loopIntervalInMs?: number;

  /**
   * A load balancer to use to find targets or a specific partition to target.
   */
  processingTarget?: PartitionLoadBalancer | string;

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
}
