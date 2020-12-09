// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CheckpointStore, PartitionOwnership, Checkpoint } from "../../../src";
import { generate_uuid } from "rhea-promise";

/**
 * The `EventProcessor` relies on a `CheckpointStore` to store checkpoints and handle partition
 * ownerships. `InMemoryCheckpointStore` is simple partition manager that stores checkpoints and
 * partition ownerships in memory of your program.
 *
 * You can use the `TestInMemoryCheckpointStore` to get started with using the `EventProcessor`.
 * But in production, you should choose an implementation of the `CheckpointStore` interface that will
 * store the checkpoints and partition ownerships to a durable store instead.
 *
 * @class
 * @internal
 * @ignore
 */
export class TestInMemoryCheckpointStore implements CheckpointStore {
  private _partitionOwnershipMap: Map<string, PartitionOwnership> = new Map();
  private _committedCheckpoints: Map<string, Map<string, Checkpoint>> = new Map();

  /**
   * Get the list of all existing partition ownership from the underlying data store. Could return empty
   * results if there are is no existing ownership information.
   *
   * @param fullyQualifiedNamespace The fully qualified Event Hubs namespace. This is likely to be similar to
   * <yournamespace>.servicebus.windows.net.
   * @param eventHubName The event hub name.
   * @param consumerGroup The consumer group name.
   * @return Partition ownership details of all the partitions that have/had an owner..
   */
  async listOwnership(
    _fullyQualifiedNamespace: string,
    _eventHubName: string,
    _consumerGroup: string
  ): Promise<PartitionOwnership[]> {
    const ownerships = [];

    for (const value of this._partitionOwnershipMap.values()) {
      ownerships.push({ ...value });
    }

    return ownerships;
  }

  /**
   * Claim ownership of a list of partitions. This will return the list of partitions that were owned
   * successfully.
   *
   * @param partitionOwnership The list of partition ownership this instance is claiming to own.
   * @return A list partitions this instance successfully claimed ownership.
   */
  async claimOwnership(partitionOwnership: PartitionOwnership[]): Promise<PartitionOwnership[]> {
    const claimedOwnerships = [];

    for (const ownership of partitionOwnership) {
      if (
        !this._partitionOwnershipMap.has(ownership.partitionId) ||
        this._partitionOwnershipMap.get(ownership.partitionId)!.etag === ownership.etag
      ) {
        const date = new Date();

        const newOwnership = {
          ...ownership,
          etag: generate_uuid(),
          lastModifiedTimeInMs: date.getTime()
        };

        this._partitionOwnershipMap.set(newOwnership.partitionId, newOwnership);
        claimedOwnerships.push(newOwnership);
      }
    }
    return claimedOwnerships;
  }

  /**
   * Updates the checkpoint in the data store for a partition.
   *
   * @param checkpoint The checkpoint.
   */
  async updateCheckpoint(checkpoint: Checkpoint): Promise<void> {
    checkpoint = { ...checkpoint };

    const partitionOwnership = this._partitionOwnershipMap.get(checkpoint.partitionId);
    if (partitionOwnership) {
      partitionOwnership.etag = generate_uuid();

      const key = `${checkpoint.fullyQualifiedNamespace}:${checkpoint.eventHubName}:${checkpoint.consumerGroup}`;
      let partitionMap = this._committedCheckpoints.get(key);

      if (partitionMap == null) {
        partitionMap = new Map();
        this._committedCheckpoints.set(key, partitionMap);
      }

      partitionMap.set(checkpoint.partitionId, checkpoint);
    }
  }

  async listCheckpoints(
    fullyQualifiedNamespace: string,
    eventHubName: string,
    consumerGroup: string
  ): Promise<Checkpoint[]> {
    const key = `${fullyQualifiedNamespace}:${eventHubName}:${consumerGroup}`;

    const partitionMap = this._committedCheckpoints.get(key);

    if (partitionMap == null) {
      return [];
    }

    const checkpoints = [];

    for (const value of partitionMap.values()) {
      checkpoints.push({ ...value });
    }

    return checkpoints;
  }
}
