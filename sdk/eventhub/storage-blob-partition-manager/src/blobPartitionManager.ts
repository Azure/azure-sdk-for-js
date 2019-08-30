// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { PartitionManager, PartitionOwnership, Checkpoint } from "@azure/event-hubs";
import { ContainerClient, Models } from "@azure/storage-blob";
import { generate_uuid } from "rhea-promise";

/**
 * A simple in-memory implementation of a `PartitionManager`
 * @class
 */
export class BlobPartitionManager implements PartitionManager {
  private _partitionOwnershipMap: Map<string, PartitionOwnership> = new Map();
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
    const partitionOwnership = await this._containerClient.listBlobsFlat({ include: ["metadata"] });
    const partitionOwnershipArray: PartitionOwnership[] = [];

    for await (const ownership of partitionOwnership) {
      const partitionOwnership: PartitionOwnership = {
        eventHubName, // from EventProcessor
        consumerGroupName, // from EventProcessor
        ownerId: ownership.metadata!["OwnerId"],
        partitionId: "0", // name of blob
        offset: parseInt(ownership.metadata!["Offset"], 10),
        sequenceNumber: parseInt(ownership.metadata!["SequenceNumber"]),
        lastModifiedTimeInMS: Date.parse(ownership.properties.lastModified.toDateString()),
        eTag: ownership.properties.etag,
        ownerLevel: 0
      };
      partitionOwnershipArray.push(partitionOwnership);
    }

    return partitionOwnershipArray;
  }

  /**
   * Claim ownership of a list of partitions. This will return the list of partitions that were owned
   * successfully.rus
   *
   * @param partitionOwnership The list of partition ownership this instance is claiming to own.
   * @return A list partitions this instance successfully claimed ownership.
   */
  async claimOwnership(partitionOwnership: PartitionOwnership[]): Promise<PartitionOwnership[]> {
    for (const ownership of partitionOwnership) {
      console.log(ownership);
      const blobName = ownership.partitionId;
      const blobClient = this._containerClient.getBlobClient(blobName);
      const blockBlobClient = blobClient.getBlockBlobClient();
      const uploadBlobResponse = await blockBlobClient.upload("hey", 3);
      console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
      console.log(blockBlobClient);
      let i = 1;
      for await (const blob of this._containerClient.listBlobsFlat()) {
        console.log(`Blob ${i++}: ${blob.name}`);
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
    const partitionOwnership = this._partitionOwnershipMap.get(checkpoint.partitionId);
    if (partitionOwnership) {
      partitionOwnership.sequenceNumber = checkpoint.sequenceNumber;
      partitionOwnership.offset = checkpoint.offset;
      partitionOwnership.eTag = generate_uuid();
      return partitionOwnership.eTag;
    }
    return "";
  }

  // A helper method used to read a Node.js readable stream into string
private async _streamToString(readableStream: NodeJS.ReadableStream): Promise<any> {
  return new Promise((resolve, reject) => {
    const chunks: string[] = [];
    readableStream.on("data", (data) => {
      chunks.push(data.toString());
    });
    readableStream.on("end", () => {
      resolve(chunks.join(""));
    });
    readableStream.on("error", reject);
  });
}
}
