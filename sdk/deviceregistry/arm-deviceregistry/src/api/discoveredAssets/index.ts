// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DeviceRegistryManagementContext as Client,
  DiscoveredAssetsCreateOrReplaceOptionalParams,
  DiscoveredAssetsDeleteOptionalParams,
  DiscoveredAssetsGetOptionalParams,
  DiscoveredAssetsListByResourceGroupOptionalParams,
  DiscoveredAssetsListBySubscriptionOptionalParams,
  DiscoveredAssetsUpdateOptionalParams,
} from "../index.js";
import {
  DiscoveredAsset,
  discoveredAssetSerializer,
  discoveredAssetDeserializer,
  DiscoveredAssetUpdate,
  discoveredAssetUpdateSerializer,
  _DiscoveredAssetListResult,
  _discoveredAssetListResultDeserializer,
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

export function _discoveredAssetsGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  discoveredAssetName: string,
  options: DiscoveredAssetsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/discoveredAssets/{discoveredAssetName}",
      subscriptionId,
      resourceGroupName,
      discoveredAssetName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _discoveredAssetsGetDeserialize(
  result: PathUncheckedResponse,
): Promise<DiscoveredAsset> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return discoveredAssetDeserializer(result.body);
}

/** Get a DiscoveredAsset */
export async function discoveredAssetsGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  discoveredAssetName: string,
  options: DiscoveredAssetsGetOptionalParams = { requestOptions: {} },
): Promise<DiscoveredAsset> {
  const result = await _discoveredAssetsGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    discoveredAssetName,
    options,
  );
  return _discoveredAssetsGetDeserialize(result);
}

export function _discoveredAssetsCreateOrReplaceSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  discoveredAssetName: string,
  resource: DiscoveredAsset,
  options: DiscoveredAssetsCreateOrReplaceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/discoveredAssets/{discoveredAssetName}",
      subscriptionId,
      resourceGroupName,
      discoveredAssetName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: discoveredAssetSerializer(resource),
    });
}

export async function _discoveredAssetsCreateOrReplaceDeserialize(
  result: PathUncheckedResponse,
): Promise<DiscoveredAsset> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return discoveredAssetDeserializer(result.body);
}

/** Create a DiscoveredAsset */
export function discoveredAssetsCreateOrReplace(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  discoveredAssetName: string,
  resource: DiscoveredAsset,
  options: DiscoveredAssetsCreateOrReplaceOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<DiscoveredAsset>, DiscoveredAsset> {
  return getLongRunningPoller(
    context,
    _discoveredAssetsCreateOrReplaceDeserialize,
    ["200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _discoveredAssetsCreateOrReplaceSend(
          context,
          subscriptionId,
          resourceGroupName,
          discoveredAssetName,
          resource,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<OperationState<DiscoveredAsset>, DiscoveredAsset>;
}

export function _discoveredAssetsUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  discoveredAssetName: string,
  properties: DiscoveredAssetUpdate,
  options: DiscoveredAssetsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/discoveredAssets/{discoveredAssetName}",
      subscriptionId,
      resourceGroupName,
      discoveredAssetName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: discoveredAssetUpdateSerializer(properties),
    });
}

export async function _discoveredAssetsUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DiscoveredAsset> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return discoveredAssetDeserializer(result.body);
}

/** Update a DiscoveredAsset */
export function discoveredAssetsUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  discoveredAssetName: string,
  properties: DiscoveredAssetUpdate,
  options: DiscoveredAssetsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DiscoveredAsset>, DiscoveredAsset> {
  return getLongRunningPoller(context, _discoveredAssetsUpdateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _discoveredAssetsUpdateSend(
        context,
        subscriptionId,
        resourceGroupName,
        discoveredAssetName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<DiscoveredAsset>, DiscoveredAsset>;
}

export function _discoveredAssetsDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  discoveredAssetName: string,
  options: DiscoveredAssetsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/discoveredAssets/{discoveredAssetName}",
      subscriptionId,
      resourceGroupName,
      discoveredAssetName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _discoveredAssetsDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a DiscoveredAsset */
export function discoveredAssetsDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  discoveredAssetName: string,
  options: DiscoveredAssetsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _discoveredAssetsDeleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _discoveredAssetsDeleteSend(
        context,
        subscriptionId,
        resourceGroupName,
        discoveredAssetName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _discoveredAssetsListByResourceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: DiscoveredAssetsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/discoveredAssets",
      subscriptionId,
      resourceGroupName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _discoveredAssetsListByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_DiscoveredAssetListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _discoveredAssetListResultDeserializer(result.body);
}

/** List DiscoveredAsset resources by resource group */
export function discoveredAssetsListByResourceGroup(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: DiscoveredAssetsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<DiscoveredAsset> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _discoveredAssetsListByResourceGroupSend(context, subscriptionId, resourceGroupName, options),
    _discoveredAssetsListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _discoveredAssetsListBySubscriptionSend(
  context: Client,
  subscriptionId: string,
  options: DiscoveredAssetsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.DeviceRegistry/discoveredAssets",
      subscriptionId,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _discoveredAssetsListBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_DiscoveredAssetListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _discoveredAssetListResultDeserializer(result.body);
}

/** List DiscoveredAsset resources by subscription ID */
export function discoveredAssetsListBySubscription(
  context: Client,
  subscriptionId: string,
  options: DiscoveredAssetsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<DiscoveredAsset> {
  return buildPagedAsyncIterator(
    context,
    () => _discoveredAssetsListBySubscriptionSend(context, subscriptionId, options),
    _discoveredAssetsListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
