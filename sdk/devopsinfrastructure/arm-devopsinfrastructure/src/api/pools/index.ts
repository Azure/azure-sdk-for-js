// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DevOpsInfrastructureContext as Client,
  PoolsCreateOrUpdateOptionalParams,
  PoolsDeleteOptionalParams,
  PoolsGetOptionalParams,
  PoolsListByResourceGroupOptionalParams,
  PoolsListBySubscriptionOptionalParams,
  PoolsUpdateOptionalParams,
} from "../index.js";
import {
  Pool,
  poolSerializer,
  poolDeserializer,
  PoolUpdate,
  poolUpdateSerializer,
  _PoolListResult,
  _poolListResultDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _poolsGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  poolName: string,
  options: PoolsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevOpsInfrastructure/pools/{poolName}",
      subscriptionId,
      resourceGroupName,
      poolName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _poolsGetDeserialize(result: PathUncheckedResponse): Promise<Pool> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return poolDeserializer(result.body);
}

/** Get a Pool */
export async function poolsGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  poolName: string,
  options: PoolsGetOptionalParams = { requestOptions: {} },
): Promise<Pool> {
  const result = await _poolsGetSend(context, subscriptionId, resourceGroupName, poolName, options);
  return _poolsGetDeserialize(result);
}

export function _poolsCreateOrUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  poolName: string,
  resource: Pool,
  options: PoolsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevOpsInfrastructure/pools/{poolName}",
      subscriptionId,
      resourceGroupName,
      poolName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: poolSerializer(resource),
    });
}

export async function _poolsCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Pool> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return poolDeserializer(result.body);
}

/** Create a Pool */
export function poolsCreateOrUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  poolName: string,
  resource: Pool,
  options: PoolsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Pool>, Pool> {
  return getLongRunningPoller(context, _poolsCreateOrUpdateDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _poolsCreateOrUpdateSend(
        context,
        subscriptionId,
        resourceGroupName,
        poolName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<Pool>, Pool>;
}

export function _poolsUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  poolName: string,
  properties: PoolUpdate,
  options: PoolsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevOpsInfrastructure/pools/{poolName}",
      subscriptionId,
      resourceGroupName,
      poolName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: poolUpdateSerializer(properties),
    });
}

export async function _poolsUpdateDeserialize(result: PathUncheckedResponse): Promise<Pool> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return poolDeserializer(result.body);
}

/** Update a Pool */
export function poolsUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  poolName: string,
  properties: PoolUpdate,
  options: PoolsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Pool>, Pool> {
  return getLongRunningPoller(context, _poolsUpdateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _poolsUpdateSend(context, subscriptionId, resourceGroupName, poolName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<Pool>, Pool>;
}

export function _poolsDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  poolName: string,
  options: PoolsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevOpsInfrastructure/pools/{poolName}",
      subscriptionId,
      resourceGroupName,
      poolName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _poolsDeleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a Pool */
export function poolsDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  poolName: string,
  options: PoolsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _poolsDeleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _poolsDeleteSend(context, subscriptionId, resourceGroupName, poolName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _poolsListByResourceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: PoolsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevOpsInfrastructure/pools",
      subscriptionId,
      resourceGroupName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _poolsListByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_PoolListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _poolListResultDeserializer(result.body);
}

/** List Pool resources by resource group */
export function poolsListByResourceGroup(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: PoolsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Pool> {
  return buildPagedAsyncIterator(
    context,
    () => _poolsListByResourceGroupSend(context, subscriptionId, resourceGroupName, options),
    _poolsListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _poolsListBySubscriptionSend(
  context: Client,
  subscriptionId: string,
  options: PoolsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.DevOpsInfrastructure/pools",
      subscriptionId,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _poolsListBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_PoolListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _poolListResultDeserializer(result.body);
}

/** List Pool resources by subscription ID */
export function poolsListBySubscription(
  context: Client,
  subscriptionId: string,
  options: PoolsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Pool> {
  return buildPagedAsyncIterator(
    context,
    () => _poolsListBySubscriptionSend(context, subscriptionId, options),
    _poolsListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
