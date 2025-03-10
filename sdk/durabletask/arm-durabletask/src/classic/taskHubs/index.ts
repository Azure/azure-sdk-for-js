// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DurableTaskContext } from "../../api/durableTaskContext.js";
import {
  TaskHubsListBySchedulerOptionalParams,
  TaskHubsDeleteOptionalParams,
  TaskHubsCreateOrUpdateOptionalParams,
  TaskHubsGetOptionalParams,
} from "../../api/options.js";
import {
  taskHubsListByScheduler,
  taskHubsDelete,
  taskHubsCreateOrUpdate,
  taskHubsGet,
} from "../../api/taskHubs/index.js";
import { TaskHub } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a TaskHubs operations. */
export interface TaskHubsOperations {
  /** List Task Hubs */
  listByScheduler: (
    resourceGroupName: string,
    schedulerName: string,
    options?: TaskHubsListBySchedulerOptionalParams,
  ) => PagedAsyncIterableIterator<TaskHub>;
  /** Delete a Task Hub */
  delete: (
    resourceGroupName: string,
    schedulerName: string,
    taskHubName: string,
    options?: TaskHubsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or Update a Task Hub */
  createOrUpdate: (
    resourceGroupName: string,
    schedulerName: string,
    taskHubName: string,
    resource: TaskHub,
    options?: TaskHubsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<TaskHub>, TaskHub>;
  /** Get a Task Hub */
  get: (
    resourceGroupName: string,
    schedulerName: string,
    taskHubName: string,
    options?: TaskHubsGetOptionalParams,
  ) => Promise<TaskHub>;
}

function _getTaskHubs(context: DurableTaskContext) {
  return {
    listByScheduler: (
      resourceGroupName: string,
      schedulerName: string,
      options?: TaskHubsListBySchedulerOptionalParams,
    ) => taskHubsListByScheduler(context, resourceGroupName, schedulerName, options),
    delete: (
      resourceGroupName: string,
      schedulerName: string,
      taskHubName: string,
      options?: TaskHubsDeleteOptionalParams,
    ) => taskHubsDelete(context, resourceGroupName, schedulerName, taskHubName, options),
    createOrUpdate: (
      resourceGroupName: string,
      schedulerName: string,
      taskHubName: string,
      resource: TaskHub,
      options?: TaskHubsCreateOrUpdateOptionalParams,
    ) =>
      taskHubsCreateOrUpdate(
        context,
        resourceGroupName,
        schedulerName,
        taskHubName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      schedulerName: string,
      taskHubName: string,
      options?: TaskHubsGetOptionalParams,
    ) => taskHubsGet(context, resourceGroupName, schedulerName, taskHubName, options),
  };
}

export function _getTaskHubsOperations(context: DurableTaskContext): TaskHubsOperations {
  return {
    ..._getTaskHubs(context),
  };
}
