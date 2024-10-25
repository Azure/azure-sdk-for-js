// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  FabricContext as Client,
  FabricCapacitiesCheckNameAvailabilityOptionalParams,
  FabricCapacitiesCreateOrUpdateOptionalParams,
  FabricCapacitiesDeleteOptionalParams,
  FabricCapacitiesGetOptionalParams,
  FabricCapacitiesListByResourceGroupOptionalParams,
  FabricCapacitiesListBySubscriptionOptionalParams,
  FabricCapacitiesListSkusForCapacityOptionalParams,
  FabricCapacitiesListSkusOptionalParams,
  FabricCapacitiesResumeOptionalParams,
  FabricCapacitiesSuspendOptionalParams,
  FabricCapacitiesUpdateOptionalParams,
} from "../index.js";
import {
  FabricCapacity,
  fabricCapacitySerializer,
  fabricCapacityDeserializer,
  FabricCapacityUpdate,
  fabricCapacityUpdateSerializer,
  _FabricCapacityListResult,
  _fabricCapacityListResultDeserializer,
  CheckNameAvailabilityRequest,
  checkNameAvailabilityRequestSerializer,
  CheckNameAvailabilityResponse,
  checkNameAvailabilityResponseDeserializer,
  _RpSkuEnumerationForExistingResourceResult,
  _rpSkuEnumerationForExistingResourceResultDeserializer,
  RpSkuDetailsForExistingResource,
  _RpSkuEnumerationForNewResourceResult,
  _rpSkuEnumerationForNewResourceResultDeserializer,
  RpSkuDetailsForNewResource,
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

export function _fabricCapacitiesGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  capacityName: string,
  options: FabricCapacitiesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Fabric/capacities/{capacityName}",
      subscriptionId,
      resourceGroupName,
      capacityName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _fabricCapacitiesGetDeserialize(
  result: PathUncheckedResponse,
): Promise<FabricCapacity> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return fabricCapacityDeserializer(result.body);
}

/** Get a FabricCapacity */
export async function fabricCapacitiesGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  capacityName: string,
  options: FabricCapacitiesGetOptionalParams = { requestOptions: {} },
): Promise<FabricCapacity> {
  const result = await _fabricCapacitiesGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    capacityName,
    options,
  );
  return _fabricCapacitiesGetDeserialize(result);
}

export function _fabricCapacitiesCreateOrUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  capacityName: string,
  resource: FabricCapacity,
  options: FabricCapacitiesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Fabric/capacities/{capacityName}",
      subscriptionId,
      resourceGroupName,
      capacityName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: fabricCapacitySerializer(resource),
    });
}

export async function _fabricCapacitiesCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<FabricCapacity> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return fabricCapacityDeserializer(result.body);
}

/** Create a FabricCapacity */
export function fabricCapacitiesCreateOrUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  capacityName: string,
  resource: FabricCapacity,
  options: FabricCapacitiesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<FabricCapacity>, FabricCapacity> {
  return getLongRunningPoller(context, _fabricCapacitiesCreateOrUpdateDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _fabricCapacitiesCreateOrUpdateSend(
        context,
        subscriptionId,
        resourceGroupName,
        capacityName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<FabricCapacity>, FabricCapacity>;
}

export function _fabricCapacitiesUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  capacityName: string,
  properties: FabricCapacityUpdate,
  options: FabricCapacitiesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Fabric/capacities/{capacityName}",
      subscriptionId,
      resourceGroupName,
      capacityName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: fabricCapacityUpdateSerializer(properties),
    });
}

export async function _fabricCapacitiesUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<FabricCapacity> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return fabricCapacityDeserializer(result.body);
}

