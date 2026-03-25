// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataLakeContext as Client } from "../index.js";
import {
  storageErrorDeserializer,
  SetAccessControlRecursiveResponse,
  setAccessControlRecursiveResponseDeserializer,
  PathExpiryOptions,
  PathUpdateAction,
  PathSetAccessControlRecursiveMode,
  PathLeaseAction,
} from "../../models/azure/storage/files/dataLake/models.js";
import { PathReadResponse } from "../../models/models.js";
import { getBinaryStreamResponse } from "../../static-helpers/serialization/get-binary-stream-response.js";
import {
  StorageCompatResponseInfo,
  createStorageCompatOnResponse,
  addStorageCompatResponse,
} from "../../static-helpers/storageCompatResponse.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  PathUndeleteOptionalParams,
  PathSetExpiryOptionalParams,
  PathAppendDataOptionalParams,
  PathFlushDataOptionalParams,
  PathSetAccessControlRecursiveOptionalParams,
  PathSetAccessControlOptionalParams,
  PathDeleteOptionalParams,
  PathGetPropertiesOptionalParams,
  PathReadOptionalParams,
  PathLeaseOptionalParams,
  PathUpdateOptionalParams,
  PathCreateOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { uint8ArrayToString, stringToUint8Array } from "@azure/core-util";

export function _undeleteSend(
  context: Client,
  options: PathUndeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=undelete{?timeout}",
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
        "x-ms-version": context.version ?? "2026-02-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.undeleteSource !== undefined
          ? { "x-ms-undelete-source": options?.undeleteSource }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _undeleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    error.details = { ...(error.details as any), ..._undeleteDeserializeExceptionHeaders(result) };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _undeleteDeserializeHeaders(result: PathUncheckedResponse): {
  resourceType?: string;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    resourceType:
      result.headers["x-ms-resource-type"] === undefined ||
      result.headers["x-ms-resource-type"] === null
        ? result.headers["x-ms-resource-type"]
        : result.headers["x-ms-resource-type"],
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

export function _undeleteDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
  };
}

