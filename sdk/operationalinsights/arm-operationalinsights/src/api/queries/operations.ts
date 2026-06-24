// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  LogAnalyticsQueryPackQuery,
  logAnalyticsQueryPackQuerySerializer,
  logAnalyticsQueryPackQueryDeserializer,
  _LogAnalyticsQueryPackQueryListResult,
  _logAnalyticsQueryPackQueryListResultDeserializer,
  LogAnalyticsQueryPackQuerySearchProperties,
  logAnalyticsQueryPackQuerySearchPropertiesSerializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  QueriesListSearchOptionalParams,
  QueriesListOptionalParams,
  QueriesDeleteOptionalParams,
  QueriesUpdateOptionalParams,
  QueriesPutOptionalParams,
  QueriesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSearchSend(
  context: Client,
  resourceGroupName: string,
  queryPackName: string,
  querySearchProperties: LogAnalyticsQueryPackQuerySearchProperties,
  options: QueriesListSearchOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/queryPacks/{queryPackName}/queries/search{?api%2Dversion,%24top,includeBody,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      queryPackName: queryPackName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
      "%24top": options?.top,
      includeBody: options?.includeBody,
      "%24skipToken": options?.skipToken,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: logAnalyticsQueryPackQuerySearchPropertiesSerializer(querySearchProperties),
    });
}

export async function _listSearchDeserialize(
  result: PathUncheckedResponse,
): Promise<_LogAnalyticsQueryPackQueryListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _logAnalyticsQueryPackQueryListResultDeserializer(result.body);
}

/** Search a list of Queries defined within a Log Analytics QueryPack according to given search properties. */
export function listSearch(
  context: Client,
  resourceGroupName: string,
  queryPackName: string,
  querySearchProperties: LogAnalyticsQueryPackQuerySearchProperties,
  options: QueriesListSearchOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LogAnalyticsQueryPackQuery> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listSearchSend(context, resourceGroupName, queryPackName, querySearchProperties, options),
    _listSearchDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-07-01" },
  );
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  queryPackName: string,
  options: QueriesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/queryPacks/{queryPackName}/queries{?api%2Dversion,%24top,includeBody,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      queryPackName: queryPackName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
      "%24top": options?.top,
      includeBody: options?.includeBody,
      "%24skipToken": options?.skipToken,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_LogAnalyticsQueryPackQueryListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _logAnalyticsQueryPackQueryListResultDeserializer(result.body);
}

/** Gets a list of Queries defined within a Log Analytics QueryPack. */
export function list(
  context: Client,
  resourceGroupName: string,
  queryPackName: string,
  options: QueriesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LogAnalyticsQueryPackQuery> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, queryPackName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-07-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  queryPackName: string,
  id: string,
  options: QueriesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/queryPacks/{queryPackName}/queries/{id}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      queryPackName: queryPackName,
      id: id,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes a specific Query defined within an Log Analytics QueryPack. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  queryPackName: string,
  id: string,
  options: QueriesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, queryPackName, id, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  queryPackName: string,
  id: string,
  queryPayload: LogAnalyticsQueryPackQuery,
  options: QueriesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/queryPacks/{queryPackName}/queries/{id}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      queryPackName: queryPackName,
      id: id,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: logAnalyticsQueryPackQuerySerializer(queryPayload),
    });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<LogAnalyticsQueryPackQuery> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return logAnalyticsQueryPackQueryDeserializer(result.body);
}

/** Adds or Updates a specific Query within a Log Analytics QueryPack. */
export async function update(
  context: Client,
  resourceGroupName: string,
  queryPackName: string,
  id: string,
  queryPayload: LogAnalyticsQueryPackQuery,
  options: QueriesUpdateOptionalParams = { requestOptions: {} },
): Promise<LogAnalyticsQueryPackQuery> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    queryPackName,
    id,
    queryPayload,
    options,
  );
  return _updateDeserialize(result);
}

export function _putSend(
  context: Client,
  resourceGroupName: string,
  queryPackName: string,
  id: string,
  queryPayload: LogAnalyticsQueryPackQuery,
  options: QueriesPutOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/queryPacks/{queryPackName}/queries/{id}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      queryPackName: queryPackName,
      id: id,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: logAnalyticsQueryPackQuerySerializer(queryPayload),
    });
}

export async function _putDeserialize(
  result: PathUncheckedResponse,
): Promise<LogAnalyticsQueryPackQuery> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return logAnalyticsQueryPackQueryDeserializer(result.body);
}

/** Adds or Updates a specific Query within a Log Analytics QueryPack. */
export async function put(
  context: Client,
  resourceGroupName: string,
  queryPackName: string,
  id: string,
  queryPayload: LogAnalyticsQueryPackQuery,
  options: QueriesPutOptionalParams = { requestOptions: {} },
): Promise<LogAnalyticsQueryPackQuery> {
  const result = await _putSend(
    context,
    resourceGroupName,
    queryPackName,
    id,
    queryPayload,
    options,
  );
  return _putDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  queryPackName: string,
  id: string,
  options: QueriesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/queryPacks/{queryPackName}/queries/{id}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      queryPackName: queryPackName,
      id: id,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<LogAnalyticsQueryPackQuery> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return logAnalyticsQueryPackQueryDeserializer(result.body);
}

/** Gets a specific Log Analytics Query defined within a Log Analytics QueryPack. */
export async function get(
  context: Client,
  resourceGroupName: string,
  queryPackName: string,
  id: string,
  options: QueriesGetOptionalParams = { requestOptions: {} },
): Promise<LogAnalyticsQueryPackQuery> {
  const result = await _getSend(context, resourceGroupName, queryPackName, id, options);
  return _getDeserialize(result);
}
