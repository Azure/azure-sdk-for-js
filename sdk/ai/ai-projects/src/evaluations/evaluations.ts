// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client, createRestError } from "@azure-rest/core-client";
import { EvaluationOutput, EvaluationSchedule, PagedEvaluationOutput, PagedEvaluationScheduleOutput } from "../agents/inputOutputs.js";
import { CreateEvaluationParameters, CreateOrReplaceEvaluationScheduleParameters, DisableEvaluationScheduleParameters, GetEvaluationParameters, GetEvaluationScheduleParameters, ListEvaluationParameters, ListEvaluationScheduleParameters, UpdateEvaluationParameters } from "../generated/src/parameters.js";

const expectedGetStatuses = ["200"];
const expectedCreateStatuses = ["201"];
const expectedSuccessStatuses = ["200", "201"];
const expectedDisableStatuses = ["204"];

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

/** Resource read operation template. */
export async function getSchedule(
    context: Client,
    evaluationName: string,
    options?: GetEvaluationScheduleParameters,
  ): Promise<EvaluationSchedule> {
    const result = await context
    .path("/evaluations/schedules/{evaluationName}", evaluationName)
    .get(options);
    if (!expectedGetStatuses.includes(result.status)) {
        throw createRestError(result);
    }
    return result.body;
  }

/** Create or replace operation template. */
export async function createOrReplaceSchedule(
    context: Client,
    scheduleName: string, 
    options?: CreateOrReplaceEvaluationScheduleParameters,
  ): Promise<EvaluationSchedule> {
    const result = await context
    .path("/evaluations/schedules/{scheduleName}", scheduleName)
    .put(options);
    if (!expectedSuccessStatuses.includes(result.status)) {
        throw createRestError(result);
    }
    return result.body;
  }

/** Resource list operation template. */
export async function listSchedules(
    context: Client,
    options?: ListEvaluationScheduleParameters,
  ): Promise<PagedEvaluationScheduleOutput> {
    const result = await context
    .path("/evaluations/schedules")
    .get(options);
    if (!expectedGetStatuses.includes(result.status)) {
        throw createRestError(result);
    }
    return result.body;
  }

/** Disable the evaluation schedule. */
export async function disableSchedule(
    context: Client,
    scheduleName: string,
    options?: DisableEvaluationScheduleParameters,
  ): Promise<void> {
    const result = await context
    .path("/evaluations/schedules/{scheduleName}/disable", scheduleName)
    .patch(options);
    if (!expectedDisableStatuses.includes(result.status)) {
        throw createRestError(result);
    }
  }
