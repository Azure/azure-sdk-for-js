// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { AbortSignalLike } from "@azure/abort-controller";
import { HttpResponse, TransferProgressEvent } from "@azure/core-http";
import {
  LeaseAccessConditions,
  ModifiedAccessConditions,
  UserDelegationKeyModel
} from "@azure/storage-blob";

import {
  PathCreateResponse,
  PathGetPropertiesHeaders as PathGetPropertiesHeadersModel,
  FileSystemListPathsHeaders,
  PathList as PathListModel
} from "./generated/src/models";
import { CommonOptions } from "./StorageClient";

export {
  LeaseAccessConditions,
  UserDelegationKeyModel,
  ServiceListContainersSegmentResponse,
  Lease,
  LeaseOperationOptions,
  LeaseOperationResponse
} from "@azure/storage-blob";

export {
  FileSystemListPathsHeaders,
  FileSystemListPathsResponse as ListPathsSegmentResponse,
  PathList as PathListModel,
  PathCreateHeaders,
  PathDeleteHeaders,
  PathDeleteResponse,
  PathSetAccessControlResponse,
  PathSetAccessControlResponse as PathSetPermissionsResponse,
  PathResourceType,
  PathUpdateResponse as FileAppendResponse,
  PathUpdateResponse as FileFlushResponse,
  PathUpdateResponse as FileUploadResponse,
  PathGetPropertiesAction,
  PathRenameMode
} from "./generated/src/models";

export { PathCreateResponse };

/*************************************************************/
/** DataLakeServiceClient option and response related models */
/*************************************************************/

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

export type ServiceGetUserDelegationKeyResponse = UserDelegationKey &
  ServiceGetUserDelegationKeyHeaders & {
    _response: HttpResponse & {
      parsedHeaders: ServiceGetUserDelegationKeyHeaders;
      bodyAsText: string;
      parsedBody: UserDelegationKeyModel;
    };
  };

export interface ServiceListFileSystemsOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  prefix?: string;
  includeMetadata?: boolean;
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
}

export interface FileSystemItem {
  name: string;
  properties: FileSystemProperties;
  metadata?: Metadata;
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

export type ServiceListFileSystemsSegmentResponse = ListFileSystemsSegmentResponse &
  ServiceListFileSystemsSegmentHeaders & {
    _response: HttpResponse & {
      parsedHeaders: ServiceListFileSystemsSegmentHeaders;
      bodyAsText: string;
      parsedBody: ListFileSystemsSegmentResponse;
    };
  };

/****************************************************************/
/** DataLakeFileSystemClient option and response related models */
/****************************************************************/

export interface FileSystemCreateOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  metadata?: Metadata;
  access?: PublicAccessType;
}

export interface FileSystemCreateHeaders {
  etag?: string;
  lastModified?: Date;
  clientRequestId?: string;
  requestId?: string;
  version?: string;
  date?: Date;
}

export type FileSystemCreateResponse = FileSystemCreateHeaders & {
  _response: HttpResponse & {
    parsedHeaders: FileSystemCreateHeaders;
  };
};

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

export type FileSystemDeleteResponse = FileSystemDeleteHeaders & {
  _response: HttpResponse & {
    parsedHeaders: FileSystemDeleteHeaders;
  };
};

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
}

export type FileSystemGetPropertiesResponse = FileSystemGetPropertiesHeaders & {
  _response: HttpResponse & {
    parsedHeaders: FileSystemGetPropertiesHeaders;
  };
};

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

export type FileSystemSetMetadataResponse = FileSystemSetMetadataHeaders & {
  _response: HttpResponse & {
    parsedHeaders: FileSystemSetMetadataHeaders;
  };
};

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

export type FileSystemGetAccessPolicyResponse = {
  signedIdentifiers: SignedIdentifier<AccessPolicy>[];
} & FileSystemGetAccessPolicyHeaders & {
  _response: HttpResponse & {
    parsedHeaders: FileSystemGetAccessPolicyHeaders;
    bodyAsText: string;
    parsedBody: SignedIdentifier<RawAccessPolicy>[];
  };
};

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

export type FileSystemSetAccessPolicyResponse = FileSystemSetAccessPolicyHeaders & {
  _response: HttpResponse & {
    parsedHeaders: FileSystemSetAccessPolicyHeaders;
  };
};

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
  eTag?: string;
  contentLength?: number;
  owner?: string;
  group?: string;
  permissions?: PathPermissions;
}

export interface PathList {
  pathItems?: Path[];
}

export type FileSystemListPathsResponse = PathList &
  FileSystemListPathsHeaders & {
    _response: HttpResponse & {
      parsedHeaders: FileSystemListPathsHeaders;
      bodyAsText: string;
      parsedBody: PathListModel;
    };
  };

export interface FileSystemExistsOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
}

/**********************************************************/
/** DataLakePathClient option and response related models */
/**********************************************************/

export interface Metadata {
  [propertyName: string]: string;
}

export interface DataLakeRequestConditions
  extends ModifiedAccessConditions,
  LeaseAccessConditions { }

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