/** Undelete a path that was previously soft deleted. */
export async function undelete(
  context: Client,
  options: PathUndeleteOptionalParams = { requestOptions: {} },
): Promise<
  {
    resourceType?: string;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  } & StorageCompatResponseInfo<
    undefined,
    {
      resourceType?: string;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _undeleteSend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _undeleteDeserialize(result);
  const parsedHeaders = _undeleteDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _setExpirySend(
  context: Client,
  expiryOptions: PathExpiryOptions,
  options: PathSetExpiryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=expiry{?timeout}",
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
        "x-ms-version": context.version ?? "2026-02-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        "x-ms-expiry-option": expiryOptions,
        ...(options?.expiresOn !== undefined ? { "x-ms-expiry-time": options?.expiresOn } : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _setExpiryDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    error.details = { ...(error.details as any), ..._setExpiryDeserializeExceptionHeaders(result) };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _setExpiryDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
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

export function _setExpiryDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
  };
}

/** Sets the time a blob will expire and be deleted. */
export async function setExpiry(
  context: Client,
  expiryOptions: PathExpiryOptions,
  options: PathSetExpiryOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _setExpirySend(context, expiryOptions, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _setExpiryDeserialize(result);
  const parsedHeaders = _setExpiryDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _appendDataSend(
  context: Client,
  body: Uint8Array,
  options: PathAppendDataOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?action=append{?position,flush,timeout}",
    {
      position: options?.position,
      flush: options?.flush,
      timeout: options?.timeout,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/octet-stream",
      headers: {
        "x-ms-version": context.version ?? "2026-02-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.contentLength !== undefined
          ? { "content-length": options?.contentLength }
          : {}),
        ...(options?.transactionalContentHash !== undefined
          ? {
              "content-md5": !options?.transactionalContentHash
                ? options?.transactionalContentHash
                : uint8ArrayToString(options?.transactionalContentHash, "base64"),
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
        ...(options?.leaseAction !== undefined
          ? { "x-ms-lease-action": options?.leaseAction }
          : {}),
        ...(options?.leaseDuration !== undefined
          ? { "x-ms-lease-duration": options?.leaseDuration }
          : {}),
        ...(options?.proposedLeaseId !== undefined
          ? { "x-ms-proposed-lease-id": options?.proposedLeaseId }
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
        ...(options?.structuredBodyType !== undefined
          ? { "x-ms-structured-body": options?.structuredBodyType }
          : {}),
        ...(options?.structuredContentLength !== undefined
          ? { "x-ms-structured-content-length": options?.structuredContentLength }
          : {}),
        ...options.requestOptions?.headers,
      },
      body: body,
    });
}

export async function _appendDataDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._appendDataDeserializeExceptionHeaders(result),
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

export function _appendDataDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  contentMD5?: Uint8Array;
  contentCrc64?: Uint8Array;
  isServerEncrypted?: boolean;
  encryptionKeySha256?: string;
  leaseRenewed?: boolean;
  structuredBodyType?: string;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    etag: result.headers["etag"],
    contentMD5:
      result.headers["content-md5"] === undefined || result.headers["content-md5"] === null
        ? result.headers["content-md5"]
        : typeof result.headers["content-md5"] === "string"
          ? stringToUint8Array(result.headers["content-md5"], "base64")
          : result.headers["content-md5"],
    contentCrc64:
      result.headers["x-ms-content-crc64"] === undefined ||
      result.headers["x-ms-content-crc64"] === null
        ? result.headers["x-ms-content-crc64"]
        : typeof result.headers["x-ms-content-crc64"] === "string"
          ? stringToUint8Array(result.headers["x-ms-content-crc64"], "base64")
          : result.headers["x-ms-content-crc64"],
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
    leaseRenewed:
      result.headers["x-ms-lease-renewed"] === undefined ||
      result.headers["x-ms-lease-renewed"] === null
        ? result.headers["x-ms-lease-renewed"]
        : result.headers["x-ms-lease-renewed"].trim().toLowerCase() === "true",
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

export function _appendDataDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
  };
}

/** Append data to the file. */
export async function appendData(
  context: Client,
  body: Uint8Array,
  options: PathAppendDataOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    contentMD5?: Uint8Array;
    contentCrc64?: Uint8Array;
    isServerEncrypted?: boolean;
    encryptionKeySha256?: string;
    leaseRenewed?: boolean;
    structuredBodyType?: string;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      contentMD5?: Uint8Array;
      contentCrc64?: Uint8Array;
      isServerEncrypted?: boolean;
      encryptionKeySha256?: string;
      leaseRenewed?: boolean;
      structuredBodyType?: string;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _appendDataSend(context, body, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _appendDataDeserialize(result);
  const parsedHeaders = _appendDataDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _flushDataSend(
  context: Client,
  options: PathFlushDataOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?action=flush{?position,retainUncommittedData,close,timeout}",
    {
      position: options?.position,
      retainUncommittedData: options?.retainUncommittedData,
      close: options?.close,
      timeout: options?.timeout,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "x-ms-version": context.version ?? "2026-02-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.contentLength !== undefined
          ? { "content-length": options?.contentLength }
          : {}),
        ...(options?.contentMD5 !== undefined
          ? {
              "x-ms-content-md5": !options?.contentMD5
                ? options?.contentMD5
                : uint8ArrayToString(options?.contentMD5, "base64"),
            }
          : {}),
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.leaseAction !== undefined
          ? { "x-ms-lease-action": options?.leaseAction }
          : {}),
        ...(options?.leaseDuration !== undefined
          ? { "x-ms-lease-duration": options?.leaseDuration }
          : {}),
        ...(options?.proposedLeaseId !== undefined
          ? { "x-ms-proposed-lease-id": options?.proposedLeaseId }
          : {}),
        ...(options?.cacheControl !== undefined
          ? { "x-ms-cache-control": options?.cacheControl }
          : {}),
        ...(options?.contentType !== undefined
          ? { "x-ms-content-type": options?.contentType }
          : {}),
        ...(options?.contentDisposition !== undefined
          ? { "x-ms-content-disposition": options?.contentDisposition }
          : {}),
        ...(options?.contentEncoding !== undefined
          ? { "x-ms-content-encoding": options?.contentEncoding }
          : {}),
        ...(options?.contentLanguage !== undefined
          ? { "x-ms-content-language": options?.contentLanguage }
          : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
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
        ...(options?.encryptionKey !== undefined
          ? { "x-ms-encryption-key": options?.encryptionKey }
          : {}),
        ...(options?.encryptionKeySha256 !== undefined
          ? { "x-ms-encryption-key-sha256": options?.encryptionKeySha256 }
          : {}),
        ...(options?.encryptionAlgorithm !== undefined
          ? { "x-ms-encryption-algorithm": options?.encryptionAlgorithm }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _flushDataDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    error.details = { ...(error.details as any), ..._flushDataDeserializeExceptionHeaders(result) };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _flushDataDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  contentLength?: number;
  isServerEncrypted?: boolean;
  encryptionKeySha256?: string;
  leaseRenewed?: boolean;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    contentLength:
      result.headers["content-length"] === undefined || result.headers["content-length"] === null
        ? result.headers["content-length"]
        : Number(result.headers["content-length"]),
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
    leaseRenewed:
      result.headers["x-ms-lease-renewed"] === undefined ||
      result.headers["x-ms-lease-renewed"] === null
        ? result.headers["x-ms-lease-renewed"]
        : result.headers["x-ms-lease-renewed"].trim().toLowerCase() === "true",
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

export function _flushDataDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
  };
}

/** Set the owner, group, permissions, or access control list for a path. */
export async function flushData(
  context: Client,
  options: PathFlushDataOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    contentLength?: number;
    isServerEncrypted?: boolean;
    encryptionKeySha256?: string;
    leaseRenewed?: boolean;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      contentLength?: number;
      isServerEncrypted?: boolean;
      encryptionKeySha256?: string;
      leaseRenewed?: boolean;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _flushDataSend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _flushDataDeserialize(result);
  const parsedHeaders = _flushDataDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _setAccessControlRecursiveSend(
  context: Client,
  mode: PathSetAccessControlRecursiveMode,
  options: PathSetAccessControlRecursiveOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?action=setAccessControlRecursive{?mode,continuation,forceFlag,maxRecords,timeout}",
    {
      mode: mode,
      continuation: options?.continuation,
      forceFlag: options?.forceFlag,
      maxRecords: options?.maxRecords,
      timeout: options?.timeout,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "x-ms-version": context.version ?? "2026-02-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.acl !== undefined ? { "x-ms-acl": options?.acl } : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _setAccessControlRecursiveDeserialize(
  result: PathUncheckedResponse,
): Promise<SetAccessControlRecursiveResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._setAccessControlRecursiveDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return setAccessControlRecursiveResponseDeserializer(result.body);
}

export function _setAccessControlRecursiveDeserializeHeaders(result: PathUncheckedResponse): {
  continuation?: string;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
  contentType: "application/json";
} {
  return {
    continuation:
      result.headers["x-ms-continuation"] === undefined ||
      result.headers["x-ms-continuation"] === null
        ? result.headers["x-ms-continuation"]
        : result.headers["x-ms-continuation"],
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

export function _setAccessControlRecursiveDeserializeExceptionHeaders(
  result: PathUncheckedResponse,
): { errorCode?: string } {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
  };
}

/** Set the access control list for a path and sub-paths. */
export async function setAccessControlRecursive(
  context: Client,
  mode: PathSetAccessControlRecursiveMode,
  options: PathSetAccessControlRecursiveOptionalParams = { requestOptions: {} },
): Promise<
  {
    continuation?: string;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
    contentType: "application/json";
  } & SetAccessControlRecursiveResponse &
    StorageCompatResponseInfo<
      SetAccessControlRecursiveResponse,
      {
        continuation?: string;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
        contentType: "application/json";
      }
    >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _setAccessControlRecursiveSend(context, mode, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  const parsedBody = await _setAccessControlRecursiveDeserialize(result);
  const parsedHeaders = _setAccessControlRecursiveDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, parsedBody, parsedHeaders);
}

export function _setAccessControlSend(
  context: Client,
  options: PathSetAccessControlOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?action=setAccessControl{?timeout}",
    {
      timeout: options?.timeout,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "x-ms-version": context.version ?? "2026-02-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.owner !== undefined ? { "x-ms-owner": options?.owner } : {}),
        ...(options?.group !== undefined ? { "x-ms-group": options?.group } : {}),
        ...(options?.permissions !== undefined ? { "x-ms-permissions": options?.permissions } : {}),
        ...(options?.acl !== undefined ? { "x-ms-acl": options?.acl } : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
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
        ...options.requestOptions?.headers,
      },
    });
}

export async function _setAccessControlDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._setAccessControlDeserializeExceptionHeaders(result),
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

export function _setAccessControlDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
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

export function _setAccessControlDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
  };
}

/** Set the owner, group, permissions, or access control list for a path. */
export async function setAccessControl(
  context: Client,
  options: PathSetAccessControlOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _setAccessControlSend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _setAccessControlDeserialize(result);
  const parsedHeaders = _setAccessControlDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _$deleteSend(
  context: Client,
  options: PathDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "{?recursive,continuation,paginated,timeout}",
    {
      recursive: options?.recursive,
      continuation: options?.continuation,
      paginated: options?.paginated,
      timeout: options?.timeout,
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
        "x-ms-version": context.version ?? "2026-02-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
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
        ...options.requestOptions?.headers,
      },
    });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
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
  continuation?: string;
  deletionId?: string;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    continuation:
      result.headers["x-ms-continuation"] === undefined ||
      result.headers["x-ms-continuation"] === null
        ? result.headers["x-ms-continuation"]
        : result.headers["x-ms-continuation"],
    deletionId:
      result.headers["x-ms-deletion-id"] === undefined ||
      result.headers["x-ms-deletion-id"] === null
        ? result.headers["x-ms-deletion-id"]
        : result.headers["x-ms-deletion-id"],
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

export function _$deleteDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
  };
}

