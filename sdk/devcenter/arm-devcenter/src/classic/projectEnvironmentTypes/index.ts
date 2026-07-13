// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext } from "../../api/devCenterContext.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/projectEnvironmentTypes/operations.js";
import type {
  ProjectEnvironmentTypesListOptionalParams,
  ProjectEnvironmentTypesDeleteOptionalParams,
  ProjectEnvironmentTypesUpdateOptionalParams,
  ProjectEnvironmentTypesCreateOrUpdateOptionalParams,
  ProjectEnvironmentTypesGetOptionalParams,
} from "../../api/projectEnvironmentTypes/options.js";
import type { ProjectEnvironmentType, ProjectEnvironmentTypeUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ProjectEnvironmentTypes operations. */
export interface ProjectEnvironmentTypesOperations {
  /** Lists environment types for a project. */
  list: (
    resourceGroupName: string,
    projectName: string,
    options?: ProjectEnvironmentTypesListOptionalParams,
  ) => PagedAsyncIterableIterator<ProjectEnvironmentType>;
  /** Deletes a project environment type. */
  delete: (
    resourceGroupName: string,
    projectName: string,
    environmentTypeName: string,
    options?: ProjectEnvironmentTypesDeleteOptionalParams,
  ) => Promise<void>;
  /** Partially updates a project environment type. */
  update: (
    resourceGroupName: string,
    projectName: string,
    environmentTypeName: string,
    body: ProjectEnvironmentTypeUpdate,
    options?: ProjectEnvironmentTypesUpdateOptionalParams,
  ) => Promise<ProjectEnvironmentType>;
  /** Creates or updates a project environment type. */
  createOrUpdate: (
    resourceGroupName: string,
    projectName: string,
    environmentTypeName: string,
    body: ProjectEnvironmentType,
    options?: ProjectEnvironmentTypesCreateOrUpdateOptionalParams,
  ) => Promise<ProjectEnvironmentType>;
  /** Gets a project environment type. */
  get: (
    resourceGroupName: string,
    projectName: string,
    environmentTypeName: string,
    options?: ProjectEnvironmentTypesGetOptionalParams,
  ) => Promise<ProjectEnvironmentType>;
}

function _getProjectEnvironmentTypes(context: DevCenterContext) {
  return {
    list: (
      resourceGroupName: string,
      projectName: string,
      options?: ProjectEnvironmentTypesListOptionalParams,
    ) => list(context, resourceGroupName, projectName, options),
    delete: (
      resourceGroupName: string,
      projectName: string,
      environmentTypeName: string,
      options?: ProjectEnvironmentTypesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, projectName, environmentTypeName, options),
    update: (
      resourceGroupName: string,
      projectName: string,
      environmentTypeName: string,
      body: ProjectEnvironmentTypeUpdate,
      options?: ProjectEnvironmentTypesUpdateOptionalParams,
    ) => update(context, resourceGroupName, projectName, environmentTypeName, body, options),
    createOrUpdate: (
      resourceGroupName: string,
      projectName: string,
      environmentTypeName: string,
      body: ProjectEnvironmentType,
      options?: ProjectEnvironmentTypesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, projectName, environmentTypeName, body, options),
    get: (
      resourceGroupName: string,
      projectName: string,
      environmentTypeName: string,
      options?: ProjectEnvironmentTypesGetOptionalParams,
    ) => get(context, resourceGroupName, projectName, environmentTypeName, options),
  };
}

export function _getProjectEnvironmentTypesOperations(
  context: DevCenterContext,
): ProjectEnvironmentTypesOperations {
  return {
    ..._getProjectEnvironmentTypes(context),
  };
}
