// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { PartitionManager, PartitionOwnership, Checkpoint } from "@azure/event-hubs";
import { ContainerClient } from "@azure/storage-blob";
import * as log from "./log";

/**
 * A blob storage implementation of a `PartitionManager`
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
   *
   * @param eventHubName The event hub name.
   * @param consumerGroupName The consumer group name.
   * @return Partition ownership details of all the partitions that have/had an owner..
   */
  async listOwnership(
    eventHubName: string,
    consumerGroupName: string
  ): Promise<PartitionOwnership[]> {
    const partitionOwnershipArray: PartitionOwnership[] = [];
    try {
      for await (const blob of this._containerClient.listBlobsFlat({
        include: ["metadata"],
        prefix: `${eventHubName}/${consumerGroupName}/`
      })) {
        const blobPath = blob.name.split("/");
        const blobName = blobPath[blobPath.length - 1];
        const partitionOwnership: PartitionOwnership = {
          eventHubName,
          consumerGroupName,
          ownerId: blob.metadata!.ownerid,
          partitionId: blobName,
          offset: blob.metadata ? parseInt(blob.metadata.offset) : -1,
          sequenceNumber: blob.metadata ? parseInt(blob.metadata.sequencenumber) : -1,
          lastModifiedTimeInMS:
            blob.properties.lastModified && Date.parse(blob.properties.lastModified.toISOString()),
          eTag: blob.properties.etag,
          ownerLevel: 0 // this needs to be removed from eventhubs
        };
        partitionOwnershipArray.push(partitionOwnership);
      }
    } catch (err) {
      log.error(`Error ocuured while fetching the list of the blobs.`, err);
    }

    return partitionOwnershipArray;
  }

  /**
   * Claim ownership of a list of partitions. This will return the list of partitions that were owned
   * successfully.
   *
   * @param partitionOwnership The list of partition ownership this instance is claiming to own.
   * @return A list partitions this instance successfully claimed ownership.
   */
  async claimOwnership(partitionOwnership: PartitionOwnership[]): Promise<PartitionOwnership[]> {
    let partitionOwnershipArray: PartitionOwnership[] = [];
    for (const ownership of partitionOwnership) {
      const blobName = `${ownership.eventHubName}/${ownership.consumerGroupName}/${ownership.partitionId}`;
      let eTag;
      try {
        for await (const blob of this._containerClient.listBlobsFlat({
          include: ["metadata"],
          prefix: `${ownership.eventHubName}/${ownership.consumerGroupName}/`
        })) {
          if (blob.name === blobName) {
            eTag = blob.properties.etag;
            break;
          }
        }
        let uploadBlobResponse;
        const blobClient = this._containerClient.getBlobClient(blobName);
        const blockBlobClient = blobClient.getBlockBlobClient();
        if (eTag) {
          uploadBlobResponse = await blockBlobClient.upload("", 0, {
            metadata: {
              OwnerId: ownership.ownerId,
              SequenceNumber: ownership.sequenceNumber ? ownership.sequenceNumber.toString() : "",
              Offset: ownership.offset ? ownership.offset.toString() : ""
            },
            accessConditions: {
              modifiedAccessConditions: {
                ifMatch: eTag
              }
            }
          });
        } else {
          uploadBlobResponse = await blockBlobClient.upload("", 0, {
            metadata: {
              OwnerId: ownership.ownerId,
              SequenceNumber: ownership.sequenceNumber ? ownership.sequenceNumber.toString() : "",
              Offset: ownership.offset ? ownership.offset.toString() : ""
            },
            accessConditions: {
              modifiedAccessConditions: {
                ifNoneMatch: "*"
              }
            }
          });
        }
        ownership.lastModifiedTimeInMS = Date.parse(uploadBlobResponse.lastModified!.toISOString());
        ownership.eTag = uploadBlobResponse.eTag;
        partitionOwnershipArray.push(ownership);
        log.blobPartitionManager(
          `Upload block blob ${blobName} successfully`,
          `LastModifiedTime: ${uploadBlobResponse.lastModified!.toISOString()}, ETag: ${
            uploadBlobResponse.eTag
          }`
        );
      } catch (err) {
        log.error(
          `${[ownership.ownerId]} Error ocuured while claiming ownership for partition: ${
            ownership.partitionId
          }`,
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
    const blobName = `${checkpoint.eventHubName}/${checkpoint.consumerGroupName}/${checkpoint.partitionId}`;
    let ownerId;
    let blob;
    try {
      for await (const blobItem of this._containerClient.listBlobsFlat({
        include: ["metadata"],
        prefix: `${checkpoint.eventHubName}/${checkpoint.consumerGroupName}/`
      })) {
        if (blobItem.name === blobName) {
          ownerId = blobItem.metadata!.ownerid;
          blob = blobItem;
          break;
        }
      }
    } catch (err) {
      log.error(
        `${[checkpoint.ownerId]} Error ocuured while downloading the blob for partition: ${
          checkpoint.partitionId
        }`,
        err
      );
      return "";
    }

    if (!blob) {
      log.error(
        `Checkpoint for partitionId: ${checkpoint.partitionId} never claimed, hence cannot update the checkpoint.`
      );
      throw new Error(
        `Checkpoint for partitionId: ${checkpoint.partitionId} never claimed, hence cannot update the checkpoint.`
      );
    }
    if (ownerId !== checkpoint.ownerId) {
      log.error(
        `ownerId: [${checkpoint.ownerId}] doesn't match with stored ownerId: [${ownerId}], hence cannot update the checkpoint.`
      );
      throw new Error(
        `OwnerId: [${checkpoint.ownerId}] doesn't match with stored ownerId: [${ownerId}], hence cannot update the checkpoint.`
      );
    }
    try {
      const blobClient = this._containerClient.getBlobClient(blobName);
      const blockBlobClient = blobClient.getBlockBlobClient();
      const uploadBlobResponse = await blockBlobClient.upload("", 0, {
        metadata: {
          OwnerId: checkpoint.ownerId,
          SequenceNumber: checkpoint.sequenceNumber ? checkpoint.sequenceNumber.toString() : "",
          Offset: checkpoint.offset ? checkpoint.offset.toString() : ""
        },
        accessConditions: {
          modifiedAccessConditions: {
            ifMatch: checkpoint.eTag
          }
        }
      });

      log.blobPartitionManager(
        `Upload block blob ${blobName} successfully`,
        `LastModifiedTime: ${uploadBlobResponse.lastModified!.toISOString()}, ETag: ${
          uploadBlobResponse.eTag
        }`
      );
      return uploadBlobResponse.eTag || "";
    } catch (err) {
      log.error(
        `${[checkpoint.ownerId]} Error ocuured while uploading the blob for partition: ${
          checkpoint.partitionId
        }, hence cannot update the checkpoint`,
        err
      );
      return "";
    }
  }
}
