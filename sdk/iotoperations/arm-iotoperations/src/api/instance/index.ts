// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  IoTOperationsContext as Client,
  InstanceCreateOrUpdateOptionalParams,
  InstanceDeleteOptionalParams,
  InstanceGetOptionalParams,
  InstanceListByResourceGroupOptionalParams,
  InstanceListBySubscriptionOptionalParams,
  InstanceUpdateOptionalParams,
} from "../index.js";
import {
  InstanceResource,
  instanceResourceSerializer,
  instanceResourceDeserializer,
  InstancePatchModel,
  instancePatchModelSerializer,
  _InstanceResourceListResult,
  _instanceResourceListResultDeserializer,
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

export function _instanceGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  options: InstanceGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}",
      subscriptionId,
      resourceGroupName,
      instanceName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _instanceGetDeserialize(
  result: PathUncheckedResponse,
): Promise<InstanceResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return instanceResourceDeserializer(result.body);
}

/** Get a InstanceResource */
export async function instanceGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  options: InstanceGetOptionalParams = { requestOptions: {} },
): Promise<InstanceResource> {
  const result = await _instanceGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    instanceName,
    options,
  );
  return _instanceGetDeserialize(result);
}

export function _instanceCreateOrUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  resource: InstanceResource,
  options: InstanceCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}",
      subscriptionId,
      resourceGroupName,
      instanceName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: instanceResourceSerializer(resource),
    });
}

export async function _instanceCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<InstanceResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return instanceResourceDeserializer(result.body);
}

/** Create a InstanceResource */
export function instanceCreateOrUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  resource: InstanceResource,
  options: InstanceCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<InstanceResource>, InstanceResource> {
  return getLongRunningPoller(
    context,
    _instanceCreateOrUpdateDeserialize,
    ["200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _instanceCreateOrUpdateSend(
          context,
          subscriptionId,
          resourceGroupName,
          instanceName,
          resource,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<OperationState<InstanceResource>, InstanceResource>;
}

export function _instanceUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  properties: InstancePatchModel,
  options: InstanceUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}",
      subscriptionId,
      resourceGroupName,
      instanceName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: instancePatchModelSerializer(properties),
    });
}

export async function _instanceUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<InstanceResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return instanceResourceDeserializer(result.body);
}

/** Update a InstanceResource */
export async function instanceUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  properties: InstancePatchModel,
  options: InstanceUpdateOptionalParams = { requestOptions: {} },
): Promise<InstanceResource> {
  const result = await _instanceUpdateSend(
    context,
    subscriptionId,
    resourceGroupName,
    instanceName,
    properties,
    options,
  );
  return _instanceUpdateDeserialize(result);
}

export function _instanceDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  options: InstanceDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances/{instanceName}",
      subscriptionId,
      resourceGroupName,
      instanceName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _instanceDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a InstanceResource */
export function instanceDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  instanceName: string,
  options: InstanceDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _instanceDeleteDeserialize,
    ["202", "204", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _instanceDeleteSend(
          context,
          subscriptionId,
          resourceGroupName,
          instanceName,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _instanceListByResourceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: InstanceListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTOperations/instances",
      subscriptionId,
      resourceGroupName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _instanceListByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_InstanceResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _instanceResourceListResultDeserializer(result.body);
}

/** List InstanceResource resources by resource group */
export function instanceListByResourceGroup(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: InstanceListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<InstanceResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _instanceListByResourceGroupSend(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    _instanceListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _instanceListBySubscriptionSend(
  context: Client,
  subscriptionId: string,
  options: InstanceListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.IoTOperations/instances",
      subscriptionId,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _instanceListBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_InstanceResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _instanceResourceListResultDeserializer(result.body);
}

/** List InstanceResource resources by subscription ID */
export function instanceListBySubscription(
  context: Client,
  subscriptionId: string,
  options: InstanceListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<InstanceResource> {
  return buildPagedAsyncIterator(
    context,
    () => _instanceListBySubscriptionSend(context, subscriptionId, options),
    _instanceListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
