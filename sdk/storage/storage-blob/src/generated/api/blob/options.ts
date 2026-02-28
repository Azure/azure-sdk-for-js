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
} from "../../models/azure/storage/blobs/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BlobSetTagsOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** The version id parameter is an opaque DateTime value that, when present, specifies the version of the blob to operate on. It's for service version 2019-10-10 and newer. */
  versionId?: string;
  /** Optional. An MD5 hash of the blob content. Note that this hash is not validated, as the hashes for the individual blocks were validated when each was uploaded. */
  transactionalContentMD5?: Uint8Array;
  /** Specify the transactional crc64 for the body, to be validated by the service. */
  transactionalContentCrc64?: Uint8Array;
  /** Specify a SQL where clause on blob tags to operate only on blobs with a matching value. */
  ifTags?: string;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** Specify this header value to operate only on a blob if it has been modified since the specified date/time. */
  ifModifiedSince?: Date;
  /** Specify this header value to operate only on a blob if it has not been modified since the specified date/time. */
  ifUnmodifiedSince?: Date;
  /** Specify an ETag value to operate only on blobs with a matching value. */
  ifMatch?: string;
  /** Specify an ETag value to operate only on blobs without a matching value. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface BlobGetTagsOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** The snapshot parameter is an opaque DateTime value that, when present, specifies the blob snapshot to retrieve. For more information on working with blob snapshots, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/creating-a-snapshot-of-a-blob">Creating a Snapshot of a Blob.</a> */
  snapshot?: string;
  /** The version id parameter is an opaque DateTime value that, when present, specifies the version of the blob to operate on. It's for service version 2019-10-10 and newer. */
  versionId?: string;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** Specify a SQL where clause on blob tags to operate only on blobs with a matching value. */
  ifTags?: string;
  /** Specify this header value to operate only on a blob if it has been modified since the specified date/time. */
  ifModifiedSince?: Date;
  /** Specify this header value to operate only on a blob if it has not been modified since the specified date/time. */
  ifUnmodifiedSince?: Date;
  /** Specify an ETag value to operate only on blobs with a matching value. */
  ifMatch?: string;
  /** Specify an ETag value to operate only on blobs without a matching value. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface BlobGetAccountInfoOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
}

/** Optional parameters. */
export interface BlobSetTierOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The snapshot parameter is an opaque DateTime value that, when present, specifies the blob snapshot to retrieve. For more information on working with blob snapshots, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/creating-a-snapshot-of-a-blob">Creating a Snapshot of a Blob.</a> */
  snapshot?: string;
  /** The version id parameter is an opaque DateTime value that, when present, specifies the version of the blob to operate on. It's for service version 2019-10-10 and newer. */
  versionId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** If an object is in rehydrate pending state then this header is returned with priority of rehydrate. Valid values are High and Standard. */
  rehydratePriority?: RehydratePriority;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** Specify a SQL where clause on blob tags to operate only on blobs with a matching value. */
  ifTags?: string;
}

/** Optional parameters. */
export interface BlobAbortCopyFromUrlOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
}

/** Optional parameters. */
export interface BlobCopyFromUrlOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** The metadata headers. */
  metadata?: Record<string, string>;
  /** The tier to be set on the blob. */
  tier?: AccessTier;
  /** Specify this header value to operate only on a blob if it has been modified since the specified date/time. */
  sourceIfModifiedSince?: Date;
  /** Specify this header value to operate only on a blob if it has not been modified since the specified date/time. */
  sourceIfUnmodifiedSince?: Date;
  /** Specify an ETag value to operate only on blobs with a matching value. */
  sourceIfMatch?: string;
  /** Specify this header value to operate only on a blob if it has been modified since the specified date/time. */
  sourceIfNoneMatch?: string;
  /** A date-time value. A request is made under the condition that the resource has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** A date-time value. A request is made under the condition that the resource has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** A condition that must be met in order for the request to be processed. */
  ifNoneMatch?: string;
  /** A condition that must be met in order for the request to be processed. */
  ifMatch?: string;
  /** Specify a SQL where clause on blob tags to operate only on blobs with a matching value. */
  ifTags?: string;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** Specify the md5 calculated for the range of bytes that must be read from the copy source. */
  sourceContentMD5?: Uint8Array;
  /** Optional.  Used to set blob tags in various blob operations. */
  blobTagsString?: string;
  /** Specifies the date time when the blobs immutability policy is set to expire. */
  immutabilityPolicyExpiry?: Date;
  /** Specifies the immutability policy mode to set on the blob. */
  immutabilityPolicyMode?: ImmutabilityPolicyMode;
  /** Specified if a legal hold should be set on the blob. */
  legalHold?: boolean;
  /** Only Bearer type is supported. Credentials should be a valid OAuth access token to copy source. */
  copySourceAuthorization?: string;
  /** Optional.  Version 2019-07-07 and later.  Specifies the encryption scope to use to encrypt the data provided in the request. If not specified, the request will be encrypted with the root account key. */
  encryptionScope?: string;
  /** Optional, default 'replace'.  Indicates if source tags should be copied or replaced with the tags specified by x-ms-tags. */
  copySourceTags?: BlobCopySourceTags;
  /** Valid value is backup */
  fileRequestIntent?: FileShareTokenIntent;
}

