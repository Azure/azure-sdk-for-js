// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FileContext as Client } from "../index.js";
import {
  errorXmlDeserializer,
  ListHandlesResponse,
  listHandlesResponseXmlDeserializer,
  ShareFileRangeList,
  shareFileRangeListXmlDeserializer,
  NfsFileType,
  CopyStatus,
  FileRangeWriteType,
  FileRangeWriteFromUrlType,
} from "../../models/azure/storage/files/shares/models.js";
import {
  StorageCompatResponseInfo,
  createStorageCompatOnResponse,
  addStorageCompatResponse,
} from "../../static-helpers/storageCompatResponse.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  FileCreateHardLinkOptionalParams,
  FileGetSymbolicLinkOptionalParams,
  FileCreateSymbolicLinkOptionalParams,
  FileRenameOptionalParams,
  FileForceCloseHandlesOptionalParams,
  FileListHandlesOptionalParams,
  FileAbortCopyOptionalParams,
  FileStartCopyOptionalParams,
  FileGetRangeListOptionalParams,
  FileUploadRangeFromUrlOptionalParams,
  FileUploadRangeOptionalParams,
  FileBreakLeaseOptionalParams,
  FileChangeLeaseOptionalParams,
  FileReleaseLeaseOptionalParams,
  FileAcquireLeaseOptionalParams,
  FileSetMetadataOptionalParams,
  FileSetHttpHeadersOptionalParams,
  FileDeleteOptionalParams,
  FileGetPropertiesOptionalParams,
  FileDownloadOptionalParams,
  FileCreateOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { uint8ArrayToString, stringToUint8Array } from "@azure/core-util";

