// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../index.js";
import {
  AgentObject,
  agentObjectDeserializer,
  AgentVersionObject,
  agentVersionObjectDeserializer,
  agentDefinitionUnionSerializer,
  AgentDefinitionUnion,
  apiErrorResponseDeserializer,
  DeleteAgentResponse,
  deleteAgentResponseDeserializer,
  _AgentsPagedResultAgentObject,
  _agentsPagedResultAgentObjectDeserializer,
  DeleteAgentVersionResponse,
  deleteAgentVersionResponseDeserializer,
  _AgentsPagedResultAgentVersionObject,
  _agentsPagedResultAgentVersionObjectDeserializer,
  AgentContainerOperationObject,
  agentContainerOperationObjectDeserializer,
  AgentContainerObject,
  agentContainerObjectDeserializer,
  _AgentsPagedResultAgentContainerOperationObject,
  _agentsPagedResultAgentContainerOperationObjectDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  AgentsListAgentVersionContainerOperationsOptionalParams,
  AgentsListAgentContainerOperationsOptionalParams,
  AgentsGetAgentContainerOperationOptionalParams,
  AgentsGetAgentContainerOptionalParams,
  AgentsDeleteAgentContainerOptionalParams,
  AgentsStopAgentContainerOptionalParams,
  AgentsUpdateAgentContainerOptionalParams,
  AgentsStartAgentContainerOptionalParams,
  AgentsListAgentVersionsOptionalParams,
  AgentsDeleteAgentVersionOptionalParams,
  AgentsGetAgentVersionOptionalParams,
  AgentsCreateAgentVersionFromManifestOptionalParams,
  AgentsCreateAgentVersionOptionalParams,
  AgentsListAgentsOptionalParams,
  AgentsDeleteAgentOptionalParams,
  AgentsUpdateAgentFromManifestOptionalParams,
  AgentsCreateAgentFromManifestOptionalParams,
  AgentsUpdateAgentOptionalParams,
  AgentsCreateAgentOptionalParams,
  AgentsGetAgentOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listAgentVersionContainerOperationsSend(
  context: Client,
  agent_name: string,
  agent_version: string,
  options: AgentsListAgentVersionContainerOperationsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/versions/{agent_version}/containers/default/operations{?api-version,limit,order,after,before}",
    {
      agent_name: agent_name,
      agent_version: agent_version,
      "api-version": context.apiVersion,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
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

export async function _listAgentVersionContainerOperationsDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultAgentContainerOperationObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  return _agentsPagedResultAgentContainerOperationObjectDeserializer(result.body);
}

/** List container operations for a specific version of an agent. */
export function listAgentVersionContainerOperations(
  context: Client,
  agent_name: string,
  agent_version: string,
  options: AgentsListAgentVersionContainerOperationsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<AgentContainerOperationObject> {
  return buildPagedAsyncIterator(
    context,
    () => _listAgentVersionContainerOperationsSend(context, agent_name, agent_version, options),
    _listAgentVersionContainerOperationsDeserialize,
    ["200"],
    { itemName: "data" },
  );
}

export function _listAgentContainerOperationsSend(
  context: Client,
  agent_name: string,
  options: AgentsListAgentContainerOperationsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/operations{?api-version,limit,order,after,before}",
    {
      agent_name: agent_name,
      "api-version": context.apiVersion,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
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

export async function _listAgentContainerOperationsDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultAgentContainerOperationObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  return _agentsPagedResultAgentContainerOperationObjectDeserializer(result.body);
}

/** List container operations for an agent. */
export function listAgentContainerOperations(
  context: Client,
  agent_name: string,
  options: AgentsListAgentContainerOperationsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<AgentContainerOperationObject> {
  return buildPagedAsyncIterator(
    context,
    () => _listAgentContainerOperationsSend(context, agent_name, options),
    _listAgentContainerOperationsDeserialize,
    ["200"],
    { itemName: "data" },
  );
}

export function _getAgentContainerOperationSend(
  context: Client,
  agent_name: string,
  operation_id: string,
  options: AgentsGetAgentContainerOperationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/operations/{operation_id}{?api-version}",
    {
      agent_name: agent_name,
      operation_id: operation_id,
      "api-version": context.apiVersion,
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

export async function _getAgentContainerOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentContainerOperationObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  return agentContainerOperationObjectDeserializer(result.body);
}

/** Get the status of a container operation for an agent. */
export async function getAgentContainerOperation(
  context: Client,
  agent_name: string,
  operation_id: string,
  options: AgentsGetAgentContainerOperationOptionalParams = {
    requestOptions: {},
  },
): Promise<AgentContainerOperationObject> {
  const result = await _getAgentContainerOperationSend(context, agent_name, operation_id, options);
  return _getAgentContainerOperationDeserialize(result);
}

export function _getAgentContainerSend(
  context: Client,
  agent_name: string,
  agent_version: string,
  options: AgentsGetAgentContainerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/versions/{agent_version}/containers/default{?api-version}",
    {
      agent_name: agent_name,
      agent_version: agent_version,
      "api-version": context.apiVersion,
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

export async function _getAgentContainerDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentContainerObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  return agentContainerObjectDeserializer(result.body);
}

/** Get a container for a specific version of an agent. */
export async function getAgentContainer(
  context: Client,
  agent_name: string,
  agent_version: string,
  options: AgentsGetAgentContainerOptionalParams = { requestOptions: {} },
): Promise<AgentContainerObject> {
  const result = await _getAgentContainerSend(context, agent_name, agent_version, options);
  return _getAgentContainerDeserialize(result);
}

export function _deleteAgentContainerSend(
  context: Client,
  agent_name: string,
  agent_version: string,
  options: AgentsDeleteAgentContainerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/versions/{agent_version}/containers/default:delete{?api-version}",
    {
      agent_name: agent_name,
      agent_version: agent_version,
      "api-version": context.apiVersion,
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

export async function _deleteAgentContainerDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentContainerOperationObject> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  return agentContainerOperationObjectDeserializer(result.body);
}

/**
 * Delete a container for a specific version of an agent. If the container doesn't exist, the operation will be no-op.
 * The operation is a long-running operation. Following the design guidelines for long-running operations in Azure REST APIs.
 * https://github.com/microsoft/api-guidelines/blob/vNext/azure/ConsiderationsForServiceDesign.md#action-operations
 */
export async function deleteAgentContainer(
  context: Client,
  agent_name: string,
  agent_version: string,
  options: AgentsDeleteAgentContainerOptionalParams = { requestOptions: {} },
): Promise<AgentContainerOperationObject> {
  const result = await _deleteAgentContainerSend(context, agent_name, agent_version, options);
  return _deleteAgentContainerDeserialize(result);
}

export function _stopAgentContainerSend(
  context: Client,
  agent_name: string,
  agent_version: string,
  options: AgentsStopAgentContainerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/versions/{agent_version}/containers/default:stop{?api-version}",
    {
      agent_name: agent_name,
      agent_version: agent_version,
      "api-version": context.apiVersion,
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

export async function _stopAgentContainerDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentContainerOperationObject> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  return agentContainerOperationObjectDeserializer(result.body);
}

/**
 * Stop a container for a specific version of an agent. If the container is not running, or already stopped, the operation will be no-op.
 * The operation is a long-running operation. Following the design guidelines for long-running operations in Azure REST APIs.
 * https://github.com/microsoft/api-guidelines/blob/vNext/azure/ConsiderationsForServiceDesign.md#action-operations
 */
export async function stopAgentContainer(
  context: Client,
  agent_name: string,
  agent_version: string,
  options: AgentsStopAgentContainerOptionalParams = { requestOptions: {} },
): Promise<AgentContainerOperationObject> {
  const result = await _stopAgentContainerSend(context, agent_name, agent_version, options);
  return _stopAgentContainerDeserialize(result);
}

export function _updateAgentContainerSend(
  context: Client,
  agent_name: string,
  agent_version: string,
  options: AgentsUpdateAgentContainerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/versions/{agent_version}/containers/default:update{?api-version}",
    {
      agent_name: agent_name,
      agent_version: agent_version,
      "api-version": context.apiVersion,
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
    body: {
      min_replicas: options?.min_replicas,
      max_replicas: options?.max_replicas,
    },
  });
}

export async function _updateAgentContainerDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentContainerOperationObject> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  return agentContainerOperationObjectDeserializer(result.body);
}

/**
 * Update a container for a specific version of an agent. If the container is not running, the operation will be no-op.
 * The operation is a long-running operation. Following the design guidelines for long-running operations in Azure REST APIs.
 * https://github.com/microsoft/api-guidelines/blob/vNext/azure/ConsiderationsForServiceDesign.md#action-operations
 */
export async function updateAgentContainer(
  context: Client,
  agent_name: string,
  agent_version: string,
  options: AgentsUpdateAgentContainerOptionalParams = { requestOptions: {} },
): Promise<AgentContainerOperationObject> {
  const result = await _updateAgentContainerSend(context, agent_name, agent_version, options);
  return _updateAgentContainerDeserialize(result);
}

export function _startAgentContainerSend(
  context: Client,
  agent_name: string,
  agent_version: string,
  options: AgentsStartAgentContainerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/versions/{agent_version}/containers/default:start{?api-version}",
    {
      agent_name: agent_name,
      agent_version: agent_version,
      "api-version": context.apiVersion,
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
    body: {
      min_replicas: options?.min_replicas,
      max_replicas: options?.max_replicas,
    },
  });
}

export async function _startAgentContainerDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentContainerOperationObject> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  return agentContainerOperationObjectDeserializer(result.body);
}

/**
 * Start a container for a specific version of an agent. If the container is already running, the operation will be no-op.
 * The operation is a long-running operation. Following the design guidelines for long-running operations in Azure REST APIs.
 * https://github.com/microsoft/api-guidelines/blob/vNext/azure/ConsiderationsForServiceDesign.md#action-operations
 */
export async function startAgentContainer(
  context: Client,
  agent_name: string,
  agent_version: string,
  options: AgentsStartAgentContainerOptionalParams = { requestOptions: {} },
): Promise<AgentContainerOperationObject> {
  const result = await _startAgentContainerSend(context, agent_name, agent_version, options);
  return _startAgentContainerDeserialize(result);
}

export function _listAgentVersionsSend(
  context: Client,
  agent_name: string,
  options: AgentsListAgentVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/versions{?api-version,limit,order,after,before}",
    {
      agent_name: agent_name,
      "api-version": context.apiVersion,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
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

export async function _listAgentVersionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultAgentVersionObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  return _agentsPagedResultAgentVersionObjectDeserializer(result.body);
}

/** Returns the list of versions of an agent. */
export function listAgentVersions(
  context: Client,
  agent_name: string,
  options: AgentsListAgentVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AgentVersionObject> {
  return buildPagedAsyncIterator(
    context,
    () => _listAgentVersionsSend(context, agent_name, options),
    _listAgentVersionsDeserialize,
    ["200"],
    { itemName: "data" },
  );
}

export function _deleteAgentVersionSend(
  context: Client,
  agent_name: string,
  agent_version: string,
  options: AgentsDeleteAgentVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/versions/{agent_version}{?api-version}",
    {
      agent_name: agent_name,
      agent_version: agent_version,
      "api-version": context.apiVersion,
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

export async function _deleteAgentVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<DeleteAgentVersionResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  return deleteAgentVersionResponseDeserializer(result.body);
}

/** Deletes a specific version of an agent. */
export async function deleteAgentVersion(
  context: Client,
  agent_name: string,
  agent_version: string,
  options: AgentsDeleteAgentVersionOptionalParams = { requestOptions: {} },
): Promise<DeleteAgentVersionResponse> {
  const result = await _deleteAgentVersionSend(context, agent_name, agent_version, options);
  return _deleteAgentVersionDeserialize(result);
}

export function _getAgentVersionSend(
  context: Client,
  agent_name: string,
  agent_version: string,
  options: AgentsGetAgentVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/versions/{agent_version}{?api-version}",
    {
      agent_name: agent_name,
      agent_version: agent_version,
      "api-version": context.apiVersion,
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

export async function _getAgentVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentVersionObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  return agentVersionObjectDeserializer(result.body);
}

/** Retrieves a specific version of an agent. */
export async function getAgentVersion(
  context: Client,
  agent_name: string,
  agent_version: string,
  options: AgentsGetAgentVersionOptionalParams = { requestOptions: {} },
): Promise<AgentVersionObject> {
  const result = await _getAgentVersionSend(context, agent_name, agent_version, options);
  return _getAgentVersionDeserialize(result);
}

export function _createAgentVersionFromManifestSend(
  context: Client,
  agent_name: string,
  manifest_id: string,
  parameter_values: Record<string, any>,
  options: AgentsCreateAgentVersionFromManifestOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/versions:import{?api-version}",
    {
      agent_name: agent_name,
      "api-version": context.apiVersion,
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
    body: {
      metadata: options?.metadata,
      description: options?.description,
      manifest_id: manifest_id,
      parameter_values: parameter_values,
    },
  });
}

export async function _createAgentVersionFromManifestDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentVersionObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  return agentVersionObjectDeserializer(result.body);
}

/** Create a new agent version from a manifest. */
export async function createAgentVersionFromManifest(
  context: Client,
  agent_name: string,
  manifestId: string,
  parameterValues: Record<string, any>,
  options: AgentsCreateAgentVersionFromManifestOptionalParams = {
    requestOptions: {},
  },
): Promise<AgentVersionObject> {
  const result = await _createAgentVersionFromManifestSend(
    context,
    agent_name,
    manifestId,
    parameterValues,
    options,
  );
  return _createAgentVersionFromManifestDeserialize(result);
}

export function _createAgentVersionSend(
  context: Client,
  agent_name: string,
  definition: AgentDefinitionUnion,
  options: AgentsCreateAgentVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/versions{?api-version}",
    {
      agent_name: agent_name,
      "api-version": context.apiVersion,
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
    body: {
      metadata: options?.metadata,
      description: options?.description,
      definition: agentDefinitionUnionSerializer(definition),
    },
  });
}

export async function _createAgentVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentVersionObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  return agentVersionObjectDeserializer(result.body);
}

/** Create a new agent version. */
export async function createAgentVersion(
  context: Client,
  agent_name: string,
  definition: AgentDefinitionUnion,
  options: AgentsCreateAgentVersionOptionalParams = { requestOptions: {} },
): Promise<AgentVersionObject> {
  const result = await _createAgentVersionSend(context, agent_name, definition, options);
  return _createAgentVersionDeserialize(result);
}

export function _listAgentsSend(
  context: Client,
  options: AgentsListAgentsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents{?api-version,kind,limit,order,after,before}",
    {
      "api-version": context.apiVersion,
      kind: options?.kind,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
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

export async function _listAgentsDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultAgentObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  return _agentsPagedResultAgentObjectDeserializer(result.body);
}

/** Returns the list of all agents. */
export function listAgents(
  context: Client,
  options: AgentsListAgentsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AgentObject> {
  return buildPagedAsyncIterator(
    context,
    () => _listAgentsSend(context, options),
    _listAgentsDeserialize,
    ["200"],
    { itemName: "data" },
  );
}

export function _deleteAgentSend(
  context: Client,
  agent_name: string,
  options: AgentsDeleteAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}{?api-version}",
    {
      agent_name: agent_name,
      "api-version": context.apiVersion,
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

export async function _deleteAgentDeserialize(
  result: PathUncheckedResponse,
): Promise<DeleteAgentResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  return deleteAgentResponseDeserializer(result.body);
}

/** Deletes an agent. */
export async function deleteAgent(
  context: Client,
  agent_name: string,
  options: AgentsDeleteAgentOptionalParams = { requestOptions: {} },
): Promise<DeleteAgentResponse> {
  const result = await _deleteAgentSend(context, agent_name, options);
  return _deleteAgentDeserialize(result);
}

export function _updateAgentFromManifestSend(
  context: Client,
  agent_name: string,
  manifest_id: string,
  parameter_values: Record<string, any>,
  options: AgentsUpdateAgentFromManifestOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/import{?api-version}",
    {
      agent_name: agent_name,
      "api-version": context.apiVersion,
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
    body: {
      metadata: options?.metadata,
      description: options?.description,
      manifest_id: manifest_id,
      parameter_values: parameter_values,
    },
  });
}

export async function _updateAgentFromManifestDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  return agentObjectDeserializer(result.body);
}

/**
 * Updates the agent from a manifest by adding a new version if there are any changes to the agent definition.
 * If no changes, returns the existing agent version.
 */
export async function updateAgentFromManifest(
  context: Client,
  agent_name: string,
  manifestId: string,
  parameterValues: Record<string, any>,
  options: AgentsUpdateAgentFromManifestOptionalParams = { requestOptions: {} },
): Promise<AgentObject> {
  const result = await _updateAgentFromManifestSend(
    context,
    agent_name,
    manifestId,
    parameterValues,
    options,
  );
  return _updateAgentFromManifestDeserialize(result);
}

export function _createAgentFromManifestSend(
  context: Client,
  name: string,
  manifest_id: string,
  parameter_values: Record<string, any>,
  options: AgentsCreateAgentFromManifestOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents:import{?api-version}",
    {
      "api-version": context.apiVersion,
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
    body: {
      name: name,
      metadata: options?.metadata,
      description: options?.description,
      manifest_id: manifest_id,
      parameter_values: parameter_values,
    },
  });
}

export async function _createAgentFromManifestDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  return agentObjectDeserializer(result.body);
}

/** Creates an agent from a manifest. */
export async function createAgentFromManifest(
  context: Client,
  name: string,
  manifestId: string,
  parameterValues: Record<string, any>,
  options: AgentsCreateAgentFromManifestOptionalParams = { requestOptions: {} },
): Promise<AgentObject> {
  const result = await _createAgentFromManifestSend(
    context,
    name,
    manifestId,
    parameterValues,
    options,
  );
  return _createAgentFromManifestDeserialize(result);
}

export function _updateAgentSend(
  context: Client,
  agent_name: string,
  definition: AgentDefinitionUnion,
  options: AgentsUpdateAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}{?api-version}",
    {
      agent_name: agent_name,
      "api-version": context.apiVersion,
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
    body: {
      metadata: options?.metadata,
      description: options?.description,
      definition: agentDefinitionUnionSerializer(definition),
    },
  });
}

export async function _updateAgentDeserialize(result: PathUncheckedResponse): Promise<AgentObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  return agentObjectDeserializer(result.body);
}

