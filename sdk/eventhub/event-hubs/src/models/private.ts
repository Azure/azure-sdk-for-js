// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { PartitionLoadBalancer } from "../partitionLoadBalancer";
import { SubscribeOptions } from "../eventHubConsumerClientModels";

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
