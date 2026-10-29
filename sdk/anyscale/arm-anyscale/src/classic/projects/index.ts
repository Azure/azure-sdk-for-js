// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PlatformContext } from "../../api/platformContext.js";
import {
  listByResourceGroup,
  $delete,
  createOrUpdate,
  get,
} from "../../api/projects/operations.js";
import type {
  ProjectsListByResourceGroupOptionalParams,
  ProjectsDeleteOptionalParams,
  ProjectsCreateOrUpdateOptionalParams,
  ProjectsGetOptionalParams,
} from "../../api/projects/options.js";
import type { Project } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Projects operations. */
export interface ProjectsOperations {
  /** Lists projects in a cloud. */
  listByResourceGroup: (
    resourceGroupName: string,
    cloudName: string,
    options?: ProjectsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Project>;
  /** Deletes a project. */
  delete: (
    resourceGroupName: string,
    cloudName: string,
    projectName: string,
    options?: ProjectsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates or updates a project. */
  createOrUpdate: (
    resourceGroupName: string,
    cloudName: string,
    projectName: string,
    resource: Project,
    options?: ProjectsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Project>, Project>;
  /** Gets a project. */
  get: (
    resourceGroupName: string,
    cloudName: string,
    projectName: string,
    options?: ProjectsGetOptionalParams,
  ) => Promise<Project>;
}

function _getProjects(context: PlatformContext) {
  return {
    listByResourceGroup: (
      resourceGroupName: string,
      cloudName: string,
      options?: ProjectsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, cloudName, options),
    delete: (
      resourceGroupName: string,
      cloudName: string,
      projectName: string,
      options?: ProjectsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, cloudName, projectName, options),
    createOrUpdate: (
      resourceGroupName: string,
      cloudName: string,
      projectName: string,
      resource: Project,
      options?: ProjectsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, cloudName, projectName, resource, options),
    get: (
      resourceGroupName: string,
      cloudName: string,
      projectName: string,
      options?: ProjectsGetOptionalParams,
    ) => get(context, resourceGroupName, cloudName, projectName, options),
  };
}

export function _getProjectsOperations(context: PlatformContext): ProjectsOperations {
  return {
    ..._getProjects(context),
  };
}
