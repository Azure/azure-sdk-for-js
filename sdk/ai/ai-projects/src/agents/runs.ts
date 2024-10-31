// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client, createRestError } from "@azure-rest/core-client";
import { AgentsCancelRunParameters, AgentsCreateRunParameters, AgentsCreateThreadAndRunParameters, AgentsGetRunParameters, AgentsListRunsParameters, AgentsSubmitToolOutputsToRunParameters, AgentsUpdateRunParameters } from "../generated/src/parameters.js";
import { OpenAIPageableListOfThreadRunOutput, ThreadRunOutput } from "../generated/src/outputModels.js";

const expectedStatuses = ["200"];

/** Creates and starts a new run of the specified thread using the specified agent. */
export async function createRun(
  context: Client,
  threadId: string,
  options: AgentsCreateRunParameters,
): Promise<ThreadRunOutput> {
    const result = await context
    .path("/threads/{threadId}/runs", threadId)
    .post(options);
  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return result.body; 
}

/** Gets a list of runs for a specified thread. */
export async function listRuns(
  context: Client,
  threadId: string,
  options?: AgentsListRunsParameters,
): Promise<OpenAIPageableListOfThreadRunOutput> {
    const result = await context
    .path("/threads/{threadId}/runs", threadId)
    .get(options);
  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return result.body; 
}

/** Gets an existing run from an existing thread. */
export async function getRun(
  context: Client,
  threadId: string,
  runId: string,
  options?: AgentsGetRunParameters,
): Promise<ThreadRunOutput> {
    const result = await context
    .path("/threads/{threadId}/runs/{runId}", threadId, runId)
    .get(options);
  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return result.body; 
}

/** Modifies an existing thread run. */
export async function updateRun(
  context: Client,
  threadId: string,
  runId: string,
  options: AgentsUpdateRunParameters,
): Promise<ThreadRunOutput> {
    const result = await context
    .path("/threads/{threadId}/runs/{runId}", threadId, runId)
    .post(options);
  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return result.body; 
}

/** Submits outputs from tools as requested by tool calls in a run. Runs that need submitted tool outputs will have a status of 'requires_action' with a required_action.type of 'submit_tool_outputs'. */
export async function submitToolOutputsToRun(
  context: Client,
  threadId: string,
  runId: string,
  options?: AgentsSubmitToolOutputsToRunParameters,
): Promise<ThreadRunOutput> {
    const result = await context
    .path("/threads/{threadId}/runs/{runId}/submit_tool_outputs", threadId, runId)
    .post(options);
  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return result.body; 
}

/** Cancels a run of an in progress thread. */
export async function cancelRun(
  context: Client,
  threadId: string,
  runId: string,
  options?: AgentsCancelRunParameters,
): Promise<ThreadRunOutput> {
    const result = await context
    .path("/threads/{threadId}/runs/{runId}/cancel", threadId, runId)
    .post(options);
  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return result.body; 
}

/** Creates a new thread and immediately starts a run of that thread. */
export async function createThreadAndRun(
  context: Client,
  options: AgentsCreateThreadAndRunParameters,
): Promise<ThreadRunOutput> {
    const result = await context.path("/threads/runs").post(options);
  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return result.body; 
}