/** Delete the file or directory. This operation supports conditional HTTP requests. For more information, see [Specifying Conditional Headers for Blob Service Operations](https://learn.microsoft.com/rest/api/storageservices/specifying-conditional-headers-for-blob-service-operations). */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  options: PathDeleteOptionalParams = { requestOptions: {} },
): Promise<
  {
    continuation?: string;
    deletionId?: string;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  } & StorageCompatResponseInfo<
    undefined,
    {
      continuation?: string;
      deletionId?: string;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    }
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
  options: PathGetPropertiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "{?action,upn,timeout}",
    {
      action: options?.action,
      upn: options?.upn,
      timeout: options?.timeout,
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
        "x-ms-version": context.version ?? "2026-02-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
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
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getPropertiesDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
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
  acceptRanges?: string;
  cacheControl?: string;
  contentDisposition?: string;
  contentEncoding?: string;
  contentLanguage?: string;
  contentLength?: number;
  contentRange?: string;
  contentType?: string;
  contentMD5?: Uint8Array;
  etag: string;
  lastModified: Date;
  resourceType?: string;
  properties?: string;
  owner?: string;
  group?: string;
  permissions?: string;
  acl?: string;
  leaseDuration?: string;
  leaseState?: string;
  leaseStatus?: string;
  isServerEncrypted?: boolean;
  encryptionKeySha256?: string;
  encryptionContext?: string;
  encryptionScope?: string;
  creationTime: Date;
  expiresOn: Date;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    acceptRanges:
      result.headers["accept-ranges"] === undefined || result.headers["accept-ranges"] === null
        ? result.headers["accept-ranges"]
        : result.headers["accept-ranges"],
    cacheControl:
      result.headers["cache-control"] === undefined || result.headers["cache-control"] === null
        ? result.headers["cache-control"]
        : result.headers["cache-control"],
    contentDisposition:
      result.headers["content-disposition"] === undefined ||
      result.headers["content-disposition"] === null
        ? result.headers["content-disposition"]
        : result.headers["content-disposition"],
    contentEncoding:
      result.headers["content-encoding"] === undefined ||
      result.headers["content-encoding"] === null
        ? result.headers["content-encoding"]
        : result.headers["content-encoding"],
    contentLanguage:
      result.headers["content-language"] === undefined ||
      result.headers["content-language"] === null
        ? result.headers["content-language"]
        : result.headers["content-language"],
    contentLength:
      result.headers["content-length"] === undefined || result.headers["content-length"] === null
        ? result.headers["content-length"]
        : Number(result.headers["content-length"]),
    contentRange:
      result.headers["content-range"] === undefined || result.headers["content-range"] === null
        ? result.headers["content-range"]
        : result.headers["content-range"],
    contentType:
      result.headers["content-type"] === undefined || result.headers["content-type"] === null
        ? result.headers["content-type"]
        : result.headers["content-type"],
    contentMD5:
      result.headers["content-md5"] === undefined || result.headers["content-md5"] === null
        ? result.headers["content-md5"]
        : typeof result.headers["content-md5"] === "string"
          ? stringToUint8Array(result.headers["content-md5"], "base64")
          : result.headers["content-md5"],
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    resourceType:
      result.headers["x-ms-resource-type"] === undefined ||
      result.headers["x-ms-resource-type"] === null
        ? result.headers["x-ms-resource-type"]
        : result.headers["x-ms-resource-type"],
    properties:
      result.headers["x-ms-properties"] === undefined || result.headers["x-ms-properties"] === null
        ? result.headers["x-ms-properties"]
        : result.headers["x-ms-properties"],
    owner:
      result.headers["x-ms-owner"] === undefined || result.headers["x-ms-owner"] === null
        ? result.headers["x-ms-owner"]
        : result.headers["x-ms-owner"],
    group:
      result.headers["x-ms-group"] === undefined || result.headers["x-ms-group"] === null
        ? result.headers["x-ms-group"]
        : result.headers["x-ms-group"],
    permissions:
      result.headers["x-ms-permissions"] === undefined ||
      result.headers["x-ms-permissions"] === null
        ? result.headers["x-ms-permissions"]
        : result.headers["x-ms-permissions"],
    acl:
      result.headers["x-ms-acl"] === undefined || result.headers["x-ms-acl"] === null
        ? result.headers["x-ms-acl"]
        : result.headers["x-ms-acl"],
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
    isServerEncrypted:
      result.headers["x-ms-server-encrypted"] === undefined ||
      result.headers["x-ms-server-encrypted"] === null
        ? result.headers["x-ms-server-encrypted"]
        : result.headers["x-ms-server-encrypted"].trim().toLowerCase() === "true",
    encryptionKeySha256:
      result.headers["x-ms-encryption-key-sha256"] === undefined ||
      result.headers["x-ms-encryption-key-sha256"] === null
        ? result.headers["x-ms-encryption-key-sha256"]
        : result.headers["x-ms-encryption-key-sha256"],
    encryptionContext:
      result.headers["x-ms-encryption-context"] === undefined ||
      result.headers["x-ms-encryption-context"] === null
        ? result.headers["x-ms-encryption-context"]
        : result.headers["x-ms-encryption-context"],
    encryptionScope:
      result.headers["x-ms-encryption-scope"] === undefined ||
      result.headers["x-ms-encryption-scope"] === null
        ? result.headers["x-ms-encryption-scope"]
        : result.headers["x-ms-encryption-scope"],
    creationTime: new Date(result.headers["x-ms-creation-time"]),
    expiresOn: new Date(result.headers["x-ms-expiry-time"]),
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

export function _getPropertiesDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
  };
}

