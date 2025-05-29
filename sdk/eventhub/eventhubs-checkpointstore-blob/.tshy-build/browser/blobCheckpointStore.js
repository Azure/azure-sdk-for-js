// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { __asyncValues } from "tslib";
import { logger, logErrorStackTrace } from "./log.js";
import { throwTypeErrorIfParameterMissing } from "./util/error.js";
/**
 * An implementation of CheckpointStore that uses Azure Blob Storage to persist checkpoint data.
 */
export class BlobCheckpointStore {
    /**
     * Constructs a new instance of {@link BlobCheckpointStore}
     * @param containerClient - An instance of a storage blob ContainerClient.
     */
    constructor(containerClient) {
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
    async listOwnership(fullyQualifiedNamespace, eventHubName, consumerGroup, options = {}) {
        var _a, e_1, _b, _c;
        var _d;
        const partitionOwnershipArray = [];
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
            try {
                for (var _e = true, blobs_1 = __asyncValues(blobs), blobs_1_1; blobs_1_1 = await blobs_1.next(), _a = blobs_1_1.done, !_a; _e = true) {
                    _c = blobs_1_1.value;
                    _e = false;
                    const blob = _c;
                    const blobPath = blob.name.split("/");
                    const blobName = blobPath[blobPath.length - 1];
                    const ownershipMetadata = (_d = blob.metadata) !== null && _d !== void 0 ? _d : {};
                    if (ownershipMetadata.ownerid == null) {
                        throw new Error(`Missing ownerid in metadata for blob ${blob.name}`);
                    }
                    const partitionOwnership = {
                        fullyQualifiedNamespace,
                        eventHubName,
                        consumerGroup: consumerGroup,
                        ownerId: ownershipMetadata.ownerid,
                        partitionId: blobName,
                        lastModifiedTimeInMs: blob.properties.lastModified && blob.properties.lastModified.getTime(),
                        etag: blob.properties.etag,
                    };
                    partitionOwnershipArray.push(partitionOwnership);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_e && !_a && (_b = blobs_1.return)) await _b.call(blobs_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return partitionOwnershipArray;
        }
        catch (err) {
            logger.warning(`Error occurred while fetching the list of blobs`, err.message);
            logErrorStackTrace(err);
            if ((err === null || err === void 0 ? void 0 : err.name) === "AbortError")
                throw err;
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
    async claimOwnership(partitionOwnership, options = {}) {
        const partitionOwnershipArray = [];
        for (const ownership of partitionOwnership) {
            const blobName = BlobCheckpointStore.getBlobPrefix(Object.assign({ type: "ownership" }, ownership));
            try {
                const updatedBlobResponse = await this._setBlobMetadata(blobName, {
                    ownerid: ownership.ownerId,
                }, ownership.etag, options);
                if (updatedBlobResponse.lastModified) {
                    ownership.lastModifiedTimeInMs = updatedBlobResponse.lastModified.getTime();
                }
                ownership.etag = updatedBlobResponse.etag;
                partitionOwnershipArray.push(ownership);
                logger.info(`[${ownership.ownerId}] Claimed ownership successfully for partition: ${ownership.partitionId}`, `LastModifiedTime: ${ownership.lastModifiedTimeInMs}, ETag: ${ownership.etag}`);
            }
            catch (err) {
                const restError = err;
                if (restError.statusCode === 412) {
                    // etag failures (precondition not met) aren't fatal errors. They happen
                    // as multiple consumers attempt to claim the same partition (first one wins)
                    // and losers get this error.
                    logger.verbose(`[${ownership.ownerId}] Did not claim partition ${ownership.partitionId}. Another processor has already claimed it.`);
                    continue;
                }
                logger.warning(`Error occurred while claiming ownership for partition: ${ownership.partitionId}`, err.message);
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
    async listCheckpoints(fullyQualifiedNamespace, eventHubName, consumerGroup, options = {}) {
        var _a, e_2, _b, _c;
        var _d;
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
        const checkpoints = [];
        try {
            for (var _e = true, blobs_2 = __asyncValues(blobs), blobs_2_1; blobs_2_1 = await blobs_2.next(), _a = blobs_2_1.done, !_a; _e = true) {
                _c = blobs_2_1.value;
                _e = false;
                const blob = _c;
                const blobPath = blob.name.split("/");
                const blobName = blobPath[blobPath.length - 1];
                const checkpointMetadata = (_d = blob.metadata) !== null && _d !== void 0 ? _d : {};
                const offset = checkpointMetadata.offset;
                if (offset == null) {
                    throw new Error(`Missing metadata property 'offset' on blob '${blob.name}'`);
                }
                const sequenceNumber = parseIntOrThrow(blob.name, "sequencenumber", checkpointMetadata.sequencenumber);
                checkpoints.push({
                    consumerGroup,
                    eventHubName,
                    fullyQualifiedNamespace,
                    partitionId: blobName,
                    offset,
                    sequenceNumber,
                });
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (!_e && !_a && (_b = blobs_2.return)) await _b.call(blobs_2);
            }
            finally { if (e_2) throw e_2.error; }
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
    async updateCheckpoint(checkpoint, options = {}) {
        throwTypeErrorIfParameterMissing("updateCheckpoint", "sequenceNumber", checkpoint.sequenceNumber);
        throwTypeErrorIfParameterMissing("updateCheckpoint", "offset", checkpoint.offset);
        const blobName = BlobCheckpointStore.getBlobPrefix(Object.assign({ type: "checkpoint" }, checkpoint));
        try {
            const metadataResponse = await this._setBlobMetadata(blobName, {
                sequencenumber: checkpoint.sequenceNumber.toString(),
                offset: checkpoint.offset.toString(),
            }, undefined, options);
            logger.verbose(`Updated checkpoint successfully for partition: ${checkpoint.partitionId}`, `LastModifiedTime: ${metadataResponse.lastModified.toISOString()}, ETag: ${metadataResponse.etag}`);
            return;
        }
        catch (err) {
            logger.warning(`Error occurred while updating the checkpoint for partition: ${checkpoint.partitionId}.`, err.message);
            logErrorStackTrace(err);
            if ((err === null || err === void 0 ? void 0 : err.name) === "AbortError")
                throw err;
            throw err;
        }
    }
    static getBlobPrefix(params) {
        // none of these are case-sensitive in eventhubs so we need to make sure we don't accidentally allow
        // the user to create a case-sensitive blob for their state!
        const consumerGroupName = params.consumerGroup.toLowerCase();
        const eventHubName = params.eventHubName.toLowerCase();
        const fullyQualifiedNamespace = params.fullyQualifiedNamespace.toLowerCase();
        if (params.partitionId) {
            return `${fullyQualifiedNamespace}/${eventHubName}/${consumerGroupName}/${params.type}/${params.partitionId}`;
        }
        else {
            return `${fullyQualifiedNamespace}/${eventHubName}/${consumerGroupName}/${params.type}/`;
        }
    }
    async _setBlobMetadata(blobName, metadata, etag, options = {}) {
        const { abortSignal, tracingOptions } = options;
        const blockBlobClient = this._containerClient.getBlobClient(blobName).getBlockBlobClient();
        // When we have an etag, we know the blob existed.
        // If we encounter an error we should fail.
        if (etag) {
            return blockBlobClient.setMetadata(metadata, {
                abortSignal,
                conditions: {
                    ifMatch: etag,
                },
                tracingOptions,
            });
        }
        else {
            try {
                // Attempt to set metadata, and fallback to upload if the blob doesn't already exist.
                // This avoids poor performance in storage accounts with soft-delete or blob versioning enabled.
                // https://github.com/Azure/azure-sdk-for-js/issues/10132
                return await blockBlobClient.setMetadata(metadata, {
                    abortSignal,
                    tracingOptions,
                });
            }
            catch (err) {
                // Check if the error is `BlobNotFound` and fallback to `upload` if it is.
                if ((err === null || err === void 0 ? void 0 : err.name) !== "RestError") {
                    throw err;
                }
                const errorDetails = err.details;
                const errorCode = errorDetails === null || errorDetails === void 0 ? void 0 : errorDetails.errorCode;
                if (!errorCode || errorCode !== "BlobNotFound") {
                    throw err;
                }
                return blockBlobClient.upload("", 0, {
                    abortSignal,
                    metadata: metadata,
                    tracingOptions,
                });
            }
        }
    }
}
/**
 * @internal
 */
export function parseIntOrThrow(blobName, fieldName, numStr) {
    if (numStr == null) {
        throw new Error(`Missing metadata property '${fieldName}' on blob '${blobName}'`);
    }
    const num = parseInt(numStr, 10);
    if (isNaN(num)) {
        throw new Error(`Failed to parse metadata property '${fieldName}' on blob '${blobName}' as a number`);
    }
    return num;
}
//# sourceMappingURL=blobCheckpointStore.js.map