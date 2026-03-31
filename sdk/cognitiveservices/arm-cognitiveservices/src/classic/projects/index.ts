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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    options?: ProjectsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    options?: ProjectsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a Cognitive Services Project */
  update: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    project: Project,
    options?: ProjectsUpdateOptionalParams,
  ) => PollerLike<OperationState<Project>, Project>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    project: Project,
    options?: ProjectsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Project>, Project>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    project: Project,
    options?: ProjectsUpdateOptionalParams,
  ) => Promise<Project>;
  /** Create Cognitive Services Account's Project. Project is a sub-resource of an account which give AI developer it's individual container to work on. */
  create: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    project: Project,
    options?: ProjectsCreateOptionalParams,
  ) => PollerLike<OperationState<Project>, Project>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    project: Project,
    options?: ProjectsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Project>, Project>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    project: Project,
    options?: ProjectsCreateOptionalParams,
  ) => Promise<Project>;
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
    beginDelete: async (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      options?: ProjectsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, accountName, projectName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      options?: ProjectsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, accountName, projectName, options);
    },
    update: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      project: Project,
      options?: ProjectsUpdateOptionalParams,
    ) => update(context, resourceGroupName, accountName, projectName, project, options),
    beginUpdate: async (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      project: Project,
      options?: ProjectsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, accountName, projectName, project, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      project: Project,
      options?: ProjectsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, accountName, projectName, project, options);
    },
    create: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      project: Project,
      options?: ProjectsCreateOptionalParams,
    ) => create(context, resourceGroupName, accountName, projectName, project, options),
    beginCreate: async (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      project: Project,
      options?: ProjectsCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, accountName, projectName, project, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      project: Project,
      options?: ProjectsCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, accountName, projectName, project, options);
    },
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
