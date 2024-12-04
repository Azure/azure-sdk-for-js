// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client, createRestError } from "@azure-rest/core-client";
import { EvaluationSchedule, PagedEvaluationScheduleOutput } from "../agents/inputOutputs.js";
import { CreateOrReplaceEvaluationScheduleParameters, DisableEvaluationScheduleParameters, GetEvaluationScheduleParameters, ListEvaluationScheduleParameters } from "../generated/src/parameters.js";

const expectedGetStatuses = ["200"];
const expectedSuccessStatuses = ["200", "201"];
const expectedDisableStatuses = ["204"];

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
