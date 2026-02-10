// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppendBlobContext as Client } from "./index.js";
import { storageErrorDeserializer } from "../../models/azure/storage/blobs/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  SealOptionalParams,
  AppendBlockFromUrlOptionalParams,
  AppendBlockOptionalParams,
  CreateOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { uint8ArrayToString, stringToUint8Array } from "@azure/core-util";

export function _sealSend(
  context: Client,
  options: SealOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?comp=seal{?timeout}",
    {
      timeout: options?.timeout,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.ifModifiedSince !== undefined
          ? {
              "if-modified-since": !options?.ifModifiedSince
                ? options?.ifModifiedSince
                : options?.ifModifiedSince.toUTCString(),
            }
          : {}),
        ...(options?.ifUnmodifiedSince !== undefined
          ? {
              "if-unmodified-since": !options?.ifUnmodifiedSince
                ? options?.ifUnmodifiedSince
                : options?.ifUnmodifiedSince.toUTCString(),
            }
          : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.appendPosition !== undefined
          ? { "x-ms-blob-condition-appendpos": options?.appendPosition }
          : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _sealDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return;
}

export function _sealDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  isSealed?: boolean;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    isSealed:
      result.headers["x-ms-blob-sealed"] === undefined ||
      result.headers["x-ms-blob-sealed"] === null
        ? result.headers["x-ms-blob-sealed"]
        : result.headers["x-ms-blob-sealed"].trim().toLowerCase() === "true",
    date: new Date(result.headers["date"]),
    version: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
  };
}

/** The Seal operation seals the Append Blob to make it read-only. Seal is supported only on version 2019-12-12 version or later. */
export async function seal(
  context: Client,
  options: SealOptionalParams = { requestOptions: {} },
): Promise<{
  etag: string;
  lastModified: Date;
  isSealed?: boolean;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
}> {
  const result = await _sealSend(context, options);
  const headers = _sealDeserializeHeaders(result);
  return { ...headers };
}

