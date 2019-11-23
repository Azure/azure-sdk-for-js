// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { AbortSignalLike } from "@azure/abort-controller";
import { HttpResponse, TransferProgressEvent } from "@azure/core-http";
import { LeaseAccessConditions, ModifiedAccessConditions, UserDelegationKeyModel } from "@azure/storage-blob";

import { PathCreateResponse, PathGetPropertiesHeaders as PathGetPropertiesHeadersModel } from "./generated/src/models";
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
  PathList,
  FileSystemListPathsHeaders,
  FileSystemListPathsResponse as ListPathsSegmentResponse,
  Path,
  PathCreateHeaders,
  PathDeleteHeaders,
  PathDeleteResponse,
  PathSetAccessControlResponse,
  PathSetAccessControlResponse as PathSetPermissionsResponse,
  PathResourceType,
  PathUpdateResponse as FileAppendResponse,
  PathUpdateResponse as FileFlushResponse,
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

export interface ListPathsOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  recursive?: boolean;
  path?: string;
  userPrincipalName?: boolean;
}

export interface ListPathsSegmentOptions extends ListPathsOptions {
  maxResults?: number;
}

/**********************************************************/
/** DataLakePathClient option and response related models */
/**********************************************************/

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
  permissions?: string;
  umask?: string;
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

/****************************************************************/
/** DataLakeDirectoryClient option and response related models **/
/****************************************************************/

export interface DirectoryCreateOptions extends PathCreateOptions {}

export interface DirectoryCreateResponse extends PathCreateResponse {}

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
  contentMD5?: Uint8Array;
}

export interface FileFlushOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  conditions?: DataLakeRequestConditions;
  retainUncommittedData?: boolean;
  close?: boolean;
  pathHttpHeaders?: PathHttpHeaders;
}

export interface FileCreateOptions extends PathCreateOptions {}

export interface FileCreateResponse extends PathCreateResponse {}

/***********************************************************/
/** DataLakeLeaseClient option and response related models */
/***********************************************************/
