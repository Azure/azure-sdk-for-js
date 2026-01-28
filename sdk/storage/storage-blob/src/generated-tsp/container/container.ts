// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createContainer, ContainerContext, ContainerOptionalParams } from "./api/index.js";
import {
  FilterBlobSegment,
  SignedIdentifiers,
  BlobItemInternal,
} from "../models/azure/storage/blobs/models.js";
import { PagedAsyncIterableIterator } from "../static-helpers/pagingHelpers.js";
import {
  getAccountInfo,
  listBlobHierarchySegment,
  listBlobFlatSegment,
  changeLease,
  breakLease,
  renewLease,
  releaseLease,
  acquireLease,
  findBlobsByTags,
  submitBatch,
  rename,
  restore,
  setAccessPolicy,
  getAccessPolicy,
  setMetadata,
  $delete,
  getProperties,
  create,
} from "./api/operations.js";
import {
  GetAccountInfoOptionalParams,
  ListBlobHierarchySegmentOptionalParams,
  ListBlobFlatSegmentOptionalParams,
  ChangeLeaseOptionalParams,
  BreakLeaseOptionalParams,
  RenewLeaseOptionalParams,
  ReleaseLeaseOptionalParams,
  AcquireLeaseOptionalParams,
  FindBlobsByTagsOptionalParams,
  SubmitBatchOptionalParams,
  RenameOptionalParams,
  RestoreOptionalParams,
  SetAccessPolicyOptionalParams,
  GetAccessPolicyOptionalParams,
  SetMetadataOptionalParams,
  DeleteOptionalParams,
  GetPropertiesOptionalParams,
  CreateOptionalParams,
} from "./api/options.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export { ContainerOptionalParams } from "./api/containerContext.js";

export class Container {
  private _client: ContainerContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: TokenCredential,
    options: ContainerOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createContainer(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** Returns the sku name and account kind */
  getAccountInfo(options: GetAccountInfoOptionalParams = { requestOptions: {} }): Promise<void> {
    return getAccountInfo(this._client, options);
  }

  /** The List Blobs operation returns a list of the blobs under the specified container. A delimiter can be used to traverse a virtual hierarchy of blobs as though it were a file system. */
  listBlobHierarchySegment(
    delimiter: string,
    options: ListBlobHierarchySegmentOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<BlobItemInternal> {
    return listBlobHierarchySegment(this._client, delimiter, options);
  }

  /** The List Blobs operation returns a list of the blobs under the specified container. */
  listBlobFlatSegment(
    options: ListBlobFlatSegmentOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<BlobItemInternal> {
    return listBlobFlatSegment(this._client, options);
  }

  /** The Change Lease operation is used to change the ID of an existing lease. */
  changeLease(
    leaseId: string,
    proposedLeaseId: string,
    options: ChangeLeaseOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return changeLease(this._client, leaseId, proposedLeaseId, options);
  }

  /** The Break Lease operation ends a lease and ensures that another client can't acquire a new lease until the current lease period has expired. */
  breakLease(options: BreakLeaseOptionalParams = { requestOptions: {} }): Promise<void> {
    return breakLease(this._client, options);
  }

  /** The Renew Lease operation renews an existing lease. */
  renewLease(
    leaseId: string,
    options: RenewLeaseOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return renewLease(this._client, leaseId, options);
  }

  /** The Release Lease operation frees the lease if it's no longer needed, so that another client can immediately acquire a lease against the container. */
  releaseLease(
    leaseId: string,
    options: ReleaseLeaseOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return releaseLease(this._client, leaseId, options);
  }

  /** The Acquire Lease operation requests a new lease on a container. The lease lock duration can be 15 to 60 seconds, or can be infinite. */
  acquireLease(
    duration: number,
    options: AcquireLeaseOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return acquireLease(this._client, duration, options);
  }

  /** The Filter Blobs operation enables callers to list blobs in a container whose tags match a given search expression.  Filter blobs searches within the given container. */
  findBlobsByTags(
    filterExpression: string,
    options: FindBlobsByTagsOptionalParams = { requestOptions: {} },
  ): Promise<FilterBlobSegment> {
    return findBlobsByTags(this._client, filterExpression, options);
  }

  /** The Batch operation allows multiple API calls to be embedded into a single HTTP request. */
  submitBatch(
    body: {
      name: string;
      body: Uint8Array;
    },
    contentLength: number,
    options: SubmitBatchOptionalParams = { requestOptions: {} },
  ): Promise<{
    name: string;
    body: Uint8Array;
  }> {
    return submitBatch(this._client, body, contentLength, options);
  }

  /** Renames an existing container. */
  rename(
    sourceContainerName: string,
    options: RenameOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return rename(this._client, sourceContainerName, options);
  }

  /** Restores a previously-deleted container. */
  restore(options: RestoreOptionalParams = { requestOptions: {} }): Promise<void> {
    return restore(this._client, options);
  }

  /** sets the permissions for the specified container. The permissions indicate whether blobs in a container may be accessed publicly. */
  setAccessPolicy(
    containerAcl: SignedIdentifiers,
    options: SetAccessPolicyOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return setAccessPolicy(this._client, containerAcl, options);
  }

  /** gets the permissions for the specified container. The permissions indicate whether container data may be accessed publicly. */
  getAccessPolicy(
    options: GetAccessPolicyOptionalParams = { requestOptions: {} },
  ): Promise<SignedIdentifiers> {
    return getAccessPolicy(this._client, options);
  }

  /** operation sets one or more user-defined name-value pairs for the specified container. */
  setMetadata(
    metadata: string,
    options: SetMetadataOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return setMetadata(this._client, metadata, options);
  }

  /** operation marks the specified container for deletion. The container and any blobs contained within it are later deleted during garbage collection */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete(options: DeleteOptionalParams = { requestOptions: {} }): Promise<void> {
    return $delete(this._client, options);
  }

  /** returns all user-defined metadata and system properties for the specified container. The data returned does not include the container's list of blobs */
  getProperties(options: GetPropertiesOptionalParams = { requestOptions: {} }): Promise<void> {
    return getProperties(this._client, options);
  }

  /** Creates a new container under the specified account. If the container with the same name already exists, the operation fails. */
  create(options: CreateOptionalParams = { requestOptions: {} }): Promise<void> {
    return create(this._client, options);
  }
}
