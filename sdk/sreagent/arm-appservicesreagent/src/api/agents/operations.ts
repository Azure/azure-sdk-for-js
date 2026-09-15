// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AppContext as Client } from "../index.js";
import type { Agent, AgentPatch, _AgentListResult } from "../../models/models.js";
import {
  agentSerializer,
  agentDeserializer,
  errorResponseDeserializer,
  agentPatchSerializer,
  _agentListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AgentsStopOptionalParams,
  AgentsStartOptionalParams,
  AgentsListBySubscriptionOptionalParams,
  AgentsListByResourceGroupOptionalParams,
  AgentsDeleteOptionalParams,
  AgentsUpdateOptionalParams,
  AgentsCreateOrUpdateOptionalParams,
  AgentsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _stopSend(
  context: Client,
  resourceGroupName: string,
  agentName: string,
  options: AgentsStopOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/agents/{agentName}/stop{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      agentName: agentName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01",
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

export async function _stopDeserialize(result: PathUncheckedResponse): Promise<Agent> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentDeserializer(result.body);
}

/** Stop an Agent */
export function stop(
  context: Client,
  resourceGroupName: string,
  agentName: string,
  options: AgentsStopOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Agent>, Agent> {
  return getLongRunningPoller(context, _stopDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _stopSend(context, resourceGroupName, agentName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-01",
  }) as PollerLike<OperationState<Agent>, Agent>;
}

export function _startSend(
  context: Client,
  resourceGroupName: string,
  agentName: string,
  options: AgentsStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/agents/{agentName}/start{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      agentName: agentName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01",
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

export async function _startDeserialize(result: PathUncheckedResponse): Promise<Agent> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentDeserializer(result.body);
}

/** Start an Agent */
export function start(
  context: Client,
  resourceGroupName: string,
  agentName: string,
  options: AgentsStartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Agent>, Agent> {
  return getLongRunningPoller(context, _startDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _startSend(context, resourceGroupName, agentName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-01",
  }) as PollerLike<OperationState<Agent>, Agent>;
}

export function _listBySubscriptionSend(
  context: Client,
  options: AgentsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.App/agents{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-01-01",
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
): Promise<_AgentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _agentListResultDeserializer(result.body);
}

/** Get all agents for a subscription */
export function listBySubscription(
  context: Client,
  options: AgentsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Agent> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-01-01" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: AgentsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/agents{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01",
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
): Promise<_AgentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _agentListResultDeserializer(result.body);
}

/** Get all the agents in a resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: AgentsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Agent> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-01-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  agentName: string,
  options: AgentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/agents/{agentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      agentName: agentName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01",
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

/** Delete an Agent */
export function $delete(
  context: Client,
  resourceGroupName: string,
  agentName: string,
  options: AgentsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, agentName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  agentName: string,
  properties: AgentPatch,
  options: AgentsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/agents/{agentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      agentName: agentName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: agentPatchSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Agent> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentDeserializer(result.body);
}

/** Update Agent's properties */
export function update(
  context: Client,
  resourceGroupName: string,
  agentName: string,
  properties: AgentPatch,
  options: AgentsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Agent>, Agent> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, agentName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-01",
  }) as PollerLike<OperationState<Agent>, Agent>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  agentName: string,
  resource: Agent,
  options: AgentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/agents/{agentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      agentName: agentName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: agentSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Agent> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentDeserializer(result.body);
}

/** Creates or updates an Agent */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  agentName: string,
  resource: Agent,
  options: AgentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Agent>, Agent> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, agentName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-01-01",
  }) as PollerLike<OperationState<Agent>, Agent>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  agentName: string,
  options: AgentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/agents/{agentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      agentName: agentName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Agent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentDeserializer(result.body);
}

/** Get the properties of an Agent */
export async function get(
  context: Client,
  resourceGroupName: string,
  agentName: string,
  options: AgentsGetOptionalParams = { requestOptions: {} },
): Promise<Agent> {
  const result = await _getSend(context, resourceGroupName, agentName, options);
  return _getDeserialize(result);
}
