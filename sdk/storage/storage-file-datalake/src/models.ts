// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { AbortSignalLike } from "@azure/abort-controller";
import { TransferProgressEvent } from "@azure/core-rest-pipeline";

import {
  LeaseAccessConditions,
  ModifiedAccessConditions as ModifiedAccessConditionsModel,
  UserDelegationKeyModel,
  BlobQueryArrowConfiguration,
  ServiceRenameContainerOptions,
  ContainerRenameResponse,
  ContainerUndeleteResponse,
  WithResponse,
} from "@azure/storage-blob";
import { DataLakePathClient } from "./clients";
export type ModifiedAccessConditions = Omit<ModifiedAccessConditionsModel, "ifTags">;

/**
 * Options to query file with Apache Arrow format. Only valid for {@link FileQueryOptions.outputTextConfiguration}.
 */
export type FileQueryArrowConfiguration = BlobQueryArrowConfiguration;

/**
 * Options to configure {@link DataLakeServiceClient.renameFileSystem}.
 */
export type ServiceRenameFileSystemOptions = ServiceRenameContainerOptions;

/**
 * Contains response data for the {@link DataLakeServiceClient.renameFileSystem} operation.
 */
export type FileSystemRenameResponse = ContainerRenameResponse;

/**
 * Contains response data for the {@link DataLakeServiceClient.undeleteFileSystem} operation.
 */
export type FileSystemUndeleteResponse = ContainerUndeleteResponse;

import {
  CpkInfo,
  FileSystemListBlobHierarchySegmentHeaders,
  FileSystemListPathsHeaders,
  LeaseAction,
  ListBlobsHierarchySegmentResponse,
  PathAppendDataHeaders,
  PathCreateHeaders,
  PathDeleteHeaders,
  PathFlushDataHeaders,
  PathGetPropertiesHeaders as PathGetPropertiesHeadersModel,
  PathList as PathListModel,
  PathSetAccessControlHeaders,
  PathSetExpiryHeaders,
  PathUndeleteHeaders,
} from "./generated/src/models";
import { DataLakeSASPermissions } from "./sas/DataLakeSASPermissions";
import { DirectorySASPermissions } from "./sas/DirectorySASPermissions";
import { FileSystemSASPermissions } from "./sas/FileSystemSASPermissions";
import { SasIPRange } from "./sas/SasIPRange";
import { SASProtocol } from "./sas/SASQueryParameters";
import { CommonOptions } from "./StorageClient";

export {
  LeaseAccessConditions,
  UserDelegationKeyModel,
  ServiceListContainersSegmentResponse,
  Lease,
  LeaseOperationOptions,
  LeaseOperationResponse,
} from "@azure/storage-blob";

export {
  BlobHierarchyListSegment,
  BlobItemModel,
  BlobPrefix,
  BlobPropertiesModel,
  CpkInfo,
  EncryptionAlgorithmType,
  FileSystemListPathsHeaders,
  FileSystemListBlobHierarchySegmentHeaders,
  ListBlobsHierarchySegmentResponse,
  Path as PathModel,
  PathList as PathListModel,
  PathCreateHeaders,
  PathDeleteHeaders,
  PathGetPropertiesHeaders as PathGetPropertiesHeadersModel,
  PathSetAccessControlHeaders,
  PathResourceType as PathResourceTypeModel,
  PathUndeleteHeaders,
  PathUpdateHeaders,
  PathAppendDataHeaders,
  PathFlushDataHeaders,
  PathGetPropertiesAction as PathGetPropertiesActionModel,
  PathRenameMode as PathRenameModeModel,
  PathExpiryOptions as FileExpiryMode,
  PathSetExpiryHeaders as FileSetExpiryHeaders,
} from "./generated/src/models";

export type PathCreateResponse = WithResponse<PathCreateHeaders, PathCreateHeaders>;
export type PathDeleteResponse = WithResponse<PathDeleteHeaders, PathDeleteHeaders>;
export type FileFlushResponse = WithResponse<PathFlushDataHeaders, PathFlushDataHeaders>;
export type FileUploadResponse = WithResponse<PathFlushDataHeaders, PathFlushDataHeaders>;
export type PathSetAccessControlResponse = WithResponse<
  PathSetAccessControlHeaders,
  PathSetAccessControlHeaders
>;
export type PathSetPermissionsResponse = WithResponse<
  PathSetAccessControlHeaders,
  PathSetAccessControlHeaders
>;
export type FileAppendResponse = WithResponse<PathAppendDataHeaders, PathAppendDataHeaders>;
export type FileSetExpiryResponse = WithResponse<PathSetExpiryHeaders, PathSetExpiryHeaders>;

/**
 * Common options of the {@link FileSystemGenerateSasUrlOptions}, {@link DirectoryGenerateSasUrlOptions}
 * and {@link FileGenerateSasUrlOptions}.
 */
export interface CommonGenerateSasUrlOptions {
  /**
   * The version of the service this SAS will target. If not specified, it will default to the version targeted by the
   * library.
   */
  version?: string;

  /**
   * Optional. SAS protocols, HTTPS only or HTTPSandHTTP
   */
  protocol?: SASProtocol;

  /**
   * Optional. When the SAS will take effect.
   */
  startsOn?: Date;

  /**
   * Optional only when identifier is provided. The time after which the SAS will no longer work.
   */
  expiresOn?: Date;