/** Get Properties returns all system and user defined properties for a path. Get Status returns all system defined properties for a path. Get Access Control List returns the access control list for a path. This operation supports conditional HTTP requests. For more information, see [Specifying Conditional Headers for Blob Service Operations](https://learn.microsoft.com/rest/api/storageservices/specifying-conditional-headers-for-blob-service-operations). */
export async function getProperties(
  context: Client,
  options: PathGetPropertiesOptionalParams = { requestOptions: {} },
): Promise<
  {
    acceptRanges?: string;
    cacheControl?: string;
    contentDisposition?: string;
    contentEncoding?: string;
    contentLanguage?: string;
    contentLength?: number;
    contentRange?: string;
    contentType?: string;
    contentMD5?: Uint8Array;
    etag: string;
    lastModified: Date;
    resourceType?: string;
    properties?: string;
    owner?: string;
    group?: string;
    permissions?: string;
    acl?: string;
    leaseDuration?: string;
    leaseState?: string;
    leaseStatus?: string;
    isServerEncrypted?: boolean;
    encryptionKeySha256?: string;
    encryptionContext?: string;
    encryptionScope?: string;
    creationTime: Date;
    expiresOn: Date;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  } & StorageCompatResponseInfo<
    undefined,
    {
      acceptRanges?: string;
      cacheControl?: string;
      contentDisposition?: string;
      contentEncoding?: string;
      contentLanguage?: string;
      contentLength?: number;
      contentRange?: string;
      contentType?: string;
      contentMD5?: Uint8Array;
      etag: string;
      lastModified: Date;
      resourceType?: string;
      properties?: string;
      owner?: string;
      group?: string;
      permissions?: string;
      acl?: string;
      leaseDuration?: string;
      leaseState?: string;
      leaseStatus?: string;
      isServerEncrypted?: boolean;
      encryptionKeySha256?: string;
      encryptionContext?: string;
      encryptionScope?: string;
      creationTime: Date;
      expiresOn: Date;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
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

export function _readSend(
  context: Client,
  options: PathReadOptionalParams = { requestOptions: {} },
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
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "x-ms-version": context.version ?? "2026-02-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.range !== undefined ? { range: options?.range } : {}),
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.rangeGetContentMD5 !== undefined
          ? { "x-ms-range-get-content-md5": options?.rangeGetContentMD5 }
          : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
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
        ...(options?.encryptionKey !== undefined
          ? { "x-ms-encryption-key": options?.encryptionKey }
          : {}),
        ...(options?.encryptionKeySha256 !== undefined
          ? { "x-ms-encryption-key-sha256": options?.encryptionKeySha256 }
          : {}),
        ...(options?.encryptionAlgorithm !== undefined
          ? { "x-ms-encryption-algorithm": options?.encryptionAlgorithm }
          : {}),
        accept: "application/octet-stream",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _readDeserialize(
  result: PathUncheckedResponse & PathReadResponse,
): Promise<PathReadResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    error.details = { ...(error.details as any), ..._readDeserializeExceptionHeaders(result) };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

export function _readDeserializeHeaders(result: PathUncheckedResponse): {
  acceptRanges?: string;
  cacheControl?: string;
  contentDisposition?: string;
  contentEncoding?: string;
  contentLanguage?: string;
  contentLength?: number;
  contentRange?: string;
  contentMD5?: Uint8Array;
  etag: string;
  lastModified: Date;
  resourceType?: string;
  properties?: string;
  leaseDuration?: string;
  leaseState?: string;
  leaseStatus?: string;
  isServerEncrypted?: boolean;
  encryptionKeySha256?: string;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
  contentType: "application/octet-stream";
} {
  return {
    acceptRanges:
      result.headers["accept-ranges"] === undefined || result.headers["accept-ranges"] === null
        ? result.headers["accept-ranges"]
        : result.headers["accept-ranges"],
    cacheControl:
      result.headers["cache-control"] === undefined || result.headers["cache-control"] === null
        ? result.headers["cache-control"]
        : result.headers["cache-control"],
    contentDisposition:
      result.headers["content-disposition"] === undefined ||
      result.headers["content-disposition"] === null
        ? result.headers["content-disposition"]
        : result.headers["content-disposition"],
    contentEncoding:
      result.headers["content-encoding"] === undefined ||
      result.headers["content-encoding"] === null
        ? result.headers["content-encoding"]
        : result.headers["content-encoding"],
    contentLanguage:
      result.headers["content-language"] === undefined ||
      result.headers["content-language"] === null
        ? result.headers["content-language"]
        : result.headers["content-language"],
    contentLength:
      result.headers["content-length"] === undefined || result.headers["content-length"] === null
        ? result.headers["content-length"]
        : Number(result.headers["content-length"]),
    contentRange:
      result.headers["content-range"] === undefined || result.headers["content-range"] === null
        ? result.headers["content-range"]
        : result.headers["content-range"],
    contentMD5:
      result.headers["content-md5"] === undefined || result.headers["content-md5"] === null
        ? result.headers["content-md5"]
        : typeof result.headers["content-md5"] === "string"
          ? stringToUint8Array(result.headers["content-md5"], "base64")
          : result.headers["content-md5"],
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    resourceType:
      result.headers["x-ms-resource-type"] === undefined ||
      result.headers["x-ms-resource-type"] === null
        ? result.headers["x-ms-resource-type"]
        : result.headers["x-ms-resource-type"],
    properties:
      result.headers["x-ms-properties"] === undefined || result.headers["x-ms-properties"] === null
        ? result.headers["x-ms-properties"]
        : result.headers["x-ms-properties"],
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

export function _readDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
  };
}

/** Read the contents of a file. For read operations, range requests are supported. This operation supports conditional HTTP requests. For more information, see [Specifying Conditional Headers for Blob Service Operations](https://learn.microsoft.com/rest/api/storageservices/specifying-conditional-headers-for-blob-service-operations). */
export async function read(
  context: Client,
  options: PathReadOptionalParams = { requestOptions: {} },
): Promise<
  {
    acceptRanges?: string;
    cacheControl?: string;
    contentDisposition?: string;
    contentEncoding?: string;
    contentLanguage?: string;
    contentLength?: number;
    contentRange?: string;
    contentMD5?: Uint8Array;
    etag: string;
    lastModified: Date;
    resourceType?: string;
    properties?: string;
    leaseDuration?: string;
    leaseState?: string;
    leaseStatus?: string;
    isServerEncrypted?: boolean;
    encryptionKeySha256?: string;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
    contentType: "application/octet-stream";
  } & PathReadResponse &
    StorageCompatResponseInfo<
      PathReadResponse,
      {
        acceptRanges?: string;
        cacheControl?: string;
        contentDisposition?: string;
        contentEncoding?: string;
        contentLanguage?: string;
        contentLength?: number;
        contentRange?: string;
        contentMD5?: Uint8Array;
        etag: string;
        lastModified: Date;
        resourceType?: string;
        properties?: string;
        leaseDuration?: string;
        leaseState?: string;
        leaseStatus?: string;
        isServerEncrypted?: boolean;
        encryptionKeySha256?: string;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
        contentType: "application/octet-stream";
      }
    >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const streamableMethod = _readSend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  const result = await getBinaryStreamResponse(streamableMethod);
  const parsedBody = await _readDeserialize(result);
  const parsedHeaders = _readDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, parsedBody, parsedHeaders);
}

