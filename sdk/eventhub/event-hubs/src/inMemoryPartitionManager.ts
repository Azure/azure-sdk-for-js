// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { PartitionOwnership, PartitionManager } from "./eventProcessor";
import { Checkpoint } from "./partitionProcessor";
import { generate_uuid } from "rhea-promise";
import { throwTypeErrorIfParameterMissing } from './util/error';

/**
 * The `EventProcessor` relies on a `PartitionManager` to store checkpoints and handle partition
 * ownerships. `InMemoryPartitionManager` is simple partition manager that stores checkpoints and
 * partition ownerships in memory of your program.
 *
 * You can use the `InMemoryPartitionManager` to get started with using the `EventProcessor`.
 * But in production, you should choose an implementation of the `PartitionManager` interface that will
 * store the checkpoints and partition ownerships to a durable store instead.
 *
 * @class
 */
export class InMemoryPartitionManager implements PartitionManager {
  private _partitionOwnershipMap: Map<string, PartitionOwnership> = new Map();
  private _committedCheckpoints: Map<string, Map<string, Checkpoint>> = new Map();

  /**
   * Get the list of all existing partition ownership from the underlying data store. Could return empty
   * results if there are is no existing ownership information.
   *
   * @param fullyQualifiedNamespace The fully qualified Event Hubs namespace. This is likely to be similar to
   * <yournamespace>.servicebus.windows.net.
   * @param eventHubName The event hub name.
   * @param consumerGroupName The consumer group name.
   * @return Partition ownership details of all the partitions that have/had an owner..
   */
  async listOwnership(
    fullyQualifiedNamespace: string,
    eventHubName: string,
    consumerGroupName: string
  ): Promise<PartitionOwnership[]> {
    return Array.from(this._partitionOwnershipMap.values());
  }

  /**
   * Claim ownership of a list of partitions. This will return the list of partitions that were owned
   * successfully.
   *
   * @param partitionOwnership The list of partition ownership this instance is claiming to own.
   * @return A list partitions this instance successfully claimed ownership.
   */
  async claimOwnership(partitionOwnership: PartitionOwnership[]): Promise<PartitionOwnership[]> {
    for (const ownership of partitionOwnership) {
      if (
        !this._partitionOwnershipMap.has(ownership.partitionId) ||
        this._partitionOwnershipMap.get(ownership.partitionId)!.eTag === ownership.eTag
      ) {
        ownership.eTag = generate_uuid();
        var date = new Date();
        ownership.lastModifiedTimeInMS = date.getTime();
        this._partitionOwnershipMap.set(ownership.partitionId, ownership);
      }
    }
    return partitionOwnership;
  }

  /**
   * Updates the checkpoint in the data store for a partition.
   *
   * @param checkpoint The checkpoint.
   * @return The new eTag on successful update
   */
  async updateCheckpoint(checkpoint: Checkpoint): Promise<string> {
    // these checks should mirror what we do in checkpointStoreBlob
    // throwTypeErrorIfParameterMissing("", "updateCheckpoint", "ownerId", checkpoint.ownerId);
    throwTypeErrorIfParameterMissing("", 
      "updateCheckpoint",
      "sequenceNumber",
      checkpoint.sequenceNumber
    );
    throwTypeErrorIfParameterMissing("", "updateCheckpoint", "offset", checkpoint.offset);
    
    const partitionOwnership = this._partitionOwnershipMap.get(checkpoint.partitionId);
    if (partitionOwnership) {
      partitionOwnership.eTag = generate_uuid();

      const key = `${checkpoint.fullyQualifiedNamespace}:${checkpoint.eventHubName}:${checkpoint.consumerGroupName}`;
      let partitionMap = this._committedCheckpoints.get(key);

      if (partitionMap == null) {
        partitionMap = new Map();
        this._committedCheckpoints.set(key, partitionMap);
      }

      partitionMap.set(checkpoint.partitionId, checkpoint);
      return partitionOwnership.eTag;
    }
    return "";
  }

  async listCheckpoints(fullyQualifiedNamespace: string, eventHubName: string, consumerGroup: string): Promise<Checkpoint[]> {
    const key = `${fullyQualifiedNamespace}:${eventHubName}:${consumerGroup}`;
    
    const partitionMap = this._committedCheckpoints.get(key);
    return partitionMap
      ? [...partitionMap.values()]
      : [];
  }
}
