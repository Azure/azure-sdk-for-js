// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client, createRestError } from "@azure-rest/core-client";
import { AgentsApiResponseFormatOption, CreateAgentOptions, AgentsApiResponseFormat } from "../generated/src/models.js";
import { AgentDeletionStatusOutput, AgentOutput, OpenAIPageableListOfAgentOutput } from "../generated/src/outputModels.js";
import { CreateAgentParameters, DeleteAgentParameters, GetAgentParameters, ListAgentsParameters, UpdateAgentParameters } from "../generated/src/parameters.js";
import { setSpanAttributes, TracingAttributeOptions, tracingClient, TrackingOperationName } from "../tracing.js";


const expectedStatuses = ["200"];

/** Creates a new agent. */
export async function createAgent(
  context: Client,
  options: CreateAgentParameters
): Promise<AgentOutput> {
  return tracingClient.withSpan("createAgent", options, async (updatedOptions, span) => {
    setSpanAttributes(span, getAgentAttributes(options.body))
    const result = await context.path("/assistants").post(updatedOptions);

    if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
    }
    const resultBody = result.body as AgentOutput;
    setSpanAttributes(span, getAgentResultAttributes(resultBody));
    return resultBody;
  });
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

/**
 * Extracts tracing attributes from the agent creation options.
 * @param body - The options for creating an agent.
 * @returns The tracing attributes.
 */
function getAgentAttributes(body: CreateAgentOptions): TracingAttributeOptions {
  return {
    operationName: TrackingOperationName.CREATE_AGENT,
    name: body.name,
    model: body.model,
    description: body.description,
    instructions: body.instructions,
    topP: body.top_p,
    responseFormat: formatAgentApiResponse(body.response_format)
  };
}

/**
 * Extracts tracing attributes from the agent output.
 * @param output - The output of the agent.
 * @returns TracingAttributeOptions The tracing attributes.
 */
function getAgentResultAttributes(output: AgentOutput): TracingAttributeOptions {
  return {
    operationName: TrackingOperationName.CREATE_AGENT,
    agentId: output.id,
  };
}

/**
 * Formats the agent API response.
 * @param responseFormat - The response format option.
 * @returns The formatted response as a string, or null/undefined.
 */
function formatAgentApiResponse(responseFormat: AgentsApiResponseFormatOption | null | undefined): string | null | undefined {
  if (typeof responseFormat === "string" || responseFormat === undefined || responseFormat === null) {
    return responseFormat;
  }
  if ((responseFormat as AgentsApiResponseFormat).type) {
    return (responseFormat as AgentsApiResponseFormat).type;
  }
  return undefined;
}
