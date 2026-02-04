// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockBlobContext as Client } from "./index.js";
import {
  storageErrorDeserializer,
  BlockLookupList,
  blockLookupListXmlSerializer,
  BlockList,
  blockListXmlDeserializer,
  QueryRequest,
  queryRequestXmlSerializer,
  BlockListType,
} from "../../models/azure/storage/blobs/models.js";
import { getBinaryResponse } from "../../static-helpers/serialization/get-binary-response.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  QueryOptionalParams,
  GetBlockListOptionalParams,
  CommitBlockListOptionalParams,
  StageBlockFromUrlOptionalParams,
  StageBlockOptionalParams,
  UploadBlobFromUrlOptionalParams,
  UploadOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { uint8ArrayToString } from "@azure/core-util";

export function _querySend(
  context: Client,
  queryRequest: QueryRequest,
  options: QueryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?comp=query{?snapshot,timeout}",
    {
      snapshot: options?.snapshot,
      timeout: options?.timeout,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.encryptionKey !== undefined
          ? { "x-ms-encryption-key": options?.encryptionKey }
          : {}),
        ...(options?.encryptionKeySha256 !== undefined
          ? { "x-ms-encryption-key-sha256": options?.encryptionKeySha256 }
          : {}),
        ...(options?.encryptionAlgorithm !== undefined
          ? { "x-ms-encryption-algorithm": options?.encryptionAlgorithm }
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
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/octet-stream",
        ...options.requestOptions?.headers,
      },
      body: queryRequestXmlSerializer(queryRequest),
    });
}

export async function _queryDeserialize(result: PathUncheckedResponse): Promise<Uint8Array> {
  const expectedStatuses = ["200", "206"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return result.body;
}

/** The Query operation enables users to select/project on blob data by providing simple query expressions. */
export async function query(
  context: Client,
  queryRequest: QueryRequest,
  options: QueryOptionalParams = { requestOptions: {} },
): Promise<Uint8Array> {
  const streamableMethod = _querySend(context, queryRequest, options);
  const result = await getBinaryResponse(streamableMethod);
  return _queryDeserialize(result);
}

export function _getBlockListSend(
  context: Client,
  listType: BlockListType,
  options: GetBlockListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?comp=blocklist{?snapshot,blocklisttype,timeout}",
    {
      snapshot: options?.snapshot,
      blocklisttype: listType,
      timeout: options?.timeout,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.ifTags !== undefined ? { "x-ms-if-tags": options?.ifTags } : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getBlockListDeserialize(result: PathUncheckedResponse): Promise<BlockList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return blockListXmlDeserializer(result.body);
}

/** The Get Block List operation retrieves the list of blocks that have been uploaded as part of a block blob. */
export async function getBlockList(
  context: Client,
  listType: BlockListType,
  options: GetBlockListOptionalParams = { requestOptions: {} },
): Promise<BlockList> {
  const result = await _getBlockListSend(context, listType, options);
  return _getBlockListDeserialize(result);
}

export function _commitBlockListSend(
  context: Client,
  blocks: BlockLookupList,
  options: CommitBlockListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?comp=blocklist{?timeout}",
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
        ...(options?.blobCacheControl !== undefined
          ? { "x-ms-blob-cache-control": options?.blobCacheControl }
          : {}),
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
        ...(options?.metadata !== undefined ? { "x-ms-meta": options?.metadata } : {}),
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
        ...(options?.tier !== undefined ? { "x-ms-access-tier": options?.tier } : {}),
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
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
      body: blockLookupListXmlSerializer(blocks),
    });
}

export async function _commitBlockListDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** The Commit Block List operation writes a blob by specifying the list of block IDs that make up the blob. In order to be written as part of a blob, a block must have been successfully written to the server in a prior Put Block operation. You can call Put Block List to update a blob by uploading only those blocks that have changed, then committing the new and existing blocks together. You can do this by specifying whether to commit a block from the committed block list or from the uncommitted block list, or to commit the most recently uploaded version of the block, whichever list it may belong to. */
export async function commitBlockList(
  context: Client,
  blocks: BlockLookupList,
  options: CommitBlockListOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _commitBlockListSend(context, blocks, options);
  return _commitBlockListDeserialize(result);
}

