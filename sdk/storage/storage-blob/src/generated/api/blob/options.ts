// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AccessTier,
  RehydratePriority,
  ImmutabilityPolicyMode,
  EncryptionAlgorithmType,
  DeleteSnapshotsOptionType,
  BlobDeleteType,
  BlobCopySourceTags,
  FileShareTokenIntent,
} from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BlobSetTagsOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** Specifies the version ID of the blob. */
  versionId?: string;
  /** Specifies the transactional MD5 hash for the body. */
  transactionalContentMD5?: Uint8Array;
  /** Specifies the transactional CRC64 hash for the body. */
  transactionalContentCrc64?: Uint8Array;
  /** Specifies a SQL-like where clause on blob tags to operate only on a blob with matching tags. */
  ifTags?: string;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** Specify this value to operate only on a blob if it has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** Specify this value to operate only on a blob if it has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** Specify this value to operate only on a blob with a matching Etag value. */
  ifMatch?: string;
  /** Specify this value to operate only on a blob with a non-matching Etag value. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface BlobGetTagsOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** Specifies the snapshot of the blob. */
  snapshot?: string;
  /** Specifies the version ID of the blob. */
  versionId?: string;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** Specifies a SQL-like where clause on blob tags to operate only on a blob with matching tags. */
  ifTags?: string;
  /** Specify this value to operate only on a blob if it has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** Specify this value to operate only on a blob if it has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** Specify this value to operate only on a blob with a matching Etag value. */
  ifMatch?: string;
  /** Specify this value to operate only on a blob with a non-matching Etag value. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface BlobGetAccountInfoOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
}

/** Optional parameters. */
export interface BlobSetTierOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** Specifies the snapshot of the blob. */
  snapshot?: string;
  /** Specifies the version ID of the blob. */
  versionId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** The priority of the rehydration operation. */
  rehydratePriority?: RehydratePriority;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** Specifies a SQL-like where clause on blob tags to operate only on a blob with matching tags. */
  ifTags?: string;
}

/** Optional parameters. */
export interface BlobAbortCopyFromUrlOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
}

/** Optional parameters. */
export interface BlobCopyFromUrlOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** The metadata headers. */
  metadata?: Record<string, string>;
  /** The tier to be set on the blob. */
  tier?: AccessTier;
  /** Specify this value to operate only on a source blob if it has been modified since the specified date-time. */
  sourceIfModifiedSince?: Date;
  /** Specify this header value to operate only on a blob if it has not been modified since the specified date-time. */
  sourceIfUnmodifiedSince?: Date;
  /** Specify this value to operate only on a source blob with a matching Etag value. */
  sourceIfMatch?: string;
  /** Specify this value to operate only on a source blob with a non-matching Etag value. */
  sourceIfNoneMatch?: string;
  /** Specify this value to operate only on a blob if it has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** Specify this value to operate only on a blob if it has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** Specify this value to operate only on a blob with a non-matching Etag value. */
  ifNoneMatch?: string;
  /** Specify this value to operate only on a blob with a matching Etag value. */
  ifMatch?: string;
  /** Specifies a SQL-like where clause on blob tags to operate only on a blob with matching tags. */
  ifTags?: string;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** Specifies the MD5 hash calculated for the range of bytes that must be read from the copy source. */
  sourceContentMD5?: Uint8Array;
  /** The blob tags. */
  blobTagsString?: string;
  /** The date-time that indicates the time at which the blob immutability policy will expire. */
  immutabilityPolicyExpiry?: Date;
  /** Indicates the immutability policy mode of the blob. */
  immutabilityPolicyMode?: ImmutabilityPolicyMode;
  /** Indicates whether the blob has a legal hold. */
  legalHold?: boolean;
  /** Only the Bearer authorization scheme is supported, and the value must be a valid OAuth access token for the copy source. */
  copySourceAuthorization?: string;
  /** Specifies the encryption scope used to encrypt the data. */
  encryptionScope?: string;
  /** Indicates if source tags should be copied or replaced with the tags specified. Default is 'Replace'. */
  copySourceTags?: BlobCopySourceTags;
  /** Specifies the file request token intent. */
  fileRequestIntent?: FileShareTokenIntent;
}