export function _leaseSend(
  context: Client,
  leaseAction: PathLeaseAction,
  options: PathLeaseOptionalParams = { requestOptions: {} },
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
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "x-ms-version": context.version ?? "2026-02-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        "x-ms-lease-action": leaseAction,
        ...(options?.leaseDuration !== undefined
          ? { "x-ms-lease-duration": options?.leaseDuration }
          : {}),
        ...(options?.leaseBreakPeriod !== undefined
          ? { "x-ms-lease-break-period": options?.leaseBreakPeriod }
          : {}),
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.proposedLeaseId !== undefined
          ? { "x-ms-proposed-lease-id": options?.proposedLeaseId }
          : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
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
        ...options.requestOptions?.headers,
      },
    });
}

export async function _leaseDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    error.details = { ...(error.details as any), ..._leaseDeserializeExceptionHeaders(result) };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return;
}

export function _leaseDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  leaseId?: string;
  leaseTime?: string;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    leaseId:
      result.headers["x-ms-lease-id"] === undefined || result.headers["x-ms-lease-id"] === null
        ? result.headers["x-ms-lease-id"]
        : result.headers["x-ms-lease-id"],
    leaseTime:
      result.headers["x-ms-lease-time"] === undefined || result.headers["x-ms-lease-time"] === null
        ? result.headers["x-ms-lease-time"]
        : result.headers["x-ms-lease-time"],
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

