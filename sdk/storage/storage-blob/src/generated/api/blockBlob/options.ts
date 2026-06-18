// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AccessTier,
  ImmutabilityPolicyMode,
  EncryptionAlgorithmType,
  BlobCopySourceTags,
  FileShareTokenIntent,
} from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BlockBlobQueryOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** Specifies the snapshot of the blob. */
  snapshot?: string;
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
export interface BlockBlobGetBlockListOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** Specifies the snapshot of the blob. */
  snapshot?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** Specifies a SQL-like where clause on blob tags to operate only on a blob with matching tags. */
  ifTags?: string;
}

/** Optional parameters. */
export interface BlockBlobCommitBlockListOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** Specifies the blob's Cache-Control. If specified, this property is stored with the blob and returned with a read request. */
  blobCacheControl?: string;
  /** Specifies the blob's Content-Type. If specified, this property is stored with the blob and returned with a read request. */
  blobContentType?: string;
  /** Specifies the blob's Content-Encoding. If specified, this property is stored with the blob and returned with a read request. */
  blobContentEncoding?: string;
  /** Specifies the blob's Content-Language. If specified, this property is stored with the blob and returned with a read request. */
  blobContentLanguage?: string;
  /** The MD5 hash of the blob content that is stored as a property on the blob. Note: This hash is not validated. */
  blobContentMD5?: Uint8Array;
  /** Specifies the transactional MD5 hash for the body. */
  transactionalContentMD5?: Uint8Array;
  /** Specifies the transactional CRC64 hash for the body. */
  transactionalContentCrc64?: Uint8Array;
  /** The metadata headers. */
  metadata?: Record<string, string>;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** Specifies the blob's Content-Disposition. If specified, this property is stored with the blob and returned with a read request. */
  blobContentDisposition?: string;
  /** Specifies the encryption key to use to encrypt the data provided in the request. */
  encryptionKey?: string;
  /** The SHA-256 hash of the provided encryption key. Must be provided if the encryption key is provided. */
  encryptionKeySha256?: string;
  /** The algorithm used to produce the encryption key hash. Must be provided if the encryption key is provided. */
  encryptionAlgorithm?: EncryptionAlgorithmType;
  /** Specifies the encryption scope used to encrypt the data. */
  encryptionScope?: string;
  /** The tier to be set on the blob. */
  tier?: AccessTier;
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
  /** The blob tags. */
  blobTagsString?: string;
  /** The date-time that indicates the time at which the blob immutability policy will expire. */
  immutabilityPolicyExpiry?: Date;
  /** Indicates the immutability policy mode of the blob. */
  immutabilityPolicyMode?: ImmutabilityPolicyMode;
  /** Indicates whether the blob has a legal hold. */
  legalHold?: boolean;
}

/** Optional parameters. */
export interface BlockBlobStageBlockFromUrlOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** Specifies the bytes of the source. */
  sourceRange?: string;
  /** Specifies the MD5 hash calculated for the range of bytes that must be read from the copy source. */
  sourceContentMD5?: Uint8Array;
  /** Specifies the CRC64 calculated for the range of bytes that must be read from the source. */
  sourceContentCrc64?: Uint8Array;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** Specifies the encryption key to use to encrypt the data provided in the request. */
  encryptionKey?: string;
  /** The SHA-256 hash of the provided encryption key. Must be provided if the encryption key is provided. */
  encryptionKeySha256?: string;
  /** The algorithm used to produce the encryption key hash. Must be provided if the encryption key is provided. */
  encryptionAlgorithm?: EncryptionAlgorithmType;
  /** Specifies the encryption scope used to encrypt the data. */
  encryptionScope?: string;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** Specify this value to operate only on a source blob if it has been modified since the specified date-time. */
  sourceIfModifiedSince?: Date;
  /** Specify this header value to operate only on a blob if it has not been modified since the specified date-time. */
  sourceIfUnmodifiedSince?: Date;
  /** Specify this value to operate only on a source blob with a matching Etag value. */
  sourceIfMatch?: string;
  /** Specify this value to operate only on a source blob with a non-matching Etag value. */
  sourceIfNoneMatch?: string;
  /** Only the Bearer authorization scheme is supported, and the value must be a valid OAuth access token for the copy source. */
  copySourceAuthorization?: string;
  /** Specifies the file request token intent. */
  fileRequestIntent?: FileShareTokenIntent;
  /** Specifies the encryption key to use to decrypt the source data provided in the request. */
  sourceEncryptionKey?: string;
  /** The SHA-256 hash of the provided source encryption key. Must be provided if the source encryption key is provided. */
  sourceEncryptionKeySha256?: string;
  /** The algorithm used to produce the source encryption key hash. Must be provided if the source encryption key is provided. */
  sourceEncryptionAlgorithm?: EncryptionAlgorithmType;
}

/** Optional parameters. */
export interface BlockBlobStageBlockOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** Specifies the transactional MD5 hash for the body. */
  transactionalContentMD5?: Uint8Array;
  /** Specifies the transactional CRC64 hash for the body. */
  transactionalContentCrc64?: Uint8Array;
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
  /** Specifies the encryption scope used to encrypt the data. */
  encryptionScope?: string;
  /** Required if the request body is a structured message. Specifies the message schema version and properties. */
  structuredBodyType?: string;
  /** Required if the request body is a structured message. Specifies the length of the blob/file content inside the message body. Will always be smaller than Content-Length. */
  structuredContentLength?: number;
}

