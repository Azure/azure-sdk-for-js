// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerRegistryTasksManagementContext } from "../../api/containerRegistryTasksManagementContext.js";
import { getDetails, list, $delete, update, create, get } from "../../api/taskRuns/operations.js";
import type {
  TaskRunsGetDetailsOptionalParams,
  TaskRunsListOptionalParams,
  TaskRunsDeleteOptionalParams,
  TaskRunsUpdateOptionalParams,
  TaskRunsCreateOptionalParams,
  TaskRunsGetOptionalParams,
} from "../../api/taskRuns/options.js";
import type { TaskRun, TaskRunUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a TaskRuns operations. */
export interface TaskRunsOperations {
  /** Gets the detailed information for a given task run that includes all secrets. */
  getDetails: (
    resourceGroupName: string,
    registryName: string,
    taskRunName: string,
    options?: TaskRunsGetDetailsOptionalParams,
  ) => Promise<TaskRun>;
  /** Lists all the task runs for a specified container registry. */
  list: (
    resourceGroupName: string,
    registryName: string,
    options?: TaskRunsListOptionalParams,
  ) => PagedAsyncIterableIterator<TaskRun>;
  /** Deletes a specified task run resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    registryName: string,
    taskRunName: string,
    options?: TaskRunsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a task run with the specified parameters. */
  update: (
    resourceGroupName: string,
    registryName: string,
    taskRunName: string,
    updateParameters: TaskRunUpdateParameters,
    options?: TaskRunsUpdateOptionalParams,
  ) => PollerLike<OperationState<TaskRun>, TaskRun>;
  /** Creates a task run for a container registry with the specified parameters. */
  create: (
    resourceGroupName: string,
    registryName: string,
    taskRunName: string,
    taskRun: TaskRun,
    options?: TaskRunsCreateOptionalParams,
  ) => PollerLike<OperationState<TaskRun>, TaskRun>;
  /** Gets the detailed information for a given task run. */
  get: (
    resourceGroupName: string,
    registryName: string,
    taskRunName: string,
    options?: TaskRunsGetOptionalParams,
  ) => Promise<TaskRun>;
}

function _getTaskRuns(context: ContainerRegistryTasksManagementContext) {
  return {
    getDetails: (
      resourceGroupName: string,
      registryName: string,
      taskRunName: string,
      options?: TaskRunsGetDetailsOptionalParams,
    ) => getDetails(context, resourceGroupName, registryName, taskRunName, options),
    list: (resourceGroupName: string, registryName: string, options?: TaskRunsListOptionalParams) =>
      list(context, resourceGroupName, registryName, options),
    delete: (
      resourceGroupName: string,
      registryName: string,
      taskRunName: string,
      options?: TaskRunsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, registryName, taskRunName, options),
    update: (
      resourceGroupName: string,
      registryName: string,
      taskRunName: string,
      updateParameters: TaskRunUpdateParameters,
      options?: TaskRunsUpdateOptionalParams,
    ) => update(context, resourceGroupName, registryName, taskRunName, updateParameters, options),
    create: (
      resourceGroupName: string,
      registryName: string,
      taskRunName: string,
      taskRun: TaskRun,
      options?: TaskRunsCreateOptionalParams,
    ) => create(context, resourceGroupName, registryName, taskRunName, taskRun, options),
    get: (
      resourceGroupName: string,
      registryName: string,
      taskRunName: string,
      options?: TaskRunsGetOptionalParams,
    ) => get(context, resourceGroupName, registryName, taskRunName, options),
  };
}

export function _getTaskRunsOperations(
  context: ContainerRegistryTasksManagementContext,
): TaskRunsOperations {
  return {
    ..._getTaskRuns(context),
  };
}
