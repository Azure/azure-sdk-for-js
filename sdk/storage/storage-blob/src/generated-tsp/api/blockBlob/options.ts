// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AccessTier,
  ImmutabilityPolicyMode,
  EncryptionAlgorithmType,
  BlobCopySourceTags,
  FileShareTokenIntent,
} from "../../models/azure/storage/blobs/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BlockBlobQueryOptionalParams extends OperationOptions {
  /** The snapshot parameter is an opaque DateTime value that, when present, specifies the blob snapshot to retrieve. For more information on working with blob snapshots, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/creating-a-snapshot-of-a-blob">Creating a Snapshot of a Blob.</a> */
  snapshot?: string;
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
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface BlockBlobGetBlockListOptionalParams extends OperationOptions {
  /** The snapshot parameter is an opaque DateTime value that, when present, specifies the blob snapshot to retrieve. For more information on working with blob snapshots, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/creating-a-snapshot-of-a-blob">Creating a Snapshot of a Blob.</a> */
  snapshot?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** Specify a SQL where clause on blob tags to operate only on blobs with a matching value. */
  ifTags?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface BlockBlobCommitBlockListOptionalParams extends OperationOptions {
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** Optional. Sets the blob's cache control. If specified, this property is stored with the blob and returned with a read request. */
  blobCacheControl?: string;
  /** Optional. Sets the blob's content type. If specified, this property is stored with the blob and returned with a read request. */
  blobContentType?: string;
  /** Optional. Sets the blob's content encoding. If specified, this property is stored with the blob and returned with a read request. */
  blobContentEncoding?: string;
  /** Optional. Set the blob's content language. If specified, this property is stored with the blob and returned with a read request. */
  blobContentLanguage?: string;
  /** Optional. An MD5 hash of the blob content. Note that this hash is not validated, as the hashes for the individual blocks were validated when each was uploaded. */
  blobContentMd5?: Uint8Array;
  /** Optional. An MD5 hash of the blob content. Note that this hash is not validated, as the hashes for the individual blocks were validated when each was uploaded. */
  transactionalContentMD5?: Uint8Array;
  /** Specify the transactional crc64 for the body, to be validated by the service. */
  transactionalContentCrc64?: Uint8Array;
  /** The metadata headers. */
  metadata?: Record<string, string>;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** Optional. Sets the blob's content disposition. If specified, this property is stored with the blob and returned with a read request. */
  blobContentDisposition?: string;
  /** Optional.  Version 2019-07-07 and later.  Specifies the encryption key to use to encrypt the data provided in the request. If not specified, the request will be encrypted with the root account key. */
  encryptionKey?: string;
  /** Optional.  Version 2019-07-07 and later.  Specifies the SHA256 hash of the encryption key used to encrypt the data provided in the request. This header is only used for encryption with a customer-provided key. If the request is authenticated with a client token, this header should be specified using the SHA256 hash of the encryption key. */
  encryptionKeySha256?: string;
  /** Optional.  Version 2019-07-07 and later.  Specifies the algorithm to use for encryption. If not specified, the default is AES256. */
  encryptionAlgorithm?: EncryptionAlgorithmType;
  /** Optional.  Version 2019-07-07 and later.  Specifies the encryption scope to use to encrypt the data provided in the request. If not specified, the request will be encrypted with the root account key. */
  encryptionScope?: string;
  /** The tier to be set on the blob. */
  tier?: AccessTier;
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
  /** Optional.  Used to set blob tags in various blob operations. */
  blobTagsString?: string;
  /** Specifies the date time when the blobs immutability policy is set to expire. */
  immutabilityPolicyExpiry?: Date;
  /** Specifies the immutability policy mode to set on the blob. */
  immutabilityPolicyMode?: ImmutabilityPolicyMode;
  /** Specified if a legal hold should be set on the blob. */
  legalHold?: boolean;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface BlockBlobStageBlockFromUrlOptionalParams extends OperationOptions {
  /** Bytes of source data in the specified range. */
  sourceRange?: string;
  /** Specify the md5 calculated for the range of bytes that must be read from the copy source. */
  sourceContentMd5?: Uint8Array;
  /** Specify the crc64 calculated for the range of bytes that must be read from the copy source. */
  sourceContentCrc64?: Uint8Array;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** Optional.  Version 2019-07-07 and later.  Specifies the encryption key to use to encrypt the data provided in the request. If not specified, the request will be encrypted with the root account key. */
  encryptionKey?: string;
  /** Optional.  Version 2019-07-07 and later.  Specifies the SHA256 hash of the encryption key used to encrypt the data provided in the request. This header is only used for encryption with a customer-provided key. If the request is authenticated with a client token, this header should be specified using the SHA256 hash of the encryption key. */
  encryptionKeySha256?: string;
  /** Optional.  Version 2019-07-07 and later.  Specifies the algorithm to use for encryption. If not specified, the default is AES256. */
  encryptionAlgorithm?: EncryptionAlgorithmType;
  /** Optional.  Version 2019-07-07 and later.  Specifies the encryption scope to use to encrypt the data provided in the request. If not specified, the request will be encrypted with the root account key. */
  encryptionScope?: string;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** Specify this header value to operate only on a blob if it has been modified since the specified date/time. */
  sourceIfModifiedSince?: Date;
  /** Specify this header value to operate only on a blob if it has not been modified since the specified date/time. */
  sourceIfUnmodifiedSince?: Date;
  /** Specify an ETag value to operate only on blobs with a matching value. */
  sourceIfMatch?: string;
  /** Specify this header value to operate only on a blob if it has been modified since the specified date/time. */
  sourceIfNoneMatch?: string;
  /** Only Bearer type is supported. Credentials should be a valid OAuth access token to copy source. */
  copySourceAuthorization?: string;
  /** Valid value is backup */
  fileRequestIntent?: FileShareTokenIntent;
  /** Optional. Specifies the source encryption key to use to encrypt the source data provided in the request. */
  sourceEncryptionKey?: string;
  /** The SHA-256 hash of the provided source encryption key. Must be provided if the x-ms-source-encryption-key header is provided. */
  sourceEncryptionKeySha256?: string;
  /** The algorithm used to produce the source encryption key hash. Currently, the only accepted value is "AES256". Must be provided if the x-ms-source-encryption-key is provided. */
  sourceEncryptionAlgorithm?: EncryptionAlgorithmType;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface BlockBlobStageBlockOptionalParams extends OperationOptions {
  /** Optional. An MD5 hash of the blob content. Note that this hash is not validated, as the hashes for the individual blocks were validated when each was uploaded. */
  transactionalContentMD5?: Uint8Array;
  /** Specify the transactional crc64 for the body, to be validated by the service. */
  transactionalContentCrc64?: Uint8Array;
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
  /** Optional.  Version 2019-07-07 and later.  Specifies the encryption scope to use to encrypt the data provided in the request. If not specified, the request will be encrypted with the root account key. */
  encryptionScope?: string;
  /** Required if the request body is a structured message. Specifies the message schema version and properties. */
  structuredBodyType?: string;
  /** Required if the request body is a structured message. Specifies the length of the blob/file content inside the message body. Will always be smaller than Content-Length. */
  structuredContentLength?: number;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface BlockBlobUploadBlobFromUrlOptionalParams extends OperationOptions {
  /** The metadata headers. */
  metadata?: Record<string, string>;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** Optional. An MD5 hash of the blob content. Note that this hash is not validated, as the hashes for the individual blocks were validated when each was uploaded. */
  transactionalContentMD5?: Uint8Array;
  /** Optional. Sets the blob's content type. If specified, this property is stored with the blob and returned with a read request. */
  blobContentType?: string;
  /** Optional. Sets the blob's content encoding. If specified, this property is stored with the blob and returned with a read request. */
  blobContentEncoding?: string;
  /** Optional. Set the blob's content language. If specified, this property is stored with the blob and returned with a read request. */
  blobContentLanguage?: string;
  /** Optional. An MD5 hash of the blob content. Note that this hash is not validated, as the hashes for the individual blocks were validated when each was uploaded. */
  blobContentMd5?: Uint8Array;
  /** Optional. Sets the blob's cache control. If specified, this property is stored with the blob and returned with a read request. */
  blobCacheControl?: string;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** Optional. Sets the blob's content disposition. If specified, this property is stored with the blob and returned with a read request. */
  blobContentDisposition?: string;
  /** Optional.  Version 2019-07-07 and later.  Specifies the encryption key to use to encrypt the data provided in the request. If not specified, the request will be encrypted with the root account key. */
  encryptionKey?: string;
  /** Optional.  Version 2019-07-07 and later.  Specifies the SHA256 hash of the encryption key used to encrypt the data provided in the request. This header is only used for encryption with a customer-provided key. If the request is authenticated with a client token, this header should be specified using the SHA256 hash of the encryption key. */
  encryptionKeySha256?: string;
  /** Optional.  Version 2019-07-07 and later.  Specifies the algorithm to use for encryption. If not specified, the default is AES256. */
  encryptionAlgorithm?: EncryptionAlgorithmType;
  /** Optional.  Version 2019-07-07 and later.  Specifies the encryption scope to use to encrypt the data provided in the request. If not specified, the request will be encrypted with the root account key. */
  encryptionScope?: string;
  /** The tier to be set on the blob. */
  tier?: AccessTier;
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
  /** Specify the md5 calculated for the range of bytes that must be read from the copy source. */
  sourceContentMd5?: Uint8Array;
  /** Optional.  Used to set blob tags in various blob operations. */
  blobTagsString?: string;
  /** Optional, default is true.  Indicates if properties from the source blob should be copied. */
  copySourceBlobProperties?: boolean;
  /** Only Bearer type is supported. Credentials should be a valid OAuth access token to copy source. */
  copySourceAuthorization?: string;
  /** Optional, default 'replace'.  Indicates if source tags should be copied or replaced with the tags specified by x-ms-tags. */
  copySourceTags?: BlobCopySourceTags;
  /** Valid value is backup */
  fileRequestIntent?: FileShareTokenIntent;
  /** Optional. Specifies the source encryption key to use to encrypt the source data provided in the request. */
  sourceEncryptionKey?: string;
  /** The SHA-256 hash of the provided source encryption key. Must be provided if the x-ms-source-encryption-key header is provided. */
  sourceEncryptionKeySha256?: string;
  /** The algorithm used to produce the source encryption key hash. Currently, the only accepted value is "AES256". Must be provided if the x-ms-source-encryption-key is provided. */
  sourceEncryptionAlgorithm?: EncryptionAlgorithmType;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface BlockBlobUploadOptionalParams extends OperationOptions {
  /** The metadata headers. */
  metadata?: Record<string, string>;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** Optional. An MD5 hash of the blob content. Note that this hash is not validated, as the hashes for the individual blocks were validated when each was uploaded. */
  transactionalContentMD5?: Uint8Array;
  /** Optional. Sets the blob's content type. If specified, this property is stored with the blob and returned with a read request. */
  blobContentType?: string;
  /** Optional. Sets the blob's content encoding. If specified, this property is stored with the blob and returned with a read request. */
  blobContentEncoding?: string;
  /** Optional. Set the blob's content language. If specified, this property is stored with the blob and returned with a read request. */
  blobContentLanguage?: string;
  /** Optional. An MD5 hash of the blob content. Note that this hash is not validated, as the hashes for the individual blocks were validated when each was uploaded. */
  blobContentMd5?: Uint8Array;
  /** Optional. Sets the blob's cache control. If specified, this property is stored with the blob and returned with a read request. */
  blobCacheControl?: string;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** Optional. Sets the blob's content disposition. If specified, this property is stored with the blob and returned with a read request. */
  blobContentDisposition?: string;
  /** Optional.  Version 2019-07-07 and later.  Specifies the encryption key to use to encrypt the data provided in the request. If not specified, the request will be encrypted with the root account key. */
  encryptionKey?: string;
  /** Optional.  Version 2019-07-07 and later.  Specifies the SHA256 hash of the encryption key used to encrypt the data provided in the request. This header is only used for encryption with a customer-provided key. If the request is authenticated with a client token, this header should be specified using the SHA256 hash of the encryption key. */
  encryptionKeySha256?: string;
  /** Optional.  Version 2019-07-07 and later.  Specifies the algorithm to use for encryption. If not specified, the default is AES256. */
  encryptionAlgorithm?: EncryptionAlgorithmType;
  /** Optional.  Version 2019-07-07 and later.  Specifies the encryption scope to use to encrypt the data provided in the request. If not specified, the request will be encrypted with the root account key. */
  encryptionScope?: string;
  /** The tier to be set on the blob. */
  tier?: AccessTier;
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
  /** Optional.  Used to set blob tags in various blob operations. */
  blobTagsString?: string;
  /** Specifies the date time when the blobs immutability policy is set to expire. */
  immutabilityPolicyExpiry?: Date;
  /** Specifies the immutability policy mode to set on the blob. */
  immutabilityPolicyMode?: ImmutabilityPolicyMode;
  /** Specified if a legal hold should be set on the blob. */
  legalHold?: boolean;
  /** Specify the transactional crc64 for the body, to be validated by the service. */
  transactionalContentCrc64?: Uint8Array;
  /** Required if the request body is a structured message. Specifies the message schema version and properties. */
  structuredBodyType?: string;
  /** Required if the request body is a structured message. Specifies the length of the blob/file content inside the message body. Will always be smaller than Content-Length. */
  structuredContentLength?: number;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}