export function _appendBlockFromUrlSend(
  context: Client,
  sourceUrl: string,
  contentLength: number,
  options: AppendBlockFromUrlOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?comp=appendblock{?timeout}",
    {
      timeout: options?.timeout,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
        "x-ms-copy-source": sourceUrl,
        ...(options?.sourceRange !== undefined
          ? { "x-ms-source-range": options?.sourceRange }
          : {}),
        ...(options?.sourceContentMd5 !== undefined
          ? {
              "x-ms-source-content-md5": !options?.sourceContentMd5
                ? options?.sourceContentMd5
                : uint8ArrayToString(options?.sourceContentMd5, "base64"),
            }
          : {}),
        ...(options?.sourceContentCrc64 !== undefined
          ? {
              "x-ms-source-content-crc64": !options?.sourceContentCrc64
                ? options?.sourceContentCrc64
                : uint8ArrayToString(options?.sourceContentCrc64, "base64"),
            }
          : {}),
        "content-length": contentLength,
        ...(options?.transactionalContentMD5 !== undefined
          ? {
              "content-md5": !options?.transactionalContentMD5
                ? options?.transactionalContentMD5
                : uint8ArrayToString(options?.transactionalContentMD5, "base64"),
            }
          : {}),
        ...(options?.encryptionKey !== undefined
          ? { "x-ms-encryption-key": options?.encryptionKey }
          : {}),
        ...(options?.encryptionKeySha256 !== undefined
          ? { "x-ms-encryption-key-sha256": options?.encryptionKeySha256 }
          : {}),
        ...(options?.encryptionAlgorithm !== undefined
          ? { "x-ms-encryption-algorithm": options?.encryptionAlgorithm }
          : {}),
        ...(options?.encryptionScope !== undefined
          ? { "x-ms-encryption-scope": options?.encryptionScope }
          : {}),
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.maxSize !== undefined
          ? { "x-ms-blob-condition-maxsize": options?.maxSize }
          : {}),
        ...(options?.appendPosition !== undefined
          ? { "x-ms-blob-condition-appendpos": options?.appendPosition }
          : {}),
        ...(options?.ifModifiedSince !== undefined
          ? {
              "if-modified-since": !options?.ifModifiedSince
                ? options?.ifModifiedSince
                : options?.ifModifiedSince.toUTCString(),
            }
          : {}),
        ...(options?.ifUnmodifiedSince !== undefined
          ? {
              "if-unmodified-since": !options?.ifUnmodifiedSince
                ? options?.ifUnmodifiedSince
                : options?.ifUnmodifiedSince.toUTCString(),
            }
          : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifTags !== undefined ? { "x-ms-if-tags": options?.ifTags } : {}),
        ...(options?.sourceIfModifiedSince !== undefined
          ? {
              "x-ms-source-if-modified-since": !options?.sourceIfModifiedSince
                ? options?.sourceIfModifiedSince
                : options?.sourceIfModifiedSince.toUTCString(),
            }
          : {}),
        ...(options?.sourceIfUnmodifiedSince !== undefined
          ? {
              "x-ms-source-if-unmodified-since": !options?.sourceIfUnmodifiedSince
                ? options?.sourceIfUnmodifiedSince
                : options?.sourceIfUnmodifiedSince.toUTCString(),
            }
          : {}),
        ...(options?.sourceIfMatch !== undefined
          ? { "x-ms-source-if-match": options?.sourceIfMatch }
          : {}),
        ...(options?.sourceIfNoneMatch !== undefined
          ? { "x-ms-source-if-none-match": options?.sourceIfNoneMatch }
          : {}),
        ...(options?.copySourceAuthorization !== undefined
          ? { "x-ms-copy-source-authorization": options?.copySourceAuthorization }
          : {}),
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        ...(options?.sourceEncryptionKey !== undefined
          ? { "x-ms-source-encryption-key": options?.sourceEncryptionKey }
          : {}),
        ...(options?.sourceEncryptionKeySha256 !== undefined
          ? { "x-ms-source-encryption-key-sha256": options?.sourceEncryptionKeySha256 }
          : {}),
        ...(options?.sourceEncryptionAlgorithm !== undefined
          ? { "x-ms-source-encryption-algorithm": options?.sourceEncryptionAlgorithm }
          : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _appendBlockFromUrlDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return;
}

export function _appendBlockFromUrlDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  contentMd5: Uint8Array;
  contentCrc64?: Uint8Array;
  blobAppendOffset?: string;
  blobCommittedBlockCount?: number;
  isServerEncrypted?: boolean;
  encryptionKeySha256?: string;
  encryptionScope?: string;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    contentMd5:
      typeof result.headers["content-md5"] === "string"
        ? stringToUint8Array(result.headers["content-md5"], "base64")
        : result.headers["content-md5"],
    contentCrc64:
      result.headers["x-ms-content-crc64"] === undefined ||
      result.headers["x-ms-content-crc64"] === null
        ? result.headers["x-ms-content-crc64"]
        : typeof result.headers["x-ms-content-crc64"] === "string"
          ? stringToUint8Array(result.headers["x-ms-content-crc64"], "base64")
          : result.headers["x-ms-content-crc64"],
    blobAppendOffset:
      result.headers["x-ms-blob-append-offset"] === undefined ||
      result.headers["x-ms-blob-append-offset"] === null
        ? result.headers["x-ms-blob-append-offset"]
        : result.headers["x-ms-blob-append-offset"],
    blobCommittedBlockCount:
      result.headers["x-ms-blob-committed-block-count"] === undefined ||
      result.headers["x-ms-blob-committed-block-count"] === null
        ? result.headers["x-ms-blob-committed-block-count"]
        : Number(result.headers["x-ms-blob-committed-block-count"]),
    isServerEncrypted:
      result.headers["x-ms-request-server-encrypted"] === undefined ||
      result.headers["x-ms-request-server-encrypted"] === null
        ? result.headers["x-ms-request-server-encrypted"]
        : result.headers["x-ms-request-server-encrypted"].trim().toLowerCase() === "true",
    encryptionKeySha256:
      result.headers["x-ms-encryption-key-sha256"] === undefined ||
      result.headers["x-ms-encryption-key-sha256"] === null
        ? result.headers["x-ms-encryption-key-sha256"]
        : result.headers["x-ms-encryption-key-sha256"],
    encryptionScope:
      result.headers["x-ms-encryption-scope"] === undefined ||
      result.headers["x-ms-encryption-scope"] === null
        ? result.headers["x-ms-encryption-scope"]
        : result.headers["x-ms-encryption-scope"],
    date: new Date(result.headers["date"]),
    version: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
  };
}

