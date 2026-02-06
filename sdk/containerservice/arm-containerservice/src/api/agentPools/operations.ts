// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext as Client } from "../index.js";
import type {
  AgentPool,
  _AgentPoolListResult,
  AgentPoolDeleteMachinesParameter,
  AgentPoolAvailableVersions,
  AgentPoolUpgradeProfile,
} from "../../models/models.js";
import {
  agentPoolSerializer,
  agentPoolDeserializer,
  errorResponseDeserializer,
  _agentPoolListResultDeserializer,
  agentPoolDeleteMachinesParameterSerializer,
  agentPoolAvailableVersionsDeserializer,
  agentPoolUpgradeProfileDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AgentPoolsGetUpgradeProfileOptionalParams,
  AgentPoolsGetAvailableAgentPoolVersionsOptionalParams,
  AgentPoolsUpgradeNodeImageVersionOptionalParams,
  AgentPoolsDeleteMachinesOptionalParams,
  AgentPoolsCompleteUpgradeOptionalParams,
  AgentPoolsAbortLatestOperationOptionalParams,
  AgentPoolsListOptionalParams,
  AgentPoolsDeleteOptionalParams,
  AgentPoolsCreateOrUpdateOptionalParams,
  AgentPoolsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getUpgradeProfileSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  agentPoolName: string,
  options: AgentPoolsGetUpgradeProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}/upgradeProfiles/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      agentPoolName: agentPoolName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _getUpgradeProfileDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentPoolUpgradeProfile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return agentPoolUpgradeProfileDeserializer(result.body);
}

/** Gets the upgrade profile for an agent pool. */
export async function getUpgradeProfile(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  agentPoolName: string,
  options: AgentPoolsGetUpgradeProfileOptionalParams = { requestOptions: {} },
): Promise<AgentPoolUpgradeProfile> {
  const result = await _getUpgradeProfileSend(
    context,
    resourceGroupName,
    resourceName,
    agentPoolName,
    options,
  );
  return _getUpgradeProfileDeserialize(result);
}

export function _getAvailableAgentPoolVersionsSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: AgentPoolsGetAvailableAgentPoolVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/availableAgentPoolVersions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _getAvailableAgentPoolVersionsDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentPoolAvailableVersions> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return agentPoolAvailableVersionsDeserializer(result.body);
}

/** See [supported Kubernetes versions](https://docs.microsoft.com/azure/aks/supported-kubernetes-versions) for more details about the version lifecycle. */
export async function getAvailableAgentPoolVersions(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: AgentPoolsGetAvailableAgentPoolVersionsOptionalParams = { requestOptions: {} },
): Promise<AgentPoolAvailableVersions> {
  const result = await _getAvailableAgentPoolVersionsSend(
    context,
    resourceGroupName,
    resourceName,
    options,
  );
  return _getAvailableAgentPoolVersionsDeserialize(result);
}

export function _upgradeNodeImageVersionSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  agentPoolName: string,
  options: AgentPoolsUpgradeNodeImageVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}/upgradeNodeImageVersion{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      agentPoolName: agentPoolName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _upgradeNodeImageVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Upgrading the node image version of an agent pool applies the newest OS and runtime updates to the nodes. AKS provides one new image per week with the latest updates. For more details on node image versions, see: https://docs.microsoft.com/azure/aks/node-image-upgrade */
export function upgradeNodeImageVersion(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  agentPoolName: string,
  options: AgentPoolsUpgradeNodeImageVersionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _upgradeNodeImageVersionDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _upgradeNodeImageVersionSend(
        context,
        resourceGroupName,
        resourceName,
        agentPoolName,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _deleteMachinesSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  agentPoolName: string,
  machines: AgentPoolDeleteMachinesParameter,
  options: AgentPoolsDeleteMachinesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}/deleteMachines{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      agentPoolName: agentPoolName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: agentPoolDeleteMachinesParameterSerializer(machines),
  });
}

export async function _deleteMachinesDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes specific machines in an agent pool. */
export function deleteMachines(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  agentPoolName: string,
  machines: AgentPoolDeleteMachinesParameter,
  options: AgentPoolsDeleteMachinesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteMachinesDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteMachinesSend(
        context,
        resourceGroupName,
        resourceName,
        agentPoolName,
        machines,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _completeUpgradeSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  agentPoolName: string,
  options: AgentPoolsCompleteUpgradeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}/completeUpgrade{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      agentPoolName: agentPoolName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _completeUpgradeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Completes the upgrade operation for the specified agent pool. */
export function completeUpgrade(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  agentPoolName: string,
  options: AgentPoolsCompleteUpgradeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _completeUpgradeDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _completeUpgradeSend(context, resourceGroupName, resourceName, agentPoolName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _abortLatestOperationSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  agentPoolName: string,
  options: AgentPoolsAbortLatestOperationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}/abort{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      agentPoolName: agentPoolName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _abortLatestOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Aborts the currently running operation on the agent pool. The Agent Pool will be moved to a Canceling state and eventually to a Canceled state when cancellation finishes. If the operation completes before cancellation can take place, a 409 error code is returned. */
export function abortLatestOperation(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  agentPoolName: string,
  options: AgentPoolsAbortLatestOperationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _abortLatestOperationDeserialize,
    ["202", "204", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _abortLatestOperationSend(context, resourceGroupName, resourceName, agentPoolName, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-10-02-preview",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: AgentPoolsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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
): Promise<_AgentPoolListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _agentPoolListResultDeserializer(result.body);
}

/** Gets a list of agent pools in the specified managed cluster. */
export function list(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: AgentPoolsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AgentPool> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, resourceName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-10-02-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  agentPoolName: string,
  options: AgentPoolsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}{?api%2Dversion,ignore%2Dpod%2Ddisruption%2Dbudget}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      agentPoolName: agentPoolName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
      "ignore%2Dpod%2Ddisruption%2Dbudget": options?.ignorePodDisruptionBudget,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
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

/** Deletes an agent pool in the specified managed cluster. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  agentPoolName: string,
  options: AgentPoolsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, resourceName, agentPoolName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  agentPoolName: string,
  parameters: AgentPool,
  options: AgentPoolsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      agentPoolName: agentPoolName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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
    body: agentPoolSerializer(parameters),
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

/** Creates or updates an agent pool in the specified managed cluster. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  agentPoolName: string,
  parameters: AgentPool,
  options: AgentPoolsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AgentPool>, AgentPool> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        resourceName,
        agentPoolName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<AgentPool>, AgentPool>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  agentPoolName: string,
  options: AgentPoolsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      agentPoolName: agentPoolName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

/** Gets the specified managed cluster agent pool. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  agentPoolName: string,
  options: AgentPoolsGetOptionalParams = { requestOptions: {} },
): Promise<AgentPool> {
  const result = await _getSend(context, resourceGroupName, resourceName, agentPoolName, options);
  return _getDeserialize(result);
}
