// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataMigrationManagementContext } from "../../api/dataMigrationManagementContext.js";
import {
  command,
  cancel,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/tasks/operations.js";
import type {
  TasksCommandOptionalParams,
  TasksCancelOptionalParams,
  TasksListOptionalParams,
  TasksDeleteOptionalParams,
  TasksUpdateOptionalParams,
  TasksCreateOrUpdateOptionalParams,
  TasksGetOptionalParams,
} from "../../api/tasks/options.js";
import type { ProjectTask, CommandPropertiesUnion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Tasks operations. */
export interface TasksOperations {
  /** The tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. This method executes a command on a running task. */
  command: (
    groupName: string,
    serviceName: string,
    projectName: string,
    taskName: string,
    parameters: CommandPropertiesUnion,
    options?: TasksCommandOptionalParams,
  ) => Promise<CommandPropertiesUnion>;
  /** The tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. This method cancels a task if it's currently queued or running. */
  cancel: (
    groupName: string,
    serviceName: string,
    projectName: string,
    taskName: string,
    options?: TasksCancelOptionalParams,
  ) => Promise<ProjectTask>;
  /** The services resource is the top-level resource that represents the Azure Database Migration Service (classic). This method returns a list of tasks owned by a service resource. Some tasks may have a status of Unknown, which indicates that an error occurred while querying the status of that task. */
  list: (
    groupName: string,
    serviceName: string,
    projectName: string,
    options?: TasksListOptionalParams,
  ) => PagedAsyncIterableIterator<ProjectTask>;
  /** The tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. The DELETE method deletes a task, canceling it first if it's running. */
  delete: (
    groupName: string,
    serviceName: string,
    projectName: string,
    taskName: string,
    options?: TasksDeleteOptionalParams,
  ) => Promise<void>;
  /** The tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. The PATCH method updates an existing task, but since tasks have no mutable custom properties, there is little reason to do so. */
  update: (
    groupName: string,
    serviceName: string,
    projectName: string,
    taskName: string,
    parameters: ProjectTask,
    options?: TasksUpdateOptionalParams,
  ) => Promise<ProjectTask>;
  /** The tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. The PUT method creates a new task or updates an existing one, although since tasks have no mutable custom properties, there is little reason to update an existing one. */
  createOrUpdate: (
    groupName: string,
    serviceName: string,
    projectName: string,
    taskName: string,
    parameters: ProjectTask,
    options?: TasksCreateOrUpdateOptionalParams,
  ) => Promise<ProjectTask>;
  /** The tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. The GET method retrieves information about a task. */
  get: (
    groupName: string,
    serviceName: string,
    projectName: string,
    taskName: string,
    options?: TasksGetOptionalParams,
  ) => Promise<ProjectTask>;
}

function _getTasks(context: DataMigrationManagementContext) {
  return {
    command: (
      groupName: string,
      serviceName: string,
      projectName: string,
      taskName: string,
      parameters: CommandPropertiesUnion,
      options?: TasksCommandOptionalParams,
    ) => command(context, groupName, serviceName, projectName, taskName, parameters, options),
    cancel: (
      groupName: string,
      serviceName: string,
      projectName: string,
      taskName: string,
      options?: TasksCancelOptionalParams,
    ) => cancel(context, groupName, serviceName, projectName, taskName, options),
    list: (
      groupName: string,
      serviceName: string,
      projectName: string,
      options?: TasksListOptionalParams,
    ) => list(context, groupName, serviceName, projectName, options),
    delete: (
      groupName: string,
      serviceName: string,
      projectName: string,
      taskName: string,
      options?: TasksDeleteOptionalParams,
    ) => $delete(context, groupName, serviceName, projectName, taskName, options),
    update: (
      groupName: string,
      serviceName: string,
      projectName: string,
      taskName: string,
      parameters: ProjectTask,
      options?: TasksUpdateOptionalParams,
    ) => update(context, groupName, serviceName, projectName, taskName, parameters, options),
    createOrUpdate: (
      groupName: string,
      serviceName: string,
      projectName: string,
      taskName: string,
      parameters: ProjectTask,
      options?: TasksCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, groupName, serviceName, projectName, taskName, parameters, options),
    get: (
      groupName: string,
      serviceName: string,
      projectName: string,
      taskName: string,
      options?: TasksGetOptionalParams,
    ) => get(context, groupName, serviceName, projectName, taskName, options),
  };
}

export function _getTasksOperations(context: DataMigrationManagementContext): TasksOperations {
  return {
    ..._getTasks(context),
  };
}