/** The Append Block From URL operation creates a new block to be committed as part of an append blob where the contents are read from a URL. */
export async function appendBlockFromUrl(
  context: Client,
  sourceUrl: string,
  contentLength: number,
  options: AppendBlockFromUrlOptionalParams = { requestOptions: {} },
): Promise<{
  etag: string;
  lastModified: Date;
  contentMd5: Uint8Array;
  contentCrc64?: Uint8Array;
  blobAppendOffset?: string;
  blobCommittedBlockCount?: number;
  isServerEncrypted?: boolean;
  encryptionKeySha256?: string;
  encryptionScope?: string;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
}> {
  const result = await _appendBlockFromUrlSend(context, sourceUrl, contentLength, options);
  const headers = _appendBlockFromUrlDeserializeHeaders(result);
  return { ...headers };
}

export function _appendBlockSend(
  context: Client,
  body: Uint8Array,
  contentLength: number,
  options: AppendBlockOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?comp=appendblock{?timeout}",
    {
      timeout: options?.timeout,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/octet-stream",
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
        "content-length": contentLength,
        ...(options?.transactionalContentMD5 !== undefined
          ? {
              "content-md5": !options?.transactionalContentMD5
                ? options?.transactionalContentMD5
                : uint8ArrayToString(options?.transactionalContentMD5, "base64"),
            }
          : {}),
        ...(options?.transactionalContentCrc64 !== undefined
          ? {
              "x-ms-content-crc64": !options?.transactionalContentCrc64
                ? options?.transactionalContentCrc64
                : uint8ArrayToString(options?.transactionalContentCrc64, "base64"),
            }
          : {}),
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.maxSize !== undefined
          ? { "x-ms-blob-condition-maxsize": options?.maxSize }
          : {}),
        ...(options?.appendPosition !== undefined
          ? { "x-ms-blob-condition-appendpos": options?.appendPosition }
          : {}),
        ...(options?.encryptionKey !== undefined
          ? { "x-ms-encryption-key": options?.encryptionKey }
          : {}),
        ...(options?.encryptionKeySha256 !== undefined
          ? { "x-ms-encryption-key-sha256": options?.encryptionKeySha256 }
          : {}),
        ...(options?.encryptionAlgorithm !== undefined
          ? { "x-ms-encryption-algorithm": options?.encryptionAlgorithm }
          : {}),
        ...(options?.encryptionScope !== undefined
          ? { "x-ms-encryption-scope": options?.encryptionScope }
          : {}),
        ...(options?.ifModifiedSince !== undefined
          ? {
              "if-modified-since": !options?.ifModifiedSince
                ? options?.ifModifiedSince
                : options?.ifModifiedSince.toUTCString(),
            }
          : {}),
        ...(options?.ifUnmodifiedSince !== undefined
          ? {
              "if-unmodified-since": !options?.ifUnmodifiedSince
                ? options?.ifUnmodifiedSince
                : options?.ifUnmodifiedSince.toUTCString(),
            }
          : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifTags !== undefined ? { "x-ms-if-tags": options?.ifTags } : {}),
        ...(options?.structuredBodyType !== undefined
          ? { "x-ms-structured-body": options?.structuredBodyType }
          : {}),
        ...(options?.structuredContentLength !== undefined
          ? { "x-ms-structured-content-length": options?.structuredContentLength }
          : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
      body: body,
    });
}

export async function _appendBlockDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return;
}

