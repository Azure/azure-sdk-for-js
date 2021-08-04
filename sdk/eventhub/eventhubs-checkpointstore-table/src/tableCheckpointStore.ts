// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CheckpointStore, PartitionOwnership, Checkpoint } from "@azure/event-hubs";
import { odata, TableClient } from "@azure/data-tables";
import { logger, logErrorStackTrace } from "./log";

/**
 * A checkpoint entity of type CheckpointEntity to be stored in the table
 * @internal
 * @hidden
 */
export interface CheckpointEntity {
  partitionKey: string,
  rowKey: string,
  sequencenumber: number,
  offset: number
}



/**
 * An ownership entity of type PartitionOwnership to be stored in the table
 * @internal
 * @hidden
 */
export interface PartitionOwnershipEntity  {
  partitionKey: string,
  rowKey: string,
  ownerid : string
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
    const entitiesIter = this._tableClient.listEntities<PartitionOwnershipEntity>({
      queryOptions: { filter: odata`PartitionKey eq ${partitionKey}` }
    });
    try {
      for await (const entity of entitiesIter) {
        const partitionOwnership: PartitionOwnership = {
          fullyQualifiedNamespace,
          eventHubName,
          consumerGroup,
          ownerId: entity.ownerid,
          partitionId: entity.rowKey,
          lastModifiedTimeInMs: 36647,
          etag: entity.etag
        };
        partitionOwnershipArray.push(partitionOwnership);
      }
      return partitionOwnershipArray;
    }
    catch (err) {
      logger.warning(`Error occurred while fetching the list of entities`, err.message);
      logErrorStackTrace(err);
      if (err?.name === "AbortError") throw err;

      throw new Error(`Error occurred while fetching the list of entities. \n${err}`);
    
  }
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
      const ownershipEntity : PartitionOwnershipEntity = {
        partitionKey: partition_Key,
        rowKey: ownership.partitionId,
        ownerid: ownership.ownerId
      };

      // When we have an etag, we know the entity existed.
     // If we encounter an error we should fail.
     try {
       if (ownership.etag) {
        await this._tableClient.updateEntity(ownershipEntity, "Replace", {etag : ownership.etag}) 
        logger.info(
         `[${ownership.ownerId}] Claimed ownership successfully for partition: ${ownership.partitionId}`,
         `LastModifiedTime: ${ownership.lastModifiedTimeInMs}, ETag: ${ownership.etag}`
       );
       partitionOwnershipArray.push(ownership);
       }
       else {
         await this._tableClient.createEntity(ownershipEntity);
       }
       
     }
    catch (err) {
        if (err.statusCode === 412) {
          // etag failures (precondition not met) aren't fatal errors. They happen
          // as multiple consumers attempt to claim the same partition (first one wins)
          // and losers get this error.
          logger.verbose(
            `[${ownership.ownerId}] Did not claim partition ${ownership.partitionId}. Another processor has already claimed it.`
          );
          continue;
        }
        logger.warning(
          `Error occurred while claiming ownership for partition: ${ownership.partitionId}`,
          err.message
        );
        logErrorStackTrace(err);
        throw err;
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
    const entitiesIter = this._tableClient.listEntities<CheckpointEntity>({
      queryOptions: { filter: odata`PartitionKey eq ${partition_Key}` }
    });
    for await (const entity of entitiesIter) {
      checkpoints.push({
        consumerGroup,
        eventHubName,
        fullyQualifiedNamespace,
        partitionId: entity.rowKey,
        offset: entity.offset,
        sequenceNumber: entity.sequencenumber
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
    const checkpointEntity : CheckpointEntity = {
      partitionKey: partition_Key,
      rowKey: checkpoint.partitionId,
      sequencenumber: checkpoint.sequenceNumber,
      offset: checkpoint.offset
    };
    try {
      await this._tableClient.upsertEntity(checkpointEntity);
      logger.verbose(
        `Updated checkpoint successfully for partition: ${checkpoint.partitionId}`
      );
      return;
    }
    catch (err) {
      logger.warning(
        `Error occurred while upating the checkpoint for partition: ${checkpoint.partitionId}.`,
        err.message
      );
      logErrorStackTrace(err);
    } 
  }
 
}