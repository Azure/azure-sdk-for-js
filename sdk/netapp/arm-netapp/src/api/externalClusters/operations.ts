// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext as Client } from "../index.js";
import type {
  ExternalCluster,
  ExternalClusterUpdate,
  _ExternalClusterList,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  externalClusterSerializer,
  externalClusterDeserializer,
  externalClusterUpdateSerializer,
  _externalClusterListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ExternalClustersListBySubscriptionOptionalParams,
  ExternalClustersListByResourceGroupOptionalParams,
  ExternalClustersDeleteOptionalParams,
  ExternalClustersUpdateOptionalParams,
  ExternalClustersCreateOrUpdateOptionalParams,
  ExternalClustersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySubscriptionSend(
  context: Client,
  options: ExternalClustersListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.NetApp/externalClusters{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-08-15-preview",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_ExternalClusterList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _externalClusterListDeserializer(result.body);
}

/** List all External Clusters in the subscription */
export function listBySubscription(
  context: Client,
  options: ExternalClustersListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ExternalCluster> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-08-15-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ExternalClustersListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/externalClusters{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-08-15-preview",
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
): Promise<_ExternalClusterList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _externalClusterListDeserializer(result.body);
}

/** List all External Clusters in the resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ExternalClustersListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ExternalCluster> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-08-15-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  externalClusterName: string,
  options: ExternalClustersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/externalClusters/{externalClusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      externalClusterName: externalClusterName,
      "api%2Dversion": context.apiVersion ?? "2026-08-15-preview",
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

/** Delete the specified External Cluster */
export function $delete(
  context: Client,
  resourceGroupName: string,
  externalClusterName: string,
  options: ExternalClustersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, externalClusterName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-08-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  externalClusterName: string,
  properties: ExternalClusterUpdate,
  options: ExternalClustersUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/externalClusters/{externalClusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      externalClusterName: externalClusterName,
      "api%2Dversion": context.apiVersion ?? "2026-08-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: externalClusterUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ExternalCluster> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return externalClusterDeserializer(result.body);
}

/** Patch the specified External Cluster */
export function update(
  context: Client,
  resourceGroupName: string,
  externalClusterName: string,
  properties: ExternalClusterUpdate,
  options: ExternalClustersUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ExternalCluster>, ExternalCluster> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, externalClusterName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-08-15-preview",
  }) as PollerLike<OperationState<ExternalCluster>, ExternalCluster>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  externalClusterName: string,
  resource: ExternalCluster,
  options: ExternalClustersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/externalClusters/{externalClusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      externalClusterName: externalClusterName,
      "api%2Dversion": context.apiVersion ?? "2026-08-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: externalClusterSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ExternalCluster> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return externalClusterDeserializer(result.body);
}

/** Create or update the specified External Cluster */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  externalClusterName: string,
  resource: ExternalCluster,
  options: ExternalClustersCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ExternalCluster>, ExternalCluster> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, externalClusterName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-08-15-preview",
  }) as PollerLike<OperationState<ExternalCluster>, ExternalCluster>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  externalClusterName: string,
  options: ExternalClustersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/externalClusters/{externalClusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      externalClusterName: externalClusterName,
      "api%2Dversion": context.apiVersion ?? "2026-08-15-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ExternalCluster> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return externalClusterDeserializer(result.body);
}

/** Get the External Cluster */
export async function get(
  context: Client,
  resourceGroupName: string,
  externalClusterName: string,
  options: ExternalClustersGetOptionalParams = { requestOptions: {} },
): Promise<ExternalCluster> {
  const result = await _getSend(context, resourceGroupName, externalClusterName, options);
  return _getDeserialize(result);
}
