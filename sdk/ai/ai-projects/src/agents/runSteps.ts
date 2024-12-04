// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client, createRestError } from "@azure-rest/core-client";
import { OpenAIPageableListOfRunStepOutput, RunStepOutput } from "../generated/src/outputModels.js";
import { GetRunStepParameters, ListRunStepsParameters } from "../generated/src/parameters.js";
import { validateLimit, validateOrder, validateRunId, validateThreadId } from "./inputValidations.js";

const expectedStatuses = ["200"];

/** Gets a single run step from a thread run. */
export async function getRunStep(
  context: Client,
  threadId: string,
  runId: string,
  stepId: string,
  options?: GetRunStepParameters,
): Promise<RunStepOutput> {
  validateThreadId(threadId);
  validateRunId(runId);
  validateStepId(stepId);
const result = await context
  .path("/threads/{threadId}/runs/{runId}/steps/{stepId}", threadId, runId, stepId)
  .get(options);
  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return result.body; 
}

/** Gets a list of run steps from a thread run. */
export async function listRunSteps(
  context: Client,
  threadId: string,
  runId: string,
  options?: ListRunStepsParameters,
): Promise<OpenAIPageableListOfRunStepOutput> {
  validateListRunsParameters(threadId, runId, options);
  const result = await context
  .path("/threads/{threadId}/runs/{runId}/steps", threadId, runId)
  .get(options);
  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return result.body; 
}



function validateStepId(stepId: string): void {
  if (!stepId) {
    throw new Error("Step ID is required");
  }
}

function validateListRunsParameters(thread_id: string, runId: string, options?: ListRunStepsParameters): void {
  validateThreadId(thread_id);
  validateRunId(runId);
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
