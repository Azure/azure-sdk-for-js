import { Blob } from "../operationsInterfaces/index.js";
import { StorageClient } from "../storageClient.js";
import { BlobDownloadOptionalParams, BlobDownloadResponse, BlobGetPropertiesOptionalParams, BlobGetPropertiesResponse, BlobDeleteOptionalParams, BlobDeleteResponse, BlobUndeleteOptionalParams, BlobUndeleteResponse, BlobExpiryOptions, BlobSetExpiryOptionalParams, BlobSetExpiryResponse, BlobSetHttpHeadersOptionalParams, BlobSetHttpHeadersResponse, BlobSetImmutabilityPolicyOptionalParams, BlobSetImmutabilityPolicyResponse, BlobDeleteImmutabilityPolicyOptionalParams, BlobDeleteImmutabilityPolicyResponse, BlobSetLegalHoldOptionalParams, BlobSetLegalHoldResponse, BlobSetMetadataOptionalParams, BlobSetMetadataResponse, BlobAcquireLeaseOptionalParams, BlobAcquireLeaseResponse, BlobReleaseLeaseOptionalParams, BlobReleaseLeaseResponse, BlobRenewLeaseOptionalParams, BlobRenewLeaseResponse, BlobChangeLeaseOptionalParams, BlobChangeLeaseResponse, BlobBreakLeaseOptionalParams, BlobBreakLeaseResponse, BlobCreateSnapshotOptionalParams, BlobCreateSnapshotResponse, BlobStartCopyFromURLOptionalParams, BlobStartCopyFromURLResponse, BlobCopyFromURLOptionalParams, BlobCopyFromURLResponse, BlobAbortCopyFromURLOptionalParams, BlobAbortCopyFromURLResponse, AccessTier, BlobSetTierOptionalParams, BlobSetTierResponse, BlobGetAccountInfoOptionalParams, BlobGetAccountInfoResponse, BlobQueryOptionalParams, BlobQueryResponse, BlobGetTagsOptionalParams, BlobGetTagsResponse, BlobSetTagsOptionalParams, BlobSetTagsResponse } from "../models/index.js";
/** Class containing Blob operations. */
export declare class BlobImpl implements Blob {
    private readonly client;
    /**
     * Initialize a new instance of the class Blob class.
     * @param client Reference to the service client
     */
    constructor(client: StorageClient);
    /**
     * The Download operation reads or downloads a blob from the system, including its metadata and
     * properties. You can also call Download to read a snapshot.
     * @param options The options parameters.
     */
    download(options?: BlobDownloadOptionalParams): Promise<BlobDownloadResponse>;
    /**
     * The Get Properties operation returns all user-defined metadata, standard HTTP properties, and system
     * properties for the blob. It does not return the content of the blob.
     * @param options The options parameters.
     */
    getProperties(options?: BlobGetPropertiesOptionalParams): Promise<BlobGetPropertiesResponse>;
    /**
     * If the storage account's soft delete feature is disabled then, when a blob is deleted, it is
     * permanently removed from the storage account. If the storage account's soft delete feature is
     * enabled, then, when a blob is deleted, it is marked for deletion and becomes inaccessible
     * immediately. However, the blob service retains the blob or snapshot for the number of days specified
     * by the DeleteRetentionPolicy section of [Storage service properties]
     * (Set-Blob-Service-Properties.md). After the specified number of days has passed, the blob's data is
     * permanently removed from the storage account. Note that you continue to be charged for the
     * soft-deleted blob's storage until it is permanently removed. Use the List Blobs API and specify the
     * "include=deleted" query parameter to discover which blobs and snapshots have been soft deleted. You
     * can then use the Undelete Blob API to restore a soft-deleted blob. All other operations on a
     * soft-deleted blob or snapshot causes the service to return an HTTP status code of 404
     * (ResourceNotFound).
     * @param options The options parameters.
     */
    delete(options?: BlobDeleteOptionalParams): Promise<BlobDeleteResponse>;
    /**
     * Undelete a blob that was previously soft deleted
     * @param options The options parameters.
     */
    undelete(options?: BlobUndeleteOptionalParams): Promise<BlobUndeleteResponse>;
    /**
     * Sets the time a blob will expire and be deleted.
     * @param expiryOptions Required. Indicates mode of the expiry time
     * @param options The options parameters.
     */
    setExpiry(expiryOptions: BlobExpiryOptions, options?: BlobSetExpiryOptionalParams): Promise<BlobSetExpiryResponse>;
    /**
     * The Set HTTP Headers operation sets system properties on the blob
     * @param options The options parameters.
     */
    setHttpHeaders(options?: BlobSetHttpHeadersOptionalParams): Promise<BlobSetHttpHeadersResponse>;
    /**
     * The Set Immutability Policy operation sets the immutability policy on the blob
     * @param options The options parameters.
     */
    setImmutabilityPolicy(options?: BlobSetImmutabilityPolicyOptionalParams): Promise<BlobSetImmutabilityPolicyResponse>;
    /**
     * The Delete Immutability Policy operation deletes the immutability policy on the blob
     * @param options The options parameters.
     */
    deleteImmutabilityPolicy(options?: BlobDeleteImmutabilityPolicyOptionalParams): Promise<BlobDeleteImmutabilityPolicyResponse>;
    /**
     * The Set Legal Hold operation sets a legal hold on the blob.
     * @param legalHold Specified if a legal hold should be set on the blob.
     * @param options The options parameters.
     */
    setLegalHold(legalHold: boolean, options?: BlobSetLegalHoldOptionalParams): Promise<BlobSetLegalHoldResponse>;
    /**
     * The Set Blob Metadata operation sets user-defined metadata for the specified blob as one or more
     * name-value pairs
     * @param options The options parameters.
     */
    setMetadata(options?: BlobSetMetadataOptionalParams): Promise<BlobSetMetadataResponse>;
    /**
     * [Update] The Lease Blob operation establishes and manages a lock on a blob for write and delete
     * operations
     * @param options The options parameters.
     */
    acquireLease(options?: BlobAcquireLeaseOptionalParams): Promise<BlobAcquireLeaseResponse>;
    /**
     * [Update] The Lease Blob operation establishes and manages a lock on a blob for write and delete
     * operations
     * @param leaseId Specifies the current lease ID on the resource.
     * @param options The options parameters.
     */
    releaseLease(leaseId: string, options?: BlobReleaseLeaseOptionalParams): Promise<BlobReleaseLeaseResponse>;
    /**
     * [Update] The Lease Blob operation establishes and manages a lock on a blob for write and delete
     * operations
     * @param leaseId Specifies the current lease ID on the resource.
     * @param options The options parameters.
     */
    renewLease(leaseId: string, options?: BlobRenewLeaseOptionalParams): Promise<BlobRenewLeaseResponse>;
    /**
     * [Update] The Lease Blob operation establishes and manages a lock on a blob for write and delete
     * operations
     * @param leaseId Specifies the current lease ID on the resource.
     * @param proposedLeaseId Proposed lease ID, in a GUID string format. The Blob service returns 400
     *                        (Invalid request) if the proposed lease ID is not in the correct format. See Guid Constructor
     *                        (String) for a list of valid GUID string formats.
     * @param options The options parameters.
     */
    changeLease(leaseId: string, proposedLeaseId: string, options?: BlobChangeLeaseOptionalParams): Promise<BlobChangeLeaseResponse>;
    /**
     * [Update] The Lease Blob operation establishes and manages a lock on a blob for write and delete
     * operations
     * @param options The options parameters.
     */
    breakLease(options?: BlobBreakLeaseOptionalParams): Promise<BlobBreakLeaseResponse>;
    /**
     * The Create Snapshot operation creates a read-only snapshot of a blob
     * @param options The options parameters.
     */
    createSnapshot(options?: BlobCreateSnapshotOptionalParams): Promise<BlobCreateSnapshotResponse>;
    /**
     * The Start Copy From URL operation copies a blob or an internet resource to a new blob.
     * @param copySource Specifies the name of the source page blob snapshot. This value is a URL of up to
     *                   2 KB in length that specifies a page blob snapshot. The value should be URL-encoded as it would
     *                   appear in a request URI. The source blob must either be public or must be authenticated via a shared
     *                   access signature.
     * @param options The options parameters.
     */
    startCopyFromURL(copySource: string, options?: BlobStartCopyFromURLOptionalParams): Promise<BlobStartCopyFromURLResponse>;
    /**
     * The Copy From URL operation copies a blob or an internet resource to a new blob. It will not return
     * a response until the copy is complete.
     * @param copySource Specifies the name of the source page blob snapshot. This value is a URL of up to
     *                   2 KB in length that specifies a page blob snapshot. The value should be URL-encoded as it would
     *                   appear in a request URI. The source blob must either be public or must be authenticated via a shared
     *                   access signature.
     * @param options The options parameters.
     */
    copyFromURL(copySource: string, options?: BlobCopyFromURLOptionalParams): Promise<BlobCopyFromURLResponse>;
    /**
     * The Abort Copy From URL operation aborts a pending Copy From URL operation, and leaves a destination
     * blob with zero length and full metadata.
     * @param copyId The copy identifier provided in the x-ms-copy-id header of the original Copy Blob
     *               operation.
     * @param options The options parameters.
     */
    abortCopyFromURL(copyId: string, options?: BlobAbortCopyFromURLOptionalParams): Promise<BlobAbortCopyFromURLResponse>;
    /**
     * The Set Tier operation sets the tier on a blob. The operation is allowed on a page blob in a premium
     * storage account and on a block blob in a blob storage account (locally redundant storage only). A
     * premium page blob's tier determines the allowed size, IOPS, and bandwidth of the blob. A block
     * blob's tier determines Hot/Cool/Archive storage type. This operation does not update the blob's
     * ETag.
     * @param tier Indicates the tier to be set on the blob.
     * @param options The options parameters.
     */
    setTier(tier: AccessTier, options?: BlobSetTierOptionalParams): Promise<BlobSetTierResponse>;
    /**
     * Returns the sku name and account kind
     * @param options The options parameters.
     */
    getAccountInfo(options?: BlobGetAccountInfoOptionalParams): Promise<BlobGetAccountInfoResponse>;
    /**
     * The Query operation enables users to select/project on blob data by providing simple query
     * expressions.
     * @param options The options parameters.
     */
    query(options?: BlobQueryOptionalParams): Promise<BlobQueryResponse>;
    /**
     * The Get Tags operation enables users to get the tags associated with a blob.
     * @param options The options parameters.
     */
    getTags(options?: BlobGetTagsOptionalParams): Promise<BlobGetTagsResponse>;
    /**
     * The Set Tags operation enables users to set tags on a blob.
     * @param options The options parameters.
     */
    setTags(options?: BlobSetTagsOptionalParams): Promise<BlobSetTagsResponse>;
}
//# sourceMappingURL=blob.d.ts.map