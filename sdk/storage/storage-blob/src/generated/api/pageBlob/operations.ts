// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlobContext as Client } from "../index.js";
import {
  errorXmlDeserializer,
  CopyStatus,
  PageList,
  pageListXmlDeserializer,
  SequenceNumberActionType,
} from "../../models/azure/storage/blobs/models.js";
import {
  StorageCompatResponseInfo,
  createStorageCompatOnResponse,
  addStorageCompatResponse,
} from "../../static-helpers/storageCompatResponse.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  PageBlobCopyIncrementalOptionalParams,
  PageBlobSetSequenceNumberOptionalParams,
  PageBlobResizeOptionalParams,
  PageBlobGetPageRangesDiffOptionalParams,
  PageBlobGetPageRangesOptionalParams,
  PageBlobUploadPagesFromUrlOptionalParams,
  PageBlobClearPagesOptionalParams,
  PageBlobUploadPagesOptionalParams,
  PageBlobCreateOptionalParams,
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
  options: PageBlobCopyIncrementalOptionalParams = { requestOptions: {} },
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
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
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
        "x-ms-copy-source": copySource,
        ...options.requestOptions?.headers,
      },
    });
}

export async function _copyIncrementalDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._copyIncrementalDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
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

export function _copyIncrementalDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
  xMsCopySourceErrorCode?: string;
  xMsCopySourceStatusCode?: number;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
    xMsCopySourceErrorCode:
      result.headers["x-ms-copy-source-error-code"] === undefined ||
      result.headers["x-ms-copy-source-error-code"] === null
        ? result.headers["x-ms-copy-source-error-code"]
        : result.headers["x-ms-copy-source-error-code"],
    xMsCopySourceStatusCode:
      result.headers["x-ms-copy-source-status-code"] === undefined ||
      result.headers["x-ms-copy-source-status-code"] === null
        ? result.headers["x-ms-copy-source-status-code"]
        : Number(result.headers["x-ms-copy-source-status-code"]),
  };
}

/** The Copy Incremental operation copies a snapshot of the source page blob to a destination page blob. The snapshot is copied such that only the differential changes between the previously copied snapshot are transferred to the destination. The copied snapshots are complete copies of the original snapshot and can be read or copied from as usual. This API is supported since REST version 2016-05-31. */
export async function copyIncremental(
  context: Client,
  copySource: string,
  options: PageBlobCopyIncrementalOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    copyId?: string;
    copyStatus?: CopyStatus;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      copyId?: string;
      copyStatus?: CopyStatus;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _copyIncrementalSend(context, copySource, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _copyIncrementalDeserialize(result);
  const parsedHeaders = _copyIncrementalDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _setSequenceNumberSend(
  context: Client,
  sequenceNumberAction: SequenceNumberActionType,
  options: PageBlobSetSequenceNumberOptionalParams = { requestOptions: {} },
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
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
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
        ...options.requestOptions?.headers,
      },
    });
}

export async function _setSequenceNumberDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._setSequenceNumberDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
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

export function _setSequenceNumberDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
  xMsCopySourceErrorCode?: string;
  xMsCopySourceStatusCode?: number;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
    xMsCopySourceErrorCode:
      result.headers["x-ms-copy-source-error-code"] === undefined ||
      result.headers["x-ms-copy-source-error-code"] === null
        ? result.headers["x-ms-copy-source-error-code"]
        : result.headers["x-ms-copy-source-error-code"],
    xMsCopySourceStatusCode:
      result.headers["x-ms-copy-source-status-code"] === undefined ||
      result.headers["x-ms-copy-source-status-code"] === null
        ? result.headers["x-ms-copy-source-status-code"]
        : Number(result.headers["x-ms-copy-source-status-code"]),
  };
}

/** The Update Sequence Number operation sets the blob's sequence number. The operation will fail if the specified sequence number is less than the current sequence number of the blob. */
export async function setSequenceNumber(
  context: Client,
  sequenceNumberAction: SequenceNumberActionType,
  options: PageBlobSetSequenceNumberOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    blobSequenceNumber: number;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      blobSequenceNumber: number;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _setSequenceNumberSend(context, sequenceNumberAction, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _setSequenceNumberDeserialize(result);
  const parsedHeaders = _setSequenceNumberDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _resizeSend(
  context: Client,
  size: number,
  options: PageBlobResizeOptionalParams = { requestOptions: {} },
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
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
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
        ...options.requestOptions?.headers,
      },
    });
}

