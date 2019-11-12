// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { PartitionManager, PartitionOwnership, Checkpoint } from "@azure/event-hubs";
import { ContainerClient } from "@azure/storage-blob";
import * as log from "./log";
import { throwTypeErrorIfParameterMissing } from "./util/error";

/**
 * An implementation of PartitionManager that uses Azure Blob Storage to persist checkpoint data.
 * @class
 */
export class BlobPartitionManager implements PartitionManager {
  private _containerClient: ContainerClient;

  constructor(containerClient: ContainerClient) {
    this._containerClient = containerClient;
  }
  /**
   * Get the list of all existing partition ownership from the underlying data store. Could return empty
   * results if there are is no existing ownership information.
   * Partition Ownership contains the information on which EventProcessor is currently processing the partition and the last checkpoint for the partition
   *
   * @param fullyQualifiedNamespace The fully qualified Event Hubs namespace. This is likely to be similar to
   * <yournamespace>.servicebus.windows.net.
   * @param eventHubName The event hub name.
   * @param consumerGroupName The consumer group name.
   * @return Partition ownership details of all the partitions that have had an owner.
   */
  async listOwnership(
    fullyQualifiedNamespace: string,
    eventHubName: string,
    consumerGroupName: string
  ): Promise<PartitionOwnership[]> {
    const partitionOwnershipArray: PartitionOwnership[] = [];
    try {
      for await (const blob of this._containerClient.listBlobsFlat({
        includeMetadata: true,
        prefix: BlobPartitionManager.getBlobPrefix({
          fullyQualifiedNamespace,
          eventHubName,
          consumerGroupName
        })
      })) {
        const blobPath = blob.name.split("/");
        const blobName = blobPath[blobPath.length - 1];
        const partitionOwnership: PartitionOwnership = {
          fullyQualifiedNamespace,
          eventHubName,
          consumerGroupName,
          ownerId: blob.metadata!.ownerid,
          partitionId: blobName,
          offset: blob.metadata && blob.metadata.offset ? parseInt(blob.metadata.offset) : -1,
          sequenceNumber:
            blob.metadata && blob.metadata.sequencenumber
              ? parseInt(blob.metadata.sequencenumber)
              : -1,
          lastModifiedTimeInMS:
            blob.properties.lastModified && blob.properties.lastModified.getTime(),
          eTag: blob.properties.etag,
          ownerLevel: 0 // this needs to be removed from eventhubs
        };
        partitionOwnershipArray.push(partitionOwnership);
      }
      return partitionOwnershipArray;
    } catch (err) {
      log.error(`Error occurred while fetching the list of blobs.`, err);
      throw new Error(`Error occurred while fetching the list of blobs. \n${err}`);
    }
  }

  /**
   * Claim ownership of a list of partitions. This will return the list of partitions that were
   * successfully claimed.
   *
   * @param partitionOwnership The list of partition ownership this instance is claiming to own.
   * @return A list partitions this instance successfully claimed ownership.
   */
  async claimOwnership(partitionOwnership: PartitionOwnership[]): Promise<PartitionOwnership[]> {
    let partitionOwnershipArray: PartitionOwnership[] = [];
    for (const ownership of partitionOwnership) {
      const blobName = BlobPartitionManager.getBlobPrefix(ownership);
      try {
        let updatedBlobResponse;
        const blobClient = this._containerClient.getBlobClient(blobName);
        if (ownership.eTag) {
          updatedBlobResponse = await blobClient.setMetadata(
            {
              OwnerId: ownership.ownerId ? ownership.ownerId : "",
              SequenceNumber: ownership.sequenceNumber ? ownership.sequenceNumber.toString() : "",
              Offset: ownership.offset ? ownership.offset.toString() : ""
            },
            {
              conditions: {
                ifMatch: ownership.eTag
              }
            }
          );
        } else {
          const blockBlobClient = blobClient.getBlockBlobClient();
          updatedBlobResponse = await blockBlobClient.upload("", 0, {
            metadata: {
              OwnerId: ownership.ownerId,
              SequenceNumber: ownership.sequenceNumber ? ownership.sequenceNumber.toString() : "",
              Offset: ownership.offset ? ownership.offset.toString() : ""
            },
            conditions: {
              ifNoneMatch: "*"
            }
          });
        }
        if (updatedBlobResponse.lastModified) {
          updatedBlobResponse.lastModified.getTime();
        }
        ownership.eTag = updatedBlobResponse.etag;
        partitionOwnershipArray.push(ownership);
        log.blobPartitionManager(
          `[${ownership.ownerId}] Claimed ownership successfully for partition: ${ownership.partitionId}`,
          `LastModifiedTime: ${ownership.lastModifiedTimeInMS}, ETag: ${ownership.eTag}`
        );
      } catch (err) {
        log.error(
          `Error occurred while claiming ownership for partition: ${ownership.partitionId}`,
          err
        );
      }
    }
    return partitionOwnershipArray;
  }

