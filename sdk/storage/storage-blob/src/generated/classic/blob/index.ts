// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlobContext } from "../../api/blobContext.js";
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
} from "../../api/blob/operations.js";
import {
  BlobSetTagsOptionalParams,
  BlobGetTagsOptionalParams,
  BlobGetAccountInfoOptionalParams,
  BlobSetTierOptionalParams,
  BlobAbortCopyFromUrlOptionalParams,
  BlobCopyFromUrlOptionalParams,
  BlobStartCopyFromUrlOptionalParams,
  BlobCreateSnapshotOptionalParams,
  BlobBreakLeaseOptionalParams,
  BlobChangeLeaseOptionalParams,
  BlobRenewLeaseOptionalParams,
  BlobReleaseLeaseOptionalParams,
  BlobAcquireLeaseOptionalParams,
  BlobSetMetadataOptionalParams,
  BlobSetLegalHoldOptionalParams,
  BlobDeleteImmutabilityPolicyOptionalParams,
  BlobSetImmutabilityPolicyOptionalParams,
  BlobSetPropertiesOptionalParams,
  BlobSetExpiryOptionalParams,
  BlobUndeleteOptionalParams,
  BlobDeleteOptionalParams,
  BlobGetPropertiesOptionalParams,
  BlobDownloadOptionalParams,
} from "../../api/blob/options.js";
import {
  LeaseStatus,
  LeaseState,
  LeaseDuration,
  BlobTags,
  BlobType,
  CopyStatus,
  AccessTier,
  ArchiveStatus,
  RehydratePriority,
  ImmutabilityPolicyMode,
  SkuName,
  AccountKind,
  BlobExpiryOptions,
  BlobDownloadResponse,
} from "../../models/models.js";
import { StorageCompatResponseInfo } from "../../static-helpers/storageCompatResponse.js";

