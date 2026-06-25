// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementContext } from "../../api/dataMigrationManagementContext.js";
import { list, $delete, update, createOrUpdate, get } from "../../api/projects/operations.js";
import {
  ProjectsListOptionalParams,
  ProjectsDeleteOptionalParams,
  ProjectsUpdateOptionalParams,
  ProjectsCreateOrUpdateOptionalParams,
  ProjectsGetOptionalParams,
} from "../../api/projects/options.js";
import { Project } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Projects operations. */
export interface ProjectsOperations {
  /** The project resource is a nested resource representing a stored migration project. This method returns a list of projects owned by a service resource. */
  list: (
    groupName: string,
    serviceName: string,
    options?: ProjectsListOptionalParams,
  ) => PagedAsyncIterableIterator<Project>;
  /** The project resource is a nested resource representing a stored migration project. The DELETE method deletes a project. */
  delete: (
    groupName: string,
    serviceName: string,
    projectName: string,
    options?: ProjectsDeleteOptionalParams,
  ) => Promise<void>;
  /** The project resource is a nested resource representing a stored migration project. The PATCH method updates an existing project. */
  update: (
    groupName: string,
    serviceName: string,
    projectName: string,
    parameters: Project,
    options?: ProjectsUpdateOptionalParams,
  ) => Promise<Project>;
  /** The project resource is a nested resource representing a stored migration project. The PUT method creates a new project or updates an existing one. */
  createOrUpdate: (
    groupName: string,
    serviceName: string,
    projectName: string,
    parameters: Project,
    options?: ProjectsCreateOrUpdateOptionalParams,
  ) => Promise<Project>;
  /** The project resource is a nested resource representing a stored migration project. The GET method retrieves information about a project. */
  get: (
    groupName: string,
    serviceName: string,
    projectName: string,
    options?: ProjectsGetOptionalParams,
  ) => Promise<Project>;
}

function _getProjects(context: DataMigrationManagementContext) {
  return {
    list: (groupName: string, serviceName: string, options?: ProjectsListOptionalParams) =>
      list(context, groupName, serviceName, options),
    delete: (
      groupName: string,
      serviceName: string,
      projectName: string,
      options?: ProjectsDeleteOptionalParams,
    ) => $delete(context, groupName, serviceName, projectName, options),
    update: (
      groupName: string,
      serviceName: string,
      projectName: string,
      parameters: Project,
      options?: ProjectsUpdateOptionalParams,
    ) => update(context, groupName, serviceName, projectName, parameters, options),
    createOrUpdate: (
      groupName: string,
      serviceName: string,
      projectName: string,
      parameters: Project,
      options?: ProjectsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, groupName, serviceName, projectName, parameters, options),
    get: (
      groupName: string,
      serviceName: string,
      projectName: string,
      options?: ProjectsGetOptionalParams,
    ) => get(context, groupName, serviceName, projectName, options),
  };
}

export function _getProjectsOperations(
  context: DataMigrationManagementContext,
): ProjectsOperations {
  return {
    ..._getProjects(context),
  };
}