export async function _resizeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = { ...(error.details as any), ..._resizeDeserializeExceptionHeaders(result) };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
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

export function _resizeDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
  xMsCopySourceErrorCode?: string;
  xMsCopySourceStatusCode?: number;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
    xMsCopySourceErrorCode:
      result.headers["x-ms-copy-source-error-code"] === undefined ||
      result.headers["x-ms-copy-source-error-code"] === null
        ? result.headers["x-ms-copy-source-error-code"]
        : result.headers["x-ms-copy-source-error-code"],
    xMsCopySourceStatusCode:
      result.headers["x-ms-copy-source-status-code"] === undefined ||
      result.headers["x-ms-copy-source-status-code"] === null
        ? result.headers["x-ms-copy-source-status-code"]
        : Number(result.headers["x-ms-copy-source-status-code"]),
  };
}

/** The Resize operation increases the size of the page blob to the specified size. */
export async function resize(
  context: Client,
  size: number,
  options: PageBlobResizeOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    blobSequenceNumber: number;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      blobSequenceNumber: number;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _resizeSend(context, size, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _resizeDeserialize(result);
  const parsedHeaders = _resizeDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _getPageRangesDiffSend(
  context: Client,
  options: PageBlobGetPageRangesDiffOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=pagelist{?snapshot,timeout,prevsnapshot,marker,maxresults}",
    {
      snapshot: options?.snapshot,
      timeout: options?.timeout,
      prevsnapshot: options?.prevsnapshot,
      marker: options?.marker,
      maxresults: options?.maxPageSize,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
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
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._getPageRangesDiffDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
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

export function _getPageRangesDiffDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
  xMsCopySourceErrorCode?: string;
  xMsCopySourceStatusCode?: number;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
    xMsCopySourceErrorCode:
      result.headers["x-ms-copy-source-error-code"] === undefined ||
      result.headers["x-ms-copy-source-error-code"] === null
        ? result.headers["x-ms-copy-source-error-code"]
        : result.headers["x-ms-copy-source-error-code"],
    xMsCopySourceStatusCode:
      result.headers["x-ms-copy-source-status-code"] === undefined ||
      result.headers["x-ms-copy-source-status-code"] === null
        ? result.headers["x-ms-copy-source-status-code"]
        : Number(result.headers["x-ms-copy-source-status-code"]),
  };
}

/** The Get Page Ranges Diff operation returns the list of valid page ranges for a page blob or snapshot of a page blob. */
export async function getPageRangesDiff(
  context: Client,
  options: PageBlobGetPageRangesDiffOptionalParams = { requestOptions: {} },
): Promise<
  {
    lastModified: Date;
    etag: string;
    blobContentLength?: number;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
    contentType: "application/xml";
  } & PageList &
    StorageCompatResponseInfo<
      PageList,
      {
        lastModified: Date;
        etag: string;
        blobContentLength?: number;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
        contentType: "application/xml";
      }
    >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _getPageRangesDiffSend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  const parsedBody = await _getPageRangesDiffDeserialize(result);
  const parsedHeaders = _getPageRangesDiffDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, parsedBody, parsedHeaders);
}

export function _getPageRangesSend(
  context: Client,
  options: PageBlobGetPageRangesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=pagelist{?snapshot,timeout,marker,maxresults}",
    {
      snapshot: options?.snapshot,
      timeout: options?.timeout,
      marker: options?.marker,
      maxresults: options?.maxPageSize,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
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
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getPageRangesDeserialize(result: PathUncheckedResponse): Promise<PageList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._getPageRangesDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
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

export function _getPageRangesDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
  xMsCopySourceErrorCode?: string;
  xMsCopySourceStatusCode?: number;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
    xMsCopySourceErrorCode:
      result.headers["x-ms-copy-source-error-code"] === undefined ||
      result.headers["x-ms-copy-source-error-code"] === null
        ? result.headers["x-ms-copy-source-error-code"]
        : result.headers["x-ms-copy-source-error-code"],
    xMsCopySourceStatusCode:
      result.headers["x-ms-copy-source-status-code"] === undefined ||
      result.headers["x-ms-copy-source-status-code"] === null
        ? result.headers["x-ms-copy-source-status-code"]
        : Number(result.headers["x-ms-copy-source-status-code"]),
  };
}

