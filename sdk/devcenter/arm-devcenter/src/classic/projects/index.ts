// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext } from "../../api/devCenterContext.js";
import {
  getInheritedSettings,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/projects/operations.js";
import type {
  ProjectsGetInheritedSettingsOptionalParams,
  ProjectsListBySubscriptionOptionalParams,
  ProjectsListByResourceGroupOptionalParams,
  ProjectsDeleteOptionalParams,
  ProjectsUpdateOptionalParams,
  ProjectsCreateOrUpdateOptionalParams,
  ProjectsGetOptionalParams,
} from "../../api/projects/options.js";
import type { Project, ProjectUpdate, InheritedSettingsForProject } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Projects operations. */
export interface ProjectsOperations {
  /** Gets applicable inherited settings for this project. */
  getInheritedSettings: (
    resourceGroupName: string,
    projectName: string,
    options?: ProjectsGetInheritedSettingsOptionalParams,
  ) => Promise<InheritedSettingsForProject>;
  /** Lists all projects in the subscription. */
  listBySubscription: (
    options?: ProjectsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Project>;
  /** Lists all projects in the resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ProjectsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Project>;
  /** Deletes a project resource. */
  delete: (
    resourceGroupName: string,
    projectName: string,
    options?: ProjectsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Partially updates a project. */
  update: (
    resourceGroupName: string,
    projectName: string,
    body: ProjectUpdate,
    options?: ProjectsUpdateOptionalParams,
  ) => PollerLike<OperationState<Project>, Project>;
  /** Creates or updates a project. */
  createOrUpdate: (
    resourceGroupName: string,
    projectName: string,
    body: Project,
    options?: ProjectsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Project>, Project>;
  /** Gets a specific project. */
  get: (
    resourceGroupName: string,
    projectName: string,
    options?: ProjectsGetOptionalParams,
  ) => Promise<Project>;
}

function _getProjects(context: DevCenterContext) {
  return {
    getInheritedSettings: (
      resourceGroupName: string,
      projectName: string,
      options?: ProjectsGetInheritedSettingsOptionalParams,
    ) => getInheritedSettings(context, resourceGroupName, projectName, options),
    listBySubscription: (options?: ProjectsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ProjectsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      projectName: string,
      options?: ProjectsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, projectName, options),
    update: (
      resourceGroupName: string,
      projectName: string,
      body: ProjectUpdate,
      options?: ProjectsUpdateOptionalParams,
    ) => update(context, resourceGroupName, projectName, body, options),
    createOrUpdate: (
      resourceGroupName: string,
      projectName: string,
      body: Project,
      options?: ProjectsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, projectName, body, options),
    get: (resourceGroupName: string, projectName: string, options?: ProjectsGetOptionalParams) =>
      get(context, resourceGroupName, projectName, options),
  };
}

export function _getProjectsOperations(context: DevCenterContext): ProjectsOperations {
  return {
    ..._getProjects(context),
  };
}