  /**
   * Optional. IP ranges allowed in this SAS.
   */
  ipRange?: SasIPRange;

  /**
   * Optional. The name of the access policy on the container this SAS references if any.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/establishing-a-stored-access-policy
   */
  identifier?: string;

  /**
   * Optional. Encryption scope to use when sending requests authorized with this SAS URI.
   */
  encryptionScope?: string;

  /**
   * Optional. The cache-control header for the SAS.
   */
  cacheControl?: string;

  /**
   * Optional. The content-disposition header for the SAS.
   */
  contentDisposition?: string;

  /**
   * Optional. The content-encoding header for the SAS.
   */
  contentEncoding?: string;

  /**
   * Optional. The content-language header for the SAS.
   */
  contentLanguage?: string;

  /**
   * Optional. The content-type header for the SAS.
   */
  contentType?: string;
}

/** ***********************************************************/
/** DataLakeServiceClient option and response related models */
/** ***********************************************************/

export interface ServiceGetUserDelegationKeyOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
}

// TODO: Leverage interface definitions from blob package directly, or duplicate create a copy here which will not have generation benefits
export interface ServiceGetUserDelegationKeyHeaders {
  clientRequestId?: string;
  requestId?: string;
  version?: string;
  date?: Date;
}

export interface UserDelegationKey {
  signedObjectId: string;
  signedTenantId: string;
  signedStartsOn: Date;
  signedExpiresOn: Date;
  signedService: string;
  signedVersion: string;
  value: string;
}

export type ServiceGetUserDelegationKeyResponse = WithResponse<
  UserDelegationKey & ServiceGetUserDelegationKeyHeaders,
  ServiceGetUserDelegationKeyHeaders,
  UserDelegationKeyModel
>;

export interface ServiceListFileSystemsOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  prefix?: string;
  includeMetadata?: boolean;

  /**
   * Specifies whether soft deleted File System should be included in the response.
   */
  includeDeleted?: boolean;
}

export type LeaseStatusType = "locked" | "unlocked";
export type LeaseStateType = "available" | "leased" | "expired" | "breaking" | "broken";
export type LeaseDurationType = "infinite" | "fixed";
export type PublicAccessType = "filesystem" | "file";

export interface FileSystemProperties {
  lastModified: Date;
  etag: string;
  leaseStatus?: LeaseStatusType;
  leaseState?: LeaseStateType;
  leaseDuration?: LeaseDurationType;
  publicAccess?: PublicAccessType;
  hasImmutabilityPolicy?: boolean;
  hasLegalHold?: boolean;
  defaultEncryptionScope?: string;
  deletedOn?: Date;
  remainingRetentionDays?: number;
}

export interface FileSystemItem {
  name: string;
  properties: FileSystemProperties;
  metadata?: Metadata;
  deleted?: boolean;
  versionId?: string;
}

export interface ListFileSystemsSegmentResponse {
  serviceEndpoint: string;
  prefix?: string;
  marker?: string;
  maxPageSize?: number;
  fileSystemItems: FileSystemItem[];
  continuationToken?: string;
}

export interface ServiceListFileSystemsSegmentHeaders {
  clientRequestId?: string;
  requestId?: string;
  version?: string;
}

export type ServiceListFileSystemsSegmentResponse = WithResponse<
  ListFileSystemsSegmentResponse & ServiceListFileSystemsSegmentHeaders,
  ServiceListFileSystemsSegmentHeaders,
  ListFileSystemsSegmentResponse
>;

/**
 * Options to configure {@link DataLakeServiceClient.generateAccountSasUrl} operation.
 */
export interface ServiceGenerateAccountSasUrlOptions {
  /**
   * The version of the service this SAS will target. If not specified, it will default to the version targeted by the
   * library.
   */
  version?: string;

  /**
   * Optional. SAS protocols allowed.
   */
  protocol?: SASProtocol;

  /**
   * Optional. When the SAS will take effect.
   */
  startsOn?: Date;
  /**
   * Optional. IP range allowed.
   */
  ipRange?: SasIPRange;
  /**
   * Optional. Encryption scope to use when sending requests authorized with this SAS URI.
   */
  encryptionScope?: string;
}

/**
 * Options to configure {@link DataLakeServiceClient.undeleteFileSystem}.
 */
export interface ServiceUndeleteFileSystemOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;

  /**
   * Optional. Specifies the new name of the restored File System.
   * Will use its original name if this is not specified.
   * @deprecated Restore FileSystem to a different name is not supported by service anymore.
   */
  destinationFileSystemName?: string;
}

/** **************************************************************/
/** DataLakeFileSystemClient option and response related models */
/** **************************************************************/

export interface FileSystemCreateOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  metadata?: Metadata;
  access?: PublicAccessType;
  /**
   * File System encryption scope info.
   */
  fileSystemEncryptionScope?: FileSystemEncryptionScope;
}

export interface FileSystemCreateHeaders {
  etag?: string;
  lastModified?: Date;
  clientRequestId?: string;
  requestId?: string;
  version?: string;
  date?: Date;
}

export type FileSystemCreateResponse = WithResponse<
  FileSystemCreateHeaders,
  FileSystemCreateHeaders
>;

export interface FileSystemDeleteOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  conditions?: DataLakeRequestConditions;
}

export interface FileSystemDeleteHeaders {
  clientRequestId?: string;
  requestId?: string;
  version?: string;
  date?: Date;
}

