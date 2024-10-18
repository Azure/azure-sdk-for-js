// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ClientContext } from "../../api/azureAIContext.js";
import { Evaluation, EvaluationSchedule } from "../../models/models.js";
import {
  get,
  create,
  list,
  update,
  getSchedule,
  createOrReplaceSchedule,
  listSchedule,
  deleteSchedule,
} from "../../api/evaluations/index.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import {
  EvaluationsGetOptionalParams,
  EvaluationsCreateOptionalParams,
  EvaluationsListOptionalParams,
  EvaluationsUpdateOptionalParams,
  EvaluationsGetScheduleOptionalParams,
  EvaluationsCreateOrReplaceScheduleOptionalParams,
  EvaluationsListScheduleOptionalParams,
  EvaluationsDeleteScheduleOptionalParams,
} from "../../models/options.js";

/** Interface representing a Evaluations operations. */
export interface EvaluationsOperations {
  /** Resource read operation template. */
  get: (
    id: string,
    options?: EvaluationsGetOptionalParams,
  ) => Promise<Evaluation>;
  /** Run the evaluation. */
  create: (
    evaluation: Evaluation,
    options?: EvaluationsCreateOptionalParams,
  ) => Promise<Evaluation>;
  /** Resource list operation template. */
  list: (
    options?: EvaluationsListOptionalParams,
  ) => PagedAsyncIterableIterator<Evaluation>;
  /** Resource update operation template. */
  update: (
    id: string,
    resource: Evaluation,
    options?: EvaluationsUpdateOptionalParams,
  ) => Promise<Evaluation>;
  /** Resource read operation template. */
  getSchedule: (
    id: string,
    options?: EvaluationsGetScheduleOptionalParams,
  ) => Promise<EvaluationSchedule>;
  /** Create or replace operation template. */
  createOrReplaceSchedule: (
    id: string,
    resource: EvaluationSchedule,
    options?: EvaluationsCreateOrReplaceScheduleOptionalParams,
  ) => Promise<EvaluationSchedule>;
  /** Resource list operation template. */
  listSchedule: (
    options?: EvaluationsListScheduleOptionalParams,
  ) => PagedAsyncIterableIterator<EvaluationSchedule>;
  /** Resource delete operation template. */
  deleteSchedule: (
    id: string,
    options?: EvaluationsDeleteScheduleOptionalParams,
  ) => Promise<void>;
}

export function getEvaluations(context: ClientContext) {
  return {
    get: (id: string, options?: EvaluationsGetOptionalParams) =>
      get(context, id, options),
    create: (
      evaluation: Evaluation,
      options?: EvaluationsCreateOptionalParams,
    ) => create(context, evaluation, options),
    list: (options?: EvaluationsListOptionalParams) => list(context, options),
    update: (
      id: string,
      resource: Evaluation,
      options?: EvaluationsUpdateOptionalParams,
    ) => update(context, id, resource, options),
    getSchedule: (id: string, options?: EvaluationsGetScheduleOptionalParams) =>
      getSchedule(context, id, options),
    createOrReplaceSchedule: (
      id: string,
      resource: EvaluationSchedule,
      options?: EvaluationsCreateOrReplaceScheduleOptionalParams,
    ) => createOrReplaceSchedule(context, id, resource, options),
    listSchedule: (options?: EvaluationsListScheduleOptionalParams) =>
      listSchedule(context, options),
    deleteSchedule: (
      id: string,
      options?: EvaluationsDeleteScheduleOptionalParams,
    ) => deleteSchedule(context, id, options),
  };
}

export function getEvaluationsOperations(
  context: ClientContext,
): EvaluationsOperations {
  return {
    ...getEvaluations(context),
  };
}
