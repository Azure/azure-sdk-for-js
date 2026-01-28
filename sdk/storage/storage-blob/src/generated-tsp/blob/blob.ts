// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createBlob, BlobContext, BlobOptionalParams } from "./api/index.js";
import { BlobTags, AccessTier, BlobExpiryOptions } from "../models/azure/storage/blobs/models.js";
import {
  setTags,
  getTags,
  getAccountInfo,
  setTier,
  abortCopyFromUrl,
  copyFromUrl,
  startCopyFromUrl,
  createSnapshot,
  breakLease,
  changeLease,
  renewLease,
  releaseLease,
  acquireLease,
  setMetadata,
  setLegalHold,
  deleteImmutabilityPolicy,
  setImmutabilityPolicy,
  setProperties,
  setExpiry,
  undelete,
  $delete,
  getProperties,
  download,
} from "./api/operations.js";
import {
  SetTagsOptionalParams,
  GetTagsOptionalParams,
  GetAccountInfoOptionalParams,
  SetTierOptionalParams,
  AbortCopyFromUrlOptionalParams,
  CopyFromUrlOptionalParams,
  StartCopyFromUrlOptionalParams,
  CreateSnapshotOptionalParams,
  BreakLeaseOptionalParams,
  ChangeLeaseOptionalParams,
  RenewLeaseOptionalParams,
  ReleaseLeaseOptionalParams,
  AcquireLeaseOptionalParams,
  SetMetadataOptionalParams,
  SetLegalHoldOptionalParams,
  DeleteImmutabilityPolicyOptionalParams,
  SetImmutabilityPolicyOptionalParams,
  SetPropertiesOptionalParams,
  SetExpiryOptionalParams,
  UndeleteOptionalParams,
  DeleteOptionalParams,
  GetPropertiesOptionalParams,
  DownloadOptionalParams,
} from "./api/options.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export { BlobOptionalParams } from "./api/blobContext.js";