export type FileSystemDeleteResponse = WithResponse<
  FileSystemDeleteHeaders,
  FileSystemDeleteHeaders
>;

export interface FileSystemGetPropertiesOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  conditions?: LeaseAccessConditions;
}

export interface FileSystemGetPropertiesHeaders {
  metadata?: Metadata;
  etag?: string;
  lastModified?: Date;
  leaseDuration?: LeaseDurationType;
  leaseState?: LeaseStateType;
  leaseStatus?: LeaseStatusType;
  clientRequestId?: string;
  requestId?: string;
  version?: string;
  date?: Date;
  publicAccess?: PublicAccessType;
  hasImmutabilityPolicy?: boolean;
  hasLegalHold?: boolean;
  /**
   * The default encryption scope for the file system.
   */
  defaultEncryptionScope?: string;
}

export type FileSystemGetPropertiesResponse = WithResponse<
  FileSystemGetPropertiesHeaders,
  FileSystemGetPropertiesHeaders
>;

export interface FileSystemSetMetadataOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  conditions?: DataLakeRequestConditions;
}

export interface FileSystemSetMetadataHeaders {
  etag?: string;
  lastModified?: Date;
  clientRequestId?: string;
  requestId?: string;
  version?: string;
  date?: Date;
}

export type FileSystemSetMetadataResponse = WithResponse<
  FileSystemSetMetadataHeaders,
  FileSystemSetMetadataHeaders
>;

export interface FileSystemGetAccessPolicyOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  conditions?: LeaseAccessConditions;
}

export interface FileSystemGetAccessPolicyHeaders {
  publicAccess?: PublicAccessType;
  etag?: string;
  lastModified?: Date;
  clientRequestId?: string;
  requestId?: string;
  version?: string;
  date?: Date;
}

export interface RawAccessPolicy {
  startsOn?: string;
  expiresOn?: string;
  permissions: string;
}

export interface AccessPolicy {
  startsOn?: Date;
  expiresOn?: Date;
  permissions: string;
}

export interface SignedIdentifier<T> {
  id: string;
  accessPolicy: T;
}

export type FileSystemGetAccessPolicyResponse = WithResponse<
  {
    signedIdentifiers: SignedIdentifier<AccessPolicy>[];
  } & FileSystemGetAccessPolicyHeaders,
  FileSystemGetAccessPolicyHeaders,
  SignedIdentifier<RawAccessPolicy>[]
>;

export interface FileSystemSetAccessPolicyOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  conditions?: DataLakeRequestConditions;
}

export interface FileSystemSetAccessPolicyHeaders {
  etag?: string;
  lastModified?: Date;
  clientRequestId?: string;
  requestId?: string;
  version?: string;
  date?: Date;
}

export type FileSystemSetAccessPolicyResponse = WithResponse<
  FileSystemSetAccessPolicyHeaders,
  FileSystemSetAccessPolicyHeaders
>;

export interface ListPathsOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  recursive?: boolean;
  path?: string;
  userPrincipalName?: boolean;
}

export interface ListPathsSegmentOptions extends ListPathsOptions {
  maxResults?: number;
}

export interface Path {
  name?: string;
  isDirectory?: boolean;
  lastModified?: Date;
  etag?: string;
  contentLength?: number;
  owner?: string;
  group?: string;
  permissions?: PathPermissions;
  /**
   * The name of the encryption scope under which the blob is encrypted.
   */
  encryptionScope?: string;
  /**
   * Creation time of the path.
   */
  createdOn?: Date;
  /**
   * Expiry time of the path.
   */
  expiresOn?: Date;
  /**
   * Specifies the encryption context to set on the file.
   */
  encryptionContext?: string;
}

export interface PathList {
  pathItems?: Path[];
}

export type FileSystemListPathsResponse = WithResponse<
  PathList & FileSystemListPathsHeaders,
  FileSystemListPathsHeaders,
  PathListModel
>;

export interface ListDeletedPathsOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  /** Filters results to filesystems within the specified prefix. */
  prefix?: string;
}

export interface ListDeletedPathsSegmentOptions extends ListDeletedPathsOptions {
  maxResults?: number;
}

export interface DeletedPath {
  name: string;
  deletionId?: string;
  deletedOn?: Date;
  remainingRetentionDays?: number;
}

export interface DeletedPathList {
  pathItems?: DeletedPath[];
}

export type FileSystemListDeletedPathsResponse = WithResponse<
  DeletedPathList &
    FileSystemListBlobHierarchySegmentHeaders &
    ListBlobsHierarchySegmentResponse & { continuation?: string },
  FileSystemListBlobHierarchySegmentHeaders,
  ListBlobsHierarchySegmentResponse
>;

export interface FileSystemUndeletePathOption extends CommonOptions {
  abortSignal?: AbortSignalLike;
}

export type FileSystemUndeletePathResponse = WithResponse<
  PathUndeleteHeaders & { pathClient: DataLakePathClient },
  PathUndeleteHeaders
>;

/**
 * Option interface for Data Lake file system exists operations
 *
 * See:
 * - {@link DataLakeFileSystemClient.exists}
 */
export interface FileSystemExistsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Contains response data for the {@link DataLakeFileSystemClient.createIfNotExists} operation.
 */
export interface FileSystemCreateIfNotExistsResponse extends FileSystemCreateResponse {
  /**
   * Indicate whether the file system is successfully created. Is false when the file system is not changed as it already exists.
   */
  succeeded: boolean;
}

