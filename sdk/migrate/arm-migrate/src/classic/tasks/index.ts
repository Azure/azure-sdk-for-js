// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MigrateContext } from "../../api/migrateContext.js";
import { getSummary, $delete, listByParent, get, create } from "../../api/tasks/operations.js";
import type {
  TasksGetSummaryOptionalParams,
  TasksDeleteOptionalParams,
  TasksListByParentOptionalParams,
  TasksGetOptionalParams,
  TasksCreateOptionalParams,
} from "../../api/tasks/options.js";
import type {
  TaskCreate,
  Task,
  TaskSummaryRequest,
  TaskSummaryResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Tasks operations. */
export interface TasksOperations {
  /** Retrieves task summary across all tasks in the project. */
  getSummary: (
    resourceGroupName: string,
    projectName: string,
    body: TaskSummaryRequest,
    options?: TasksGetSummaryOptionalParams,
  ) => Promise<TaskSummaryResponse>;
  /** Delete a Task */
  delete: (
    resourceGroupName: string,
    projectName: string,
    taskName: string,
    options?: TasksDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List Task resources by MigrateProject */
  listByParent: (
    resourceGroupName: string,
    projectName: string,
    options?: TasksListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<Task>;
  /** Get a Task */
  get: (
    resourceGroupName: string,
    projectName: string,
    taskName: string,
    options?: TasksGetOptionalParams,
  ) => Promise<Task>;
  /** Create a Task */
  create: (
    resourceGroupName: string,
    projectName: string,
    taskName: string,
    resource: TaskCreate,
    options?: TasksCreateOptionalParams,
  ) => PollerLike<OperationState<Task>, Task>;
}

function _getTasks(context: MigrateContext) {
  return {
    getSummary: (
      resourceGroupName: string,
      projectName: string,
      body: TaskSummaryRequest,
      options?: TasksGetSummaryOptionalParams,
    ) => getSummary(context, resourceGroupName, projectName, body, options),
    delete: (
      resourceGroupName: string,
      projectName: string,
      taskName: string,
      options?: TasksDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, projectName, taskName, options),
    listByParent: (
      resourceGroupName: string,
      projectName: string,
      options?: TasksListByParentOptionalParams,
    ) => listByParent(context, resourceGroupName, projectName, options),
    get: (
      resourceGroupName: string,
      projectName: string,
      taskName: string,
      options?: TasksGetOptionalParams,
    ) => get(context, resourceGroupName, projectName, taskName, options),
    create: (
      resourceGroupName: string,
      projectName: string,
      taskName: string,
      resource: TaskCreate,
      options?: TasksCreateOptionalParams,
    ) => create(context, resourceGroupName, projectName, taskName, resource, options),
  };
}

export function _getTasksOperations(context: MigrateContext): TasksOperations {
  return {
    ..._getTasks(context),
  };
}
