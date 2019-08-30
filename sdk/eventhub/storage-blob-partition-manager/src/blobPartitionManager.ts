// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { PartitionManager, PartitionOwnership, Checkpoint } from "@azure/event-hubs";
import { ContainerClient } from "@azure/storage-blob";
import * as log from "./log";

/**
 * A simple in-memory implementation of a `PartitionManager`
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

    for await (const blob of this._containerClient.listBlobsFlat({ include: ["metadata"] })) {
      const partitionOwnership: PartitionOwnership = {
        eventHubName, // from EventProcessor
        consumerGroupName, // from EventProcessor
        ownerId: blob.metadata!["OwnerId"],
        partitionId: blob.name, // name of blob
        offset: parseInt(blob.metadata!["Offset"], 10),
        sequenceNumber: parseInt(blob.metadata!["SequenceNumber"]),
        lastModifiedTimeInMS: Date.parse(blob.properties.lastModified.toISOString()),
        eTag: blob.properties.etag,
        ownerLevel: 0
      };
      partitionOwnershipArray.push(partitionOwnership);
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
      let blobItem;
      for await (const blob of this._containerClient.listBlobsFlat()) {
        if (blob.name === ownership.partitionId) {
          blobItem = blob;
        }
      }
      const blobClient = this._containerClient.getBlobClient(ownership.partitionId);
      const blockBlobClient = blobClient.getBlockBlobClient();
      if (blobItem && blobItem.properties.etag) {
        const uploadBlobResponse = await blockBlobClient.upload("", 0, {
          metadata: {
            OwnerId: ownership.ownerId,
            SequenceNumber: ownership.sequenceNumber!.toString(),
            Offset: ownership.offset!.toString()
          },
          accessConditions: {
            modifiedAccessConditions: {
              ifMatch: blobItem.properties.etag
            }
          }
        });
        ownership.lastModifiedTimeInMS = Date.parse(uploadBlobResponse.lastModified!.toISOString());
        ownership.eTag = uploadBlobResponse.eTag;
        partitionOwnershipArray.push(ownership);
        log.blobPartitionManager(
          `Upload block blob ${ownership.partitionId} successfully`,
          `LastModifiedTime: ${uploadBlobResponse.lastModified!.toISOString()}, ETag: ${
            uploadBlobResponse.eTag
          }`
        );
      } else {
        const uploadBlobResponse = await blockBlobClient.upload("", 0, {
          metadata: {
            OwnerId: ownership.ownerId,
            SequenceNumber: ownership.sequenceNumber!.toString(),
            Offset: ownership.offset!.toString()
          },
          accessConditions: {
            modifiedAccessConditions: {
              ifNoneMatch: "*"
            }
          }
        });
        ownership.lastModifiedTimeInMS = Date.parse(uploadBlobResponse.lastModified!.toISOString());
        ownership.eTag = uploadBlobResponse.eTag;
        partitionOwnershipArray.push(ownership);
        log.blobPartitionManager(
          `Upload block blob ${ownership.partitionId} successfully`,
          `LastModifiedTime: ${uploadBlobResponse.lastModified!.toISOString()}, ETag: ${
            uploadBlobResponse.eTag
          }`
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
    const blobClient = this._containerClient.getBlobClient(checkpoint.partitionId);
    const blockBlobClient = blobClient.getBlockBlobClient();
    const uploadBlobResponse = await blockBlobClient.upload("", 0, {
      metadata: {
        OwnerId: checkpoint.ownerId,
        SequenceNumber: checkpoint.sequenceNumber!.toString(),
        Offset: checkpoint.offset!.toString()
      },
      accessConditions: {
        modifiedAccessConditions: {
          ifMatch: checkpoint.eTag
        }
      }
    });

    log.blobPartitionManager(
      `Upload block blob ${checkpoint.partitionId} successfully`,
      `LastModifiedTime: ${uploadBlobResponse.lastModified!.toISOString()}, ETag: ${
        uploadBlobResponse.eTag
      }`
    );
    return uploadBlobResponse.eTag || "";
  }
}
