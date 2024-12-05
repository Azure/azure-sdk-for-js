
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client } from "@azure-rest/core-client";
import { OptionalRequestParameters } from "../agents/customModels.js";
import { Evaluation, EvaluationOutput, EvaluationSchedule, PagedEvaluationOutput, PagedEvaluationScheduleOutput } from "../agents/inputOutputs.js";
import { ListEvaluationParameters, ListEvaluationScheduleParameters } from "./customModels.js";
import { createEvaluation, getEvaluation, listEvaluations, updateEvaluation } from "./evaluations.js";
import { createOrReplaceSchedule, disableSchedule, getSchedule, listSchedules } from "./evaluationSchedules.js";

export interface EvaluationsOperations {
  /** Resource read operation template. */
  getEvaluation: (
    evaluationId: string,
    requestParams?: OptionalRequestParameters
  ) => Promise<EvaluationOutput>;
  /** Run the evaluation. */
  createEvaluation: (
    evaluation: Evaluation,
    requestParams?: OptionalRequestParameters
  ) => Promise<EvaluationOutput>;
  /** Resource list operation template. */
  listEvaluations: (
    options?: ListEvaluationParameters,
    requestParams?: OptionalRequestParameters
  ) => Promise<PagedEvaluationOutput>;
  /** Resource update operation template. */
  updateEvaluation: (
    evaluationId: string,
    resource: Evaluation,
    requestParams?: OptionalRequestParameters
  ) => Promise<EvaluationOutput>;   
  /** Resource read operation template. */
  getSchedule: (
    evaluationName: string,
    requestParams?: OptionalRequestParameters
  ) => Promise<EvaluationSchedule>;
  /** Create or replace operation template. */
  createOrReplaceSchedule: (
    scheduleName: string,
    resource: EvaluationSchedule,
    requestParams?: OptionalRequestParameters
  ) => Promise<EvaluationSchedule>;
  /** Resource list operation template. */
  listSchedules: (
    options?: ListEvaluationScheduleParameters,
    requestParams?: OptionalRequestParameters
  ) => Promise<PagedEvaluationScheduleOutput>;
  /** Disable the evaluation schedule. */
  disableSchedule: (
    scheduleName: string,
    requestParams?: OptionalRequestParameters
  ) => Promise<void>;
}

function getEvaluations(context: Client): EvaluationsOperations {
  return {
    getEvaluation: (evaluationId: string, requestParams?: OptionalRequestParameters) =>
      getEvaluation(context, evaluationId, requestParams),
    createEvaluation: (evaluation: Evaluation, requestParams?: OptionalRequestParameters) =>
      createEvaluation(context, { body: evaluation, ...requestParams }),
    listEvaluations: (options?: ListEvaluationParameters, requestParams?: OptionalRequestParameters) =>
      listEvaluations(context, { queryParameters: options as Record<string, unknown>, ...requestParams }),
    updateEvaluation: (evaluationId: string, resource: Evaluation, requestParams?: OptionalRequestParameters) =>
      updateEvaluation(context, evaluationId, { body: resource, ...requestParams }),
    getSchedule: (evaluationName: string, requestParams?: OptionalRequestParameters) =>
      getSchedule(context, evaluationName, requestParams),
    createOrReplaceSchedule: (scheduleName: string, resource: EvaluationSchedule, requestParams?: OptionalRequestParameters) =>
      createOrReplaceSchedule(context, scheduleName, { body: resource, ...requestParams }),
    listSchedules: (options?: ListEvaluationScheduleParameters, requestParams?: OptionalRequestParameters) =>
      listSchedules(context, { queryParameters: options as Record<string, unknown>, ...requestParams }),
    disableSchedule: (scheduleName: string, requestParams?: OptionalRequestParameters) =>
      disableSchedule(context, scheduleName, requestParams),
  };
}

export function getEvaluationsOperations(context: Client): EvaluationsOperations {
  return {
    ...getEvaluations(context),
  };
}