/**
 * Updates the agent by adding a new version if there are any changes to the agent definition.
 * If no changes, returns the existing agent version.
 */
export async function updateAgent(
  context: Client,
  agent_name: string,
  definition: AgentDefinitionUnion,
  options: AgentsUpdateAgentOptionalParams = { requestOptions: {} },
): Promise<AgentObject> {
  const result = await _updateAgentSend(context, agent_name, definition, options);
  return _updateAgentDeserialize(result);
}

export function _createAgentSend(
  context: Client,
  name: string,
  definition: AgentDefinitionUnion,
  options: AgentsCreateAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents{?api-version}",
    {
      "api-version": context.apiVersion,
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
    body: {
      name: name,
      metadata: options?.metadata,
      description: options?.description,
      definition: agentDefinitionUnionSerializer(definition),
    },
  });
}

export async function _createAgentDeserialize(result: PathUncheckedResponse): Promise<AgentObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  return agentObjectDeserializer(result.body);
}

/** Creates the agent. */
export async function createAgent(
  context: Client,
  name: string,
  definition: AgentDefinitionUnion,
  options: AgentsCreateAgentOptionalParams = { requestOptions: {} },
): Promise<AgentObject> {
  const result = await _createAgentSend(context, name, definition, options);
  return _createAgentDeserialize(result);
}

export function _getAgentSend(
  context: Client,
  agent_name: string,
  options: AgentsGetAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}{?api-version}",
    {
      agent_name: agent_name,
      "api-version": context.apiVersion,
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

export async function _getAgentDeserialize(result: PathUncheckedResponse): Promise<AgentObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  return agentObjectDeserializer(result.body);
}

/** Retrieves the agent. */
export async function getAgent(
  context: Client,
  agent_name: string,
  options: AgentsGetAgentOptionalParams = { requestOptions: {} },
): Promise<AgentObject> {
  const result = await _getAgentSend(context, agent_name, options);
  return _getAgentDeserialize(result);
}
