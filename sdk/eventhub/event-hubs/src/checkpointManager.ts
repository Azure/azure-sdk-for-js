// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { PartitionContext } from "./partitionContext";
import { EventData } from "./eventData";
import { PartitionManager } from "./eventProcessor";

/**
 * Used by createCheckpoint in PartitionManager
 **/
export interface Checkpoint {
  eventHubName: string;
  consumerGroupName: string;
  instanceId: string;
  partitionId: string;
  sequenceNumber: number;
  offset: number;
}

/**
 * CheckPointManager is created by the library & passed to user's code to let them create a checkpoint
 */
export class CheckpointManager {
  private partitionContext: PartitionContext; // for internal use by createCheckpoint
  private partitionManager: PartitionManager; // for internal use by createCheckpoint

  constructor(partitionContext: PartitionContext, partitionManager: PartitionManager) {
    this.partitionContext = partitionContext;
    this.partitionManager = partitionManager;
  }

  public async createCheckpoint(eventData: EventData): Promise<void>;

  public async createCheckpoint(offset: string, sequenceNumber: number): Promise<void>;

  public async createCheckpoint(
    eventDataOrOffset: EventData | string,
    sequenceNumber?: number
  ): Promise<void> {}
}
