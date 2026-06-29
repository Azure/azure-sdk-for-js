// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TablesContext as Client } from "../index.js";
import {
  tableServiceErrorXmlDeserializer,
  TableServiceProperties,
  tableServicePropertiesXmlSerializer,
  tableServicePropertiesXmlDeserializer,
  TableServiceStats,
  tableServiceStatsXmlDeserializer,
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
    error.details = tableServiceErrorXmlDeserializer(result.body);

    throw error;
  }

  return tableServiceStatsXmlDeserializer(result.body);
}

/**
 * Retrieves statistics related to replication for the Table service. It is only
 * available on the secondary location endpoint when read-access geo-redundant
 * replication is enabled for the account.
 */
export async function getStatistics(
  context: Client,
  options: ServiceGetStatisticsOptionalParams = { requestOptions: {} },
): Promise<TableServiceStats> {
  const result = await _getStatisticsSend(context, options);
  return _getStatisticsDeserialize(result);
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
    error.details = tableServiceErrorXmlDeserializer(result.body);

    throw error;
  }

  return tableServicePropertiesXmlDeserializer(result.body);
}

/**
 * Gets the properties of an account's Table service, including properties for
 * Analytics and CORS (Cross-Origin Resource Sharing) rules.
 */
export async function getProperties(
  context: Client,
  options: ServiceGetPropertiesOptionalParams = { requestOptions: {} },
): Promise<TableServiceProperties> {
  const result = await _getPropertiesSend(context, options);
  return _getPropertiesDeserialize(result);
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
    error.details = tableServiceErrorXmlDeserializer(result.body);

    throw error;
  }

  return;
}

/**
 * Sets properties for an account's Table service endpoint, including properties
 * for Analytics and CORS (Cross-Origin Resource Sharing) rules.
 */
export async function setProperties(
  context: Client,
  tableServiceProperties: TableServiceProperties,
  options: ServiceSetPropertiesOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _setPropertiesSend(context, tableServiceProperties, options);
  return _setPropertiesDeserialize(result);
}
