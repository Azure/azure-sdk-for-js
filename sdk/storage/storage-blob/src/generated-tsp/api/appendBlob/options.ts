// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ImmutabilityPolicyMode,
  EncryptionAlgorithmType,
  FileShareTokenIntent,
} from "../../models/azure/storage/blobs/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AppendBlobSealOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** A date-time value. A request is made under the condition that the resource has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** A date-time value. A request is made under the condition that the resource has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** A condition that must be met in order for the request to be processed. */
  ifNoneMatch?: string;
  /** A condition that must be met in order for the request to be processed. */
  ifMatch?: string;
  /** Optional conditional header, used only for the Append Block operation. A number indicating the byte offset to compare. Append Block will succeed only if the append position is equal to this number. If it is not, the request will fail with the AppendPositionConditionNotMet error (HTTP status code 412 - Precondition Failed). */
  appendPosition?: number;
}

/** Optional parameters. */
export interface AppendBlobAppendBlockFromUrlOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** Bytes of source data in the specified range. */
  sourceRange?: string;
  /** Specify the md5 calculated for the range of bytes that must be read from the copy source. */
  sourceContentMd5?: Uint8Array;
  /** Specify the crc64 calculated for the range of bytes that must be read from the copy source. */
  sourceContentCrc64?: Uint8Array;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** Optional. An MD5 hash of the blob content. Note that this hash is not validated, as the hashes for the individual blocks were validated when each was uploaded. */
  transactionalContentMD5?: Uint8Array;
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
  /** Optional conditional header. The max length in bytes permitted for the append blob. If the Append Block operation would cause the blob to exceed that limit or if the blob size is already greater than the value specified in this header, the request will fail with MaxBlobSizeConditionNotMet error (HTTP status code 412 - Precondition Failed). */
  maxSize?: number;
  /** Optional conditional header, used only for the Append Block operation. A number indicating the byte offset to compare. Append Block will succeed only if the append position is equal to this number. If it is not, the request will fail with the AppendPositionConditionNotMet error (HTTP status code 412 - Precondition Failed). */
  appendPosition?: number;
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
}

/** Optional parameters. */
export interface AppendBlobAppendBlockOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** Optional. An MD5 hash of the blob content. Note that this hash is not validated, as the hashes for the individual blocks were validated when each was uploaded. */
  transactionalContentMD5?: Uint8Array;
  /** Specify the transactional crc64 for the body, to be validated by the service. */
  transactionalContentCrc64?: Uint8Array;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** Optional conditional header. The max length in bytes permitted for the append blob. If the Append Block operation would cause the blob to exceed that limit or if the blob size is already greater than the value specified in this header, the request will fail with MaxBlobSizeConditionNotMet error (HTTP status code 412 - Precondition Failed). */
  maxSize?: number;
  /** Optional conditional header, used only for the Append Block operation. A number indicating the byte offset to compare. Append Block will succeed only if the append position is equal to this number. If it is not, the request will fail with the AppendPositionConditionNotMet error (HTTP status code 412 - Precondition Failed). */
  appendPosition?: number;
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
  /** Required if the request body is a structured message. Specifies the message schema version and properties. */
  structuredBodyType?: string;
  /** Required if the request body is a structured message. Specifies the length of the blob/file content inside the message body. Will always be smaller than Content-Length. */
  structuredContentLength?: number;
}

/** Optional parameters. */
export interface AppendBlobCreateOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The metadata headers. */
  metadata?: Record<string, string>;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
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
}