/**
 * Contains response data for the {@link DataLakeFileSystemClient.deleteIfExists} operation.
 */
export interface FileSystemDeleteIfExistsResponse extends FileSystemDeleteResponse {
  /**
   * Indicate whether the file system is successfully deleted. Is false if the file system doesn't exist in the first place.
   */
  succeeded: boolean;
}

/**
 * Options to configure {@link DataLakeFileSystemClient.generateSasUrl} operation.
 */
export interface FileSystemGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
  /**
   * Optional only when identifier is provided. Specifies the list of permissions to be associated with the SAS.
   */
  permissions?: FileSystemSASPermissions;
}

/** ********************************************************/
/** DataLakePathClient option and response related models */
/** ********************************************************/

export interface Metadata {
  [propertyName: string]: string;
}

export interface DataLakeRequestConditions
  extends ModifiedAccessConditions,
    LeaseAccessConditions {}

export interface RolePermissions {
  read: boolean;
  write: boolean;
  execute: boolean;
}

export interface PathPermissions {
  owner: RolePermissions;
  group: RolePermissions;
  other: RolePermissions;
  stickyBit: boolean;
  extendedAcls: boolean;
}

export type AccessControlType = "user" | "group" | "mask" | "other";

export interface RemovePathAccessControlItem {
  /**
   * Indicates whether this is the default entry for the ACL.
   */
  defaultScope: boolean;
  /**
   * Specifies which role this entry targets.
   */
  accessControlType: AccessControlType;
  /**
   * Specifies the entity for which this entry applies.
   * Must be omitted for types mask or other. It must also be omitted when the user or group is the owner.
   */
  entityId?: string;
}

export interface PathAccessControlItem {
  /**
   * Indicates whether this is the default entry for the ACL.
   */
  defaultScope: boolean;
  /**
   * Specifies which role this entry targets.
   */
  accessControlType: AccessControlType;
  /**
   * Specifies the entity for which this entry applies.
   */
  entityId: string;
  /**
   * Access control permissions.
   */
  permissions: RolePermissions;
}

export interface PathCreateHttpHeaders {
  cacheControl?: string;
  contentEncoding?: string;
  contentLanguage?: string;
  contentDisposition?: string;
  contentType?: string;
}

export interface PathCreateOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  metadata?: Metadata;
  permissions?: string; // TODO: model or string?
  umask?: string; // TODO: model or string?
  /**
   * Optional. The owner of the blob or directory.
   */
  owner?: string;
  /**
   * Optional. The owning group of the blob or directory.
   */
  group?: string;
  /**
   * Optional. POSIX access control rights on files and directories.
   */
  acl?: PathAccessControlItem[];
  conditions?: DataLakeRequestConditions;
  pathHttpHeaders?: PathCreateHttpHeaders;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Proposed lease ID, in a GUID string format. The Blob service returns 400 (Invalid request) if the proposed lease ID is not in the correct format. See Guid Constructor (String) for a list of valid GUID string formats.
   */
  proposedLeaseId?: string;
  /**
   * The lease duration is required to acquire a lease, and specifies the duration of the lease in seconds.  The lease duration must be between 15 and 60 seconds or -1 for infinite lease.
   */
  leaseDuration?: number;
  /**
   * Optional. Options for scheduling the deletion of a path.
   * A number value indicates duration before file should be deleted in milliseconds.
   * A Date value indicates the time to set for when the path will be deleted.
   * Does not apply to directories.
   */
  expiresOn?: number | Date;
  /**
   * Optional. Specifies the encryption context to set on the file.
   */
  encryptionContext?: string;
}

export interface PathCreateIfNotExistsOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  metadata?: Metadata;
  permissions?: string;
  umask?: string;
  /**
   * Optional. The owner of the blob or directory.
   */
  owner?: string;
  /**
   * Optional. The owning group of the blob or directory.
   */
  group?: string;
  /**
   * Optional. POSIX access control rights on files and directories.
   */
  acl?: PathAccessControlItem[];
  pathHttpHeaders?: PathCreateHttpHeaders;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Proposed lease ID, in a GUID string format. The Blob service returns 400 (Invalid request) if the proposed lease ID is not in the correct format. See Guid Constructor (String) for a list of valid GUID string formats.
   */
  proposedLeaseId?: string;
  /**
   * The lease duration is required to acquire a lease, and specifies the duration of the lease in seconds.  The lease duration must be between 15 and 60 seconds or -1 for infinite lease.
   */
  leaseDuration?: number;
  /**
   * Optional. Options for scheduling the deletion of a path.
   * A number value indicates duration before file should be deleted in milliseconds.
   * A Date value indicates the time to set for when the path will be deleted.
   * Does not apply to directories.
   */
  expiresOn?: number | Date;
  /**
   * Optional. Specifies the encryption context to set on the file.
   */
  encryptionContext?: string;
}

export interface PathDeleteOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  conditions?: DataLakeRequestConditions;
}

export interface PathGetAccessControlOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  conditions?: DataLakeRequestConditions;
  userPrincipalName?: boolean;
}

export interface PathGetAccessControlHeaders {
  date?: Date;
  etag?: string;
  lastModified?: Date;
  owner?: string;
  group?: string;
  requestId?: string;
  version?: string;
}

