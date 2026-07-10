// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerInstanceManagementContext as Client } from "../index.js";
import type {
  ContainerGroup,
  Resource,
  _ContainerGroupListResult,
  ContainerGroupsGetOutboundNetworkDependenciesEndpointsResponse,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  containerGroupSerializer,
  containerGroupDeserializer,
  resourceSerializer,
  _containerGroupListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ContainerGroupsListByResourceGroupOptionalParams,
  ContainerGroupsListOptionalParams,
  ContainerGroupsGetOutboundNetworkDependenciesEndpointsOptionalParams,
  ContainerGroupsStartOptionalParams,
  ContainerGroupsStopOptionalParams,
  ContainerGroupsRestartOptionalParams,
  ContainerGroupsDeleteOptionalParams,
  ContainerGroupsUpdateOptionalParams,
  ContainerGroupsCreateOrUpdateOptionalParams,
  ContainerGroupsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ContainerGroupsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
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
): Promise<_ContainerGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _containerGroupListResultDeserializer(result.body);
}

/** Get a list of container groups in a specified subscription and resource group. This operation returns properties of each container group including containers, image registry credentials, restart policy, IP address type, OS type, state, and volumes. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ContainerGroupsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ContainerGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-07-01" },
  );
}

export function _listSend(
  context: Client,
  options: ContainerGroupsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerInstance/containerGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ContainerGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _containerGroupListResultDeserializer(result.body);
}

/** Get a list of container groups in the specified subscription. This operation returns properties of each container group including containers, image registry credentials, restart policy, IP address type, OS type, state, and volumes. */
export function list(
  context: Client,
  options: ContainerGroupsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ContainerGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-07-01" },
  );
}

export function _getOutboundNetworkDependenciesEndpointsSend(
  context: Client,
  resourceGroupName: string,
  containerGroupName: string,
  options: ContainerGroupsGetOutboundNetworkDependenciesEndpointsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroups/{containerGroupName}/outboundNetworkDependenciesEndpoints{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerGroupName: containerGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
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

export async function _getOutboundNetworkDependenciesEndpointsDeserialize(
  result: PathUncheckedResponse,
): Promise<ContainerGroupsGetOutboundNetworkDependenciesEndpointsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return {
    body: result.body.map((p: any) => {
      return p;
    }),
  };
}

/** Gets all the network dependencies for this container group to allow complete control of network setting and configuration. For container groups, this will always be an empty list. */
export async function getOutboundNetworkDependenciesEndpoints(
  context: Client,
  resourceGroupName: string,
  containerGroupName: string,
  options: ContainerGroupsGetOutboundNetworkDependenciesEndpointsOptionalParams = {
    requestOptions: {},
  },
): Promise<ContainerGroupsGetOutboundNetworkDependenciesEndpointsResponse> {
  const result = await _getOutboundNetworkDependenciesEndpointsSend(
    context,
    resourceGroupName,
    containerGroupName,
    options,
  );
  return _getOutboundNetworkDependenciesEndpointsDeserialize(result);
}

export function _startSend(
  context: Client,
  resourceGroupName: string,
  containerGroupName: string,
  options: ContainerGroupsStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroups/{containerGroupName}/start{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerGroupName: containerGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _startDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Starts all containers in a container group. Compute resources will be allocated and billing will start. */
export function start(
  context: Client,
  resourceGroupName: string,
  containerGroupName: string,
  options: ContainerGroupsStartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _startDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _startSend(context, resourceGroupName, containerGroupName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-07-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _stopSend(
  context: Client,
  resourceGroupName: string,
  containerGroupName: string,
  options: ContainerGroupsStopOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroups/{containerGroupName}/stop{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerGroupName: containerGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _stopDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Stops all containers in a container group. Compute resources will be deallocated and billing will stop. */
export async function stop(
  context: Client,
  resourceGroupName: string,
  containerGroupName: string,
  options: ContainerGroupsStopOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _stopSend(context, resourceGroupName, containerGroupName, options);
  return _stopDeserialize(result);
}

export function _restartSend(
  context: Client,
  resourceGroupName: string,
  containerGroupName: string,
  options: ContainerGroupsRestartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroups/{containerGroupName}/restart{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerGroupName: containerGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _restartDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204", "200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Restarts all containers in a container group in place. If container image has updates, new image will be downloaded. */
export function restart(
  context: Client,
  resourceGroupName: string,
  containerGroupName: string,
  options: ContainerGroupsRestartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _restartDeserialize, ["204", "200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _restartSend(context, resourceGroupName, containerGroupName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-07-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  containerGroupName: string,
  options: ContainerGroupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroups/{containerGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerGroupName: containerGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<ContainerGroup> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return containerGroupDeserializer(result.body);
}

/** Delete the specified container group in the specified subscription and resource group. The operation does not delete other resources provided by the user, such as volumes. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  containerGroupName: string,
  options: ContainerGroupsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ContainerGroup>, ContainerGroup> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, containerGroupName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-07-01",
  }) as PollerLike<OperationState<ContainerGroup>, ContainerGroup>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  containerGroupName: string,
  resource: Resource,
  options: ContainerGroupsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroups/{containerGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerGroupName: containerGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: resourceSerializer(resource),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ContainerGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return containerGroupDeserializer(result.body);
}

/** Updates container group tags with specified values. */
export async function update(
  context: Client,
  resourceGroupName: string,
  containerGroupName: string,
  resource: Resource,
  options: ContainerGroupsUpdateOptionalParams = { requestOptions: {} },
): Promise<ContainerGroup> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    containerGroupName,
    resource,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  containerGroupName: string,
  containerGroup: ContainerGroup,
  options: ContainerGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroups/{containerGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerGroupName: containerGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: containerGroupSerializer(containerGroup),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ContainerGroup> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return containerGroupDeserializer(result.body);
}

/** Create or update container groups with specified configurations. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  containerGroupName: string,
  containerGroup: ContainerGroup,
  options: ContainerGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ContainerGroup>, ContainerGroup> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, containerGroupName, containerGroup, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-07-01",
  }) as PollerLike<OperationState<ContainerGroup>, ContainerGroup>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  containerGroupName: string,
  options: ContainerGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroups/{containerGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerGroupName: containerGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ContainerGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return containerGroupDeserializer(result.body);
}

/** Gets the properties of the specified container group in the specified subscription and resource group. The operation returns the properties of each container group including containers, image registry credentials, restart policy, IP address type, OS type, state, and volumes. */
export async function get(
  context: Client,
  resourceGroupName: string,
  containerGroupName: string,
  options: ContainerGroupsGetOptionalParams = { requestOptions: {} },
): Promise<ContainerGroup> {
  const result = await _getSend(context, resourceGroupName, containerGroupName, options);
  return _getDeserialize(result);
}
