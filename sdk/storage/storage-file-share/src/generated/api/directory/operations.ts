// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FileContext as Client } from "../index.js";
import {
  errorXmlDeserializer,
  ListFilesAndDirectoriesSegmentResponse,
  listFilesAndDirectoriesSegmentResponseXmlDeserializer,
  ListHandlesResponse,
  listHandlesResponseXmlDeserializer,
  NfsFileType,
} from "../../models/azure/storage/files/shares/models.js";
import {
  StorageCompatResponseInfo,
  createStorageCompatOnResponse,
  addStorageCompatResponse,
} from "../../static-helpers/storageCompatResponse.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  DirectoryRenameOptionalParams,
  DirectoryForceCloseHandlesOptionalParams,
  DirectoryListHandlesOptionalParams,
  DirectoryListFilesAndDirectoriesSegmentOptionalParams,
  DirectorySetMetadataOptionalParams,
  DirectorySetPropertiesOptionalParams,
  DirectoryDeleteOptionalParams,
  DirectoryGetPropertiesOptionalParams,
  DirectoryCreateOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _renameSend(
  context: Client,
  renameSource: string,
  options: DirectoryRenameOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=directory&comp=rename{?timeout}",
    {
      timeout: options?.timeoutInSeconds,
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
        "x-ms-file-rename-source": renameSource,
        ...(options?.replaceIfExists !== undefined
          ? { "x-ms-file-rename-replace-if-exists": options?.replaceIfExists }
          : {}),
        ...(options?.ignoreReadOnly !== undefined
          ? { "x-ms-file-rename-ignore-readonly": options?.ignoreReadOnly }
          : {}),
        ...(options?.sourceLeaseId !== undefined
          ? { "x-ms-source-lease-id": options?.sourceLeaseId }
          : {}),
        ...(options?.destinationLeaseId !== undefined
          ? { "x-ms-destination-lease-id": options?.destinationLeaseId }
          : {}),
        ...(options?.fileAttributes !== undefined
          ? { "x-ms-file-attributes": options?.fileAttributes }
          : {}),
        ...(options?.fileCreationTime !== undefined
          ? { "x-ms-file-creation-time": options?.fileCreationTime }
          : {}),
        ...(options?.fileLastWriteTime !== undefined
          ? { "x-ms-file-last-write-time": options?.fileLastWriteTime }
          : {}),
        ...(options?.fileChangeTime !== undefined
          ? { "x-ms-file-change-time": options?.fileChangeTime }
          : {}),
        ...(options?.filePermission !== undefined
          ? { "x-ms-file-permission": options?.filePermission }
          : {}),
        ...(options?.filePermissionFormat !== undefined
          ? { "x-ms-file-permission-format": options?.filePermissionFormat }
          : {}),
        ...(options?.filePermissionKey !== undefined
          ? { "x-ms-file-permission-key": options?.filePermissionKey }
          : {}),
        ...(options?.allowTrailingDot !== undefined
          ? { "x-ms-allow-trailing-dot": options?.allowTrailingDot }
          : {}),
        ...(options?.allowSourceTrailingDot !== undefined
          ? { "x-ms-source-allow-trailing-dot": options?.allowSourceTrailingDot }
          : {}),
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _renameDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = { ...(error.details as any), ..._renameDeserializeExceptionHeaders(result) };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _renameDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  requestServerEncrypted?: boolean;
  filePermissionKey?: string;
  fileAttributes?: string;
  fileCreatedOn?: Date;
  fileLastWriteOn?: Date;
  fileChangeOn?: Date;
  fileId?: string;
  fileParentId?: string;
  version: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    requestServerEncrypted:
      result.headers["x-ms-request-server-encrypted"] === undefined ||
      result.headers["x-ms-request-server-encrypted"] === null
        ? result.headers["x-ms-request-server-encrypted"]
        : result.headers["x-ms-request-server-encrypted"].trim().toLowerCase() === "true",
    filePermissionKey:
      result.headers["x-ms-file-permission-key"] === undefined ||
      result.headers["x-ms-file-permission-key"] === null
        ? result.headers["x-ms-file-permission-key"]
        : result.headers["x-ms-file-permission-key"],
    fileAttributes:
      result.headers["x-ms-file-attributes"] === undefined ||
      result.headers["x-ms-file-attributes"] === null
        ? result.headers["x-ms-file-attributes"]
        : result.headers["x-ms-file-attributes"],
    fileCreatedOn:
      result.headers["x-ms-file-creation-time"] === undefined ||
      result.headers["x-ms-file-creation-time"] === null
        ? result.headers["x-ms-file-creation-time"]
        : new Date(result.headers["x-ms-file-creation-time"]),
    fileLastWriteOn:
      result.headers["x-ms-file-last-write-time"] === undefined ||
      result.headers["x-ms-file-last-write-time"] === null
        ? result.headers["x-ms-file-last-write-time"]
        : new Date(result.headers["x-ms-file-last-write-time"]),
    fileChangeOn:
      result.headers["x-ms-file-change-time"] === undefined ||
      result.headers["x-ms-file-change-time"] === null
        ? result.headers["x-ms-file-change-time"]
        : new Date(result.headers["x-ms-file-change-time"]),
    fileId:
      result.headers["x-ms-file-id"] === undefined || result.headers["x-ms-file-id"] === null
        ? result.headers["x-ms-file-id"]
        : result.headers["x-ms-file-id"],
    fileParentId:
      result.headers["x-ms-file-parent-id"] === undefined ||
      result.headers["x-ms-file-parent-id"] === null
        ? result.headers["x-ms-file-parent-id"]
        : result.headers["x-ms-file-parent-id"],
    version: result.headers["x-ms-version"],
    requestId: result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
  };
}

