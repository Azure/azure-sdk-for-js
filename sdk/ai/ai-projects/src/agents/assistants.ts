// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client, createRestError } from "@azure-rest/core-client";
import { AgentDeletionStatusOutput, AgentOutput, OpenAIPageableListOfAgentOutput } from "../generated/src/outputModels.js";
import { CreateAgentParameters, DeleteAgentParameters, GetAgentParameters, ListAgentsParameters, UpdateAgentParameters } from "../generated/src/parameters.js";
import { validateLimit, validateMetadata, validateOrder, validateVectorStoreDataType } from "./inputValidations.js";
import { TracingUtility } from "../tracing.js";
import { traceEndCreateOrUpdateAgent, traceStartCreateOrUpdateAgent } from "./assistantsTrace.js";
import { traceEndAgentGeneric, traceStartAgentGeneric } from "./traceUtility.js";

const expectedStatuses = ["200"];

enum Tools {
  CodeInterpreter = "code_interpreter",
  FileSearch = "file_search",
  Function = "function",
  BingGrounding = "bing_grounding",
  MicrosoftFabric = "microsoft_fabric",
  SharepointGrounding = "sharepoint_grounding",
  AzureAISearch = "azure_ai_search",
}

/** Creates a new agent. */
export async function createAgent(
  context: Client,
  options: CreateAgentParameters,
): Promise<AgentOutput> {
  validateCreateAgentParameters(options);
  return TracingUtility.withSpan("CreateAgent", options,
    async (updatedOptions) => {
      const result = await context.path("/assistants").post(updatedOptions);
      if (!expectedStatuses.includes(result.status)) {
        throw createRestError(result);
      }
      return result.body;
    },
    traceStartCreateOrUpdateAgent, traceEndCreateOrUpdateAgent,
  );
}

/** Gets a list of agents that were previously created. */
export async function listAgents(
  context: Client,
  options: ListAgentsParameters = {},
): Promise<OpenAIPageableListOfAgentOutput> {
  validateListAgentsParameters(options);
  return TracingUtility.withSpan("ListAgents", options || {}, async (updateOptions) => {
    const result = await context
      .path("/assistants")
      .get(updateOptions);
    if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
    }
    return result.body;
  });
}

/** Retrieves an existing agent. */
export async function getAgent(
  context: Client,
  assistantId: string,
  options: GetAgentParameters = {},
): Promise<AgentOutput> {
  validateAssistantId(assistantId);
  return TracingUtility.withSpan("GetAgent", options || {}, async (updateOptions) => {
    const result = await context
      .path("/assistants/{assistantId}", assistantId)
      .get(updateOptions);
    if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
    }
    return result.body;
  }, (span, updatedOptions) => traceStartAgentGeneric(span, { ...updatedOptions, tracingAttributeOptions: { agentId: assistantId } }));
}

/** Modifies an existing agent. */
export async function updateAgent(
  context: Client,
  assistantId: string,
  options: UpdateAgentParameters = { body: {} },
): Promise<AgentOutput> {
  validateUpdateAgentParameters(assistantId, options);
  return TracingUtility.withSpan("UpdateAgent", options, async (updateOptions) => {
    const result = await context
      .path("/assistants/{assistantId}", assistantId)
      .post(updateOptions);
    if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
    }
    return result.body;
  }, (span, updatedOptions) => traceStartCreateOrUpdateAgent(span, updatedOptions, assistantId), traceEndCreateOrUpdateAgent,);
}


/** Deletes an agent. */
export async function deleteAgent(
  context: Client,
  assistantId: string,
  options: DeleteAgentParameters = {},
): Promise<AgentDeletionStatusOutput> {
  validateAssistantId(assistantId);
  return TracingUtility.withSpan("DeleteAgent", options, async (updateOptions) => {
    const result = await context
      .path("/assistants/{assistantId}", assistantId)
      .delete(updateOptions);
    if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
    }
    return result.body;
  }, traceStartAgentGeneric, traceEndAgentGeneric);
}

function validateCreateAgentParameters(options: CreateAgentParameters | UpdateAgentParameters): void {
  if (options.body.tools) {
    if (options.body.tools.some(value => !Object.values(Tools).includes(value.type as Tools))) {
      throw new Error("Tool type must be one of 'code_interpreter', 'file_search', 'function', 'bing_grounding', 'microsoft_fabric', 'sharepoint_grounding', 'azure_ai_search'");
    }
  }
  if (options.body.tool_resources) {
    if (options.body.tool_resources.code_interpreter) {
      if (options.body.tool_resources.code_interpreter.file_ids && options.body.tool_resources.code_interpreter.data_sources) {
        throw new Error("Only file_ids or data_sources can be provided, not both");
      }
      if (options.body.tool_resources.code_interpreter.file_ids && options.body.tool_resources.code_interpreter.file_ids.length > 20) {
        throw new Error("A maximum of 20 file IDs are allowed");
      }
      if (options.body.tool_resources.code_interpreter.data_sources) {
        validateVectorStoreDataType(options.body.tool_resources.code_interpreter.data_sources);
      }
    }
    if (options.body.tool_resources.file_search) {
      if (options.body.tool_resources.file_search.vector_store_ids && options.body.tool_resources.file_search.vector_store_ids.length > 1) {
        throw new Error("Only one vector store ID is allowed");
      }
      if (options.body.tool_resources.file_search.vector_stores) {
        if (options.body.tool_resources.file_search.vector_stores.length > 1) {
          throw new Error("Only one vector store is allowed");
        }
        validateVectorStoreDataType(options.body.tool_resources.file_search.vector_stores[0]?.configuration.data_sources);
      }
    }
    if (options.body.tool_resources.azure_ai_search) {
      if (options.body.tool_resources.azure_ai_search.indexes && options.body.tool_resources.azure_ai_search.indexes.length > 1) {
        throw new Error("Only one index is allowed");
      }
    }
  }
  if (options.body.temperature && (options.body.temperature < 0 || options.body.temperature > 2)) {
    throw new Error("Temperature must be between 0 and 2");
  }
  if (options.body.metadata) {
    validateMetadata(options.body.metadata);
  }
}

function validateListAgentsParameters(options?: ListAgentsParameters): void {
  if (options?.queryParameters?.limit) {
    validateLimit(options.queryParameters.limit);
  }
  if (options?.queryParameters?.order) {
    validateOrder(options.queryParameters.order);
  }
}

function validateAssistantId(assistantId: string): void {
  if (!assistantId) {
    throw new Error("Assistant ID is required");
  }
}

function validateUpdateAgentParameters(assistantId: string, options?: UpdateAgentParameters): void {
  validateAssistantId(assistantId);
  if (options) {
    validateCreateAgentParameters(options);
  }
}