export function _leaseDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
  };
}

/** Create and manage a lease to restrict write and delete access to the path. This operation supports conditional HTTP requests. For more information, see [Specifying Conditional Headers for Blob Service Operations](https://learn.microsoft.com/rest/api/storageservices/specifying-conditional-headers-for-blob-service-operations). */
export async function lease(
  context: Client,
  leaseAction: PathLeaseAction,
  options: PathLeaseOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    leaseId?: string;
    leaseTime?: string;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      leaseId?: string;
      leaseTime?: string;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _leaseSend(context, leaseAction, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _leaseDeserialize(result);
  const parsedHeaders = _leaseDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _updateSend(
  context: Client,
  action: PathUpdateAction,
  body: Uint8Array,
  options: PathUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "{?action,maxRecords,continuation,mode,forceFlag,position,retainUncommittedData,close,timeout}",
    {
      action: action,
      maxRecords: options?.maxRecords,
      continuation: options?.continuation,
      mode: options?.mode,
      forceFlag: options?.forceFlag,
      position: options?.position,
      retainUncommittedData: options?.retainUncommittedData,
      close: options?.close,
      timeout: options?.timeout,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/octet-stream",
      headers: {
        "x-ms-version": context.version ?? "2026-02-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.contentLength !== undefined
          ? { "content-length": options?.contentLength }
          : {}),
        ...(options?.contentMD5 !== undefined
          ? {
              "x-ms-content-md5": !options?.contentMD5
                ? options?.contentMD5
                : uint8ArrayToString(options?.contentMD5, "base64"),
            }
          : {}),
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.cacheControl !== undefined
          ? { "x-ms-cache-control": options?.cacheControl }
          : {}),
        ...(options?.contentDisposition !== undefined
          ? { "x-ms-content-disposition": options?.contentDisposition }
          : {}),
        ...(options?.contentEncoding !== undefined
          ? { "x-ms-content-encoding": options?.contentEncoding }
          : {}),
        ...(options?.contentLanguage !== undefined
          ? { "x-ms-content-language": options?.contentLanguage }
          : {}),
        ...(options?.properties !== undefined ? { "x-ms-properties": options?.properties } : {}),
        ...(options?.owner !== undefined ? { "x-ms-owner": options?.owner } : {}),
        ...(options?.group !== undefined ? { "x-ms-group": options?.group } : {}),
        ...(options?.permissions !== undefined ? { "x-ms-permissions": options?.permissions } : {}),
        ...(options?.acl !== undefined ? { "x-ms-acl": options?.acl } : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
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
        ...(options?.structuredBodyType !== undefined
          ? { "x-ms-structured-body": options?.structuredBodyType }
          : {}),
        ...(options?.structuredContentLength !== undefined
          ? { "x-ms-structured-content-length": options?.structuredContentLength }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: body,
    });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<SetAccessControlRecursiveResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    error.details = { ...(error.details as any), ..._updateDeserializeExceptionHeaders(result) };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return setAccessControlRecursiveResponseDeserializer(result.body);
}

export function _updateDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
  acceptRanges?: string;
  cacheControl?: string;
  contentDisposition?: string;
  contentEncoding?: string;
  contentLanguage?: string;
  contentLength?: number;
  contentRange?: string;
  contentMD5?: Uint8Array;
  properties?: string;
  continuation?: string;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
  contentType: "application/json";
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    acceptRanges:
      result.headers["accept-ranges"] === undefined || result.headers["accept-ranges"] === null
        ? result.headers["accept-ranges"]
        : result.headers["accept-ranges"],
    cacheControl:
      result.headers["cache-control"] === undefined || result.headers["cache-control"] === null
        ? result.headers["cache-control"]
        : result.headers["cache-control"],
    contentDisposition:
      result.headers["content-disposition"] === undefined ||
      result.headers["content-disposition"] === null
        ? result.headers["content-disposition"]
        : result.headers["content-disposition"],
    contentEncoding:
      result.headers["content-encoding"] === undefined ||
      result.headers["content-encoding"] === null
        ? result.headers["content-encoding"]
        : result.headers["content-encoding"],
    contentLanguage:
      result.headers["content-language"] === undefined ||
      result.headers["content-language"] === null
        ? result.headers["content-language"]
        : result.headers["content-language"],
    contentLength:
      result.headers["content-length"] === undefined || result.headers["content-length"] === null
        ? result.headers["content-length"]
        : Number(result.headers["content-length"]),
    contentRange:
      result.headers["content-range"] === undefined || result.headers["content-range"] === null
        ? result.headers["content-range"]
        : result.headers["content-range"],
    contentMD5:
      result.headers["content-md5"] === undefined || result.headers["content-md5"] === null
        ? result.headers["content-md5"]
        : typeof result.headers["content-md5"] === "string"
          ? stringToUint8Array(result.headers["content-md5"], "base64")
          : result.headers["content-md5"],
    properties:
      result.headers["x-ms-properties"] === undefined || result.headers["x-ms-properties"] === null
        ? result.headers["x-ms-properties"]
        : result.headers["x-ms-properties"],
    continuation:
      result.headers["x-ms-continuation"] === undefined ||
      result.headers["x-ms-continuation"] === null
        ? result.headers["x-ms-continuation"]
        : result.headers["x-ms-continuation"],
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

export function _updateDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
  };
}

