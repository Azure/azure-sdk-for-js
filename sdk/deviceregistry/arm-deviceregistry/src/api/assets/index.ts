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
  errorResponseDeserializer,
  Asset,
  assetSerializer,
  assetDeserializer,
  AssetUpdate,
  assetUpdateSerializer,
  _AssetListResult,
  _assetListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _assetsListBySubscriptionSend(
  context: Client,
  options: AssetsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.DeviceRegistry/assets",
      context.subscriptionId,
    )
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _assetsListBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_AssetListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _assetListResultDeserializer(result.body);
}

/** List Asset resources by subscription ID */
export function assetsListBySubscription(
  context: Client,
  options: AssetsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Asset> {
  return buildPagedAsyncIterator(
    context,
    () => _assetsListBySubscriptionSend(context, options),
    _assetsListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _assetsListByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: AssetsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assets",
      context.subscriptionId,
      resourceGroupName,
    )
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _assetsListByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_AssetListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _assetListResultDeserializer(result.body);
}

/** List Asset resources by resource group */
export function assetsListByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: AssetsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Asset> {
  return buildPagedAsyncIterator(
    context,
    () => _assetsListByResourceGroupSend(context, resourceGroupName, options),
    _assetsListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _assetsDeleteSend(
  context: Client,
  resourceGroupName: string,
  assetName: string,
  options: AssetsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assets/{assetName}",
      context.subscriptionId,
      resourceGroupName,
      assetName,
    )
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _assetsDeleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a Asset */
export function assetsDelete(
  context: Client,
  resourceGroupName: string,
  assetName: string,
  options: AssetsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _assetsDeleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _assetsDeleteSend(context, resourceGroupName, assetName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _assetsUpdateSend(
  context: Client,
  resourceGroupName: string,
  assetName: string,
  properties: AssetUpdate,
  options: AssetsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assets/{assetName}",
      context.subscriptionId,
      resourceGroupName,
      assetName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: assetUpdateSerializer(properties),
    });
}

export async function _assetsUpdateDeserialize(result: PathUncheckedResponse): Promise<Asset> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return assetDeserializer(result.body);
}

/** Update a Asset */
export function assetsUpdate(
  context: Client,
  resourceGroupName: string,
  assetName: string,
  properties: AssetUpdate,
  options: AssetsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Asset>, Asset> {
  return getLongRunningPoller(context, _assetsUpdateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _assetsUpdateSend(context, resourceGroupName, assetName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<Asset>, Asset>;
}

export function _assetsCreateOrReplaceSend(
  context: Client,
  resourceGroupName: string,
  assetName: string,
  resource: Asset,
  options: AssetsCreateOrReplaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assets/{assetName}",
      context.subscriptionId,
      resourceGroupName,
      assetName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: assetSerializer(resource),
    });
}

export async function _assetsCreateOrReplaceDeserialize(
  result: PathUncheckedResponse,
): Promise<Asset> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return assetDeserializer(result.body);
}

/** Create a Asset */
export function assetsCreateOrReplace(
  context: Client,
  resourceGroupName: string,
  assetName: string,
  resource: Asset,
  options: AssetsCreateOrReplaceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Asset>, Asset> {
  return getLongRunningPoller(context, _assetsCreateOrReplaceDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _assetsCreateOrReplaceSend(context, resourceGroupName, assetName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<Asset>, Asset>;
}

export function _assetsGetSend(
  context: Client,
  resourceGroupName: string,
  assetName: string,
  options: AssetsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assets/{assetName}",
      context.subscriptionId,
      resourceGroupName,
      assetName,
    )
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _assetsGetDeserialize(result: PathUncheckedResponse): Promise<Asset> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return assetDeserializer(result.body);
}

/** Get a Asset */
export async function assetsGet(
  context: Client,
  resourceGroupName: string,
  assetName: string,
  options: AssetsGetOptionalParams = { requestOptions: {} },
): Promise<Asset> {
  const result = await _assetsGetSend(context, resourceGroupName, assetName, options);
  return _assetsGetDeserialize(result);
}
