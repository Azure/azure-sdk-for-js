// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PageBlobContext as Client } from "./index.js";
import {
  storageErrorXmlDeserializer,
  CopyStatus,
  PageList,
  pageListXmlDeserializer,
  PageRange,
  ClearRange,
  SequenceNumberActionType,
} from "../../models/azure/storage/blobs/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  CopyIncrementalOptionalParams,
  SetSequenceNumberOptionalParams,
  ResizeOptionalParams,
  GetPageRangesDiffOptionalParams,
  GetPageRangesOptionalParams,
  UploadPagesFromUrlOptionalParams,
  ClearPagesOptionalParams,
  UploadPagesOptionalParams,
  CreateOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { uint8ArrayToString, stringToUint8Array } from "@azure/core-util";

export function _copyIncrementalSend(
  context: Client,
  copySource: string,
  options: CopyIncrementalOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=incrementalcopy{?timeout}",
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
        "x-ms-copy-source": copySource,
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _copyIncrementalDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorXmlDeserializer(result.body);
    throw error;
  }

  return;
}

export function _copyIncrementalDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  copyId?: string;
  copyStatus?: CopyStatus;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    copyId:
      result.headers["x-ms-copy-id"] === undefined || result.headers["x-ms-copy-id"] === null
        ? result.headers["x-ms-copy-id"]
        : result.headers["x-ms-copy-id"],
    copyStatus: result.headers["x-ms-copy-status"] as any,
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

/** The Copy Incremental operation copies a snapshot of the source page blob to a destination page blob. The snapshot is copied such that only the differential changes between the previously copied snapshot are transferred to the destination. The copied snapshots are complete copies of the original snapshot and can be read or copied from as usual. This API is supported since REST version 2016-05-31. */
export async function copyIncremental(
  context: Client,
  copySource: string,
  options: CopyIncrementalOptionalParams = { requestOptions: {} },
): Promise<{
  etag: string;
  lastModified: Date;
  copyId?: string;
  copyStatus?: CopyStatus;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
}> {
  const result = await _copyIncrementalSend(context, copySource, options);
  const headers = _copyIncrementalDeserializeHeaders(result);
  return { ...headers };
}

export function _setSequenceNumberSend(
  context: Client,
  sequenceNumberAction: SequenceNumberActionType,
  options: SetSequenceNumberOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=properties{?timeout}",
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
        ...(options?.ifTags !== undefined ? { "x-ms-if-tags": options?.ifTags } : {}),
        "x-ms-sequence-number-action": sequenceNumberAction,
        ...(options?.blobSequenceNumber !== undefined
          ? { "x-ms-blob-sequence-number": options?.blobSequenceNumber }
          : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _setSequenceNumberDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorXmlDeserializer(result.body);
    throw error;
  }

  return;
}

export function _setSequenceNumberDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  blobSequenceNumber: number;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    blobSequenceNumber: Number(result.headers["x-ms-blob-sequence-number"]),
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

/** The Update Sequence Number operation sets the blob's sequence number. The operation will fail if the specified sequence number is less than the current sequence number of the blob. */
export async function setSequenceNumber(
  context: Client,
  sequenceNumberAction: SequenceNumberActionType,
  options: SetSequenceNumberOptionalParams = { requestOptions: {} },
): Promise<{
  etag: string;
  lastModified: Date;
  blobSequenceNumber: number;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
}> {
  const result = await _setSequenceNumberSend(context, sequenceNumberAction, options);
  const headers = _setSequenceNumberDeserializeHeaders(result);
  return { ...headers };
}

export function _resizeSend(
  context: Client,
  size: number,
  options: ResizeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=properties{?timeout}",
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
        "x-ms-blob-content-length": size,
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _resizeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorXmlDeserializer(result.body);
    throw error;
  }

  return;
}

export function _resizeDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  blobSequenceNumber: number;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    blobSequenceNumber: Number(result.headers["x-ms-blob-sequence-number"]),
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

/** The Resize operation increases the size of the page blob to the specified size. */
export async function resize(
  context: Client,
  size: number,
  options: ResizeOptionalParams = { requestOptions: {} },
): Promise<{
  etag: string;
  lastModified: Date;
  blobSequenceNumber: number;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
}> {
  const result = await _resizeSend(context, size, options);
  const headers = _resizeDeserializeHeaders(result);
  return { ...headers };
}

