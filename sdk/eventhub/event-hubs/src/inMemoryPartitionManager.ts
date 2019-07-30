// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { PartitionManager, PartitionOwnership } from "./eventProcessor";
import { Checkpoint } from "./checkpointManager";
import { generate_uuid } from "rhea-promise";

/**
 * A simple in-memory implementation of a `PartitionManager`
 * @class
 */
export class InMemoryPartitionManager implements PartitionManager {
  private _partitionOwnershipMap: Map<string, PartitionOwnership> = new Map();

  /**
   * Get the list of all existing partition ownership from the underlying data store. Could return empty
   * results if there are is no existing ownership information.
   * 
   * @param eventHubName The event hub name.
   * @param consumerGroupName The consumer group name.
   * @return Partition ownership details of all the partitions that have/had an owner..
   */
  async listOwnerships(
    eventHubName: string,
    consumerGroupName: string
  ): Promise<PartitionOwnership[]> {
    return Array.from(this._partitionOwnershipMap.values());
  }

  /**
   * Claim ownership of a list of partitions. This will return the list of partitions that were owned
   * successfully.
   *
   * @param partitionOwnerships The list of partition ownerships this instance is claiming to own.
   * @return A list partitions this instance successfully claimed ownership.
   */
  async claimOwnerships(partitionOwnerships: PartitionOwnership[]): Promise<PartitionOwnership[]> {
    for (const partitionOwnership of partitionOwnerships) {
      if (!this._partitionOwnershipMap.has(partitionOwnership.partitionId)) {
        partitionOwnership.eTag = generate_uuid();
        this._partitionOwnershipMap.set(partitionOwnership.partitionId, partitionOwnership);
      }
    }
    return partitionOwnerships;
  }

  /**
   * Updates the checkpoint in the data store for a partition.
   *
   * @param checkpoint The checkpoint.
   * @return Promise<void>
   */
  async updateCheckpoint(checkpoint: Checkpoint): Promise<void> {
    const partitionOwnership = this._partitionOwnershipMap.get(checkpoint.partitionId);
    if (partitionOwnership) {
      partitionOwnership.sequenceNumber = checkpoint.sequenceNumber;
      partitionOwnership.offset = checkpoint.offset;
      partitionOwnership.eTag = generate_uuid();
    }
  }
}
