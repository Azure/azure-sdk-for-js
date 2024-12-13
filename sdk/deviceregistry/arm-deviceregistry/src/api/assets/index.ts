// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AssetsCreateOrReplaceOptionalParams,
  AssetsDeleteOptionalParams,
  AssetsGetOptionalParams,
  AssetsListByResourceGroupOptionalParams,
  AssetsListBySubscriptionOptionalParams,
  AssetsUpdateOptionalParams,
  DeviceRegistryManagementContext as Client,
} from "../index.js";
import {
  Asset,
  assetSerializer,
  assetDeserializer,
  AssetUpdate,
  assetUpdateSerializer,
  _AssetListResult,
  _assetListResultDeserializer,
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

export function _assetsGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  assetName: string,
  options: AssetsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assets/{assetName}",
      subscriptionId,
      resourceGroupName,
      assetName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _assetsGetDeserialize(result: PathUncheckedResponse): Promise<Asset> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return assetDeserializer(result.body);
}

/** Get a Asset */
export async function assetsGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  assetName: string,
  options: AssetsGetOptionalParams = { requestOptions: {} },
): Promise<Asset> {
  const result = await _assetsGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    assetName,
    options,
  );
  return _assetsGetDeserialize(result);
}

export function _assetsCreateOrReplaceSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  assetName: string,
  resource: Asset,
  options: AssetsCreateOrReplaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assets/{assetName}",
      subscriptionId,
      resourceGroupName,
      assetName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: assetSerializer(resource),
    });
}

export async function _assetsCreateOrReplaceDeserialize(
  result: PathUncheckedResponse,
): Promise<Asset> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return assetDeserializer(result.body);
}

/** Create a Asset */
export function assetsCreateOrReplace(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  assetName: string,
  resource: Asset,
  options: AssetsCreateOrReplaceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Asset>, Asset> {
  return getLongRunningPoller(context, _assetsCreateOrReplaceDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _assetsCreateOrReplaceSend(
        context,
        subscriptionId,
        resourceGroupName,
        assetName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<Asset>, Asset>;
}

export function _assetsUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  assetName: string,
  properties: AssetUpdate,
  options: AssetsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assets/{assetName}",
      subscriptionId,
      resourceGroupName,
      assetName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: assetUpdateSerializer(properties),
    });
}

export async function _assetsUpdateDeserialize(result: PathUncheckedResponse): Promise<Asset> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return assetDeserializer(result.body);
}

/** Update a Asset */
export function assetsUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  assetName: string,
  properties: AssetUpdate,
  options: AssetsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Asset>, Asset> {
  return getLongRunningPoller(context, _assetsUpdateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _assetsUpdateSend(context, subscriptionId, resourceGroupName, assetName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<Asset>, Asset>;
}

export function _assetsDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  assetName: string,
  options: AssetsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assets/{assetName}",
      subscriptionId,
      resourceGroupName,
      assetName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _assetsDeleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a Asset */
export function assetsDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  assetName: string,
  options: AssetsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _assetsDeleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _assetsDeleteSend(context, subscriptionId, resourceGroupName, assetName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _assetsListByResourceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: AssetsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assets",
      subscriptionId,
      resourceGroupName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _assetsListByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_AssetListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _assetListResultDeserializer(result.body);
}

/** List Asset resources by resource group */
export function assetsListByResourceGroup(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: AssetsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Asset> {
  return buildPagedAsyncIterator(
    context,
    () => _assetsListByResourceGroupSend(context, subscriptionId, resourceGroupName, options),
    _assetsListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _assetsListBySubscriptionSend(
  context: Client,
  subscriptionId: string,
  options: AssetsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.DeviceRegistry/assets",
      subscriptionId,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _assetsListBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_AssetListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _assetListResultDeserializer(result.body);
}

/** List Asset resources by subscription ID */
export function assetsListBySubscription(
  context: Client,
  subscriptionId: string,
  options: AssetsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Asset> {
  return buildPagedAsyncIterator(
    context,
    () => _assetsListBySubscriptionSend(context, subscriptionId, options),
    _assetsListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