/** The Get Page Ranges operation returns the list of valid page ranges for a page blob or snapshot of a page blob. */
export async function getPageRanges(
  context: Client,
  options: PageBlobGetPageRangesOptionalParams = { requestOptions: {} },
): Promise<
  {
    lastModified: Date;
    etag: string;
    blobContentLength?: number;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
    contentType: "application/xml";
  } & PageList &
    StorageCompatResponseInfo<
      PageList,
      {
        lastModified: Date;
        etag: string;
        blobContentLength?: number;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
        contentType: "application/xml";
      }
    >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _getPageRangesSend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  const parsedBody = await _getPageRangesDeserialize(result);
  const parsedHeaders = _getPageRangesDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, parsedBody, parsedHeaders);
}

export function _uploadPagesFromUrlSend(
  context: Client,
  sourceUrl: string,
  sourceRange: string,
  contentLength: number,
  range: string,
  options: PageBlobUploadPagesFromUrlOptionalParams = { requestOptions: {} },
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
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        "x-ms-copy-source": sourceUrl,
        "x-ms-source-range": sourceRange,
        ...(options?.sourceContentMD5 !== undefined
          ? {
              "x-ms-source-content-md5": !options?.sourceContentMD5
                ? options?.sourceContentMD5
                : uint8ArrayToString(options?.sourceContentMD5, "base64"),
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
        ...options.requestOptions?.headers,
      },
    });
}

export async function _uploadPagesFromUrlDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._uploadPagesFromUrlDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _uploadPagesFromUrlDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  contentMD5: Uint8Array;
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
    contentMD5:
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

export function _uploadPagesFromUrlDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
  xMsCopySourceErrorCode?: string;
  xMsCopySourceStatusCode?: number;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
    xMsCopySourceErrorCode:
      result.headers["x-ms-copy-source-error-code"] === undefined ||
      result.headers["x-ms-copy-source-error-code"] === null
        ? result.headers["x-ms-copy-source-error-code"]
        : result.headers["x-ms-copy-source-error-code"],
    xMsCopySourceStatusCode:
      result.headers["x-ms-copy-source-status-code"] === undefined ||
      result.headers["x-ms-copy-source-status-code"] === null
        ? result.headers["x-ms-copy-source-status-code"]
        : Number(result.headers["x-ms-copy-source-status-code"]),
  };
}

/** The Upload Pages operation writes a range of pages to a page blob where the contents are read from a URL. */
export async function uploadPagesFromUrl(
  context: Client,
  sourceUrl: string,
  sourceRange: string,
  contentLength: number,
  range: string,
  options: PageBlobUploadPagesFromUrlOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    contentMD5: Uint8Array;
    contentCrc64?: Uint8Array;
    blobSequenceNumber: number;
    isServerEncrypted?: boolean;
    encryptionKeySha256?: string;
    encryptionScope?: string;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      contentMD5: Uint8Array;
      contentCrc64?: Uint8Array;
      blobSequenceNumber: number;
      isServerEncrypted?: boolean;
      encryptionKeySha256?: string;
      encryptionScope?: string;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _uploadPagesFromUrlSend(
    context,
    sourceUrl,
    sourceRange,
    contentLength,
    range,
    { ...options, onResponse: _storageCompat.onResponse },
  );
  await _uploadPagesFromUrlDeserialize(result);
  const parsedHeaders = _uploadPagesFromUrlDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _clearPagesSend(
  context: Client,
  range: string,
  options: PageBlobClearPagesOptionalParams = { requestOptions: {} },
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
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
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
        ...options.requestOptions?.headers,
      },
    });
}

export async function _clearPagesDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._clearPagesDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _clearPagesDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  contentMD5: Uint8Array;
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
    contentMD5:
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

export function _clearPagesDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
  xMsCopySourceErrorCode?: string;
  xMsCopySourceStatusCode?: number;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
    xMsCopySourceErrorCode:
      result.headers["x-ms-copy-source-error-code"] === undefined ||
      result.headers["x-ms-copy-source-error-code"] === null
        ? result.headers["x-ms-copy-source-error-code"]
        : result.headers["x-ms-copy-source-error-code"],
    xMsCopySourceStatusCode:
      result.headers["x-ms-copy-source-status-code"] === undefined ||
      result.headers["x-ms-copy-source-status-code"] === null
        ? result.headers["x-ms-copy-source-status-code"]
        : Number(result.headers["x-ms-copy-source-status-code"]),
  };
}

