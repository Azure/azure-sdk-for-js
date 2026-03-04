// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlobContext as Client } from "../index.js";
import {
  BlobServiceProperties,
  blobServicePropertiesXmlSerializer,
  blobServicePropertiesXmlDeserializer,
  errorXmlDeserializer,
  StorageServiceStats,
  storageServiceStatsXmlDeserializer,
  ListContainersSegmentResponse,
  listContainersSegmentResponseXmlDeserializer,
  KeyInfo,
  keyInfoXmlSerializer,
  UserDelegationKey,
  userDelegationKeyXmlDeserializer,
  _submitBatchRequestDeserializer,
  FilterBlobSegment,
  filterBlobSegmentXmlDeserializer,
  SkuName,
  AccountKind,
} from "../../models/azure/storage/blobs/models.js";
import { FileContents } from "../../static-helpers/multipartHelpers.js";
import {
  StorageCompatResponseInfo,
  createStorageCompatOnResponse,
  addStorageCompatResponse,
} from "../../static-helpers/storageCompatResponse.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ServiceFindBlobsByTagsOptionalParams,
  ServiceSubmitBatchOptionalParams,
  ServiceGetAccountInfoOptionalParams,
  ServiceGetUserDelegationKeyOptionalParams,
  ServiceListContainersOptionalParams,
  ServiceGetStatisticsOptionalParams,
  ServiceGetPropertiesOptionalParams,
  ServiceSetPropertiesOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _findBlobsByTagsSend(
  context: Client,
  filterExpression: string,
  options: ServiceFindBlobsByTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=blobs{?timeout,where,marker,maxresults,include}",
    {
      timeout: options?.timeout,
      where: filterExpression,
      marker: options?.marker,
      maxresults: options?.maxPageSize,
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
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _findBlobsByTagsDeserialize(
  result: PathUncheckedResponse,
): Promise<FilterBlobSegment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._findBlobsByTagsDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return filterBlobSegmentXmlDeserializer(result.body);
}

export function _findBlobsByTagsDeserializeHeaders(result: PathUncheckedResponse): {
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

export function _findBlobsByTagsDeserializeExceptionHeaders(result: PathUncheckedResponse): {
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

/** The Filter Blobs operation enables callers to list blobs across all containers whose tags match a given search expression. */
export async function findBlobsByTags(
  context: Client,
  filterExpression: string,
  options: ServiceFindBlobsByTagsOptionalParams = { requestOptions: {} },
): Promise<
  {
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
    contentType: "application/xml";
  } & FilterBlobSegment &
    StorageCompatResponseInfo<
      FilterBlobSegment,
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
  const result = await _findBlobsByTagsSend(context, filterExpression, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  const parsedBody = await _findBlobsByTagsDeserialize(result);
  const parsedHeaders = _findBlobsByTagsDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, parsedBody, parsedHeaders);
}

export function _submitBatchSend(
  context: Client,
  multipartContentType: string,
  contentLength: number,
  body: string,
  options: ServiceSubmitBatchOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=batch{?timeout}",
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
      contentType: multipartContentType,
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        "content-length": contentLength,
        accept: "multipart/mixed",
        ...options.requestOptions?.headers,
      },
      body: body,
    });
}

export async function _submitBatchDeserialize(result: PathUncheckedResponse): Promise<{
  body: FileContents | { contents: FileContents; contentType?: string; filename?: string };
}> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._submitBatchDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return _submitBatchRequestDeserializer(result.body) as any;
}

