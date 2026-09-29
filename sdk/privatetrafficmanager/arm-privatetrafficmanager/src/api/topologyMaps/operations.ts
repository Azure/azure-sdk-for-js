// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkContext as Client } from "../index.js";
import type { TopologyMap, TopologyMapPatch, _TopologyMapListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  topologyMapSerializer,
  topologyMapDeserializer,
  topologyMapPatchSerializer,
  _topologyMapListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  TopologyMapsListBySubscriptionOptionalParams,
  TopologyMapsListByResourceGroupOptionalParams,
  TopologyMapsDeleteOptionalParams,
  TopologyMapsUpdateOptionalParams,
  TopologyMapsCreateOrUpdateOptionalParams,
  TopologyMapsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySubscriptionSend(
  context: Client,
  options: TopologyMapsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/topologyMaps{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-02-09-preview",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_TopologyMapListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _topologyMapListResultDeserializer(result.body);
}

/** Lists all Topology Maps within a subscription. */
export function listBySubscription(
  context: Client,
  options: TopologyMapsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TopologyMap> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-02-09-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: TopologyMapsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/topologyMaps{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-02-09-preview",
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
): Promise<_TopologyMapListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _topologyMapListResultDeserializer(result.body);
}

/** Lists all Topology Maps within a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: TopologyMapsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TopologyMap> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-02-09-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  topologyMapName: string,
  options: TopologyMapsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/topologyMaps/{topologyMapName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      topologyMapName: topologyMapName,
      "api%2Dversion": context.apiVersion ?? "2026-02-09-preview",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes a Topology Map. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  topologyMapName: string,
  options: TopologyMapsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, topologyMapName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-09-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  topologyMapName: string,
  properties: TopologyMapPatch,
  options: TopologyMapsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/topologyMaps/{topologyMapName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      topologyMapName: topologyMapName,
      "api%2Dversion": context.apiVersion ?? "2026-02-09-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: topologyMapPatchSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<TopologyMap> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return topologyMapDeserializer(result.body);
}

/** Updates a Topology Map. */
export function update(
  context: Client,
  resourceGroupName: string,
  topologyMapName: string,
  properties: TopologyMapPatch,
  options: TopologyMapsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TopologyMap>, TopologyMap> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, topologyMapName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-09-preview",
  }) as PollerLike<OperationState<TopologyMap>, TopologyMap>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  topologyMapName: string,
  resource: TopologyMap,
  options: TopologyMapsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/topologyMaps/{topologyMapName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      topologyMapName: topologyMapName,
      "api%2Dversion": context.apiVersion ?? "2026-02-09-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: topologyMapSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<TopologyMap> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return topologyMapDeserializer(result.body);
}

/** Create or update a Topology Map. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  topologyMapName: string,
  resource: TopologyMap,
  options: TopologyMapsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TopologyMap>, TopologyMap> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, topologyMapName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-02-09-preview",
  }) as PollerLike<OperationState<TopologyMap>, TopologyMap>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  topologyMapName: string,
  options: TopologyMapsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/topologyMaps/{topologyMapName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      topologyMapName: topologyMapName,
      "api%2Dversion": context.apiVersion ?? "2026-02-09-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<TopologyMap> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return topologyMapDeserializer(result.body);
}

/** Gets a Topology Map. */
export async function get(
  context: Client,
  resourceGroupName: string,
  topologyMapName: string,
  options: TopologyMapsGetOptionalParams = { requestOptions: {} },
): Promise<TopologyMap> {
  const result = await _getSend(context, resourceGroupName, topologyMapName, options);
  return _getDeserialize(result);
}
