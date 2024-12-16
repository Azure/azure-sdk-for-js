// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Client } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import { convertCreateAgentOptions, convertUpdateAgentOptions } from "../customization/convertModelsToWrite.js";
import * as ConvertFromWire from "../customization/convertOutputModelsFromWire.js";
import type { AgentDeletionStatusOutput, AgentOutput, OpenAIPageableListOfAgentOutput } from "../generated/src/outputModels.js";
import type * as GeneratedParameters from "../generated/src/parameters.js";
import type { CreateAgentParameters, ListAgentsParameters, UpdateAgentParameters } from "../generated/src/parameters.js";
import { TracingUtility } from "../tracing.js";
import { traceEndCreateOrUpdateAgent, traceStartCreateOrUpdateAgent } from "./assistantsTrace.js";
import type { CreateAgentOptionalParams, DeleteAgentOptionalParams, GetAgentOptionalParams, ListAgentsOptionalParams, UpdateAgentOptionalParams } from "./customModels.js";
import { validateLimit, validateMetadata, validateOrder, validateVectorStoreDataType } from "./inputValidations.js";
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
  model: string,
  options: CreateAgentOptionalParams = {},
): Promise<AgentOutput> {
  const createAgentOptions: GeneratedParameters.CreateAgentParameters = {
    ...operationOptionsToRequestParameters(options),
    body: {
      ...convertCreateAgentOptions({...options, model}),
    }
  };
  
  validateCreateAgentParameters(createAgentOptions);
  const output = await TracingUtility.withSpan("CreateAgent", createAgentOptions,
    async (updatedOptions) => {
      const result = await context.path("/assistants").post(updatedOptions);
      if (!expectedStatuses.includes(result.status)) {
        throw createRestError(result);
      }
      return result.body;
    },
    traceStartCreateOrUpdateAgent, traceEndCreateOrUpdateAgent,
  );

  return ConvertFromWire.convertAgentOutput(output);
}

/** Gets a list of agents that were previously created. */
export async function listAgents(
  context: Client,
  options: ListAgentsOptionalParams = {},
): Promise<OpenAIPageableListOfAgentOutput> {
  const listAgentsOptions: GeneratedParameters.ListAgentsParameters = {
    ...operationOptionsToRequestParameters(options),
    queryParameters: {
      ...(options.limit && { limit: options.limit }),
      ...(options.order && { order: options.order }),
      ...(options.after && { after: options.after }),
      ...(options.before && { before: options.before }),
    }
  };

  validateListAgentsParameters(listAgentsOptions);
  const output = await TracingUtility.withSpan("ListAgents", listAgentsOptions || {}, async (updateOptions) => {
    const result = await context
      .path("/assistants")
      .get(updateOptions);
    if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
    }
    return result.body;
  });

  return ConvertFromWire.convertOpenAIPageableListOfAgentOutput(output);
}

/** Retrieves an existing agent. */
export async function getAgent(
  context: Client,
  assistantId: string,
  options: GetAgentOptionalParams = {},
): Promise<AgentOutput> {
  const getAgentOptions: GeneratedParameters.GetAgentParameters = {
    ...operationOptionsToRequestParameters(options),
  };

  validateAssistantId(assistantId);
  const output = await TracingUtility.withSpan("GetAgent", getAgentOptions || {}, async (updateOptions) => {
    const result = await context
      .path("/assistants/{assistantId}", assistantId)
      .get(updateOptions);
    if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
    }
    return result.body;
  }, (span, updatedOptions) => traceStartAgentGeneric(span, { ...updatedOptions, tracingAttributeOptions: { agentId: assistantId } }));

  return ConvertFromWire.convertAgentOutput(output);
}

/** Modifies an existing agent. */
export async function updateAgent(
  context: Client,
  assistantId: string,
  options: UpdateAgentOptionalParams = {},
): Promise<AgentOutput> {
  const updateAgentOptions: GeneratedParameters.UpdateAgentParameters = {
    ...operationOptionsToRequestParameters(options),
    body: {
      ...convertUpdateAgentOptions({...options}),
    }
  };

  validateUpdateAgentParameters(assistantId, updateAgentOptions);
  const output = await TracingUtility.withSpan("UpdateAgent", updateAgentOptions, async (updateOptions) => {
    const result = await context
      .path("/assistants/{assistantId}", assistantId)
      .post(updateOptions);
    if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
    }
    return result.body;
  }, (span, updatedOptions) => traceStartCreateOrUpdateAgent(span, updatedOptions, assistantId), traceEndCreateOrUpdateAgent,);

  return ConvertFromWire.convertAgentOutput(output);
}


/** Deletes an agent. */
export async function deleteAgent(
  context: Client,
  assistantId: string,
  options: DeleteAgentOptionalParams = {},
): Promise<AgentDeletionStatusOutput> {
  const deleteAgentOptions: GeneratedParameters.DeleteAgentParameters = {
    ...operationOptionsToRequestParameters(options),
  };

  validateAssistantId(assistantId);
  const output = await TracingUtility.withSpan("DeleteAgent", deleteAgentOptions, async (updateOptions) => {
    const result = await context
      .path("/assistants/{assistantId}", assistantId)
      .delete(updateOptions);
    if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
    }
    return result.body;
  }, traceStartAgentGeneric, traceEndAgentGeneric);

  return ConvertFromWire.convertAgentDeletionStatusOutput(output);
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
