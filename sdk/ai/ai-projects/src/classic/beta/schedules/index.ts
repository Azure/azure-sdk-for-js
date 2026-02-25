// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  listRuns,
  getRun,
  createOrUpdate,
  list,
  get,
  $delete,
} from "../../../api/beta/schedules/operations.js";
import {
  BetaSchedulesListRunsOptionalParams,
  BetaSchedulesGetRunOptionalParams,
  BetaSchedulesCreateOrUpdateOptionalParams,
  BetaSchedulesListOptionalParams,
  BetaSchedulesGetOptionalParams,
  BetaSchedulesDeleteOptionalParams,
} from "../../../api/beta/schedules/options.js";
import { Schedule, ScheduleRun } from "../../../models/models.js";
import { PagedAsyncIterableIterator } from "../../../static-helpers/pagingHelpers.js";

/** Interface representing a BetaSchedules operations. */
export interface BetaSchedulesOperations {
  /** List all schedule runs. */
  listRuns: (
    id: string,
    options?: BetaSchedulesListRunsOptionalParams,
  ) => PagedAsyncIterableIterator<ScheduleRun>;
  /** Get a schedule run by id. */
  getRun: (
    scheduleId: string,
    runId: string,
    options?: BetaSchedulesGetRunOptionalParams,
  ) => Promise<ScheduleRun>;
  /** Create or update operation template. */
  createOrUpdate: (
    id: string,
    schedule: Schedule,
    options?: BetaSchedulesCreateOrUpdateOptionalParams,
  ) => Promise<Schedule>;
  /** List all schedules. */
  list: (options?: BetaSchedulesListOptionalParams) => PagedAsyncIterableIterator<Schedule>;
  /** Get a schedule by id. */
  get: (id: string, options?: BetaSchedulesGetOptionalParams) => Promise<Schedule>;
  /** Delete a schedule. */
  delete: (id: string, options?: BetaSchedulesDeleteOptionalParams) => Promise<void>;
}

function _getBetaSchedules(context: AIProjectContext) {
  return {
    listRuns: (id: string, options?: BetaSchedulesListRunsOptionalParams) =>
      listRuns(context, id, options),
    getRun: (scheduleId: string, runId: string, options?: BetaSchedulesGetRunOptionalParams) =>
      getRun(context, scheduleId, runId, options),
    createOrUpdate: (
      id: string,
      schedule: Schedule,
      options?: BetaSchedulesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, id, schedule, options),
    list: (options?: BetaSchedulesListOptionalParams) => list(context, options),
    get: (id: string, options?: BetaSchedulesGetOptionalParams) => get(context, id, options),
    delete: (id: string, options?: BetaSchedulesDeleteOptionalParams) =>
      $delete(context, id, options),
  };
}

export function _getBetaSchedulesOperations(context: AIProjectContext): BetaSchedulesOperations {
  return {
    ..._getBetaSchedules(context),
  };
}