/** Optional parameters. */
export interface BlobStartCopyFromUrlOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** The metadata headers. */
  metadata?: Record<string, string>;
  /** The tier to be set on the blob. */
  tier?: AccessTier;
  /** The priority of the rehydration operation. */
  rehydratePriority?: RehydratePriority;
  /** Specify this value to operate only on a source blob if it has been modified since the specified date-time. */
  sourceIfModifiedSince?: Date;
  /** Specify this header value to operate only on a blob if it has not been modified since the specified date-time. */
  sourceIfUnmodifiedSince?: Date;
  /** Specify this value to operate only on a source blob with a matching Etag value. */
  sourceIfMatch?: string;
  /** Specify this value to operate only on a source blob with a non-matching Etag value. */
  sourceIfNoneMatch?: string;
  /** Specifies a SQL-like where clause on blob tags to operate only on a source blob with matching tags. */
  sourceIfTags?: string;
  /** Specify this value to operate only on a blob if it has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** Specify this value to operate only on a blob if it has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** Specify this value to operate only on a blob with a non-matching Etag value. */
  ifNoneMatch?: string;
  /** Specify this value to operate only on a blob with a matching Etag value. */
  ifMatch?: string;
  /** Specifies a SQL-like where clause on blob tags to operate only on a blob with matching tags. */
  ifTags?: string;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** The blob tags. */
  blobTagsString?: string;
  /** Overrides the sealed state of the destination blob. */
  sealBlob?: boolean;
  /** The date-time that indicates the time at which the blob immutability policy will expire. */
  immutabilityPolicyExpiry?: Date;
  /** Indicates the immutability policy mode of the blob. */
  immutabilityPolicyMode?: ImmutabilityPolicyMode;
  /** Indicates whether the blob has a legal hold. */
  legalHold?: boolean;
}

/** Optional parameters. */
export interface BlobCreateSnapshotOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** The metadata headers. */
  metadata?: Record<string, string>;
  /** Specifies the encryption key to use to encrypt the data provided in the request. */
  encryptionKey?: string;
  /** The SHA-256 hash of the provided encryption key. Must be provided if the encryption key is provided. */
  encryptionKeySha256?: string;
  /** The algorithm used to produce the encryption key hash. Must be provided if the encryption key is provided. */
  encryptionAlgorithm?: EncryptionAlgorithmType;
  /** Specifies the encryption scope used to encrypt the data. */
  encryptionScope?: string;
  /** Specify this value to operate only on a blob if it has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** Specify this value to operate only on a blob if it has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** Specify this value to operate only on a blob with a non-matching Etag value. */
  ifNoneMatch?: string;
  /** Specify this value to operate only on a blob with a matching Etag value. */
  ifMatch?: string;
  /** Specifies a SQL-like where clause on blob tags to operate only on a blob with matching tags. */
  ifTags?: string;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
}

/** Optional parameters. */
export interface BlobBreakLeaseOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** Proposed duration the lease should continue before it is broken, in seconds, between 0 and 60. This break period is only used if it is shorter than the time remaining on the lease. If longer, the time remaining on the lease is used. */
  breakPeriod?: number;
  /** Specify this value to operate only on a blob if it has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** Specify this value to operate only on a blob if it has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** Specify this value to operate only on a blob with a non-matching Etag value. */
  ifNoneMatch?: string;
  /** Specify this value to operate only on a blob with a matching Etag value. */
  ifMatch?: string;
  /** Specifies a SQL-like where clause on blob tags to operate only on a blob with matching tags. */
  ifTags?: string;
}

/** Optional parameters. */
export interface BlobChangeLeaseOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** Specify this value to operate only on a blob if it has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** Specify this value to operate only on a blob if it has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** Specify this value to operate only on a blob with a non-matching Etag value. */
  ifNoneMatch?: string;
  /** Specify this value to operate only on a blob with a matching Etag value. */
  ifMatch?: string;
  /** Specifies a SQL-like where clause on blob tags to operate only on a blob with matching tags. */
  ifTags?: string;
}

