// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DiscoveryContext } from "../../api/discoveryContext.js";
import {
  listByWorkspace,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/projects/operations.js";
import type {
  ProjectsListByWorkspaceOptionalParams,
  ProjectsDeleteOptionalParams,
  ProjectsUpdateOptionalParams,
  ProjectsCreateOrUpdateOptionalParams,
  ProjectsGetOptionalParams,
} from "../../api/projects/options.js";
import type { Project, ProjectUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Projects operations. */
export interface ProjectsOperations {
  /** List Project resources by Workspace */
  listByWorkspace: (
    resourceGroupName: string,
    workspaceName: string,
    options?: ProjectsListByWorkspaceOptionalParams,
  ) => PagedAsyncIterableIterator<Project>;
  /** Delete a Project */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    projectName: string,
    options?: ProjectsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a Project */
  update: (
    resourceGroupName: string,
    workspaceName: string,
    projectName: string,
    properties: ProjectUpdate,
    options?: ProjectsUpdateOptionalParams,
  ) => PollerLike<OperationState<Project>, Project>;
  /** Create a Project */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    projectName: string,
    resource: Project,
    options?: ProjectsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Project>, Project>;
  /** Get a Project */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    projectName: string,
    options?: ProjectsGetOptionalParams,
  ) => Promise<Project>;
}

function _getProjects(context: DiscoveryContext) {
  return {
    listByWorkspace: (
      resourceGroupName: string,
      workspaceName: string,
      options?: ProjectsListByWorkspaceOptionalParams,
    ) => listByWorkspace(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      projectName: string,
      options?: ProjectsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, projectName, options),
    update: (
      resourceGroupName: string,
      workspaceName: string,
      projectName: string,
      properties: ProjectUpdate,
      options?: ProjectsUpdateOptionalParams,
    ) => update(context, resourceGroupName, workspaceName, projectName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      projectName: string,
      resource: Project,
      options?: ProjectsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, projectName, resource, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      projectName: string,
      options?: ProjectsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, projectName, options),
  };
}

export function _getProjectsOperations(context: DiscoveryContext): ProjectsOperations {
  return {
    ..._getProjects(context),
  };
}