/** Uploads data to be appended to a file, flushes (writes) previously uploaded data to a file, sets properties for a file or directory, or sets access control for a file or directory. Data can only be appended to a file. Concurrent writes to the same file using multiple clients are not supported. This operation supports conditional HTTP requests. For more information, see [Specifying Conditional Headers for Blob Service Operations](https://learn.microsoft.com/rest/api/storageservices/specifying-conditional-headers-for-blob-service-operations). */
export async function update(
  context: Client,
  action: PathUpdateAction,
  body: Uint8Array,
  options: PathUpdateOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    acceptRanges?: string;
    cacheControl?: string;
    contentDisposition?: string;
    contentEncoding?: string;
    contentLanguage?: string;
    contentLength?: number;
    contentRange?: string;
    contentMD5?: Uint8Array;
    properties?: string;
    continuation?: string;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
    contentType: "application/json";
  } & SetAccessControlRecursiveResponse &
    StorageCompatResponseInfo<
      SetAccessControlRecursiveResponse,
      {
        etag: string;
        lastModified: Date;
        acceptRanges?: string;
        cacheControl?: string;
        contentDisposition?: string;
        contentEncoding?: string;
        contentLanguage?: string;
        contentLength?: number;
        contentRange?: string;
        contentMD5?: Uint8Array;
        properties?: string;
        continuation?: string;
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
        contentType: "application/json";
      }
    >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _updateSend(context, action, body, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  const parsedBody = await _updateDeserialize(result);
  const parsedHeaders = _updateDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, parsedBody, parsedHeaders);
}