export function _renameDeserializeExceptionHeaders(result: PathUncheckedResponse): {
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

/** Renames a directory. By default, the destination is overwritten and if the destination already exists and has a read-only attribute set, the operation will fail. */
export async function rename(
  context: Client,
  renameSource: string,
  options: DirectoryRenameOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    requestServerEncrypted?: boolean;
    filePermissionKey?: string;
    fileAttributes?: string;
    fileCreatedOn?: Date;
    fileLastWriteOn?: Date;
    fileChangeOn?: Date;
    fileId?: string;
    fileParentId?: string;
    version: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      requestServerEncrypted?: boolean;
      filePermissionKey?: string;
      fileAttributes?: string;
      fileCreatedOn?: Date;
      fileLastWriteOn?: Date;
      fileChangeOn?: Date;
      fileId?: string;
      fileParentId?: string;
      version: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _renameSend(context, renameSource, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _renameDeserialize(result);
  const parsedHeaders = _renameDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _forceCloseHandlesSend(
  context: Client,
  handleId: string,
  options: DirectoryForceCloseHandlesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=forceclosehandles{?timeout,marker,sharesnapshot}",
    {
      timeout: options?.timeoutInSeconds,
      marker: options?.marker,
      sharesnapshot: options?.shareSnapshot,
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
        "x-ms-handle-id": handleId,
        ...(options?.recursive !== undefined ? { "x-ms-recursive": options?.recursive } : {}),
        ...(options?.allowTrailingDot !== undefined
          ? { "x-ms-allow-trailing-dot": options?.allowTrailingDot }
          : {}),
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _forceCloseHandlesDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._forceCloseHandlesDeserializeExceptionHeaders(result),
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

export function _forceCloseHandlesDeserializeHeaders(result: PathUncheckedResponse): {
  marker?: string;
  numberOfHandlesClosed: number;
  numberOfHandlesFailedToClose: number;
  version: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    marker:
      result.headers["x-ms-marker"] === undefined || result.headers["x-ms-marker"] === null
        ? result.headers["x-ms-marker"]
        : result.headers["x-ms-marker"],
    numberOfHandlesClosed: Number(result.headers["x-ms-number-of-handles-closed"]),
    numberOfHandlesFailedToClose: Number(result.headers["x-ms-number-of-handles-failed"]),
    version: result.headers["x-ms-version"],
    requestId: result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
  };
}

export function _forceCloseHandlesDeserializeExceptionHeaders(result: PathUncheckedResponse): {
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

/** Closes all handles open for given directory. */
export async function forceCloseHandles(
  context: Client,
  handleId: string,
  options: DirectoryForceCloseHandlesOptionalParams = { requestOptions: {} },
): Promise<
  {
    marker?: string;
    numberOfHandlesClosed: number;
    numberOfHandlesFailedToClose: number;
    version: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    {
      marker?: string;
      numberOfHandlesClosed: number;
      numberOfHandlesFailedToClose: number;
      version: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _forceCloseHandlesSend(context, handleId, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _forceCloseHandlesDeserialize(result);
  const parsedHeaders = _forceCloseHandlesDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _listHandlesSend(
  context: Client,
  options: DirectoryListHandlesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=listhandles{?marker,maxresults,timeout,sharesnapshot}",
    {
      marker: options?.marker,
      maxresults: options?.maxResults,
      timeout: options?.timeoutInSeconds,
      sharesnapshot: options?.shareSnapshot,
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
        ...(options?.recursive !== undefined ? { "x-ms-recursive": options?.recursive } : {}),
        ...(options?.allowTrailingDot !== undefined
          ? { "x-ms-allow-trailing-dot": options?.allowTrailingDot }
          : {}),
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listHandlesDeserialize(
  result: PathUncheckedResponse,
): Promise<ListHandlesResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._listHandlesDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return listHandlesResponseXmlDeserializer(result.body);
}

export function _listHandlesDeserializeHeaders(result: PathUncheckedResponse): {
  version: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
  contentType: "application/xml";
} {
  return {
    version: result.headers["x-ms-version"],
    requestId: result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
    contentType: result.headers["content-type"] as any,
  };
}

export function _listHandlesDeserializeExceptionHeaders(result: PathUncheckedResponse): {
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

/** Lists handles for directory. */
export async function listHandles(
  context: Client,
  options: DirectoryListHandlesOptionalParams = { requestOptions: {} },
): Promise<
  {
    version: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
    contentType: "application/xml";
  } & ListHandlesResponse &
    StorageCompatResponseInfo<
      ListHandlesResponse,
      {
        version: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
        contentType: "application/xml";
      }
    >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _listHandlesSend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  const parsedBody = await _listHandlesDeserialize(result);
  const parsedHeaders = _listHandlesDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, parsedBody, parsedHeaders);
}

export function _listFilesAndDirectoriesSegmentSend(
  context: Client,
  options: DirectoryListFilesAndDirectoriesSegmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=directory&comp=list{?prefix,sharesnapshot,marker,maxresults,include,timeout}",
    {
      prefix: options?.prefix,
      sharesnapshot: options?.shareSnapshot,
      marker: options?.marker,
      maxresults: options?.maxResults,
      include: !options?.include
        ? options?.include
        : options?.include.map((p: any) => {
            return p;
          }),
      timeout: options?.timeoutInSeconds,
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
        ...(options?.includeExtendedInfo !== undefined
          ? { "x-ms-file-extended-info": options?.includeExtendedInfo }
          : {}),
        ...(options?.allowTrailingDot !== undefined
          ? { "x-ms-allow-trailing-dot": options?.allowTrailingDot }
          : {}),
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listFilesAndDirectoriesSegmentDeserialize(
  result: PathUncheckedResponse,
): Promise<ListFilesAndDirectoriesSegmentResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._listFilesAndDirectoriesSegmentDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return listFilesAndDirectoriesSegmentResponseXmlDeserializer(result.body);
}

export function _listFilesAndDirectoriesSegmentDeserializeHeaders(result: PathUncheckedResponse): {
  version: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
  contentType: "application/xml";
} {
  return {
    version: result.headers["x-ms-version"],
    requestId: result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
    contentType: result.headers["content-type"] as any,
  };
}

export function _listFilesAndDirectoriesSegmentDeserializeExceptionHeaders(
  result: PathUncheckedResponse,
): { errorCode?: string; xMsCopySourceErrorCode?: string; xMsCopySourceStatusCode?: number } {
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

/** Returns a list of files and directories under the specified share or directory. It lists the contents only for a single level of the directory hierarchy. */
export async function listFilesAndDirectoriesSegment(
  context: Client,
  options: DirectoryListFilesAndDirectoriesSegmentOptionalParams = { requestOptions: {} },
): Promise<
  {
    version: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
    contentType: "application/xml";
  } & ListFilesAndDirectoriesSegmentResponse &
    StorageCompatResponseInfo<
      ListFilesAndDirectoriesSegmentResponse,
      {
        version: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
        contentType: "application/xml";
      }
    >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _listFilesAndDirectoriesSegmentSend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  const parsedBody = await _listFilesAndDirectoriesSegmentDeserialize(result);
  const parsedHeaders = _listFilesAndDirectoriesSegmentDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, parsedBody, parsedHeaders);
}

export function _setMetadataSend(
  context: Client,
  options: DirectorySetMetadataOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=directory&comp=metadata{?timeout}",
    {
      timeout: options?.timeoutInSeconds,
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
        ...(options?.allowTrailingDot !== undefined
          ? { "x-ms-allow-trailing-dot": options?.allowTrailingDot }
          : {}),
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _setMetadataDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._setMetadataDeserializeExceptionHeaders(result),
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

export function _setMetadataDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  requestServerEncrypted?: boolean;
  version: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    etag: result.headers["etag"],
    requestServerEncrypted:
      result.headers["x-ms-request-server-encrypted"] === undefined ||
      result.headers["x-ms-request-server-encrypted"] === null
        ? result.headers["x-ms-request-server-encrypted"]
        : result.headers["x-ms-request-server-encrypted"].trim().toLowerCase() === "true",
    version: result.headers["x-ms-version"],
    requestId: result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
  };
}

export function _setMetadataDeserializeExceptionHeaders(result: PathUncheckedResponse): {
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

/** Sets one or more user-defined name-value pairs for the specified directory. */
export async function setMetadata(
  context: Client,
  options: DirectorySetMetadataOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    requestServerEncrypted?: boolean;
    version: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      requestServerEncrypted?: boolean;
      version: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _setMetadataSend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _setMetadataDeserialize(result);
  const parsedHeaders = _setMetadataDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _setPropertiesSend(
  context: Client,
  options: DirectorySetPropertiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=directory&comp=properties{?timeout}",
    {
      timeout: options?.timeoutInSeconds,
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
        ...(options?.filePermission !== undefined
          ? { "x-ms-file-permission": options?.filePermission }
          : {}),
        ...(options?.filePermissionKey !== undefined
          ? { "x-ms-file-permission-key": options?.filePermissionKey }
          : {}),
        ...(options?.fileAttributes !== undefined
          ? { "x-ms-file-attributes": options?.fileAttributes }
          : {}),
        ...(options?.fileCreatedOn !== undefined
          ? { "x-ms-file-creation-time": options?.fileCreatedOn }
          : {}),
        ...(options?.fileLastWriteOn !== undefined
          ? { "x-ms-file-last-write-time": options?.fileLastWriteOn }
          : {}),
        ...(options?.fileChangeOn !== undefined
          ? { "x-ms-file-change-time": options?.fileChangeOn }
          : {}),
        ...(options?.filePermissionFormat !== undefined
          ? { "x-ms-file-permission-format": options?.filePermissionFormat }
          : {}),
        ...(options?.allowTrailingDot !== undefined
          ? { "x-ms-allow-trailing-dot": options?.allowTrailingDot }
          : {}),
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        ...(options?.owner !== undefined ? { "x-ms-owner": options?.owner } : {}),
        ...(options?.group !== undefined ? { "x-ms-group": options?.group } : {}),
        ...(options?.fileMode !== undefined ? { "x-ms-mode": options?.fileMode } : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _setPropertiesDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._setPropertiesDeserializeExceptionHeaders(result),
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

export function _setPropertiesDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  requestServerEncrypted?: boolean;
  filePermissionKey?: string;
  fileAttributes?: string;
  fileCreatedOn?: Date;
  fileLastWriteOn?: Date;
  fileChangeOn?: Date;
  fileId?: string;
  fileParentId?: string;
  fileMode?: string;
  owner?: string;
  group?: string;
  version: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    requestServerEncrypted:
      result.headers["x-ms-request-server-encrypted"] === undefined ||
      result.headers["x-ms-request-server-encrypted"] === null
        ? result.headers["x-ms-request-server-encrypted"]
        : result.headers["x-ms-request-server-encrypted"].trim().toLowerCase() === "true",
    filePermissionKey:
      result.headers["x-ms-file-permission-key"] === undefined ||
      result.headers["x-ms-file-permission-key"] === null
        ? result.headers["x-ms-file-permission-key"]
        : result.headers["x-ms-file-permission-key"],
    fileAttributes:
      result.headers["x-ms-file-attributes"] === undefined ||
      result.headers["x-ms-file-attributes"] === null
        ? result.headers["x-ms-file-attributes"]
        : result.headers["x-ms-file-attributes"],
    fileCreatedOn:
      result.headers["x-ms-file-creation-time"] === undefined ||
      result.headers["x-ms-file-creation-time"] === null
        ? result.headers["x-ms-file-creation-time"]
        : new Date(result.headers["x-ms-file-creation-time"]),
    fileLastWriteOn:
      result.headers["x-ms-file-last-write-time"] === undefined ||
      result.headers["x-ms-file-last-write-time"] === null
        ? result.headers["x-ms-file-last-write-time"]
        : new Date(result.headers["x-ms-file-last-write-time"]),
    fileChangeOn:
      result.headers["x-ms-file-change-time"] === undefined ||
      result.headers["x-ms-file-change-time"] === null
        ? result.headers["x-ms-file-change-time"]
        : new Date(result.headers["x-ms-file-change-time"]),
    fileId:
      result.headers["x-ms-file-id"] === undefined || result.headers["x-ms-file-id"] === null
        ? result.headers["x-ms-file-id"]
        : result.headers["x-ms-file-id"],
    fileParentId:
      result.headers["x-ms-file-parent-id"] === undefined ||
      result.headers["x-ms-file-parent-id"] === null
        ? result.headers["x-ms-file-parent-id"]
        : result.headers["x-ms-file-parent-id"],
    fileMode:
      result.headers["x-ms-mode"] === undefined || result.headers["x-ms-mode"] === null
        ? result.headers["x-ms-mode"]
        : result.headers["x-ms-mode"],
    owner:
      result.headers["x-ms-owner"] === undefined || result.headers["x-ms-owner"] === null
        ? result.headers["x-ms-owner"]
        : result.headers["x-ms-owner"],
    group:
      result.headers["x-ms-group"] === undefined || result.headers["x-ms-group"] === null
        ? result.headers["x-ms-group"]
        : result.headers["x-ms-group"],
    version: result.headers["x-ms-version"],
    requestId: result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
  };
}

export function _setPropertiesDeserializeExceptionHeaders(result: PathUncheckedResponse): {
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

/** Sets properties for the specified directory. */
export async function setProperties(
  context: Client,
  options: DirectorySetPropertiesOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    requestServerEncrypted?: boolean;
    filePermissionKey?: string;
    fileAttributes?: string;
    fileCreatedOn?: Date;
    fileLastWriteOn?: Date;
    fileChangeOn?: Date;
    fileId?: string;
    fileParentId?: string;
    fileMode?: string;
    owner?: string;
    group?: string;
    version: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      requestServerEncrypted?: boolean;
      filePermissionKey?: string;
      fileAttributes?: string;
      fileCreatedOn?: Date;
      fileLastWriteOn?: Date;
      fileChangeOn?: Date;
      fileId?: string;
      fileParentId?: string;
      fileMode?: string;
      owner?: string;
      group?: string;
      version: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _setPropertiesSend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _setPropertiesDeserialize(result);
  const parsedHeaders = _setPropertiesDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _$deleteSend(
  context: Client,
  options: DirectoryDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=directory{?timeout}",
    {
      timeout: options?.timeoutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        ...(options?.allowTrailingDot !== undefined
          ? { "x-ms-allow-trailing-dot": options?.allowTrailingDot }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = { ...(error.details as any), ..._$deleteDeserializeExceptionHeaders(result) };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _$deleteDeserializeHeaders(result: PathUncheckedResponse): {
  version: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    version: result.headers["x-ms-version"],
    requestId: result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
  };
}

export function _$deleteDeserializeExceptionHeaders(result: PathUncheckedResponse): {
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

/** Removes the specified empty directory. Note that the directory must be empty before it can be deleted. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  options: DirectoryDeleteOptionalParams = { requestOptions: {} },
): Promise<
  {
    version: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    { version: string; requestId: string; clientRequestId?: string; date: Date }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _$deleteSend(context, { ...options, onResponse: _storageCompat.onResponse });
  await _$deleteDeserialize(result);
  const parsedHeaders = _$deleteDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _getPropertiesSend(
  context: Client,
  options: DirectoryGetPropertiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=directory{?sharesnapshot,timeout}",
    {
      sharesnapshot: options?.shareSnapshot,
      timeout: options?.timeoutInSeconds,
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
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        ...(options?.allowTrailingDot !== undefined
          ? { "x-ms-allow-trailing-dot": options?.allowTrailingDot }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getPropertiesDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._getPropertiesDeserializeExceptionHeaders(result),
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

export function _getPropertiesDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  filePermissionKey?: string;
  fileAttributes?: string;
  fileCreatedOn?: Date;
  fileLastWriteOn?: Date;
  fileChangeOn?: Date;
  fileId?: string;
  fileParentId?: string;
  serverEncrypted?: boolean;
  fileMode?: string;
  owner?: string;
  group?: string;
  nfsFileType?: NfsFileType;
  version: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    filePermissionKey:
      result.headers["x-ms-file-permission-key"] === undefined ||
      result.headers["x-ms-file-permission-key"] === null
        ? result.headers["x-ms-file-permission-key"]
        : result.headers["x-ms-file-permission-key"],
    fileAttributes:
      result.headers["x-ms-file-attributes"] === undefined ||
      result.headers["x-ms-file-attributes"] === null
        ? result.headers["x-ms-file-attributes"]
        : result.headers["x-ms-file-attributes"],
    fileCreatedOn:
      result.headers["x-ms-file-creation-time"] === undefined ||
      result.headers["x-ms-file-creation-time"] === null
        ? result.headers["x-ms-file-creation-time"]
        : new Date(result.headers["x-ms-file-creation-time"]),
    fileLastWriteOn:
      result.headers["x-ms-file-last-write-time"] === undefined ||
      result.headers["x-ms-file-last-write-time"] === null
        ? result.headers["x-ms-file-last-write-time"]
        : new Date(result.headers["x-ms-file-last-write-time"]),
    fileChangeOn:
      result.headers["x-ms-file-change-time"] === undefined ||
      result.headers["x-ms-file-change-time"] === null
        ? result.headers["x-ms-file-change-time"]
        : new Date(result.headers["x-ms-file-change-time"]),
    fileId:
      result.headers["x-ms-file-id"] === undefined || result.headers["x-ms-file-id"] === null
        ? result.headers["x-ms-file-id"]
        : result.headers["x-ms-file-id"],
    fileParentId:
      result.headers["x-ms-file-parent-id"] === undefined ||
      result.headers["x-ms-file-parent-id"] === null
        ? result.headers["x-ms-file-parent-id"]
        : result.headers["x-ms-file-parent-id"],
    serverEncrypted:
      result.headers["x-ms-server-encrypted"] === undefined ||
      result.headers["x-ms-server-encrypted"] === null
        ? result.headers["x-ms-server-encrypted"]
        : result.headers["x-ms-server-encrypted"].trim().toLowerCase() === "true",
    fileMode:
      result.headers["x-ms-mode"] === undefined || result.headers["x-ms-mode"] === null
        ? result.headers["x-ms-mode"]
        : result.headers["x-ms-mode"],
    owner:
      result.headers["x-ms-owner"] === undefined || result.headers["x-ms-owner"] === null
        ? result.headers["x-ms-owner"]
        : result.headers["x-ms-owner"],
    group:
      result.headers["x-ms-group"] === undefined || result.headers["x-ms-group"] === null
        ? result.headers["x-ms-group"]
        : result.headers["x-ms-group"],
    nfsFileType: result.headers["x-ms-file-file-type"] as any,
    version: result.headers["x-ms-version"],
    requestId: result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
  };
}

export function _getPropertiesDeserializeExceptionHeaders(result: PathUncheckedResponse): {
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

/** Returns all system properties for the specified directory, and can also be used to check the existence of a directory. */
export async function getProperties(
  context: Client,
  options: DirectoryGetPropertiesOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    filePermissionKey?: string;
    fileAttributes?: string;
    fileCreatedOn?: Date;
    fileLastWriteOn?: Date;
    fileChangeOn?: Date;
    fileId?: string;
    fileParentId?: string;
    serverEncrypted?: boolean;
    fileMode?: string;
    owner?: string;
    group?: string;
    nfsFileType?: NfsFileType;
    version: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      filePermissionKey?: string;
      fileAttributes?: string;
      fileCreatedOn?: Date;
      fileLastWriteOn?: Date;
      fileChangeOn?: Date;
      fileId?: string;
      fileParentId?: string;
      serverEncrypted?: boolean;
      fileMode?: string;
      owner?: string;
      group?: string;
      nfsFileType?: NfsFileType;
      version: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _getPropertiesSend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _getPropertiesDeserialize(result);
  const parsedHeaders = _getPropertiesDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _createSend(
  context: Client,
  options: DirectoryCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=directory{?timeout}",
    {
      timeout: options?.timeoutInSeconds,
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
        ...(options?.filePermission !== undefined
          ? { "x-ms-file-permission": options?.filePermission }
          : {}),
        ...(options?.filePermissionKey !== undefined
          ? { "x-ms-file-permission-key": options?.filePermissionKey }
          : {}),
        ...(options?.fileAttributes !== undefined
          ? { "x-ms-file-attributes": options?.fileAttributes }
          : {}),
        ...(options?.fileCreatedOn !== undefined
          ? { "x-ms-file-creation-time": options?.fileCreatedOn }
          : {}),
        ...(options?.fileLastWriteOn !== undefined
          ? { "x-ms-file-last-write-time": options?.fileLastWriteOn }
          : {}),
        ...(options?.fileChangeOn !== undefined
          ? { "x-ms-file-change-time": options?.fileChangeOn }
          : {}),
        ...(options?.filePermissionFormat !== undefined
          ? { "x-ms-file-permission-format": options?.filePermissionFormat }
          : {}),
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        ...(options?.owner !== undefined ? { "x-ms-owner": options?.owner } : {}),
        ...(options?.group !== undefined ? { "x-ms-group": options?.group } : {}),
        ...(options?.fileMode !== undefined ? { "x-ms-mode": options?.fileMode } : {}),
        ...(options?.filePropertySemantics !== undefined
          ? { "x-ms-file-property-semantics": options?.filePropertySemantics }
          : {}),
        ...(options?.allowTrailingDot !== undefined
          ? { "x-ms-allow-trailing-dot": options?.allowTrailingDot }
          : {}),
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
  requestServerEncrypted?: boolean;
  filePermissionKey?: string;
  fileAttributes?: string;
  fileCreatedOn?: Date;
  fileLastWriteOn?: Date;
  fileChangeOn?: Date;
  fileId?: string;
  fileParentId?: string;
  fileMode?: string;
  owner?: string;
  group?: string;
  nfsFileType?: NfsFileType;
  version: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    requestServerEncrypted:
      result.headers["x-ms-request-server-encrypted"] === undefined ||
      result.headers["x-ms-request-server-encrypted"] === null
        ? result.headers["x-ms-request-server-encrypted"]
        : result.headers["x-ms-request-server-encrypted"].trim().toLowerCase() === "true",
    filePermissionKey:
      result.headers["x-ms-file-permission-key"] === undefined ||
      result.headers["x-ms-file-permission-key"] === null
        ? result.headers["x-ms-file-permission-key"]
        : result.headers["x-ms-file-permission-key"],
    fileAttributes:
      result.headers["x-ms-file-attributes"] === undefined ||
      result.headers["x-ms-file-attributes"] === null
        ? result.headers["x-ms-file-attributes"]
        : result.headers["x-ms-file-attributes"],
    fileCreatedOn:
      result.headers["x-ms-file-creation-time"] === undefined ||
      result.headers["x-ms-file-creation-time"] === null
        ? result.headers["x-ms-file-creation-time"]
        : new Date(result.headers["x-ms-file-creation-time"]),
    fileLastWriteOn:
      result.headers["x-ms-file-last-write-time"] === undefined ||
      result.headers["x-ms-file-last-write-time"] === null
        ? result.headers["x-ms-file-last-write-time"]
        : new Date(result.headers["x-ms-file-last-write-time"]),
    fileChangeOn:
      result.headers["x-ms-file-change-time"] === undefined ||
      result.headers["x-ms-file-change-time"] === null
        ? result.headers["x-ms-file-change-time"]
        : new Date(result.headers["x-ms-file-change-time"]),
    fileId:
      result.headers["x-ms-file-id"] === undefined || result.headers["x-ms-file-id"] === null
        ? result.headers["x-ms-file-id"]
        : result.headers["x-ms-file-id"],
    fileParentId:
      result.headers["x-ms-file-parent-id"] === undefined ||
      result.headers["x-ms-file-parent-id"] === null
        ? result.headers["x-ms-file-parent-id"]
        : result.headers["x-ms-file-parent-id"],
    fileMode:
      result.headers["x-ms-mode"] === undefined || result.headers["x-ms-mode"] === null
        ? result.headers["x-ms-mode"]
        : result.headers["x-ms-mode"],
    owner:
      result.headers["x-ms-owner"] === undefined || result.headers["x-ms-owner"] === null
        ? result.headers["x-ms-owner"]
        : result.headers["x-ms-owner"],
    group:
      result.headers["x-ms-group"] === undefined || result.headers["x-ms-group"] === null
        ? result.headers["x-ms-group"]
        : result.headers["x-ms-group"],
    nfsFileType: result.headers["x-ms-file-file-type"] as any,
    version: result.headers["x-ms-version"],
    requestId: result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
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

/** Creates a new directory under the specified share or parent directory. */
export async function create(
  context: Client,
  options: DirectoryCreateOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    requestServerEncrypted?: boolean;
    filePermissionKey?: string;
    fileAttributes?: string;
    fileCreatedOn?: Date;
    fileLastWriteOn?: Date;
    fileChangeOn?: Date;
    fileId?: string;
    fileParentId?: string;
    fileMode?: string;
    owner?: string;
    group?: string;
    nfsFileType?: NfsFileType;
    version: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      requestServerEncrypted?: boolean;
      filePermissionKey?: string;
      fileAttributes?: string;
      fileCreatedOn?: Date;
      fileLastWriteOn?: Date;
      fileChangeOn?: Date;
      fileId?: string;
      fileParentId?: string;
      fileMode?: string;
      owner?: string;
      group?: string;
      nfsFileType?: NfsFileType;
      version: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _createSend(context, { ...options, onResponse: _storageCompat.onResponse });
  await _createDeserialize(result);
  const parsedHeaders = _createDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}
