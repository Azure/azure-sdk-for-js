// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * PartitionContext is passed into an EventProrcessor's initialization handler and contains information
 * about the partition, the EventProcessor will be processing events from.
 */
export interface PartitionContext {
  readonly partitionId: string;
  readonly eventHubName: string;
  readonly consumerGroupName: string;
}
