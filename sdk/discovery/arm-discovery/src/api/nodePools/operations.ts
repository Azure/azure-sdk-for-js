// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  NodePool,
  nodePoolSerializer,
  nodePoolDeserializer,
  _NodePoolListResult,
  _nodePoolListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  NodePoolsListBySupercomputerOptionalParams,
  NodePoolsDeleteOptionalParams,
  NodePoolsUpdateOptionalParams,
  NodePoolsCreateOrUpdateOptionalParams,
  NodePoolsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySupercomputerSend(
  context: Client,
  resourceGroupName: string,
  supercomputerName: string,
  options: NodePoolsListBySupercomputerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Discovery/supercomputers/{supercomputerName}/nodePools{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      supercomputerName: supercomputerName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listBySupercomputerDeserialize(
  result: PathUncheckedResponse,
): Promise<_NodePoolListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _nodePoolListResultDeserializer(result.body);
}

/** List NodePool resources by Supercomputer */
export function listBySupercomputer(
  context: Client,
  resourceGroupName: string,
  supercomputerName: string,
  options: NodePoolsListBySupercomputerOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NodePool> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySupercomputerSend(context, resourceGroupName, supercomputerName, options),
    _listBySupercomputerDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  supercomputerName: string,
  nodePoolName: string,
  options: NodePoolsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Discovery/supercomputers/{supercomputerName}/nodePools/{nodePoolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      supercomputerName: supercomputerName,
      nodePoolName: nodePoolName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
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

/** Delete a NodePool */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  supercomputerName: string,
  nodePoolName: string,
  options: NodePoolsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, supercomputerName, nodePoolName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  supercomputerName: string,
  nodePoolName: string,
  properties: NodePool,
  options: NodePoolsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Discovery/supercomputers/{supercomputerName}/nodePools/{nodePoolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      supercomputerName: supercomputerName,
      nodePoolName: nodePoolName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: nodePoolSerializer(properties),
    });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<NodePool> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return nodePoolDeserializer(result.body);
}

/** Update a NodePool */
export function update(
  context: Client,
  resourceGroupName: string,
  supercomputerName: string,
  nodePoolName: string,
  properties: NodePool,
  options: NodePoolsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NodePool>, NodePool> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, supercomputerName, nodePoolName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<NodePool>, NodePool>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  supercomputerName: string,
  nodePoolName: string,
  resource: NodePool,
  options: NodePoolsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Discovery/supercomputers/{supercomputerName}/nodePools/{nodePoolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      supercomputerName: supercomputerName,
      nodePoolName: nodePoolName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: nodePoolSerializer(resource),
    });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<NodePool> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return nodePoolDeserializer(result.body);
}

/** Create a NodePool */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  supercomputerName: string,
  nodePoolName: string,
  resource: NodePool,
  options: NodePoolsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NodePool>, NodePool> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        supercomputerName,
        nodePoolName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<NodePool>, NodePool>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  supercomputerName: string,
  nodePoolName: string,
  options: NodePoolsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Discovery/supercomputers/{supercomputerName}/nodePools/{nodePoolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      supercomputerName: supercomputerName,
      nodePoolName: nodePoolName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<NodePool> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return nodePoolDeserializer(result.body);
}

/** Get a NodePool */
export async function get(
  context: Client,
  resourceGroupName: string,
  supercomputerName: string,
  nodePoolName: string,
  options: NodePoolsGetOptionalParams = { requestOptions: {} },
): Promise<NodePool> {
  const result = await _getSend(
    context,
    resourceGroupName,
    supercomputerName,
    nodePoolName,
    options,
  );
  return _getDeserialize(result);
}