export function _getPageRangesDiffSend(
  context: Client,
  options: GetPageRangesDiffOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=pagelist{?snapshot,timeout,prevsnapshot,marker,maxresults}",
    {
      snapshot: options?.snapshot,
      timeout: options?.timeout,
      prevsnapshot: options?.prevsnapshot,
      marker: options?.marker,
      maxresults: options?.maxresults,
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
        ...(options?.prevSnapshotUrl !== undefined
          ? { "x-ms-previous-snapshot-url": options?.prevSnapshotUrl }
          : {}),
        ...(options?.range !== undefined ? { range: options?.range } : {}),
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
        ...(options?.ifTags !== undefined ? { "x-ms-if-tags": options?.ifTags } : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getPageRangesDiffDeserialize(
  result: PathUncheckedResponse,
): Promise<PageList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorXmlDeserializer(result.body);
    throw error;
  }

  return pageListXmlDeserializer(result.body);
}

export function _getPageRangesDiffDeserializeHeaders(result: PathUncheckedResponse): {
  lastModified: Date;
  etag: string;
  blobContentLength?: number;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
  contentType: "application/xml";
} {
  return {
    lastModified: new Date(result.headers["last-modified"]),
    etag: result.headers["etag"],
    blobContentLength:
      result.headers["x-ms-blob-content-length"] === undefined ||
      result.headers["x-ms-blob-content-length"] === null
        ? result.headers["x-ms-blob-content-length"]
        : Number(result.headers["x-ms-blob-content-length"]),
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
    contentType: result.headers["content-type"] as any,
  };
}

/** The Get Page Ranges Diff operation returns the list of valid page ranges for a page blob or snapshot of a page blob. */
export async function getPageRangesDiff(
  context: Client,
  options: GetPageRangesDiffOptionalParams = { requestOptions: {} },
): Promise<{
  pageRange?: PageRange[];
  clearRange?: ClearRange[];
  nextMarker?: string;
  lastModified: Date;
  etag: string;
  blobContentLength?: number;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
  contentType: "application/xml";
}> {
  const result = await _getPageRangesDiffSend(context, options);
  const headers = _getPageRangesDiffDeserializeHeaders(result);
  const payload = await _getPageRangesDiffDeserialize(result);
  return { ...payload, ...headers };
}

export function _getPageRangesSend(
  context: Client,
  options: GetPageRangesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=pagelist{?snapshot,timeout,marker,maxresults}",
    {
      snapshot: options?.snapshot,
      timeout: options?.timeout,
      marker: options?.marker,
      maxresults: options?.maxresults,
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
        ...(options?.range !== undefined ? { range: options?.range } : {}),
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
        ...(options?.ifTags !== undefined ? { "x-ms-if-tags": options?.ifTags } : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getPageRangesDeserialize(result: PathUncheckedResponse): Promise<PageList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorXmlDeserializer(result.body);
    throw error;
  }

  return pageListXmlDeserializer(result.body);
}

export function _getPageRangesDeserializeHeaders(result: PathUncheckedResponse): {
  lastModified: Date;
  etag: string;
  blobContentLength?: number;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
  contentType: "application/xml";
} {
  return {
    lastModified: new Date(result.headers["last-modified"]),
    etag: result.headers["etag"],
    blobContentLength:
      result.headers["x-ms-blob-content-length"] === undefined ||
      result.headers["x-ms-blob-content-length"] === null
        ? result.headers["x-ms-blob-content-length"]
        : Number(result.headers["x-ms-blob-content-length"]),
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
    contentType: result.headers["content-type"] as any,
  };
}

/** The Get Page Ranges operation returns the list of valid page ranges for a page blob or snapshot of a page blob. */
export async function getPageRanges(
  context: Client,
  options: GetPageRangesOptionalParams = { requestOptions: {} },
): Promise<{
  pageRange?: PageRange[];
  clearRange?: ClearRange[];
  nextMarker?: string;
  lastModified: Date;
  etag: string;
  blobContentLength?: number;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
  contentType: "application/xml";
}> {
  const result = await _getPageRangesSend(context, options);
  const headers = _getPageRangesDeserializeHeaders(result);
  const payload = await _getPageRangesDeserialize(result);
  return { ...payload, ...headers };
}

export function _uploadPagesFromUrlSend(
  context: Client,
  sourceUrl: string,
  sourceRange: string,
  contentLength: number,
  range: string,
  options: UploadPagesFromUrlOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=page{?timeout}",
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
        "x-ms-copy-source": sourceUrl,
        "x-ms-source-range": sourceRange,
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
        "x-ms-range": range,
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
        ...(options?.ifSequenceNumberLessThanOrEqualTo !== undefined
          ? { "x-ms-if-sequence-number-le": options?.ifSequenceNumberLessThanOrEqualTo }
          : {}),
        ...(options?.ifSequenceNumberLessThan !== undefined
          ? { "x-ms-if-sequence-number-lt": options?.ifSequenceNumberLessThan }
          : {}),
        ...(options?.ifSequenceNumberEqualTo !== undefined
          ? { "x-ms-if-sequence-number-eq": options?.ifSequenceNumberEqualTo }
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
        "x-ms-page-write": "update",
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

export async function _uploadPagesFromUrlDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorXmlDeserializer(result.body);
    throw error;
  }

  return;
}

export function _uploadPagesFromUrlDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  contentMd5: Uint8Array;
  contentCrc64?: Uint8Array;
  blobSequenceNumber: number;
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
    blobSequenceNumber: Number(result.headers["x-ms-blob-sequence-number"]),
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

/** The Upload Pages operation writes a range of pages to a page blob where the contents are read from a URL. */
export async function uploadPagesFromUrl(
  context: Client,
  sourceUrl: string,
  sourceRange: string,
  contentLength: number,
  range: string,
  options: UploadPagesFromUrlOptionalParams = { requestOptions: {} },
): Promise<{
  etag: string;
  lastModified: Date;
  contentMd5: Uint8Array;
  contentCrc64?: Uint8Array;
  blobSequenceNumber: number;
  isServerEncrypted?: boolean;
  encryptionKeySha256?: string;
  encryptionScope?: string;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
}> {
  const result = await _uploadPagesFromUrlSend(
    context,
    sourceUrl,
    sourceRange,
    contentLength,
    range,
    options,
  );
  const headers = _uploadPagesFromUrlDeserializeHeaders(result);
  return { ...headers };
}

export function _clearPagesSend(
  context: Client,
  range: string,
  options: ClearPagesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=page{?timeout}",
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
        "content-length": 0,
        range: range,
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
        ...(options?.ifSequenceNumberLessThanOrEqualTo !== undefined
          ? { "x-ms-if-sequence-number-le": options?.ifSequenceNumberLessThanOrEqualTo }
          : {}),
        ...(options?.ifSequenceNumberLessThan !== undefined
          ? { "x-ms-if-sequence-number-lt": options?.ifSequenceNumberLessThan }
          : {}),
        ...(options?.ifSequenceNumberEqualTo !== undefined
          ? { "x-ms-if-sequence-number-eq": options?.ifSequenceNumberEqualTo }
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
        "x-ms-page-write": "clear",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _clearPagesDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorXmlDeserializer(result.body);
    throw error;
  }

  return;
}

export function _clearPagesDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  contentMd5: Uint8Array;
  contentCrc64?: Uint8Array;
  blobSequenceNumber: number;
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
    blobSequenceNumber: Number(result.headers["x-ms-blob-sequence-number"]),
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

/** The Clear Pages operation clears a range of pages from a page blob */
export async function clearPages(
  context: Client,
  range: string,
  options: ClearPagesOptionalParams = { requestOptions: {} },
): Promise<{
  etag: string;
  lastModified: Date;
  contentMd5: Uint8Array;
  contentCrc64?: Uint8Array;
  blobSequenceNumber: number;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
}> {
  const result = await _clearPagesSend(context, range, options);
  const headers = _clearPagesDeserializeHeaders(result);
  return { ...headers };
}

export function _uploadPagesSend(
  context: Client,
  body: Uint8Array,
  contentLength: number,
  range: string,
  options: UploadPagesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=page{?timeout}",
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
        range: range,
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
        ...(options?.ifSequenceNumberLessThanOrEqualTo !== undefined
          ? { "x-ms-if-sequence-number-le": options?.ifSequenceNumberLessThanOrEqualTo }
          : {}),
        ...(options?.ifSequenceNumberLessThan !== undefined
          ? { "x-ms-if-sequence-number-lt": options?.ifSequenceNumberLessThan }
          : {}),
        ...(options?.ifSequenceNumberEqualTo !== undefined
          ? { "x-ms-if-sequence-number-eq": options?.ifSequenceNumberEqualTo }
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
        "x-ms-page-write": "update",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
      body: body,
    });
}

export async function _uploadPagesDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorXmlDeserializer(result.body);
    throw error;
  }

  return;
}

