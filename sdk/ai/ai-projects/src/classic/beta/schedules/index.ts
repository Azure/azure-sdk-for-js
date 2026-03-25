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
import type { PagedAsyncIterableIterator } from "../../../static-helpers/pagingHelpers.js";

/** Interface representing a BetaSchedules operations. */
export interface BetaSchedulesOperations {
  /** List all schedule runs. */
  listRuns: (
    scheduleId: string,
    foundryFeatures: "Schedules=V1Preview",
    options?: BetaSchedulesListRunsOptionalParams,
  ) => PagedAsyncIterableIterator<ScheduleRun>;
  /** Get a schedule run by id. */
  getRun: (
    scheduleId: string,
    runId: string,
    foundryFeatures: "Schedules=V1Preview",
    options?: BetaSchedulesGetRunOptionalParams,
  ) => Promise<ScheduleRun>;
  /** Create or update operation template. */
  createOrUpdate: (
    scheduleId: string,
    foundryFeatures: "Schedules=V1Preview",
    schedule: Schedule,
    options?: BetaSchedulesCreateOrUpdateOptionalParams,
  ) => Promise<Schedule>;
  /** List all schedules. */
  list: (
    foundryFeatures: "Schedules=V1Preview",
    options?: BetaSchedulesListOptionalParams,
  ) => PagedAsyncIterableIterator<Schedule>;
  /** Get a schedule by id. */
  get: (
    scheduleId: string,
    foundryFeatures: "Schedules=V1Preview",
    options?: BetaSchedulesGetOptionalParams,
  ) => Promise<Schedule>;
  /** Delete a schedule. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    scheduleId: string,
    foundryFeatures: "Schedules=V1Preview",
    options?: BetaSchedulesDeleteOptionalParams,
  ) => Promise<void>;
}

function _getBetaSchedules(context: AIProjectContext) {
  return {
    listRuns: (
      scheduleId: string,
      foundryFeatures: "Schedules=V1Preview",
      options?: BetaSchedulesListRunsOptionalParams,
    ) => listRuns(context, scheduleId, foundryFeatures, options),
    getRun: (
      scheduleId: string,
      runId: string,
      foundryFeatures: "Schedules=V1Preview",
      options?: BetaSchedulesGetRunOptionalParams,
    ) => getRun(context, scheduleId, runId, foundryFeatures, options),
    createOrUpdate: (
      scheduleId: string,
      foundryFeatures: "Schedules=V1Preview",
      schedule: Schedule,
      options?: BetaSchedulesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, scheduleId, foundryFeatures, schedule, options),
    list: (foundryFeatures: "Schedules=V1Preview", options?: BetaSchedulesListOptionalParams) =>
      list(context, foundryFeatures, options),
    get: (
      scheduleId: string,
      foundryFeatures: "Schedules=V1Preview",
      options?: BetaSchedulesGetOptionalParams,
    ) => get(context, scheduleId, foundryFeatures, options),
    delete: (
      scheduleId: string,
      foundryFeatures: "Schedules=V1Preview",
      options?: BetaSchedulesDeleteOptionalParams,
    ) => $delete(context, scheduleId, foundryFeatures, options),
  };
}

export function _getBetaSchedulesOperations(context: AIProjectContext): BetaSchedulesOperations {
  return {
    ..._getBetaSchedules(context),
  };
}
