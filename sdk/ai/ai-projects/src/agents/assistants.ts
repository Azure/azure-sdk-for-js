// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client, createRestError } from "@azure-rest/core-client";
import { AgentDeletionStatusOutput, AgentOutput, OpenAIPageableListOfAgentOutput } from "../generated/src/outputModels.js";
import { CreateAgentParameters, DeleteAgentParameters, GetAgentParameters, ListAgentsParameters, UpdateAgentParameters } from "../generated/src/parameters.js";


const expectedStatuses = ["200"];

/** Creates a new agent. */
export async function createAgent(
    context: Client,
    options: CreateAgentParameters,
  ): Promise<AgentOutput> {
    validateCreateAgentParameters(options);
    const result = await  context.path("/assistants").post(options);
    if (!expectedStatuses.includes(result.status)) {
        throw createRestError(result);
    }
    return result.body; 
  }

  /** Gets a list of agents that were previously created. */
  export async function listAgents(
    context: Client,
    options?: ListAgentsParameters,
  ): Promise<OpenAIPageableListOfAgentOutput> {
    validateListAgentsParameters(options);
    const result = await  context
    .path("/assistants")
    .get(options);
    if (!expectedStatuses.includes(result.status)) {
        throw createRestError(result);
    }
    return result.body; 
  }

  /** Retrieves an existing agent. */
export async function getAgent(
    context: Client,
    assistantId: string,
    options?: GetAgentParameters,
  ): Promise<AgentOutput> {
    validateAssistantId(assistantId);
    const result = await context
    .path("/assistants/{assistantId}", assistantId)
    .get(options);
    if (!expectedStatuses.includes(result.status)) {
        throw createRestError(result);
    }
    return result.body; 
  }

  /** Modifies an existing agent. */
export async function updateAgent(
    context: Client,
    assistantId: string,
    options?: UpdateAgentParameters,
  ): Promise<AgentOutput> {
    validateUpdateAgentParameters(assistantId, options);
    const result = await context
    .path("/assistants/{assistantId}", assistantId)
    .post(options);
    if (!expectedStatuses.includes(result.status)) {
        throw createRestError(result);
    }
    return result.body;
  }


  /** Deletes an agent. */
export async function deleteAgent(
    context: Client,
    assistantId: string,
    options?: DeleteAgentParameters,
  ): Promise<AgentDeletionStatusOutput> {
    validateAssistantId(assistantId);
    const result = await context
    .path("/assistants/{assistantId}", assistantId)
    .delete(options);
    if (!expectedStatuses.includes(result.status)) {
        throw createRestError(result);
    }
    return result.body;
  }

function validateCreateAgentParameters(options: CreateAgentParameters | UpdateAgentParameters): void {
  if (options.body.temperature && (options.body.temperature < 0 || options.body.temperature > 2)) {
      throw new Error("Temperature must be between 0 and 2");
  }
  if (options.body.metadata) {
    if (Object.keys(options.body.metadata).length > 16) {
      throw new Error("Only 16 key/value pairs are allowed");
    }
    if (Object.keys(options.body.metadata).some(value => value.length > 64)) {
      throw new Error("Keys must be less than 64 characters");
    }
    if (Object.values(options.body.metadata).some(value => value.length > 512)) {
      throw new Error("Values must be less than 512 characters");
    }
  }
}

function validateListAgentsParameters(options?: ListAgentsParameters): void {
  if (options?.queryParameters?.limit && (options.queryParameters.limit < 1 || options.queryParameters.limit > 100)) {
      throw new Error("Limit must be between 1 and 100");
  }
  if (options?.queryParameters?.order && !["asc", "desc"].includes(options.queryParameters.order)) {
      throw new Error("Order must be 'asc' or 'desc'");
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