export class Blob {
  private _client: BlobContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: TokenCredential,
    options: BlobOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createBlob(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** The Set Tags operation enables users to set tags on a blob. */
  setTags(tags: BlobTags, options: SetTagsOptionalParams = { requestOptions: {} }): Promise<void> {
    return setTags(this._client, tags, options);
  }

  /** The Get Blob Tags operation enables users to get tags on a blob. */
  getTags(options: GetTagsOptionalParams = { requestOptions: {} }): Promise<BlobTags> {
    return getTags(this._client, options);
  }

  /** Returns the sku name and account kind */
  getAccountInfo(options: GetAccountInfoOptionalParams = { requestOptions: {} }): Promise<void> {
    return getAccountInfo(this._client, options);
  }

  /** The Set Tier operation sets the tier on a block blob. The operation is allowed on a page blob or block blob, but not on an append blob. A block blob's tier determines Hot/Cool/Archive storage type. This operation does not update the blob's ETag. */
  setTier(
    tier: AccessTier,
    options: SetTierOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return setTier(this._client, tier, options);
  }

  /** The Abort Copy From URL operation aborts a pending Copy From URL operation, and leaves a destination blob with zero length and full metadata. */
  abortCopyFromUrl(
    copyId: string,
    options: AbortCopyFromUrlOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return abortCopyFromUrl(this._client, copyId, options);
  }

  /** The Copy From URL operation copies a blob or an internet resource to a new blob. It will not return a response until the copy is complete. */
  copyFromUrl(
    copySource: string,
    options: CopyFromUrlOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return copyFromUrl(this._client, copySource, options);
  }

  /** The Start Copy From URL operation copies a blob or an internet resource to a new blob. */
  startCopyFromUrl(
    copySource: string,
    options: StartCopyFromUrlOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return startCopyFromUrl(this._client, copySource, options);
  }

  /** The Create Snapshot operation creates a read-only snapshot of a blob */
  createSnapshot(options: CreateSnapshotOptionalParams = { requestOptions: {} }): Promise<void> {
    return createSnapshot(this._client, options);
  }

  /** The Break Lease operation ends a lease and ensures that another client can't acquire a new lease until the current lease period has expired. */
  breakLease(options: BreakLeaseOptionalParams = { requestOptions: {} }): Promise<void> {
    return breakLease(this._client, options);
  }

  /** The Change Lease operation is used to change the ID of an existing lease. */
  changeLease(
    leaseId: string,
    proposedLeaseId: string,
    options: ChangeLeaseOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return changeLease(this._client, leaseId, proposedLeaseId, options);
  }

  /** The Renew Lease operation renews an existing lease. */
  renewLease(
    leaseId: string,
    options: RenewLeaseOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return renewLease(this._client, leaseId, options);
  }

  /** The Release Lease operation frees the lease if it's no longer needed, so that another client can immediately acquire a lease against the blob. */
  releaseLease(
    leaseId: string,
    options: ReleaseLeaseOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return releaseLease(this._client, leaseId, options);
  }

  /** The Acquire Lease operation requests a new lease on a blob. The lease lock duration can be 15 to 60 seconds, or can be infinite. */
  acquireLease(
    duration: number,
    options: AcquireLeaseOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return acquireLease(this._client, duration, options);
  }

  /** The Set Metadata operation sets user-defined metadata for the specified blob as one or more name-value pairs. */
  setMetadata(
    metadata: string,
    options: SetMetadataOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return setMetadata(this._client, metadata, options);
  }

  /** The Set Legal Hold operation sets a legal hold on the blob. */
  setLegalHold(
    legalHold: boolean,
    options: SetLegalHoldOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return setLegalHold(this._client, legalHold, options);
  }

  /** The Delete Immutability Policy operation deletes the immutability policy on the blob. */
  deleteImmutabilityPolicy(
    options: DeleteImmutabilityPolicyOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteImmutabilityPolicy(this._client, options);
  }

  /** Set the immutability policy of a blob */
  setImmutabilityPolicy(
    expiry: Date,
    options: SetImmutabilityPolicyOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return setImmutabilityPolicy(this._client, expiry, options);
  }

  /** The Set HTTP Headers operation sets system properties on the blob. */
  setProperties(options: SetPropertiesOptionalParams = { requestOptions: {} }): Promise<void> {
    return setProperties(this._client, options);
  }

  /** Set the expiration time of a blob */
  setExpiry(
    expiryOptions: BlobExpiryOptions,
    options: SetExpiryOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return setExpiry(this._client, expiryOptions, options);
  }

  /** Undelete a blob that was previously soft deleted */
  undelete(options: UndeleteOptionalParams = { requestOptions: {} }): Promise<void> {
    return undelete(this._client, options);
  }

  /** If the storage account's soft delete feature is disabled then, when a blob is deleted, it is permanently removed from the storage account. If the storage account's soft delete feature is enabled, then, when a blob is deleted, it is marked for deletion and becomes inaccessible immediately. However, the blob service retains the blob or snapshot for the number of days specified by the DeleteRetentionPolicy section of [Storage service properties] (Set-Blob-Service-Properties.md). After the specified number of days has passed, the blob's data is permanently removed from the storage account. Note that you continue to be charged for the soft-deleted blob's storage until it is permanently removed. Use the List Blobs API and specify the \"include=deleted\" query parameter to discover which blobs and snapshots have been soft deleted. You can then use the Undelete Blob API to restore a soft-deleted blob. All other operations on a soft-deleted blob or snapshot causes the service to return an HTTP status code of 404 (ResourceNotFound). */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete(options: DeleteOptionalParams = { requestOptions: {} }): Promise<void> {
    return $delete(this._client, options);
  }

  /** The Get Properties operation returns all user-defined metadata, standard HTTP properties, and system properties for the blob. It does not return the content of the blob. */
  getProperties(options: GetPropertiesOptionalParams = { requestOptions: {} }): Promise<void> {
    return getProperties(this._client, options);
  }

  /** The Download operation reads or downloads a blob from the system, including its metadata and properties. You can also call Download to read a snapshot. */
  download(options: DownloadOptionalParams = { requestOptions: {} }): Promise<Uint8Array> {
    return download(this._client, options);
  }
}
