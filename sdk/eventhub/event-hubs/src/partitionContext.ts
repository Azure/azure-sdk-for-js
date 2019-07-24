// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
* PartitionContext is passed into an EventProrcessor's initialization handler and contains information
* about the partition, the EventProcessor will be processing events from.
*/
export class PartitionContext {
 public readonly partitionId: string;
 public readonly eventHubName: string;
 public readonly consumerGroupName: string;

 constructor(
    partitionId: string,
    eventHubName: string,
    consumerGroupName: string
  ) {
      this.partitionId = partitionId;
      this.eventHubName = eventHubName;
      this.consumerGroupName = consumerGroupName;
  }
}