export function _createHardLinkSend(
  context: Client,
  targetFile: string,
  options: FileCreateHardLinkOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=hardlink{?timeout}",
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
        "x-ms-type": "file",
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        "x-ms-file-target-file": targetFile,
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _createHardLinkDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._createHardLinkDeserializeExceptionHeaders(result),
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

export function _createHardLinkDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  fileCreationTime?: string;
  fileLastWriteTime?: string;
  fileChangeTime?: string;
  fileId?: string;
  fileParentId?: string;
  linkCount?: number;
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
    fileCreationTime:
      result.headers["x-ms-file-creation-time"] === undefined ||
      result.headers["x-ms-file-creation-time"] === null
        ? result.headers["x-ms-file-creation-time"]
        : result.headers["x-ms-file-creation-time"],
    fileLastWriteTime:
      result.headers["x-ms-file-last-write-time"] === undefined ||
      result.headers["x-ms-file-last-write-time"] === null
        ? result.headers["x-ms-file-last-write-time"]
        : result.headers["x-ms-file-last-write-time"],
    fileChangeTime:
      result.headers["x-ms-file-change-time"] === undefined ||
      result.headers["x-ms-file-change-time"] === null
        ? result.headers["x-ms-file-change-time"]
        : result.headers["x-ms-file-change-time"],
    fileId:
      result.headers["x-ms-file-id"] === undefined || result.headers["x-ms-file-id"] === null
        ? result.headers["x-ms-file-id"]
        : result.headers["x-ms-file-id"],
    fileParentId:
      result.headers["x-ms-file-parent-id"] === undefined ||
      result.headers["x-ms-file-parent-id"] === null
        ? result.headers["x-ms-file-parent-id"]
        : result.headers["x-ms-file-parent-id"],
    linkCount:
      result.headers["x-ms-link-count"] === undefined || result.headers["x-ms-link-count"] === null
        ? result.headers["x-ms-link-count"]
        : Number(result.headers["x-ms-link-count"]),
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

export function _createHardLinkDeserializeExceptionHeaders(result: PathUncheckedResponse): {
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

/** Creates a hard link to a target file. NFS only. */
export async function createHardLink(
  context: Client,
  targetFile: string,
  options: FileCreateHardLinkOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    fileCreationTime?: string;
    fileLastWriteTime?: string;
    fileChangeTime?: string;
    fileId?: string;
    fileParentId?: string;
    linkCount?: number;
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
      fileCreationTime?: string;
      fileLastWriteTime?: string;
      fileChangeTime?: string;
      fileId?: string;
      fileParentId?: string;
      linkCount?: number;
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
  const result = await _createHardLinkSend(context, targetFile, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _createHardLinkDeserialize(result);
  const parsedHeaders = _createHardLinkDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _getSymbolicLinkSend(
  context: Client,
  options: FileGetSymbolicLinkOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=symboliclink{?timeout,sharesnapshot}",
    {
      timeout: options?.timeoutInSeconds,
      sharesnapshot: options?.sharesnapshot,
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
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getSymbolicLinkDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._getSymbolicLinkDeserializeExceptionHeaders(result),
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

export function _getSymbolicLinkDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  linkText: string;
  version: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    linkText: result.headers["x-ms-link-text"],
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

export function _getSymbolicLinkDeserializeExceptionHeaders(result: PathUncheckedResponse): {
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

/** Returns the target of a symbolic link. NFS only. */
export async function getSymbolicLink(
  context: Client,
  options: FileGetSymbolicLinkOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    linkText: string;
    version: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      linkText: string;
      version: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _getSymbolicLinkSend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _getSymbolicLinkDeserialize(result);
  const parsedHeaders = _getSymbolicLinkDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _createSymbolicLinkSend(
  context: Client,
  linkText: string,
  options: FileCreateSymbolicLinkOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=symboliclink{?timeout}",
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
        ...(options?.fileCreationTime !== undefined
          ? { "x-ms-file-creation-time": options?.fileCreationTime }
          : {}),
        ...(options?.fileLastWriteTime !== undefined
          ? { "x-ms-file-last-write-time": options?.fileLastWriteTime }
          : {}),
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.owner !== undefined ? { "x-ms-owner": options?.owner } : {}),
        ...(options?.group !== undefined ? { "x-ms-group": options?.group } : {}),
        "x-ms-link-text": linkText,
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _createSymbolicLinkDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._createSymbolicLinkDeserializeExceptionHeaders(result),
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

export function _createSymbolicLinkDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  fileCreationTime?: string;
  fileLastWriteTime?: string;
  fileChangeTime?: string;
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
    fileCreationTime:
      result.headers["x-ms-file-creation-time"] === undefined ||
      result.headers["x-ms-file-creation-time"] === null
        ? result.headers["x-ms-file-creation-time"]
        : result.headers["x-ms-file-creation-time"],
    fileLastWriteTime:
      result.headers["x-ms-file-last-write-time"] === undefined ||
      result.headers["x-ms-file-last-write-time"] === null
        ? result.headers["x-ms-file-last-write-time"]
        : result.headers["x-ms-file-last-write-time"],
    fileChangeTime:
      result.headers["x-ms-file-change-time"] === undefined ||
      result.headers["x-ms-file-change-time"] === null
        ? result.headers["x-ms-file-change-time"]
        : result.headers["x-ms-file-change-time"],
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

export function _createSymbolicLinkDeserializeExceptionHeaders(result: PathUncheckedResponse): {
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

/** Creates a symbolic link to a target file. NFS only. */
export async function createSymbolicLink(
  context: Client,
  linkText: string,
  options: FileCreateSymbolicLinkOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    fileCreationTime?: string;
    fileLastWriteTime?: string;
    fileChangeTime?: string;
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
      fileCreationTime?: string;
      fileLastWriteTime?: string;
      fileChangeTime?: string;
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
  const result = await _createSymbolicLinkSend(context, linkText, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _createSymbolicLinkDeserialize(result);
  const parsedHeaders = _createSymbolicLinkDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _renameSend(
  context: Client,
  renameSource: string,
  options: FileRenameOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=rename{?timeout}",
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
        ...(options?.fileContentType !== undefined
          ? { "x-ms-content-type": options?.fileContentType }
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

/** Renames a file. By default, the destination is overwritten and if the destination already exists and has a read-only attribute set, the operation will fail. */
export async function rename(
  context: Client,
  renameSource: string,
  options: FileRenameOptionalParams = { requestOptions: {} },
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
  options: FileForceCloseHandlesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=forceclosehandles{?timeout,marker,sharesnapshot}",
    {
      timeout: options?.timeoutInSeconds,
      marker: options?.marker,
      sharesnapshot: options?.sharesnapshot,
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

/** Closes all handles open for given file. */
export async function forceCloseHandles(
  context: Client,
  handleId: string,
  options: FileForceCloseHandlesOptionalParams = { requestOptions: {} },
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
  options: FileListHandlesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=listhandles{?marker,maxresults,timeout,sharesnapshot}",
    {
      marker: options?.marker,
      maxresults: options?.maxResults,
      timeout: options?.timeoutInSeconds,
      sharesnapshot: options?.sharesnapshot,
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

/** Lists handles for file. */
export async function listHandles(
  context: Client,
  options: FileListHandlesOptionalParams = { requestOptions: {} },
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

export function _abortCopySend(
  context: Client,
  copyid: string,
  options: FileAbortCopyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=copy{?copyid,timeout}",
    {
      copyid: copyid,
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
        "x-ms-copy-action": "abort",
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
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

export async function _abortCopyDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = { ...(error.details as any), ..._abortCopyDeserializeExceptionHeaders(result) };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _abortCopyDeserializeHeaders(result: PathUncheckedResponse): {
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

export function _abortCopyDeserializeExceptionHeaders(result: PathUncheckedResponse): {
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

/** Aborts a pending Copy File operation, and leaves a destination file with zero length and full metadata. */
export async function abortCopy(
  context: Client,
  copyid: string,
  options: FileAbortCopyOptionalParams = { requestOptions: {} },
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
  const result = await _abortCopySend(context, copyid, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _abortCopyDeserialize(result);
  const parsedHeaders = _abortCopyDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _startCopySend(
  context: Client,
  copySource: string,
  options: FileStartCopyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "{?timeout}",
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
        "x-ms-copy-source": copySource,
        ...(options?.filePermission !== undefined
          ? { "x-ms-file-permission": options?.filePermission }
          : {}),
        ...(options?.filePermissionFormat !== undefined
          ? { "x-ms-file-permission-format": options?.filePermissionFormat }
          : {}),
        ...(options?.filePermissionKey !== undefined
          ? { "x-ms-file-permission-key": options?.filePermissionKey }
          : {}),
        ...(options?.filePermissionCopyMode !== undefined
          ? { "x-ms-file-permission-copy-mode": options?.filePermissionCopyMode }
          : {}),
        ...(options?.ignoreReadOnly !== undefined
          ? { "x-ms-file-copy-ignore-readonly": options?.ignoreReadOnly }
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
        ...(options?.setArchiveAttribute !== undefined
          ? { "x-ms-file-copy-set-archive": options?.setArchiveAttribute }
          : {}),
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.allowTrailingDot !== undefined
          ? { "x-ms-allow-trailing-dot": options?.allowTrailingDot }
          : {}),
        ...(options?.allowSourceTrailingDot !== undefined
          ? { "x-ms-source-allow-trailing-dot": options?.allowSourceTrailingDot }
          : {}),
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        ...(options?.owner !== undefined ? { "x-ms-owner": options?.owner } : {}),
        ...(options?.group !== undefined ? { "x-ms-group": options?.group } : {}),
        ...(options?.fileMode !== undefined ? { "x-ms-mode": options?.fileMode } : {}),
        ...(options?.fileModeCopyMode !== undefined
          ? { "x-ms-file-mode-copy-mode": options?.fileModeCopyMode }
          : {}),
        ...(options?.fileOwnerCopyMode !== undefined
          ? { "x-ms-file-owner-copy-mode": options?.fileOwnerCopyMode }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _startCopyDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = { ...(error.details as any), ..._startCopyDeserializeExceptionHeaders(result) };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _startCopyDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  copyId: string;
  copyStatus: CopyStatus;
  version: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    copyId: result.headers["x-ms-copy-id"],
    copyStatus: result.headers["x-ms-copy-status"] as any,
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

export function _startCopyDeserializeExceptionHeaders(result: PathUncheckedResponse): {
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

/** Copies a blob or file to a destination file within the storage account. */
export async function startCopy(
  context: Client,
  copySource: string,
  options: FileStartCopyOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    copyId: string;
    copyStatus: CopyStatus;
    version: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      copyId: string;
      copyStatus: CopyStatus;
      version: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _startCopySend(context, copySource, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _startCopyDeserialize(result);
  const parsedHeaders = _startCopyDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _getRangeListSend(
  context: Client,
  options: FileGetRangeListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=rangelist{?sharesnapshot,prevsharesnapshot,timeout}",
    {
      sharesnapshot: options?.sharesnapshot,
      prevsharesnapshot: options?.prevsharesnapshot,
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
        ...(options?.range !== undefined ? { range: options?.range } : {}),
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.allowTrailingDot !== undefined
          ? { "x-ms-allow-trailing-dot": options?.allowTrailingDot }
          : {}),
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        ...(options?.supportRename !== undefined
          ? { "x-ms-file-support-rename": options?.supportRename }
          : {}),
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getRangeListDeserialize(
  result: PathUncheckedResponse,
): Promise<ShareFileRangeList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._getRangeListDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return shareFileRangeListXmlDeserializer(result.body);
}

export function _getRangeListDeserializeHeaders(result: PathUncheckedResponse): {
  lastModified: Date;
  etag: string;
  fileContentLength: number;
  version: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
  contentType: "application/xml";
} {
  return {
    lastModified: new Date(result.headers["last-modified"]),
    etag: result.headers["etag"],
    fileContentLength: Number(result.headers["x-ms-content-length"]),
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

export function _getRangeListDeserializeExceptionHeaders(result: PathUncheckedResponse): {
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

/** Returns the list of valid page ranges for a file or snapshot of a file. */
export async function getRangeList(
  context: Client,
  options: FileGetRangeListOptionalParams = { requestOptions: {} },
): Promise<
  {
    lastModified: Date;
    etag: string;
    fileContentLength: number;
    version: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
    contentType: "application/xml";
  } & ShareFileRangeList &
    StorageCompatResponseInfo<
      ShareFileRangeList,
      {
        lastModified: Date;
        etag: string;
        fileContentLength: number;
        version: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
        contentType: "application/xml";
      }
    >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _getRangeListSend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  const parsedBody = await _getRangeListDeserialize(result);
  const parsedHeaders = _getRangeListDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, parsedBody, parsedHeaders);
}

export function _uploadRangeFromUrlSend(
  context: Client,
  range: string,
  copySource: string,
  fileRangeWriteFromUrl: FileRangeWriteFromUrlType,
  contentLength: number,
  options: FileUploadRangeFromUrlOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=range{?timeout}",
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
        range: range,
        "x-ms-copy-source": copySource,
        ...(options?.sourceRange !== undefined
          ? { "x-ms-source-range": options?.sourceRange }
          : {}),
        "x-ms-write": fileRangeWriteFromUrl,
        "content-length": contentLength,
        ...(options?.sourceContentCrc64 !== undefined
          ? { "x-ms-source-content-crc64": options?.sourceContentCrc64 }
          : {}),
        ...(options?.sourceIfMatchCrc64 !== undefined
          ? { "x-ms-source-if-match-crc64": options?.sourceIfMatchCrc64 }
          : {}),
        ...(options?.sourceIfNoneMatchCrc64 !== undefined
          ? { "x-ms-source-if-none-match-crc64": options?.sourceIfNoneMatchCrc64 }
          : {}),
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.copySourceAuthorization !== undefined
          ? { "x-ms-copy-source-authorization": options?.copySourceAuthorization }
          : {}),
        ...(options?.fileLastWrittenMode !== undefined
          ? { "x-ms-file-last-write-time": options?.fileLastWrittenMode }
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

export async function _uploadRangeFromUrlDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._uploadRangeFromUrlDeserializeExceptionHeaders(result),
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

export function _uploadRangeFromUrlDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  contentCrc64?: string;
  requestServerEncrypted?: boolean;
  fileLastWriteTime?: Date;
  version: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    contentCrc64:
      result.headers["x-ms-content-crc64"] === undefined ||
      result.headers["x-ms-content-crc64"] === null
        ? result.headers["x-ms-content-crc64"]
        : result.headers["x-ms-content-crc64"],
    requestServerEncrypted:
      result.headers["x-ms-request-server-encrypted"] === undefined ||
      result.headers["x-ms-request-server-encrypted"] === null
        ? result.headers["x-ms-request-server-encrypted"]
        : result.headers["x-ms-request-server-encrypted"].trim().toLowerCase() === "true",
    fileLastWriteTime:
      result.headers["x-ms-file-last-write-time"] === undefined ||
      result.headers["x-ms-file-last-write-time"] === null
        ? result.headers["x-ms-file-last-write-time"]
        : new Date(result.headers["x-ms-file-last-write-time"]),
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

export function _uploadRangeFromUrlDeserializeExceptionHeaders(result: PathUncheckedResponse): {
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

/** Upload a range of bytes to a file where the contents are read from a URL. */
export async function uploadRangeFromUrl(
  context: Client,
  range: string,
  copySource: string,
  fileRangeWriteFromUrl: FileRangeWriteFromUrlType,
  contentLength: number,
  options: FileUploadRangeFromUrlOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    contentCrc64?: string;
    requestServerEncrypted?: boolean;
    fileLastWriteTime?: Date;
    version: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      contentCrc64?: string;
      requestServerEncrypted?: boolean;
      fileLastWriteTime?: Date;
      version: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _uploadRangeFromUrlSend(
    context,
    range,
    copySource,
    fileRangeWriteFromUrl,
    contentLength,
    { ...options, onResponse: _storageCompat.onResponse },
  );
  await _uploadRangeFromUrlDeserialize(result);
  const parsedHeaders = _uploadRangeFromUrlDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _uploadRangeSend(
  context: Client,
  range: string,
  fileRangeWrite: FileRangeWriteType,
  contentLength: number,
  options: FileUploadRangeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=range{?timeout}",
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
      contentType: "application/octet-stream",
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        range: range,
        "x-ms-write": fileRangeWrite,
        "content-length": contentLength,
        ...(options?.contentMD5 !== undefined
          ? {
              "content-md5": !options?.contentMD5
                ? options?.contentMD5
                : uint8ArrayToString(options?.contentMD5, "base64"),
            }
          : {}),
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.fileLastWrittenMode !== undefined
          ? { "x-ms-file-last-write-time": options?.fileLastWrittenMode }
          : {}),
        ...(options?.allowTrailingDot !== undefined
          ? { "x-ms-allow-trailing-dot": options?.allowTrailingDot }
          : {}),
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        ...(options?.structuredBodyType !== undefined
          ? { "x-ms-structured-body": options?.structuredBodyType }
          : {}),
        ...(options?.structuredContentLength !== undefined
          ? { "x-ms-structured-content-length": options?.structuredContentLength }
          : {}),
        ...options.requestOptions?.headers,
      },
      body: !options["body"] ? options["body"] : options["body"],
    });
}

export async function _uploadRangeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._uploadRangeDeserializeExceptionHeaders(result),
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

export function _uploadRangeDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  contentMD5?: Uint8Array;
  requestServerEncrypted?: boolean;
  fileLastWriteTime?: Date;
  structuredBodyType?: string;
  version: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    contentMD5:
      result.headers["content-md5"] === undefined || result.headers["content-md5"] === null
        ? result.headers["content-md5"]
        : typeof result.headers["content-md5"] === "string"
          ? stringToUint8Array(result.headers["content-md5"], "base64")
          : result.headers["content-md5"],
    requestServerEncrypted:
      result.headers["x-ms-request-server-encrypted"] === undefined ||
      result.headers["x-ms-request-server-encrypted"] === null
        ? result.headers["x-ms-request-server-encrypted"]
        : result.headers["x-ms-request-server-encrypted"].trim().toLowerCase() === "true",
    fileLastWriteTime:
      result.headers["x-ms-file-last-write-time"] === undefined ||
      result.headers["x-ms-file-last-write-time"] === null
        ? result.headers["x-ms-file-last-write-time"]
        : new Date(result.headers["x-ms-file-last-write-time"]),
    structuredBodyType:
      result.headers["x-ms-structured-body"] === undefined ||
      result.headers["x-ms-structured-body"] === null
        ? result.headers["x-ms-structured-body"]
        : result.headers["x-ms-structured-body"],
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

export function _uploadRangeDeserializeExceptionHeaders(result: PathUncheckedResponse): {
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

/** Upload a range of bytes to a file. */
export async function uploadRange(
  context: Client,
  range: string,
  fileRangeWrite: FileRangeWriteType,
  contentLength: number,
  options: FileUploadRangeOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    contentMD5?: Uint8Array;
    requestServerEncrypted?: boolean;
    fileLastWriteTime?: Date;
    structuredBodyType?: string;
    version: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      contentMD5?: Uint8Array;
      requestServerEncrypted?: boolean;
      fileLastWriteTime?: Date;
      structuredBodyType?: string;
      version: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _uploadRangeSend(context, range, fileRangeWrite, contentLength, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _uploadRangeDeserialize(result);
  const parsedHeaders = _uploadRangeDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _breakLeaseSend(
  context: Client,
  options: FileBreakLeaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=lease{?timeout}",
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
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        "x-ms-lease-action": "break",
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

export async function _breakLeaseDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._breakLeaseDeserializeExceptionHeaders(result),
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

export function _breakLeaseDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  leaseTimeInSeconds?: number;
  leaseId?: string;
  version: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    leaseTimeInSeconds:
      result.headers["x-ms-lease-time"] === undefined || result.headers["x-ms-lease-time"] === null
        ? result.headers["x-ms-lease-time"]
        : Number(result.headers["x-ms-lease-time"]),
    leaseId:
      result.headers["x-ms-lease-id"] === undefined || result.headers["x-ms-lease-id"] === null
        ? result.headers["x-ms-lease-id"]
        : result.headers["x-ms-lease-id"],
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

export function _breakLeaseDeserializeExceptionHeaders(result: PathUncheckedResponse): {
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

/** The Lease File operation establishes and manages a lock on a file for write and delete operations. */
export async function breakLease(
  context: Client,
  options: FileBreakLeaseOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    leaseTimeInSeconds?: number;
    leaseId?: string;
    version: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      leaseTimeInSeconds?: number;
      leaseId?: string;
      version: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _breakLeaseSend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _breakLeaseDeserialize(result);
  const parsedHeaders = _breakLeaseDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _changeLeaseSend(
  context: Client,
  leaseId: string,
  options: FileChangeLeaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=lease{?timeout}",
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
        "x-ms-lease-id": leaseId,
        ...(options?.proposedLeaseId !== undefined
          ? { "x-ms-proposed-lease-id": options?.proposedLeaseId }
          : {}),
        "x-ms-lease-action": "change",
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

export async function _changeLeaseDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._changeLeaseDeserializeExceptionHeaders(result),
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

export function _changeLeaseDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  leaseId?: string;
  version: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    leaseId:
      result.headers["x-ms-lease-id"] === undefined || result.headers["x-ms-lease-id"] === null
        ? result.headers["x-ms-lease-id"]
        : result.headers["x-ms-lease-id"],
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

export function _changeLeaseDeserializeExceptionHeaders(result: PathUncheckedResponse): {
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

/** The Lease File operation establishes and manages a lock on a file for write and delete operations. */
export async function changeLease(
  context: Client,
  leaseId: string,
  options: FileChangeLeaseOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    leaseId?: string;
    version: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      leaseId?: string;
      version: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _changeLeaseSend(context, leaseId, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _changeLeaseDeserialize(result);
  const parsedHeaders = _changeLeaseDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _releaseLeaseSend(
  context: Client,
  leaseId: string,
  options: FileReleaseLeaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=lease{?timeout}",
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
        "x-ms-lease-id": leaseId,
        "x-ms-lease-action": "release",
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

export async function _releaseLeaseDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._releaseLeaseDeserializeExceptionHeaders(result),
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

export function _releaseLeaseDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  version: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
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

export function _releaseLeaseDeserializeExceptionHeaders(result: PathUncheckedResponse): {
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

/** The Lease File operation establishes and manages a lock on a file for write and delete operations. */
export async function releaseLease(
  context: Client,
  leaseId: string,
  options: FileReleaseLeaseOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    version: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      version: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _releaseLeaseSend(context, leaseId, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _releaseLeaseDeserialize(result);
  const parsedHeaders = _releaseLeaseDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _acquireLeaseSend(
  context: Client,
  options: FileAcquireLeaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=lease{?timeout}",
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
        ...(options?.leaseDuration !== undefined
          ? { "x-ms-lease-duration": options?.leaseDuration }
          : {}),
        ...(options?.proposedLeaseId !== undefined
          ? { "x-ms-proposed-lease-id": options?.proposedLeaseId }
          : {}),
        "x-ms-lease-action": "acquire",
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

export async function _acquireLeaseDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._acquireLeaseDeserializeExceptionHeaders(result),
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

export function _acquireLeaseDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  leaseId?: string;
  version: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    leaseId:
      result.headers["x-ms-lease-id"] === undefined || result.headers["x-ms-lease-id"] === null
        ? result.headers["x-ms-lease-id"]
        : result.headers["x-ms-lease-id"],
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

export function _acquireLeaseDeserializeExceptionHeaders(result: PathUncheckedResponse): {
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

/** The Lease File operation establishes and manages a lock on a file for write and delete operations. */
export async function acquireLease(
  context: Client,
  options: FileAcquireLeaseOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    leaseId?: string;
    version: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      leaseId?: string;
      version: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _acquireLeaseSend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _acquireLeaseDeserialize(result);
  const parsedHeaders = _acquireLeaseDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _setMetadataSend(
  context: Client,
  options: FileSetMetadataOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=metadata{?timeout}",
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
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
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

/** Sets one or more user-defined name-value pairs for the specified file. */
export async function setMetadata(
  context: Client,
  options: FileSetMetadataOptionalParams = { requestOptions: {} },
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

export function _setHttpHeadersSend(
  context: Client,
  options: FileSetHttpHeadersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=properties{?timeout}",
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
        ...(options?.fileContentLength !== undefined
          ? { "x-ms-content-length": options?.fileContentLength }
          : {}),
        ...(options?.fileContentType !== undefined
          ? { "x-ms-content-type": options?.fileContentType }
          : {}),
        ...(options?.fileContentEncoding !== undefined
          ? { "x-ms-content-encoding": options?.fileContentEncoding }
          : {}),
        ...(options?.fileContentLanguage !== undefined
          ? { "x-ms-content-language": options?.fileContentLanguage }
          : {}),
        ...(options?.fileCacheControl !== undefined
          ? { "x-ms-cache-control": options?.fileCacheControl }
          : {}),
        ...(options?.fileContentMD5 !== undefined
          ? {
              "x-ms-content-md5": !options?.fileContentMD5
                ? options?.fileContentMD5
                : uint8ArrayToString(options?.fileContentMD5, "base64"),
            }
          : {}),
        ...(options?.fileContentDisposition !== undefined
          ? { "x-ms-content-disposition": options?.fileContentDisposition }
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
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
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

export async function _setHttpHeadersDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._setHttpHeadersDeserializeExceptionHeaders(result),
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

export function _setHttpHeadersDeserializeHeaders(result: PathUncheckedResponse): {
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
  linkCount?: number;
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
    linkCount:
      result.headers["x-ms-link-count"] === undefined || result.headers["x-ms-link-count"] === null
        ? result.headers["x-ms-link-count"]
        : Number(result.headers["x-ms-link-count"]),
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

export function _setHttpHeadersDeserializeExceptionHeaders(result: PathUncheckedResponse): {
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

/** Sets HTTP headers on a file. */
export async function setHttpHeaders(
  context: Client,
  options: FileSetHttpHeadersOptionalParams = { requestOptions: {} },
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
    linkCount?: number;
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
      linkCount?: number;
      version: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _setHttpHeadersSend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _setHttpHeadersDeserialize(result);
  const parsedHeaders = _setHttpHeadersDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _$deleteSend(
  context: Client,
  options: FileDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "{?timeout}",
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
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
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
  linkCount?: number;
  version: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    linkCount:
      result.headers["x-ms-link-count"] === undefined || result.headers["x-ms-link-count"] === null
        ? result.headers["x-ms-link-count"]
        : Number(result.headers["x-ms-link-count"]),
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

/** Removes the file from the storage account. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  options: FileDeleteOptionalParams = { requestOptions: {} },
): Promise<
  {
    linkCount?: number;
    version: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    { linkCount?: number; version: string; requestId: string; clientRequestId?: string; date: Date }
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
  options: FileGetPropertiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "{?sharesnapshot,timeout}",
    {
      sharesnapshot: options?.sharesnapshot,
      timeout: options?.timeoutInSeconds,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .head({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
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
  lastModified: string;
  fileType: "File";
  contentLength: number;
  contentType?: string;
  etag: string;
  contentMD5?: Uint8Array;
  contentEncoding?: string;
  cacheControl?: string;
  contentDisposition?: string;
  contentLanguage?: string;
  copyCompletedOn?: string;
  copyStatusDescription?: string;
  copyId?: string;
  copyProgress?: string;
  copySource?: string;
  copyStatus?: CopyStatus;
  serverEncrypted?: boolean;
  filePermissionKey?: string;
  fileAttributes?: string;
  fileCreatedOn?: Date;
  fileLastWriteOn?: Date;
  fileChangeOn?: Date;
  fileId?: string;
  fileParentId?: string;
  leaseDuration?: string;
  leaseState?: string;
  leaseStatus?: string;
  fileMode?: string;
  owner?: string;
  group?: string;
  nfsFileType?: NfsFileType;
  linkCount?: number;
  version: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    lastModified: result.headers["last-modified"],
    fileType: result.headers["x-ms-type"] as any,
    contentLength: Number(result.headers["content-length"]),
    contentType:
      result.headers["content-type"] === undefined || result.headers["content-type"] === null
        ? result.headers["content-type"]
        : result.headers["content-type"],
    etag: result.headers["etag"],
    contentMD5:
      result.headers["content-md5"] === undefined || result.headers["content-md5"] === null
        ? result.headers["content-md5"]
        : typeof result.headers["content-md5"] === "string"
          ? stringToUint8Array(result.headers["content-md5"], "base64")
          : result.headers["content-md5"],
    contentEncoding:
      result.headers["content-encoding"] === undefined ||
      result.headers["content-encoding"] === null
        ? result.headers["content-encoding"]
        : result.headers["content-encoding"],
    cacheControl:
      result.headers["cache-control"] === undefined || result.headers["cache-control"] === null
        ? result.headers["cache-control"]
        : result.headers["cache-control"],
    contentDisposition:
      result.headers["content-disposition"] === undefined ||
      result.headers["content-disposition"] === null
        ? result.headers["content-disposition"]
        : result.headers["content-disposition"],
    contentLanguage:
      result.headers["content-language"] === undefined ||
      result.headers["content-language"] === null
        ? result.headers["content-language"]
        : result.headers["content-language"],
    copyCompletedOn:
      result.headers["x-ms-copy-completion-time"] === undefined ||
      result.headers["x-ms-copy-completion-time"] === null
        ? result.headers["x-ms-copy-completion-time"]
        : result.headers["x-ms-copy-completion-time"],
    copyStatusDescription:
      result.headers["x-ms-copy-status-description"] === undefined ||
      result.headers["x-ms-copy-status-description"] === null
        ? result.headers["x-ms-copy-status-description"]
        : result.headers["x-ms-copy-status-description"],
    copyId:
      result.headers["x-ms-copy-id"] === undefined || result.headers["x-ms-copy-id"] === null
        ? result.headers["x-ms-copy-id"]
        : result.headers["x-ms-copy-id"],
    copyProgress:
      result.headers["x-ms-copy-progress"] === undefined ||
      result.headers["x-ms-copy-progress"] === null
        ? result.headers["x-ms-copy-progress"]
        : result.headers["x-ms-copy-progress"],
    copySource:
      result.headers["x-ms-copy-source"] === undefined ||
      result.headers["x-ms-copy-source"] === null
        ? result.headers["x-ms-copy-source"]
        : result.headers["x-ms-copy-source"],
    copyStatus: result.headers["x-ms-copy-status"] as any,
    serverEncrypted:
      result.headers["x-ms-server-encrypted"] === undefined ||
      result.headers["x-ms-server-encrypted"] === null
        ? result.headers["x-ms-server-encrypted"]
        : result.headers["x-ms-server-encrypted"].trim().toLowerCase() === "true",
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
    leaseDuration:
      result.headers["x-ms-lease-duration"] === undefined ||
      result.headers["x-ms-lease-duration"] === null
        ? result.headers["x-ms-lease-duration"]
        : result.headers["x-ms-lease-duration"],
    leaseState:
      result.headers["x-ms-lease-state"] === undefined ||
      result.headers["x-ms-lease-state"] === null
        ? result.headers["x-ms-lease-state"]
        : result.headers["x-ms-lease-state"],
    leaseStatus:
      result.headers["x-ms-lease-status"] === undefined ||
      result.headers["x-ms-lease-status"] === null
        ? result.headers["x-ms-lease-status"]
        : result.headers["x-ms-lease-status"],
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
    linkCount:
      result.headers["x-ms-link-count"] === undefined || result.headers["x-ms-link-count"] === null
        ? result.headers["x-ms-link-count"]
        : Number(result.headers["x-ms-link-count"]),
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

/** Returns all user-defined metadata, standard HTTP properties, and system properties for the file. */
export async function getProperties(
  context: Client,
  options: FileGetPropertiesOptionalParams = { requestOptions: {} },
): Promise<
  {
    lastModified: string;
    fileType: "File";
    contentLength: number;
    contentType?: string;
    etag: string;
    contentMD5?: Uint8Array;
    contentEncoding?: string;
    cacheControl?: string;
    contentDisposition?: string;
    contentLanguage?: string;
    copyCompletedOn?: string;
    copyStatusDescription?: string;
    copyId?: string;
    copyProgress?: string;
    copySource?: string;
    copyStatus?: CopyStatus;
    serverEncrypted?: boolean;
    filePermissionKey?: string;
    fileAttributes?: string;
    fileCreatedOn?: Date;
    fileLastWriteOn?: Date;
    fileChangeOn?: Date;
    fileId?: string;
    fileParentId?: string;
    leaseDuration?: string;
    leaseState?: string;
    leaseStatus?: string;
    fileMode?: string;
    owner?: string;
    group?: string;
    nfsFileType?: NfsFileType;
    linkCount?: number;
    version: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    {
      lastModified: string;
      fileType: "File";
      contentLength: number;
      contentType?: string;
      etag: string;
      contentMD5?: Uint8Array;
      contentEncoding?: string;
      cacheControl?: string;
      contentDisposition?: string;
      contentLanguage?: string;
      copyCompletedOn?: string;
      copyStatusDescription?: string;
      copyId?: string;
      copyProgress?: string;
      copySource?: string;
      copyStatus?: CopyStatus;
      serverEncrypted?: boolean;
      filePermissionKey?: string;
      fileAttributes?: string;
      fileCreatedOn?: Date;
      fileLastWriteOn?: Date;
      fileChangeOn?: Date;
      fileId?: string;
      fileParentId?: string;
      leaseDuration?: string;
      leaseState?: string;
      leaseStatus?: string;
      fileMode?: string;
      owner?: string;
      group?: string;
      nfsFileType?: NfsFileType;
      linkCount?: number;
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

export function _downloadSend(
  context: Client,
  options: FileDownloadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "{?timeout}",
    {
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
        ...(options?.range !== undefined ? { range: options?.range } : {}),
        ...(options?.rangeGetContentMD5 !== undefined
          ? { "x-ms-range-get-content-md5": options?.rangeGetContentMD5 }
          : {}),
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.allowTrailingDot !== undefined
          ? { "x-ms-allow-trailing-dot": options?.allowTrailingDot }
          : {}),
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        ...(options?.structuredBodyType !== undefined
          ? { "x-ms-structured-body": options?.structuredBodyType }
          : {}),
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _downloadDeserialize(result: PathUncheckedResponse): Promise<Uint8Array> {
  const expectedStatuses = ["200", "206"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = { ...(error.details as any), ..._downloadDeserializeExceptionHeaders(result) };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return typeof result.body === "string" ? stringToUint8Array(result.body, "base64") : result.body;
}

export function _downloadDeserializeHeaders(result: PathUncheckedResponse): {
  lastModified: string;
  contentLength: number;
  contentRange?: string;
  etag: string;
  contentMD5?: Uint8Array;
  contentEncoding?: string;
  cacheControl?: string;
  contentDisposition?: string;
  contentLanguage?: string;
  acceptRanges?: string;
  copyCompletedOn?: string;
  copyStatusDescription?: string;
  copyId?: string;
  copyProgress?: string;
  copySource?: string;
  copyStatus?: CopyStatus;
  fileContentMD5?: Uint8Array;
  serverEncrypted?: boolean;
  filePermissionKey?: string;
  fileAttributes?: string;
  fileCreatedOn?: Date;
  fileLastWriteOn?: Date;
  fileChangeOn?: Date;
  fileId?: string;
  fileParentId?: string;
  leaseDuration?: string;
  leaseState?: string;
  leaseStatus?: string;
  structuredBodyType?: string;
  structuredContentLength?: number;
  fileMode?: string;
  owner?: string;
  group?: string;
  nfsFileType?: NfsFileType;
  linkCount?: number;
  version: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
  contentType: "application/xml";
} {
  return {
    lastModified: result.headers["last-modified"],
    contentLength: Number(result.headers["content-length"]),
    contentRange:
      result.headers["content-range"] === undefined || result.headers["content-range"] === null
        ? result.headers["content-range"]
        : result.headers["content-range"],
    etag: result.headers["etag"],
    contentMD5:
      result.headers["content-md5"] === undefined || result.headers["content-md5"] === null
        ? result.headers["content-md5"]
        : typeof result.headers["content-md5"] === "string"
          ? stringToUint8Array(result.headers["content-md5"], "base64")
          : result.headers["content-md5"],
    contentEncoding:
      result.headers["content-encoding"] === undefined ||
      result.headers["content-encoding"] === null
        ? result.headers["content-encoding"]
        : result.headers["content-encoding"],
    cacheControl:
      result.headers["cache-control"] === undefined || result.headers["cache-control"] === null
        ? result.headers["cache-control"]
        : result.headers["cache-control"],
    contentDisposition:
      result.headers["content-disposition"] === undefined ||
      result.headers["content-disposition"] === null
        ? result.headers["content-disposition"]
        : result.headers["content-disposition"],
    contentLanguage:
      result.headers["content-language"] === undefined ||
      result.headers["content-language"] === null
        ? result.headers["content-language"]
        : result.headers["content-language"],
    acceptRanges:
      result.headers["accept-ranges"] === undefined || result.headers["accept-ranges"] === null
        ? result.headers["accept-ranges"]
        : result.headers["accept-ranges"],
    copyCompletedOn:
      result.headers["x-ms-copy-completion-time"] === undefined ||
      result.headers["x-ms-copy-completion-time"] === null
        ? result.headers["x-ms-copy-completion-time"]
        : result.headers["x-ms-copy-completion-time"],
    copyStatusDescription:
      result.headers["x-ms-copy-status-description"] === undefined ||
      result.headers["x-ms-copy-status-description"] === null
        ? result.headers["x-ms-copy-status-description"]
        : result.headers["x-ms-copy-status-description"],
    copyId:
      result.headers["x-ms-copy-id"] === undefined || result.headers["x-ms-copy-id"] === null
        ? result.headers["x-ms-copy-id"]
        : result.headers["x-ms-copy-id"],
    copyProgress:
      result.headers["x-ms-copy-progress"] === undefined ||
      result.headers["x-ms-copy-progress"] === null
        ? result.headers["x-ms-copy-progress"]
        : result.headers["x-ms-copy-progress"],
    copySource:
      result.headers["x-ms-copy-source"] === undefined ||
      result.headers["x-ms-copy-source"] === null
        ? result.headers["x-ms-copy-source"]
        : result.headers["x-ms-copy-source"],
    copyStatus: result.headers["x-ms-copy-status"] as any,
    fileContentMD5:
      result.headers["x-ms-content-md5"] === undefined ||
      result.headers["x-ms-content-md5"] === null
        ? result.headers["x-ms-content-md5"]
        : typeof result.headers["x-ms-content-md5"] === "string"
          ? stringToUint8Array(result.headers["x-ms-content-md5"], "base64")
          : result.headers["x-ms-content-md5"],
    serverEncrypted:
      result.headers["x-ms-server-encrypted"] === undefined ||
      result.headers["x-ms-server-encrypted"] === null
        ? result.headers["x-ms-server-encrypted"]
        : result.headers["x-ms-server-encrypted"].trim().toLowerCase() === "true",
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
    leaseDuration:
      result.headers["x-ms-lease-duration"] === undefined ||
      result.headers["x-ms-lease-duration"] === null
        ? result.headers["x-ms-lease-duration"]
        : result.headers["x-ms-lease-duration"],
    leaseState:
      result.headers["x-ms-lease-state"] === undefined ||
      result.headers["x-ms-lease-state"] === null
        ? result.headers["x-ms-lease-state"]
        : result.headers["x-ms-lease-state"],
    leaseStatus:
      result.headers["x-ms-lease-status"] === undefined ||
      result.headers["x-ms-lease-status"] === null
        ? result.headers["x-ms-lease-status"]
        : result.headers["x-ms-lease-status"],
    structuredBodyType:
      result.headers["x-ms-structured-body"] === undefined ||
      result.headers["x-ms-structured-body"] === null
        ? result.headers["x-ms-structured-body"]
        : result.headers["x-ms-structured-body"],
    structuredContentLength:
      result.headers["x-ms-structured-content-length"] === undefined ||
      result.headers["x-ms-structured-content-length"] === null
        ? result.headers["x-ms-structured-content-length"]
        : Number(result.headers["x-ms-structured-content-length"]),
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
    linkCount:
      result.headers["x-ms-link-count"] === undefined || result.headers["x-ms-link-count"] === null
        ? result.headers["x-ms-link-count"]
        : Number(result.headers["x-ms-link-count"]),
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

export function _downloadDeserializeExceptionHeaders(result: PathUncheckedResponse): {
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

/** Reads or downloads a file from the system, including its metadata and properties. */
export async function download(
  context: Client,
  options: FileDownloadOptionalParams = { requestOptions: {} },
): Promise<
  {
    lastModified: string;
    contentLength: number;
    contentRange?: string;
    etag: string;
    contentMD5?: Uint8Array;
    contentEncoding?: string;
    cacheControl?: string;
    contentDisposition?: string;
    contentLanguage?: string;
    acceptRanges?: string;
    copyCompletedOn?: string;
    copyStatusDescription?: string;
    copyId?: string;
    copyProgress?: string;
    copySource?: string;
    copyStatus?: CopyStatus;
    fileContentMD5?: Uint8Array;
    serverEncrypted?: boolean;
    filePermissionKey?: string;
    fileAttributes?: string;
    fileCreatedOn?: Date;
    fileLastWriteOn?: Date;
    fileChangeOn?: Date;
    fileId?: string;
    fileParentId?: string;
    leaseDuration?: string;
    leaseState?: string;
    leaseStatus?: string;
    structuredBodyType?: string;
    structuredContentLength?: number;
    fileMode?: string;
    owner?: string;
    group?: string;
    nfsFileType?: NfsFileType;
    linkCount?: number;
    version: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
    contentType: "application/xml";
  } & Uint8Array &
    StorageCompatResponseInfo<
      Uint8Array,
      {
        lastModified: string;
        contentLength: number;
        contentRange?: string;
        etag: string;
        contentMD5?: Uint8Array;
        contentEncoding?: string;
        cacheControl?: string;
        contentDisposition?: string;
        contentLanguage?: string;
        acceptRanges?: string;
        copyCompletedOn?: string;
        copyStatusDescription?: string;
        copyId?: string;
        copyProgress?: string;
        copySource?: string;
        copyStatus?: CopyStatus;
        fileContentMD5?: Uint8Array;
        serverEncrypted?: boolean;
        filePermissionKey?: string;
        fileAttributes?: string;
        fileCreatedOn?: Date;
        fileLastWriteOn?: Date;
        fileChangeOn?: Date;
        fileId?: string;
        fileParentId?: string;
        leaseDuration?: string;
        leaseState?: string;
        leaseStatus?: string;
        structuredBodyType?: string;
        structuredContentLength?: number;
        fileMode?: string;
        owner?: string;
        group?: string;
        nfsFileType?: NfsFileType;
        linkCount?: number;
        version: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
        contentType: "application/xml";
      }
    >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _downloadSend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  const parsedBody = await _downloadDeserialize(result);
  const parsedHeaders = _downloadDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, parsedBody, parsedHeaders);
}

export function _createSend(
  context: Client,
  contentLength: number,
  options: FileCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "{?timeout}",
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
      contentType: "application/octet-stream",
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        "x-ms-content-length": contentLength,
        "x-ms-type": "file",
        ...(options?.fileContentType !== undefined
          ? { "x-ms-content-type": options?.fileContentType }
          : {}),
        ...(options?.fileContentEncoding !== undefined
          ? { "x-ms-content-encoding": options?.fileContentEncoding }
          : {}),
        ...(options?.fileContentLanguage !== undefined
          ? { "x-ms-content-language": options?.fileContentLanguage }
          : {}),
        ...(options?.fileCacheControl !== undefined
          ? { "x-ms-cache-control": options?.fileCacheControl }
          : {}),
        ...(options?.fileContentMD5 !== undefined
          ? {
              "x-ms-content-md5": !options?.fileContentMD5
                ? options?.fileContentMD5
                : uint8ArrayToString(options?.fileContentMD5, "base64"),
            }
          : {}),
        ...(options?.fileContentDisposition !== undefined
          ? { "x-ms-content-disposition": options?.fileContentDisposition }
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
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.allowTrailingDot !== undefined
          ? { "x-ms-allow-trailing-dot": options?.allowTrailingDot }
          : {}),
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        ...(options?.owner !== undefined ? { "x-ms-owner": options?.owner } : {}),
        ...(options?.group !== undefined ? { "x-ms-group": options?.group } : {}),
        ...(options?.fileMode !== undefined ? { "x-ms-mode": options?.fileMode } : {}),
        ...(options?.nfsFileType !== undefined
          ? { "x-ms-file-file-type": options?.nfsFileType }
          : {}),
        ...(options?.contentMD5 !== undefined
          ? {
              "content-md5": !options?.contentMD5
                ? options?.contentMD5
                : uint8ArrayToString(options?.contentMD5, "base64"),
            }
          : {}),
        ...(options?.filePropertySemantics !== undefined
          ? { "x-ms-file-property-semantics": options?.filePropertySemantics }
          : {}),
        ...(options?.optionalContentLength !== undefined
          ? { "content-length": options?.optionalContentLength }
          : {}),
        ...options.requestOptions?.headers,
      },
      body: !options["body"] ? options["body"] : options["body"],
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
  contentMD5?: Uint8Array;
  contentLength?: number;
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
    contentMD5:
      result.headers["content-md5"] === undefined || result.headers["content-md5"] === null
        ? result.headers["content-md5"]
        : typeof result.headers["content-md5"] === "string"
          ? stringToUint8Array(result.headers["content-md5"], "base64")
          : result.headers["content-md5"],
    contentLength:
      result.headers["content-length"] === undefined || result.headers["content-length"] === null
        ? result.headers["content-length"]
        : Number(result.headers["content-length"]),
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

/** Creates a new file or replaces a file. Note it only initializes the file with no content. */
export async function create(
  context: Client,
  contentLength: number,
  options: FileCreateOptionalParams = { requestOptions: {} },
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
    contentMD5?: Uint8Array;
    contentLength?: number;
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
      contentMD5?: Uint8Array;
      contentLength?: number;
      version: string;
      requestId: string;
      clientRequestId?: string;
      date: Date;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _createSend(context, contentLength, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _createDeserialize(result);
  const parsedHeaders = _createDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}