/** Optional parameters. */
export interface BlobStartCopyFromUrlOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** The metadata headers. */
  metadata?: Record<string, string>;
  /** The tier to be set on the blob. */
  tier?: AccessTier;
  /** If an object is in rehydrate pending state then this header is returned with priority of rehydrate. Valid values are High and Standard. */
  rehydratePriority?: RehydratePriority;
  /** Specify this header value to operate only on a blob if it has been modified since the specified date/time. */
  sourceIfModifiedSince?: Date;
  /** Specify this header value to operate only on a blob if it has not been modified since the specified date/time. */
  sourceIfUnmodifiedSince?: Date;
  /** Specify an ETag value to operate only on blobs with a matching value. */
  sourceIfMatch?: string;
  /** Specify this header value to operate only on a blob if it has been modified since the specified date/time. */
  sourceIfNoneMatch?: string;
  /** Specify a SQL where clause on blob tags to operate only on blobs with a matching value. */
  sourceIfTags?: string;
  /** A date-time value. A request is made under the condition that the resource has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** A date-time value. A request is made under the condition that the resource has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** A condition that must be met in order for the request to be processed. */
  ifNoneMatch?: string;
  /** A condition that must be met in order for the request to be processed. */
  ifMatch?: string;
  /** Specify a SQL where clause on blob tags to operate only on blobs with a matching value. */
  ifTags?: string;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** Optional.  Used to set blob tags in various blob operations. */
  blobTagsString?: string;
  /** Overrides the sealed state of the destination blob.  Service version 2019-12-12 and newer. */
  sealBlob?: boolean;
  /** Specifies the date time when the blobs immutability policy is set to expire. */
  immutabilityPolicyExpiry?: Date;
  /** Specifies the immutability policy mode to set on the blob. */
  immutabilityPolicyMode?: ImmutabilityPolicyMode;
  /** Specified if a legal hold should be set on the blob. */
  legalHold?: boolean;
}

/** Optional parameters. */
export interface BlobCreateSnapshotOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** The metadata headers. */
  metadata?: Record<string, string>;
  /** Optional.  Version 2019-07-07 and later.  Specifies the encryption key to use to encrypt the data provided in the request. If not specified, the request will be encrypted with the root account key. */
  encryptionKey?: string;
  /** Optional.  Version 2019-07-07 and later.  Specifies the SHA256 hash of the encryption key used to encrypt the data provided in the request. This header is only used for encryption with a customer-provided key. If the request is authenticated with a client token, this header should be specified using the SHA256 hash of the encryption key. */
  encryptionKeySha256?: string;
  /** Optional.  Version 2019-07-07 and later.  Specifies the algorithm to use for encryption. If not specified, the default is AES256. */
  encryptionAlgorithm?: EncryptionAlgorithmType;
  /** Optional.  Version 2019-07-07 and later.  Specifies the encryption scope to use to encrypt the data provided in the request. If not specified, the request will be encrypted with the root account key. */
  encryptionScope?: string;
  /** A date-time value. A request is made under the condition that the resource has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** A date-time value. A request is made under the condition that the resource has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** A condition that must be met in order for the request to be processed. */
  ifNoneMatch?: string;
  /** A condition that must be met in order for the request to be processed. */
  ifMatch?: string;
  /** Specify a SQL where clause on blob tags to operate only on blobs with a matching value. */
  ifTags?: string;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
}

