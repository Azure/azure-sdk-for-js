// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CheckpointStore, PartitionOwnership, Checkpoint } from "@azure/event-hubs";

import { odata, TableClient } from "@azure/data-tables";


export interface customCheckpoint extends Checkpoint {
  partitionKey : string,
  rowKey : string,
  
}

export interface customPartition extends PartitionOwnership {
  partitionKey : string,
  rowKey : string

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
    consumerGroup: string): Promise<PartitionOwnership[]> {
    let PARTITIONKEY = eventHubName + " "+  fullyQualifiedNamespace + " "+ consumerGroup + " "+ "Ownership";
    const partitionOwnershipArray: PartitionOwnership[] = [];
    let entitiesIter = this._tableClient.listEntities<PartitionOwnership >({
      queryOptions: { filter: odata`PartitionKey eq ${PARTITIONKEY}`}
    });
     
        for await (const entity of entitiesIter) {
                const partitionOwnership : PartitionOwnership = {
                    fullyQualifiedNamespace,
                    eventHubName,
                    consumerGroup,
                    ownerId: entity.ownerId,
                    partitionId: entity.partitionId,
                    lastModifiedTimeInMs: Number(entity.timestamp),
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
  async claimOwnership( partitionOwnership: PartitionOwnership[]):
  Promise<PartitionOwnership[]>
    {
      const partitionOwnershipArray: PartitionOwnership[] = [];
      for (const ownership of partitionOwnership) { 
        ownership.ownerId = "1"
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
   async listCheckpoints(fullyQualifiedNamespace: string, 
    eventHubName: string, 
    consumerGroup: string) {

        let PARTITIONKEY = eventHubName + " "+ fullyQualifiedNamespace+ " " + consumerGroup + " "+ "Checkpoint";
        const checkpoints: Checkpoint[] = [];
        
        let entitiesIter = this._tableClient.listEntities<Checkpoint>({
          queryOptions: { filter: odata`PartitionKey eq ${PARTITIONKEY}`}
        });
        for await (const entity of entitiesIter) {
            
            if (entity.hasOwnProperty('offset')) {
              checkpoints.push({
                consumerGroup,
                eventHubName,
                fullyQualifiedNamespace,
                partitionId: entity.partitionId,
                offset : entity.offset,
                sequenceNumber : entity.sequenceNumber
              });
            
            
        }
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
   async updateCheckpoint(checkpoint: Checkpoint){
    let PARTITIONKEY = checkpoint.eventHubName+ checkpoint.fullyQualifiedNamespace+ checkpoint.consumerGroup+"checkpoint"
     
     const entity = {partitionKey: PARTITIONKEY, 
     rowKey: checkpoint.partitionId, offset: 5890, sequenceNumber: 19};
 
     let entitiesIter = this._tableClient.listEntities<Checkpoint>({
       queryOptions: { filter: odata`PartitionKey eq ${PARTITIONKEY}`}
     });
     let i = 0;
     for await (const entity of entitiesIter) {
       const checkpointArray: Checkpoint[] = [];
       checkpointArray.push(entity);
       i++;
     }
 
     if (i > 0 ) {
       await this._tableClient.updateEntity(entity);
     }
     else {
      const entity1 : customCheckpoint = {
        partitionKey : PARTITIONKEY,
        rowKey : entity.rowKey,
        consumerGroup : checkpoint.consumerGroup,
        fullyQualifiedNamespace : checkpoint.fullyQualifiedNamespace,
        eventHubName: checkpoint.eventHubName,
        sequenceNumber : entity.sequenceNumber,
        offset : entity.offset,
        partitionId : checkpoint.partitionId
    
      };
      await this._tableClient.createEntity(entity1);
      
    }
    
    return;
  
  }
}