/** Optional parameters. */
export interface BlobRenewLeaseOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** Specify this value to operate only on a blob if it has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** Specify this value to operate only on a blob if it has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** Specify this value to operate only on a blob with a non-matching Etag value. */
  ifNoneMatch?: string;
  /** Specify this value to operate only on a blob with a matching Etag value. */
  ifMatch?: string;
  /** Specifies a SQL-like where clause on blob tags to operate only on a blob with matching tags. */
  ifTags?: string;
}

/** Optional parameters. */
export interface BlobReleaseLeaseOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** Specify this value to operate only on a blob if it has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** Specify this value to operate only on a blob if it has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** Specify this value to operate only on a blob with a non-matching Etag value. */
  ifNoneMatch?: string;
  /** Specify this value to operate only on a blob with a matching Etag value. */
  ifMatch?: string;
  /** Specifies a SQL-like where clause on blob tags to operate only on a blob with matching tags. */
  ifTags?: string;
}

/** Optional parameters. */
export interface BlobAcquireLeaseOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** The proposed lease ID for the lease. */
  proposedLeaseId?: string;
  /** Specify this value to operate only on a blob if it has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** Specify this value to operate only on a blob if it has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** Specify this value to operate only on a blob with a non-matching Etag value. */
  ifNoneMatch?: string;
  /** Specify this value to operate only on a blob with a matching Etag value. */
  ifMatch?: string;
  /** Specifies a SQL-like where clause on blob tags to operate only on a blob with matching tags. */
  ifTags?: string;
}

/** Optional parameters. */
export interface BlobSetMetadataOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** The metadata headers. */
  metadata?: Record<string, string>;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** Specifies the encryption key to use to encrypt the data provided in the request. */
  encryptionKey?: string;
  /** The SHA-256 hash of the provided encryption key. Must be provided if the encryption key is provided. */
  encryptionKeySha256?: string;
  /** The algorithm used to produce the encryption key hash. Must be provided if the encryption key is provided. */
  encryptionAlgorithm?: EncryptionAlgorithmType;
  /** Specifies the encryption scope used to encrypt the data. */
  encryptionScope?: string;
  /** Specify this value to operate only on a blob if it has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** Specify this value to operate only on a blob if it has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** Specify this value to operate only on a blob with a non-matching Etag value. */
  ifNoneMatch?: string;
  /** Specify this value to operate only on a blob with a matching Etag value. */
  ifMatch?: string;
  /** Specifies a SQL-like where clause on blob tags to operate only on a blob with matching tags. */
  ifTags?: string;
}

/** Optional parameters. */
export interface BlobSetLegalHoldOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** Specifies the snapshot of the blob. */
  snapshot?: string;
  /** Specifies the version ID of the blob. */
  versionId?: string;
}

/** Optional parameters. */
export interface BlobDeleteImmutabilityPolicyOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** Specifies the snapshot of the blob. */
  snapshot?: string;
  /** Specifies the version ID of the blob. */
  versionId?: string;
}

/** Optional parameters. */
export interface BlobSetImmutabilityPolicyOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** Specify this value to operate only on a blob if it has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** Specifies the date time when the blobs immutability policy is set to expire. */
  immutabilityPolicyExpiry?: Date;
  /** Indicates the immutability policy mode of the blob. */
  immutabilityPolicyMode?: ImmutabilityPolicyMode;
  /** Specifies the snapshot of the blob. */
  snapshot?: string;
  /** Specifies the version ID of the blob. */
  versionId?: string;
}

/** Optional parameters. */
export interface BlobSetPropertiesOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** Specifies the blob's Cache-Control. If specified, this property is stored with the blob and returned with a read request. */
  blobCacheControl?: string;
  /** Specifies the blob's Content-Type. If specified, this property is stored with the blob and returned with a read request. */
  blobContentType?: string;
  /** The MD5 hash of the blob content that is stored as a property on the blob. Note: This hash is not validated. */
  blobContentMD5?: Uint8Array;
  /** Specifies the blob's Content-Encoding. If specified, this property is stored with the blob and returned with a read request. */
  blobContentEncoding?: string;
  /** Specifies the blob's Content-Language. If specified, this property is stored with the blob and returned with a read request. */
  blobContentLanguage?: string;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** Specifies the blob's Content-Disposition. If specified, this property is stored with the blob and returned with a read request. */
  blobContentDisposition?: string;
  /** Specify this value to operate only on a blob if it has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** Specify this value to operate only on a blob if it has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** Specify this value to operate only on a blob with a non-matching Etag value. */
  ifNoneMatch?: string;
  /** Specify this value to operate only on a blob with a matching Etag value. */
  ifMatch?: string;
  /** Specifies a SQL-like where clause on blob tags to operate only on a blob with matching tags. */
  ifTags?: string;
}

