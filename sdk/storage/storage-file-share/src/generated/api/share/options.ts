// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ShareRootSquash,
  FilePermissionFormat,
  SignedIdentifier,
  ShareTokenIntent,
  ShareAccessTier,
  DeleteSnapshotsOptionType,
} from "../../models/azure/storage/files/shares/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ShareRestoreOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** Specifies the name of the previously-deleted share. */
  deletedShareName?: string;
  /** Specifies the version of the previously-deleted share. */
  deletedShareVersion?: string;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
}

/** Optional parameters. */
export interface ShareGetStatisticsOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** If specified, the lease ID must match the lease ID of the file. */
  leaseId?: string;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
}

/** Optional parameters. */
export interface ShareSetAccessPolicyOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** If specified, the lease ID must match the lease ID of the file. */
  leaseId?: string;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
  /** The ACL for the share. */
  shareAcl?: SignedIdentifier[];
}

/** Optional parameters. */
export interface ShareGetAccessPolicyOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** If specified, the lease ID must match the lease ID of the file. */
  leaseId?: string;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
}

/** Optional parameters. */
export interface ShareSetMetadataOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** Optional. User-defined metadata for the resource. */
  metadata?: string;
  /** If specified, the lease ID must match the lease ID of the file. */
  leaseId?: string;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
}

/** Optional parameters. */
export interface ShareSetPropertiesOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** Specifies the maximum size of the share, in gigabytes. */
  shareQuota?: number;
  /** Specifies the access tier of the share. */
  accessTier?: ShareAccessTier;
  /** If specified, the lease ID must match the lease ID of the file. */
  leaseId?: string;
  /** Root squash to set on the share. Only valid for NFS shares. */
  rootSquash?: ShareRootSquash;
  /** Optional. Used to enable snapshot virtual directory access. */
  enableSnapshotVirtualDirectoryAccess?: boolean;
  /** Optional. Boolean. Default if not specified is false. This property enables paid bursting. */
  paidBurstingEnabled?: boolean;
  /** Optional. Integer. Default if not specified is the maximum IOPS the file share can support. Current maximum for a file share is 102,400 IOPS. */
  paidBurstingMaxIops?: number;
  /** Optional. Integer. Default if not specified is the maximum throughput the file share can support. Current maximum for a file share is 10,340 MiB/sec. */
  paidBurstingMaxBandwidthMibps?: number;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
  /** Optional. Specifies the provisioned number of input/output operations per second (IOPS) of the share. */
  shareProvisionedIops?: number;
  /** Optional. Specifies the provisioned bandwidth of the share, in MiBps. */
  shareProvisionedBandwidthMibps?: number;
  /** Optional. Used to enable SMB directory lease. */
  enableSmbDirectoryLease?: boolean;
}

/** Optional parameters. */
export interface ShareGetPermissionOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** Optional. Specifies the format in which the permission is returned. Acceptable values are SDDL or binary. */
  filePermissionFormat?: FilePermissionFormat;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
}

/** Optional parameters. */
export interface ShareCreatePermissionOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
}

/** Optional parameters. */
export interface ShareCreateSnapshotOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** Optional. User-defined metadata for the resource. */
  metadata?: string;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
}

/** Optional parameters. */
export interface ShareBreakLeaseOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** For a break operation, proposed duration the lease should continue before it is broken, in seconds, between 0 and 60. This break period is only used if it is shorter than the time remaining on the lease. If longer, the time remaining on the lease is used. A new lease will not be available before the break period has expired, but the lease may be held for longer than the break period. If this header does not appear with a break operation, a fixed-duration lease breaks after the remaining lease period elapses, and an infinite lease breaks immediately. */
  leaseBreakPeriod?: number;
  /** If specified, the lease ID must match the lease ID of the file. */
  leaseId?: string;
  /** The snapshot parameter is an opaque DateTime value that specifies a share snapshot. */
  shareSnapshot?: string;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
}

/** Optional parameters. */
export interface ShareRenewLeaseOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** The snapshot parameter is an opaque DateTime value that specifies a share snapshot. */
  shareSnapshot?: string;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
}

/** Optional parameters. */
export interface ShareChangeLeaseOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** Proposed lease ID, in a GUID string format. The File service returns 400 (Invalid request) if the proposed lease ID is not in the correct format. See Guid Constructor (String) for a list of valid GUID string formats. */
  proposedLeaseId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** The snapshot parameter is an opaque DateTime value that specifies a share snapshot. */
  shareSnapshot?: string;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
}

/** Optional parameters. */
export interface ShareReleaseLeaseOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** The snapshot parameter is an opaque DateTime value that specifies a share snapshot. */
  shareSnapshot?: string;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
}

/** Optional parameters. */
export interface ShareAcquireLeaseOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** Specifies the duration of the lease, in seconds, or negative one (-1) for a lease that never expires. A non-infinite lease can be between 15 and 60 seconds. A lease duration cannot be changed using renew or change. */
  leaseDuration?: number;
  /** Proposed lease ID, in a GUID string format. The File service returns 400 (Invalid request) if the proposed lease ID is not in the correct format. See Guid Constructor (String) for a list of valid GUID string formats. */
  proposedLeaseId?: string;
  /** The snapshot parameter is an opaque DateTime value that specifies a share snapshot. */
  shareSnapshot?: string;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
}

/** Optional parameters. */
export interface ShareDeleteOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The snapshot parameter is an opaque DateTime value that specifies a share snapshot. */
  shareSnapshot?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** Specifies the option include to delete the base share and all of its snapshots. */
  deleteSnapshots?: DeleteSnapshotsOptionType;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
  /** If specified, the lease ID must match the lease ID of the file. */
  leaseId?: string;
}

/** Optional parameters. */
export interface ShareGetPropertiesOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The snapshot parameter is an opaque DateTime value that specifies a share snapshot. */
  shareSnapshot?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
  /** If specified, the lease ID must match the lease ID of the file. */
  leaseId?: string;
}

/** Optional parameters. */
export interface ShareCreateOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeoutInSeconds?: number;
  /** Optional. User-defined metadata for the resource. */
  metadata?: string;
  /** Specifies the maximum size of the share, in gigabytes. */
  shareQuota?: number;
  /** Specifies the access tier of the share. */
  accessTier?: ShareAccessTier;
  /** Protocols to enable on the share. */
  enabledProtocols?: string;
  /** Root squash to set on the share. Only valid for NFS shares. */
  rootSquash?: ShareRootSquash;
  /** Optional. Used to enable snapshot virtual directory access. */
  enableSnapshotVirtualDirectoryAccess?: boolean;
  /** Optional. Boolean. Default if not specified is false. This property enables paid bursting. */
  paidBurstingEnabled?: boolean;
  /** Optional. Integer. Default if not specified is the maximum IOPS the file share can support. Current maximum for a file share is 102,400 IOPS. */
  paidBurstingMaxIops?: number;
  /** Optional. Integer. Default if not specified is the maximum throughput the file share can support. Current maximum for a file share is 10,340 MiB/sec. */
  paidBurstingMaxBandwidthMibps?: number;
  /** Valid values are 'backup'. */
  fileRequestIntent?: ShareTokenIntent;
  /** Optional. Specifies the provisioned IOPS of the share. */
  shareProvisionedIops?: number;
  /** Optional. Specifies the provisioned bandwidth of the share, in MiBps. */
  shareProvisionedBandwidthMibps?: number;
  /** Optional. Used to enable SMB directory lease. */
  enableSmbDirectoryLease?: boolean;
}
