// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CheckpointStore, PartitionOwnership, Checkpoint } from "@azure/event-hubs";
import { odata, TableClient } from "@azure/data-tables";

/**
 * @internal
 * @hidden
 */
export interface CustomCheckpoint extends Checkpoint {
  partitionKey: string;
  rowKey: string;
}

/**
 * @internal
 * @hidden
 */
export interface CustomPartition extends PartitionOwnership {
  partitionKey: string;
  rowKey: string;
}

/**
 * An implementation of CheckpointStore that uses Azure Table Storage to persist checkpoint data.
 */
export class TableCheckpointStore implements CheckpointStore {
  private _tableClient: TableClient;

  constructor(tableClient: TableClient) {
    this._tableClient = tableClient;
  }
  /**
   * Get the list of all existing partition ownership from the underlying data store. May return empty
   * results if there are is no existing ownership information.
   * Partition Ownership contains the information on which `EventHubConsumerClient` subscribe call is currently processing the partition.
   *
   * @param fullyQualifiedNamespace - The fully qualified Event Hubs namespace. This is likely to be similar to
   * <yournamespace>.servicebus.windows.net.
   * @param eventHubName - The event hub name.
   * @param consumerGroup - The consumer group name.
   * @param options - A set of options that can be specified to influence the behavior of this method.
   *  - `abortSignal`: A signal used to request operation cancellation.
   *  - `tracingOptions`: Options for configuring tracing.
   * @returns Partition ownership details of all the partitions that have had an owner.
   */
  async listOwnership(
    fullyQualifiedNamespace: string,
    eventHubName: string,
    consumerGroup: string
  ): Promise<PartitionOwnership[]> {
    const partitionKey = `${fullyQualifiedNamespace} ${eventHubName} ${consumerGroup} Ownership`;
    const partitionOwnershipArray: PartitionOwnership[] = [];
    const entitiesIter = this._tableClient.listEntities<PartitionOwnership>({
      queryOptions: { filter: odata`PartitionKey eq ${partitionKey}` }
    });

    for await (const entity of entitiesIter) {
      const partitionOwnership: PartitionOwnership = {
        fullyQualifiedNamespace,
        eventHubName,
        consumerGroup,
        ownerId: entity.ownerId,
        partitionId: entity.partitionId,
        lastModifiedTimeInMs: entity.lastModifiedTimeInMs,
        etag: entity.etag
      };
      partitionOwnershipArray.push(partitionOwnership);
    }
    return partitionOwnershipArray;
  }

  /**
   * Claim ownership of a list of partitions. This will return the list of partitions that were
   * successfully claimed.
   *
   * @param partitionOwnership - The list of partition ownership this instance is claiming to own.
   * @param options - A set of options that can be specified to influence the behavior of this method.
   *  - `abortSignal`: A signal used to request operation cancellation.
   *  - `tracingOptions`: Options for configuring tracing.
   * @returns A list partitions this instance successfully claimed ownership.
   */
  async claimOwnership(partitionOwnership: PartitionOwnership[]): Promise<PartitionOwnership[]> {
    const partitionOwnershipArray: PartitionOwnership[] = [];

    for (const ownership of partitionOwnership) {
      const partition_Key = `${ownership.fullyQualifiedNamespace} ${ownership.eventHubName} ${ownership.consumerGroup} Ownership`;
      const curr_ownership = {
        partitionKey: partition_Key,
        rowKey: ownership.partitionId,
        lastModifiedTimeInMs: ownership.lastModifiedTimeInMs,
        etag: ownership.etag
      };

      const ownershipEntity: CustomPartition = {
        partitionKey: partition_Key,
        rowKey: curr_ownership.rowKey,
        consumerGroup: ownership.consumerGroup,
        fullyQualifiedNamespace: ownership.fullyQualifiedNamespace,
        eventHubName: ownership.eventHubName,
        lastModifiedTimeInMs: ownership.lastModifiedTimeInMs,
        etag: ownership.etag,
        ownerId: ownership.ownerId,
        partitionId: ownership.partitionId
      };
      const entitiesIter = this._tableClient.listEntities<CustomPartition>({
        queryOptions: { filter: odata`PartitionKey eq ${partition_Key}` }
      });
      let k = 0;
      for await (const entity of entitiesIter) {
        k++;
        entity.lastModifiedTimeInMs = 11;
      }
      if (k > 0) {
        let ownerships: PartitionOwnership[] = [];
        ownerships = await this.listOwnership(
          ownership.fullyQualifiedNamespace,
          ownership.eventHubName,
          ownership.consumerGroup
        );
        for (const own of ownerships) {
          if (own.etag === ownership.etag) {
            await this._tableClient.updateEntity(curr_ownership);
            partitionOwnershipArray.push(ownership);
          } else {
            await this._tableClient.upsertEntity(ownershipEntity);
          }
        }
      } else {
        await this._tableClient.upsertEntity(ownershipEntity);
      }
    }
    return partitionOwnershipArray;
  }

