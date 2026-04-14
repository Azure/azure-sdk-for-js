// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext as Client } from "../index.js";
import type {
  DatabaseAccountGetResults,
  DatabaseAccountCreateUpdateParameters,
  DatabaseAccountUpdateParameters,
  _DatabaseAccountsListResult,
  FailoverPolicies,
  DatabaseAccountListKeysResult,
  DatabaseAccountListReadOnlyKeysResult,
  DatabaseAccountListConnectionStringsResult,
  RegionForOnlineOffline,
  DatabaseAccountRegenerateKeyParameters,
  _MetricListResult,
  Metric,
  _UsagesResult,
  Usage,
  _MetricDefinitionsListResult,
  MetricDefinition,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  databaseAccountGetResultsDeserializer,
  databaseAccountCreateUpdateParametersSerializer,
  databaseAccountUpdateParametersSerializer,
  _databaseAccountsListResultDeserializer,
  failoverPoliciesSerializer,
  databaseAccountListKeysResultDeserializer,
  databaseAccountListReadOnlyKeysResultDeserializer,
  databaseAccountListConnectionStringsResultDeserializer,
  regionForOnlineOfflineSerializer,
  databaseAccountRegenerateKeyParametersSerializer,
  _metricListResultDeserializer,
  _usagesResultDeserializer,
  _metricDefinitionsListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DatabaseAccountsCheckNameExistsOptionalParams,
  DatabaseAccountsListMetricDefinitionsOptionalParams,
  DatabaseAccountsListUsagesOptionalParams,
  DatabaseAccountsListMetricsOptionalParams,
  DatabaseAccountsRegenerateKeyOptionalParams,
  DatabaseAccountsListReadOnlyKeysOptionalParams,
  DatabaseAccountsGetReadOnlyKeysOptionalParams,
  DatabaseAccountsOnlineRegionOptionalParams,
  DatabaseAccountsOfflineRegionOptionalParams,
  DatabaseAccountsListConnectionStringsOptionalParams,
  DatabaseAccountsListKeysOptionalParams,
  DatabaseAccountsFailoverPriorityChangeOptionalParams,
  DatabaseAccountsListOptionalParams,
  DatabaseAccountsListByResourceGroupOptionalParams,
  DatabaseAccountsDeleteOptionalParams,
  DatabaseAccountsUpdateOptionalParams,
  DatabaseAccountsCreateOrUpdateOptionalParams,
  DatabaseAccountsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _checkNameExistsSend(
  context: Client,
  accountName: string,
  options: DatabaseAccountsCheckNameExistsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.DocumentDB/databaseAccountNames/{accountName}{?api%2Dversion}",
    {
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({ ...operationOptionsToRequestParameters(options) });
}

export async function _checkNameExistsDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "404"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Checks that the Azure Cosmos DB account name already exists. A valid account name may contain only lowercase letters, numbers, and the '-' character, and must be between 3 and 50 characters. */
export async function checkNameExists(
  context: Client,
  accountName: string,
  options: DatabaseAccountsCheckNameExistsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _checkNameExistsSend(context, accountName, options);
  return _checkNameExistsDeserialize(result);
}

export function _listMetricDefinitionsSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: DatabaseAccountsListMetricDefinitionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/metricDefinitions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listMetricDefinitionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_MetricDefinitionsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _metricDefinitionsListResultDeserializer(result.body);
}

/** Retrieves metric definitions for the given database account. */
export function listMetricDefinitions(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: DatabaseAccountsListMetricDefinitionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MetricDefinition> {
  return buildPagedAsyncIterator(
    context,
    () => _listMetricDefinitionsSend(context, resourceGroupName, accountName, options),
    _listMetricDefinitionsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _listUsagesSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: DatabaseAccountsListUsagesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/usages{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
      "%24filter": options?.filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listUsagesDeserialize(
  result: PathUncheckedResponse,
): Promise<_UsagesResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _usagesResultDeserializer(result.body);
}

/** Retrieves the usages (most recent data) for the given database account. */
export function listUsages(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: DatabaseAccountsListUsagesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Usage> {
  return buildPagedAsyncIterator(
    context,
    () => _listUsagesSend(context, resourceGroupName, accountName, options),
    _listUsagesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _listMetricsSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  filter: string,
  options: DatabaseAccountsListMetricsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/metrics{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
      "%24filter": filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listMetricsDeserialize(
  result: PathUncheckedResponse,
): Promise<_MetricListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _metricListResultDeserializer(result.body);
}

/** Retrieves the metrics determined by the given filter for the given database account. */
export function listMetrics(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  filter: string,
  options: DatabaseAccountsListMetricsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Metric> {
  return buildPagedAsyncIterator(
    context,
    () => _listMetricsSend(context, resourceGroupName, accountName, filter, options),
    _listMetricsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _regenerateKeySend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyToRegenerate: DatabaseAccountRegenerateKeyParameters,
  options: DatabaseAccountsRegenerateKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/regenerateKey{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: databaseAccountRegenerateKeyParametersSerializer(keyToRegenerate),
  });
}

export async function _regenerateKeyDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Regenerates an access key for the specified Azure Cosmos DB database account. */
export function regenerateKey(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  keyToRegenerate: DatabaseAccountRegenerateKeyParameters,
  options: DatabaseAccountsRegenerateKeyOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _regenerateKeyDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _regenerateKeySend(context, resourceGroupName, accountName, keyToRegenerate, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listReadOnlyKeysSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: DatabaseAccountsListReadOnlyKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/readonlykeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listReadOnlyKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<DatabaseAccountListReadOnlyKeysResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return databaseAccountListReadOnlyKeysResultDeserializer(result.body);
}

/** Lists the read-only access keys for the specified Azure Cosmos DB database account. */
export async function listReadOnlyKeys(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: DatabaseAccountsListReadOnlyKeysOptionalParams = { requestOptions: {} },
): Promise<DatabaseAccountListReadOnlyKeysResult> {
  const result = await _listReadOnlyKeysSend(context, resourceGroupName, accountName, options);
  return _listReadOnlyKeysDeserialize(result);
}

export function _getReadOnlyKeysSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: DatabaseAccountsGetReadOnlyKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/readonlykeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getReadOnlyKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<DatabaseAccountListReadOnlyKeysResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return databaseAccountListReadOnlyKeysResultDeserializer(result.body);
}

/** Lists the read-only access keys for the specified Azure Cosmos DB database account. */
export async function getReadOnlyKeys(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: DatabaseAccountsGetReadOnlyKeysOptionalParams = { requestOptions: {} },
): Promise<DatabaseAccountListReadOnlyKeysResult> {
  const result = await _getReadOnlyKeysSend(context, resourceGroupName, accountName, options);
  return _getReadOnlyKeysDeserialize(result);
}

export function _onlineRegionSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  regionParameterForOnline: RegionForOnlineOffline,
  options: DatabaseAccountsOnlineRegionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/onlineRegion{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: regionForOnlineOfflineSerializer(regionParameterForOnline),
  });
}

export async function _onlineRegionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Online the specified region for the specified Azure Cosmos DB database account. */
export function onlineRegion(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  regionParameterForOnline: RegionForOnlineOffline,
  options: DatabaseAccountsOnlineRegionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _onlineRegionDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _onlineRegionSend(context, resourceGroupName, accountName, regionParameterForOnline, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _offlineRegionSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  regionParameterForOffline: RegionForOnlineOffline,
  options: DatabaseAccountsOfflineRegionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/offlineRegion{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: regionForOnlineOfflineSerializer(regionParameterForOffline),
  });
}

export async function _offlineRegionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Offline the specified region for the specified Azure Cosmos DB database account. */
export function offlineRegion(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  regionParameterForOffline: RegionForOnlineOffline,
  options: DatabaseAccountsOfflineRegionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _offlineRegionDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _offlineRegionSend(
        context,
        resourceGroupName,
        accountName,
        regionParameterForOffline,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listConnectionStringsSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: DatabaseAccountsListConnectionStringsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/listConnectionStrings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listConnectionStringsDeserialize(
  result: PathUncheckedResponse,
): Promise<DatabaseAccountListConnectionStringsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return databaseAccountListConnectionStringsResultDeserializer(result.body);
}

/** Lists the connection strings for the specified Azure Cosmos DB database account. */
export async function listConnectionStrings(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: DatabaseAccountsListConnectionStringsOptionalParams = { requestOptions: {} },
): Promise<DatabaseAccountListConnectionStringsResult> {
  const result = await _listConnectionStringsSend(context, resourceGroupName, accountName, options);
  return _listConnectionStringsDeserialize(result);
}

export function _listKeysSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: DatabaseAccountsListKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/listKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<DatabaseAccountListKeysResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return databaseAccountListKeysResultDeserializer(result.body);
}

/** Lists the access keys for the specified Azure Cosmos DB database account. */
export async function listKeys(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: DatabaseAccountsListKeysOptionalParams = { requestOptions: {} },
): Promise<DatabaseAccountListKeysResult> {
  const result = await _listKeysSend(context, resourceGroupName, accountName, options);
  return _listKeysDeserialize(result);
}

export function _failoverPriorityChangeSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  failoverParameters: FailoverPolicies,
  options: DatabaseAccountsFailoverPriorityChangeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/failoverPriorityChange{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: failoverPoliciesSerializer(failoverParameters),
  });
}

export async function _failoverPriorityChangeDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Changes the failover priority for the Azure Cosmos DB database account. A failover priority of 0 indicates a write region. The maximum value for a failover priority = (total number of regions - 1). Failover priority values must be unique for each of the regions in which the database account exists. */
export function failoverPriorityChange(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  failoverParameters: FailoverPolicies,
  options: DatabaseAccountsFailoverPriorityChangeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _failoverPriorityChangeDeserialize,
    ["202", "204", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _failoverPriorityChangeSend(
          context,
          resourceGroupName,
          accountName,
          failoverParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _listSend(
  context: Client,
  options: DatabaseAccountsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/databaseAccounts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_DatabaseAccountsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _databaseAccountsListResultDeserializer(result.body);
}

/** Lists all the Azure Cosmos DB database accounts available under the subscription. */
export function list(
  context: Client,
  options: DatabaseAccountsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DatabaseAccountGetResults> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: DatabaseAccountsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_DatabaseAccountsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _databaseAccountsListResultDeserializer(result.body);
}

/** Lists all the Azure Cosmos DB database accounts available under the given resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: DatabaseAccountsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DatabaseAccountGetResults> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: DatabaseAccountsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes an existing Azure Cosmos DB database account. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: DatabaseAccountsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, accountName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  updateParameters: DatabaseAccountUpdateParameters,
  options: DatabaseAccountsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: databaseAccountUpdateParametersSerializer(updateParameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<DatabaseAccountGetResults> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return databaseAccountGetResultsDeserializer(result.body);
}

/** Updates the properties of an existing Azure Cosmos DB database account. */
export function update(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  updateParameters: DatabaseAccountUpdateParameters,
  options: DatabaseAccountsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DatabaseAccountGetResults>, DatabaseAccountGetResults> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, accountName, updateParameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<DatabaseAccountGetResults>, DatabaseAccountGetResults>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  createUpdateParameters: DatabaseAccountCreateUpdateParameters,
  options: DatabaseAccountsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: databaseAccountCreateUpdateParametersSerializer(createUpdateParameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DatabaseAccountGetResults> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return databaseAccountGetResultsDeserializer(result.body);
}

/** Creates or updates an Azure Cosmos DB database account. The "Update" method is preferred when performing updates on an account. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  createUpdateParameters: DatabaseAccountCreateUpdateParameters,
  options: DatabaseAccountsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DatabaseAccountGetResults>, DatabaseAccountGetResults> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, accountName, createUpdateParameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<DatabaseAccountGetResults>, DatabaseAccountGetResults>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: DatabaseAccountsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<DatabaseAccountGetResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return databaseAccountGetResultsDeserializer(result.body);
}

/** Retrieves the properties of an existing Azure Cosmos DB database account. */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: DatabaseAccountsGetOptionalParams = { requestOptions: {} },
): Promise<DatabaseAccountGetResults> {
  const result = await _getSend(context, resourceGroupName, accountName, options);
  return _getDeserialize(result);
}