  /**
   * Updates the checkpoint in the data store for a partition.
   *
   * @param checkpoint The checkpoint.
   * @return The new eTag on successful update
   */
  async updateCheckpoint(checkpoint: Checkpoint): Promise<string> {
    throwTypeErrorIfParameterMissing("updateCheckpoint", "ownerId", checkpoint.ownerId);
    throwTypeErrorIfParameterMissing(
      "updateCheckpoint",
      "sequenceNumber",
      checkpoint.sequenceNumber
    );
    throwTypeErrorIfParameterMissing("updateCheckpoint", "offset", checkpoint.offset);

    const blobName = BlobPartitionManager.getBlobPrefix(checkpoint);
    try {
      const blobClient = this._containerClient.getBlobClient(blobName);
      const properties = await blobClient.getProperties();
      if (properties.metadata!.ownerid !== checkpoint.ownerId) {
        log.error(
          `ownerId: [${checkpoint.ownerId}] doesn't match with stored ownerId: [${
            properties.metadata!.ownerid
          }].`
        );
        throw new Error(
          `ownerId: [${checkpoint.ownerId}] doesn't match with stored ownerId: [${
            properties.metadata!.ownerid
          }].`
        );
      }
      const metadataResponse = await blobClient.setMetadata(
        {
          OwnerId: checkpoint.ownerId,
          SequenceNumber: checkpoint.sequenceNumber.toString(),
          Offset: checkpoint.offset.toString()
        },
        {
          conditions: {
            ifMatch: checkpoint.eTag
          }
        }
      );

      log.blobPartitionManager(
        `[${checkpoint.ownerId}] Updated checkpoint successfully for partition: ${checkpoint.partitionId}`,
        `LastModifiedTime: ${metadataResponse.lastModified!.toISOString()}, ETag: ${
          metadataResponse.etag
        }`
      );
      return metadataResponse.etag!;
    } catch (err) {
      log.error(
        `${[checkpoint.ownerId]} Error occurred while upating the checkpoint for partition: ${
          checkpoint.partitionId
        }.`,
        err
      );
      throw new Error(
        `${[checkpoint.ownerId]} Error occurred while upating the checkpoint for partition: ${
          checkpoint.partitionId
        }, ${err}`
      );
    }
  }

  private static getBlobPrefix(params: {
    fullyQualifiedNamespace: string;
    eventHubName: string;
    consumerGroupName: string;
    partitionId?: string;
  }): string {
    // none of these are case-sensitive in eventhubs so we need to make sure we don't accidentally allow
    // the user to create a case-sensitive blob for their state!
    const consumerGroupName = params.consumerGroupName.toLowerCase();
    const eventHubName = params.eventHubName.toLowerCase();
    const fullyQualifiedNamespace = params.fullyQualifiedNamespace.toLowerCase();

    if (params.partitionId) {
      return `${fullyQualifiedNamespace}/${eventHubName}/${consumerGroupName}/${params.partitionId}`;
    } else {
      return `${fullyQualifiedNamespace}/${eventHubName}/${consumerGroupName}/`;
    }
  }
}
