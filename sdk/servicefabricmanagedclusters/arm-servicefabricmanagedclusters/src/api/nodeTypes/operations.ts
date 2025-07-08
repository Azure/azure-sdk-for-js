// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricManagedClustersManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  FaultSimulationIdContent,
  faultSimulationIdContentSerializer,
  FaultSimulation,
  faultSimulationDeserializer,
  _FaultSimulationListResult,
  _faultSimulationListResultDeserializer,
  FaultSimulationContentWrapper,
  faultSimulationContentWrapperSerializer,
  NodeType,
  nodeTypeSerializer,
  nodeTypeDeserializer,
  NodeTypeUpdateParameters,
  nodeTypeUpdateParametersSerializer,
  _NodeTypeListResult,
  _nodeTypeListResultDeserializer,
  NodeTypeActionParameters,
  nodeTypeActionParametersSerializer,
} from "../../models/models.js";
import {
  NodeTypesListFaultSimulationOptionalParams,
  NodeTypesGetFaultSimulationOptionalParams,
  NodeTypesStopFaultSimulationOptionalParams,
  NodeTypesStartFaultSimulationOptionalParams,
  NodeTypesStartOptionalParams,
  NodeTypesRestartOptionalParams,
  NodeTypesReimageOptionalParams,
  NodeTypesRedeployOptionalParams,
  NodeTypesDeleteNodeOptionalParams,
  NodeTypesDeallocateOptionalParams,
  NodeTypesListByManagedClustersOptionalParams,
  NodeTypesDeleteOptionalParams,
  NodeTypesUpdateOptionalParams,
  NodeTypesCreateOrUpdateOptionalParams,
  NodeTypesGetOptionalParams,
} from "./options.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listFaultSimulationSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  nodeTypeName: string,
  options: NodeTypesListFaultSimulationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/nodeTypes/{nodeTypeName}/listFaultSimulation{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      nodeTypeName: nodeTypeName,
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

/** Gets the list of recent fault simulations for the node type. */
export function listFaultSimulation(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  nodeTypeName: string,
  options: NodeTypesListFaultSimulationOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FaultSimulation> {
  return buildPagedAsyncIterator(
    context,
    () => _listFaultSimulationSend(context, resourceGroupName, clusterName, nodeTypeName, options),
    _listFaultSimulationDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getFaultSimulationSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  nodeTypeName: string,
  parameters: FaultSimulationIdContent,
  options: NodeTypesGetFaultSimulationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/nodeTypes/{nodeTypeName}/getFaultSimulation{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      nodeTypeName: nodeTypeName,
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
  nodeTypeName: string,
  parameters: FaultSimulationIdContent,
  options: NodeTypesGetFaultSimulationOptionalParams = { requestOptions: {} },
): Promise<FaultSimulation> {
  const result = await _getFaultSimulationSend(
    context,
    resourceGroupName,
    clusterName,
    nodeTypeName,
    parameters,
    options,
  );
  return _getFaultSimulationDeserialize(result);
}

export function _stopFaultSimulationSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  nodeTypeName: string,
  parameters: FaultSimulationIdContent,
  options: NodeTypesStopFaultSimulationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/nodeTypes/{nodeTypeName}/stopFaultSimulation{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      nodeTypeName: nodeTypeName,
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

export async function _stopFaultSimulationDeserialize(
  result: PathUncheckedResponse,
): Promise<FaultSimulation> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return faultSimulationDeserializer(result.body);
}

/** Stops a fault simulation on the node type. */
export function stopFaultSimulation(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  nodeTypeName: string,
  parameters: FaultSimulationIdContent,
  options: NodeTypesStopFaultSimulationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FaultSimulation>, FaultSimulation> {
  return getLongRunningPoller(context, _stopFaultSimulationDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _stopFaultSimulationSend(
        context,
        resourceGroupName,
        clusterName,
        nodeTypeName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<FaultSimulation>, FaultSimulation>;
}

export function _startFaultSimulationSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  nodeTypeName: string,
  parameters: FaultSimulationContentWrapper,
  options: NodeTypesStartFaultSimulationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/nodeTypes/{nodeTypeName}/startFaultSimulation{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      nodeTypeName: nodeTypeName,
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
    body: faultSimulationContentWrapperSerializer(parameters),
  });
}

export async function _startFaultSimulationDeserialize(
  result: PathUncheckedResponse,
): Promise<FaultSimulation> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return faultSimulationDeserializer(result.body);
}

/** Starts a fault simulation on the node type. */
export function startFaultSimulation(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  nodeTypeName: string,
  parameters: FaultSimulationContentWrapper,
  options: NodeTypesStartFaultSimulationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FaultSimulation>, FaultSimulation> {
  return getLongRunningPoller(context, _startFaultSimulationDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _startFaultSimulationSend(
        context,
        resourceGroupName,
        clusterName,
        nodeTypeName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<FaultSimulation>, FaultSimulation>;
}

export function _startSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  nodeTypeName: string,
  parameters: NodeTypeActionParameters,
  options: NodeTypesStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/nodeTypes/{nodeTypeName}/start{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      nodeTypeName: nodeTypeName,
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
    body: nodeTypeActionParametersSerializer(parameters),
  });
}

export async function _startDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Starts one or more nodes on the node type. It will trigger an allocation of the fabric node if needed and activate them. */
export function start(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  nodeTypeName: string,
  parameters: NodeTypeActionParameters,
  options: NodeTypesStartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _startDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _startSend(context, resourceGroupName, clusterName, nodeTypeName, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _restartSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  nodeTypeName: string,
  parameters: NodeTypeActionParameters,
  options: NodeTypesRestartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/nodeTypes/{nodeTypeName}/restart{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      nodeTypeName: nodeTypeName,
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
    body: nodeTypeActionParametersSerializer(parameters),
  });
}

export async function _restartDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Restarts one or more nodes on the node type. It will disable the fabric nodes, trigger a restart on the VMs and activate the nodes back again. */
export function restart(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  nodeTypeName: string,
  parameters: NodeTypeActionParameters,
  options: NodeTypesRestartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _restartDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _restartSend(context, resourceGroupName, clusterName, nodeTypeName, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _reimageSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  nodeTypeName: string,
  parameters: NodeTypeActionParameters,
  options: NodeTypesReimageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/nodeTypes/{nodeTypeName}/reimage{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      nodeTypeName: nodeTypeName,
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
    body: nodeTypeActionParametersSerializer(parameters),
  });
}

export async function _reimageDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Reimages one or more nodes on the node type. It will disable the fabric nodes, trigger a reimage on the VMs and activate the nodes back again. */
export function reimage(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  nodeTypeName: string,
  parameters: NodeTypeActionParameters,
  options: NodeTypesReimageOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _reimageDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _reimageSend(context, resourceGroupName, clusterName, nodeTypeName, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _redeploySend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  nodeTypeName: string,
  parameters: NodeTypeActionParameters,
  options: NodeTypesRedeployOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/nodeTypes/{nodeTypeName}/redeploy{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      nodeTypeName: nodeTypeName,
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
    body: nodeTypeActionParametersSerializer(parameters),
  });
}

export async function _redeployDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Redeploys one or more nodes on the node type. It will disable the fabric nodes, trigger a shut down on the VMs, move them to a new node, and power them back on. */
export function redeploy(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  nodeTypeName: string,
  parameters: NodeTypeActionParameters,
  options: NodeTypesRedeployOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _redeployDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _redeploySend(context, resourceGroupName, clusterName, nodeTypeName, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _deleteNodeSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  nodeTypeName: string,
  parameters: NodeTypeActionParameters,
  options: NodeTypesDeleteNodeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/nodeTypes/{nodeTypeName}/deleteNode{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      nodeTypeName: nodeTypeName,
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
    body: nodeTypeActionParametersSerializer(parameters),
  });
}

export async function _deleteNodeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes one or more nodes on the node type. It will disable the fabric nodes, trigger a delete on the VMs and removes the state from the cluster. */
export function deleteNode(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  nodeTypeName: string,
  parameters: NodeTypeActionParameters,
  options: NodeTypesDeleteNodeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteNodeDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteNodeSend(context, resourceGroupName, clusterName, nodeTypeName, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _deallocateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  nodeTypeName: string,
  parameters: NodeTypeActionParameters,
  options: NodeTypesDeallocateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/nodeTypes/{nodeTypeName}/deallocate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      nodeTypeName: nodeTypeName,
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
    body: nodeTypeActionParametersSerializer(parameters),
  });
}

export async function _deallocateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deallocates one or more nodes on the node type. It will disable the fabric nodes, trigger a shutdown on the VMs and release them from the cluster. */
export function deallocate(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  nodeTypeName: string,
  parameters: NodeTypeActionParameters,
  options: NodeTypesDeallocateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deallocateDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deallocateSend(context, resourceGroupName, clusterName, nodeTypeName, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listByManagedClustersSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: NodeTypesListByManagedClustersOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/nodeTypes{?api%2Dversion}",
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

export async function _listByManagedClustersDeserialize(
  result: PathUncheckedResponse,
): Promise<_NodeTypeListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _nodeTypeListResultDeserializer(result.body);
}

/** Gets all Node types of the specified managed cluster. */
export function listByManagedClusters(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: NodeTypesListByManagedClustersOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<NodeType> {
  return buildPagedAsyncIterator(
    context,
    () => _listByManagedClustersSend(context, resourceGroupName, clusterName, options),
    _listByManagedClustersDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  nodeTypeName: string,
  options: NodeTypesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/nodeTypes/{nodeTypeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      nodeTypeName: nodeTypeName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a Service Fabric node type of a given managed cluster. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  nodeTypeName: string,
  options: NodeTypesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, clusterName, nodeTypeName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  nodeTypeName: string,
  parameters: NodeTypeUpdateParameters,
  options: NodeTypesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/nodeTypes/{nodeTypeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      nodeTypeName: nodeTypeName,
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
    body: nodeTypeUpdateParametersSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<NodeType> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return nodeTypeDeserializer(result.body);
}

/** Update the configuration of a node type of a given managed cluster, only updating tags. */
export function update(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  nodeTypeName: string,
  parameters: NodeTypeUpdateParameters,
  options: NodeTypesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NodeType>, NodeType> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, clusterName, nodeTypeName, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<NodeType>, NodeType>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  nodeTypeName: string,
  parameters: NodeType,
  options: NodeTypesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/nodeTypes/{nodeTypeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      nodeTypeName: nodeTypeName,
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
    body: nodeTypeSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<NodeType> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return nodeTypeDeserializer(result.body);
}

/** Create or update a Service Fabric node type of a given managed cluster. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  nodeTypeName: string,
  parameters: NodeType,
  options: NodeTypesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NodeType>, NodeType> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        clusterName,
        nodeTypeName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<NodeType>, NodeType>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  nodeTypeName: string,
  options: NodeTypesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/nodeTypes/{nodeTypeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      nodeTypeName: nodeTypeName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<NodeType> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return nodeTypeDeserializer(result.body);
}

/** Get a Service Fabric node type of a given managed cluster. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  nodeTypeName: string,
  options: NodeTypesGetOptionalParams = { requestOptions: {} },
): Promise<NodeType> {
  const result = await _getSend(context, resourceGroupName, clusterName, nodeTypeName, options);
  return _getDeserialize(result);
}
