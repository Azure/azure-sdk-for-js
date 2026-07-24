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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    projectName: string,
    options?: ProjectsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    projectName: string,
    options?: ProjectsDeleteOptionalParams,
  ) => Promise<void>;
  /** Partially updates a project. */
  update: (
    resourceGroupName: string,
    projectName: string,
    body: ProjectUpdate,
    options?: ProjectsUpdateOptionalParams,
  ) => PollerLike<OperationState<Project>, Project>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    projectName: string,
    body: ProjectUpdate,
    options?: ProjectsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Project>, Project>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    projectName: string,
    body: ProjectUpdate,
    options?: ProjectsUpdateOptionalParams,
  ) => Promise<Project>;
  /** Creates or updates a project. */
  createOrUpdate: (
    resourceGroupName: string,
    projectName: string,
    body: Project,
    options?: ProjectsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Project>, Project>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    projectName: string,
    body: Project,
    options?: ProjectsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Project>, Project>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    projectName: string,
    body: Project,
    options?: ProjectsCreateOrUpdateOptionalParams,
  ) => Promise<Project>;
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
    beginDelete: async (
      resourceGroupName: string,
      projectName: string,
      options?: ProjectsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, projectName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      projectName: string,
      options?: ProjectsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, projectName, options);
    },
    update: (
      resourceGroupName: string,
      projectName: string,
      body: ProjectUpdate,
      options?: ProjectsUpdateOptionalParams,
    ) => update(context, resourceGroupName, projectName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      projectName: string,
      body: ProjectUpdate,
      options?: ProjectsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, projectName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      projectName: string,
      body: ProjectUpdate,
      options?: ProjectsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, projectName, body, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      projectName: string,
      body: Project,
      options?: ProjectsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, projectName, body, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      projectName: string,
      body: Project,
      options?: ProjectsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, projectName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      projectName: string,
      body: Project,
      options?: ProjectsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, projectName, body, options);
    },
    get: (resourceGroupName: string, projectName: string, options?: ProjectsGetOptionalParams) =>
      get(context, resourceGroupName, projectName, options),
  };
}

export function _getProjectsOperations(context: DevCenterContext): ProjectsOperations {
  return {
    ..._getProjects(context),
  };
}