/** Optional parameters. */
export interface BlobSetExpiryOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** The date-time this blob will expire. */
  expiresOn?: Date;
}

/** Optional parameters. */
export interface BlobUndeleteOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
}

/** Optional parameters. */
export interface BlobDeleteOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** Specifies the snapshot of the blob. */
  snapshot?: string;
  /** Specifies the version ID of the blob. */
  versionId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** Required if the blob has associated snapshots. Specifies the delete behavior. */
  deleteSnapshots?: DeleteSnapshotsOptionType;
  /** Specify this value to operate only on a blob if it has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** Specify this value to operate only on a blob if it has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** Specify this value to operate only on a blob with a non-matching Etag value. */
  ifNoneMatch?: string;
  /** Specify this value to operate only on a blob with a matching Etag value. */
  ifMatch?: string;
  /** Specifies a SQL-like where clause on blob tags to operate only on a blob with matching tags. */
  ifTags?: string;
  /** The delete type. */
  blobDeleteType?: BlobDeleteType;
  /** Specify this header value to operate only on a blob if the access-tier has been modified since the specified date-time. */
  accessTierIfModifiedSince?: Date;
  /** Specify this header value to operate only on a blob if the access-tier has not been modified since the specified date-time. */
  accessTierIfUnmodifiedSince?: Date;
}

/** Optional parameters. */
export interface BlobGetPropertiesOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** Specifies the snapshot of the blob. */
  snapshot?: string;
  /** Specifies the version ID of the blob. */
  versionId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** Specifies the encryption key to use to encrypt the data provided in the request. */
  encryptionKey?: string;
  /** The SHA-256 hash of the provided encryption key. Must be provided if the encryption key is provided. */
  encryptionKeySha256?: string;
  /** The algorithm used to produce the encryption key hash. Must be provided if the encryption key is provided. */
  encryptionAlgorithm?: EncryptionAlgorithmType;
  /** Specify this value to operate only on a blob if it has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** Specify this value to operate only on a blob if it has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** Specify this value to operate only on a blob with a non-matching Etag value. */
  ifNoneMatch?: string;
  /** Specify this value to operate only on a blob with a matching Etag value. */
  ifMatch?: string;
  /** Specifies a SQL-like where clause on blob tags to operate only on a blob with matching tags. */
  ifTags?: string;
}

/** Optional parameters. */
export interface BlobDownloadOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** Specifies the snapshot of the blob. */
  snapshot?: string;
  /** Specifies the version ID of the blob. */
  versionId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** Specifies the range of the blob to operate on. */
  range?: string;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** When set to true and specified together with the `Range` header, the service returns the MD5 hash for the range, as long as the range is less than or equal to 4 MiB in size. */
  rangeGetContentMD5?: boolean;
  /** When set to true and the request includes a Range header, the service returns the CRC64 hash for the range, as long as the range is less than or equal to 4 MiB in size. */
  rangeGetContentCrc64?: boolean;
  /** Specifies the response content should be returned as a structured message and specifies the message schema version and properties. */
  structuredBodyType?: string;
  /** Specifies the encryption key to use to encrypt the data provided in the request. */
  encryptionKey?: string;
  /** The SHA-256 hash of the provided encryption key. Must be provided if the encryption key is provided. */
  encryptionKeySha256?: string;
  /** The algorithm used to produce the encryption key hash. Must be provided if the encryption key is provided. */
  encryptionAlgorithm?: EncryptionAlgorithmType;
  /** Specifies a SQL-like where clause on blob tags to operate only on a blob with matching tags. */
  ifTags?: string;
  /** Specify this value to operate only on a blob if it has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** Specify this value to operate only on a blob if it has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** Specify this value to operate only on a blob with a non-matching Etag value. */
  ifNoneMatch?: string;
  /** Specify this value to operate only on a blob with a matching Etag value. */
  ifMatch?: string;
}
