// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AssetEndpointProfilesCreateOrReplaceOptionalParams,
  AssetEndpointProfilesDeleteOptionalParams,
  AssetEndpointProfilesGetOptionalParams,
  AssetEndpointProfilesListByResourceGroupOptionalParams,
  AssetEndpointProfilesListBySubscriptionOptionalParams,
  AssetEndpointProfilesUpdateOptionalParams,
  DeviceRegistryManagementContext as Client,
} from "../index.js";
import {
  AssetEndpointProfile,
  assetEndpointProfileSerializer,
  assetEndpointProfileDeserializer,
  AssetEndpointProfileUpdate,
  assetEndpointProfileUpdateSerializer,
  _AssetEndpointProfileListResult,
  _assetEndpointProfileListResultDeserializer,
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

export function _assetEndpointProfilesGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  assetEndpointProfileName: string,
  options: AssetEndpointProfilesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assetEndpointProfiles/{assetEndpointProfileName}",
      subscriptionId,
      resourceGroupName,
      assetEndpointProfileName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _assetEndpointProfilesGetDeserialize(
  result: PathUncheckedResponse,
): Promise<AssetEndpointProfile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return assetEndpointProfileDeserializer(result.body);
}

/** Get a AssetEndpointProfile */
export async function assetEndpointProfilesGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  assetEndpointProfileName: string,
  options: AssetEndpointProfilesGetOptionalParams = { requestOptions: {} },
): Promise<AssetEndpointProfile> {
  const result = await _assetEndpointProfilesGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    assetEndpointProfileName,
    options,
  );
  return _assetEndpointProfilesGetDeserialize(result);
}

export function _assetEndpointProfilesCreateOrReplaceSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  assetEndpointProfileName: string,
  resource: AssetEndpointProfile,
  options: AssetEndpointProfilesCreateOrReplaceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assetEndpointProfiles/{assetEndpointProfileName}",
      subscriptionId,
      resourceGroupName,
      assetEndpointProfileName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: assetEndpointProfileSerializer(resource),
    });
}

export async function _assetEndpointProfilesCreateOrReplaceDeserialize(
  result: PathUncheckedResponse,
): Promise<AssetEndpointProfile> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return assetEndpointProfileDeserializer(result.body);
}

/** Create a AssetEndpointProfile */
export function assetEndpointProfilesCreateOrReplace(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  assetEndpointProfileName: string,
  resource: AssetEndpointProfile,
  options: AssetEndpointProfilesCreateOrReplaceOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<AssetEndpointProfile>, AssetEndpointProfile> {
  return getLongRunningPoller(
    context,
    _assetEndpointProfilesCreateOrReplaceDeserialize,
    ["200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _assetEndpointProfilesCreateOrReplaceSend(
          context,
          subscriptionId,
          resourceGroupName,
          assetEndpointProfileName,
          resource,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<OperationState<AssetEndpointProfile>, AssetEndpointProfile>;
}

export function _assetEndpointProfilesUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  assetEndpointProfileName: string,
  properties: AssetEndpointProfileUpdate,
  options: AssetEndpointProfilesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assetEndpointProfiles/{assetEndpointProfileName}",
      subscriptionId,
      resourceGroupName,
      assetEndpointProfileName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: assetEndpointProfileUpdateSerializer(properties),
    });
}

export async function _assetEndpointProfilesUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AssetEndpointProfile> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return assetEndpointProfileDeserializer(result.body);
}

/** Update a AssetEndpointProfile */
export function assetEndpointProfilesUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  assetEndpointProfileName: string,
  properties: AssetEndpointProfileUpdate,
  options: AssetEndpointProfilesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AssetEndpointProfile>, AssetEndpointProfile> {
  return getLongRunningPoller(context, _assetEndpointProfilesUpdateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _assetEndpointProfilesUpdateSend(
        context,
        subscriptionId,
        resourceGroupName,
        assetEndpointProfileName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<AssetEndpointProfile>, AssetEndpointProfile>;
}

export function _assetEndpointProfilesDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  assetEndpointProfileName: string,
  options: AssetEndpointProfilesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assetEndpointProfiles/{assetEndpointProfileName}",
      subscriptionId,
      resourceGroupName,
      assetEndpointProfileName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _assetEndpointProfilesDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a AssetEndpointProfile */
export function assetEndpointProfilesDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  assetEndpointProfileName: string,
  options: AssetEndpointProfilesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _assetEndpointProfilesDeleteDeserialize,
    ["202", "204", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _assetEndpointProfilesDeleteSend(
          context,
          subscriptionId,
          resourceGroupName,
          assetEndpointProfileName,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _assetEndpointProfilesListByResourceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: AssetEndpointProfilesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assetEndpointProfiles",
      subscriptionId,
      resourceGroupName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _assetEndpointProfilesListByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_AssetEndpointProfileListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _assetEndpointProfileListResultDeserializer(result.body);
}

/** List AssetEndpointProfile resources by resource group */
export function assetEndpointProfilesListByResourceGroup(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: AssetEndpointProfilesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<AssetEndpointProfile> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _assetEndpointProfilesListByResourceGroupSend(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    _assetEndpointProfilesListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _assetEndpointProfilesListBySubscriptionSend(
  context: Client,
  subscriptionId: string,
  options: AssetEndpointProfilesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.DeviceRegistry/assetEndpointProfiles",
      subscriptionId,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _assetEndpointProfilesListBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_AssetEndpointProfileListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _assetEndpointProfileListResultDeserializer(result.body);
}

/** List AssetEndpointProfile resources by subscription ID */
export function assetEndpointProfilesListBySubscription(
  context: Client,
  subscriptionId: string,
  options: AssetEndpointProfilesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<AssetEndpointProfile> {
  return buildPagedAsyncIterator(
    context,
    () => _assetEndpointProfilesListBySubscriptionSend(context, subscriptionId, options),
    _assetEndpointProfilesListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
