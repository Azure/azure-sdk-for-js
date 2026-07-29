// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlobContext } from "../../api/blobContext.js";
import {
  getAccountInfo,
  listBlobHierarchySegment,
  listBlobs,
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
} from "../../api/container/operations.js";
import {
  ContainerGetAccountInfoOptionalParams,
  ContainerListBlobHierarchySegmentOptionalParams,
  ContainerListBlobsOptionalParams,
  ContainerChangeLeaseOptionalParams,
  ContainerBreakLeaseOptionalParams,
  ContainerRenewLeaseOptionalParams,
  ContainerReleaseLeaseOptionalParams,
  ContainerAcquireLeaseOptionalParams,
  ContainerFindBlobsByTagsOptionalParams,
  ContainerSubmitBatchOptionalParams,
  ContainerRenameOptionalParams,
  ContainerRestoreOptionalParams,
  ContainerSetAccessPolicyOptionalParams,
  ContainerGetAccessPolicyOptionalParams,
  ContainerSetMetadataOptionalParams,
  ContainerDeleteOptionalParams,
  ContainerGetPropertiesOptionalParams,
  ContainerCreateOptionalParams,
} from "../../api/container/options.js";
import {
  LeaseStatus,
  LeaseState,
  LeaseDuration,
  PublicAccessType,
  FilterBlobSegment,
  SignedIdentifiers,
  ListBlobsResponse,
  ListBlobsHierarchicalResponse,
  SkuName,
  AccountKind,
} from "../../models/models.js";
import { FileContents } from "../../static-helpers/multipartHelpers.js";
import { StorageCompatResponseInfo } from "../../static-helpers/storageCompatResponse.js";

