// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AppContext as Client } from "../index.js";
import type {
  AgentConnector,
  _AgentConnectorListResult,
  AgentConnectorCollection,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  agentConnectorSerializer,
  agentConnectorDeserializer,
  _agentConnectorListResultDeserializer,
  agentConnectorCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AgentsConnectorsListWithSecretsByAgentOptionalParams,
  AgentsConnectorsListSecretsOptionalParams,
  AgentsConnectorsListByAgentOptionalParams,
  AgentsConnectorsDeleteOptionalParams,
  AgentsConnectorsCreateOrUpdateOptionalParams,
  AgentsConnectorsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listWithSecretsByAgentSend(
  context: Client,
  resourceGroupName: string,
  agentName: string,
  options: AgentsConnectorsListWithSecretsByAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/agents/{agentName}/listConnectorsWithSecrets{?api%2Dversion}",
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

export async function _listWithSecretsByAgentDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentConnectorCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentConnectorCollectionDeserializer(result.body);
}

/** List all Data Connectors with secrets from an Agent */
export async function listWithSecretsByAgent(
  context: Client,
  resourceGroupName: string,
  agentName: string,
  options: AgentsConnectorsListWithSecretsByAgentOptionalParams = { requestOptions: {} },
): Promise<AgentConnectorCollection> {
  const result = await _listWithSecretsByAgentSend(context, resourceGroupName, agentName, options);
  return _listWithSecretsByAgentDeserialize(result);
}

export function _listSecretsSend(
  context: Client,
  resourceGroupName: string,
  agentName: string,
  connectorName: string,
  options: AgentsConnectorsListSecretsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/agents/{agentName}/connectors/{connectorName}/listSecrets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      agentName: agentName,
      connectorName: connectorName,
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

export async function _listSecretsDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentConnector> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentConnectorDeserializer(result.body);
}

/** Get a Data Connector with secrets from an Agent */
export async function listSecrets(
  context: Client,
  resourceGroupName: string,
  agentName: string,
  connectorName: string,
  options: AgentsConnectorsListSecretsOptionalParams = { requestOptions: {} },
): Promise<AgentConnector> {
  const result = await _listSecretsSend(
    context,
    resourceGroupName,
    agentName,
    connectorName,
    options,
  );
  return _listSecretsDeserialize(result);
}

export function _listByAgentSend(
  context: Client,
  resourceGroupName: string,
  agentName: string,
  options: AgentsConnectorsListByAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/agents/{agentName}/connectors{?api%2Dversion}",
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

export async function _listByAgentDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentConnectorListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _agentConnectorListResultDeserializer(result.body);
}

/** Get all the connectors for an Agent */
export function listByAgent(
  context: Client,
  resourceGroupName: string,
  agentName: string,
  options: AgentsConnectorsListByAgentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AgentConnector> {
  return buildPagedAsyncIterator(
    context,
    () => _listByAgentSend(context, resourceGroupName, agentName, options),
    _listByAgentDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-01-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  agentName: string,
  connectorName: string,
  options: AgentsConnectorsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/agents/{agentName}/connectors/{connectorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      agentName: agentName,
      connectorName: connectorName,
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

/** Delete an Agent Connector */
export function $delete(
  context: Client,
  resourceGroupName: string,
  agentName: string,
  connectorName: string,
  options: AgentsConnectorsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, agentName, connectorName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  agentName: string,
  connectorName: string,
  resource: AgentConnector,
  options: AgentsConnectorsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/agents/{agentName}/connectors/{connectorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      agentName: agentName,
      connectorName: connectorName,
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
    body: agentConnectorSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentConnector> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentConnectorDeserializer(result.body);
}

/** Creates or updates an Agent Connector */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  agentName: string,
  connectorName: string,
  resource: AgentConnector,
  options: AgentsConnectorsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AgentConnector>, AgentConnector> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, agentName, connectorName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-01-01",
  }) as PollerLike<OperationState<AgentConnector>, AgentConnector>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  agentName: string,
  connectorName: string,
  options: AgentsConnectorsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/agents/{agentName}/connectors/{connectorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      agentName: agentName,
      connectorName: connectorName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AgentConnector> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentConnectorDeserializer(result.body);
}

/** Get the properties of an Agent Connector */
export async function get(
  context: Client,
  resourceGroupName: string,
  agentName: string,
  connectorName: string,
  options: AgentsConnectorsGetOptionalParams = { requestOptions: {} },
): Promise<AgentConnector> {
  const result = await _getSend(context, resourceGroupName, agentName, connectorName, options);
  return _getDeserialize(result);
}
