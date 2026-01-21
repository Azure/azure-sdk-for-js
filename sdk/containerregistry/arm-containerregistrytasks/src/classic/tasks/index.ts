// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerRegistryTasksManagementContext } from "../../api/containerRegistryTasksManagementContext.js";
import { getDetails, list, $delete, update, create, get } from "../../api/tasks/operations.js";
import type {
  TasksGetDetailsOptionalParams,
  TasksListOptionalParams,
  TasksDeleteOptionalParams,
  TasksUpdateOptionalParams,
  TasksCreateOptionalParams,
  TasksGetOptionalParams,
} from "../../api/tasks/options.js";
import type { Task, TaskUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Tasks operations. */
export interface TasksOperations {
  /** Returns a task with extended information that includes all secrets. */
  getDetails: (
    resourceGroupName: string,
    registryName: string,
    taskName: string,
    options?: TasksGetDetailsOptionalParams,
  ) => Promise<Task>;
  /** Lists all the tasks for a specified container registry. */
  list: (
    resourceGroupName: string,
    registryName: string,
    options?: TasksListOptionalParams,
  ) => PagedAsyncIterableIterator<Task>;
  /** Deletes a specified task. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    registryName: string,
    taskName: string,
    options?: TasksDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a task with the specified parameters. */
  update: (
    resourceGroupName: string,
    registryName: string,
    taskName: string,
    taskUpdateParameters: TaskUpdateParameters,
    options?: TasksUpdateOptionalParams,
  ) => Promise<Task>;
  /** Creates a task for a container registry with the specified parameters. */
  create: (
    resourceGroupName: string,
    registryName: string,
    taskName: string,
    taskCreateParameters: Task,
    options?: TasksCreateOptionalParams,
  ) => Promise<Task>;
  /** Get the properties of a specified task. */
  get: (
    resourceGroupName: string,
    registryName: string,
    taskName: string,
    options?: TasksGetOptionalParams,
  ) => Promise<Task>;
}

function _getTasks(context: ContainerRegistryTasksManagementContext) {
  return {
    getDetails: (
      resourceGroupName: string,
      registryName: string,
      taskName: string,
      options?: TasksGetDetailsOptionalParams,
    ) => getDetails(context, resourceGroupName, registryName, taskName, options),
    list: (resourceGroupName: string, registryName: string, options?: TasksListOptionalParams) =>
      list(context, resourceGroupName, registryName, options),
    delete: (
      resourceGroupName: string,
      registryName: string,
      taskName: string,
      options?: TasksDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, registryName, taskName, options),
    update: (
      resourceGroupName: string,
      registryName: string,
      taskName: string,
      taskUpdateParameters: TaskUpdateParameters,
      options?: TasksUpdateOptionalParams,
    ) => update(context, resourceGroupName, registryName, taskName, taskUpdateParameters, options),
    create: (
      resourceGroupName: string,
      registryName: string,
      taskName: string,
      taskCreateParameters: Task,
      options?: TasksCreateOptionalParams,
    ) => create(context, resourceGroupName, registryName, taskName, taskCreateParameters, options),
    get: (
      resourceGroupName: string,
      registryName: string,
      taskName: string,
      options?: TasksGetOptionalParams,
    ) => get(context, resourceGroupName, registryName, taskName, options),
  };
}

export function _getTasksOperations(
  context: ContainerRegistryTasksManagementContext,
): TasksOperations {
  return {
    ..._getTasks(context),
  };
}
