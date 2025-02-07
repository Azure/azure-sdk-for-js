// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DeviceRegistryManagementContext as Client,
  DiscoveredAssetEndpointProfilesCreateOrReplaceOptionalParams,
  DiscoveredAssetEndpointProfilesDeleteOptionalParams,
  DiscoveredAssetEndpointProfilesGetOptionalParams,
  DiscoveredAssetEndpointProfilesListByResourceGroupOptionalParams,
  DiscoveredAssetEndpointProfilesListBySubscriptionOptionalParams,
  DiscoveredAssetEndpointProfilesUpdateOptionalParams,
} from "../index.js";
import {
  DiscoveredAssetEndpointProfile,
  discoveredAssetEndpointProfileSerializer,
  discoveredAssetEndpointProfileDeserializer,
  DiscoveredAssetEndpointProfileUpdate,
  discoveredAssetEndpointProfileUpdateSerializer,
  _DiscoveredAssetEndpointProfileListResult,
  _discoveredAssetEndpointProfileListResultDeserializer,
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

export function _discoveredAssetEndpointProfilesGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  discoveredAssetEndpointProfileName: string,
  options: DiscoveredAssetEndpointProfilesGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/discoveredAssetEndpointProfiles/{discoveredAssetEndpointProfileName}",
      subscriptionId,
      resourceGroupName,
      discoveredAssetEndpointProfileName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _discoveredAssetEndpointProfilesGetDeserialize(
  result: PathUncheckedResponse,
): Promise<DiscoveredAssetEndpointProfile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return discoveredAssetEndpointProfileDeserializer(result.body);
}

/** Get a DiscoveredAssetEndpointProfile */
export async function discoveredAssetEndpointProfilesGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  discoveredAssetEndpointProfileName: string,
  options: DiscoveredAssetEndpointProfilesGetOptionalParams = {
    requestOptions: {},
  },
): Promise<DiscoveredAssetEndpointProfile> {
  const result = await _discoveredAssetEndpointProfilesGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    discoveredAssetEndpointProfileName,
    options,
  );
  return _discoveredAssetEndpointProfilesGetDeserialize(result);
}

export function _discoveredAssetEndpointProfilesCreateOrReplaceSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  discoveredAssetEndpointProfileName: string,
  resource: DiscoveredAssetEndpointProfile,
  options: DiscoveredAssetEndpointProfilesCreateOrReplaceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/discoveredAssetEndpointProfiles/{discoveredAssetEndpointProfileName}",
      subscriptionId,
      resourceGroupName,
      discoveredAssetEndpointProfileName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: discoveredAssetEndpointProfileSerializer(resource),
    });
}

export async function _discoveredAssetEndpointProfilesCreateOrReplaceDeserialize(
  result: PathUncheckedResponse,
): Promise<DiscoveredAssetEndpointProfile> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return discoveredAssetEndpointProfileDeserializer(result.body);
}

/** Create a DiscoveredAssetEndpointProfile */
export function discoveredAssetEndpointProfilesCreateOrReplace(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  discoveredAssetEndpointProfileName: string,
  resource: DiscoveredAssetEndpointProfile,
  options: DiscoveredAssetEndpointProfilesCreateOrReplaceOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<DiscoveredAssetEndpointProfile>, DiscoveredAssetEndpointProfile> {
  return getLongRunningPoller(
    context,
    _discoveredAssetEndpointProfilesCreateOrReplaceDeserialize,
    ["200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _discoveredAssetEndpointProfilesCreateOrReplaceSend(
          context,
          subscriptionId,
          resourceGroupName,
          discoveredAssetEndpointProfileName,
          resource,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<OperationState<DiscoveredAssetEndpointProfile>, DiscoveredAssetEndpointProfile>;
}

export function _discoveredAssetEndpointProfilesUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  discoveredAssetEndpointProfileName: string,
  properties: DiscoveredAssetEndpointProfileUpdate,
  options: DiscoveredAssetEndpointProfilesUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/discoveredAssetEndpointProfiles/{discoveredAssetEndpointProfileName}",
      subscriptionId,
      resourceGroupName,
      discoveredAssetEndpointProfileName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: discoveredAssetEndpointProfileUpdateSerializer(properties),
    });
}

export async function _discoveredAssetEndpointProfilesUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DiscoveredAssetEndpointProfile> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return discoveredAssetEndpointProfileDeserializer(result.body);
}

/** Update a DiscoveredAssetEndpointProfile */
export function discoveredAssetEndpointProfilesUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  discoveredAssetEndpointProfileName: string,
  properties: DiscoveredAssetEndpointProfileUpdate,
  options: DiscoveredAssetEndpointProfilesUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<DiscoveredAssetEndpointProfile>, DiscoveredAssetEndpointProfile> {
  return getLongRunningPoller(
    context,
    _discoveredAssetEndpointProfilesUpdateDeserialize,
    ["200", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _discoveredAssetEndpointProfilesUpdateSend(
          context,
          subscriptionId,
          resourceGroupName,
          discoveredAssetEndpointProfileName,
          properties,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<DiscoveredAssetEndpointProfile>, DiscoveredAssetEndpointProfile>;
}

export function _discoveredAssetEndpointProfilesDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  discoveredAssetEndpointProfileName: string,
  options: DiscoveredAssetEndpointProfilesDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/discoveredAssetEndpointProfiles/{discoveredAssetEndpointProfileName}",
      subscriptionId,
      resourceGroupName,
      discoveredAssetEndpointProfileName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _discoveredAssetEndpointProfilesDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a DiscoveredAssetEndpointProfile */
export function discoveredAssetEndpointProfilesDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  discoveredAssetEndpointProfileName: string,
  options: DiscoveredAssetEndpointProfilesDeleteOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _discoveredAssetEndpointProfilesDeleteDeserialize,
    ["202", "204", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _discoveredAssetEndpointProfilesDeleteSend(
          context,
          subscriptionId,
          resourceGroupName,
          discoveredAssetEndpointProfileName,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _discoveredAssetEndpointProfilesListByResourceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: DiscoveredAssetEndpointProfilesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/discoveredAssetEndpointProfiles",
      subscriptionId,
      resourceGroupName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _discoveredAssetEndpointProfilesListByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_DiscoveredAssetEndpointProfileListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _discoveredAssetEndpointProfileListResultDeserializer(result.body);
}

/** List DiscoveredAssetEndpointProfile resources by resource group */
export function discoveredAssetEndpointProfilesListByResourceGroup(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: DiscoveredAssetEndpointProfilesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<DiscoveredAssetEndpointProfile> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _discoveredAssetEndpointProfilesListByResourceGroupSend(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    _discoveredAssetEndpointProfilesListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _discoveredAssetEndpointProfilesListBySubscriptionSend(
  context: Client,
  subscriptionId: string,
  options: DiscoveredAssetEndpointProfilesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.DeviceRegistry/discoveredAssetEndpointProfiles",
      subscriptionId,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _discoveredAssetEndpointProfilesListBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_DiscoveredAssetEndpointProfileListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _discoveredAssetEndpointProfileListResultDeserializer(result.body);
}

/** List DiscoveredAssetEndpointProfile resources by subscription ID */
export function discoveredAssetEndpointProfilesListBySubscription(
  context: Client,
  subscriptionId: string,
  options: DiscoveredAssetEndpointProfilesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<DiscoveredAssetEndpointProfile> {
  return buildPagedAsyncIterator(
    context,
    () => _discoveredAssetEndpointProfilesListBySubscriptionSend(context, subscriptionId, options),
    _discoveredAssetEndpointProfilesListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
