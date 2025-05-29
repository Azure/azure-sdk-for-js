import * as coreRestPipeline from "@azure/core-rest-pipeline";
import { ContainerCreateOptionalParams, ContainerCreateResponse, ContainerGetPropertiesOptionalParams, ContainerGetPropertiesResponse, ContainerDeleteOptionalParams, ContainerDeleteResponse, ContainerSetMetadataOptionalParams, ContainerSetMetadataResponse, ContainerGetAccessPolicyOptionalParams, ContainerGetAccessPolicyResponse, ContainerSetAccessPolicyOptionalParams, ContainerSetAccessPolicyResponse, ContainerRestoreOptionalParams, ContainerRestoreResponse, ContainerRenameOptionalParams, ContainerRenameResponse, ContainerSubmitBatchOptionalParams, ContainerSubmitBatchResponse, ContainerFilterBlobsOptionalParams, ContainerFilterBlobsResponse, ContainerAcquireLeaseOptionalParams, ContainerAcquireLeaseResponse, ContainerReleaseLeaseOptionalParams, ContainerReleaseLeaseResponse, ContainerRenewLeaseOptionalParams, ContainerRenewLeaseResponse, ContainerBreakLeaseOptionalParams, ContainerBreakLeaseResponse, ContainerChangeLeaseOptionalParams, ContainerChangeLeaseResponse, ContainerListBlobFlatSegmentOptionalParams, ContainerListBlobFlatSegmentResponse, ContainerListBlobHierarchySegmentOptionalParams, ContainerListBlobHierarchySegmentResponse, ContainerGetAccountInfoOptionalParams, ContainerGetAccountInfoResponse } from "../models/index.js";
/** Interface representing a Container. */
export interface Container {
    /**
     * creates a new container under the specified account. If the container with the same name already
     * exists, the operation fails
     * @param options The options parameters.
     */
    create(options?: ContainerCreateOptionalParams): Promise<ContainerCreateResponse>;
    /**
     * returns all user-defined metadata and system properties for the specified container. The data
     * returned does not include the container's list of blobs
     * @param options The options parameters.
     */
    getProperties(options?: ContainerGetPropertiesOptionalParams): Promise<ContainerGetPropertiesResponse>;
    /**
     * operation marks the specified container for deletion. The container and any blobs contained within
     * it are later deleted during garbage collection
     * @param options The options parameters.
     */
    delete(options?: ContainerDeleteOptionalParams): Promise<ContainerDeleteResponse>;
    /**
     * operation sets one or more user-defined name-value pairs for the specified container.
     * @param options The options parameters.
     */
    setMetadata(options?: ContainerSetMetadataOptionalParams): Promise<ContainerSetMetadataResponse>;
    /**
     * gets the permissions for the specified container. The permissions indicate whether container data
     * may be accessed publicly.
     * @param options The options parameters.
     */
    getAccessPolicy(options?: ContainerGetAccessPolicyOptionalParams): Promise<ContainerGetAccessPolicyResponse>;
    /**
     * sets the permissions for the specified container. The permissions indicate whether blobs in a
     * container may be accessed publicly.
     * @param options The options parameters.
     */
    setAccessPolicy(options?: ContainerSetAccessPolicyOptionalParams): Promise<ContainerSetAccessPolicyResponse>;
    /**
     * Restores a previously-deleted container.
     * @param options The options parameters.
     */
    restore(options?: ContainerRestoreOptionalParams): Promise<ContainerRestoreResponse>;
    /**
     * Renames an existing container.
     * @param sourceContainerName Required.  Specifies the name of the container to rename.
     * @param options The options parameters.
     */
    rename(sourceContainerName: string, options?: ContainerRenameOptionalParams): Promise<ContainerRenameResponse>;
    /**
     * The Batch operation allows multiple API calls to be embedded into a single HTTP request.
     * @param contentLength The length of the request.
     * @param multipartContentType Required. The value of this header must be multipart/mixed with a batch
     *                             boundary. Example header value: multipart/mixed; boundary=batch_<GUID>
     * @param body Initial data
     * @param options The options parameters.
     */
    submitBatch(contentLength: number, multipartContentType: string, body: coreRestPipeline.RequestBodyType, options?: ContainerSubmitBatchOptionalParams): Promise<ContainerSubmitBatchResponse>;
    /**
     * The Filter Blobs operation enables callers to list blobs in a container whose tags match a given
     * search expression.  Filter blobs searches within the given container.
     * @param options The options parameters.
     */
    filterBlobs(options?: ContainerFilterBlobsOptionalParams): Promise<ContainerFilterBlobsResponse>;
    /**
     * [Update] establishes and manages a lock on a container for delete operations. The lock duration can
     * be 15 to 60 seconds, or can be infinite
     * @param options The options parameters.
     */
    acquireLease(options?: ContainerAcquireLeaseOptionalParams): Promise<ContainerAcquireLeaseResponse>;
    /**
     * [Update] establishes and manages a lock on a container for delete operations. The lock duration can
     * be 15 to 60 seconds, or can be infinite
     * @param leaseId Specifies the current lease ID on the resource.
     * @param options The options parameters.
     */
    releaseLease(leaseId: string, options?: ContainerReleaseLeaseOptionalParams): Promise<ContainerReleaseLeaseResponse>;
    /**
     * [Update] establishes and manages a lock on a container for delete operations. The lock duration can
     * be 15 to 60 seconds, or can be infinite
     * @param leaseId Specifies the current lease ID on the resource.
     * @param options The options parameters.
     */
    renewLease(leaseId: string, options?: ContainerRenewLeaseOptionalParams): Promise<ContainerRenewLeaseResponse>;
    /**
     * [Update] establishes and manages a lock on a container for delete operations. The lock duration can
     * be 15 to 60 seconds, or can be infinite
     * @param options The options parameters.
     */
    breakLease(options?: ContainerBreakLeaseOptionalParams): Promise<ContainerBreakLeaseResponse>;
    /**
     * [Update] establishes and manages a lock on a container for delete operations. The lock duration can
     * be 15 to 60 seconds, or can be infinite
     * @param leaseId Specifies the current lease ID on the resource.
     * @param proposedLeaseId Proposed lease ID, in a GUID string format. The Blob service returns 400
     *                        (Invalid request) if the proposed lease ID is not in the correct format. See Guid Constructor
     *                        (String) for a list of valid GUID string formats.
     * @param options The options parameters.
     */
    changeLease(leaseId: string, proposedLeaseId: string, options?: ContainerChangeLeaseOptionalParams): Promise<ContainerChangeLeaseResponse>;
    /**
     * [Update] The List Blobs operation returns a list of the blobs under the specified container
     * @param options The options parameters.
     */
    listBlobFlatSegment(options?: ContainerListBlobFlatSegmentOptionalParams): Promise<ContainerListBlobFlatSegmentResponse>;
    /**
     * [Update] The List Blobs operation returns a list of the blobs under the specified container
     * @param delimiter When the request includes this parameter, the operation returns a BlobPrefix
     *                  element in the response body that acts as a placeholder for all blobs whose names begin with the
     *                  same substring up to the appearance of the delimiter character. The delimiter may be a single
     *                  character or a string.
     * @param options The options parameters.
     */
    listBlobHierarchySegment(delimiter: string, options?: ContainerListBlobHierarchySegmentOptionalParams): Promise<ContainerListBlobHierarchySegmentResponse>;
    /**
     * Returns the sku name and account kind
     * @param options The options parameters.
     */
    getAccountInfo(options?: ContainerGetAccountInfoOptionalParams): Promise<ContainerGetAccountInfoResponse>;
}
//# sourceMappingURL=container.d.ts.map