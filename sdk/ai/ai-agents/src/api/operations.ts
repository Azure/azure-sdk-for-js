// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AgentsContext as Client } from "./index.js";
import type {
  Agent,
  _AgentsPagedResultAgent,
  AgentDeletionStatus,
  ThreadRun,
} from "../models/models.js";
import {
  toolResourcesSerializer,
  toolDefinitionUnionArraySerializer,
  agentsResponseFormatOptionSerializer,
  agentDeserializer,
  agentV1ErrorDeserializer,
  _agentsPagedResultAgentDeserializer,
  agentDeletionStatusDeserializer,
  agentThreadCreationOptionsSerializer,
  truncationObjectSerializer,
  agentsToolChoiceOptionSerializer,
  threadRunDeserializer,
} from "../models/models.js";
import type { PagedAsyncIterableIterator } from "../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import type {
  CreateThreadAndRunOptionalParams,
  DeleteAgentOptionalParams,
  UpdateAgentOptionalParams,
  GetAgentOptionalParams,
  ListAgentsOptionalParams,
  CreateAgentOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _createThreadAndRunSend(
  context: Client,
  assistantId: string,
  options: CreateThreadAndRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/runs{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
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
      assistant_id: assistantId,
      thread: !options?.thread
        ? options?.thread
        : agentThreadCreationOptionsSerializer(options?.thread),
      model: options?.model,
      instructions: options?.instructions,
      tools: !options?.tools ? options?.tools : toolDefinitionUnionArraySerializer(options?.tools),
      tool_resources: !options?.toolResources
        ? options?.toolResources
        : toolResourcesSerializer(options?.toolResources),
      stream: options?.stream,
      temperature: options?.temperature,
      top_p: options?.topP,
      max_prompt_tokens: options?.maxPromptTokens,
      max_completion_tokens: options?.maxCompletionTokens,
      truncation_strategy: !options?.truncationStrategy
        ? options?.truncationStrategy
        : truncationObjectSerializer(options?.truncationStrategy),
      tool_choice: !options?.toolChoice
        ? options?.toolChoice
        : agentsToolChoiceOptionSerializer(options?.toolChoice),
      response_format: !options?.responseFormat
        ? options?.responseFormat
        : agentsResponseFormatOptionSerializer(options?.responseFormat),
      parallel_tool_calls: options?.parallelToolCalls,
      metadata: options?.metadata,
    },
  });
}

export async function _createThreadAndRunDeserialize(
  result: PathUncheckedResponse,
): Promise<ThreadRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = agentV1ErrorDeserializer(result.body);
    throw error;
  }

  return threadRunDeserializer(result.body);
}

/** Creates a new agent thread and immediately starts a run using that new thread. */
export async function createThreadAndRun(
  context: Client,
  assistantId: string,
  options: CreateThreadAndRunOptionalParams = { requestOptions: {} },
): Promise<ThreadRun> {
  const result = await _createThreadAndRunSend(context, assistantId, options);
  return _createThreadAndRunDeserialize(result);
}

export function _deleteAgentSend(
  context: Client,
  assistantId: string,
  options: DeleteAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/assistants/{assistantId}{?api%2Dversion}",
    {
      assistantId: assistantId,
      "api%2Dversion": context.apiVersion,
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
): Promise<AgentDeletionStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = agentV1ErrorDeserializer(result.body);
    throw error;
  }

  return agentDeletionStatusDeserializer(result.body);
}

/** Deletes an agent. */
export async function deleteAgent(
  context: Client,
  assistantId: string,
  options: DeleteAgentOptionalParams = { requestOptions: {} },
): Promise<AgentDeletionStatus> {
  const result = await _deleteAgentSend(context, assistantId, options);
  return _deleteAgentDeserialize(result);
}

export function _updateAgentSend(
  context: Client,
  assistantId: string,
  options: UpdateAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/assistants/{assistantId}{?api%2Dversion}",
    {
      assistantId: assistantId,
      "api%2Dversion": context.apiVersion,
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
      model: options?.model,
      name: options?.name,
      description: options?.description,
      instructions: options?.instructions,
      tools: !options?.tools ? options?.tools : toolDefinitionUnionArraySerializer(options?.tools),
      tool_resources: !options?.toolResources
        ? options?.toolResources
        : toolResourcesSerializer(options?.toolResources),
      temperature: options?.temperature,
      top_p: options?.topP,
      response_format: !options?.responseFormat
        ? options?.responseFormat
        : agentsResponseFormatOptionSerializer(options?.responseFormat),
      metadata: options?.metadata,
    },
  });
}

export async function _updateAgentDeserialize(result: PathUncheckedResponse): Promise<Agent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = agentV1ErrorDeserializer(result.body);
    throw error;
  }

  return agentDeserializer(result.body);
}

/** Modifies an existing agent. */
export async function updateAgent(
  context: Client,
  assistantId: string,
  options: UpdateAgentOptionalParams = { requestOptions: {} },
): Promise<Agent> {
  const result = await _updateAgentSend(context, assistantId, options);
  return _updateAgentDeserialize(result);
}

export function _getAgentSend(
  context: Client,
  assistantId: string,
  options: GetAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/assistants/{assistantId}{?api%2Dversion}",
    {
      assistantId: assistantId,
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

export async function _getAgentDeserialize(result: PathUncheckedResponse): Promise<Agent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = agentV1ErrorDeserializer(result.body);
    throw error;
  }

  return agentDeserializer(result.body);
}

/** Retrieves an existing agent. */
export async function getAgent(
  context: Client,
  assistantId: string,
  options: GetAgentOptionalParams = { requestOptions: {} },
): Promise<Agent> {
  const result = await _getAgentSend(context, assistantId, options);
  return _getAgentDeserialize(result);
}

export function _listAgentsSend(
  context: Client,
  options: ListAgentsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/assistants{?api%2Dversion,limit,order,after,before}",
    {
      "api%2Dversion": context.apiVersion,
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
): Promise<_AgentsPagedResultAgent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = agentV1ErrorDeserializer(result.body);
    throw error;
  }

  return _agentsPagedResultAgentDeserializer(result.body);
}

/** Gets a list of agents that were previously created. */
export function listAgents(
  context: Client,
  options: ListAgentsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Agent> {
  return buildPagedAsyncIterator(
    context,
    () => _listAgentsSend(context, options),
    _listAgentsDeserialize,
    ["200"],
    { itemName: "data" },
  );
}

export function _createAgentSend(
  context: Client,
  model: string,
  options: CreateAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/assistants{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
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
      model: model,
      name: options?.name,
      description: options?.description,
      instructions: options?.instructions,
      tools: !options?.tools ? options?.tools : toolDefinitionUnionArraySerializer(options?.tools),
      tool_resources: !options?.toolResources
        ? options?.toolResources
        : toolResourcesSerializer(options?.toolResources),
      temperature: options?.temperature,
      top_p: options?.topP,
      response_format: !options?.responseFormat
        ? options?.responseFormat
        : agentsResponseFormatOptionSerializer(options?.responseFormat),
      metadata: options?.metadata,
    },
  });
}

export async function _createAgentDeserialize(result: PathUncheckedResponse): Promise<Agent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = agentV1ErrorDeserializer(result.body);
    throw error;
  }

  return agentDeserializer(result.body);
}

/** Creates a new agent. */
export async function createAgent(
  context: Client,
  model: string,
  options: CreateAgentOptionalParams = { requestOptions: {} },
): Promise<Agent> {
  const result = await _createAgentSend(context, model, options);
  return _createAgentDeserialize(result);
}
