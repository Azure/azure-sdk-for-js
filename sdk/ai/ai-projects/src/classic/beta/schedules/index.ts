// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  listRuns,
  getRun,
  createOrUpdate,
  list,
  get,
  deleteSchedule,
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
<<<<<<< /tmp/azsdk-dev-toolnFGKkd/result/src/classic/beta/schedules/index.ts
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
  deleteSchedule: (
    scheduleId: string,
    foundryFeatures: "Schedules=V1Preview",
    options?: BetaSchedulesDeleteOptionalParams,
  ) => Promise<void>;
||||||| /tmp/azsdk-dev-toolnFGKkd/base/sdk/ai/ai-projects/generated/classic/beta/schedules/index.ts
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
=======
  /** List all schedules. */
  list: (options?: BetaSchedulesListOptionalParams) => PagedAsyncIterableIterator<Schedule>;
  /** Get a schedule by id. */
  get: (scheduleId: string, options?: BetaSchedulesGetOptionalParams) => Promise<Schedule>;
  /** Delete a schedule. */
  delete: (scheduleId: string, options?: BetaSchedulesDeleteOptionalParams) => Promise<void>;
>>>>>>> /tmp/azsdk-dev-toolnFGKkd/custom/sdk/ai/ai-projects/src/classic/beta/schedules/index.ts
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
<<<<<<< /tmp/azsdk-dev-toolnFGKkd/result/src/classic/beta/schedules/index.ts
    ) => createOrUpdate(context, scheduleId, foundryFeatures, schedule, options),
    list: (foundryFeatures: "Schedules=V1Preview", options?: BetaSchedulesListOptionalParams) =>
      list(context, foundryFeatures, options),
    get: (
      scheduleId: string,
      foundryFeatures: "Schedules=V1Preview",
      options?: BetaSchedulesGetOptionalParams,
    ) => get(context, scheduleId, foundryFeatures, options),
    deleteSchedule: (
      scheduleId: string,
      foundryFeatures: "Schedules=V1Preview",
      options?: BetaSchedulesDeleteOptionalParams,
    ) => deleteSchedule(context, scheduleId, foundryFeatures, options),
||||||| /tmp/azsdk-dev-toolnFGKkd/base/sdk/ai/ai-projects/generated/classic/beta/schedules/index.ts
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
=======
    ) => createOrUpdate(context, scheduleId, schedule, options),
    list: (options?: BetaSchedulesListOptionalParams) => list(context, options),
    get: (scheduleId: string, options?: BetaSchedulesGetOptionalParams) =>
      get(context, scheduleId, options),
    delete: (scheduleId: string, options?: BetaSchedulesDeleteOptionalParams) =>
      $delete(context, scheduleId, options),
>>>>>>> /tmp/azsdk-dev-toolnFGKkd/custom/sdk/ai/ai-projects/src/classic/beta/schedules/index.ts
  };
}

export function _getBetaSchedulesOperations(context: AIProjectContext): BetaSchedulesOperations {
  return {
    ..._getBetaSchedules(context),
  };
}
