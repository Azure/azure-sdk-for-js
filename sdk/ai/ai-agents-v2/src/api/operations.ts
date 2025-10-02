// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgentsContext as Client } from "./index.js";
import {
  AgentObject,
  agentObjectDeserializer,
  AgentVersionObject,
  agentVersionObjectDeserializer,
  agentDefinitionUnionSerializer,
  AgentDefinitionUnion,
  apiErrorDeserializer,
  DeleteAgentResponse,
  deleteAgentResponseDeserializer,
  _AgentsPagedResultAgentObject,
  _agentsPagedResultAgentObjectDeserializer,
  DeleteAgentVersionResponse,
  deleteAgentVersionResponseDeserializer,
  _AgentsPagedResultAgentVersionObject,
  _agentsPagedResultAgentVersionObjectDeserializer,
  agentEventHandlerFilterSerializer,
  agentEventHandlerDestinationUnionSerializer,
  AgentEventHandlerDestinationUnion,
  AgentEventType,
  AgentEventHandlerObject,
  agentEventHandlerObjectDeserializer,
  _AgentsPagedResultAgentEventHandlerObject,
  _agentsPagedResultAgentEventHandlerObjectDeserializer,
  DeleteAgentEventHandlerResponse,
  deleteAgentEventHandlerResponseDeserializer,
  AgentContainerOperationObject,
  agentContainerOperationObjectDeserializer,
  AgentContainerObject,
  agentContainerObjectDeserializer,
  AgentsPagedResultAgentContainerOperationObject,
  agentsPagedResultAgentContainerOperationObjectDeserializer,
} from "../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import {
  ListAgentVersionContainerOperationsOptionalParams,
  ListAgentContainerOperationsOptionalParams,
  GetAgentContainerOperationOptionalParams,
  GetAgentContainerOptionalParams,
  DeleteAgentContainerOptionalParams,
  StopAgentContainerOptionalParams,
  UpdateAgentContainerOptionalParams,
  StartAgentContainerOptionalParams,
  DeleteAgentEventHandlerOptionalParams,
  ListAgentEventHandlersOptionalParams,
  GetAgentEventHandlerOptionalParams,
  CreateOrUpdateAgentEventHandlerOptionalParams,
  ListAgentVersionsOptionalParams,
  DeleteAgentVersionOptionalParams,
  GetAgentVersionOptionalParams,
  CreateAgentVersionOptionalParams,
  ListAgentsOptionalParams,
  DeleteAgentOptionalParams,
  UpdateAgentOptionalParams,
  CreateAgentOptionalParams,
  GetAgentOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listAgentVersionContainerOperationsSend(
  context: Client,
  agentName: string,
  agentVersion: string,
  options: ListAgentVersionContainerOperationsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/versions/{agent_version}/containers/default/operations{?api-version,limit,order,after,before}",
    {
      agent_name: agentName,
      agent_version: agentVersion,
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
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listAgentVersionContainerOperationsDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentsPagedResultAgentContainerOperationObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorDeserializer(result.body);
    throw error;
  }

  return agentsPagedResultAgentContainerOperationObjectDeserializer(
    result.body,
  );
}

/** List container operations for a specific version of an agent. */
export async function listAgentVersionContainerOperations(
  context: Client,
  agentName: string,
  agentVersion: string,
  options: ListAgentVersionContainerOperationsOptionalParams = {
    requestOptions: {},
  },
): Promise<AgentsPagedResultAgentContainerOperationObject> {
  const result = await _listAgentVersionContainerOperationsSend(
    context,
    agentName,
    agentVersion,
    options,
  );
  return _listAgentVersionContainerOperationsDeserialize(result);
}

export function _listAgentContainerOperationsSend(
  context: Client,
  agentName: string,
  options: ListAgentContainerOperationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/operations{?api-version,limit,order,after,before}",
    {
      agent_name: agentName,
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
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listAgentContainerOperationsDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentsPagedResultAgentContainerOperationObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorDeserializer(result.body);
    throw error;
  }

  return agentsPagedResultAgentContainerOperationObjectDeserializer(
    result.body,
  );
}

