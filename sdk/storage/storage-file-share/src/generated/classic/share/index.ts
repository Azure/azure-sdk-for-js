// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FileContext } from "../../api/fileContext.js";
import {
  restore,
  getStatistics,
  setAccessPolicy,
  getAccessPolicy,
  setMetadata,
  setProperties,
  getPermission,
  createPermission,
  createSnapshot,
  breakLease,
  renewLease,
  changeLease,
  releaseLease,
  acquireLease,
  $delete,
  getProperties,
  create,
} from "../../api/share/operations.js";
import {
  ShareRestoreOptionalParams,
  ShareGetStatisticsOptionalParams,
  ShareSetAccessPolicyOptionalParams,
  ShareGetAccessPolicyOptionalParams,
  ShareSetMetadataOptionalParams,
  ShareSetPropertiesOptionalParams,
  ShareGetPermissionOptionalParams,
  ShareCreatePermissionOptionalParams,
  ShareCreateSnapshotOptionalParams,
  ShareBreakLeaseOptionalParams,
  ShareRenewLeaseOptionalParams,
  ShareChangeLeaseOptionalParams,
  ShareReleaseLeaseOptionalParams,
  ShareAcquireLeaseOptionalParams,
  ShareDeleteOptionalParams,
  ShareGetPropertiesOptionalParams,
  ShareCreateOptionalParams,
} from "../../api/share/options.js";
import {
  SharePermission,
  SignedIdentifiers,
  ShareStats,
} from "../../models/azure/storage/files/shares/models.js";
import { StorageCompatResponseInfo } from "../../static-helpers/storageCompatResponse.js";

