// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../api/aiProjectContext.js";
import {
  disableSchedule,
  listSchedule,
  createOrReplaceSchedule,
  getSchedule,
  update,
  list,
  create,
  get,
} from "../../api/evaluations/index.js";
import { Evaluation, EvaluationSchedule } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import {
  EvaluationsDisableScheduleOptionalParams,
  EvaluationsListScheduleOptionalParams,
  EvaluationsCreateOrReplaceScheduleOptionalParams,
  EvaluationsGetScheduleOptionalParams,
  EvaluationsUpdateOptionalParams,
  EvaluationsListOptionalParams,
  EvaluationsCreateOptionalParams,
  EvaluationsGetOptionalParams,
} from "../../api/options.js";

/** Interface representing a Evaluations operations. */
export interface EvaluationsOperations {
  /** Disable the evaluation schedule. */
  disableSchedule: (
    name: string,
    options?: EvaluationsDisableScheduleOptionalParams,
  ) => Promise<void>;
  /** Resource list operation template. */
  listSchedule: (
    options?: EvaluationsListScheduleOptionalParams,
  ) => PagedAsyncIterableIterator<EvaluationSchedule>;
  /** Create or replace operation template. */
  createOrReplaceSchedule: (
    name: string,
    resource: EvaluationSchedule,
    options?: EvaluationsCreateOrReplaceScheduleOptionalParams,
  ) => Promise<EvaluationSchedule>;
  /** Resource read operation template. */
  getSchedule: (
    name: string,
    options?: EvaluationsGetScheduleOptionalParams,
  ) => Promise<EvaluationSchedule>;
  /** Resource update operation template. */
  update: (
    id: string,
    resource: Evaluation,
    options?: EvaluationsUpdateOptionalParams,
  ) => Promise<Evaluation>;
  /** Resource list operation template. */
  list: (
    options?: EvaluationsListOptionalParams,
  ) => PagedAsyncIterableIterator<Evaluation>;
  /** Run the evaluation. */
  create: (
    evaluation: Evaluation,
    options?: EvaluationsCreateOptionalParams,
  ) => Promise<Evaluation>;
  /** Resource read operation template. */
  get: (
    id: string,
    options?: EvaluationsGetOptionalParams,
  ) => Promise<Evaluation>;
}

function _getEvaluations(context: AIProjectContext) {
  return {
    disableSchedule: (
      name: string,
      options?: EvaluationsDisableScheduleOptionalParams,
    ) => disableSchedule(context, name, options),
    listSchedule: (options?: EvaluationsListScheduleOptionalParams) =>
      listSchedule(context, options),
    createOrReplaceSchedule: (
      name: string,
      resource: EvaluationSchedule,
      options?: EvaluationsCreateOrReplaceScheduleOptionalParams,
    ) => createOrReplaceSchedule(context, name, resource, options),
    getSchedule: (
      name: string,
      options?: EvaluationsGetScheduleOptionalParams,
    ) => getSchedule(context, name, options),
    update: (
      id: string,
      resource: Evaluation,
      options?: EvaluationsUpdateOptionalParams,
    ) => update(context, id, resource, options),
    list: (options?: EvaluationsListOptionalParams) => list(context, options),
    create: (
      evaluation: Evaluation,
      options?: EvaluationsCreateOptionalParams,
    ) => create(context, evaluation, options),
    get: (id: string, options?: EvaluationsGetOptionalParams) =>
      get(context, id, options),
  };
}

export function _getEvaluationsOperations(
  context: AIProjectContext,
): EvaluationsOperations {
  return {
    ..._getEvaluations(context),
  };
}
