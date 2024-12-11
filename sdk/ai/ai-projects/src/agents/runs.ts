// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client, createRestError } from "@azure-rest/core-client";
import { CancelRunParameters, CreateRunParameters, CreateThreadAndRunParameters, GetRunParameters, ListRunsParameters, SubmitToolOutputsToRunParameters, UpdateRunParameters } from "../generated/src/parameters.js";
import { OpenAIPageableListOfThreadRunOutput, ThreadRunOutput } from "../generated/src/outputModels.js";
import { validateLimit, validateMessages, validateMetadata, validateOrder, validateRunId, validateThreadId, validateTools, validateTruncationStrategy } from "./inputValidations.js";

const expectedStatuses = ["200"];

/** Creates and starts a new run of the specified thread using the specified agent. */
export async function createRun(
  context: Client,
  threadId: string,
  options: CreateRunParameters,
): Promise<ThreadRunOutput> {
  validateThreadId(threadId);
  validateCreateRunParameters(options);
  options.body.stream = false;
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
  options?: ListRunsParameters,
): Promise<OpenAIPageableListOfThreadRunOutput> {
  validateListRunsParameters(threadId, options);
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
  options?: GetRunParameters,
): Promise<ThreadRunOutput> {
  validateThreadId(threadId);
  validateRunId(runId);
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
  options?: UpdateRunParameters,
): Promise<ThreadRunOutput> {
  validateUpdateRunParameters(threadId, runId, options);
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
  options: SubmitToolOutputsToRunParameters,
): Promise<ThreadRunOutput> {
  validateThreadId(threadId);
  validateRunId(runId);
  options.body.stream = false;
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
  options?: CancelRunParameters,
): Promise<ThreadRunOutput> {
  validateThreadId(threadId);
  validateRunId(runId);
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
  options: CreateThreadAndRunParameters,
): Promise<ThreadRunOutput> {
  validateCreateThreadAndRunParameters(options);
  options.body.stream = false;
  const result = await context.path("/threads/runs").post(options);
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }
  return result.body;
}

function validateListRunsParameters(thread_id: string, options?: ListRunsParameters): void {
  validateThreadId(thread_id);
  if (options?.queryParameters?.limit && (options.queryParameters.limit < 1 || options.queryParameters.limit > 100)) {
      throw new Error("Limit must be between 1 and 100");
  }
  if (options?.queryParameters?.limit) {
    validateLimit(options.queryParameters.limit);
  }
  if (options?.queryParameters?.order) {
    validateOrder(options.queryParameters.order);
  }
}

function validateUpdateRunParameters(thread_id: string, run_id: string, options?: UpdateRunParameters): void {
  validateThreadId(thread_id);
  validateRunId(run_id);
  if(options?.body.metadata){
    validateMetadata(options.body.metadata);
  }
}

function validateCreateRunParameters(options: CreateRunParameters| CreateThreadAndRunParameters): void {
  if ('additional_messages' in options.body && options.body.additional_messages) {
    options.body.additional_messages.forEach(message => validateMessages(message.role));
  }
  if (options.body.tools) {
    validateTools(options.body.tools);
  }
  if (options.body.temperature && (options.body.temperature < 0 || options.body.temperature > 2)) {
    throw new Error("Temperature must be between 0 and 2");
  }
  if (options.body.tool_choice && typeof options.body.tool_choice !== 'string') {
    validateTools([options.body.tool_choice]);
  }
  if (options.body.truncation_strategy?.type) {
    validateTruncationStrategy(options.body.truncation_strategy.type);
  }
  if (options.body.metadata) {
    validateMetadata(options.body.metadata);
  }
}

function validateCreateThreadAndRunParameters(options: CreateThreadAndRunParameters): void {
  validateCreateRunParameters(options);
  if (options.body.thread?.messages) {
    options.body.thread?.messages.forEach(message => validateMessages(message.role));
  }
  if (options.body.tools) {
    validateTools(options.body.tools);
  }
  if (options.body.tool_resources?.code_interpreter) {
    if (options.body.tool_resources.code_interpreter) {
      if (options.body.tool_resources.code_interpreter.file_ids && options.body.tool_resources.code_interpreter.file_ids.length > 20) {
        throw new Error("A maximum of 20 file IDs are allowed");
      }
    }
    if (options.body.tool_resources.file_search) {
      if (options.body.tool_resources.file_search.vector_store_ids && options.body.tool_resources.file_search.vector_store_ids.length > 1) {
        throw new Error("Only one vector store ID is allowed");
      }
    }
    if (options.body.tool_resources.azure_ai_search) {
      if (options.body.tool_resources.azure_ai_search.indexes && options.body.tool_resources.azure_ai_search.indexes.length > 1) {
        throw new Error("Only one index is allowed");
      }
    }
  }
}
