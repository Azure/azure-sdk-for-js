// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DurableTaskContext } from "../../api/durableTaskContext.js";
import { TaskHub } from "../../models/models.js";
import {
  TaskHubsListBySchedulerOptionalParams,
  TaskHubsDeleteOptionalParams,
  TaskHubsCreateOrUpdateOptionalParams,
  TaskHubsGetOptionalParams,
} from "../../api/taskHubs/options.js";
import { listByScheduler, $delete, createOrUpdate, get } from "../../api/taskHubs/operations.js";
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
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
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
    ) => listByScheduler(context, resourceGroupName, schedulerName, options),
    delete: (
      resourceGroupName: string,
      schedulerName: string,
      taskHubName: string,
      options?: TaskHubsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, schedulerName, taskHubName, options),
    createOrUpdate: (
      resourceGroupName: string,
      schedulerName: string,
      taskHubName: string,
      resource: TaskHub,
      options?: TaskHubsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, schedulerName, taskHubName, resource, options),
    get: (
      resourceGroupName: string,
      schedulerName: string,
      taskHubName: string,
      options?: TaskHubsGetOptionalParams,
    ) => get(context, resourceGroupName, schedulerName, taskHubName, options),
  };
}

export function _getTaskHubsOperations(context: DurableTaskContext): TaskHubsOperations {
  return {
    ..._getTaskHubs(context),
  };
}