export function _createSend(
  context: Client,
  options: PathCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "{?resource,mode,continuation,timeout}",
    {
      resource: options?.resource,
      mode: options?.mode,
      continuation: options?.continuation,
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
        "x-ms-version": context.version ?? "2026-02-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.cacheControl !== undefined
          ? { "x-ms-cache-control": options?.cacheControl }
          : {}),
        ...(options?.contentEncoding !== undefined
          ? { "x-ms-content-encoding": options?.contentEncoding }
          : {}),
        ...(options?.contentLanguage !== undefined
          ? { "x-ms-content-language": options?.contentLanguage }
          : {}),
        ...(options?.contentDisposition !== undefined
          ? { "x-ms-content-disposition": options?.contentDisposition }
          : {}),
        ...(options?.contentType !== undefined
          ? { "x-ms-content-type": options?.contentType }
          : {}),
        ...(options?.renameSource !== undefined
          ? { "x-ms-rename-source": options?.renameSource }
          : {}),
        ...(options?.leaseId !== undefined ? { "x-ms-lease-id": options?.leaseId } : {}),
        ...(options?.sourceLeaseId !== undefined
          ? { "x-ms-source-lease-id": options?.sourceLeaseId }
          : {}),
        ...(options?.properties !== undefined ? { "x-ms-properties": options?.properties } : {}),
        ...(options?.permissions !== undefined ? { "x-ms-permissions": options?.permissions } : {}),
        ...(options?.umask !== undefined ? { "x-ms-umask": options?.umask } : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
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
        ...(options?.sourceIfMatch !== undefined
          ? { "x-ms-source-if-match": options?.sourceIfMatch }
          : {}),
        ...(options?.sourceIfNoneMatch !== undefined
          ? { "x-ms-source-if-none-match": options?.sourceIfNoneMatch }
          : {}),
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
        ...(options?.encryptionKey !== undefined
          ? { "x-ms-encryption-key": options?.encryptionKey }
          : {}),
        ...(options?.encryptionKeySha256 !== undefined
          ? { "x-ms-encryption-key-sha256": options?.encryptionKeySha256 }
          : {}),
        ...(options?.encryptionAlgorithm !== undefined
          ? { "x-ms-encryption-algorithm": options?.encryptionAlgorithm }
          : {}),
        ...(options?.owner !== undefined ? { "x-ms-owner": options?.owner } : {}),
        ...(options?.group !== undefined ? { "x-ms-group": options?.group } : {}),
        ...(options?.acl !== undefined ? { "x-ms-acl": options?.acl } : {}),
        ...(options?.proposedLeaseId !== undefined
          ? { "x-ms-proposed-lease-id": options?.proposedLeaseId }
          : {}),
        ...(options?.leaseDuration !== undefined
          ? { "x-ms-lease-duration": options?.leaseDuration }
          : {}),
        ...(options?.expiryOptions !== undefined
          ? { "x-ms-expiry-option": options?.expiryOptions }
          : {}),
        ...(options?.expiresOn !== undefined ? { "x-ms-expiry-time": options?.expiresOn } : {}),
        ...(options?.encryptionContext !== undefined
          ? { "x-ms-encryption-context": options?.encryptionContext }
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
  continuation?: string;
  contentLength?: number;
  isServerEncrypted?: boolean;
  encryptionKeySha256?: string;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    continuation:
      result.headers["x-ms-continuation"] === undefined ||
      result.headers["x-ms-continuation"] === null
        ? result.headers["x-ms-continuation"]
        : result.headers["x-ms-continuation"],
    contentLength:
      result.headers["content-length"] === undefined || result.headers["content-length"] === null
        ? result.headers["content-length"]
        : Number(result.headers["content-length"]),
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
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
  };
}

/** Create or rename a file or directory. By default, the destination is overwritten and if the destination already exists and has a lease the lease is broken. This operation supports conditional HTTP requests. For more information, see [Specifying Conditional Headers for Blob Service Operations](https://learn.microsoft.com/rest/api/storageservices/specifying-conditional-headers-for-blob-service-operations). To fail if the destination already exists, use a conditional request with If-None-Match: "*". */
export async function create(
  context: Client,
  options: PathCreateOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    continuation?: string;
    contentLength?: number;
    isServerEncrypted?: boolean;
    encryptionKeySha256?: string;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      continuation?: string;
      contentLength?: number;
      isServerEncrypted?: boolean;
      encryptionKeySha256?: string;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _createSend(context, { ...options, onResponse: _storageCompat.onResponse });
  await _createDeserialize(result);
  const parsedHeaders = _createDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}
