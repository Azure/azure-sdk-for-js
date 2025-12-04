// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext as Client } from "../index.js";
import type {
  ElasticCapacityPool,
  ElasticCapacityPoolUpdate,
  _ElasticCapacityPoolListResult,
  ChangeZoneRequest,
  CheckElasticVolumeFilePathAvailabilityRequest,
  CheckElasticResourceAvailabilityResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  elasticCapacityPoolSerializer,
  elasticCapacityPoolDeserializer,
  elasticCapacityPoolUpdateSerializer,
  _elasticCapacityPoolListResultDeserializer,
  changeZoneRequestSerializer,
  checkElasticVolumeFilePathAvailabilityRequestSerializer,
  checkElasticResourceAvailabilityResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ElasticCapacityPoolsCheckVolumeFilePathAvailabilityOptionalParams,
  ElasticCapacityPoolsChangeZoneOptionalParams,
  ElasticCapacityPoolsListByElasticAccountOptionalParams,
  ElasticCapacityPoolsDeleteOptionalParams,
  ElasticCapacityPoolsUpdateOptionalParams,
  ElasticCapacityPoolsCreateOrUpdateOptionalParams,
  ElasticCapacityPoolsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _checkVolumeFilePathAvailabilitySend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  body: CheckElasticVolumeFilePathAvailabilityRequest,
  options: ElasticCapacityPoolsCheckVolumeFilePathAvailabilityOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticCapacityPools/{poolName}/checkVolumeFilePathAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: checkElasticVolumeFilePathAvailabilityRequestSerializer(body),
  });
}

export async function _checkVolumeFilePathAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckElasticResourceAvailabilityResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return checkElasticResourceAvailabilityResponseDeserializer(result.body);
}

/** Check if an Elastic Volume file path is available within the given Elastic Capacity Pool. */
export async function checkVolumeFilePathAvailability(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  body: CheckElasticVolumeFilePathAvailabilityRequest,
  options: ElasticCapacityPoolsCheckVolumeFilePathAvailabilityOptionalParams = {
    requestOptions: {},
  },
): Promise<CheckElasticResourceAvailabilityResponse> {
  const result = await _checkVolumeFilePathAvailabilitySend(
    context,
    resourceGroupName,
    accountName,
    poolName,
    body,
    options,
  );
  return _checkVolumeFilePathAvailabilityDeserialize(result);
}

export function _changeZoneSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  body: ChangeZoneRequest,
  options: ElasticCapacityPoolsChangeZoneOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticCapacityPools/{poolName}/changeZone{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: changeZoneRequestSerializer(body),
  });
}

export async function _changeZoneDeserialize(
  result: PathUncheckedResponse,
): Promise<ElasticCapacityPool> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return elasticCapacityPoolDeserializer(result.body);
}

/** Moves pool to another zone */
export function changeZone(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  body: ChangeZoneRequest,
  options: ElasticCapacityPoolsChangeZoneOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ElasticCapacityPool>, ElasticCapacityPool> {
  return getLongRunningPoller(context, _changeZoneDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _changeZoneSend(context, resourceGroupName, accountName, poolName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ElasticCapacityPool>, ElasticCapacityPool>;
}

export function _listByElasticAccountSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: ElasticCapacityPoolsListByElasticAccountOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticCapacityPools{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listByElasticAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<_ElasticCapacityPoolListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _elasticCapacityPoolListResultDeserializer(result.body);
}

/** List and describe all NetApp Elastic Capacity Pools in the Elastic NetApp Account. */
export function listByElasticAccount(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: ElasticCapacityPoolsListByElasticAccountOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ElasticCapacityPool> {
  return buildPagedAsyncIterator(
    context,
    () => _listByElasticAccountSend(context, resourceGroupName, accountName, options),
    _listByElasticAccountDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  options: ElasticCapacityPoolsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticCapacityPools/{poolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete the specified NetApp Elastic Capacity Pool */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  options: ElasticCapacityPoolsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, accountName, poolName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  body: ElasticCapacityPoolUpdate,
  options: ElasticCapacityPoolsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticCapacityPools/{poolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: elasticCapacityPoolUpdateSerializer(body),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ElasticCapacityPool> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return elasticCapacityPoolDeserializer(result.body);
}

/** Patch the specified NetApp Elastic Capacity Pool */
export function update(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  body: ElasticCapacityPoolUpdate,
  options: ElasticCapacityPoolsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ElasticCapacityPool>, ElasticCapacityPool> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, accountName, poolName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ElasticCapacityPool>, ElasticCapacityPool>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  body: ElasticCapacityPool,
  options: ElasticCapacityPoolsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticCapacityPools/{poolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: elasticCapacityPoolSerializer(body),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ElasticCapacityPool> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return elasticCapacityPoolDeserializer(result.body);
}

/** Create or update the specified NetApp Elastic Capacity Pool within the resource group and NetApp Elastic Account */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  body: ElasticCapacityPool,
  options: ElasticCapacityPoolsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ElasticCapacityPool>, ElasticCapacityPool> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, accountName, poolName, body, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<ElasticCapacityPool>, ElasticCapacityPool>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  options: ElasticCapacityPoolsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticCapacityPools/{poolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ElasticCapacityPool> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return elasticCapacityPoolDeserializer(result.body);
}

/** Get the NetApp Elastic Capacity Pool */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  options: ElasticCapacityPoolsGetOptionalParams = { requestOptions: {} },
): Promise<ElasticCapacityPool> {
  const result = await _getSend(context, resourceGroupName, accountName, poolName, options);
  return _getDeserialize(result);
}
