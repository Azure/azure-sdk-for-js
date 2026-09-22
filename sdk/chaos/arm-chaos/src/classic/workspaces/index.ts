// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ChaosManagementContext } from "../../api/chaosManagementContext.js";
import {
  evaluate,
  discover,
  listAll,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/workspaces/operations.js";
import type {
  WorkspacesEvaluateOptionalParams,
  WorkspacesDiscoverOptionalParams,
  WorkspacesListAllOptionalParams,
  WorkspacesListOptionalParams,
  WorkspacesDeleteOptionalParams,
  WorkspacesUpdateOptionalParams,
  WorkspacesCreateOrUpdateOptionalParams,
  WorkspacesGetOptionalParams,
} from "../../api/workspaces/options.js";
import type {
  Workspace,
  WorkspaceUpdate,
  WorkspaceDiscovery,
  WorkspaceEvaluation,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Workspaces operations. */
export interface WorkspacesOperations {
  /** Triggers scenario evaluation for the workspace. */
  evaluate: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacesEvaluateOptionalParams,
  ) => PollerLike<OperationState<WorkspaceEvaluation>, WorkspaceEvaluation>;
  /** Triggers resource discovery for the workspace. */
  discover: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacesDiscoverOptionalParams,
  ) => PollerLike<OperationState<WorkspaceDiscovery>, WorkspaceDiscovery>;
  /** Get a list of all Workspace resources in a subscription. */
  listAll: (options?: WorkspacesListAllOptionalParams) => PagedAsyncIterableIterator<Workspace>;
  /** Get a list of Workspace resources in a resource group. */
  list: (
    resourceGroupName: string,
    options?: WorkspacesListOptionalParams,
  ) => PagedAsyncIterableIterator<Workspace>;
  /** Delete a Workspace resource. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a Workspace. */
  update: (
    resourceGroupName: string,
    workspaceName: string,
    properties: WorkspaceUpdate,
    options?: WorkspacesUpdateOptionalParams,
  ) => PollerLike<OperationState<Workspace>, Workspace>;
  /** Create or update a Workspace resource. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    resource: Workspace,
    options?: WorkspacesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Workspace>, Workspace>;
  /** Get a Workspace resource. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacesGetOptionalParams,
  ) => Promise<Workspace>;
}
function _getWorkspaces(context: ChaosManagementContext) {
  return {
    evaluate: (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspacesEvaluateOptionalParams,
    ) => evaluate(context, resourceGroupName, workspaceName, options),
    discover: (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspacesDiscoverOptionalParams,
    ) => discover(context, resourceGroupName, workspaceName, options),
    listAll: (options?: WorkspacesListAllOptionalParams) => listAll(context, options),
    list: (resourceGroupName: string, options?: WorkspacesListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspacesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, options),
    update: (
      resourceGroupName: string,
      workspaceName: string,
      properties: WorkspaceUpdate,
      options?: WorkspacesUpdateOptionalParams,
    ) => update(context, resourceGroupName, workspaceName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      resource: Workspace,
      options?: WorkspacesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, resource, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspacesGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, options),
  };
}
export function _getWorkspacesOperations(context: ChaosManagementContext): WorkspacesOperations {
  return {
    ..._getWorkspaces(context),
  };
}
