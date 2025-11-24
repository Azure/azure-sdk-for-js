// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../api/aiProjectContext.js";
import {
  listRuns,
  getRun,
  createOrUpdate,
  list,
  get,
  $delete,
} from "../../api/schedules/operations.js";
import {
  SchedulesListRunsOptionalParams,
  SchedulesGetRunOptionalParams,
  SchedulesCreateOrUpdateOptionalParams,
  SchedulesListOptionalParams,
  SchedulesGetOptionalParams,
  SchedulesDeleteOptionalParams,
} from "../../api/schedules/options.js";
import { Schedule, ScheduleRun, PagedScheduleRun } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Schedules operations. */
export interface SchedulesOperations {
  /** List all schedule runs. */
  listRuns: (
    scheduleId: string,
    options?: SchedulesListRunsOptionalParams,
  ) => Promise<PagedScheduleRun>;
  /** Get a schedule run by id. */
  getRun: (
    scheduleId: string,
    runId: string,
    options?: SchedulesGetRunOptionalParams,
  ) => Promise<ScheduleRun>;
  /** Create or update a schedule by id. */
  createOrUpdate: (
    id: string,
    schedule: Schedule,
    options?: SchedulesCreateOrUpdateOptionalParams,
  ) => Promise<Schedule>;
  /** List all schedules. */
  list: (options?: SchedulesListOptionalParams) => PagedAsyncIterableIterator<Schedule>;
  /** Get a schedule by id. */
  get: (id: string, options?: SchedulesGetOptionalParams) => Promise<Schedule>;
  /** Delete a schedule. */
  delete: (id: string, options?: SchedulesDeleteOptionalParams) => Promise<void>;
}

function _getSchedules(context: AIProjectContext) {
  return {
    listRuns: (scheduleId: string, options?: SchedulesListRunsOptionalParams) =>
      listRuns(context, scheduleId, options),
    getRun: (scheduleId: string, runId: string, options?: SchedulesGetRunOptionalParams) =>
      getRun(context, scheduleId, runId, options),
    createOrUpdate: (
      id: string,
      schedule: Schedule,
      options?: SchedulesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, id, schedule, options),
    list: (options?: SchedulesListOptionalParams) => list(context, options),
    get: (id: string, options?: SchedulesGetOptionalParams) => get(context, id, options),
    delete: (id: string, options?: SchedulesDeleteOptionalParams) => $delete(context, id, options),
  };
}

export function _getSchedulesOperations(context: AIProjectContext): SchedulesOperations {
  return {
    ..._getSchedules(context),
  };
}
