// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext } from "../../api/devCenterContext.js";
import {
  listByPool,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/schedules/operations.js";
import type {
  SchedulesListByPoolOptionalParams,
  SchedulesDeleteOptionalParams,
  SchedulesUpdateOptionalParams,
  SchedulesCreateOrUpdateOptionalParams,
  SchedulesGetOptionalParams,
} from "../../api/schedules/options.js";
import type { Schedule, ScheduleUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Schedules operations. */
export interface SchedulesOperations {
  /** Lists schedules for a pool. */
  listByPool: (
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    options?: SchedulesListByPoolOptionalParams,
  ) => PagedAsyncIterableIterator<Schedule>;
  /** Deletes a Schedule. */
  delete: (
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    scheduleName: string,
    options?: SchedulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Partially updates a Schedule. */
  update: (
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    scheduleName: string,
    body: ScheduleUpdate,
    options?: SchedulesUpdateOptionalParams,
  ) => PollerLike<OperationState<Schedule>, Schedule>;
  /** Creates or updates a Schedule. */
  createOrUpdate: (
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    scheduleName: string,
    body: Schedule,
    options?: SchedulesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Schedule>, Schedule>;
  /** Gets a schedule resource. */
  get: (
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    scheduleName: string,
    options?: SchedulesGetOptionalParams,
  ) => Promise<Schedule>;
}

function _getSchedules(context: DevCenterContext) {
  return {
    listByPool: (
      resourceGroupName: string,
      projectName: string,
      poolName: string,
      options?: SchedulesListByPoolOptionalParams,
    ) => listByPool(context, resourceGroupName, projectName, poolName, options),
    delete: (
      resourceGroupName: string,
      projectName: string,
      poolName: string,
      scheduleName: string,
      options?: SchedulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, projectName, poolName, scheduleName, options),
    update: (
      resourceGroupName: string,
      projectName: string,
      poolName: string,
      scheduleName: string,
      body: ScheduleUpdate,
      options?: SchedulesUpdateOptionalParams,
    ) => update(context, resourceGroupName, projectName, poolName, scheduleName, body, options),
    createOrUpdate: (
      resourceGroupName: string,
      projectName: string,
      poolName: string,
      scheduleName: string,
      body: Schedule,
      options?: SchedulesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        projectName,
        poolName,
        scheduleName,
        body,
        options,
      ),
    get: (
      resourceGroupName: string,
      projectName: string,
      poolName: string,
      scheduleName: string,
      options?: SchedulesGetOptionalParams,
    ) => get(context, resourceGroupName, projectName, poolName, scheduleName, options),
  };
}

export function _getSchedulesOperations(context: DevCenterContext): SchedulesOperations {
  return {
    ..._getSchedules(context),
  };
}