/** Optional parameters. */
export interface BlockBlobUploadBlobFromUrlOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The metadata headers. */
  metadata?: Record<string, string>;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** Specifies the transactional MD5 hash for the body. */
  transactionalContentMD5?: Uint8Array;
  /** Specifies the blob's Content-Type. If specified, this property is stored with the blob and returned with a read request. */
  blobContentType?: string;
  /** Specifies the blob's Content-Encoding. If specified, this property is stored with the blob and returned with a read request. */
  blobContentEncoding?: string;
  /** Specifies the blob's Content-Language. If specified, this property is stored with the blob and returned with a read request. */
  blobContentLanguage?: string;
  /** The MD5 hash of the blob content that is stored as a property on the blob. Note: This hash is not validated. */
  blobContentMD5?: Uint8Array;
  /** Specifies the blob's Cache-Control. If specified, this property is stored with the blob and returned with a read request. */
  blobCacheControl?: string;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** Specifies the blob's Content-Disposition. If specified, this property is stored with the blob and returned with a read request. */
  blobContentDisposition?: string;
  /** Specifies the encryption key to use to encrypt the data provided in the request. */
  encryptionKey?: string;
  /** The SHA-256 hash of the provided encryption key. Must be provided if the encryption key is provided. */
  encryptionKeySha256?: string;
  /** The algorithm used to produce the encryption key hash. Must be provided if the encryption key is provided. */
  encryptionAlgorithm?: EncryptionAlgorithmType;
  /** Specifies the encryption scope used to encrypt the data. */
  encryptionScope?: string;
  /** The tier to be set on the blob. */
  tier?: AccessTier;
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
  /** Specifies the MD5 hash calculated for the range of bytes that must be read from the copy source. */
  sourceContentMD5?: Uint8Array;
  /** The blob tags. */
  blobTagsString?: string;
  /** Indicates if properties from the source blob should be copied. Default is true. */
  copySourceBlobProperties?: boolean;
  /** Only the Bearer authorization scheme is supported, and the value must be a valid OAuth access token for the copy source. */
  copySourceAuthorization?: string;
  /** Indicates if source tags should be copied or replaced with the tags specified. Default is 'Replace'. */
  copySourceTags?: BlobCopySourceTags;
  /** Specifies the file request token intent. */
  fileRequestIntent?: FileShareTokenIntent;
  /** Specifies the encryption key to use to decrypt the source data provided in the request. */
  sourceEncryptionKey?: string;
  /** The SHA-256 hash of the provided source encryption key. Must be provided if the source encryption key is provided. */
  sourceEncryptionKeySha256?: string;
  /** The algorithm used to produce the source encryption key hash. Must be provided if the source encryption key is provided. */
  sourceEncryptionAlgorithm?: EncryptionAlgorithmType;
}

/** Optional parameters. */
export interface BlockBlobUploadOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The metadata headers. */
  metadata?: Record<string, string>;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** Specifies the transactional MD5 hash for the body. */
  transactionalContentMD5?: Uint8Array;
  /** Specifies the blob's Content-Type. If specified, this property is stored with the blob and returned with a read request. */
  blobContentType?: string;
  /** Specifies the blob's Content-Encoding. If specified, this property is stored with the blob and returned with a read request. */
  blobContentEncoding?: string;
  /** Specifies the blob's Content-Language. If specified, this property is stored with the blob and returned with a read request. */
  blobContentLanguage?: string;
  /** The MD5 hash of the blob content that is stored as a property on the blob. Note: This hash is not validated. */
  blobContentMD5?: Uint8Array;
  /** Specifies the blob's Cache-Control. If specified, this property is stored with the blob and returned with a read request. */
  blobCacheControl?: string;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** Specifies the blob's Content-Disposition. If specified, this property is stored with the blob and returned with a read request. */
  blobContentDisposition?: string;
  /** Specifies the encryption key to use to encrypt the data provided in the request. */
  encryptionKey?: string;
  /** The SHA-256 hash of the provided encryption key. Must be provided if the encryption key is provided. */
  encryptionKeySha256?: string;
  /** The algorithm used to produce the encryption key hash. Must be provided if the encryption key is provided. */
  encryptionAlgorithm?: EncryptionAlgorithmType;
  /** Specifies the encryption scope used to encrypt the data. */
  encryptionScope?: string;
  /** The tier to be set on the blob. */
  tier?: AccessTier;
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
  /** The blob tags. */
  blobTagsString?: string;
  /** The date-time that indicates the time at which the blob immutability policy will expire. */
  immutabilityPolicyExpiry?: Date;
  /** Indicates the immutability policy mode of the blob. */
  immutabilityPolicyMode?: ImmutabilityPolicyMode;
  /** Indicates whether the blob has a legal hold. */
  legalHold?: boolean;
  /** Specifies the transactional CRC64 hash for the body. */
  transactionalContentCrc64?: Uint8Array;
  /** Required if the request body is a structured message. Specifies the message schema version and properties. */
  structuredBodyType?: string;
  /** Required if the request body is a structured message. Specifies the length of the blob/file content inside the message body. Will always be smaller than Content-Length. */
  structuredContentLength?: number;
}
