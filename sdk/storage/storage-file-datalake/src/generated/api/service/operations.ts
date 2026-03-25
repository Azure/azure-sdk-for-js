// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataLakeContext as Client } from "../index.js";
import {
  FileSystemList,
  fileSystemListDeserializer,
  storageErrorDeserializer,
  AccountResourceType,
} from "../../models/azure/storage/files/dataLake/models.js";
import {
  StorageCompatResponseInfo,
  createStorageCompatOnResponse,
  addStorageCompatResponse,
} from "../../static-helpers/storageCompatResponse.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { ServiceListFileSystemsOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listFileSystemsSend(
  context: Client,
  resource: AccountResourceType,
  options: ServiceListFileSystemsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "{?resource,prefix,continuation,maxResults,timeout}",
    {
      resource: resource,
      prefix: options?.prefix,
      continuation: options?.continuation,
      maxResults: options?.maxResults,
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
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listFileSystemsDeserialize(
  result: PathUncheckedResponse,
): Promise<FileSystemList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = storageErrorDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._listFileSystemsDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return fileSystemListDeserializer(result.body);
}

export function _listFileSystemsDeserializeHeaders(result: PathUncheckedResponse): {
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

export function _listFileSystemsDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
  };
}

/** List filesystems and their properties in given account. */
export async function listFileSystems(
  context: Client,
  resource: AccountResourceType,
  options: ServiceListFileSystemsOptionalParams = { requestOptions: {} },
): Promise<
  {
    continuation?: string;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
    contentType: "application/json";
  } & FileSystemList &
    StorageCompatResponseInfo<
      FileSystemList,
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
  const result = await _listFileSystemsSend(context, resource, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  const parsedBody = await _listFileSystemsDeserialize(result);
  const parsedHeaders = _listFileSystemsDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, parsedBody, parsedHeaders);
}
