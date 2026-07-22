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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    scheduleName: string,
    options?: SchedulesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    scheduleName: string,
    options?: SchedulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Partially updates a Schedule. */
  update: (
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    scheduleName: string,
    body: ScheduleUpdate,
    options?: SchedulesUpdateOptionalParams,
  ) => PollerLike<OperationState<Schedule>, Schedule>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    scheduleName: string,
    body: ScheduleUpdate,
    options?: SchedulesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Schedule>, Schedule>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    scheduleName: string,
    body: ScheduleUpdate,
    options?: SchedulesUpdateOptionalParams,
  ) => Promise<Schedule>;
  /** Creates or updates a Schedule. */
  createOrUpdate: (
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    scheduleName: string,
    body: Schedule,
    options?: SchedulesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Schedule>, Schedule>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    scheduleName: string,
    body: Schedule,
    options?: SchedulesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Schedule>, Schedule>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    projectName: string,
    poolName: string,
    scheduleName: string,
    body: Schedule,
    options?: SchedulesCreateOrUpdateOptionalParams,
  ) => Promise<Schedule>;
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
    beginDelete: async (
      resourceGroupName: string,
      projectName: string,
      poolName: string,
      scheduleName: string,
      options?: SchedulesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        projectName,
        poolName,
        scheduleName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      projectName: string,
      poolName: string,
      scheduleName: string,
      options?: SchedulesDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        projectName,
        poolName,
        scheduleName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      projectName: string,
      poolName: string,
      scheduleName: string,
      body: ScheduleUpdate,
      options?: SchedulesUpdateOptionalParams,
    ) => update(context, resourceGroupName, projectName, poolName, scheduleName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      projectName: string,
      poolName: string,
      scheduleName: string,
      body: ScheduleUpdate,
      options?: SchedulesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        projectName,
        poolName,
        scheduleName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      projectName: string,
      poolName: string,
      scheduleName: string,
      body: ScheduleUpdate,
      options?: SchedulesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        projectName,
        poolName,
        scheduleName,
        body,
        options,
      );
    },
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
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      projectName: string,
      poolName: string,
      scheduleName: string,
      body: Schedule,
      options?: SchedulesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        projectName,
        poolName,
        scheduleName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      projectName: string,
      poolName: string,
      scheduleName: string,
      body: Schedule,
      options?: SchedulesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        projectName,
        poolName,
        scheduleName,
        body,
        options,
      );
    },
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
