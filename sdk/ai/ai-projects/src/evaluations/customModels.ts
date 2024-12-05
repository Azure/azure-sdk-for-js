// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RequestParameters } from "@azure-rest/core-client";
import { Evaluation } from "../generated/src/models.js";
import { ListQueryParam, UpdateBodyParam } from "../generated/src/parameters.js";

export interface CreateEvaluationBodyParam {
  /** Evaluation to run. */
  body: Evaluation;
}

export type CreateEvaluationParameters = CreateEvaluationBodyParam & RequestParameters;
export type GetEvaluationParameters = RequestParameters;

export type ListEvaluationParameters = ListQueryParam & RequestParameters;

export type GetEvaluationScheduleParameters = RequestParameters;

export type CreateOrReplaceEvaluationScheduleParameters = RequestParameters;

export type ListEvaluationScheduleParameters = ListQueryParam & RequestParameters;

export type DisableEvaluationScheduleParameters = RequestParameters;

export type UpdateEvaluationParameters = UpdateBodyParam & RequestParameters;