/** Update a FabricCapacity */
export function fabricCapacitiesUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  capacityName: string,
  properties: FabricCapacityUpdate,
  options: FabricCapacitiesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FabricCapacity>, FabricCapacity> {
  return getLongRunningPoller(context, _fabricCapacitiesUpdateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _fabricCapacitiesUpdateSend(
        context,
        subscriptionId,
        resourceGroupName,
        capacityName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<FabricCapacity>, FabricCapacity>;
}

export function _fabricCapacitiesDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  capacityName: string,
  options: FabricCapacitiesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Fabric/capacities/{capacityName}",
      subscriptionId,
      resourceGroupName,
      capacityName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _fabricCapacitiesDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a FabricCapacity */
export function fabricCapacitiesDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  capacityName: string,
  options: FabricCapacitiesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _fabricCapacitiesDeleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _fabricCapacitiesDeleteSend(
        context,
        subscriptionId,
        resourceGroupName,
        capacityName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _fabricCapacitiesListByResourceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: FabricCapacitiesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Fabric/capacities",
      subscriptionId,
      resourceGroupName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _fabricCapacitiesListByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_FabricCapacityListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _fabricCapacityListResultDeserializer(result.body);
}

/** List FabricCapacity resources by resource group */
export function fabricCapacitiesListByResourceGroup(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: FabricCapacitiesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<FabricCapacity> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _fabricCapacitiesListByResourceGroupSend(context, subscriptionId, resourceGroupName, options),
    _fabricCapacitiesListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _fabricCapacitiesListBySubscriptionSend(
  context: Client,
  subscriptionId: string,
  options: FabricCapacitiesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path("/subscriptions/{subscriptionId}/providers/Microsoft.Fabric/capacities", subscriptionId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _fabricCapacitiesListBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_FabricCapacityListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _fabricCapacityListResultDeserializer(result.body);
}

/** List FabricCapacity resources by subscription ID */
export function fabricCapacitiesListBySubscription(
  context: Client,
  subscriptionId: string,
  options: FabricCapacitiesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<FabricCapacity> {
  return buildPagedAsyncIterator(
    context,
    () => _fabricCapacitiesListBySubscriptionSend(context, subscriptionId, options),
    _fabricCapacitiesListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _fabricCapacitiesResumeSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  capacityName: string,
  options: FabricCapacitiesResumeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Fabric/capacities/{capacityName}/resume",
      subscriptionId,
      resourceGroupName,
      capacityName,
    )
    .post({ ...operationOptionsToRequestParameters(options) });
}

export async function _fabricCapacitiesResumeDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Resume operation of the specified Fabric capacity instance. */
export function fabricCapacitiesResume(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  capacityName: string,
  options: FabricCapacitiesResumeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _fabricCapacitiesResumeDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _fabricCapacitiesResumeSend(
        context,
        subscriptionId,
        resourceGroupName,
        capacityName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _fabricCapacitiesSuspendSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  capacityName: string,
  options: FabricCapacitiesSuspendOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Fabric/capacities/{capacityName}/suspend",
      subscriptionId,
      resourceGroupName,
      capacityName,
    )
    .post({ ...operationOptionsToRequestParameters(options) });
}

export async function _fabricCapacitiesSuspendDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Suspend operation of the specified Fabric capacity instance. */
export function fabricCapacitiesSuspend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  capacityName: string,
  options: FabricCapacitiesSuspendOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _fabricCapacitiesSuspendDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _fabricCapacitiesSuspendSend(
        context,
        subscriptionId,
        resourceGroupName,
        capacityName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _fabricCapacitiesCheckNameAvailabilitySend(
  context: Client,
  subscriptionId: string,
  location: string,
  body: CheckNameAvailabilityRequest,
  options: FabricCapacitiesCheckNameAvailabilityOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Fabric/locations/{location}/checkNameAvailability",
      subscriptionId,
      location,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: checkNameAvailabilityRequestSerializer(body),
    });
}

export async function _fabricCapacitiesCheckNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckNameAvailabilityResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return checkNameAvailabilityResponseDeserializer(result.body);
}

/** Implements local CheckNameAvailability operations */
export async function fabricCapacitiesCheckNameAvailability(
  context: Client,
  subscriptionId: string,
  location: string,
  body: CheckNameAvailabilityRequest,
  options: FabricCapacitiesCheckNameAvailabilityOptionalParams = {
    requestOptions: {},
  },
): Promise<CheckNameAvailabilityResponse> {
  const result = await _fabricCapacitiesCheckNameAvailabilitySend(
    context,
    subscriptionId,
    location,
    body,
    options,
  );
  return _fabricCapacitiesCheckNameAvailabilityDeserialize(result);
}

export function _fabricCapacitiesListSkusForCapacitySend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  capacityName: string,
  options: FabricCapacitiesListSkusForCapacityOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Fabric/capacities/{capacityName}/skus",
      subscriptionId,
      resourceGroupName,
      capacityName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _fabricCapacitiesListSkusForCapacityDeserialize(
  result: PathUncheckedResponse,
): Promise<_RpSkuEnumerationForExistingResourceResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _rpSkuEnumerationForExistingResourceResultDeserializer(result.body);
}

/** List eligible SKUs for a Microsoft Fabric resource */
export function fabricCapacitiesListSkusForCapacity(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  capacityName: string,
  options: FabricCapacitiesListSkusForCapacityOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<RpSkuDetailsForExistingResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _fabricCapacitiesListSkusForCapacitySend(
        context,
        subscriptionId,
        resourceGroupName,
        capacityName,
        options,
      ),
    _fabricCapacitiesListSkusForCapacityDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _fabricCapacitiesListSkusSend(
  context: Client,
  subscriptionId: string,
  options: FabricCapacitiesListSkusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/subscriptions/{subscriptionId}/providers/Microsoft.Fabric/skus", subscriptionId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _fabricCapacitiesListSkusDeserialize(
  result: PathUncheckedResponse,
): Promise<_RpSkuEnumerationForNewResourceResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _rpSkuEnumerationForNewResourceResultDeserializer(result.body);
}

/** List eligible SKUs for Microsoft Fabric resource provider */
export function fabricCapacitiesListSkus(
  context: Client,
  subscriptionId: string,
  options: FabricCapacitiesListSkusOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RpSkuDetailsForNewResource> {
  return buildPagedAsyncIterator(
    context,
    () => _fabricCapacitiesListSkusSend(context, subscriptionId, options),
    _fabricCapacitiesListSkusDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
