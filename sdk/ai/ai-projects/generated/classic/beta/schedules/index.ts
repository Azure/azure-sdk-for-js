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
  /** Returns schedule runs that match the supplied filters. */
  listRuns: (
    scheduleId: string,
    foundryFeatures: "Schedules=V1Preview",
    options?: BetaSchedulesListRunsOptionalParams,
  ) => PagedAsyncIterableIterator<ScheduleRun>;
  /** Retrieves the specified run for a schedule. */
  getRun: (
    scheduleId: string,
    runId: string,
    foundryFeatures: "Schedules=V1Preview",
    options?: BetaSchedulesGetRunOptionalParams,
  ) => Promise<ScheduleRun>;
  /** Creates a new schedule or updates an existing schedule with the supplied definition. */
  createOrUpdate: (
    scheduleId: string,
    foundryFeatures: "Schedules=V1Preview",
    schedule: Schedule,
    options?: BetaSchedulesCreateOrUpdateOptionalParams,
  ) => Promise<Schedule>;
  /** Returns schedules that match the supplied type and enabled filters. */
  list: (
    foundryFeatures: "Schedules=V1Preview",
    options?: BetaSchedulesListOptionalParams,
  ) => PagedAsyncIterableIterator<Schedule>;
  /** Retrieves the specified schedule resource. */
  get: (
    scheduleId: string,
    foundryFeatures: "Schedules=V1Preview",
    options?: BetaSchedulesGetOptionalParams,
  ) => Promise<Schedule>;
  /** Deletes the specified schedule resource. */
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
