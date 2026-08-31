// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataMigrationManagementContext } from "../../api/dataMigrationManagementContext.js";
import {
  cancel,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/serviceTasks/operations.js";
import type {
  ServiceTasksCancelOptionalParams,
  ServiceTasksListOptionalParams,
  ServiceTasksDeleteOptionalParams,
  ServiceTasksUpdateOptionalParams,
  ServiceTasksCreateOrUpdateOptionalParams,
  ServiceTasksGetOptionalParams,
} from "../../api/serviceTasks/options.js";
import type { ProjectTask } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ServiceTasks operations. */
export interface ServiceTasksOperations {
  /** The service tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. This method cancels a service task if it's currently queued or running. */
  cancel: (
    groupName: string,
    serviceName: string,
    taskName: string,
    options?: ServiceTasksCancelOptionalParams,
  ) => Promise<ProjectTask>;
  /** The services resource is the top-level resource that represents the Azure Database Migration Service (classic). This method returns a list of service level tasks owned by a service resource. Some tasks may have a status of Unknown, which indicates that an error occurred while querying the status of that task. */
  list: (
    groupName: string,
    serviceName: string,
    options?: ServiceTasksListOptionalParams,
  ) => PagedAsyncIterableIterator<ProjectTask>;
  /** The service tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. The DELETE method deletes a service task, canceling it first if it's running. */
  delete: (
    groupName: string,
    serviceName: string,
    taskName: string,
    options?: ServiceTasksDeleteOptionalParams,
  ) => Promise<void>;
  /** The service tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. The PATCH method updates an existing service task, but since service tasks have no mutable custom properties, there is little reason to do so. */
  update: (
    groupName: string,
    serviceName: string,
    taskName: string,
    parameters: ProjectTask,
    options?: ServiceTasksUpdateOptionalParams,
  ) => Promise<ProjectTask>;
  /** The service tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. The PUT method creates a new service task or updates an existing one, although since service tasks have no mutable custom properties, there is little reason to update an existing one. */
  createOrUpdate: (
    groupName: string,
    serviceName: string,
    taskName: string,
    parameters: ProjectTask,
    options?: ServiceTasksCreateOrUpdateOptionalParams,
  ) => Promise<ProjectTask>;
  /** The service tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. The GET method retrieves information about a service task. */
  get: (
    groupName: string,
    serviceName: string,
    taskName: string,
    options?: ServiceTasksGetOptionalParams,
  ) => Promise<ProjectTask>;
}

function _getServiceTasks(context: DataMigrationManagementContext) {
  return {
    cancel: (
      groupName: string,
      serviceName: string,
      taskName: string,
      options?: ServiceTasksCancelOptionalParams,
    ) => cancel(context, groupName, serviceName, taskName, options),
    list: (groupName: string, serviceName: string, options?: ServiceTasksListOptionalParams) =>
      list(context, groupName, serviceName, options),
    delete: (
      groupName: string,
      serviceName: string,
      taskName: string,
      options?: ServiceTasksDeleteOptionalParams,
    ) => $delete(context, groupName, serviceName, taskName, options),
    update: (
      groupName: string,
      serviceName: string,
      taskName: string,
      parameters: ProjectTask,
      options?: ServiceTasksUpdateOptionalParams,
    ) => update(context, groupName, serviceName, taskName, parameters, options),
    createOrUpdate: (
      groupName: string,
      serviceName: string,
      taskName: string,
      parameters: ProjectTask,
      options?: ServiceTasksCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, groupName, serviceName, taskName, parameters, options),
    get: (
      groupName: string,
      serviceName: string,
      taskName: string,
      options?: ServiceTasksGetOptionalParams,
    ) => get(context, groupName, serviceName, taskName, options),
  };
}

export function _getServiceTasksOperations(
  context: DataMigrationManagementContext,
): ServiceTasksOperations {
  return {
    ..._getServiceTasks(context),
  };
}