export function _appendBlockDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  contentMd5: Uint8Array;
  contentCrc64?: Uint8Array;
  blobAppendOffset?: string;
  blobCommittedBlockCount?: number;
  isServerEncrypted?: boolean;
  encryptionKeySha256?: string;
  encryptionScope?: string;
  structuredBodyType?: string;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    contentMd5:
      typeof result.headers["content-md5"] === "string"
        ? stringToUint8Array(result.headers["content-md5"], "base64")
        : result.headers["content-md5"],
    contentCrc64:
      result.headers["x-ms-content-crc64"] === undefined ||
      result.headers["x-ms-content-crc64"] === null
        ? result.headers["x-ms-content-crc64"]
        : typeof result.headers["x-ms-content-crc64"] === "string"
          ? stringToUint8Array(result.headers["x-ms-content-crc64"], "base64")
          : result.headers["x-ms-content-crc64"],
    blobAppendOffset:
      result.headers["x-ms-blob-append-offset"] === undefined ||
      result.headers["x-ms-blob-append-offset"] === null
        ? result.headers["x-ms-blob-append-offset"]
        : result.headers["x-ms-blob-append-offset"],
    blobCommittedBlockCount:
      result.headers["x-ms-blob-committed-block-count"] === undefined ||
      result.headers["x-ms-blob-committed-block-count"] === null
        ? result.headers["x-ms-blob-committed-block-count"]
        : Number(result.headers["x-ms-blob-committed-block-count"]),
    isServerEncrypted:
      result.headers["x-ms-request-server-encrypted"] === undefined ||
      result.headers["x-ms-request-server-encrypted"] === null
        ? result.headers["x-ms-request-server-encrypted"]
        : result.headers["x-ms-request-server-encrypted"].trim().toLowerCase() === "true",
    encryptionKeySha256:
      result.headers["x-ms-encryption-key-sha256"] === undefined ||
      result.headers["x-ms-encryption-key-sha256"] === null
        ? result.headers["x-ms-encryption-key-sha256"]
        : result.headers["x-ms-encryption-key-sha256"],
    encryptionScope:
      result.headers["x-ms-encryption-scope"] === undefined ||
      result.headers["x-ms-encryption-scope"] === null
        ? result.headers["x-ms-encryption-scope"]
        : result.headers["x-ms-encryption-scope"],
    structuredBodyType:
      result.headers["x-ms-structured-body"] === undefined ||
      result.headers["x-ms-structured-body"] === null
        ? result.headers["x-ms-structured-body"]
        : result.headers["x-ms-structured-body"],
    date: new Date(result.headers["date"]),
    version: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
  };
}

/** The Append Block operation commits a new block of data to the end of an append blob. */
export async function appendBlock(
  context: Client,
  body: Uint8Array,
  contentLength: number,
  options: AppendBlockOptionalParams = { requestOptions: {} },
): Promise<{
  etag: string;
  lastModified: Date;
  contentMd5: Uint8Array;
  contentCrc64?: Uint8Array;
  blobAppendOffset?: string;
  blobCommittedBlockCount?: number;
  isServerEncrypted?: boolean;
  encryptionKeySha256?: string;
  encryptionScope?: string;
  structuredBodyType?: string;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
}> {
  const result = await _appendBlockSend(context, body, contentLength, options);
  const headers = _appendBlockDeserializeHeaders(result);
  return { ...headers };
}

