// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DurableTaskContext } from "../../api/durableTaskContext.js";
import {
  TaskHubsGetOptionalParams,
  TaskHubsCreateOrUpdateOptionalParams,
  TaskHubsDeleteOptionalParams,
  TaskHubsListBySchedulerOptionalParams,
} from "../../api/options.js";
import {
  taskHubsGet,
  taskHubsCreateOrUpdate,
  taskHubsDelete,
  taskHubsListByScheduler,
} from "../../api/taskHubs/index.js";
import { TaskHub } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a TaskHubs operations. */
export interface TaskHubsOperations {
  /** Get a Task Hub */
  get: (
    resourceGroupName: string,
    schedulerName: string,
    taskHubName: string,
    options?: TaskHubsGetOptionalParams,
  ) => Promise<TaskHub>;
  /** Create or Update a Task Hub */
  createOrUpdate: (
    resourceGroupName: string,
    schedulerName: string,
    taskHubName: string,
    resource: TaskHub,
    options?: TaskHubsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<TaskHub>, TaskHub>;
  /** Delete a Task Hub */
  delete: (
    resourceGroupName: string,
    schedulerName: string,
    taskHubName: string,
    options?: TaskHubsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List Task Hubs */
  listByScheduler: (
    resourceGroupName: string,
    schedulerName: string,
    options?: TaskHubsListBySchedulerOptionalParams,
  ) => PagedAsyncIterableIterator<TaskHub>;
}

export function getTaskHubs(
  context: DurableTaskContext,
  subscriptionId: string,
) {
  return {
    get: (
      resourceGroupName: string,
      schedulerName: string,
      taskHubName: string,
      options?: TaskHubsGetOptionalParams,
    ) =>
      taskHubsGet(
        context,
        subscriptionId,
        resourceGroupName,
        schedulerName,
        taskHubName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      schedulerName: string,
      taskHubName: string,
      resource: TaskHub,
      options?: TaskHubsCreateOrUpdateOptionalParams,
    ) =>
      taskHubsCreateOrUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        schedulerName,
        taskHubName,
        resource,
        options,
      ),
    delete: (
      resourceGroupName: string,
      schedulerName: string,
      taskHubName: string,
      options?: TaskHubsDeleteOptionalParams,
    ) =>
      taskHubsDelete(
        context,
        subscriptionId,
        resourceGroupName,
        schedulerName,
        taskHubName,
        options,
      ),
    listByScheduler: (
      resourceGroupName: string,
      schedulerName: string,
      options?: TaskHubsListBySchedulerOptionalParams,
    ) =>
      taskHubsListByScheduler(
        context,
        subscriptionId,
        resourceGroupName,
        schedulerName,
        options,
      ),
  };
}

export function getTaskHubsOperations(
  context: DurableTaskContext,
  subscriptionId: string,
): TaskHubsOperations {
  return {
    ...getTaskHubs(context, subscriptionId),
  };
}
