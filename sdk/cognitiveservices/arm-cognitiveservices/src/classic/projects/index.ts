// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { list, $delete, update, create, get } from "../../api/projects/operations.js";
import type {
  ProjectsListOptionalParams,
  ProjectsDeleteOptionalParams,
  ProjectsUpdateOptionalParams,
  ProjectsCreateOptionalParams,
  ProjectsGetOptionalParams,
} from "../../api/projects/options.js";
import type { Project } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Projects operations. */
export interface ProjectsOperations {
  /** Returns all the projects in a Cognitive Services account. */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: ProjectsListOptionalParams,
  ) => PagedAsyncIterableIterator<Project>;
  /** Deletes a Cognitive Services project from the resource group. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    options?: ProjectsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a Cognitive Services Project */
  update: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    project: Project,
    options?: ProjectsUpdateOptionalParams,
  ) => PollerLike<OperationState<Project>, Project>;
  /** Create Cognitive Services Account's Project. Project is a sub-resource of an account which give AI developer it's individual container to work on. */
  create: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    project: Project,
    options?: ProjectsCreateOptionalParams,
  ) => PollerLike<OperationState<Project>, Project>;
  /** Returns a Cognitive Services project specified by the parameters. */
  get: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    options?: ProjectsGetOptionalParams,
  ) => Promise<Project>;
}

function _getProjects(context: CognitiveServicesManagementContext) {
  return {
    list: (resourceGroupName: string, accountName: string, options?: ProjectsListOptionalParams) =>
      list(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      options?: ProjectsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, projectName, options),
    update: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      project: Project,
      options?: ProjectsUpdateOptionalParams,
    ) => update(context, resourceGroupName, accountName, projectName, project, options),
    create: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      project: Project,
      options?: ProjectsCreateOptionalParams,
    ) => create(context, resourceGroupName, accountName, projectName, project, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      options?: ProjectsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, projectName, options),
  };
}

export function _getProjectsOperations(
  context: CognitiveServicesManagementContext,
): ProjectsOperations {
  return {
    ..._getProjects(context),
  };
}
