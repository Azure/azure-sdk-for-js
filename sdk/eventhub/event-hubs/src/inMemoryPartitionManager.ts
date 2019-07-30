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

  async listOwnerships(
    eventHubName: string,
    consumerGroupName: string
  ): Promise<PartitionOwnership[]> {
    return Array.from(this._partitionOwnershipMap.values());
  }

  async claimOwnerships(partitionOwnerships: PartitionOwnership[]): Promise<PartitionOwnership[]> {
    for (let partitionOwnership of partitionOwnerships) {
      if (!this._partitionOwnershipMap.has(partitionOwnership.partitionId)) {
        partitionOwnership.eTag = generate_uuid();
        this._partitionOwnershipMap.set(partitionOwnership.partitionId, partitionOwnership);
      }
    }
    return partitionOwnerships;
  }

  async updateCheckpoint(checkpoint: Checkpoint): Promise<void> {
    let partitionOwnership = this._partitionOwnershipMap.get(checkpoint.partitionId);
    if (partitionOwnership) {
      partitionOwnership.sequenceNumber = checkpoint.sequenceNumber;
      partitionOwnership.offset = checkpoint.offset;
      partitionOwnership.eTag = generate_uuid();
    }
  }
}
