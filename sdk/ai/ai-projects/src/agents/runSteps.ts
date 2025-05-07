// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Client } from "@azure-rest/core-client";
import { operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type {
  OpenAIPageableListOfRunStepOutput,
  RunStepOutput,
} from "../customization/outputModels.js";
import type * as GeneratedParameters from "../generated/src/parameters.js";
import * as ConverterFromWire from "../customization/convertOutputModelsFromWire.js";
import {
  validateLimit,
  validateOrder,
  validateRunId,
  validateThreadId,
} from "./inputValidations.js";
import type { GetRunStepOptionalParams, ListRunStepsOptionalParams } from "./customModels.js";
import { convertToListQueryParameters } from "../customization/convertParametersToWire.js";
import { createOpenAIError } from "./openAIError.js";

const expectedStatuses = ["200"];

/** Gets a single run step from a thread run. */
export async function getRunStep(
  context: Client,
  threadId: string,
  runId: string,
  stepId: string,
  options: GetRunStepOptionalParams = {},
): Promise<RunStepOutput> {
  validateThreadId(threadId);
  validateRunId(runId);
  validateStepId(stepId);

  const getOptions: GeneratedParameters.GetRunParameters = {
    ...operationOptionsToRequestParameters(options),
  };

  const result = await context
    .path("/threads/{threadId}/runs/{runId}/steps/{stepId}", threadId, runId, stepId)
    .get(getOptions);
  if (!expectedStatuses.includes(result.status)) {
    throw createOpenAIError(result);
  }
  return ConverterFromWire.convertRunStepOutput(result.body);
}

/** Gets a list of run steps from a thread run. */
export async function listRunSteps(
  context: Client,
  threadId: string,
  runId: string,
  options: ListRunStepsOptionalParams = {},
): Promise<OpenAIPageableListOfRunStepOutput> {
  const listOptions: GeneratedParameters.ListRunStepsParameters = {
    ...operationOptionsToRequestParameters(options),
    queryParameters: convertToListQueryParameters(options),
  };

  validateListRunsParameters(threadId, runId, listOptions);
  const result = await context
    .path("/threads/{threadId}/runs/{runId}/steps", threadId, runId)
    .get(listOptions);
  if (!expectedStatuses.includes(result.status)) {
    throw createOpenAIError(result);
  }
  return ConverterFromWire.convertOpenAIPageableListOfRunStepOutput(result.body);
}

function validateStepId(stepId: string): void {
  if (!stepId) {
    throw new Error("Step ID is required");
  }
}

function validateListRunsParameters(
  thread_id: string,
  runId: string,
  options?: GeneratedParameters.ListRunStepsParameters,
): void {
  validateThreadId(thread_id);
  validateRunId(runId);
  if (
    options?.queryParameters?.limit &&
    (options.queryParameters.limit < 1 || options.queryParameters.limit > 100)
  ) {
    throw new Error("Limit must be between 1 and 100");
  }
  if (options?.queryParameters?.limit) {
    validateLimit(options.queryParameters.limit);
  }
  if (options?.queryParameters?.order) {
    validateOrder(options.queryParameters.order);
  }
}
