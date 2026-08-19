// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  listRuns,
  getRun,
  createOrUpdate,
  list,
  get,
  $delete,
} from "../../../api/beta/schedules/operations.js";
import type {
  BetaSchedulesListRunsOptionalParams,
  BetaSchedulesGetRunOptionalParams,
  BetaSchedulesCreateOrUpdateOptionalParams,
  BetaSchedulesListOptionalParams,
  BetaSchedulesGetOptionalParams,
  BetaSchedulesDeleteOptionalParams,
} from "../../../api/beta/schedules/options.js";
import type { Schedule, ScheduleRun } from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";

/** Interface representing a BetaSchedules operations. */
export interface BetaSchedulesOperations {
  /** List all schedule runs. */
  listRuns: (
    scheduleId: string,
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
    scheduleId: string,
    schedule: Schedule,
    options?: BetaSchedulesCreateOrUpdateOptionalParams,
  ) => Promise<Schedule>;
  /** List all schedules. */
  list: (options?: BetaSchedulesListOptionalParams) => PagedAsyncIterableIterator<Schedule>;
  /** Get a schedule by id. */
  get: (scheduleId: string, options?: BetaSchedulesGetOptionalParams) => Promise<Schedule>;
  /** Delete a schedule. */
  delete: (scheduleId: string, options?: BetaSchedulesDeleteOptionalParams) => Promise<void>;
}

function _getBetaSchedules(context: AIProjectContext) {
  return {
    listRuns: (scheduleId: string, options?: BetaSchedulesListRunsOptionalParams) =>
      listRuns(context, scheduleId, options),
    getRun: (scheduleId: string, runId: string, options?: BetaSchedulesGetRunOptionalParams) =>
      getRun(context, scheduleId, runId, options),
    createOrUpdate: (
      scheduleId: string,
      schedule: Schedule,
      options?: BetaSchedulesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, scheduleId, schedule, options),
    list: (options?: BetaSchedulesListOptionalParams) => list(context, options),
    get: (scheduleId: string, options?: BetaSchedulesGetOptionalParams) =>
      get(context, scheduleId, options),
    delete: (scheduleId: string, options?: BetaSchedulesDeleteOptionalParams) =>
      $delete(context, scheduleId, options),
  };
}

export function _getBetaSchedulesOperations(context: AIProjectContext): BetaSchedulesOperations {
  return {
    ..._getBetaSchedules(context),
  };
}
