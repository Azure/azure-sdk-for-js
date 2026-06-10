// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConnectedKubernetesContext as Client } from "../index.js";
import type {
  ConnectedCluster,
  ConnectedClusterPatch,
  _ConnectedClusterList,
  ListClusterUserCredentialProperties,
  CredentialResults,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  connectedClusterSerializer,
  connectedClusterDeserializer,
  connectedClusterPatchSerializer,
  _connectedClusterListDeserializer,
  listClusterUserCredentialPropertiesSerializer,
  credentialResultsDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ConnectedClusterListClusterUserCredentialOptionalParams,
  ConnectedClusterListBySubscriptionOptionalParams,
  ConnectedClusterListByResourceGroupOptionalParams,
  ConnectedClusterDeleteOptionalParams,
  ConnectedClusterUpdateAsyncOptionalParams,
  ConnectedClusterCreateOrReplaceOptionalParams,
  ConnectedClusterGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listClusterUserCredentialSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  properties: ListClusterUserCredentialProperties,
  options: ConnectedClusterListClusterUserCredentialOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kubernetes/connectedClusters/{clusterName}/listClusterUserCredential{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: listClusterUserCredentialPropertiesSerializer(properties),
  });
}

export async function _listClusterUserCredentialDeserialize(
  result: PathUncheckedResponse,
): Promise<CredentialResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return credentialResultsDeserializer(result.body);
}

/** Gets cluster user credentials of the connected cluster with a specified resource group and name. */
export async function listClusterUserCredential(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  properties: ListClusterUserCredentialProperties,
  options: ConnectedClusterListClusterUserCredentialOptionalParams = { requestOptions: {} },
): Promise<CredentialResults> {
  const result = await _listClusterUserCredentialSend(
    context,
    resourceGroupName,
    clusterName,
    properties,
    options,
  );
  return _listClusterUserCredentialDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: ConnectedClusterListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Kubernetes/connectedClusters{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-05-01",
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
): Promise<_ConnectedClusterList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _connectedClusterListDeserializer(result.body);
}

/** API to enumerate registered connected K8s clusters under a Subscription */
export function listBySubscription(
  context: Client,
  options: ConnectedClusterListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ConnectedCluster> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-05-01" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ConnectedClusterListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kubernetes/connectedClusters{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01",
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
): Promise<_ConnectedClusterList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _connectedClusterListDeserializer(result.body);
}

/** API to enumerate registered connected K8s clusters under a Resource Group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ConnectedClusterListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ConnectedCluster> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ConnectedClusterDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kubernetes/connectedClusters/{clusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a connected cluster, removing the tracked resource in Azure Resource Manager (ARM). */
export function $delete(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ConnectedClusterDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, clusterName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateAsyncSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  connectedClusterPatch: ConnectedClusterPatch,
  options: ConnectedClusterUpdateAsyncOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kubernetes/connectedClusters/{clusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: connectedClusterPatchSerializer(connectedClusterPatch),
  });
}

export async function _updateAsyncDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectedCluster> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return connectedClusterDeserializer(result.body);
}

/** API to update certain properties of the connected cluster resource */
export function updateAsync(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  connectedClusterPatch: ConnectedClusterPatch,
  options: ConnectedClusterUpdateAsyncOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ConnectedCluster>, ConnectedCluster> {
  return getLongRunningPoller(context, _updateAsyncDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateAsyncSend(context, resourceGroupName, clusterName, connectedClusterPatch, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01",
  }) as PollerLike<OperationState<ConnectedCluster>, ConnectedCluster>;
}

export function _createOrReplaceSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  connectedCluster: ConnectedCluster,
  options: ConnectedClusterCreateOrReplaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kubernetes/connectedClusters/{clusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: connectedClusterSerializer(connectedCluster),
  });
}

export async function _createOrReplaceDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectedCluster> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return connectedClusterDeserializer(result.body);
}

/** API to register a new Kubernetes cluster and create or replace a connected cluster tracked resource in Azure Resource Manager (ARM). */
export function createOrReplace(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  connectedCluster: ConnectedCluster,
  options: ConnectedClusterCreateOrReplaceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ConnectedCluster>, ConnectedCluster> {
  return getLongRunningPoller(context, _createOrReplaceDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrReplaceSend(context, resourceGroupName, clusterName, connectedCluster, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-05-01",
  }) as PollerLike<OperationState<ConnectedCluster>, ConnectedCluster>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ConnectedClusterGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kubernetes/connectedClusters/{clusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ConnectedCluster> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return connectedClusterDeserializer(result.body);
}

/** Returns the properties of the specified connected cluster, including name, identity, properties, and additional cluster details. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ConnectedClusterGetOptionalParams = { requestOptions: {} },
): Promise<ConnectedCluster> {
  const result = await _getSend(context, resourceGroupName, clusterName, options);
  return _getDeserialize(result);
}
