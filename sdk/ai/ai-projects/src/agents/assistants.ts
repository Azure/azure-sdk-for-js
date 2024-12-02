// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client, createRestError } from "@azure-rest/core-client";
import { AgentDeletionStatusOutput, AgentOutput, OpenAIPageableListOfAgentOutput } from "../generated/src/outputModels.js";
import { CreateAgentParameters, DeleteAgentParameters, GetAgentParameters, ListAgentsParameters, UpdateAgentParameters } from "../generated/src/parameters.js";
import { TracingUtility} from "../tracing.js";
import { traceEndCreateAgent, traceStartCreateAgent } from "./assistantsTrace.js";

const expectedStatuses = ["200"];

/** Creates a new agent. */
export async function createAgent(
  context: Client,
  options: CreateAgentParameters
): Promise<AgentOutput> {
  return TracingUtility.withSpan("CreateAgent", options,
    async (updatedOptions) => {
      const result = await context.path("/assistants").post(updatedOptions);
      if (!expectedStatuses.includes(result.status)) {
        throw createRestError(result);
      }
      return result.body as AgentOutput;
    },
    traceStartCreateAgent, traceEndCreateAgent,
  );
}

/** Gets a list of agents that were previously created. */
export async function listAgents(
  context: Client,
  options?: ListAgentsParameters
): Promise<OpenAIPageableListOfAgentOutput> {
  const result = await context
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
  const result = await context
    .path("/assistants/{assistantId}", assistantId)
    .delete(options);
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }
  return result.body;
}