export interface PathAccessControl {
  owner?: string;
  group?: string;
  permissions?: PathPermissions;
  acl: PathAccessControlItem[];
}

export type PathGetAccessControlResponse = WithResponse<
  PathAccessControl & PathGetAccessControlHeaders,
  PathGetPropertiesHeadersModel
>;

export interface PathSetAccessControlOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  conditions?: DataLakeRequestConditions;
  owner?: string;
  group?: string;
}

/**
 * Options type for `setAccessControlRecursive`, `updateAccessControlRecursive` and `removeAccessControlRecursive`.
 */
export interface PathChangeAccessControlRecursiveOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Optional. If data set size exceeds batch size then operation will be split into multiple requests so that progress can be tracked.
   * Batch size should be between 1 and 2000. The default when unspecified is 2000.
   */
  batchSize?: number;
  /**
   * Optional. Defines maximum number of batches that single change Access Control operation can execute.
   * If maximum is reached before all subpaths are processed then continuation token can be used to resume operation.
   * Empty value indicates that maximum number of batches in unbound and operation continues till end.
   */
  maxBatches?: number;
  /**
   * Optional. Default false. If set to false, the operation will terminate quickly on encountering user failures.
   * If true, the operation will ignore user failures and proceed with the operation on other sub-entities of the directory.
   */
  continueOnFailure?: boolean;
  /**
   * Continuation token to continue next batch of operations.
   */
  continuationToken?: string;
  /**
   * Callback where caller can track progress of the operation
   * as well as collect paths that failed to change Access Control.
   */
  onProgress?: (progress: AccessControlChanges) => void;
}

/**
 * Represents an entry that failed to update Access Control List during `setAccessControlRecursive`, `updateAccessControlRecursive` and `removeAccessControlRecursive`.
 */
export interface AccessControlChangeError {
  /**
   * Returns name of an entry.
   */
  name: string;
  /**
   * Returns whether entry is a directory.
   */
  isDirectory: boolean;
  /**
   * Returns error message that is the reason why entry failed to update.
   */
  message: string;
}

/**
 * AccessControlChanges contains batch and cumulative counts of operations that change Access Control Lists recursively.
 * Additionally it exposes path entries that failed to update while these operations progress.
 */
export interface AccessControlChanges {
  /**
   * Path entries that failed to update Access Control List within single batch.
   */
  batchFailures: AccessControlChangeError[];
  /**
   * Counts of paths changed within single batch.
   */
  batchCounters: AccessControlChangeCounters;
  /**
   * Counts of paths changed from start of the operation.
   */
  aggregateCounters: AccessControlChangeCounters;
  /**
   * Optional. Value is present when operation is split into multiple batches and can be used to resume progress.
   */
  continuationToken?: string;
}

/**
 * AccessControlChangeCounters contains counts of operations that change Access Control Lists recursively.
 */
export interface AccessControlChangeCounters {
  /**
   * Returns number of directories where Access Control List has been updated successfully.
   */
  changedDirectoriesCount: number;
  /**
   * Returns number of files where Access Control List has been updated successfully.
   */
  changedFilesCount: number;
  /**
   * Returns number of paths where Access Control List update has failed.
   */
  failedChangesCount: number;
}

/**
 * Response type for `setAccessControlRecursive`, `updateAccessControlRecursive` and `removeAccessControlRecursive`.
 */
export interface PathChangeAccessControlRecursiveResponse {
  /**
   * Contains counts of paths changed from start of the operation.
   */
  counters: AccessControlChangeCounters;
  /**
   * Optional. Value is present when operation is split into multiple batches and can be used to resume progress.
   */
  continuationToken?: string;
}

export interface PathSetPermissionsOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  conditions?: DataLakeRequestConditions;
  owner?: string;
  group?: string;
}

export interface PathGetPropertiesOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  conditions?: DataLakeRequestConditions;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
}

export type CopyStatusType = "pending" | "success" | "aborted" | "failed";

export interface PathGetPropertiesHeaders {
  lastModified?: Date;
  createdOn?: Date;
  metadata?: Metadata;
  copyCompletedOn?: Date;
  copyStatusDescription?: string;
  copyId?: string;
  copyProgress?: string;
  copySource?: string;
  copyStatus?: CopyStatusType;
  isIncrementalCopy?: boolean;
  destinationSnapshot?: string;
  leaseDuration?: LeaseDurationType;
  leaseState?: LeaseStateType;
  leaseStatus?: LeaseStatusType;
  contentLength?: number;
  contentType?: string;
  etag?: string;
  contentMD5?: Uint8Array;
  contentEncoding?: string;
  contentDisposition?: string;
  contentLanguage?: string;
  cacheControl?: string;
  // blobSequenceNumber?: number;
  clientRequestId?: string;
  requestId?: string;
  version?: string;
  date?: Date;
  acceptRanges?: string;
  // blobCommittedBlockCount?: number;
  isServerEncrypted?: boolean;
  encryptionKeySha256?: string;
  /**
   * Returns the name of the encryption scope used to encrypt the path contents and application metadata.
   * Note that the absence of this header implies use of the default account encryption scope.
   */
  encryptionScope?: string;
  accessTier?: string;
  accessTierInferred?: boolean;
  archiveStatus?: string;
  accessTierChangedOn?: Date;

