// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageMoverContext } from "../../api/storageMoverContext.js";
import { list, $delete, update, createOrUpdate, get } from "../../api/projects/operations.js";
import {
  ProjectsListOptionalParams,
  ProjectsDeleteOptionalParams,
  ProjectsUpdateOptionalParams,
  ProjectsCreateOrUpdateOptionalParams,
  ProjectsGetOptionalParams,
} from "../../api/projects/options.js";
import { Project, ProjectUpdateParameters } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Projects operations. */
export interface ProjectsOperations {
  /** Lists all Projects in a Storage Mover. */
  list: (
    resourceGroupName: string,
    storageMoverName: string,
    options?: ProjectsListOptionalParams,
  ) => PagedAsyncIterableIterator<Project>;
  /** Deletes a Project resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    storageMoverName: string,
    projectName: string,
    options?: ProjectsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates properties for a Project resource. Properties not specified in the request body will be unchanged. */
  update: (
    resourceGroupName: string,
    storageMoverName: string,
    projectName: string,
    project: ProjectUpdateParameters,
    options?: ProjectsUpdateOptionalParams,
  ) => Promise<Project>;
  /** Creates or updates a Project resource, which is a logical grouping of related jobs. */
  createOrUpdate: (
    resourceGroupName: string,
    storageMoverName: string,
    projectName: string,
    project: Project,
    options?: ProjectsCreateOrUpdateOptionalParams,
  ) => Promise<Project>;
  /** Gets a Project resource. */
  get: (
    resourceGroupName: string,
    storageMoverName: string,
    projectName: string,
    options?: ProjectsGetOptionalParams,
  ) => Promise<Project>;
}

function _getProjects(context: StorageMoverContext) {
  return {
    list: (
      resourceGroupName: string,
      storageMoverName: string,
      options?: ProjectsListOptionalParams,
    ) => list(context, resourceGroupName, storageMoverName, options),
    delete: (
      resourceGroupName: string,
      storageMoverName: string,
      projectName: string,
      options?: ProjectsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, storageMoverName, projectName, options),
    update: (
      resourceGroupName: string,
      storageMoverName: string,
      projectName: string,
      project: ProjectUpdateParameters,
      options?: ProjectsUpdateOptionalParams,
    ) => update(context, resourceGroupName, storageMoverName, projectName, project, options),
    createOrUpdate: (
      resourceGroupName: string,
      storageMoverName: string,
      projectName: string,
      project: Project,
      options?: ProjectsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, storageMoverName, projectName, project, options),
    get: (
      resourceGroupName: string,
      storageMoverName: string,
      projectName: string,
      options?: ProjectsGetOptionalParams,
    ) => get(context, resourceGroupName, storageMoverName, projectName, options),
  };
}

export function _getProjectsOperations(context: StorageMoverContext): ProjectsOperations {
  return {
    ..._getProjects(context),
  };
}