export function _submitBatchDeserializeHeaders(result: PathUncheckedResponse): {
  version: string;
  requestId?: string;
  clientRequestId?: string;
  contentType: "multipart/mixed";
} {
  return {
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

export function _submitBatchDeserializeExceptionHeaders(result: PathUncheckedResponse): {
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

/** The Batch operation allows multiple API calls to be embedded into a single HTTP request. */
export async function submitBatch(
  context: Client,
  multipartContentType: string,
  contentLength: number,
  body: string,
  options: ServiceSubmitBatchOptionalParams = { requestOptions: {} },
): Promise<
  {
    version: string;
    requestId?: string;
    clientRequestId?: string;
    contentType: "multipart/mixed";
  } & {
    body: FileContents | { contents: FileContents; contentType?: string; filename?: string };
  } & StorageCompatResponseInfo<
      {
        body: FileContents | { contents: FileContents; contentType?: string; filename?: string };
      },
      {
        version: string;
        requestId?: string;
        clientRequestId?: string;
        contentType: "multipart/mixed";
      }
    >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _submitBatchSend(context, multipartContentType, contentLength, body, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  const parsedBody = await _submitBatchDeserialize(result);
  const parsedHeaders = _submitBatchDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, parsedBody, parsedHeaders);
}

export function _getAccountInfoSend(
  context: Client,
  options: ServiceGetAccountInfoOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=account&comp=properties{?timeout}",
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
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getAccountInfoDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._getAccountInfoDeserializeExceptionHeaders(result),
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

export function _getAccountInfoDeserializeHeaders(result: PathUncheckedResponse): {
  skuName?: SkuName;
  accountKind?: AccountKind;
  isHierarchicalNamespaceEnabled?: boolean;
  date: Date;
  version: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    skuName: result.headers["x-ms-sku-name"] as any,
    accountKind: result.headers["x-ms-account-kind"] as any,
    isHierarchicalNamespaceEnabled:
      result.headers["x-ms-is-hns-enabled"] === undefined ||
      result.headers["x-ms-is-hns-enabled"] === null
        ? result.headers["x-ms-is-hns-enabled"]
        : result.headers["x-ms-is-hns-enabled"].trim().toLowerCase() === "true",
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

export function _getAccountInfoDeserializeExceptionHeaders(result: PathUncheckedResponse): {
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

/** Returns the sku name and account kind. */
export async function getAccountInfo(
  context: Client,
  options: ServiceGetAccountInfoOptionalParams = { requestOptions: {} },
): Promise<
  {
    skuName?: SkuName;
    accountKind?: AccountKind;
    isHierarchicalNamespaceEnabled?: boolean;
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
  } & StorageCompatResponseInfo<
    undefined,
    {
      skuName?: SkuName;
      accountKind?: AccountKind;
      isHierarchicalNamespaceEnabled?: boolean;
      date: Date;
      version: string;
      requestId?: string;
      clientRequestId?: string;
    }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _getAccountInfoSend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _getAccountInfoDeserialize(result);
  const parsedHeaders = _getAccountInfoDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}

export function _getUserDelegationKeySend(
  context: Client,
  keyInfo: KeyInfo,
  options: ServiceGetUserDelegationKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=service&comp=userdelegationkey{?timeout}",
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
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.version ?? "2026-04-06",
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

/** Retrieves a user delegation key for the Blob service. This is only a valid operation when using bearer token authentication. */
export async function getUserDelegationKey(
  context: Client,
  keyInfo: KeyInfo,
  options: ServiceGetUserDelegationKeyOptionalParams = { requestOptions: {} },
): Promise<
  {
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
    contentType: "application/xml";
  } & UserDelegationKey &
    StorageCompatResponseInfo<
      UserDelegationKey,
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
  const result = await _getUserDelegationKeySend(context, keyInfo, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  const parsedBody = await _getUserDelegationKeyDeserialize(result);
  const parsedHeaders = _getUserDelegationKeyDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, parsedBody, parsedHeaders);
}

export function _listContainersSend(
  context: Client,
  options: ServiceListContainersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?comp=list{?prefix,marker,maxresults,timeout,include}",
    {
      prefix: options?.prefix,
      marker: options?.marker,
      maxresults: options?.maxPageSize,
      timeout: options?.timeout,
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
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listContainersDeserialize(
  result: PathUncheckedResponse,
): Promise<ListContainersSegmentResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._listContainersDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return listContainersSegmentResponseXmlDeserializer(result.body);
}

export function _listContainersDeserializeHeaders(result: PathUncheckedResponse): {
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

export function _listContainersDeserializeExceptionHeaders(result: PathUncheckedResponse): {
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

/** The List Containers Segment operation returns a list of the containers under the specified account */
export async function listContainers(
  context: Client,
  options: ServiceListContainersOptionalParams = { requestOptions: {} },
): Promise<
  {
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
    contentType: "application/xml";
  } & ListContainersSegmentResponse &
    StorageCompatResponseInfo<
      ListContainersSegmentResponse,
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
  const result = await _listContainersSend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  const parsedBody = await _listContainersDeserialize(result);
  const parsedHeaders = _listContainersDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, parsedBody, parsedHeaders);
}

export function _getStatisticsSend(
  context: Client,
  options: ServiceGetStatisticsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=service&comp=stats{?timeout}",
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
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getStatisticsDeserialize(
  result: PathUncheckedResponse,
): Promise<StorageServiceStats> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = {
      ...(error.details as any),
      ..._getStatisticsDeserializeExceptionHeaders(result),
    };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return storageServiceStatsXmlDeserializer(result.body);
}

export function _getStatisticsDeserializeHeaders(result: PathUncheckedResponse): {
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

export function _getStatisticsDeserializeExceptionHeaders(result: PathUncheckedResponse): {
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

/** Retrieves statistics related to replication for the Blob service. It is only available on the secondary location endpoint when read-access geo-redundant replication is enabled for the storage account. */
export async function getStatistics(
  context: Client,
  options: ServiceGetStatisticsOptionalParams = { requestOptions: {} },
): Promise<
  {
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
    contentType: "application/xml";
  } & StorageServiceStats &
    StorageCompatResponseInfo<
      StorageServiceStats,
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
  const result = await _getStatisticsSend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  const parsedBody = await _getStatisticsDeserialize(result);
  const parsedHeaders = _getStatisticsDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, parsedBody, parsedHeaders);
}

export function _getPropertiesSend(
  context: Client,
  options: ServiceGetPropertiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=service&comp=properties{?timeout}",
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
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getPropertiesDeserialize(
  result: PathUncheckedResponse,
): Promise<BlobServiceProperties> {
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

  return blobServicePropertiesXmlDeserializer(result.body);
}

export function _getPropertiesDeserializeHeaders(result: PathUncheckedResponse): {
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

/** Retrieves properties of a storage account's Blob service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules. */
export async function getProperties(
  context: Client,
  options: ServiceGetPropertiesOptionalParams = { requestOptions: {} },
): Promise<
  {
    date: Date;
    version: string;
    requestId?: string;
    clientRequestId?: string;
    contentType: "application/xml";
  } & BlobServiceProperties &
    StorageCompatResponseInfo<
      BlobServiceProperties,
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
  storageServiceProperties: BlobServiceProperties,
  options: ServiceSetPropertiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "?restype=service&comp=properties{?timeout}",
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
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
      body: blobServicePropertiesXmlSerializer(storageServiceProperties),
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

/** Sets properties for a storage account's Blob service endpoint, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules */
export async function setProperties(
  context: Client,
  storageServiceProperties: BlobServiceProperties,
  options: ServiceSetPropertiesOptionalParams = { requestOptions: {} },
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
  const result = await _setPropertiesSend(context, storageServiceProperties, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _setPropertiesDeserialize(result);
  const parsedHeaders = _setPropertiesDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}
