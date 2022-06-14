// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CheckpointStore,
  PartitionOwnership,
  Checkpoint,
  OperationOptions,
} from "@azure/event-hubs";
import { Metadata, RestError, BlobSetMetadataResponse } from "@azure/storage-blob";
import { logger, logErrorStackTrace } from "./log";
import { ContainerClientLike } from "./storageBlobInterfaces";
import { throwTypeErrorIfParameterMissing } from "./util/error";

/**
 * An implementation of CheckpointStore that uses Azure Blob Storage to persist checkpoint data.
 */
export class BlobCheckpointStore implements CheckpointStore {
  private _containerClient: ContainerClientLike;

  /**
   * Constructs a new instance of {@link BlobCheckpointStore}
   * @param containerClient - An instance of a storage blob ContainerClient.
   */
  constructor(containerClient: ContainerClientLike) {
    this._containerClient = containerClient;
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
    consumerGroup: string,
    options: OperationOptions = {}
  ): Promise<PartitionOwnership[]> {
    const partitionOwnershipArray: PartitionOwnership[] = [];
    const { abortSignal, tracingOptions } = options;

    const blobPrefix = BlobCheckpointStore.getBlobPrefix({
      type: "ownership",
      fullyQualifiedNamespace,
      eventHubName,
      consumerGroup: consumerGroup,
    });

    try {
      const blobs = this._containerClient.listBlobsFlat({
        abortSignal,
        includeMetadata: true,
        prefix: blobPrefix,
        tracingOptions,
      });

      for await (const blob of blobs) {
        const blobPath = blob.name.split("/");
        const blobName = blobPath[blobPath.length - 1];

        const ownershipMetadata = (blob.metadata as OwnershipMetadata) ?? {};

        if (ownershipMetadata.ownerid == null) {
          throw new Error(`Missing ownerid in metadata for blob ${blob.name}`);
        }

        const partitionOwnership: PartitionOwnership = {
          fullyQualifiedNamespace,
          eventHubName,
          consumerGroup: consumerGroup,
          ownerId: ownershipMetadata.ownerid,
          partitionId: blobName,
          lastModifiedTimeInMs:
            blob.properties.lastModified && blob.properties.lastModified.getTime(),
          etag: blob.properties.etag,
        };
        partitionOwnershipArray.push(partitionOwnership);
      }
      return partitionOwnershipArray;
    } catch (err: any) {
      logger.warning(`Error occurred while fetching the list of blobs`, err.message);
      logErrorStackTrace(err);

      if (err?.name === "AbortError") throw err;

      throw new Error(`Error occurred while fetching the list of blobs. \n${err}`);
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
  async claimOwnership(
    partitionOwnership: PartitionOwnership[],
    options: OperationOptions = {}
  ): Promise<PartitionOwnership[]> {
    const partitionOwnershipArray: PartitionOwnership[] = [];
    for (const ownership of partitionOwnership) {
      const blobName = BlobCheckpointStore.getBlobPrefix({ type: "ownership", ...ownership });
      try {
        const updatedBlobResponse = await this._setBlobMetadata(
          blobName,
          {
            ownerid: ownership.ownerId,
          },
          ownership.etag,
          options
        );

        if (updatedBlobResponse.lastModified) {
          ownership.lastModifiedTimeInMs = updatedBlobResponse.lastModified.getTime();
        }

        ownership.etag = updatedBlobResponse.etag;
        partitionOwnershipArray.push(ownership);
        logger.info(
          `[${ownership.ownerId}] Claimed ownership successfully for partition: ${ownership.partitionId}`,
          `LastModifiedTime: ${ownership.lastModifiedTimeInMs}, ETag: ${ownership.etag}`
        );
      } catch (err: any) {
        const restError = err as RestError;

        if (restError.statusCode === 412) {
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
    consumerGroup: string,
    options: OperationOptions = {}
  ): Promise<Checkpoint[]> {
    const { abortSignal, tracingOptions } = options;
    const blobPrefix = BlobCheckpointStore.getBlobPrefix({
      type: "checkpoint",
      fullyQualifiedNamespace,
      eventHubName,
      consumerGroup,
    });

    const blobs = this._containerClient.listBlobsFlat({
      abortSignal,
      includeMetadata: true,
      prefix: blobPrefix,
      tracingOptions,
    });

    const checkpoints: Checkpoint[] = [];

    for await (const blob of blobs) {
      const blobPath = blob.name.split("/");
      const blobName = blobPath[blobPath.length - 1];

      const checkpointMetadata = (blob.metadata as CheckpointMetadata) ?? {};

      const offset = parseIntOrThrow(blob.name, "offset", checkpointMetadata.offset);
      const sequenceNumber = parseIntOrThrow(
        blob.name,
        "sequencenumber",
        checkpointMetadata.sequencenumber
      );

      checkpoints.push({
        consumerGroup,
        eventHubName,
        fullyQualifiedNamespace,
        partitionId: blobName,
        offset,
        sequenceNumber,
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
   * @returns The new etag on successful update.
   */
  async updateCheckpoint(checkpoint: Checkpoint, options: OperationOptions = {}): Promise<void> {
    throwTypeErrorIfParameterMissing(
      "updateCheckpoint",
      "sequenceNumber",
      checkpoint.sequenceNumber
    );
    throwTypeErrorIfParameterMissing("updateCheckpoint", "offset", checkpoint.offset);

    const blobName = BlobCheckpointStore.getBlobPrefix({ type: "checkpoint", ...checkpoint });
    try {
      const metadataResponse = await this._setBlobMetadata(
        blobName,
        {
          sequencenumber: checkpoint.sequenceNumber.toString(),
          offset: checkpoint.offset.toString(),
        },
        undefined,
        options
      );

      logger.verbose(
        `Updated checkpoint successfully for partition: ${checkpoint.partitionId}`,
        `LastModifiedTime: ${metadataResponse.lastModified!.toISOString()}, ETag: ${
          metadataResponse.etag
        }`
      );
      return;
    } catch (err: any) {
      logger.warning(
        `Error occurred while upating the checkpoint for partition: ${checkpoint.partitionId}.`,
        err.message
      );
      logErrorStackTrace(err);

      if (err?.name === "AbortError") throw err;

      throw new Error(
        `Error occurred while upating the checkpoint for partition: ${checkpoint.partitionId}, ${err}`
      );
    }
  }

  private static getBlobPrefix(params: {
    type: "ownership" | "checkpoint";
    fullyQualifiedNamespace: string;
    eventHubName: string;
    consumerGroup: string;
    partitionId?: string;
  }): string {
    // none of these are case-sensitive in eventhubs so we need to make sure we don't accidentally allow
    // the user to create a case-sensitive blob for their state!
    const consumerGroupName = params.consumerGroup.toLowerCase();
    const eventHubName = params.eventHubName.toLowerCase();
    const fullyQualifiedNamespace = params.fullyQualifiedNamespace.toLowerCase();

    if (params.partitionId) {
      return `${fullyQualifiedNamespace}/${eventHubName}/${consumerGroupName}/${params.type}/${params.partitionId}`;
    } else {
      return `${fullyQualifiedNamespace}/${eventHubName}/${consumerGroupName}/${params.type}/`;
    }
  }

  private async _setBlobMetadata(
    blobName: string,
    metadata: OwnershipMetadata | CheckpointMetadata,
    etag: string | undefined,
    options: OperationOptions = {}
  ): Promise<BlobSetMetadataResponse> {
    const { abortSignal, tracingOptions } = options;
    const blockBlobClient = this._containerClient.getBlobClient(blobName).getBlockBlobClient();

    // When we have an etag, we know the blob existed.
    // If we encounter an error we should fail.
    if (etag) {
      return blockBlobClient.setMetadata(metadata as Metadata, {
        abortSignal,
        conditions: {
          ifMatch: etag,
        },
        tracingOptions,
      });
    } else {
      try {
        // Attempt to set metadata, and fallback to upload if the blob doesn't already exist.
        // This avoids poor performance in storage accounts with soft-delete or blob versioning enabled.
        // https://github.com/Azure/azure-sdk-for-js/issues/10132
        return await blockBlobClient.setMetadata(metadata as Metadata, {
          abortSignal,
          tracingOptions,
        });
      } catch (err: any) {
        // Check if the error is `BlobNotFound` and fallback to `upload` if it is.
        if (err?.name !== "RestError") {
          throw err;
        }
        const errorDetails = (err as RestError).details as { [field: string]: string } | undefined;
        const errorCode = errorDetails?.errorCode;
        if (!errorCode || errorCode !== "BlobNotFound") {
          throw err;
        }

        return blockBlobClient.upload("", 0, {
          abortSignal,
          metadata: metadata as Metadata,
          tracingOptions,
        });
      }
    }
  }
}

type OwnershipMetadata = {
  [k in "ownerid"]: string | undefined;
};

type CheckpointMetadata = {
  [k in "sequencenumber" | "offset"]: string | undefined;
};

/**
 * @internal
 */
export function parseIntOrThrow(
  blobName: string,
  fieldName: string,
  numStr: string | undefined
): number {
  if (numStr == null) {
    throw new Error(`Missing metadata property '${fieldName}' on blob '${blobName}'`);
  }

  const num = parseInt(numStr, 10);

  if (isNaN(num)) {
    throw new Error(
      `Failed to parse metadata property '${fieldName}' on blob '${blobName}' as a number`
    );
  }

  return num;
}
