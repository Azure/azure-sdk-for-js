// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AzureFleetContext as Client,
  FleetsCreateOrUpdateOptionalParams,
  FleetsDeleteOptionalParams,
  FleetsGetOptionalParams,
  FleetsListByResourceGroupOptionalParams,
  FleetsListBySubscriptionOptionalParams,
  FleetsListVirtualMachineScaleSetsOptionalParams,
  FleetsUpdateOptionalParams,
} from "../index.js";
import {
  Fleet,
  fleetSerializer,
  fleetDeserializer,
  FleetUpdate,
  fleetUpdateSerializer,
  _FleetListResult,
  _fleetListResultDeserializer,
  _VirtualMachineScaleSetListResult,
  _virtualMachineScaleSetListResultDeserializer,
  VirtualMachineScaleSet,
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

export function _fleetsGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  fleetName: string,
  options: FleetsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets/{fleetName}",
      subscriptionId,
      resourceGroupName,
      fleetName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _fleetsGetDeserialize(
  result: PathUncheckedResponse,
): Promise<Fleet> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return fleetDeserializer(result.body);
}

/** Get a Fleet */
export async function fleetsGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  fleetName: string,
  options: FleetsGetOptionalParams = { requestOptions: {} },
): Promise<Fleet> {
  const result = await _fleetsGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    fleetName,
    options,
  );
  return _fleetsGetDeserialize(result);
}

export function _fleetsCreateOrUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  fleetName: string,
  resource: Fleet,
  options: FleetsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets/{fleetName}",
      subscriptionId,
      resourceGroupName,
      fleetName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: fleetSerializer(resource),
    });
}

export async function _fleetsCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Fleet> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return fleetDeserializer(result.body);
}

/** Create a Fleet */
export function fleetsCreateOrUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  fleetName: string,
  resource: Fleet,
  options: FleetsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Fleet>, Fleet> {
  return getLongRunningPoller(
    context,
    _fleetsCreateOrUpdateDeserialize,
    ["200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _fleetsCreateOrUpdateSend(
          context,
          subscriptionId,
          resourceGroupName,
          fleetName,
          resource,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<OperationState<Fleet>, Fleet>;
}

export function _fleetsUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  fleetName: string,
  properties: FleetUpdate,
  options: FleetsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets/{fleetName}",
      subscriptionId,
      resourceGroupName,
      fleetName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: fleetUpdateSerializer(properties),
    });
}

export async function _fleetsUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Fleet> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return fleetDeserializer(result.body);
}

/** Update a Fleet */
export function fleetsUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  fleetName: string,
  properties: FleetUpdate,
  options: FleetsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Fleet>, Fleet> {
  return getLongRunningPoller(
    context,
    _fleetsUpdateDeserialize,
    ["200", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _fleetsUpdateSend(
          context,
          subscriptionId,
          resourceGroupName,
          fleetName,
          properties,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<Fleet>, Fleet>;
}

export function _fleetsDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  fleetName: string,
  options: FleetsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets/{fleetName}",
      subscriptionId,
      resourceGroupName,
      fleetName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _fleetsDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a Fleet */
export function fleetsDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  fleetName: string,
  options: FleetsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _fleetsDeleteDeserialize,
    ["202", "204", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _fleetsDeleteSend(
          context,
          subscriptionId,
          resourceGroupName,
          fleetName,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _fleetsListByResourceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: FleetsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets",
      subscriptionId,
      resourceGroupName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _fleetsListByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_FleetListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _fleetListResultDeserializer(result.body);
}

/** List Fleet resources by resource group */
export function fleetsListByResourceGroup(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: FleetsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Fleet> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _fleetsListByResourceGroupSend(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    _fleetsListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _fleetsListBySubscriptionSend(
  context: Client,
  subscriptionId: string,
  options: FleetsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.AzureFleet/fleets",
      subscriptionId,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _fleetsListBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_FleetListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _fleetListResultDeserializer(result.body);
}

/** List Fleet resources by subscription ID */
export function fleetsListBySubscription(
  context: Client,
  subscriptionId: string,
  options: FleetsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Fleet> {
  return buildPagedAsyncIterator(
    context,
    () => _fleetsListBySubscriptionSend(context, subscriptionId, options),
    _fleetsListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _fleetsListVirtualMachineScaleSetsSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  name: string,
  options: FleetsListVirtualMachineScaleSetsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets/{name}/virtualMachineScaleSets",
      subscriptionId,
      resourceGroupName,
      name,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _fleetsListVirtualMachineScaleSetsDeserialize(
  result: PathUncheckedResponse,
): Promise<_VirtualMachineScaleSetListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _virtualMachineScaleSetListResultDeserializer(result.body);
}

/** List VirtualMachineScaleSet resources by Fleet */
export function fleetsListVirtualMachineScaleSets(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  name: string,
  options: FleetsListVirtualMachineScaleSetsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<VirtualMachineScaleSet> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _fleetsListVirtualMachineScaleSetsSend(
        context,
        subscriptionId,
        resourceGroupName,
        name,
        options,
      ),
    _fleetsListVirtualMachineScaleSetsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
