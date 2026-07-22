// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TablesContext as Client } from "../index.js";
import {
  tableServiceErrorXmlDeserializer,
  TableServiceProperties,
  tableServicePropertiesXmlSerializer,
  tableServicePropertiesXmlDeserializer,
  Logging,
  Metrics,
  CorsRule,
  TableServiceStats,
  tableServiceStatsXmlDeserializer,
  GeoReplication,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
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
        "x-ms-version": context.apiVersion ?? "2019-02-02",
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
): Promise<TableServiceStats> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = tableServiceErrorXmlDeserializer(result.body);
    }
    error.details = {
      ...(error.details as any),
      ..._getStatisticsDeserializeExceptionHeaders(result),
    };
    throw error;
  }

  return tableServiceStatsXmlDeserializer(result.body);
}

export function _getStatisticsDeserializeHeaders(result: PathUncheckedResponse): {
  date: Date;
  apiVersion: string;
  requestId?: string;
  clientRequestId?: string;
  contentType: "application/xml";
} {
  return {
    date: new Date(result.headers["date"]),
    apiVersion: result.headers["x-ms-version"],
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
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
  };
}

/**
 * Retrieves statistics related to replication for the Table service. It is only
 * available on the secondary location endpoint when read-access geo-redundant
 * replication is enabled for the account.
 */
export async function getStatistics(
  context: Client,
  options: ServiceGetStatisticsOptionalParams = { requestOptions: {} },
): Promise<{
  geoReplication?: GeoReplication;
  date: Date;
  apiVersion: string;
  requestId?: string;
  clientRequestId?: string;
  contentType: "application/xml";
}> {
  const result = await _getStatisticsSend(context, options);
  const headers = _getStatisticsDeserializeHeaders(result);
  const payload = await _getStatisticsDeserialize(result);
  return { ...payload, ...headers };
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
        "x-ms-version": context.apiVersion ?? "2019-02-02",
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
): Promise<TableServiceProperties> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = tableServiceErrorXmlDeserializer(result.body);
    }
    error.details = {
      ...(error.details as any),
      ..._getPropertiesDeserializeExceptionHeaders(result),
    };
    throw error;
  }

  return tableServicePropertiesXmlDeserializer(result.body);
}

export function _getPropertiesDeserializeHeaders(result: PathUncheckedResponse): {
  apiVersion: string;
  requestId?: string;
  clientRequestId?: string;
  contentType: "application/xml";
} {
  return {
    apiVersion: result.headers["x-ms-version"],
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
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
  };
}

/**
 * Gets the properties of an account's Table service, including properties for
 * Analytics and CORS (Cross-Origin Resource Sharing) rules.
 */
export async function getProperties(
  context: Client,
  options: ServiceGetPropertiesOptionalParams = { requestOptions: {} },
): Promise<{
  logging?: Logging;
  hourMetrics?: Metrics;
  minuteMetrics?: Metrics;
  cors?: CorsRule[];
  apiVersion: string;
  requestId?: string;
  clientRequestId?: string;
  contentType: "application/xml";
}> {
  const result = await _getPropertiesSend(context, options);
  const headers = _getPropertiesDeserializeHeaders(result);
  const payload = await _getPropertiesDeserialize(result);
  return { ...payload, ...headers };
}

export function _setPropertiesSend(
  context: Client,
  tableServiceProperties: TableServiceProperties,
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
        "x-ms-version": context.apiVersion ?? "2019-02-02",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
      body: tableServicePropertiesXmlSerializer(tableServiceProperties),
    });
}

export async function _setPropertiesDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = tableServiceErrorXmlDeserializer(result.body);
    }
    error.details = {
      ...(error.details as any),
      ..._setPropertiesDeserializeExceptionHeaders(result),
    };
    throw error;
  }

  return;
}

export function _setPropertiesDeserializeHeaders(result: PathUncheckedResponse): {
  apiVersion: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    apiVersion: result.headers["x-ms-version"],
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

/**
 * Sets properties for an account's Table service endpoint, including properties
 * for Analytics and CORS (Cross-Origin Resource Sharing) rules.
 */
export async function setProperties(
  context: Client,
  tableServiceProperties: TableServiceProperties,
  options: ServiceSetPropertiesOptionalParams = { requestOptions: {} },
): Promise<{ apiVersion: string; requestId?: string; clientRequestId?: string }> {
  const result = await _setPropertiesSend(context, tableServiceProperties, options);
  const headers = _setPropertiesDeserializeHeaders(result);
  await _setPropertiesDeserialize(result);
  return { ...headers };
}
