// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { QueuesContext as Client } from "../index.js";
import {
  QueueServiceProperties,
  queueServicePropertiesXmlSerializer,
  queueServicePropertiesXmlDeserializer,
  errorXmlDeserializer,
  QueueServiceStats,
  queueServiceStatsXmlDeserializer,
  KeyInfo,
  keyInfoXmlSerializer,
  UserDelegationKey,
  userDelegationKeyXmlDeserializer,
  ListQueuesResponse,
  listQueuesResponseXmlDeserializer,
} from "../../models/azure/storage/queues/models.js";
import {
  StorageCompatResponseInfo,
  createStorageCompatOnResponse,
  addStorageCompatResponse,
} from "../../static-helpers/storageCompatResponse.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ServiceGetQueuesOptionalParams,
  ServiceGetUserDelegationKeyOptionalParams,
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

export function _getQueuesSend(
  context: Client,
  options: ServiceGetQueuesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?comp=list{?prefix,marker,maxresults,timeout,include}",
    {
      prefix: options?.prefix,
      marker: options?.marker,
      maxresults: options?.maxresults,
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
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getQueuesDeserialize(
  result: PathUncheckedResponse,
): Promise<ListQueuesResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorXmlDeserializer(result.body);
    error.details = { ...(error.details as any), ..._getQueuesDeserializeExceptionHeaders(result) };
    error.details = { ...(error.details as any), errorCode: result.headers["x-ms-error-code"] };
    const restErrorCodeValue = result.headers["x-ms-error-code"];
    if (restErrorCodeValue !== undefined) {
      error.code = restErrorCodeValue;
    }
    throw error;
  }

  return listQueuesResponseXmlDeserializer(result.body);
}

export function _getQueuesDeserializeHeaders(result: PathUncheckedResponse): {
  version: string;
  requestId?: string;
  clientRequestId?: string;
  date: Date;
  contentType: "application/xml";
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
    date: new Date(result.headers["date"]),
    contentType: result.headers["content-type"] as any,
  };
}

export function _getQueuesDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
  };
}

/** returns a list of the queues under the specified account */
export async function getQueues(
  context: Client,
  options: ServiceGetQueuesOptionalParams = { requestOptions: {} },
): Promise<
  {
    version: string;
    requestId?: string;
    clientRequestId?: string;
    date: Date;
    contentType: "application/xml";
  } & ListQueuesResponse &
    StorageCompatResponseInfo<
      ListQueuesResponse,
      {
        version: string;
        requestId?: string;
        clientRequestId?: string;
        date: Date;
        contentType: "application/xml";
      }
    >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _getQueuesSend(context, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  const parsedBody = await _getQueuesDeserialize(result);
  const parsedHeaders = _getQueuesDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, parsedBody, parsedHeaders);
}

export function _getUserDelegationKeySend(
  context: Client,
  keyInfo: KeyInfo,
  options: ServiceGetUserDelegationKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?restype=service&comp=userdelegationkey{?timeout}",
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
  version: string;
  requestId?: string;
  clientRequestId?: string;
  date: Date;
  contentType: "application/xml";
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
    date: new Date(result.headers["date"]),
    contentType: result.headers["content-type"] as any,
  };
}

export function _getUserDelegationKeyDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
  };
}

/** Retrieves a user delegation key for the Queue service. This is only a valid operation when using bearer token authentication. */
export async function getUserDelegationKey(
  context: Client,
  keyInfo: KeyInfo,
  options: ServiceGetUserDelegationKeyOptionalParams = { requestOptions: {} },
): Promise<
  {
    version: string;
    requestId?: string;
    clientRequestId?: string;
    date: Date;
    contentType: "application/xml";
  } & UserDelegationKey &
    StorageCompatResponseInfo<
      UserDelegationKey,
      {
        version: string;
        requestId?: string;
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

export function _getStatisticsSend(
  context: Client,
  options: ServiceGetStatisticsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?restype=service&comp=stats{?timeout}",
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
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getStatisticsDeserialize(
  result: PathUncheckedResponse,
): Promise<QueueServiceStats> {
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

  return queueServiceStatsXmlDeserializer(result.body);
}

export function _getStatisticsDeserializeHeaders(result: PathUncheckedResponse): {
  version: string;
  requestId?: string;
  clientRequestId?: string;
  date: Date;
  contentType: "application/xml";
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
    date: new Date(result.headers["date"]),
    contentType: result.headers["content-type"] as any,
  };
}

export function _getStatisticsDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
  };
}

/** Retrieves statistics related to replication for the Queue service. It is only available on the secondary location endpoint when read-access geo-redundant replication is enabled for the storage account. */
export async function getStatistics(
  context: Client,
  options: ServiceGetStatisticsOptionalParams = { requestOptions: {} },
): Promise<
  {
    version: string;
    requestId?: string;
    clientRequestId?: string;
    date: Date;
    contentType: "application/xml";
  } & QueueServiceStats &
    StorageCompatResponseInfo<
      QueueServiceStats,
      {
        version: string;
        requestId?: string;
        clientRequestId?: string;
        date: Date;
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
    "/?restype=service&comp=properties{?timeout}",
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
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getPropertiesDeserialize(
  result: PathUncheckedResponse,
): Promise<QueueServiceProperties> {
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

  return queueServicePropertiesXmlDeserializer(result.body);
}

export function _getPropertiesDeserializeHeaders(result: PathUncheckedResponse): {
  version: string;
  requestId?: string;
  clientRequestId?: string;
  date: Date;
  contentType: "application/xml";
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
    date: new Date(result.headers["date"]),
    contentType: result.headers["content-type"] as any,
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

/** Retrieves properties of a storage account's Queue service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules. */
export async function getProperties(
  context: Client,
  options: ServiceGetPropertiesOptionalParams = { requestOptions: {} },
): Promise<
  {
    version: string;
    requestId?: string;
    clientRequestId?: string;
    date: Date;
    contentType: "application/xml";
  } & QueueServiceProperties &
    StorageCompatResponseInfo<
      QueueServiceProperties,
      {
        version: string;
        requestId?: string;
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
  queueServiceProperties: QueueServiceProperties,
  options: ServiceSetPropertiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/?restype=service&comp=properties{?timeout}",
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
        "x-ms-version": context.version ?? "2026-04-06",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
      body: queueServicePropertiesXmlSerializer(queueServiceProperties),
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
  version: string;
  requestId?: string;
  clientRequestId?: string;
  date: Date;
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
    date: new Date(result.headers["date"]),
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

/** Sets properties for a storage account's Queue service endpoint, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules */
export async function setProperties(
  context: Client,
  queueServiceProperties: QueueServiceProperties,
  options: ServiceSetPropertiesOptionalParams = { requestOptions: {} },
): Promise<
  {
    version: string;
    requestId?: string;
    clientRequestId?: string;
    date: Date;
  } & StorageCompatResponseInfo<
    undefined,
    { version: string; requestId?: string; clientRequestId?: string; date: Date }
  >
> {
  const _storageCompat = createStorageCompatOnResponse(options.onResponse);
  const result = await _setPropertiesSend(context, queueServiceProperties, {
    ...options,
    onResponse: _storageCompat.onResponse,
  });
  await _setPropertiesDeserialize(result);
  const parsedHeaders = _setPropertiesDeserializeHeaders(result);
  return addStorageCompatResponse(_storageCompat.getRawResponse()!, undefined, parsedHeaders);
}