export function _stageBlockFromUrlSend(
  context: Client,
  blockId: Uint8Array,
  contentLength: number,
  sourceUrl: string,
  options: StageBlockFromUrlOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?comp=block{?blockid,timeout}",
    {
      blockid: uint8ArrayToString(blockId, "base64"),
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
        "content-length": contentLength,
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

export async function _stageBlockFromUrlDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** The Stage Block From URL operation creates a new block to be committed as part of a blob where the contents are read from a URL. */
export async function stageBlockFromUrl(
  context: Client,
  blockId: Uint8Array,
  contentLength: number,
  sourceUrl: string,
  options: StageBlockFromUrlOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _stageBlockFromUrlSend(context, blockId, contentLength, sourceUrl, options);
  return _stageBlockFromUrlDeserialize(result);
}

export function _stageBlockSend(
  context: Client,
  blockId: Uint8Array,
  contentLength: number,
  body: Uint8Array,
  options: StageBlockOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?comp=block{?blockid,timeout}",
    {
      blockid: uint8ArrayToString(blockId, "base64"),
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

export async function _stageBlockDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** The Stage Block operation creates a new block to be committed as part of a blob */
export async function stageBlock(
  context: Client,
  blockId: Uint8Array,
  contentLength: number,
  body: Uint8Array,
  options: StageBlockOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _stageBlockSend(context, blockId, contentLength, body, options);
  return _stageBlockDeserialize(result);
}

export function _uploadBlobFromUrlSend(
  context: Client,
  copySource: string,
  options: UploadBlobFromUrlOptionalParams = { requestOptions: {} },
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
        ...(options?.transactionalContentMD5 !== undefined
          ? {
              "content-md5": !options?.transactionalContentMD5
                ? options?.transactionalContentMD5
                : uint8ArrayToString(options?.transactionalContentMD5, "base64"),
            }
          : {}),
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
        ...(options?.tier !== undefined ? { "x-ms-access-tier": options?.tier } : {}),
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
        ...(options?.sourceIfTags !== undefined
          ? { "x-ms-source-if-tags": options?.sourceIfTags }
          : {}),
        ...(options?.sourceContentMd5 !== undefined
          ? {
              "x-ms-source-content-md5": !options?.sourceContentMd5
                ? options?.sourceContentMd5
                : uint8ArrayToString(options?.sourceContentMd5, "base64"),
            }
          : {}),
        ...(options?.blobTagsString !== undefined ? { "x-ms-tags": options?.blobTagsString } : {}),
        "x-ms-copy-source": copySource,
        "content-length": 0,
        ...(options?.copySourceBlobProperties !== undefined
          ? { "x-ms-copy-source-blob-properties": options?.copySourceBlobProperties }
          : {}),
        ...(options?.copySourceAuthorization !== undefined
          ? { "x-ms-copy-source-authorization": options?.copySourceAuthorization }
          : {}),
        ...(options?.copySourceTags !== undefined
          ? { "x-ms-copy-source-tag-option": options?.copySourceTags }
          : {}),
        "x-ms-blob-type": "BlockBlob",
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

export async function _uploadBlobFromUrlDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** The Put Blob from URL operation creates a new Block Blob where the contents of the blob are read from a given URL.  This API is supported beginning with the 2020-04-08 version. Partial updates are not supported with Put Blob from URL; the content of an existing blob is overwritten with the content of the new blob.  To perform partial updates to a block blob’s contents using a source URL, use the Put Block from URL API in conjunction with Put Block List. */
export async function uploadBlobFromUrl(
  context: Client,
  copySource: string,
  options: UploadBlobFromUrlOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _uploadBlobFromUrlSend(context, copySource, options);
  return _uploadBlobFromUrlDeserialize(result);
}

export function _uploadSend(
  context: Client,
  body: Uint8Array,
  contentLength: number,
  options: UploadOptionalParams = { requestOptions: {} },
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
      contentType: "application/octet-stream",
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.metadata !== undefined ? { "x-ms-meta": options?.metadata } : {}),
        ...(options?.transactionalContentMD5 !== undefined
          ? {
              "content-md5": !options?.transactionalContentMD5
                ? options?.transactionalContentMD5
                : uint8ArrayToString(options?.transactionalContentMD5, "base64"),
            }
          : {}),
        "content-length": contentLength,
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
        ...(options?.tier !== undefined ? { "x-ms-access-tier": options?.tier } : {}),
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
        ...(options?.transactionalContentCrc64 !== undefined
          ? {
              "x-ms-content-crc64": !options?.transactionalContentCrc64
                ? options?.transactionalContentCrc64
                : uint8ArrayToString(options?.transactionalContentCrc64, "base64"),
            }
          : {}),
        ...(options?.structuredBodyType !== undefined
          ? { "x-ms-structured-body": options?.structuredBodyType }
          : {}),
        ...(options?.structuredContentLength !== undefined
          ? { "x-ms-structured-content-length": options?.structuredContentLength }
          : {}),
        "x-ms-blob-type": "BlockBlob",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
      body: body,
    });
}

export async function _uploadDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** The Upload Block Blob operation updates the content of an existing block blob. Updating an existing block blob overwrites any existing metadata on the blob. Partial updates are not supported with Put Blob; the content of the existing blob is overwritten with the content of the new blob. To perform a partial update of the content of a block blob, use the Put Block List operation. */
export async function upload(
  context: Client,
  body: Uint8Array,
  contentLength: number,
  options: UploadOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _uploadSend(context, body, contentLength, options);
  return _uploadDeserialize(result);
}