  /**
   * The time the file will expire.
   */
  expiresOn?: Date;
  /**
   * Optional. Specifies the encryption context to set on the file.
   */
  encryptionContext?: string;
  owner?: string;
  group?: string;
  permissions?: PathPermissions;
  acl: PathAccessControlItem[];
}

export type PathGetPropertiesResponse = WithResponse<
  PathGetPropertiesHeaders,
  PathGetPropertiesHeaders
>;

export interface PathSetHttpHeadersOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  conditions?: DataLakeRequestConditions;
}

export interface PathHttpHeaders {
  cacheControl?: string;
  contentEncoding?: string;
  contentLanguage?: string;
  contentDisposition?: string;
  contentType?: string;
  contentMD5?: Uint8Array;
}

export interface PathSetHttpHeadersHeaders {
  etag?: string;
  lastModified?: Date;
  clientRequestId?: string;
  requestId?: string;
  version?: string;
  date?: Date;
}

export type PathSetHttpHeadersResponse = WithResponse<
  PathSetHttpHeadersHeaders,
  PathSetHttpHeadersHeaders
>;

export interface PathSetMetadataOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  conditions?: DataLakeRequestConditions;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
}

export interface PathSetMetadataHeaders {
  etag?: string;
  lastModified?: Date;
  clientRequestId?: string;
  requestId?: string;
  version?: string;
  date?: Date;
  isServerEncrypted?: boolean;
  encryptionKeySha256?: string;
}

export type PathSetMetadataResponse = WithResponse<PathSetMetadataHeaders, PathSetMetadataHeaders>;

export interface PathMoveOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  conditions?: DataLakeRequestConditions;
  destinationConditions?: DataLakeRequestConditions;
}

export interface PathRemoveHeaders {
  date?: Date;
  etag?: string;
  lastModified?: Date;
  requestId?: string;
  version?: string;
  contentLength?: number;
}

export type PathMoveResponse = WithResponse<PathRemoveHeaders, PathRemoveHeaders>;

/**
 * Option interface for Data Lake directory/file exists operations
 *
 * See:
 * - {@link DataLakePathClient.exists}
 */
export interface PathExistsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
}

/**
 * Contains response data for the {@link DataLakePathClient.createIfNotExists} operation.
 */
export interface PathCreateIfNotExistsResponse extends PathCreateResponse {
  /**
   * Indicate whether the directory/file is successfully created. Is false when the directory/file is not changed as it already exists.
   */
  succeeded: boolean;
}

/**
 * Contains response data for the {@link DataLakePathClient.deleteIfExists} operation.
 */
export interface PathDeleteIfExistsResponse extends PathDeleteResponse {
  /**
   * Indicate whether the directory/file is successfully deleted. Is false if the directory/file doesn't exist in the first place.
   */
  succeeded: boolean;
}

// Keeping these for backward compatibility when we changed to use string unions.
/**
 * Defines values for PathGetPropertiesAction.
 * Possible values include: 'getAccessControl', 'getStatus'
 * @readonly
 */
export enum PathGetPropertiesAction {
  GetAccessControl = "getAccessControl",
  GetStatus = "getStatus",
}
/**
 * Defines values for PathRenameMode.
 * Possible values include: 'legacy', 'posix'
 * @readonly
 */
export enum PathRenameMode {
  Legacy = "legacy",
  Posix = "posix",
}
/**
 * Defines values for PathResourceType.
 * Possible values include: 'directory', 'file'
 * @readonly
 */
export enum PathResourceType {
  Directory = "directory",
  File = "file",
}

/** **************************************************************/
/** DataLakeDirectoryClient option and response related models **/
/** **************************************************************/

export interface DirectoryCreateOptions extends PathCreateOptions {}

export interface DirectoryCreateIfNotExistsOptions extends PathCreateIfNotExistsOptions {}

export interface DirectoryCreateResponse extends PathCreateResponse {}

export interface DirectoryCreateIfNotExistsResponse extends PathCreateIfNotExistsResponse {}

/**
 * Options to configure {@link DataLakeDirectoryClient.generateSasUrl} operation.
 */
export interface DirectoryGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
  /**
   * Optional only when identifier is provided. Specifies the list of permissions to be associated with the SAS.
   */
  permissions?: DirectorySASPermissions;
}

/** *********************************************************/
/** DataLakeFileClient option and response related models **/
/** *********************************************************/

export interface FileReadOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  rangeGetContentMD5?: boolean;
  rangeGetContentCrc64?: boolean;
  conditions?: DataLakeRequestConditions;
  onProgress?: (progress: TransferProgressEvent) => void;
  maxRetryRequests?: number;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
}

export interface FileReadHeaders {
  lastModified?: Date;
  /**
   * Returns the date and time the file was created.
   */
  createdOn?: Date;
  metadata?: Metadata;
  contentLength?: number;
  contentType?: string;
  contentRange?: string;
  etag?: string;
  contentMD5?: Uint8Array;
  contentEncoding?: string;
  cacheControl?: string;
  contentDisposition?: string;
  contentLanguage?: string;
  // blobSequenceNumber?: number;
  copyCompletedOn?: Date;
  copyStatusDescription?: string;
  copyId?: string;
  copyProgress?: string;
  copySource?: string;
  copyStatus?: CopyStatusType;
  leaseDuration?: LeaseDurationType;
  leaseState?: LeaseStateType;
  leaseStatus?: LeaseStatusType;
  clientRequestId?: string;
  requestId?: string;
  version?: string;
  acceptRanges?: string;
  date?: Date;
  // blobCommittedBlockCount?: number;
  isServerEncrypted?: boolean;
  encryptionKeySha256?: string;
  fileContentMD5?: Uint8Array; // Content MD5 for whole file
  contentCrc64?: Uint8Array;
  /**
   * Specifies the encryption context to set on the file.
   */
  encryptionContext?: string;
  owner?: string;
  group?: string;
  permissions?: PathPermissions;
  acl: PathAccessControlItem[];
}

