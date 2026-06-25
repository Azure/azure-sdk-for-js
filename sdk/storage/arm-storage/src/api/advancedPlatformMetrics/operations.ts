// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer_1,
  AdvancedPlatformMetricsRule,
  advancedPlatformMetricsRuleSerializer,
  advancedPlatformMetricsRuleDeserializer,
  AdvancedPlatformMetricsRuleType,
  _AdvancedPlatformMetricsRuleListResult,
  _advancedPlatformMetricsRuleListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  AdvancedPlatformMetricsListOptionalParams,
  AdvancedPlatformMetricsDeleteOptionalParams,
  AdvancedPlatformMetricsCreateOrUpdateOptionalParams,
  AdvancedPlatformMetricsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: AdvancedPlatformMetricsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/advancedPlatformMetrics{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
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
): Promise<_AdvancedPlatformMetricsRuleListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer_1(result.body);
    }

    throw error;
  }

  return _advancedPlatformMetricsRuleListResultDeserializer(result.body);
}

/** List the advanced platform metrics rules associated with the storage account. */
export function list(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: AdvancedPlatformMetricsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AdvancedPlatformMetricsRule> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, accountName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-04-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  advancedPlatformMetricsRuleType: AdvancedPlatformMetricsRuleType,
  options: AdvancedPlatformMetricsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/advancedPlatformMetrics/{advancedPlatformMetricsRuleType}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      advancedPlatformMetricsRuleType: advancedPlatformMetricsRuleType,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
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
      error.details = errorResponseDeserializer_1(result.body);
    }

    throw error;
  }

  return;
}

/** Delete the advanced platform metrics rule for the storage account by rule type. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  advancedPlatformMetricsRuleType: AdvancedPlatformMetricsRuleType,
  options: AdvancedPlatformMetricsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    accountName,
    advancedPlatformMetricsRuleType,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  advancedPlatformMetricsRuleType: AdvancedPlatformMetricsRuleType,
  resource: AdvancedPlatformMetricsRule,
  options: AdvancedPlatformMetricsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/advancedPlatformMetrics/{advancedPlatformMetricsRuleType}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      advancedPlatformMetricsRuleType: advancedPlatformMetricsRuleType,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
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
      body: advancedPlatformMetricsRuleSerializer(resource),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AdvancedPlatformMetricsRule> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer_1(result.body);
    }

    throw error;
  }

  return advancedPlatformMetricsRuleDeserializer(result.body);
}

/** Create or update the advanced platform metrics rule for the storage account. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  advancedPlatformMetricsRuleType: AdvancedPlatformMetricsRuleType,
  resource: AdvancedPlatformMetricsRule,
  options: AdvancedPlatformMetricsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<AdvancedPlatformMetricsRule> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    accountName,
    advancedPlatformMetricsRuleType,
    resource,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  advancedPlatformMetricsRuleType: AdvancedPlatformMetricsRuleType,
  options: AdvancedPlatformMetricsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/advancedPlatformMetrics/{advancedPlatformMetricsRuleType}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      advancedPlatformMetricsRuleType: advancedPlatformMetricsRuleType,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
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
): Promise<AdvancedPlatformMetricsRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer_1(result.body);
    }

    throw error;
  }

  return advancedPlatformMetricsRuleDeserializer(result.body);
}

/** Get the advanced platform metrics rule for the storage account by rule type. */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  advancedPlatformMetricsRuleType: AdvancedPlatformMetricsRuleType,
  options: AdvancedPlatformMetricsGetOptionalParams = { requestOptions: {} },
): Promise<AdvancedPlatformMetricsRule> {
  const result = await _getSend(
    context,
    resourceGroupName,
    accountName,
    advancedPlatformMetricsRuleType,
    options,
  );
  return _getDeserialize(result);
}