/** Optional parameters. */
export interface BlobBreakLeaseOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** For a break operation, proposed duration the lease should continue before it is broken, in seconds, between 0 and 60. This break period is only used if it is shorter than the time remaining on the lease. If longer, the time remaining on the lease is used. A new lease will not be available before the break period has expired, but the lease may be held for longer than the break period. If this header does not appear with a break operation, a fixed-duration lease breaks after the remaining lease period elapses, and an infinite lease breaks immediately. */
  breakPeriod?: number;
  /** A date-time value. A request is made under the condition that the resource has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** A date-time value. A request is made under the condition that the resource has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** A condition that must be met in order for the request to be processed. */
  ifNoneMatch?: string;
  /** A condition that must be met in order for the request to be processed. */
  ifMatch?: string;
  /** Specify a SQL where clause on blob tags to operate only on blobs with a matching value. */
  ifTags?: string;
}

/** Optional parameters. */
export interface BlobChangeLeaseOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** A date-time value. A request is made under the condition that the resource has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** A date-time value. A request is made under the condition that the resource has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** A condition that must be met in order for the request to be processed. */
  ifNoneMatch?: string;
  /** A condition that must be met in order for the request to be processed. */
  ifMatch?: string;
  /** Specify a SQL where clause on blob tags to operate only on blobs with a matching value. */
  ifTags?: string;
}

/** Optional parameters. */
export interface BlobRenewLeaseOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** A date-time value. A request is made under the condition that the resource has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** A date-time value. A request is made under the condition that the resource has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** A condition that must be met in order for the request to be processed. */
  ifNoneMatch?: string;
  /** A condition that must be met in order for the request to be processed. */
  ifMatch?: string;
  /** Specify a SQL where clause on blob tags to operate only on blobs with a matching value. */
  ifTags?: string;
}

/** Optional parameters. */
export interface BlobReleaseLeaseOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** A date-time value. A request is made under the condition that the resource has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** A date-time value. A request is made under the condition that the resource has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** A condition that must be met in order for the request to be processed. */
  ifNoneMatch?: string;
  /** A condition that must be met in order for the request to be processed. */
  ifMatch?: string;
  /** Specify a SQL where clause on blob tags to operate only on blobs with a matching value. */
  ifTags?: string;
}

/** Optional parameters. */
export interface BlobAcquireLeaseOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** Optional.  The proposed lease ID for the container. */
  proposedLeaseId?: string;
  /** A date-time value. A request is made under the condition that the resource has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** A date-time value. A request is made under the condition that the resource has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** A condition that must be met in order for the request to be processed. */
  ifNoneMatch?: string;
  /** A condition that must be met in order for the request to be processed. */
  ifMatch?: string;
  /** Specify a SQL where clause on blob tags to operate only on blobs with a matching value. */
  ifTags?: string;
}

/** Optional parameters. */
export interface BlobSetMetadataOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** The metadata headers. */
  metadata?: Record<string, string>;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** Optional.  Version 2019-07-07 and later.  Specifies the encryption key to use to encrypt the data provided in the request. If not specified, the request will be encrypted with the root account key. */
  encryptionKey?: string;
  /** Optional.  Version 2019-07-07 and later.  Specifies the SHA256 hash of the encryption key used to encrypt the data provided in the request. This header is only used for encryption with a customer-provided key. If the request is authenticated with a client token, this header should be specified using the SHA256 hash of the encryption key. */
  encryptionKeySha256?: string;
  /** Optional.  Version 2019-07-07 and later.  Specifies the algorithm to use for encryption. If not specified, the default is AES256. */
  encryptionAlgorithm?: EncryptionAlgorithmType;
  /** Optional.  Version 2019-07-07 and later.  Specifies the encryption scope to use to encrypt the data provided in the request. If not specified, the request will be encrypted with the root account key. */
  encryptionScope?: string;
  /** A date-time value. A request is made under the condition that the resource has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** A date-time value. A request is made under the condition that the resource has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** A condition that must be met in order for the request to be processed. */
  ifNoneMatch?: string;
  /** A condition that must be met in order for the request to be processed. */
  ifMatch?: string;
  /** Specify a SQL where clause on blob tags to operate only on blobs with a matching value. */
  ifTags?: string;
}

