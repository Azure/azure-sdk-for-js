// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  IpamPool,
  _IpamPoolList,
  PoolUsage,
  _PoolAssociationList,
  PoolAssociation,
} from "../../models/microsoft/network/models.js";
import {
  ipamPoolSerializer,
  ipamPoolDeserializer,
  commonErrorResponseDeserializer,
  ipamPoolUpdateSerializer,
  _ipamPoolListDeserializer,
  poolUsageDeserializer,
  _poolAssociationListDeserializer,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  IpamPoolsListAssociatedResourcesOptionalParams,
  IpamPoolsGetPoolUsageOptionalParams,
  IpamPoolsListOptionalParams,
  IpamPoolsDeleteOptionalParams,
  IpamPoolsUpdateOptionalParams,
  IpamPoolsCreateOptionalParams,
  IpamPoolsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listAssociatedResourcesSend(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  poolName: string,
  options: IpamPoolsListAssociatedResourcesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/ipamPools/{poolName}/listAssociatedResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkManagerName: networkManagerName,
      poolName: poolName,
      "api%2Dversion": "2025-05-01",
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

export async function _listAssociatedResourcesDeserialize(
  result: PathUncheckedResponse,
): Promise<_PoolAssociationList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonErrorResponseDeserializer(result.body);

    throw error;
  }

  return _poolAssociationListDeserializer(result.body);
}

/** List Associated Resource in the Pool. */
export function listAssociatedResources(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  poolName: string,
  options: IpamPoolsListAssociatedResourcesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PoolAssociation> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listAssociatedResourcesSend(
        context,
        resourceGroupName,
        networkManagerName,
        poolName,
        options,
      ),
    _listAssociatedResourcesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _getPoolUsageSend(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  poolName: string,
  options: IpamPoolsGetPoolUsageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/ipamPools/{poolName}/getPoolUsage{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkManagerName: networkManagerName,
      poolName: poolName,
      "api%2Dversion": "2025-05-01",
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

export async function _getPoolUsageDeserialize(result: PathUncheckedResponse): Promise<PoolUsage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonErrorResponseDeserializer(result.body);

    throw error;
  }

  return poolUsageDeserializer(result.body);
}

/** Get the Pool Usage. */
export async function getPoolUsage(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  poolName: string,
  options: IpamPoolsGetPoolUsageOptionalParams = { requestOptions: {} },
): Promise<PoolUsage> {
  const result = await _getPoolUsageSend(
    context,
    resourceGroupName,
    networkManagerName,
    poolName,
    options,
  );
  return _getPoolUsageDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  options: IpamPoolsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/ipamPools{?api%2Dversion,skipToken,skip,top,sortKey,sortValue}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkManagerName: networkManagerName,
      "api%2Dversion": "2025-05-01",
      skipToken: options?.skipToken,
      skip: options?.skip,
      top: options?.top,
      sortKey: options?.sortKey,
      sortValue: options?.sortValue,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_IpamPoolList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonErrorResponseDeserializer(result.body);

    throw error;
  }

  return _ipamPoolListDeserializer(result.body);
}

/** Gets list of Pool resources at Network Manager level. */
export function list(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  options: IpamPoolsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<IpamPool> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, networkManagerName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  poolName: string,
  options: IpamPoolsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/ipamPools/{poolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkManagerName: networkManagerName,
      poolName: poolName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete the Pool resource. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  poolName: string,
  options: IpamPoolsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, networkManagerName, poolName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  poolName: string,
  options: IpamPoolsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/ipamPools/{poolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkManagerName: networkManagerName,
      poolName: poolName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: !options["body"] ? options["body"] : ipamPoolUpdateSerializer(options["body"]),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<IpamPool> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonErrorResponseDeserializer(result.body);

    throw error;
  }

  return ipamPoolDeserializer(result.body);
}

/** Updates the specific Pool resource. */
export async function update(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  poolName: string,
  options: IpamPoolsUpdateOptionalParams = { requestOptions: {} },
): Promise<IpamPool> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    networkManagerName,
    poolName,
    options,
  );
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  poolName: string,
  body: IpamPool,
  options: IpamPoolsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/ipamPools/{poolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkManagerName: networkManagerName,
      poolName: poolName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: ipamPoolSerializer(body),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<IpamPool> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonErrorResponseDeserializer(result.body);

    throw error;
  }

  return ipamPoolDeserializer(result.body);
}

/** Creates/Updates the Pool resource. */
export function create(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  poolName: string,
  body: IpamPool,
  options: IpamPoolsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<IpamPool>, IpamPool> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, networkManagerName, poolName, body, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<IpamPool>, IpamPool>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  poolName: string,
  options: IpamPoolsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/ipamPools/{poolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkManagerName: networkManagerName,
      poolName: poolName,
      "api%2Dversion": "2025-05-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<IpamPool> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonErrorResponseDeserializer(result.body);

    throw error;
  }

  return ipamPoolDeserializer(result.body);
}

/** Gets the specific Pool resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  poolName: string,
  options: IpamPoolsGetOptionalParams = { requestOptions: {} },
): Promise<IpamPool> {
  const result = await _getSend(context, resourceGroupName, networkManagerName, poolName, options);
  return _getDeserialize(result);
}
