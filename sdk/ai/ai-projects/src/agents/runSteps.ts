// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client, createRestError } from "@azure-rest/core-client";
import { OpenAIPageableListOfRunStepOutput, RunStepOutput } from "../generated/src/outputModels.js";
import { GetRunStepParameters, ListRunStepsParameters } from "../generated/src/parameters.js";

const expectedStatuses = ["200"];

/** Gets a single run step from a thread run. */
export async function getRunStep(
  context: Client,
  threadId: string,
  runId: string,
  stepId: string,
  options?: GetRunStepParameters,
): Promise<RunStepOutput> {
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
  const result = await context
  .path("/threads/{threadId}/runs/{runId}/steps", threadId, runId)
  .get(options);
  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return result.body; 
}