  /**
   * Lists all the checkpoints in a data store for a given namespace, eventhub and consumer group.
   *
   * @param fullyQualifiedNamespace - The fully qualified Event Hubs namespace. This is likely to be similar to
   * <yournamespace>.servicebus.windows.net.
   * @param eventHubName - The event hub name.
   * @param consumerGroup - The consumer group name.
   * @param options - A set of options that can be specified to influence the behavior of this method.
   *  - `abortSignal`: A signal used to request operation cancellation.
   *  - `tracingOptions`: Options for configuring tracing.
   */
  async listCheckpoints(
    fullyQualifiedNamespace: string,
    eventHubName: string,
    consumerGroup: string
  ): Promise<Checkpoint[]> {
    const partition_Key = `${fullyQualifiedNamespace} ${eventHubName} ${consumerGroup} Checkpoint`;
    const checkpoints: Checkpoint[] = [];

    const entitiesIter = this._tableClient.listEntities<Checkpoint>({
      queryOptions: { filter: odata`PartitionKey eq ${partition_Key}` }
    });

    for await (const entity of entitiesIter) {
      checkpoints.push({
        consumerGroup,
        eventHubName,
        fullyQualifiedNamespace,
        partitionId: entity.partitionId,
        offset: entity.offset,
        sequenceNumber: entity.sequenceNumber
      });
    }

    return checkpoints;
  }

  /**
   * Updates the checkpoint in the data store for a partition.
   *
   * @param checkpoint - The checkpoint.
   * @param options - A set of options that can be specified to influence the behavior of this method.
   *  - `abortSignal`: A signal used to request operation cancellation.
   *  - `tracingOptions`: Options for configuring tracing.
   * @returns A promise that resolves when the checkpoint has been updated.
   */
  async updateCheckpoint(checkpoint: Checkpoint): Promise<void> {
    const partition_Key = `${checkpoint.fullyQualifiedNamespace} ${checkpoint.eventHubName} ${checkpoint.consumerGroup} Checkpoint`;
    const checkpointEntity: CustomCheckpoint = {
      partitionKey: partition_Key,
      rowKey: checkpoint.partitionId,
      consumerGroup: checkpoint.consumerGroup,
      fullyQualifiedNamespace: checkpoint.fullyQualifiedNamespace,
      eventHubName: checkpoint.eventHubName,
      sequenceNumber: checkpoint.sequenceNumber,
      offset: checkpoint.offset,
      partitionId: checkpoint.partitionId
    };

    const entitiesIter = this._tableClient.listEntities<Checkpoint>({
      queryOptions: { filter: odata`PartitionKey eq ${partition_Key}` }
    });
    let i = 0;
    for await (const ent of entitiesIter) {
      ent.offset = 0;
      i++;
    }

    if (i > 0) {
      let checkpoints: Checkpoint[] = [];
      checkpoints = await this.listCheckpoints(
        checkpoint.fullyQualifiedNamespace,
        checkpoint.eventHubName,
        checkpoint.consumerGroup
      );
      for (const checkpnt of checkpoints) {
        if (checkpnt.partitionId === checkpoint.partitionId) {
          await this._tableClient.updateEntity(checkpointEntity);
        } else {
          await this._tableClient.upsertEntity(checkpointEntity);
        }
      }
    } else {
      await this._tableClient.upsertEntity(checkpointEntity);
    }

    return;
  }
}