export type FileReadResponse = WithResponse<
  FileReadHeaders & {
    contentAsBlob?: Promise<Blob>;
    readableStreamBody?: NodeJS.ReadableStream;
  },
  FileReadHeaders
>;

export interface FileAppendOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  conditions?: LeaseAccessConditions;
  transactionalContentMD5?: Uint8Array;
  onProgress?: (progress: TransferProgressEvent) => void;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
  /**
   * If file should be flushed automatically after the append
   */
  flush?: boolean;
  /**
   * Proposed lease ID, in a GUID string format. The Blob service returns 400 (Invalid request) if the proposed lease ID is not in the correct format. See Guid Constructor (String) for a list of valid GUID string formats.
   * */
  proposedLeaseId?: string;
  /**
   * The lease duration is required to acquire a lease, and specifies the duration of the lease in seconds.  The lease duration must be between 15 and 60 seconds or -1 for infinite lease.
   * */
  leaseDurationInSeconds?: number;
  /**
   * Optional. If "acquire" it will acquire the lease. If "auto-renew" it will renew the lease. If "release" it will release the lease only on flush. If "acquire-release" it will acquire & complete the operation & release the lease once operation is done.
   * */
  leaseAction?: LeaseAction;
}

export interface FileFlushOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  conditions?: DataLakeRequestConditions;
  retainUncommittedData?: boolean;
  close?: boolean;
  pathHttpHeaders?: PathHttpHeaders;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Proposed lease ID, in a GUID string format. The Blob service returns 400 (Invalid request) if the proposed lease ID is not in the correct format. See Guid Constructor (String) for a list of valid GUID string formats.
   */
  proposedLeaseId?: string;
  /**
   * The lease duration is required to acquire a lease, and specifies the duration of the lease in seconds.  The lease duration must be between 15 and 60 seconds or -1 for infinite lease.
   */
  leaseDurationInSeconds?: number;
  /**
   * Optional. If "acquire" it will acquire the lease. If "auto-renew" it will renew the lease. If "release" it will release the lease only on flush. If "acquire-release" it will acquire & complete the operation & release the lease once operation is done.
   */
  leaseAction?: LeaseAction;
}

export interface FileCreateOptions extends PathCreateOptions {}

export interface FileCreateIfNotExistsOptions extends PathCreateIfNotExistsOptions {}

export interface FileCreateResponse extends PathCreateResponse {}

export interface FileCreateIfNotExistsResponse extends PathCreateIfNotExistsResponse {}

/**
 * Option interface for Data Lake file - Upload operations
 *
 * See:
 * - {@link DataLakeFileClient.upload}
 * - {@link DataLakeFileClient.uploadFile}
 * - {@link DataLakeFileClient.uploadStream}
 */
export interface FileParallelUploadOptions extends CommonOptions {
  // For all.
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;

  /**
   * Access conditions headers.
   */
  conditions?: DataLakeRequestConditions;

  // For create and flush.
  /**
   * Http headers.
   */
  pathHttpHeaders?: PathHttpHeaders;

  // For create.
  /**
   * A collection of key-value string pair to associate with the Data Lake file.
   */
  metadata?: Metadata;

  /**
   * Sets POSIX access permissions for the file owner, the file owning group, and others.
   * Each class may be granted read, write, or execute permission. The sticky bit is also supported.
   * Both symbolic (rwxrw-rw-) and 4-digit octal notation (e.g. 0766) are supported.
   */
  permissions?: string; // TODO: model or string?

  /**
   * The umask restricts the permissions of the file to be created.
   * The resulting permission is given by p & ^u, where p is the permission and u is the umask.
   * For example, if p is 0777 and u is 0057, then the resulting permission is 0720.
   * The default permission is 0666 for a file. The default umask is 0027.
   * The umask must be specified in 4-digit octal notation (e.g. 0766).
   */
  umask?: string; // TODO: model or string?

  // For append.
  /**
   * Progress updater.
   */
  onProgress?: (progress: TransferProgressEvent) => void;

  // For flush.
  /**
   * When Azure Storage Events are enabled, a file changed event is raised.
   * This event has a property indicating whether this is the final change
   * to distinguish the difference between an intermediate flush to a file stream (when close set to "false")
   * and the final close of a file stream (when close set to "true").
   */
  close?: boolean;

  // For parallel transfer control.

  /**
   * Data size threshold in bytes to use a single upload operation rather than parallel uploading.
   * Data of smaller size than this limit will be transferred in a single upload.
   * Data larger than this limit will be transferred in chunks in parallel.
   * Its default and max value is FILE_MAX_SINGLE_UPLOAD_THRESHOLD.
   * Note: {@link DataLakeFileClient.uploadStream} do not respect this field and always do parallel uploading.
   */
  singleUploadThreshold?: number;