/** List container operations for an agent. */
export async function listAgentContainerOperations(
  context: Client,
  agentName: string,
  options: ListAgentContainerOperationsOptionalParams = { requestOptions: {} },
): Promise<AgentsPagedResultAgentContainerOperationObject> {
  const result = await _listAgentContainerOperationsSend(
    context,
    agentName,
    options,
  );
  return _listAgentContainerOperationsDeserialize(result);
}

export function _getAgentContainerOperationSend(
  context: Client,
  agentName: string,
  operationId: string,
  options: GetAgentContainerOperationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/operations/{operation_id}{?api-version}",
    {
      agent_name: agentName,
      operation_id: operationId,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
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
    error.details = apiErrorDeserializer(result.body);
    throw error;
  }

  return agentContainerOperationObjectDeserializer(result.body);
}

/** Get the status of a container operation for an agent. */
export async function getAgentContainerOperation(
  context: Client,
  agentName: string,
  operationId: string,
  options: GetAgentContainerOperationOptionalParams = { requestOptions: {} },
): Promise<AgentContainerOperationObject> {
  const result = await _getAgentContainerOperationSend(
    context,
    agentName,
    operationId,
    options,
  );
  return _getAgentContainerOperationDeserialize(result);
}

export function _getAgentContainerSend(
  context: Client,
  agentName: string,
  agentVersion: string,
  options: GetAgentContainerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/versions/{agent_version}/containers/default{?api-version}",
    {
      agent_name: agentName,
      agent_version: agentVersion,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
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
    error.details = apiErrorDeserializer(result.body);
    throw error;
  }

  return agentContainerObjectDeserializer(result.body);
}

/** Get a container for a specific version of an agent. */
export async function getAgentContainer(
  context: Client,
  agentName: string,
  agentVersion: string,
  options: GetAgentContainerOptionalParams = { requestOptions: {} },
): Promise<AgentContainerObject> {
  const result = await _getAgentContainerSend(
    context,
    agentName,
    agentVersion,
    options,
  );
  return _getAgentContainerDeserialize(result);
}

export function _deleteAgentContainerSend(
  context: Client,
  agentName: string,
  agentVersion: string,
  options: DeleteAgentContainerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/versions/{agent_version}/containers/default:delete{?api-version}",
    {
      agent_name: agentName,
      agent_version: agentVersion,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
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
    error.details = apiErrorDeserializer(result.body);
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
  agentName: string,
  agentVersion: string,
  options: DeleteAgentContainerOptionalParams = { requestOptions: {} },
): Promise<AgentContainerOperationObject> {
  const result = await _deleteAgentContainerSend(
    context,
    agentName,
    agentVersion,
    options,
  );
  return _deleteAgentContainerDeserialize(result);
}

export function _stopAgentContainerSend(
  context: Client,
  agentName: string,
  agentVersion: string,
  options: StopAgentContainerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/versions/{agent_version}/containers/default:stop{?api-version}",
    {
      agent_name: agentName,
      agent_version: agentVersion,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
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
    error.details = apiErrorDeserializer(result.body);
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
  agentName: string,
  agentVersion: string,
  options: StopAgentContainerOptionalParams = { requestOptions: {} },
): Promise<AgentContainerOperationObject> {
  const result = await _stopAgentContainerSend(
    context,
    agentName,
    agentVersion,
    options,
  );
  return _stopAgentContainerDeserialize(result);
}

export function _updateAgentContainerSend(
  context: Client,
  agentName: string,
  agentVersion: string,
  options: UpdateAgentContainerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/versions/{agent_version}/containers/default:update{?api-version}",
    {
      agent_name: agentName,
      agent_version: agentVersion,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: {
        min_replicas: options?.minReplicas,
        max_replicas: options?.maxReplicas,
      },
    });
}

export async function _updateAgentContainerDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentContainerOperationObject> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorDeserializer(result.body);
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
  agentName: string,
  agentVersion: string,
  options: UpdateAgentContainerOptionalParams = { requestOptions: {} },
): Promise<AgentContainerOperationObject> {
  const result = await _updateAgentContainerSend(
    context,
    agentName,
    agentVersion,
    options,
  );
  return _updateAgentContainerDeserialize(result);
}

