// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataLakeContext as Client } from "../index.js";
import {
  storageErrorDeserializer,
  PathList,
  pathListDeserializer,
  ListBlobsHierarchySegmentResponse,
  listBlobsHierarchySegmentResponseXmlDeserializer,
  FileSystemResourceType,
} from "../../models/azure/storage/files/dataLake/models.js";
import {
  StorageCompatResponseInfo,
  createStorageCompatOnResponse,
  addStorageCompatResponse,
} from "../../static-helpers/storageCompatResponse.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  FileSystemListBlobHierarchySegmentOptionalParams,
  FileSystemListPathsOptionalParams,
  FileSystemDeleteOptionalParams,
  FileSystemGetPropertiesOptionalParams,
  FileSystemSetPropertiesOptionalParams,
  FileSystemCreateOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listBlobHierarchySegmentSend(
  context: Client,
  options: FileSystemListBlobHierarchySegmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=container&comp=list{?prefix,delimiter,marker,maxResults,include,showonly,timeout}",
    {
      prefix: options?.prefix,
      delimiter: options?.delimiter,
      marker: options?.marker,
      maxResults: options?.maxResults,
      include: !options?.include
        ? options?.include
        : options?.include.map((p: any) => {
            return p;
          }),
      showonly: options?.showonly,
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
        "x-ms-version": context.version ?? "2026-06-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listBlobHierarchySegmentDeserialize(
  result: PathUncheckedResponse,
): Promise<ListBlobsHierarchySegmentResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._listBlobHierarchySegmentDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return listBlobsHierarchySegmentResponseXmlDeserializer(result.body);
}

export function _listBlobHierarchySegmentDeserializeHeaders(result: PathUncheckedResponse): {
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
  contentType: "application/xml";
} {
  return {
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

export function _listBlobHierarchySegmentDeserializeExceptionHeaders(
  result: PathUncheckedResponse,
): { errorCode?: string } {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
  };
}

/** The List Blobs operation returns a list of the blobs under the specified container. */
export async function listBlobHierarchySegment(
  context: Client,
  options: FileSystemListBlobHierarchySegmentOptionalParams = { requestOptions: {} },
): Promise<
  {
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
    contentType: "application/xml";
  } & ListBlobsHierarchySegmentResponse &
    StorageCompatResponseInfo<
      ListBlobsHierarchySegmentResponse,
      {
        date: Date;
        version: string;
        requestId?: string;
        clientRequestId?: string;
        contentType: "application/xml";
      }
    >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _listBlobHierarchySegmentSend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  const parsedBody = await _listBlobHierarchySegmentDeserialize(result);
  const parsedHeaders = _listBlobHierarchySegmentDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, parsedBody, parsedHeaders);
}

export function _listPathsSend(
  context: Client,
  recursive: boolean,
  options: FileSystemListPathsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?resource=filesystem{?continuation,directory,recursive,maxResults,upn,beginFrom,timeout}",
    {
      continuation: options?.continuation,
      directory: options?.path,
      recursive: recursive,
      maxResults: options?.maxResults,
      upn: options?.upn,
      beginFrom: options?.beginFrom,
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
        "x-ms-version": context.version ?? "2026-06-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listPathsDeserialize(result: PathUncheckedResponse): Promise<PathList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    error.details = { ...(error.details as any), ..._listPathsDeserializeExceptionHeaders(result) };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return pathListDeserializer(result.body);
}

export function _listPathsDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  lastModified: Date;
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

export function _listPathsDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
  };
}

/** List FileSystem paths and their properties. */
export async function listPaths(
  context: Client,
  recursive: boolean,
  options: FileSystemListPathsOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    continuation?: string;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
    contentType: "application/json";
  } & PathList &
    StorageCompatResponseInfo<
      PathList,
      {
        etag: string;
        lastModified: Date;
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
  const result = await _listPathsSend(context, recursive, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  const parsedBody = await _listPathsDeserialize(result);
  const parsedHeaders = _listPathsDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, parsedBody, parsedHeaders);
}

export function _$deleteSend(
  context: Client,
  resource: FileSystemResourceType,
  options: FileSystemDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "{?resource,timeout}",
    {
      resource: resource,
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
        "x-ms-version": context.version ?? "2026-06-06",
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
        ...options.requestOptions?.headers,
      },
    });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
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
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
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