/** Optional parameters. */
export interface BlobSetLegalHoldOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** The snapshot parameter is an opaque DateTime value that, when present, specifies the blob snapshot to retrieve. For more information on working with blob snapshots, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/creating-a-snapshot-of-a-blob">Creating a Snapshot of a Blob.</a> */
  snapshot?: string;
  /** The version id parameter is an opaque DateTime value that, when present, specifies the version of the blob to operate on. It's for service version 2019-10-10 and newer. */
  versionId?: string;
}

/** Optional parameters. */
export interface BlobDeleteImmutabilityPolicyOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** The snapshot parameter is an opaque DateTime value that, when present, specifies the blob snapshot to retrieve. For more information on working with blob snapshots, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/creating-a-snapshot-of-a-blob">Creating a Snapshot of a Blob.</a> */
  snapshot?: string;
  /** The version id parameter is an opaque DateTime value that, when present, specifies the version of the blob to operate on. It's for service version 2019-10-10 and newer. */
  versionId?: string;
}

/** Optional parameters. */
export interface BlobSetImmutabilityPolicyOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** A date-time value. A request is made under the condition that the resource has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** Specifies the immutability policy mode to set on the blob. */
  immutabilityPolicyMode?: ImmutabilityPolicyMode;
  /** The snapshot parameter is an opaque DateTime value that, when present, specifies the blob snapshot to retrieve. For more information on working with blob snapshots, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/creating-a-snapshot-of-a-blob">Creating a Snapshot of a Blob.</a> */
  snapshot?: string;
  /** The version id parameter is an opaque DateTime value that, when present, specifies the version of the blob to operate on. It's for service version 2019-10-10 and newer. */
  versionId?: string;
}

/** Optional parameters. */
export interface BlobSetPropertiesOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** Optional. Sets the blob's cache control. If specified, this property is stored with the blob and returned with a read request. */
  blobCacheControl?: string;
  /** Optional. Sets the blob's content type. If specified, this property is stored with the blob and returned with a read request. */
  blobContentType?: string;
  /** Optional. An MD5 hash of the blob content. Note that this hash is not validated, as the hashes for the individual blocks were validated when each was uploaded. */
  blobContentMD5?: Uint8Array;
  /** Optional. Sets the blob's content encoding. If specified, this property is stored with the blob and returned with a read request. */
  blobContentEncoding?: string;
  /** Optional. Set the blob's content language. If specified, this property is stored with the blob and returned with a read request. */
  blobContentLanguage?: string;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** Optional. Sets the blob's content disposition. If specified, this property is stored with the blob and returned with a read request. */
  blobContentDisposition?: string;
  /** A date-time value. A request is made under the condition that the resource has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** A date-time value. A request is made under the condition that the resource has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** A condition that must be met in order for the request to be processed. */
  ifNoneMatch?: string;
  /** A condition that must be met in order for the request to be processed. */
  ifMatch?: string;
  /** Specify a SQL where clause on blob tags to operate only on blobs with a matching value. */
  ifTags?: string;
}

/** Optional parameters. */
export interface BlobSetExpiryOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** The time this blob will expire. */
  expiresOn?: Date;
}

/** Optional parameters. */
export interface BlobUndeleteOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
}

/** Optional parameters. */
export interface BlobDeleteOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The snapshot parameter is an opaque DateTime value that, when present, specifies the blob snapshot to retrieve. For more information on working with blob snapshots, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/creating-a-snapshot-of-a-blob">Creating a Snapshot of a Blob.</a> */
  snapshot?: string;
  /** The version id parameter is an opaque DateTime value that, when present, specifies the version of the blob to operate on. It's for service version 2019-10-10 and newer. */
  versionId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** Required if the blob has associated snapshots. Specify one of the following two options: include: Delete the base blob and all of its snapshots. only: Delete only the blob's snapshots and not the blob itself */
  deleteSnapshots?: DeleteSnapshotsOptionType;
  /** A date-time value. A request is made under the condition that the resource has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** A date-time value. A request is made under the condition that the resource has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** A condition that must be met in order for the request to be processed. */
  ifNoneMatch?: string;
  /** A condition that must be met in order for the request to be processed. */
  ifMatch?: string;
  /** Specify a SQL where clause on blob tags to operate only on blobs with a matching value. */
  ifTags?: string;
  /** Optional.  Only possible value is 'permanent', which specifies to permanently delete a blob if blob soft delete is enabled. */
  blobDeleteType?: BlobDeleteType;
  /** Specify this header value to operate only on a blob if the access-tier has been modified since the specified date/time. */
  accessTierIfModifiedSince?: Date;
  /** Specify this header value to operate only on a blob if the access-tier has not been modified since the specified date/time. */
  accessTierIfUnmodifiedSince?: Date;
}

