// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedHatOpenShiftContext as Client } from "../index.js";
import type {
  NodePool,
  UpdateablePropertiesNodePoolProperties,
  _NodePoolListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  nodePoolSerializer,
  nodePoolDeserializer,
  updateablePropertiesNodePoolPropertiesSerializer,
  _nodePoolListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NodePoolsListByParentOptionalParams,
  NodePoolsDeleteOptionalParams,
  NodePoolsUpdateOptionalParams,
  NodePoolsCreateOrUpdateOptionalParams,
  NodePoolsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByParentSend(
  context: Client,
  resourceGroupName: string,
  hcpOpenShiftClusterName: string,
  options: NodePoolsListByParentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RedHatOpenShift/hcpOpenShiftClusters/{hcpOpenShiftClusterName}/nodePools{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      hcpOpenShiftClusterName: hcpOpenShiftClusterName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01-preview",
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

export async function _listByParentDeserialize(
  result: PathUncheckedResponse,
): Promise<_NodePoolListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _nodePoolListResultDeserializer(result.body);
}

/** List NodePool resources by HcpOpenShiftCluster */
export function listByParent(
  context: Client,
  resourceGroupName: string,
  hcpOpenShiftClusterName: string,
  options: NodePoolsListByParentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NodePool> {
  return buildPagedAsyncIterator(
    context,
    () => _listByParentSend(context, resourceGroupName, hcpOpenShiftClusterName, options),
    _listByParentDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-09-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  hcpOpenShiftClusterName: string,
  nodePoolName: string,
  options: NodePoolsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RedHatOpenShift/hcpOpenShiftClusters/{hcpOpenShiftClusterName}/nodePools/{nodePoolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      hcpOpenShiftClusterName: hcpOpenShiftClusterName,
      nodePoolName: nodePoolName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01-preview",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a NodePool */
export function $delete(
  context: Client,
  resourceGroupName: string,
  hcpOpenShiftClusterName: string,
  nodePoolName: string,
  options: NodePoolsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, hcpOpenShiftClusterName, nodePoolName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-09-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  hcpOpenShiftClusterName: string,
  nodePoolName: string,
  properties: UpdateablePropertiesNodePoolProperties,
  options: NodePoolsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RedHatOpenShift/hcpOpenShiftClusters/{hcpOpenShiftClusterName}/nodePools/{nodePoolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      hcpOpenShiftClusterName: hcpOpenShiftClusterName,
      nodePoolName: nodePoolName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: updateablePropertiesNodePoolPropertiesSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<NodePool> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return nodePoolDeserializer(result.body);
}

/** Update a NodePool */
export function update(
  context: Client,
  resourceGroupName: string,
  hcpOpenShiftClusterName: string,
  nodePoolName: string,
  properties: UpdateablePropertiesNodePoolProperties,
  options: NodePoolsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NodePool>, NodePool> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        hcpOpenShiftClusterName,
        nodePoolName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-09-01-preview",
  }) as PollerLike<OperationState<NodePool>, NodePool>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  hcpOpenShiftClusterName: string,
  nodePoolName: string,
  resource: NodePool,
  options: NodePoolsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RedHatOpenShift/hcpOpenShiftClusters/{hcpOpenShiftClusterName}/nodePools/{nodePoolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      hcpOpenShiftClusterName: hcpOpenShiftClusterName,
      nodePoolName: nodePoolName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return nodePoolDeserializer(result.body);
}

/** Create a NodePool */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  hcpOpenShiftClusterName: string,
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
        hcpOpenShiftClusterName,
        nodePoolName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-09-01-preview",
  }) as PollerLike<OperationState<NodePool>, NodePool>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  hcpOpenShiftClusterName: string,
  nodePoolName: string,
  options: NodePoolsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RedHatOpenShift/hcpOpenShiftClusters/{hcpOpenShiftClusterName}/nodePools/{nodePoolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      hcpOpenShiftClusterName: hcpOpenShiftClusterName,
      nodePoolName: nodePoolName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<NodePool> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return nodePoolDeserializer(result.body);
}

/** Get a NodePool */
export async function get(
  context: Client,
  resourceGroupName: string,
  hcpOpenShiftClusterName: string,
  nodePoolName: string,
  options: NodePoolsGetOptionalParams = { requestOptions: {} },
): Promise<NodePool> {
  const result = await _getSend(
    context,
    resourceGroupName,
    hcpOpenShiftClusterName,
    nodePoolName,
    options,
  );
  return _getDeserialize(result);
}
