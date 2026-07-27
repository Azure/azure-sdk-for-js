// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  OperationStatusResult,
  operationStatusResultDeserializer,
  AgentPool,
  agentPoolSerializer,
  agentPoolDeserializer,
  agentPoolPatchParametersSerializer,
  _AgentPoolList,
  _agentPoolListDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  AgentPoolsListByKubernetesClusterOptionalParams,
  AgentPoolsDeleteOptionalParams,
  AgentPoolsUpdateOptionalParams,
  AgentPoolsCreateOrUpdateOptionalParams,
  AgentPoolsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listByKubernetesClusterSend(
  context: Client,
  resourceGroupName: string,
  kubernetesClusterName: string,
  options: AgentPoolsListByKubernetesClusterOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesClusters/{kubernetesClusterName}/agentPools{?api%2Dversion,%24top,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      kubernetesClusterName: kubernetesClusterName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
      "%24top": options?.top,
      "%24skipToken": options?.skipToken,
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

export async function _listByKubernetesClusterDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentPoolList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _agentPoolListDeserializer(result.body);
}

/** Get a list of agent pools for the provided Kubernetes cluster. */
export function listByKubernetesCluster(
  context: Client,
  resourceGroupName: string,
  kubernetesClusterName: string,
  options: AgentPoolsListByKubernetesClusterOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AgentPool> {
  return buildPagedAsyncIterator(
    context,
    () => _listByKubernetesClusterSend(context, resourceGroupName, kubernetesClusterName, options),
    _listByKubernetesClusterDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  kubernetesClusterName: string,
  agentPoolName: string,
  options: AgentPoolsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesClusters/{kubernetesClusterName}/agentPools/{agentPoolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      kubernetesClusterName: kubernetesClusterName,
      agentPoolName: agentPoolName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Delete the provided Kubernetes cluster agent pool. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  kubernetesClusterName: string,
  agentPoolName: string,
  options: AgentPoolsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, kubernetesClusterName, agentPoolName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  kubernetesClusterName: string,
  agentPoolName: string,
  options: AgentPoolsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesClusters/{kubernetesClusterName}/agentPools/{agentPoolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      kubernetesClusterName: kubernetesClusterName,
      agentPoolName: agentPoolName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: !options["agentPoolUpdateParameters"]
      ? options["agentPoolUpdateParameters"]
      : agentPoolPatchParametersSerializer(options["agentPoolUpdateParameters"]),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<AgentPool> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return agentPoolDeserializer(result.body);
}

/** Patch the properties of the provided Kubernetes cluster agent pool, or update the tags associated with the Kubernetes cluster agent pool. Properties and tag updates can be done independently. */
export function update(
  context: Client,
  resourceGroupName: string,
  kubernetesClusterName: string,
  agentPoolName: string,
  options: AgentPoolsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AgentPool>, AgentPool> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, kubernetesClusterName, agentPoolName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<AgentPool>, AgentPool>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  kubernetesClusterName: string,
  agentPoolName: string,
  agentPoolParameters: AgentPool,
  options: AgentPoolsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesClusters/{kubernetesClusterName}/agentPools/{agentPoolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      kubernetesClusterName: kubernetesClusterName,
      agentPoolName: agentPoolName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: agentPoolSerializer(agentPoolParameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentPool> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return agentPoolDeserializer(result.body);
}

/** Create a new Kubernetes cluster agent pool or update the properties of the existing one. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  kubernetesClusterName: string,
  agentPoolName: string,
  agentPoolParameters: AgentPool,
  options: AgentPoolsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AgentPool>, AgentPool> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        kubernetesClusterName,
        agentPoolName,
        agentPoolParameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<AgentPool>, AgentPool>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  kubernetesClusterName: string,
  agentPoolName: string,
  options: AgentPoolsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesClusters/{kubernetesClusterName}/agentPools/{agentPoolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      kubernetesClusterName: kubernetesClusterName,
      agentPoolName: agentPoolName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AgentPool> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return agentPoolDeserializer(result.body);
}

/** Get properties of the provided Kubernetes cluster agent pool. */
export async function get(
  context: Client,
  resourceGroupName: string,
  kubernetesClusterName: string,
  agentPoolName: string,
  options: AgentPoolsGetOptionalParams = { requestOptions: {} },
): Promise<AgentPool> {
  const result = await _getSend(
    context,
    resourceGroupName,
    kubernetesClusterName,
    agentPoolName,
    options,
  );
  return _getDeserialize(result);
}
