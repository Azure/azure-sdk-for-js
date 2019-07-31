// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// import { PartitionContext } from "./partitionContext";
import { EventData } from "./eventData";
// import { PartitionManager } from "./eventProcessor";

/**
 * Used by createCheckpoint in PartitionManager
 **/
export interface Checkpoint {
   /**
   * @property The event hub name
   */
  eventHubName: string;
   /**
   * @property The consumer group name
   */
  consumerGroupName: string;
   /**
   * @property The unique instance identifier
   */
  instanceId: string;
   /**
   * @property The identifier of the Event Hub partition
   */
  partitionId: string;
   /**
   * @property The sequence number of the event.
   */
  sequenceNumber: number;
   /**
   * @property The offset of the event.
   */
  offset: number;
}

/**
 * CheckPointManager is created by the library & passed to user's code to let them create a checkpoint
 */
export class CheckpointManager {
  // private _partitionContext: PartitionContext; // for internal use by createCheckpoint
  // private _partitionManager: PartitionManager; // for internal use by createCheckpoint

  // constructor(partitionContext: PartitionContext, partitionManager: PartitionManager) {
  //   this._partitionContext = partitionContext;
  //   this._partitionManager = partitionManager;
  // }

  public async updateCheckpoint(eventData: EventData): Promise<void>;

  public async updateCheckpoint(offset: string, sequenceNumber: number): Promise<void>;

  public async updateCheckpoint(
    eventDataOrOffset: EventData | string,
    sequenceNumber?: number
  ): Promise<void> {}
}
