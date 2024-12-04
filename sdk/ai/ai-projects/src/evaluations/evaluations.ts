// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client, createRestError } from "@azure-rest/core-client";
import { EvaluationOutput, PagedEvaluationOutput } from "../agents/inputOutputs.js";
import { CreateEvaluationParameters, GetEvaluationParameters, ListEvaluationParameters, UpdateEvaluationParameters } from "../generated/src/parameters.js";

const expectedGetStatuses = ["200"];
const expectedCreateStatuses = ["201"];

/** Resource read operation template. */
export async function getEvaluation(
    context: Client,
    evaluationId: string,
    options?: GetEvaluationParameters,
  ): Promise<EvaluationOutput> {
    const result = await context
    .path("/evaluations/runs/{evaluationId}", evaluationId)
    .get(options);
    if (!expectedGetStatuses.includes(result.status)) {
        throw createRestError(result);
    }
    return result.body; 
  }

/** Run the evaluation. */
export async function createEvaluation(
    context: Client,
    options?: CreateEvaluationParameters,
  ): Promise<EvaluationOutput> {
    const result = await  context
    .path("/evaluations/runs:run")
    .post(options);
    if (!expectedCreateStatuses.includes(result.status)) {
        throw createRestError(result);
    }
    return result.body; 
  }

  /** Resource list operation template. */
export async function listEvaluations(
    context: Client,
    options?: ListEvaluationParameters,
  ): Promise<PagedEvaluationOutput> {
    const result = await context
    .path("/evaluations/runs")
    .get(options);
    if (!expectedGetStatuses.includes(result.status)) {
        throw createRestError(result);
    }
    return result.body; 
  }

  /** Resource update operation template. */
export async function updateEvaluation(
    context: Client,
    evaluationId: string,
    options?: UpdateEvaluationParameters,
  ): Promise<EvaluationOutput> {
    const result = await context
    .path("/evaluations/runs/{evaluationId}", evaluationId)
    .patch(options);
    if (!expectedGetStatuses.includes(result.status)) {
        throw createRestError(result);
    }
    return result.body;
  }
