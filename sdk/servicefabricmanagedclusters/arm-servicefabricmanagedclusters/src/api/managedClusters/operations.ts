// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceFabricManagedClustersManagementContext as Client } from "../index.js";
import type {
  ManagedCluster,
  ManagedClusterUpdateParameters,
  _ManagedClusterListResult,
  FaultSimulationIdContent,
  FaultSimulation,
  _FaultSimulationListResult,
  FaultSimulationContentWrapper,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  managedClusterSerializer,
  managedClusterDeserializer,
  managedClusterUpdateParametersSerializer,
  _managedClusterListResultDeserializer,
  faultSimulationIdContentSerializer,
  faultSimulationDeserializer,
  _faultSimulationListResultDeserializer,
  faultSimulationContentWrapperSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ManagedClustersStopFaultSimulationOptionalParams,
  ManagedClustersStartFaultSimulationOptionalParams,
  ManagedClustersListFaultSimulationOptionalParams,
  ManagedClustersGetFaultSimulationOptionalParams,
  ManagedClustersListBySubscriptionOptionalParams,
  ManagedClustersListByResourceGroupOptionalParams,
  ManagedClustersDeleteOptionalParams,
  ManagedClustersUpdateOptionalParams,
  ManagedClustersCreateOrUpdateOptionalParams,
  ManagedClustersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _stopFaultSimulationSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  parameters: FaultSimulationIdContent,
  options: ManagedClustersStopFaultSimulationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/stopFaultSimulation{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: faultSimulationIdContentSerializer(parameters),
  });
}

export async function _stopFaultSimulationDeserialize(
  result: PathUncheckedResponse,
): Promise<FaultSimulation> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return faultSimulationDeserializer(result.body);
}

/** Stops a fault simulation on the cluster. */
export function stopFaultSimulation(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  parameters: FaultSimulationIdContent,
  options: ManagedClustersStopFaultSimulationOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<FaultSimulation>, FaultSimulation> {
  return getLongRunningPoller(context, _stopFaultSimulationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _stopFaultSimulationSend(context, resourceGroupName, clusterName, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<FaultSimulation>, FaultSimulation>;
}

export function _startFaultSimulationSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  parameters: FaultSimulationContentWrapper,
  options: ManagedClustersStartFaultSimulationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/startFaultSimulation{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: faultSimulationContentWrapperSerializer(parameters),
  });
}

export async function _startFaultSimulationDeserialize(
  result: PathUncheckedResponse,
): Promise<FaultSimulation> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return faultSimulationDeserializer(result.body);
}

/** Starts a fault simulation on the cluster. */
export function startFaultSimulation(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  parameters: FaultSimulationContentWrapper,
  options: ManagedClustersStartFaultSimulationOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<FaultSimulation>, FaultSimulation> {
  return getLongRunningPoller(context, _startFaultSimulationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _startFaultSimulationSend(context, resourceGroupName, clusterName, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<FaultSimulation>, FaultSimulation>;
}

export function _listFaultSimulationSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ManagedClustersListFaultSimulationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/listFaultSimulation{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listFaultSimulationDeserialize(
  result: PathUncheckedResponse,
): Promise<_FaultSimulationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _faultSimulationListResultDeserializer(result.body);
}

/** Gets the list of recent fault simulations for the cluster. */
export function listFaultSimulation(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ManagedClustersListFaultSimulationOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<FaultSimulation> {
  return buildPagedAsyncIterator(
    context,
    () => _listFaultSimulationSend(context, resourceGroupName, clusterName, options),
    _listFaultSimulationDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getFaultSimulationSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  parameters: FaultSimulationIdContent,
  options: ManagedClustersGetFaultSimulationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/getFaultSimulation{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: faultSimulationIdContentSerializer(parameters),
  });
}

export async function _getFaultSimulationDeserialize(
  result: PathUncheckedResponse,
): Promise<FaultSimulation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return faultSimulationDeserializer(result.body);
}

/** Gets a fault simulation by the simulationId. */
export async function getFaultSimulation(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  parameters: FaultSimulationIdContent,
  options: ManagedClustersGetFaultSimulationOptionalParams = {
    requestOptions: {},
  },
): Promise<FaultSimulation> {
  const result = await _getFaultSimulationSend(
    context,
    resourceGroupName,
    clusterName,
    parameters,
    options,
  );
  return _getFaultSimulationDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: ManagedClustersListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/managedClusters{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_ManagedClusterListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _managedClusterListResultDeserializer(result.body);
}

/** Gets all Service Fabric cluster resources created or in the process of being created in the subscription. */
export function listBySubscription(
  context: Client,
  options: ManagedClustersListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ManagedCluster> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ManagedClustersListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_ManagedClusterListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _managedClusterListResultDeserializer(result.body);
}

/** Gets all Service Fabric cluster resources created or in the process of being created in the resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ManagedClustersListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ManagedCluster> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ManagedClustersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a Service Fabric managed cluster resource with the specified name. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ManagedClustersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, clusterName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  parameters: ManagedClusterUpdateParameters,
  options: ManagedClustersUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: managedClusterUpdateParametersSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ManagedCluster> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return managedClusterDeserializer(result.body);
}

/** Update the tags of of a Service Fabric managed cluster resource with the specified name. */
export function update(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  parameters: ManagedClusterUpdateParameters,
  options: ManagedClustersUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ManagedCluster>, ManagedCluster> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, clusterName, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ManagedCluster>, ManagedCluster>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  parameters: ManagedCluster,
  options: ManagedClustersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: managedClusterSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedCluster> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return managedClusterDeserializer(result.body);
}

/** Create or update a Service Fabric managed cluster resource with the specified name. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  parameters: ManagedCluster,
  options: ManagedClustersCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ManagedCluster>, ManagedCluster> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, clusterName, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ManagedCluster>, ManagedCluster>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ManagedClustersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ManagedCluster> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return managedClusterDeserializer(result.body);
}

/** Get a Service Fabric managed cluster resource created or in the process of being created in the specified resource group. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ManagedClustersGetOptionalParams = { requestOptions: {} },
): Promise<ManagedCluster> {
  const result = await _getSend(context, resourceGroupName, clusterName, options);
  return _getDeserialize(result);
}
