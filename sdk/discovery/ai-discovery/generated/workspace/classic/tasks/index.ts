// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkspaceContext } from "../../api/workspaceContext.js";
import {
  Task,
  TaskComment,
  ExecutionHistoryEntry,
} from "../../../models/microsoft/discovery/workspace/models.js";
import { PagedAsyncIterableIterator } from "../../../static-helpers/pagingHelpers.js";
import {
  addExecutionHistory,
  addComment,
  start,
  $delete,
  stableUpdate,
  create,
  list,
  get,
} from "../../api/tasks/operations.js";
import {
  TasksAddExecutionHistoryOptionalParams,
  TasksAddCommentOptionalParams,
  TasksStartOptionalParams,
  TasksDeleteOptionalParams,
  TasksStableUpdateOptionalParams,
  TasksCreateOptionalParams,
  TasksListOptionalParams,
  TasksGetOptionalParams,
} from "../../api/tasks/options.js";

/** Interface representing a Tasks operations. */
export interface TasksOperations {
  /** Add an execution history entry to a task. */
  addExecutionHistory: (
    projectName: string,
    investigationName: string,
    taskName: string,
    body: ExecutionHistoryEntry,
    options?: TasksAddExecutionHistoryOptionalParams,
  ) => Promise<Task>;
  /** Add a comment to a task. */
  addComment: (
    projectName: string,
    investigationName: string,
    taskName: string,
    body: TaskComment,
    options?: TasksAddCommentOptionalParams,
  ) => Promise<Task>;
  /** Start execution of a task. */
  start: (
    projectName: string,
    investigationName: string,
    taskName: string,
    options?: TasksStartOptionalParams,
  ) => Promise<Task>;
  /** Delete a task by ID. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    projectName: string,
    investigationName: string,
    taskName: string,
    options?: TasksDeleteOptionalParams,
  ) => Promise<void>;
  /** Patch (partial update) a task (e.g. status, description, validation requirements, dependencies, result). */
  stableUpdate: (
    projectName: string,
    investigationName: string,
    taskName: string,
    resource: Task,
    options?: TasksStableUpdateOptionalParams,
  ) => Promise<Task>;
  /** Create a new task. */
  create: (
    projectName: string,
    investigationName: string,
    body: Task,
    options?: TasksCreateOptionalParams,
  ) => Promise<Task>;
  /** List tasks with optional OData filters. */
  list: (
    projectName: string,
    investigationName: string,
    options?: TasksListOptionalParams,
  ) => PagedAsyncIterableIterator<Task>;
  /** Get a task by ID. */
  get: (
    projectName: string,
    investigationName: string,
    taskName: string,
    options?: TasksGetOptionalParams,
  ) => Promise<Task>;
}
function _getTasks(context: WorkspaceContext) {
  return {
    addExecutionHistory: (
      projectName: string,
      investigationName: string,
      taskName: string,
      body: ExecutionHistoryEntry,
      options?: TasksAddExecutionHistoryOptionalParams,
    ) => addExecutionHistory(context, projectName, investigationName, taskName, body, options),
    addComment: (
      projectName: string,
      investigationName: string,
      taskName: string,
      body: TaskComment,
      options?: TasksAddCommentOptionalParams,
    ) => addComment(context, projectName, investigationName, taskName, body, options),
    start: (
      projectName: string,
      investigationName: string,
      taskName: string,
      options?: TasksStartOptionalParams,
    ) => start(context, projectName, investigationName, taskName, options),
    delete: (
      projectName: string,
      investigationName: string,
      taskName: string,
      options?: TasksDeleteOptionalParams,
    ) => $delete(context, projectName, investigationName, taskName, options),
    stableUpdate: (
      projectName: string,
      investigationName: string,
      taskName: string,
      resource: Task,
      options?: TasksStableUpdateOptionalParams,
    ) => stableUpdate(context, projectName, investigationName, taskName, resource, options),
    create: (
      projectName: string,
      investigationName: string,
      body: Task,
      options?: TasksCreateOptionalParams,
    ) => create(context, projectName, investigationName, body, options),
    list: (projectName: string, investigationName: string, options?: TasksListOptionalParams) =>
      list(context, projectName, investigationName, options),
    get: (
      projectName: string,
      investigationName: string,
      taskName: string,
      options?: TasksGetOptionalParams,
    ) => get(context, projectName, investigationName, taskName, options),
  };
}
export function _getTasksOperations(context: WorkspaceContext): TasksOperations {
  return {
    ..._getTasks(context),
  };
}