/** Interface representing a Share operations. */
export interface ShareOperations {
  /** Restores a previously deleted share. */
  restore: (
    options?: ShareRestoreOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      quota?: number;
      shareProvisionedIops?: number;
      shareProvisionedBandwidthMibps?: number;
      shareIncludedBurstIops?: number;
      shareMaxBurstCreditsForIops?: number;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        quota?: number;
        shareProvisionedIops?: number;
        shareProvisionedBandwidthMibps?: number;
        shareIncludedBurstIops?: number;
        shareMaxBurstCreditsForIops?: number;
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
      }
    >
  >;
  /** Retrieves statistics related to the share. */
  getStatistics: (
    options?: ShareGetStatisticsOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
      contentType: "application/xml";
    } & ShareStats &
      StorageCompatResponseInfo<
        ShareStats,
        {
          etag: string;
          lastModified: Date;
          apiVersion: string;
          requestId: string;
          clientRequestId?: string;
          date: Date;
          contentType: "application/xml";
        }
      >
  >;
  /** Sets stored access policies for the share that may be used with Shared Access Signatures. */
  setAccessPolicy: (
    options?: ShareSetAccessPolicyOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
      }
    >
  >;
  /** Returns information about stored access policies specified on the share that may be used with Shared Access Signatures. */
  getAccessPolicy: (
    options?: ShareGetAccessPolicyOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
      contentType: "application/xml";
    } & SignedIdentifiers &
      StorageCompatResponseInfo<
        SignedIdentifiers,
        {
          etag: string;
          lastModified: Date;
          apiVersion: string;
          requestId: string;
          clientRequestId?: string;
          date: Date;
          contentType: "application/xml";
        }
      >
  >;
  /** Sets one or more user-defined name-value pairs for the specified share. */
  setMetadata: (
    options?: ShareSetMetadataOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
      }
    >
  >;
  /** Sets properties for the specified share. */
  setProperties: (
    options?: ShareSetPropertiesOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      quota?: number;
      shareProvisionedIops?: number;
      shareProvisionedBandwidthMibps?: number;
      shareIncludedBurstIops?: number;
      shareMaxBurstCreditsForIops?: number;
      shareNextAllowedQuotaDowngradeTime?: string;
      shareNextAllowedProvisionedIopsDowngradeTime?: string;
      shareNextAllowedProvisionedBandwidthDowngradeTime?: string;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        quota?: number;
        shareProvisionedIops?: number;
        shareProvisionedBandwidthMibps?: number;
        shareIncludedBurstIops?: number;
        shareMaxBurstCreditsForIops?: number;
        shareNextAllowedQuotaDowngradeTime?: string;
        shareNextAllowedProvisionedIopsDowngradeTime?: string;
        shareNextAllowedProvisionedBandwidthDowngradeTime?: string;
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
      }
    >
  >;
  /** Returns the permission (security descriptor) for a given permission key. This is used to support file level ACLs for SMB shares. */
  getPermission: (
    filePermissionKey: string,
    options?: ShareGetPermissionOptionalParams,
  ) => Promise<
    {
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
      contentType: "application/json";
    } & SharePermission &
      StorageCompatResponseInfo<
        SharePermission,
        {
          apiVersion: string;
          requestId: string;
          clientRequestId?: string;
          date: Date;
          contentType: "application/json";
        }
      >
  >;
  /** Create a permission (a security descriptor). This is used to support file level ACLs for SMB shares. */
  createPermission: (
    permission: SharePermission,
    options?: ShareCreatePermissionOptionalParams,
  ) => Promise<
    {
      filePermissionKey: string;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      {
        filePermissionKey: string;
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
      }
    >
  >;
  /** Creates a read-only snapshot of a share. */
  createSnapshot: (
    options?: ShareCreateSnapshotOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      snapshot: string;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        snapshot: string;
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
      }
    >
  >;
  /** The Lease Share operation establishes and manages a lock on a share for delete operations. The lock duration can be 15 to 60 seconds, or can be infinite. */
  breakLease: (
    options?: ShareBreakLeaseOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      leaseTimeInSeconds?: number;
      leaseId?: string;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        leaseTimeInSeconds?: number;
        leaseId?: string;
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
      }
    >
  >;
  /** The Lease Share operation establishes and manages a lock on a share for delete operations. The lock duration can be 15 to 60 seconds, or can be infinite. */
  renewLease: (
    leaseId: string,
    options?: ShareRenewLeaseOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      leaseId?: string;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        leaseId?: string;
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
      }
    >
  >;
  /** The Lease Share operation establishes and manages a lock on a share for delete operations. The lock duration can be 15 to 60 seconds, or can be infinite. */
  changeLease: (
    leaseId: string,
    options?: ShareChangeLeaseOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      leaseId?: string;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        leaseId?: string;
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
      }
    >
  >;
  /** The Lease Share operation establishes and manages a lock on a share for delete operations. The lock duration can be 15 to 60 seconds, or can be infinite. */
  releaseLease: (
    leaseId: string,
    options?: ShareReleaseLeaseOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
      }
    >
  >;
  /** The Lease Share operation establishes and manages a lock on a share for delete operations. The lock duration can be 15 to 60 seconds, or can be infinite. */
  acquireLease: (
    options?: ShareAcquireLeaseOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      leaseId?: string;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        leaseId?: string;
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
      }
    >
  >;
  /** Operation marks the specified share or share snapshot for deletion. The share or share snapshot and any files contained within it are later deleted during garbage collection. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    options?: ShareDeleteOptionalParams,
  ) => Promise<
    {
      usageBytes?: number;
      snapshotUsageBytes?: number;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      {
        usageBytes?: number;
        snapshotUsageBytes?: number;
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
      }
    >
  >;
  /** Returns all user-defined metadata and system properties for the specified share or share snapshot. */
  getProperties: (
    options?: ShareGetPropertiesOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      quota: number;
      shareProvisionedIops?: number;
      shareProvisionedIngressMbps?: number;
      shareProvisionedEgressMbps?: number;
      shareNextAllowedQuotaDowngradeTime?: string;
      shareProvisionedBandwidthMibps?: number;
      leaseDuration?: string;
      leaseState?: string;
      leaseStatus?: string;
      accessTier?: string;
      accessTierChangeTime?: string;
      accessTierTransitionState?: string;
      enabledProtocols?: string;
      rootSquash?: string;
      enableSnapshotVirtualDirectoryAccess?: boolean;
      paidBurstingEnabled?: boolean;
      paidBurstingMaxIops?: number;
      paidBurstingMaxBandwidthMibps?: number;
      includedBurstIops?: number;
      maxBurstCreditsForIops?: number;
      shareNextAllowedProvisionedIopsDowngradeTime?: string;
      shareNextAllowedProvisionedBandwidthDowngradeTime?: string;
      enableSmbDirectoryLease?: boolean;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        quota: number;
        shareProvisionedIops?: number;
        shareProvisionedIngressMbps?: number;
        shareProvisionedEgressMbps?: number;
        shareNextAllowedQuotaDowngradeTime?: string;
        shareProvisionedBandwidthMibps?: number;
        leaseDuration?: string;
        leaseState?: string;
        leaseStatus?: string;
        accessTier?: string;
        accessTierChangeTime?: string;
        accessTierTransitionState?: string;
        enabledProtocols?: string;
        rootSquash?: string;
        enableSnapshotVirtualDirectoryAccess?: boolean;
        paidBurstingEnabled?: boolean;
        paidBurstingMaxIops?: number;
        paidBurstingMaxBandwidthMibps?: number;
        includedBurstIops?: number;
        maxBurstCreditsForIops?: number;
        shareNextAllowedProvisionedIopsDowngradeTime?: string;
        shareNextAllowedProvisionedBandwidthDowngradeTime?: string;
        enableSmbDirectoryLease?: boolean;
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
      }
    >
  >;
  /** Creates a new share under the specified account. If the share with the same name already exists, the operation fails. */
  create: (
    options?: ShareCreateOptionalParams,
  ) => Promise<
    {
      etag: string;
      lastModified: Date;
      quota?: number;
      shareProvisionedIops?: number;
      shareProvisionedBandwidthMibps?: number;
      shareIncludedBurstIops?: number;
      shareMaxBurstCreditsForIops?: number;
      apiVersion: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    } & StorageCompatResponseInfo<
      undefined,
      {
        etag: string;
        lastModified: Date;
        quota?: number;
        shareProvisionedIops?: number;
        shareProvisionedBandwidthMibps?: number;
        shareIncludedBurstIops?: number;
        shareMaxBurstCreditsForIops?: number;
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
      }
    >
  >;
}

function _getShare(context: FileContext) {
  return {
    restore: (options?: ShareRestoreOptionalParams) => restore(context, options),
    getStatistics: (options?: ShareGetStatisticsOptionalParams) => getStatistics(context, options),
    setAccessPolicy: (options?: ShareSetAccessPolicyOptionalParams) =>
      setAccessPolicy(context, options),
    getAccessPolicy: (options?: ShareGetAccessPolicyOptionalParams) =>
      getAccessPolicy(context, options),
    setMetadata: (options?: ShareSetMetadataOptionalParams) => setMetadata(context, options),
    setProperties: (options?: ShareSetPropertiesOptionalParams) => setProperties(context, options),
    getPermission: (filePermissionKey: string, options?: ShareGetPermissionOptionalParams) =>
      getPermission(context, filePermissionKey, options),
    createPermission: (
      permission: SharePermission,
      options?: ShareCreatePermissionOptionalParams,
    ) => createPermission(context, permission, options),
    createSnapshot: (options?: ShareCreateSnapshotOptionalParams) =>
      createSnapshot(context, options),
    breakLease: (options?: ShareBreakLeaseOptionalParams) => breakLease(context, options),
    renewLease: (leaseId: string, options?: ShareRenewLeaseOptionalParams) =>
      renewLease(context, leaseId, options),
    changeLease: (leaseId: string, options?: ShareChangeLeaseOptionalParams) =>
      changeLease(context, leaseId, options),
    releaseLease: (leaseId: string, options?: ShareReleaseLeaseOptionalParams) =>
      releaseLease(context, leaseId, options),
    acquireLease: (options?: ShareAcquireLeaseOptionalParams) => acquireLease(context, options),
    delete: (options?: ShareDeleteOptionalParams) => $delete(context, options),
    getProperties: (options?: ShareGetPropertiesOptionalParams) => getProperties(context, options),
    create: (options?: ShareCreateOptionalParams) => create(context, options),
  };
}

export function _getShareOperations(context: FileContext): ShareOperations {
  return {
    ..._getShare(context),
  };
}
