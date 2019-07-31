// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * PartitionContext is passed into an EventProrcessor's initialization handler and contains information
 * about the partition, the EventProcessor will be processing events from.
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
