// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * `PartitionContext` holds information on the partition, consumer group and event hub 
 * being processed by the `EventProcessor`.
 * 
 * User is never meant to create `PartitionContext` directly. It is only passed to user code
 * by the `EventProcessor`.
 */
export interface PartitionContext {
  /**
   * @property The identifier of the Event Hub partition
   * @readonly 
   */
  readonly partitionId: string;
   /**
   * @property The event hub name
   * @readonly 
   */
  readonly eventHubName: string;
   /**
   * @property The consumer group name
   * @readonly 
   */
  readonly consumerGroupName: string;
}
