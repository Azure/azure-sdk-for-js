// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext as Client } from "../index.js";
import type {
  NodeCustomization,
  NodeCustomizationUpdate,
  _NodeCustomizationListResult,
  NodeCustomizationVersion,
  _NodeCustomizationVersionListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  nodeCustomizationSerializer,
  nodeCustomizationDeserializer,
  nodeCustomizationUpdateSerializer,
  _nodeCustomizationListResultDeserializer,
  nodeCustomizationVersionDeserializer,
  _nodeCustomizationVersionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NodeCustomizationsListVersionsOptionalParams,
  NodeCustomizationsGetVersionOptionalParams,
  NodeCustomizationsListBySubscriptionOptionalParams,
  NodeCustomizationsListByResourceGroupOptionalParams,
  NodeCustomizationsDeleteVersionOptionalParams,
  NodeCustomizationsDeleteOptionalParams,
  NodeCustomizationsUpdateOptionalParams,
  NodeCustomizationsCreateOrUpdateOptionalParams,
  NodeCustomizationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listVersionsSend(
  context: Client,
  resourceGroupName: string,
  nodeCustomizationName: string,
  options: NodeCustomizationsListVersionsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/nodeCustomizations/{nodeCustomizationName}/versions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      nodeCustomizationName: nodeCustomizationName,
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

export async function _listVersionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_NodeCustomizationVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _nodeCustomizationVersionListResultDeserializer(result.body);
}

/** List all versions of a node customization. */
export function listVersions(
  context: Client,
  resourceGroupName: string,
  nodeCustomizationName: string,
  options: NodeCustomizationsListVersionsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<NodeCustomizationVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listVersionsSend(context, resourceGroupName, nodeCustomizationName, options),
    _listVersionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getVersionSend(
  context: Client,
  resourceGroupName: string,
  nodeCustomizationName: string,
  version: string,
  options: NodeCustomizationsGetVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/nodeCustomizations/{nodeCustomizationName}/versions/{version}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      nodeCustomizationName: nodeCustomizationName,
      version: version,
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

export async function _getVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<NodeCustomizationVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return nodeCustomizationVersionDeserializer(result.body);
}

/** Get a node customization at a particular version. */
export async function getVersion(
  context: Client,
  resourceGroupName: string,
  nodeCustomizationName: string,
  version: string,
  options: NodeCustomizationsGetVersionOptionalParams = { requestOptions: {} },
): Promise<NodeCustomizationVersion> {
  const result = await _getVersionSend(
    context,
    resourceGroupName,
    nodeCustomizationName,
    version,
    options,
  );
  return _getVersionDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: NodeCustomizationsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/nodeCustomizations{?api%2Dversion}",
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
): Promise<_NodeCustomizationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _nodeCustomizationListResultDeserializer(result.body);
}

/** List the node customizations in a subscription at the latest version. */
export function listBySubscription(
  context: Client,
  options: NodeCustomizationsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<NodeCustomization> {
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
  options: NodeCustomizationsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/nodeCustomizations{?api%2Dversion}",
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
): Promise<_NodeCustomizationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _nodeCustomizationListResultDeserializer(result.body);
}

/** List the node customizations in a resource group at the latest version. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: NodeCustomizationsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<NodeCustomization> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _deleteVersionSend(
  context: Client,
  resourceGroupName: string,
  nodeCustomizationName: string,
  version: string,
  options: NodeCustomizationsDeleteVersionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/nodeCustomizations/{nodeCustomizationName}/versions/{version}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      nodeCustomizationName: nodeCustomizationName,
      version: version,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifMatch !== undefined ? { "If-Match": options?.ifMatch } : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deleteVersionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a node customization version. This operation will be blocked if the node customization version is in use. */
export function deleteVersion(
  context: Client,
  resourceGroupName: string,
  nodeCustomizationName: string,
  version: string,
  options: NodeCustomizationsDeleteVersionOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteVersionDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteVersionSend(context, resourceGroupName, nodeCustomizationName, version, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  nodeCustomizationName: string,
  options: NodeCustomizationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/nodeCustomizations/{nodeCustomizationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      nodeCustomizationName: nodeCustomizationName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifMatch !== undefined ? { "If-Match": options?.ifMatch } : {}),
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

/** Delete a node customization. This operation will be blocked if the resource is in use. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  nodeCustomizationName: string,
  options: NodeCustomizationsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, nodeCustomizationName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  nodeCustomizationName: string,
  properties: NodeCustomizationUpdate,
  options: NodeCustomizationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/nodeCustomizations/{nodeCustomizationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      nodeCustomizationName: nodeCustomizationName,
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
      ...(options?.ifMatch !== undefined ? { "If-Match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: nodeCustomizationUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<NodeCustomization> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return nodeCustomizationDeserializer(result.body);
}

/** Update a NodeCustomization */
export function update(
  context: Client,
  resourceGroupName: string,
  nodeCustomizationName: string,
  properties: NodeCustomizationUpdate,
  options: NodeCustomizationsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NodeCustomization>, NodeCustomization> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, nodeCustomizationName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<NodeCustomization>, NodeCustomization>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  nodeCustomizationName: string,
  resource: NodeCustomization,
  options: NodeCustomizationsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/nodeCustomizations/{nodeCustomizationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      nodeCustomizationName: nodeCustomizationName,
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
      ...(options?.ifMatch !== undefined ? { "If-Match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "If-None-Match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: nodeCustomizationSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<NodeCustomization> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return nodeCustomizationDeserializer(result.body);
}

/** Create or update a node customization resource. This will create a new version. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  nodeCustomizationName: string,
  resource: NodeCustomization,
  options: NodeCustomizationsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<NodeCustomization>, NodeCustomization> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, nodeCustomizationName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<NodeCustomization>, NodeCustomization>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  nodeCustomizationName: string,
  options: NodeCustomizationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/nodeCustomizations/{nodeCustomizationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      nodeCustomizationName: nodeCustomizationName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<NodeCustomization> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return nodeCustomizationDeserializer(result.body);
}

/** Get a node customization at the latest version. */
export async function get(
  context: Client,
  resourceGroupName: string,
  nodeCustomizationName: string,
  options: NodeCustomizationsGetOptionalParams = { requestOptions: {} },
): Promise<NodeCustomization> {
  const result = await _getSend(context, resourceGroupName, nodeCustomizationName, options);
  return _getDeserialize(result);
}