/** Marks the FileSystem for deletion. When a FileSystem is deleted, a FileSystem with the same identifier cannot be created for at least 30 seconds. While the filesystem is being deleted, attempts to create a filesystem with the same identifier will fail with status code 409 (Conflict), with the service returning additional error information indicating that the filesystem is being deleted. All other operations, including operations on any files or directories within the filesystem, will fail with status code 404 (Not Found) while the filesystem is being deleted. This operation supports conditional HTTP requests. For more information, see [Specifying Conditional Headers for Blob Service Operations](https://learn.microsoft.com/rest/api/storageservices/specifying-conditional-headers-for-blob-service-operations). */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resource: FileSystemResourceType,
  options: FileSystemDeleteOptionalParams = { requestOptions: {} },
): Promise<
  {
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  } & StorageCompatResponseInfo<
    undefined,
    { date: Date; version: string; requestId?: string; clientRequestId?: string }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _$deleteSend(context, resource, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _$deleteDeserialize(result);
  const parsedHeaders = _$deleteDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _getPropertiesSend(
  context: Client,
  resource: FileSystemResourceType,
  options: FileSystemGetPropertiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "{?resource,timeout}",
    {
      resource: resource,
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
        "x-ms-version": context.version ?? "2026-06-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
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
  etag: string;
  lastModified: Date;
  properties?: string;
  namespaceEnabled?: string;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    properties:
      result.headers["x-ms-properties"] === undefined || result.headers["x-ms-properties"] === null
        ? result.headers["x-ms-properties"]
        : result.headers["x-ms-properties"],
    namespaceEnabled:
      result.headers["x-ms-namespace-enabled"] === undefined ||
      result.headers["x-ms-namespace-enabled"] === null
        ? result.headers["x-ms-namespace-enabled"]
        : result.headers["x-ms-namespace-enabled"],
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

/** All system and user-defined filesystem properties are specified in the response headers. */
export async function getProperties(
  context: Client,
  resource: FileSystemResourceType,
  options: FileSystemGetPropertiesOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    properties?: string;
    namespaceEnabled?: string;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      properties?: string;
      namespaceEnabled?: string;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _getPropertiesSend(context, resource, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _getPropertiesDeserialize(result);
  const parsedHeaders = _getPropertiesDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _setPropertiesSend(
  context: Client,
  resource: FileSystemResourceType,
  options: FileSystemSetPropertiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "{?resource,timeout}",
    {
      resource: resource,
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
        "x-ms-version": context.version ?? "2026-06-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.properties !== undefined ? { "x-ms-properties": options?.properties } : {}),
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

export async function _setPropertiesDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
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

export function _setPropertiesDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
  };
}

/** Set properties for the FileSystem. This operation supports conditional HTTP requests. For more information, see [Specifying Conditional Headers for Blob Service Operations](https://learn.microsoft.com/rest/api/storageservices/specifying-conditional-headers-for-blob-service-operations). */
export async function setProperties(
  context: Client,
  resource: FileSystemResourceType,
  options: FileSystemSetPropertiesOptionalParams = { requestOptions: {} },
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
  const result = await _setPropertiesSend(context, resource, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _setPropertiesDeserialize(result);
  const parsedHeaders = _setPropertiesDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _createSend(
  context: Client,
  resource: FileSystemResourceType,
  options: FileSystemCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "{?resource,timeout}",
    {
      resource: resource,
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
        "x-ms-version": context.version ?? "2026-06-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.properties !== undefined ? { "x-ms-properties": options?.properties } : {}),
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
  namespaceEnabled?: string;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    etag: result.headers["etag"],
    lastModified: new Date(result.headers["last-modified"]),
    namespaceEnabled:
      result.headers["x-ms-namespace-enabled"] === undefined ||
      result.headers["x-ms-namespace-enabled"] === null
        ? result.headers["x-ms-namespace-enabled"]
        : result.headers["x-ms-namespace-enabled"],
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

/** Create a FileSystem rooted at the specified location. If the FileSystem already exists, the operation fails. This operation does not support conditional HTTP requests. */
export async function create(
  context: Client,
  resource: FileSystemResourceType,
  options: FileSystemCreateOptionalParams = { requestOptions: {} },
): Promise<
  {
    etag: string;
    lastModified: Date;
    namespaceEnabled?: string;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  } & StorageCompatResponseInfo<
    undefined,
    {
      etag: string;
      lastModified: Date;
      namespaceEnabled?: string;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _createSend(context, resource, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _createDeserialize(result);
  const parsedHeaders = _createDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}