export function _startAgentContainerSend(
  context: Client,
  agentName: string,
  agentVersion: string,
  options: StartAgentContainerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/versions/{agent_version}/containers/default:start{?api-version}",
    {
      agent_name: agentName,
      agent_version: agentVersion,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: {
        min_replicas: options?.minReplicas,
        max_replicas: options?.maxReplicas,
      },
    });
}

export async function _startAgentContainerDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentContainerOperationObject> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorDeserializer(result.body);
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
  agentName: string,
  agentVersion: string,
  options: StartAgentContainerOptionalParams = { requestOptions: {} },
): Promise<AgentContainerOperationObject> {
  const result = await _startAgentContainerSend(
    context,
    agentName,
    agentVersion,
    options,
  );
  return _startAgentContainerDeserialize(result);
}

export function _deleteAgentEventHandlerSend(
  context: Client,
  agentName: string,
  eventHandlerName: string,
  options: DeleteAgentEventHandlerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/event_handlers/{event_handler_name}{?api-version}",
    {
      agent_name: agentName,
      event_handler_name: eventHandlerName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _deleteAgentEventHandlerDeserialize(
  result: PathUncheckedResponse,
): Promise<DeleteAgentEventHandlerResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorDeserializer(result.body);
    throw error;
  }

  return deleteAgentEventHandlerResponseDeserializer(result.body);
}

/** Deletes an event handler of an agent. */
export async function deleteAgentEventHandler(
  context: Client,
  agentName: string,
  eventHandlerName: string,
  options: DeleteAgentEventHandlerOptionalParams = { requestOptions: {} },
): Promise<DeleteAgentEventHandlerResponse> {
  const result = await _deleteAgentEventHandlerSend(
    context,
    agentName,
    eventHandlerName,
    options,
  );
  return _deleteAgentEventHandlerDeserialize(result);
}

export function _listAgentEventHandlersSend(
  context: Client,
  agentName: string,
  options: ListAgentEventHandlersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/event_handlers{?api-version}",
    {
      agent_name: agentName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listAgentEventHandlersDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultAgentEventHandlerObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorDeserializer(result.body);
    throw error;
  }

  return _agentsPagedResultAgentEventHandlerObjectDeserializer(result.body);
}

/** Returns the list of event handlers of an agent. */
export function listAgentEventHandlers(
  context: Client,
  agentName: string,
  options: ListAgentEventHandlersOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AgentEventHandlerObject> {
  return buildPagedAsyncIterator(
    context,
    () => _listAgentEventHandlersSend(context, agentName, options),
    _listAgentEventHandlersDeserialize,
    ["200"],
    { itemName: "data" },
  );
}

export function _getAgentEventHandlerSend(
  context: Client,
  agentName: string,
  eventHandlerName: string,
  options: GetAgentEventHandlerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/event_handlers/{event_handler_name}{?api-version}",
    {
      agent_name: agentName,
      event_handler_name: eventHandlerName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getAgentEventHandlerDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentEventHandlerObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorDeserializer(result.body);
    throw error;
  }

  return agentEventHandlerObjectDeserializer(result.body);
}

/** Retrieves a specific event handler of an agent. */
export async function getAgentEventHandler(
  context: Client,
  agentName: string,
  eventHandlerName: string,
  options: GetAgentEventHandlerOptionalParams = { requestOptions: {} },
): Promise<AgentEventHandlerObject> {
  const result = await _getAgentEventHandlerSend(
    context,
    agentName,
    eventHandlerName,
    options,
  );
  return _getAgentEventHandlerDeserialize(result);
}

export function _createOrUpdateAgentEventHandlerSend(
  context: Client,
  agentName: string,
  eventHandlerName: string,
  name: string,
  eventTypes: AgentEventType[],
  destination: AgentEventHandlerDestinationUnion,
  options: CreateOrUpdateAgentEventHandlerOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/event_handlers/{event_handler_name}{?api-version}",
    {
      agent_name: agentName,
      event_handler_name: eventHandlerName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: {
      name: name,
      metadata: options?.metadata,
      event_types: eventTypes.map((p: any) => {
        return p;
      }),
      filter: !options?.filter
        ? options?.filter
        : agentEventHandlerFilterSerializer(options?.filter),
      destination: agentEventHandlerDestinationUnionSerializer(destination),
    },
  });
}

export async function _createOrUpdateAgentEventHandlerDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentEventHandlerObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorDeserializer(result.body);
    throw error;
  }

  return agentEventHandlerObjectDeserializer(result.body);
}

/** Create/Update/Remove an event handler for an agent. */
export async function createOrUpdateAgentEventHandler(
  context: Client,
  agentName: string,
  eventHandlerName: string,
  name: string,
  eventTypes: AgentEventType[],
  destination: AgentEventHandlerDestinationUnion,
  options: CreateOrUpdateAgentEventHandlerOptionalParams = {
    requestOptions: {},
  },
): Promise<AgentEventHandlerObject> {
  const result = await _createOrUpdateAgentEventHandlerSend(
    context,
    agentName,
    eventHandlerName,
    name,
    eventTypes,
    destination,
    options,
  );
  return _createOrUpdateAgentEventHandlerDeserialize(result);
}

export function _listAgentVersionsSend(
  context: Client,
  agentName: string,
  options: ListAgentVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/versions{?api-version,limit,order,after,before}",
    {
      agent_name: agentName,
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
  return context
    .path(path)
    .get({
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
    error.details = apiErrorDeserializer(result.body);
    throw error;
  }

  return _agentsPagedResultAgentVersionObjectDeserializer(result.body);
}

/** Returns the list of versions of an agent. */
export function listAgentVersions(
  context: Client,
  agentName: string,
  options: ListAgentVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AgentVersionObject> {
  return buildPagedAsyncIterator(
    context,
    () => _listAgentVersionsSend(context, agentName, options),
    _listAgentVersionsDeserialize,
    ["200"],
    { itemName: "data" },
  );
}

export function _deleteAgentVersionSend(
  context: Client,
  agentName: string,
  agentVersion: string,
  options: DeleteAgentVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/versions/{agent_version}{?api-version}",
    {
      agent_name: agentName,
      agent_version: agentVersion,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
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
    error.details = apiErrorDeserializer(result.body);
    throw error;
  }

  return deleteAgentVersionResponseDeserializer(result.body);
}

/** Deletes a specific version of an agent. */
export async function deleteAgentVersion(
  context: Client,
  agentName: string,
  agentVersion: string,
  options: DeleteAgentVersionOptionalParams = { requestOptions: {} },
): Promise<DeleteAgentVersionResponse> {
  const result = await _deleteAgentVersionSend(
    context,
    agentName,
    agentVersion,
    options,
  );
  return _deleteAgentVersionDeserialize(result);
}

export function _getAgentVersionSend(
  context: Client,
  agentName: string,
  agentVersion: string,
  options: GetAgentVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/versions/{agent_version}{?api-version}",
    {
      agent_name: agentName,
      agent_version: agentVersion,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
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
    error.details = apiErrorDeserializer(result.body);
    throw error;
  }

  return agentVersionObjectDeserializer(result.body);
}

/** Retrieves a specific version of an agent. */
export async function getAgentVersion(
  context: Client,
  agentName: string,
  agentVersion: string,
  options: GetAgentVersionOptionalParams = { requestOptions: {} },
): Promise<AgentVersionObject> {
  const result = await _getAgentVersionSend(
    context,
    agentName,
    agentVersion,
    options,
  );
  return _getAgentVersionDeserialize(result);
}

export function _createAgentVersionSend(
  context: Client,
  agentName: string,
  definition: AgentDefinitionUnion,
  options: CreateAgentVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/versions{?api-version}",
    {
      agent_name: agentName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: {
        description: options?.description,
        metadata: options?.metadata,
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
    error.details = apiErrorDeserializer(result.body);
    throw error;
  }

  return agentVersionObjectDeserializer(result.body);
}

/** Create a new agent version. */
export async function createAgentVersion(
  context: Client,
  agentName: string,
  definition: AgentDefinitionUnion,
  options: CreateAgentVersionOptionalParams = { requestOptions: {} },
): Promise<AgentVersionObject> {
  const result = await _createAgentVersionSend(
    context,
    agentName,
    definition,
    options,
  );
  return _createAgentVersionDeserialize(result);
}

export function _listAgentsSend(
  context: Client,
  options: ListAgentsOptionalParams = { requestOptions: {} },
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
  return context
    .path(path)
    .get({
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
    error.details = apiErrorDeserializer(result.body);
    throw error;
  }

  return _agentsPagedResultAgentObjectDeserializer(result.body);
}

/** Returns the list of all agents. */
export function listAgents(
  context: Client,
  options: ListAgentsOptionalParams = { requestOptions: {} },
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
  agentName: string,
  options: DeleteAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}{?api-version}",
    {
      agent_name: agentName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
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
    error.details = apiErrorDeserializer(result.body);
    throw error;
  }

  return deleteAgentResponseDeserializer(result.body);
}

/** Deletes an agent. */
export async function deleteAgent(
  context: Client,
  agentName: string,
  options: DeleteAgentOptionalParams = { requestOptions: {} },
): Promise<DeleteAgentResponse> {
  const result = await _deleteAgentSend(context, agentName, options);
  return _deleteAgentDeserialize(result);
}

export function _updateAgentSend(
  context: Client,
  agentName: string,
  definition: AgentDefinitionUnion,
  options: UpdateAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}{?api-version}",
    {
      agent_name: agentName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: {
        description: options?.description,
        metadata: options?.metadata,
        definition: agentDefinitionUnionSerializer(definition),
      },
    });
}

export async function _updateAgentDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorDeserializer(result.body);
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
  agentName: string,
  definition: AgentDefinitionUnion,
  options: UpdateAgentOptionalParams = { requestOptions: {} },
): Promise<AgentObject> {
  const result = await _updateAgentSend(
    context,
    agentName,
    definition,
    options,
  );
  return _updateAgentDeserialize(result);
}

export function _createAgentSend(
  context: Client,
  name: string,
  definition: AgentDefinitionUnion,
  options: CreateAgentOptionalParams = { requestOptions: {} },
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
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: {
        name: name,
        description: options?.description,
        metadata: options?.metadata,
        definition: agentDefinitionUnionSerializer(definition),
      },
    });
}

export async function _createAgentDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorDeserializer(result.body);
    throw error;
  }

  return agentObjectDeserializer(result.body);
}

/** Creates the agent. */
export async function createAgent(
  context: Client,
  name: string,
  definition: AgentDefinitionUnion,
  options: CreateAgentOptionalParams = { requestOptions: {} },
): Promise<AgentObject> {
  const result = await _createAgentSend(context, name, definition, options);
  return _createAgentDeserialize(result);
}

export function _getAgentSend(
  context: Client,
  agentName: string,
  options: GetAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}{?api-version}",
    {
      agent_name: agentName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getAgentDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorDeserializer(result.body);
    throw error;
  }

  return agentObjectDeserializer(result.body);
}

/** Retrieves the agent. */
export async function getAgent(
  context: Client,
  agentName: string,
  options: GetAgentOptionalParams = { requestOptions: {} },
): Promise<AgentObject> {
  const result = await _getAgentSend(context, agentName, options);
  return _getAgentDeserialize(result);
}