export interface PathAccessControlItem {
  defaultScope: boolean;
  accessControlType: AccessControlType;
  entityId: string;
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
  conditions?: DataLakeRequestConditions;
  pathHttpHeaders?: PathCreateHttpHeaders;
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
  eTag?: string;
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

export type PathGetAccessControlResponse = PathAccessControl &
  PathGetAccessControlHeaders & {
    _response: HttpResponse & {
      parsedHeaders: PathGetPropertiesHeadersModel;
    };
  };

export interface PathSetAccessControlOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  conditions?: DataLakeRequestConditions;
  owner?: string;
  group?: string;
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
  accessTier?: string;
  accessTierInferred?: boolean;
  archiveStatus?: string;
  accessTierChangedOn?: Date;
}

export type PathGetPropertiesResponse = PathGetPropertiesHeaders & {
  _response: HttpResponse & {
    parsedHeaders: PathGetPropertiesHeaders;
  };
};

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

export type PathSetHttpHeadersResponse = PathSetHttpHeadersHeaders & {
  _response: HttpResponse & {
    parsedHeaders: PathSetHttpHeadersHeaders;
  };
};

export interface PathSetMetadataOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  conditions?: DataLakeRequestConditions;
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

export type PathSetMetadataResponse = PathSetMetadataHeaders & {
  _response: HttpResponse & {
    parsedHeaders: PathSetMetadataHeaders;
  };
};

export interface PathMoveOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  conditions?: DataLakeRequestConditions;
  destinationConditions?: DataLakeRequestConditions;
}

export interface PathRemoveHeaders {
  date?: Date;
  eTag?: string;
  lastModified?: Date;
  requestId?: string;
  version?: string;
  contentLength?: number;
}

export type PathMoveResponse = PathRemoveHeaders & {
  _response: HttpResponse & {
    parsedHeaders: PathRemoveHeaders;
  };
};

export interface FilePathExistsOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  // customerProvidedKey?: CpkInfo; not supported yet
}

/****************************************************************/
/** DataLakeDirectoryClient option and response related models **/
/****************************************************************/

export interface DirectoryCreateOptions extends PathCreateOptions { }

export interface DirectoryCreateResponse extends PathCreateResponse { }

/***********************************************************/
/** DataLakeFileClient option and response related models **/
/***********************************************************/

export interface FileReadOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  rangeGetContentMD5?: boolean;
  rangeGetContentCrc64?: boolean;
  conditions?: DataLakeRequestConditions;
  onProgress?: (progress: TransferProgressEvent) => void;
  maxRetryRequests?: number;
}

export interface FileReadHeaders {
  lastModified?: Date;
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
}

export type FileReadResponse = FileReadHeaders & {
  contentAsBlob?: Promise<Blob>;
  readableStreamBody?: NodeJS.ReadableStream;
  _response: HttpResponse & {
    parsedHeaders: FileReadHeaders;
  };
};

export interface FileAppendOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  conditions?: LeaseAccessConditions;
  transactionalContentMD5?: Uint8Array;
  onProgress?: (progress: TransferProgressEvent) => void;
}

export interface FileFlushOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  conditions?: DataLakeRequestConditions;
  retainUncommittedData?: boolean;
  close?: boolean;
  pathHttpHeaders?: PathHttpHeaders;
}

export interface FileCreateOptions extends PathCreateOptions { }

export interface FileCreateResponse extends PathCreateResponse { }

export interface FileParallelUploadOptions extends CommonOptions {
  // For all.
  abortSignal?: AbortSignalLike;
  conditions?: DataLakeRequestConditions;

  // For create and flush.
  pathHttpHeaders?: PathCreateHttpHeaders;

  // For create.
  metadata?: Metadata;
  permissions?: string; // TODO: model or string?
  umask?: string; // TODO: model or string?

  // For append.
  onProgress?: (progress: TransferProgressEvent) => void;

  // For flush.
  close?: boolean;

  // For parallel transfer control.

  /**
   * The size of the first range request in bytes. Data smaller than this limit will
   * be transferred in a single request. Data larger than this limit will be transferred
   * in chunks of size chunkSize. Its default and max value is FILE_MAX_INITIAL_TRANSFER_SIZE.
   *
   * @type {number}
   * @memberof FileParallelUploadOptions
   */
  initialTransferSize?: number;

  /**
   * The size of data that will be transferred in parallel. Its default value is FILE_UPLOAD_DEFAULT_CHUNK_SIZE.
   * Its max value is FILE_UPLOAD_MAX_CHUNK_SIZE.
   *
   * @type {number}
   * @memberof FileParallelUploadOptions
   */
  chunkSize?: number;
  /**
   * Max concurrency of parallel uploading. Must be >= 0. Its default value is DEFAULT_HIGH_LEVEL_CONCURRENCY.
   * 
   * @type {number}
   * @memberof FileParallelUploadOptions
   */
  maxConcurrency?: number;
}

export interface FileReadToBufferOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  conditions?: DataLakeRequestConditions;

  onProgress?: (progress: TransferProgressEvent) => void;

  /**
   * How many retries will perform for each read when the original chunk read stream ends unexpectedly.
   * Above kind of ends will not trigger retry policy defined in a pipeline,
   * because they doesn't emit network errors.
   *
   * @type {number}
   * @memberof FileReadToBufferOptions
   */
  maxRetryRequestsPerChunk?: number;
  chunkSize?: number;
  concurrency?: number;
}

/***********************************************************/
/** DataLakeLeaseClient option and response related models */
/***********************************************************/
