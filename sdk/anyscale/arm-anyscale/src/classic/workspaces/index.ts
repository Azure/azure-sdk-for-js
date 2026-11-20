// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PlatformContext } from "../../api/platformContext.js";
import {
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/workspaces/operations.js";
import type {
  WorkspacesListByResourceGroupOptionalParams,
  WorkspacesDeleteOptionalParams,
  WorkspacesUpdateOptionalParams,
  WorkspacesCreateOrUpdateOptionalParams,
  WorkspacesGetOptionalParams,
} from "../../api/workspaces/options.js";
import type { Workspace, WorkspaceUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Workspaces operations. */
export interface WorkspacesOperations {
  /** Lists workspaces in a project. */
  listByResourceGroup: (
    resourceGroupName: string,
    cloudName: string,
    projectName: string,
    options?: WorkspacesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Workspace>;
  /** Deletes a workspace. */
  delete: (
    resourceGroupName: string,
    cloudName: string,
    projectName: string,
    workspaceName: string,
    options?: WorkspacesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a workspace. */
  update: (
    resourceGroupName: string,
    cloudName: string,
    projectName: string,
    workspaceName: string,
    properties: WorkspaceUpdate,
    options?: WorkspacesUpdateOptionalParams,
  ) => Promise<Workspace>;
  /** Creates or updates a workspace. */
  createOrUpdate: (
    resourceGroupName: string,
    cloudName: string,
    projectName: string,
    workspaceName: string,
    resource: Workspace,
    options?: WorkspacesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Workspace>, Workspace>;
  /** Gets a workspace. */
  get: (
    resourceGroupName: string,
    cloudName: string,
    projectName: string,
    workspaceName: string,
    options?: WorkspacesGetOptionalParams,
  ) => Promise<Workspace>;
}

function _getWorkspaces(context: PlatformContext) {
  return {
    listByResourceGroup: (
      resourceGroupName: string,
      cloudName: string,
      projectName: string,
      options?: WorkspacesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, cloudName, projectName, options),
    delete: (
      resourceGroupName: string,
      cloudName: string,
      projectName: string,
      workspaceName: string,
      options?: WorkspacesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, cloudName, projectName, workspaceName, options),
    update: (
      resourceGroupName: string,
      cloudName: string,
      projectName: string,
      workspaceName: string,
      properties: WorkspaceUpdate,
      options?: WorkspacesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        cloudName,
        projectName,
        workspaceName,
        properties,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      cloudName: string,
      projectName: string,
      workspaceName: string,
      resource: Workspace,
      options?: WorkspacesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        cloudName,
        projectName,
        workspaceName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      cloudName: string,
      projectName: string,
      workspaceName: string,
      options?: WorkspacesGetOptionalParams,
    ) => get(context, resourceGroupName, cloudName, projectName, workspaceName, options),
  };
}

export function _getWorkspacesOperations(context: PlatformContext): WorkspacesOperations {
  return {
    ..._getWorkspaces(context),
  };
}