/** The Clear Pages operation clears a range of pages from a page blob */
export async function clearPages(
  context: Client,
  range: string,
  options: PageBlobClearPagesOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    contentMD5: Uint8Array;
    contentCrc64?: Uint8Array;
    blobSequenceNumber: number;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      contentMD5: Uint8Array;
      contentCrc64?: Uint8Array;
      blobSequenceNumber: number;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _clearPagesSend(context, range, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _clearPagesDeserialize(result);
  const parsedHeaders = _clearPagesDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _uploadPagesSend(
  context: Client,
  body: Uint8Array,
  contentLength: number,
  range: string,
  options: PageBlobUploadPagesOptionalParams = { requestOptions: {} },
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
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
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
        ...options.requestOptions?.headers,
      },
      body: body,
    });
}

export async function _uploadPagesDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._uploadPagesDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _uploadPagesDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  contentMD5: Uint8Array;
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
    contentMD5:
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

export function _uploadPagesDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
  xMsCopySourceErrorCode?: string;
  xMsCopySourceStatusCode?: number;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
    xMsCopySourceErrorCode:
      result.headers["x-ms-copy-source-error-code"] === undefined ||
      result.headers["x-ms-copy-source-error-code"] === null
        ? result.headers["x-ms-copy-source-error-code"]
        : result.headers["x-ms-copy-source-error-code"],
    xMsCopySourceStatusCode:
      result.headers["x-ms-copy-source-status-code"] === undefined ||
      result.headers["x-ms-copy-source-status-code"] === null
        ? result.headers["x-ms-copy-source-status-code"]
        : Number(result.headers["x-ms-copy-source-status-code"]),
  };
}

/** The Upload Pages operation writes a range of pages to a page blob */
export async function uploadPages(
  context: Client,
  body: Uint8Array,
  contentLength: number,
  range: string,
  options: PageBlobUploadPagesOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    contentMD5: Uint8Array;
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
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      contentMD5: Uint8Array;
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
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _uploadPagesSend(context, body, contentLength, range, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _uploadPagesDeserialize(result);
  const parsedHeaders = _uploadPagesDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _createSend(
  context: Client,
  size: number,
  options: PageBlobCreateOptionalParams = { requestOptions: {} },
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
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
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
        ...(options?.blobContentMD5 !== undefined
          ? {
              "x-ms-blob-content-md5": !options?.blobContentMD5
                ? options?.blobContentMD5
                : uint8ArrayToString(options?.blobContentMD5, "base64"),
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
        ...options.requestOptions?.headers,
      },
    });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = { ...(error.details as any), ..._createDeserializeExceptionHeaders(result) };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _createDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  contentMD5: Uint8Array;
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
    contentMD5:
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

export function _createDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
  xMsCopySourceErrorCode?: string;
  xMsCopySourceStatusCode?: number;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
    xMsCopySourceErrorCode:
      result.headers["x-ms-copy-source-error-code"] === undefined ||
      result.headers["x-ms-copy-source-error-code"] === null
        ? result.headers["x-ms-copy-source-error-code"]
        : result.headers["x-ms-copy-source-error-code"],
    xMsCopySourceStatusCode:
      result.headers["x-ms-copy-source-status-code"] === undefined ||
      result.headers["x-ms-copy-source-status-code"] === null
        ? result.headers["x-ms-copy-source-status-code"]
        : Number(result.headers["x-ms-copy-source-status-code"]),
  };
}

/** The Create operation creates a new page blob. */
export async function create(
  context: Client,
  size: number,
  options: PageBlobCreateOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    contentMD5: Uint8Array;
    versionId: string;
    isServerEncrypted?: boolean;
    encryptionKeySha256?: string;
    encryptionScope?: string;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      contentMD5: Uint8Array;
      versionId: string;
      isServerEncrypted?: boolean;
      encryptionKeySha256?: string;
      encryptionScope?: string;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _createSend(context, size, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _createDeserialize(result);
  const parsedHeaders = _createDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}