/** Optional parameters. */
export interface BlobGetPropertiesOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The snapshot parameter is an opaque DateTime value that, when present, specifies the blob snapshot to retrieve. For more information on working with blob snapshots, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/creating-a-snapshot-of-a-blob">Creating a Snapshot of a Blob.</a> */
  snapshot?: string;
  /** The version id parameter is an opaque DateTime value that, when present, specifies the version of the blob to operate on. It's for service version 2019-10-10 and newer. */
  versionId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** Optional.  Version 2019-07-07 and later.  Specifies the encryption key to use to encrypt the data provided in the request. If not specified, the request will be encrypted with the root account key. */
  encryptionKey?: string;
  /** Optional.  Version 2019-07-07 and later.  Specifies the SHA256 hash of the encryption key used to encrypt the data provided in the request. This header is only used for encryption with a customer-provided key. If the request is authenticated with a client token, this header should be specified using the SHA256 hash of the encryption key. */
  encryptionKeySha256?: string;
  /** Optional.  Version 2019-07-07 and later.  Specifies the algorithm to use for encryption. If not specified, the default is AES256. */
  encryptionAlgorithm?: EncryptionAlgorithmType;
  /** A date-time value. A request is made under the condition that the resource has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** A date-time value. A request is made under the condition that the resource has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** A condition that must be met in order for the request to be processed. */
  ifNoneMatch?: string;
  /** A condition that must be met in order for the request to be processed. */
  ifMatch?: string;
  /** Specify a SQL where clause on blob tags to operate only on blobs with a matching value. */
  ifTags?: string;
}

/** Optional parameters. */
export interface BlobDownloadOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The snapshot parameter is an opaque DateTime value that, when present, specifies the blob snapshot to retrieve. For more information on working with blob snapshots, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/creating-a-snapshot-of-a-blob">Creating a Snapshot of a Blob.</a> */
  snapshot?: string;
  /** The version id parameter is an opaque DateTime value that, when present, specifies the version of the blob to operate on. It's for service version 2019-10-10 and newer. */
  versionId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** Return only the bytes of the blob in the specified range. */
  range?: string;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** When set to true and specified together with the Range, the service returns the MD5 hash for the range, as long as the range is less than or equal to 4 MB in size. */
  rangeGetContentMD5?: boolean;
  /** Optional.  When this header is set to true and specified together with the Range header, the service returns the CRC64 hash for the range, as long as the range is less than or equal to 4 MB in size. */
  rangeGetContentCrc64?: boolean;
  /** Specifies the response content should be returned as a structured message and specifies the message schema version and properties. */
  structuredBodyType?: string;
  /** Optional.  Version 2019-07-07 and later.  Specifies the encryption key to use to encrypt the data provided in the request. If not specified, the request will be encrypted with the root account key. */
  encryptionKey?: string;
  /** Optional.  Version 2019-07-07 and later.  Specifies the SHA256 hash of the encryption key used to encrypt the data provided in the request. This header is only used for encryption with a customer-provided key. If the request is authenticated with a client token, this header should be specified using the SHA256 hash of the encryption key. */
  encryptionKeySha256?: string;
  /** Optional.  Version 2019-07-07 and later.  Specifies the algorithm to use for encryption. If not specified, the default is AES256. */
  encryptionAlgorithm?: EncryptionAlgorithmType;
  /** Specify a SQL where clause on blob tags to operate only on blobs with a matching value. */
  ifTags?: string;
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
  /** The request should only proceed if no entity matches this string. */
  ifNoneMatch?: string;
  /** The request should only proceed if the entity was not modified after this time. */
  ifUnmodifiedSince?: Date;
  /** The request should only proceed if the entity was modified after this time. */
  ifModifiedSince?: Date;
}
