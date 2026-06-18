// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  LogAnalyticsQueryPack,
  logAnalyticsQueryPackSerializer,
  logAnalyticsQueryPackDeserializer,
  TagsResource,
  tagsResourceSerializer,
  _LogAnalyticsQueryPackListResult,
  _logAnalyticsQueryPackListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  QueryPacksCreateOrUpdateWithoutNameOptionalParams,
  QueryPacksListOptionalParams,
  QueryPacksListByResourceGroupOptionalParams,
  QueryPacksDeleteOptionalParams,
  QueryPacksUpdateTagsOptionalParams,
  QueryPacksCreateOrUpdateOptionalParams,
  QueryPacksGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _createOrUpdateWithoutNameSend(
  context: Client,
  resourceGroupName: string,
  logAnalyticsQueryPackPayload: LogAnalyticsQueryPack,
  options: QueryPacksCreateOrUpdateWithoutNameOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/queryPacks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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
      body: logAnalyticsQueryPackSerializer(logAnalyticsQueryPackPayload),
    });
}

export async function _createOrUpdateWithoutNameDeserialize(
  result: PathUncheckedResponse,
): Promise<LogAnalyticsQueryPack> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return logAnalyticsQueryPackDeserializer(result.body);
}

/** Creates a Log Analytics QueryPack. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation. */
export async function createOrUpdateWithoutName(
  context: Client,
  resourceGroupName: string,
  logAnalyticsQueryPackPayload: LogAnalyticsQueryPack,
  options: QueryPacksCreateOrUpdateWithoutNameOptionalParams = { requestOptions: {} },
): Promise<LogAnalyticsQueryPack> {
  const result = await _createOrUpdateWithoutNameSend(
    context,
    resourceGroupName,
    logAnalyticsQueryPackPayload,
    options,
  );
  return _createOrUpdateWithoutNameDeserialize(result);
}

export function _listSend(
  context: Client,
  options: QueryPacksListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.OperationalInsights/queryPacks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_LogAnalyticsQueryPackListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _logAnalyticsQueryPackListResultDeserializer(result.body);
}

/** Gets a list of all Log Analytics QueryPacks within a subscription. */
export function list(
  context: Client,
  options: QueryPacksListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LogAnalyticsQueryPack> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-07-01" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: QueryPacksListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/queryPacks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_LogAnalyticsQueryPackListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _logAnalyticsQueryPackListResultDeserializer(result.body);
}

/** Gets a list of Log Analytics QueryPacks within a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: QueryPacksListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LogAnalyticsQueryPack> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-07-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  queryPackName: string,
  options: QueryPacksDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/queryPacks/{queryPackName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      queryPackName: queryPackName,
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

/** Deletes a Log Analytics QueryPack. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  queryPackName: string,
  options: QueryPacksDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, queryPackName, options);
  return _$deleteDeserialize(result);
}

export function _updateTagsSend(
  context: Client,
  resourceGroupName: string,
  queryPackName: string,
  queryPackTags: TagsResource,
  options: QueryPacksUpdateTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/queryPacks/{queryPackName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      queryPackName: queryPackName,
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
      body: tagsResourceSerializer(queryPackTags),
    });
}

export async function _updateTagsDeserialize(
  result: PathUncheckedResponse,
): Promise<LogAnalyticsQueryPack> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return logAnalyticsQueryPackDeserializer(result.body);
}

/** Updates an existing QueryPack's tags. To update other fields use the CreateOrUpdate method. */
export async function updateTags(
  context: Client,
  resourceGroupName: string,
  queryPackName: string,
  queryPackTags: TagsResource,
  options: QueryPacksUpdateTagsOptionalParams = { requestOptions: {} },
): Promise<LogAnalyticsQueryPack> {
  const result = await _updateTagsSend(
    context,
    resourceGroupName,
    queryPackName,
    queryPackTags,
    options,
  );
  return _updateTagsDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  queryPackName: string,
  logAnalyticsQueryPackPayload: LogAnalyticsQueryPack,
  options: QueryPacksCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/queryPacks/{queryPackName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      queryPackName: queryPackName,
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
      body: logAnalyticsQueryPackSerializer(logAnalyticsQueryPackPayload),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<LogAnalyticsQueryPack> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return logAnalyticsQueryPackDeserializer(result.body);
}

/** Creates (or updates) a Log Analytics QueryPack. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  queryPackName: string,
  logAnalyticsQueryPackPayload: LogAnalyticsQueryPack,
  options: QueryPacksCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<LogAnalyticsQueryPack> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    queryPackName,
    logAnalyticsQueryPackPayload,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  queryPackName: string,
  options: QueryPacksGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/queryPacks/{queryPackName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      queryPackName: queryPackName,
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
): Promise<LogAnalyticsQueryPack> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return logAnalyticsQueryPackDeserializer(result.body);
}

/** Returns a Log Analytics QueryPack. */
export async function get(
  context: Client,
  resourceGroupName: string,
  queryPackName: string,
  options: QueryPacksGetOptionalParams = { requestOptions: {} },
): Promise<LogAnalyticsQueryPack> {
  const result = await _getSend(context, resourceGroupName, queryPackName, options);
  return _getDeserialize(result);
}