/** Interface representing a Blob operations. */
export interface BlobOperations {
  /** Sets the tags of the specified blob. */
  setTags: (
    tags: BlobTags,
    options?: BlobSetTagsOptionalParams,
  ) => Promise<
    {
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      { date: Date; version: string; requestId?: string; clientRequestId?: string }
    >
  >;
  /** Gets the tags of the specified blob. */
  getTags: (
    options?: BlobGetTagsOptionalParams,
  ) => Promise<
    {
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
      contentType: "application/xml";
    } & BlobTags &
      StorageCompatResponseInfo<
        BlobTags,
        {
          date: Date;
          version: string;
          requestId?: string;
          clientRequestId?: string;
          contentType: "application/xml";
        }
      >
  >;
  /** Returns information about the storage account. */
  getAccountInfo: (
    options?: BlobGetAccountInfoOptionalParams,
  ) => Promise<
    {
      accountKind?: AccountKind;
      skuName?: SkuName;
      isHierarchicalNamespaceEnabled?: boolean;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        accountKind?: AccountKind;
        skuName?: SkuName;
        isHierarchicalNamespaceEnabled?: boolean;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** Sets the tier of the specified blob. */
  setTier: (
    tier: AccessTier,
    options?: BlobSetTierOptionalParams,
  ) => Promise<
    {
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      { date: Date; version: string; requestId?: string; clientRequestId?: string }
    >
  >;
  /** Aborts a pending asynchronous copy operation and leaves a destination blob with zero length and full metadata. */
  abortCopyFromUrl: (
    copyId: string,
    options?: BlobAbortCopyFromUrlOptionalParams,
  ) => Promise<
    {
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      { date: Date; version: string; requestId?: string; clientRequestId?: string }
    >
  >;
  /** Synchronously copies a blob from a source URL to the destination blob. */
  copyFromUrl: (
    copySource: string,
    options?: BlobCopyFromUrlOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      versionId: string;
      copyId?: string;
      copyStatus?: "success";
      contentMD5: Uint8Array;
      contentCrc64?: Uint8Array;
      encryptionScope?: string;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        versionId: string;
        copyId?: string;
        copyStatus?: "success";
        contentMD5: Uint8Array;
        contentCrc64?: Uint8Array;
        encryptionScope?: string;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** Starts an asynchronous copy from a source URL to a destination blob. */
  startCopyFromUrl: (
    copySource: string,
    options?: BlobStartCopyFromUrlOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      versionId: string;
      copyId?: string;
      copyStatus?: CopyStatus;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        versionId: string;
        copyId?: string;
        copyStatus?: CopyStatus;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** Creates a read-only snapshot of the specified blob. */
  createSnapshot: (
    options?: BlobCreateSnapshotOptionalParams,
  ) => Promise<
    {
      snapshot?: string;
      etag: string;
      lastModified: Date;
      versionId: string;
      isServerEncrypted?: boolean;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        snapshot?: string;
        etag: string;
        lastModified: Date;
        versionId: string;
        isServerEncrypted?: boolean;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** Ends a lease and ensures that another client can't acquire a new lease until the current lease period has expired. */
  breakLease: (
    options?: BlobBreakLeaseOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      leaseTime?: number;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        leaseTime?: number;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** Change the ID of an existing lease. */
  changeLease: (
    leaseId: string,
    proposedLeaseId: string,
    options?: BlobChangeLeaseOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      leaseId?: string;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        leaseId?: string;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** Renews an existing lease. */
  renewLease: (
    leaseId: string,
    options?: BlobRenewLeaseOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      leaseId?: string;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        leaseId?: string;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** Frees the lease if it's no longer needed, so that another client can immediately acquire a lease against the blob. */
  releaseLease: (
    leaseId: string,
    options?: BlobReleaseLeaseOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** Requests a new lease on the specified blob. */
  acquireLease: (
    duration: number,
    options?: BlobAcquireLeaseOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      leaseId?: string;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        leaseId?: string;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** Sets user-defined metadata for the specified blob. */
  setMetadata: (
    options?: BlobSetMetadataOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      versionId: string;
      isServerEncrypted?: boolean;
      encryptionKeySha256?: string;
      encryptionScope?: string;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        versionId: string;
        isServerEncrypted?: boolean;
        encryptionKeySha256?: string;
        encryptionScope?: string;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** Sets a legal hold on the specified blob. */
  setLegalHold: (
    legalHold: boolean,
    options?: BlobSetLegalHoldOptionalParams,
  ) => Promise<
    {
      legalHold: boolean;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        legalHold: boolean;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** Deletes the immutability policy on the specified blob. */
  deleteImmutabilityPolicy: (
    options?: BlobDeleteImmutabilityPolicyOptionalParams,
  ) => Promise<
    {
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      { date: Date; version: string; requestId?: string; clientRequestId?: string }
    >
  >;
  /** Set the immutability policy on the specified blob. */
  setImmutabilityPolicy: (
    options?: BlobSetImmutabilityPolicyOptionalParams,
  ) => Promise<
    {
      immutabilityPolicyExpiresOn?: Date;
      immutabilityPolicyMode: ImmutabilityPolicyMode;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        immutabilityPolicyExpiresOn?: Date;
        immutabilityPolicyMode: ImmutabilityPolicyMode;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** Sets system properties on the specified blob. */
  setProperties: (
    options?: BlobSetPropertiesOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      blobSequenceNumber: number;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        blobSequenceNumber: number;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** Set the expiration time of the specified blob. */
  setExpiry: (
    expiryOptions: BlobExpiryOptions,
    options?: BlobSetExpiryOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** Undelete the specified previously soft deleted blob. */
  undelete: (
    options?: BlobUndeleteOptionalParams,
  ) => Promise<
    {
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      { date: Date; version: string; requestId?: string; clientRequestId?: string }
    >
  >;
  /** Deletes the specified blob. If blob soft delete is enabled, the blob is marked for deletion and can be recovered until the retention period expires. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    options?: BlobDeleteOptionalParams,
  ) => Promise<
    {
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      { date: Date; version: string; requestId?: string; clientRequestId?: string }
    >
  >;
  /** Returns all user-defined metadata, standard HTTP properties, and system properties for the specified blob. It does not return the content of the blob. */
  getProperties: (
    options?: BlobGetPropertiesOptionalParams,
  ) => Promise<
    {
      contentType?: string;
      objectReplicationRules?: Record<string, string>;
      lastModified: Date;
      createdOn: Date;
      objectReplicationPolicyId?: string;
      blobType?: BlobType;
      copyCompletionTime?: Date;
      copyStatusDescription?: string;
      copyId?: string;
      copyProgress?: string;
      copyStatus?: CopyStatus;
      copySource?: string;
      isIncrementalCopy?: boolean;
      destinationSnapshot?: string;
      leaseDuration?: LeaseDuration;
      leaseState?: LeaseState;
      leaseStatus?: LeaseStatus;
      contentLength: number;
      etag: string;
      contentMD5: Uint8Array;
      contentEncoding: string;
      contentDisposition: string;
      contentLanguage: string;
      cacheControl: string;
      blobSequenceNumber: number;
      acceptRanges?: string;
      blobCommittedBlockCount?: number;
      isServerEncrypted?: boolean;
      encryptionKeySha256?: string;
      encryptionScope?: string;
      accessTier?: string;
      accessTierInferred?: boolean;
      archiveStatus?: ArchiveStatus;
      accessTierChangeTime?: Date;
      smartAccessTier?: string;
      versionId: string;
      isCurrentVersion?: boolean;
      tagCount?: number;
      expiresOn?: Date;
      isSealed?: boolean;
      rehydratePriority?: RehydratePriority;
      lastAccessed?: Date;
      immutabilityPolicyExpiresOn?: Date;
      immutabilityPolicyMode: ImmutabilityPolicyMode;
      legalHold?: boolean;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        contentType?: string;
        objectReplicationRules?: Record<string, string>;
        lastModified: Date;
        createdOn: Date;
        objectReplicationPolicyId?: string;
        blobType?: BlobType;
        copyCompletionTime?: Date;
        copyStatusDescription?: string;
        copyId?: string;
        copyProgress?: string;
        copyStatus?: CopyStatus;
        copySource?: string;
        isIncrementalCopy?: boolean;
        destinationSnapshot?: string;
        leaseDuration?: LeaseDuration;
        leaseState?: LeaseState;
        leaseStatus?: LeaseStatus;
        contentLength: number;
        etag: string;
        contentMD5: Uint8Array;
        contentEncoding: string;
        contentDisposition: string;
        contentLanguage: string;
        cacheControl: string;
        blobSequenceNumber: number;
        acceptRanges?: string;
        blobCommittedBlockCount?: number;
        isServerEncrypted?: boolean;
        encryptionKeySha256?: string;
        encryptionScope?: string;
        accessTier?: string;
        accessTierInferred?: boolean;
        archiveStatus?: ArchiveStatus;
        accessTierChangeTime?: Date;
        smartAccessTier?: string;
        versionId: string;
        isCurrentVersion?: boolean;
        tagCount?: number;
        expiresOn?: Date;
        isSealed?: boolean;
        rehydratePriority?: RehydratePriority;
        lastAccessed?: Date;
        immutabilityPolicyExpiresOn?: Date;
        immutabilityPolicyMode: ImmutabilityPolicyMode;
        legalHold?: boolean;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** Downloads the specified blob. */
  download: (
    options?: BlobDownloadOptionalParams,
  ) => Promise<
    {
      requestId?: string;
      clientRequestId?: string;
      objectReplicationRules?: Record<string, string>;
      lastModified: Date;
      createdOn: Date;
      objectReplicationPolicyId?: string;
      contentLength: number;
      contentRange: string;
      etag: string;
      contentMD5: Uint8Array;
      contentEncoding: string;
      cacheControl: string;
      contentDisposition: string;
      contentLanguage: string;
      blobSequenceNumber: number;
      blobType?: BlobType;
      copyCompletionTime?: Date;
      copyStatusDescription?: string;
      copyId?: string;
      copyProgress?: string;
      copyStatus?: CopyStatus;
      copySource?: string;
      leaseDuration?: LeaseDuration;
      leaseState?: LeaseState;
      leaseStatus?: LeaseStatus;
      versionId: string;
      isCurrentVersion?: boolean;
      acceptRanges?: string;
      date: Date;
      blobCommittedBlockCount?: number;
      isServerEncrypted?: boolean;
      encryptionKeySha256?: string;
      encryptionScope?: string;
      blobContentMD5?: Uint8Array;
      tagCount?: number;
      isSealed?: boolean;
      lastAccessed?: Date;
      immutabilityPolicyExpiresOn?: Date;
      immutabilityPolicyMode: ImmutabilityPolicyMode;
      legalHold?: boolean;
      structuredBodyType?: string;
      structuredContentLength?: number;
      version: string;
      contentType: "application/octet-stream";
      contentCrc64?: Uint8Array;
    } & BlobDownloadResponse &
      StorageCompatResponseInfo<
        BlobDownloadResponse,
        {
          requestId?: string;
          clientRequestId?: string;
          objectReplicationRules?: Record<string, string>;
          lastModified: Date;
          createdOn: Date;
          objectReplicationPolicyId?: string;
          contentLength: number;
          contentRange: string;
          etag: string;
          contentMD5: Uint8Array;
          contentEncoding: string;
          cacheControl: string;
          contentDisposition: string;
          contentLanguage: string;
          blobSequenceNumber: number;
          blobType?: BlobType;
          copyCompletionTime?: Date;
          copyStatusDescription?: string;
          copyId?: string;
          copyProgress?: string;
          copyStatus?: CopyStatus;
          copySource?: string;
          leaseDuration?: LeaseDuration;
          leaseState?: LeaseState;
          leaseStatus?: LeaseStatus;
          versionId: string;
          isCurrentVersion?: boolean;
          acceptRanges?: string;
          date: Date;
          blobCommittedBlockCount?: number;
          isServerEncrypted?: boolean;
          encryptionKeySha256?: string;
          encryptionScope?: string;
          blobContentMD5?: Uint8Array;
          tagCount?: number;
          isSealed?: boolean;
          lastAccessed?: Date;
          immutabilityPolicyExpiresOn?: Date;
          immutabilityPolicyMode: ImmutabilityPolicyMode;
          legalHold?: boolean;
          structuredBodyType?: string;
          structuredContentLength?: number;
          version: string;
          contentType: "application/octet-stream";
          contentCrc64?: Uint8Array;
        }
      >
  >;
}

function _getBlob(context: BlobContext) {
  return {
    setTags: (tags: BlobTags, options?: BlobSetTagsOptionalParams) =>
      setTags(context, tags, options),
    getTags: (options?: BlobGetTagsOptionalParams) => getTags(context, options),
    getAccountInfo: (options?: BlobGetAccountInfoOptionalParams) =>
      getAccountInfo(context, options),
    setTier: (tier: AccessTier, options?: BlobSetTierOptionalParams) =>
      setTier(context, tier, options),
    abortCopyFromUrl: (copyId: string, options?: BlobAbortCopyFromUrlOptionalParams) =>
      abortCopyFromUrl(context, copyId, options),
    copyFromUrl: (copySource: string, options?: BlobCopyFromUrlOptionalParams) =>
      copyFromUrl(context, copySource, options),
    startCopyFromUrl: (copySource: string, options?: BlobStartCopyFromUrlOptionalParams) =>
      startCopyFromUrl(context, copySource, options),
    createSnapshot: (options?: BlobCreateSnapshotOptionalParams) =>
      createSnapshot(context, options),
    breakLease: (options?: BlobBreakLeaseOptionalParams) => breakLease(context, options),
    changeLease: (
      leaseId: string,
      proposedLeaseId: string,
      options?: BlobChangeLeaseOptionalParams,
    ) => changeLease(context, leaseId, proposedLeaseId, options),
    renewLease: (leaseId: string, options?: BlobRenewLeaseOptionalParams) =>
      renewLease(context, leaseId, options),
    releaseLease: (leaseId: string, options?: BlobReleaseLeaseOptionalParams) =>
      releaseLease(context, leaseId, options),
    acquireLease: (duration: number, options?: BlobAcquireLeaseOptionalParams) =>
      acquireLease(context, duration, options),
    setMetadata: (options?: BlobSetMetadataOptionalParams) => setMetadata(context, options),
    setLegalHold: (legalHold: boolean, options?: BlobSetLegalHoldOptionalParams) =>
      setLegalHold(context, legalHold, options),
    deleteImmutabilityPolicy: (options?: BlobDeleteImmutabilityPolicyOptionalParams) =>
      deleteImmutabilityPolicy(context, options),
    setImmutabilityPolicy: (options?: BlobSetImmutabilityPolicyOptionalParams) =>
      setImmutabilityPolicy(context, options),
    setProperties: (options?: BlobSetPropertiesOptionalParams) => setProperties(context, options),
    setExpiry: (expiryOptions: BlobExpiryOptions, options?: BlobSetExpiryOptionalParams) =>
      setExpiry(context, expiryOptions, options),
    undelete: (options?: BlobUndeleteOptionalParams) => undelete(context, options),
    delete: (options?: BlobDeleteOptionalParams) => $delete(context, options),
    getProperties: (options?: BlobGetPropertiesOptionalParams) => getProperties(context, options),
    download: (options?: BlobDownloadOptionalParams) => download(context, options),
  };
}

export function _getBlobOperations(context: BlobContext): BlobOperations {
  return {
    ..._getBlob(context),
  };
}
