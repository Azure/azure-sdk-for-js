// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DurableTaskContext } from "../../api/durableTaskContext.js";
import {
  listByTaskHub,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/taskQueues/operations.js";
import type {
  TaskQueuesListByTaskHubOptionalParams,
  TaskQueuesDeleteOptionalParams,
  TaskQueuesUpdateOptionalParams,
  TaskQueuesCreateOrUpdateOptionalParams,
  TaskQueuesGetOptionalParams,
} from "../../api/taskQueues/options.js";
import type { TaskQueue, TaskQueueUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a TaskQueues operations. */
export interface TaskQueuesOperations {
  /** List Task Queues by Task Hub */
  listByTaskHub: (
    resourceGroupName: string,
    schedulerName: string,
    taskHubName: string,
    options?: TaskQueuesListByTaskHubOptionalParams,
  ) => PagedAsyncIterableIterator<TaskQueue>;
  /** Delete a Task Queue */
  delete: (
    resourceGroupName: string,
    schedulerName: string,
    taskHubName: string,
    taskQueueName: string,
    options?: TaskQueuesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a Task Queue */
  update: (
    resourceGroupName: string,
    schedulerName: string,
    taskHubName: string,
    taskQueueName: string,
    properties: TaskQueueUpdate,
    options?: TaskQueuesUpdateOptionalParams,
  ) => PollerLike<OperationState<TaskQueue>, TaskQueue>;
  /** Create or update a Task Queue */
  createOrUpdate: (
    resourceGroupName: string,
    schedulerName: string,
    taskHubName: string,
    taskQueueName: string,
    resource: TaskQueue,
    options?: TaskQueuesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<TaskQueue>, TaskQueue>;
  /** Get a Task Queue */
  get: (
    resourceGroupName: string,
    schedulerName: string,
    taskHubName: string,
    taskQueueName: string,
    options?: TaskQueuesGetOptionalParams,
  ) => Promise<TaskQueue>;
}

function _getTaskQueues(context: DurableTaskContext) {
  return {
    listByTaskHub: (
      resourceGroupName: string,
      schedulerName: string,
      taskHubName: string,
      options?: TaskQueuesListByTaskHubOptionalParams,
    ) => listByTaskHub(context, resourceGroupName, schedulerName, taskHubName, options),
    delete: (
      resourceGroupName: string,
      schedulerName: string,
      taskHubName: string,
      taskQueueName: string,
      options?: TaskQueuesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, schedulerName, taskHubName, taskQueueName, options),
    update: (
      resourceGroupName: string,
      schedulerName: string,
      taskHubName: string,
      taskQueueName: string,
      properties: TaskQueueUpdate,
      options?: TaskQueuesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        schedulerName,
        taskHubName,
        taskQueueName,
        properties,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      schedulerName: string,
      taskHubName: string,
      taskQueueName: string,
      resource: TaskQueue,
      options?: TaskQueuesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        schedulerName,
        taskHubName,
        taskQueueName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      schedulerName: string,
      taskHubName: string,
      taskQueueName: string,
      options?: TaskQueuesGetOptionalParams,
    ) => get(context, resourceGroupName, schedulerName, taskHubName, taskQueueName, options),
  };
}

export function _getTaskQueuesOperations(context: DurableTaskContext): TaskQueuesOperations {
  return {
    ..._getTaskQueues(context),
  };
}