/** Interface representing a Container operations. */
export interface ContainerOperations {
  /** Returns information about the storage account. */
  getAccountInfo: (
    options?: ContainerGetAccountInfoOptionalParams,
  ) => Promise<
    {
      skuName?: SkuName;
      accountKind?: AccountKind;
      isHierarchicalNamespaceEnabled?: boolean;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        skuName?: SkuName;
        accountKind?: AccountKind;
        isHierarchicalNamespaceEnabled?: boolean;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** Returns a list of the blobs in the specified container. A delimiter can be used to traverse a virtual hierarchy of blobs as though it were a file system. */
  listBlobHierarchySegment: (
    delimiter: string,
    options?: ContainerListBlobHierarchySegmentOptionalParams,
  ) => Promise<
    {
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
      contentType: "application/xml";
    } & ListBlobsHierarchicalResponse &
      StorageCompatResponseInfo<
        ListBlobsHierarchicalResponse,
        {
          date: Date;
          version: string;
          requestId?: string;
          clientRequestId?: string;
          contentType: "application/xml";
        }
      >
  >;
  /** Returns a list of the blobs in the specified container. */
  listBlobs: (
    options?: ContainerListBlobsOptionalParams,
  ) => Promise<
    {
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
      contentType: "application/xml";
    } & ListBlobsResponse &
      StorageCompatResponseInfo<
        ListBlobsResponse,
        {
          date: Date;
          version: string;
          requestId?: string;
          clientRequestId?: string;
          contentType: "application/xml";
        }
      >
  >;
  /** Change the ID of an existing lease. */
  changeLease: (
    leaseId: string,
    proposedLeaseId: string,
    options?: ContainerChangeLeaseOptionalParams,
  ) => Promise<
    {
      leaseId?: string;
      etag: string;
      lastModified: Date;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        leaseId?: string;
        etag: string;
        lastModified: Date;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** Ends a lease and ensures that another client can't acquire a new lease until the current lease period has expired. */
  breakLease: (
    options?: ContainerBreakLeaseOptionalParams,
  ) => Promise<
    {
      leaseTime?: number;
      etag: string;
      lastModified: Date;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        leaseTime?: number;
        etag: string;
        lastModified: Date;
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
    options?: ContainerRenewLeaseOptionalParams,
  ) => Promise<
    {
      leaseId?: string;
      etag: string;
      lastModified: Date;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        leaseId?: string;
        etag: string;
        lastModified: Date;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** Frees the lease if it's no longer needed, so that another client can immediately acquire a lease against the container. */
  releaseLease: (
    leaseId: string,
    options?: ContainerReleaseLeaseOptionalParams,
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
  /** Requests a new lease on the specified container. */
  acquireLease: (
    duration: number,
    options?: ContainerAcquireLeaseOptionalParams,
  ) => Promise<
    {
      leaseId?: string;
      etag: string;
      lastModified: Date;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        leaseId?: string;
        etag: string;
        lastModified: Date;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** Lists blobs in the specified container whose tags match a given search expression. */
  findBlobsByTags: (
    filterExpression: string,
    options?: ContainerFindBlobsByTagsOptionalParams,
  ) => Promise<
    {
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
      contentType: "application/xml";
    } & FilterBlobSegment &
      StorageCompatResponseInfo<
        FilterBlobSegment,
        {
          date: Date;
          version: string;
          requestId?: string;
          clientRequestId?: string;
          contentType: "application/xml";
        }
      >
  >;
  /** Allows multiple API calls to be embedded into a single HTTP request. */
  submitBatch: (
    contentType: string,
    contentLength: number,
    body: string,
    options?: ContainerSubmitBatchOptionalParams,
  ) => Promise<
    { requestId?: string; version: string; contentType: "multipart/mixed" } & {
      body: FileContents | { contents: FileContents; contentType?: string; filename?: string };
    } & StorageCompatResponseInfo<
        {
          body: FileContents | { contents: FileContents; contentType?: string; filename?: string };
        },
        { requestId?: string; version: string; contentType: "multipart/mixed" }
      >
  >;
  /** Renames the specified existing container. */
  rename: (
    sourceContainerName: string,
    options?: ContainerRenameOptionalParams,
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
  /** Restores the specified previously-deleted container. */
  restore: (
    options?: ContainerRestoreOptionalParams,
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
  /** Sets the permissions for the specified container. */
  setAccessPolicy: (
    options?: ContainerSetAccessPolicyOptionalParams,
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
  /** Gets the permissions for the specified container. */
  getAccessPolicy: (
    options?: ContainerGetAccessPolicyOptionalParams,
  ) => Promise<
    {
      blobPublicAccess?: PublicAccessType;
      etag: string;
      lastModified: Date;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
      contentType: "application/xml";
    } & SignedIdentifiers &
      StorageCompatResponseInfo<
        SignedIdentifiers,
        {
          blobPublicAccess?: PublicAccessType;
          etag: string;
          lastModified: Date;
          date: Date;
          version: string;
          requestId?: string;
          clientRequestId?: string;
          contentType: "application/xml";
        }
      >
  >;
  /** Sets user-defined metadata for the specified container. */
  setMetadata: (
    options?: ContainerSetMetadataOptionalParams,
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
  /** Deletes the specified container. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    options?: ContainerDeleteOptionalParams,
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
  /** Returns all user-defined metadata and system properties for the specified container. The data returned does not include the container's list of blobs. */
  getProperties: (
    options?: ContainerGetPropertiesOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      leaseDuration?: LeaseDuration;
      leaseState?: LeaseState;
      leaseStatus?: LeaseStatus;
      blobPublicAccess?: PublicAccessType;
      hasImmutabilityPolicy?: boolean;
      hasLegalHold?: boolean;
      defaultEncryptionScope?: string;
      preventEncryptionScopeOverride?: boolean;
      isImmutableStorageWithVersioningEnabled?: boolean;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        leaseDuration?: LeaseDuration;
        leaseState?: LeaseState;
        leaseStatus?: LeaseStatus;
        blobPublicAccess?: PublicAccessType;
        hasImmutabilityPolicy?: boolean;
        hasLegalHold?: boolean;
        defaultEncryptionScope?: string;
        preventEncryptionScopeOverride?: boolean;
        isImmutableStorageWithVersioningEnabled?: boolean;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
      }
    >
  >;
  /** Creates a new container in the specified account. If the container with the same name already exists, the operation fails. */
  create: (
    options?: ContainerCreateOptionalParams,
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
}

function _getContainer(context: BlobContext) {
  return {
    getAccountInfo: (options?: ContainerGetAccountInfoOptionalParams) =>
      getAccountInfo(context, options),
    listBlobHierarchySegment: (
      delimiter: string,
      options?: ContainerListBlobHierarchySegmentOptionalParams,
    ) => listBlobHierarchySegment(context, delimiter, options),
    listBlobs: (options?: ContainerListBlobsOptionalParams) => listBlobs(context, options),
    changeLease: (
      leaseId: string,
      proposedLeaseId: string,
      options?: ContainerChangeLeaseOptionalParams,
    ) => changeLease(context, leaseId, proposedLeaseId, options),
    breakLease: (options?: ContainerBreakLeaseOptionalParams) => breakLease(context, options),
    renewLease: (leaseId: string, options?: ContainerRenewLeaseOptionalParams) =>
      renewLease(context, leaseId, options),
    releaseLease: (leaseId: string, options?: ContainerReleaseLeaseOptionalParams) =>
      releaseLease(context, leaseId, options),
    acquireLease: (duration: number, options?: ContainerAcquireLeaseOptionalParams) =>
      acquireLease(context, duration, options),
    findBlobsByTags: (filterExpression: string, options?: ContainerFindBlobsByTagsOptionalParams) =>
      findBlobsByTags(context, filterExpression, options),
    submitBatch: (
      contentType: string,
      contentLength: number,
      body: string,
      options?: ContainerSubmitBatchOptionalParams,
    ) => submitBatch(context, contentType, contentLength, body, options),
    rename: (sourceContainerName: string, options?: ContainerRenameOptionalParams) =>
      rename(context, sourceContainerName, options),
    restore: (options?: ContainerRestoreOptionalParams) => restore(context, options),
    setAccessPolicy: (options?: ContainerSetAccessPolicyOptionalParams) =>
      setAccessPolicy(context, options),
    getAccessPolicy: (options?: ContainerGetAccessPolicyOptionalParams) =>
      getAccessPolicy(context, options),
    setMetadata: (options?: ContainerSetMetadataOptionalParams) => setMetadata(context, options),
    delete: (options?: ContainerDeleteOptionalParams) => $delete(context, options),
    getProperties: (options?: ContainerGetPropertiesOptionalParams) =>
      getProperties(context, options),
    create: (options?: ContainerCreateOptionalParams) => create(context, options),
  };
}

export function _getContainerOperations(context: BlobContext): ContainerOperations {
  return {
    ..._getContainer(context),
  };
}
