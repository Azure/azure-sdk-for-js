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
  /** Starts evaluation of published scenario-template versions, including when the workspace has no scenarios. Acceptance fixes the selected template membership and total count, qualified resource snapshot and canonical discovery result reference. Without a usable discovery snapshot or valid catalog input, the request is rejected synchronously with an Azure error and no evaluation result is created. A valid empty catalog completes successfully with zero counts and an empty results array. Outcome counts reflect processing after acceptance. The initial 202 has no body. Poll the operation-bound Location URL until completion: a completed successful or partially successful assessment returns the typed result; failed or canceled processing returns an Azure error whose target identifies the evaluation resource. Ordinary evaluation reads return the current resource, including failed or canceled results, while retained. */
  evaluate: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacesEvaluateOptionalParams,
  ) => PollerLike<OperationState<WorkspaceEvaluation>, WorkspaceEvaluation>;
  /** Starts discovery for the workspace. The initial 202 has no body. Poll the operation-bound Location URL until completion: a successful or partially successful discovery returns the typed result; failed or canceled processing returns an Azure error whose target identifies the discovery resource. Ordinary discovery reads return the current resource, including failed or canceled results, while retained. */
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