export function _uploadPagesDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  contentMd5: Uint8Array;
  contentCrc64?: Uint8Array;
  blobSequenceNumber: number;
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
    blobSequenceNumber: Number(result.headers["x-ms-blob-sequence-number"]),
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

/** The Upload Pages operation writes a range of pages to a page blob */
export async function uploadPages(
  context: Client,
  body: Uint8Array,
  contentLength: number,
  range: string,
  options: UploadPagesOptionalParams = { requestOptions: {} },
): Promise<{
  etag: string;
  lastModified: Date;
  contentMd5: Uint8Array;
  contentCrc64?: Uint8Array;
  blobSequenceNumber: number;
  isServerEncrypted?: boolean;
  encryptionKeySha256?: string;
  encryptionScope?: string;
  structuredBodyType?: string;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
}> {
  const result = await _uploadPagesSend(context, body, contentLength, range, options);
  const headers = _uploadPagesDeserializeHeaders(result);
  return { ...headers };
}

export function _createSend(
  context: Client,
  size: number,
  options: CreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "{?timeout}",
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
        ...(options?.tier !== undefined ? { "x-ms-access-tier": options?.tier } : {}),
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
        "x-ms-blob-content-length": size,
        ...(options?.blobSequenceNumber !== undefined
          ? { "x-ms-blob-sequence-number": options?.blobSequenceNumber }
          : {}),
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
        "x-ms-blob-type": "PageBlob",
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
    error.details = storageErrorXmlDeserializer(result.body);
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

/** The Create operation creates a new page blob. */
export async function create(
  context: Client,
  size: number,
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
  const result = await _createSend(context, size, options);
  const headers = _createDeserializeHeaders(result);
  return { ...headers };
}