export function _createSend(
  context: Client,
  options: CreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{?timeout}",
    {
      timeout: options?.timeout,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.metadata !== undefined ? { "x-ms-meta": options?.metadata } : {}),
        ...(options?.blobContentType !== undefined
          ? { "x-ms-blob-content-type": options?.blobContentType }
          : {}),
        ...(options?.blobContentEncoding !== undefined
          ? { "x-ms-blob-content-encoding": options?.blobContentEncoding }
          : {}),
        ...(options?.blobContentLanguage !== undefined
          ? { "x-ms-blob-content-language": options?.blobContentLanguage }
          : {}),
        ...(options?.blobContentMd5 !== undefined
          ? {
              "x-ms-blob-content-md5": !options?.blobContentMd5
                ? options?.blobContentMd5
                : uint8ArrayToString(options?.blobContentMd5, "base64"),
            }
          : {}),
        ...(options?.blobCacheControl !== undefined
          ? { "x-ms-blob-cache-control": options?.blobCacheControl }
          : {}),
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.blobContentDisposition !== undefined
          ? { "x-ms-blob-content-disposition": options?.blobContentDisposition }
          : {}),
        ...(options?.encryptionKey !== undefined
          ? { "x-ms-encryption-key": options?.encryptionKey }
          : {}),
        ...(options?.encryptionKeySha256 !== undefined
          ? { "x-ms-encryption-key-sha256": options?.encryptionKeySha256 }
          : {}),
        ...(options?.encryptionAlgorithm !== undefined
          ? { "x-ms-encryption-algorithm": options?.encryptionAlgorithm }
          : {}),
        ...(options?.encryptionScope !== undefined
          ? { "x-ms-encryption-scope": options?.encryptionScope }
          : {}),
        ...(options?.ifModifiedSince !== undefined
          ? {
              "if-modified-since": !options?.ifModifiedSince
                ? options?.ifModifiedSince
                : options?.ifModifiedSince.toUTCString(),
            }
          : {}),
        ...(options?.ifUnmodifiedSince !== undefined
          ? {
              "if-unmodified-since": !options?.ifUnmodifiedSince
                ? options?.ifUnmodifiedSince
                : options?.ifUnmodifiedSince.toUTCString(),
            }
          : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifTags !== undefined ? { "x-ms-if-tags": options?.ifTags } : {}),
        ...(options?.blobTagsString !== undefined ? { "x-ms-tags": options?.blobTagsString } : {}),
        ...(options?.immutabilityPolicyExpiry !== undefined
          ? {
              "x-ms-immutability-policy-until-date": !options?.immutabilityPolicyExpiry
                ? options?.immutabilityPolicyExpiry
                : options?.immutabilityPolicyExpiry.toUTCString(),
            }
          : {}),
        ...(options?.immutabilityPolicyMode !== undefined
          ? { "x-ms-immutability-policy-mode": options?.immutabilityPolicyMode }
          : {}),
        ...(options?.legalHold !== undefined ? { "x-ms-legal-hold": options?.legalHold } : {}),
        "content-length": 0,
        "x-ms-blob-type": "AppendBlob",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return;
}

export function _createDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  contentMd5: Uint8Array;
  versionId: string;
  isServerEncrypted?: boolean;
  encryptionKeySha256?: string;
  encryptionScope?: string;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    contentMd5:
      typeof result.headers["content-md5"] === "string"
        ? stringToUint8Array(result.headers["content-md5"], "base64")
        : result.headers["content-md5"],
    versionId: result.headers["x-ms-version-id"],
    isServerEncrypted:
      result.headers["x-ms-request-server-encrypted"] === undefined ||
      result.headers["x-ms-request-server-encrypted"] === null
        ? result.headers["x-ms-request-server-encrypted"]
        : result.headers["x-ms-request-server-encrypted"].trim().toLowerCase() === "true",
    encryptionKeySha256:
      result.headers["x-ms-encryption-key-sha256"] === undefined ||
      result.headers["x-ms-encryption-key-sha256"] === null
        ? result.headers["x-ms-encryption-key-sha256"]
        : result.headers["x-ms-encryption-key-sha256"],
    encryptionScope:
      result.headers["x-ms-encryption-scope"] === undefined ||
      result.headers["x-ms-encryption-scope"] === null
        ? result.headers["x-ms-encryption-scope"]
        : result.headers["x-ms-encryption-scope"],
    date: new Date(result.headers["date"]),
    version: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
  };
}

/** The Create operation creates a new append blob. */
export async function create(
  context: Client,
  options: CreateOptionalParams = { requestOptions: {} },
): Promise<{
  etag: string;
  lastModified: Date;
  contentMd5: Uint8Array;
  versionId: string;
  isServerEncrypted?: boolean;
  encryptionKeySha256?: string;
  encryptionScope?: string;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
}> {
  const result = await _createSend(context, options);
  const headers = _createDeserializeHeaders(result);
  return { ...headers };
}
