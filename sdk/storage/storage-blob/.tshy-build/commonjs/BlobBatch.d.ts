import type { TokenCredential } from "@azure/core-auth";
import { AnonymousCredential } from "./credentials/AnonymousCredential.js";
import type { BlobDeleteOptions, BlobSetTierOptions } from "./Clients.js";
import { BlobClient } from "./Clients.js";
import type { AccessTier } from "./generatedModels.js";
import { StorageSharedKeyCredential } from "./credentials/StorageSharedKeyCredential.js";
/**
 * A request associated with a batch operation.
 */
export interface BatchSubRequest {
    /**
     * The URL of the resource to request operation.
     */
    url: string;
    /**
     * The credential used for sub request.
     * Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service.
     * You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
     */
    credential: StorageSharedKeyCredential | AnonymousCredential | TokenCredential;
}
/**
 * A BlobBatch represents an aggregated set of operations on blobs.
 * Currently, only `delete` and `setAccessTier` are supported.
 */
export declare class BlobBatch {
    private batchRequest;
    private readonly batch;
    private batchType;
    constructor();
    /**
     * Get the value of Content-Type for a batch request.
     * The value must be multipart/mixed with a batch boundary.
     * Example: multipart/mixed; boundary=batch_a81786c8-e301-4e42-a729-a32ca24ae252
     */
    getMultiPartContentType(): string;
    /**
     * Get assembled HTTP request body for sub requests.
     */
    getHttpRequestBody(): string;
    /**
     * Get sub requests that are added into the batch request.
     */
    getSubRequests(): Map<number, BatchSubRequest>;
    private addSubRequestInternal;
    private setBatchType;
    /**
     * The deleteBlob operation marks the specified blob or snapshot for deletion.
     * The blob is later deleted during garbage collection.
     * Only one kind of operation is allowed per batch request.
     *
     * Note that in order to delete a blob, you must delete all of its snapshots.
     * You can delete both at the same time. See [delete operation details](https://learn.microsoft.com/en-us/rest/api/storageservices/delete-blob).
     * The operation will be authenticated and authorized with specified credential.
     * See [blob batch authorization details](https://learn.microsoft.com/en-us/rest/api/storageservices/blob-batch#authorization).
     *
     * @param url - The url of the blob resource to delete.
     * @param credential - Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
     * @param options -
     */
    deleteBlob(url: string, credential: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: BlobDeleteOptions): Promise<void>;
    /**
     * The deleteBlob operation marks the specified blob or snapshot for deletion.
     * The blob is later deleted during garbage collection.
     * Only one kind of operation is allowed per batch request.
     *
     * Note that in order to delete a blob, you must delete all of its snapshots.
     * You can delete both at the same time. See [delete operation details](https://learn.microsoft.com/en-us/rest/api/storageservices/delete-blob).
     * The operation will be authenticated and authorized with specified credential.
     * See [blob batch authorization details](https://learn.microsoft.com/en-us/rest/api/storageservices/blob-batch#authorization).
     *
     * @param blobClient - The BlobClient.
     * @param options -
     */
    deleteBlob(blobClient: BlobClient, options?: BlobDeleteOptions): Promise<void>;
    /**
     * The setBlobAccessTier operation sets the tier on a blob.
     * The operation is allowed on block blobs in a blob storage or general purpose v2 account.
     * Only one kind of operation is allowed per batch request.
     *
     * A block blob's tier determines Hot/Cool/Archive storage type.
     * This operation does not update the blob's ETag.
     * For detailed information about block blob level tiering
     * see [hot, cool, and archive access tiers](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blob-storage-tiers).
     * The operation will be authenticated and authorized
     * with specified credential. See [blob batch authorization details](https://learn.microsoft.com/en-us/rest/api/storageservices/blob-batch#authorization).
     *
     * @param url - The url of the blob resource to delete.
     * @param credential - Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
     * @param tier -
     * @param options -
     */
    setBlobAccessTier(url: string, credential: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, tier: AccessTier, options?: BlobSetTierOptions): Promise<void>;
    /**
     * The setBlobAccessTier operation sets the tier on a blob.
     * The operation is allowed on block blobs in a blob storage or general purpose v2 account.
     * Only one kind of operation is allowed per batch request.
     *
     * A block blob's tier determines Hot/Cool/Archive storage type.
     * This operation does not update the blob's ETag.
     * For detailed information about block blob level tiering
     * see [hot, cool, and archive access tiers](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blob-storage-tiers).
     * The operation will be authenticated and authorized
     * with specified credential. See [blob batch authorization details](https://learn.microsoft.com/en-us/rest/api/storageservices/blob-batch#authorization).
     *
     * @param blobClient - The BlobClient.
     * @param tier -
     * @param options -
     */
    setBlobAccessTier(blobClient: BlobClient, tier: AccessTier, options?: BlobSetTierOptions): Promise<void>;
}
//# sourceMappingURL=BlobBatch.d.ts.map