  /**
   * The size of data in bytes that will be transferred in parallel.
   * If set to 0 or undefined, it will be automatically calculated according
   * to the data size. Its max value is FILE_UPLOAD_MAX_CHUNK_SIZE.
   */
  chunkSize?: number;
  /**
   * Max concurrency of parallel uploading. Must be greater than or equal to 0. Its default value is DEFAULT_HIGH_LEVEL_CONCURRENCY.
   */
  maxConcurrency?: number;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Specifies the encryption context to set on the file.
   */
  encryptionContext?: string;
}

/**
 * Option interface for Data Lake file - readToBuffer operations
 *
 * See:
 * - {@link DataLakeFileClient.readToBuffer}
 */
export interface FileReadToBufferOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;

  /**
   * Access conditions headers.
   */
  conditions?: DataLakeRequestConditions;

  /**
   * Progress updater.
   */
  onProgress?: (progress: TransferProgressEvent) => void;

  /**
   * How many retries will perform for each read when the original chunk read stream ends unexpectedly.
   * Above kind of ends will not trigger retry policy defined in a pipeline,
   * because they doesn't emit network errors. Default value is 5.
   */
  maxRetryRequestsPerChunk?: number;

  /**
   * chunkSize is size of data every request trying to read.
   * Must be greater than or equal to 0, if set to 0 or undefined, it will automatically calculated according
   * to the file size.
   */
  chunkSize?: number;

  /**
   * Concurrency of parallel read.
   */
  concurrency?: number;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
}

/**
 * Options to query file with JSON format.
 */
export interface FileQueryJsonTextConfiguration {
  /**
   * Record separator.
   */
  recordSeparator: string;
  /**
   * Query for a JSON format file.
   */
  kind: "json";
}

/**
 * Options to query file with CSV format.
 */
export interface FileQueryCsvTextConfiguration {
  /**
   * Record separator.
   */
  recordSeparator: string;
  /**
   * Query for a CSV format file.
   */
  kind: "csv";
  /**
   * Column separator. Default is ",".
   */
  columnSeparator?: string;
  /**
   * Field quote.
   */
  fieldQuote?: string;
  /**
   * Escape character.
   */
  escapeCharacter?: string;
  /**
   * Has headers. Default is false.
   */
  hasHeaders?: boolean;
}

/**
 * Options to query file with Parquet format.
 */
export interface FileQueryParquetConfiguration {
  /**
   * Kind.
   */
  kind: "parquet";
}

/**
 * File query error type.
 */
export interface FileQueryError {
  /**
   * Whether the error is fatal or not. A fatal error will stop the query.
   */
  isFatal: boolean;
  /**
   * Error name.
   */
  name: string;
  /**
   * Position in bytes of the query.
   */
  position: number;
  /**
   * Error description.
   */
  description: string;
}

/**
 * Option interface for Data Lake file - query operations
 *
 * See:
 * - {@link DataLakeFileClient.query}
 */
export interface FileQueryOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Configurations for the query input.
   */
  inputTextConfiguration?:
    | FileQueryJsonTextConfiguration
    | FileQueryCsvTextConfiguration
    | FileQueryParquetConfiguration;
  /**
   * Configurations for the query output.
   */
  outputTextConfiguration?:
    | FileQueryJsonTextConfiguration
    | FileQueryCsvTextConfiguration
    | FileQueryArrowConfiguration;
  /**
   * Callback to receive events on the progress of query operation.
   */
  onProgress?: (progress: TransferProgressEvent) => void;
  /**
   * Callback to receive error events during the query operaiton.
   */
  onError?: (error: FileQueryError) => void;
  /**
   * Conditions to meet when uploading to the block file.
   */
  conditions?: DataLakeRequestConditions;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
}

/**
 * Option interface for the {@link DataLakeFileClient.setExpiry} operation.
 */
export interface FileSetExpiryOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;

  /**
   * The time to set the file to expire on, used in combination with the "Absolute" {@link FileExpiryMode}.
   * A time in the past is not allowed and milliseconds will be dropped.
   */
  expiresOn?: Date;

  /**
   * The number of milliseconds to elapse before the file expires, used in combination with the "RelativeToCreation" or "RelativeToNow" {@link FileExpiryMode}.
   */
  timeToExpireInMs?: number;
}

/**
 * Options to configure {@link DataLakeFileClient.generateSasUrl} operation.
 */
export interface FileGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
  /**
   * Optional only when identifier is provided. Specifies the list of permissions to be associated with the SAS.
   */
  permissions?: DataLakeSASPermissions;
}

/**
 * Options to specify encryption scope on a file system.
 */
export declare interface FileSystemEncryptionScope {
  /** Optional.  Version 2021-02-12 and later.  Specifies the default encryption scope to set on the file system and use for all future writes. */
  defaultEncryptionScope?: string;

  /** Optional.  Version 2021-02-12 and newer.  If true, prevents any request from specifying a different encryption scope than the scope set on the container. */
  preventEncryptionScopeOverride?: boolean;
}

/**
 * Defines the known cloud audiences for Storage.
 */
export enum StorageDataLakeAudience {
  /**
   * The OAuth scope to use to retrieve an AAD token for Azure Storage.
   */
  StorageOAuthScopes = "https://storage.azure.com/.default",
}

export function getDataLakeServiceAccountAudience(storageAccountName: string): string {
  return `https://${storageAccountName}.dfs.core.windows.net/.default`;
}

/** *********************************************************/
/** DataLakeLeaseClient option and response related models */
/** *********************************************************/
