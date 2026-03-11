// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FileContext as Client } from "../index.js";
import {
  FileServiceProperties,
  fileServicePropertiesXmlSerializer,
  fileServicePropertiesXmlDeserializer,
  errorXmlDeserializer,
  ListSharesResponse,
  listSharesResponseXmlDeserializer,
  KeyInfo,
  keyInfoXmlSerializer,
  UserDelegationKey,
  userDelegationKeyXmlDeserializer,
} from "../../models/azure/storage/files/shares/models.js";
import {
  StorageCompatResponseInfo,
  createStorageCompatOnResponse,
  addStorageCompatResponse,
} from "../../static-helpers/storageCompatResponse.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ServiceGetUserDelegationKeyOptionalParams,
  ServiceListSharesSegmentOptionalParams,
  ServiceGetPropertiesOptionalParams,
  ServiceSetPropertiesOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getUserDelegationKeySend(
  context: Client,
  keyInfo: KeyInfo,
  options: ServiceGetUserDelegationKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=service&comp=userdelegationkey{?timeout}",
    {
      timeout: options?.timeoutInSeconds,
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
        "x-ms-version": context.apiVersion ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
      body: keyInfoXmlSerializer(keyInfo),
    });
}

export async function _getUserDelegationKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<UserDelegationKey> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._getUserDelegationKeyDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return userDelegationKeyXmlDeserializer(result.body);
}

export function _getUserDelegationKeyDeserializeHeaders(result: PathUncheckedResponse): {
  apiVersion: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
  contentType: "application/xml";
} {
  return {
    apiVersion: result.headers["x-ms-version"],
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

export function _getUserDelegationKeyDeserializeExceptionHeaders(result: PathUncheckedResponse): {
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

/** Retrieves a user delegation key for the File service. This can be used to generate a user delegation SAS. */
export async function getUserDelegationKey(
  context: Client,
  keyInfo: KeyInfo,
  options: ServiceGetUserDelegationKeyOptionalParams = { requestOptions: {} },
): Promise<
  {
    apiVersion: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
    contentType: "application/xml";
  } & UserDelegationKey &
    StorageCompatResponseInfo<
      UserDelegationKey,
      {
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
        contentType: "application/xml";
      }
    >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _getUserDelegationKeySend(context, keyInfo, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  const parsedBody = await _getUserDelegationKeyDeserialize(result);
  const parsedHeaders = _getUserDelegationKeyDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, parsedBody, parsedHeaders);
}

export function _listSharesSegmentSend(
  context: Client,
  options: ServiceListSharesSegmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=list{?prefix,marker,maxresults,timeout,include}",
    {
      prefix: options?.prefix,
      marker: options?.marker,
      maxresults: options?.maxPageSize,
      timeout: options?.timeoutInSeconds,
      include: !options?.include
        ? options?.include
        : options?.include.map((p: any) => {
            return p;
          }),
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
        "x-ms-version": context.apiVersion ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listSharesSegmentDeserialize(
  result: PathUncheckedResponse,
): Promise<ListSharesResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._listSharesSegmentDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return listSharesResponseXmlDeserializer(result.body);
}

export function _listSharesSegmentDeserializeHeaders(result: PathUncheckedResponse): {
  apiVersion: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
  contentType: "application/xml";
} {
  return {
    apiVersion: result.headers["x-ms-version"],
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

export function _listSharesSegmentDeserializeExceptionHeaders(result: PathUncheckedResponse): {
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

/** The List Shares Segment operation returns a list of the shares and share snapshots under the specified account. */
export async function listSharesSegment(
  context: Client,
  options: ServiceListSharesSegmentOptionalParams = { requestOptions: {} },
): Promise<
  {
    apiVersion: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
    contentType: "application/xml";
  } & ListSharesResponse &
    StorageCompatResponseInfo<
      ListSharesResponse,
      {
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
        contentType: "application/xml";
      }
    >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _listSharesSegmentSend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  const parsedBody = await _listSharesSegmentDeserialize(result);
  const parsedHeaders = _listSharesSegmentDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, parsedBody, parsedHeaders);
}

export function _getPropertiesSend(
  context: Client,
  options: ServiceGetPropertiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=service&comp=properties{?timeout}",
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
        "x-ms-version": context.apiVersion ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getPropertiesDeserialize(
  result: PathUncheckedResponse,
): Promise<FileServiceProperties> {
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

  return fileServicePropertiesXmlDeserializer(result.body);
}

export function _getPropertiesDeserializeHeaders(result: PathUncheckedResponse): {
  apiVersion: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
  contentType: "application/xml";
} {
  return {
    apiVersion: result.headers["x-ms-version"],
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

/** Gets the properties of a storage account's File service, including properties for Storage Analytics metrics and CORS (Cross-Origin Resource Sharing) rules. */
export async function getProperties(
  context: Client,
  options: ServiceGetPropertiesOptionalParams = { requestOptions: {} },
): Promise<
  {
    apiVersion: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
    contentType: "application/xml";
  } & FileServiceProperties &
    StorageCompatResponseInfo<
      FileServiceProperties,
      {
        apiVersion: string;
        requestId: string;
        clientRequestId?: string;
        date: Date;
        contentType: "application/xml";
      }
    >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _getPropertiesSend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  const parsedBody = await _getPropertiesDeserialize(result);
  const parsedHeaders = _getPropertiesDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, parsedBody, parsedHeaders);
}

export function _setPropertiesSend(
  context: Client,
  storageServiceProperties: FileServiceProperties,
  options: ServiceSetPropertiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=service&comp=properties{?timeout}",
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
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.apiVersion ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.fileRequestIntent !== undefined
          ? { "x-ms-file-request-intent": options?.fileRequestIntent }
          : {}),
        ...options.requestOptions?.headers,
      },
      body: fileServicePropertiesXmlSerializer(storageServiceProperties),
    });
}

export async function _setPropertiesDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
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
  apiVersion: string;
  requestId: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    apiVersion: result.headers["x-ms-version"],
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

/** Sets properties for a storage account's File service endpoint, including properties for Storage Analytics metrics and CORS (Cross-Origin Resource Sharing) rules. */
export async function setProperties(
  context: Client,
  storageServiceProperties: FileServiceProperties,
  options: ServiceSetPropertiesOptionalParams = { requestOptions: {} },
): Promise<
  {
    apiVersion: string;
    requestId: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    { apiVersion: string; requestId: string; clientRequestId?: string; date: Date }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _setPropertiesSend(context, storageServiceProperties, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _setPropertiesDeserialize(result);
  const parsedHeaders = _setPropertiesDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}
