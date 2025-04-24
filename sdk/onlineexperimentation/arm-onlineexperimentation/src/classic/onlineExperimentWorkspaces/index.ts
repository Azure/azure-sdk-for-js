// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OnlineExperimentationContext } from "../../api/onlineExperimentationContext.js";
import { OnlineExperimentWorkspace } from "../../models/models.js";
import {
  OnlineExperimentWorkspacesListBySubscriptionOptionalParams,
  OnlineExperimentWorkspacesListByResourceGroupOptionalParams,
  OnlineExperimentWorkspacesDeleteOptionalParams,
  OnlineExperimentWorkspacesUpdateOptionalParams,
  OnlineExperimentWorkspacesCreateOrUpdateOptionalParams,
  OnlineExperimentWorkspacesGetOptionalParams,
} from "../../api/onlineExperimentWorkspaces/options.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/onlineExperimentWorkspaces/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a OnlineExperimentWorkspaces operations. */
export interface OnlineExperimentWorkspacesOperations {
  /** Gets all experiment workspaces in the specified subscription. */
  listBySubscription: (
    options?: OnlineExperimentWorkspacesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<OnlineExperimentWorkspace>;
  /** Gets all experiment workspaces in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: OnlineExperimentWorkspacesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<OnlineExperimentWorkspace>;
  /** Deletes an experiment workspace */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    options?: OnlineExperimentWorkspacesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Patch an experiment workspace */
  update: (
    resourceGroupName: string,
    workspaceName: string,
    properties: OnlineExperimentWorkspace,
    options?: OnlineExperimentWorkspacesUpdateOptionalParams,
  ) => PollerLike<OperationState<OnlineExperimentWorkspace>, OnlineExperimentWorkspace>;
  /** Create an experiment workspace, or update an existing workspace */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    resource: OnlineExperimentWorkspace,
    options?: OnlineExperimentWorkspacesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<OnlineExperimentWorkspace>, OnlineExperimentWorkspace>;
  /** Gets an experiment workspace */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    options?: OnlineExperimentWorkspacesGetOptionalParams,
  ) => Promise<OnlineExperimentWorkspace>;
}

function _getOnlineExperimentWorkspaces(context: OnlineExperimentationContext) {
  return {
    listBySubscription: (options?: OnlineExperimentWorkspacesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: OnlineExperimentWorkspacesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      options?: OnlineExperimentWorkspacesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, options),
    update: (
      resourceGroupName: string,
      workspaceName: string,
      properties: OnlineExperimentWorkspace,
      options?: OnlineExperimentWorkspacesUpdateOptionalParams,
    ) => update(context, resourceGroupName, workspaceName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      resource: OnlineExperimentWorkspace,
      options?: OnlineExperimentWorkspacesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, resource, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      options?: OnlineExperimentWorkspacesGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, options),
  };
}

export function _getOnlineExperimentWorkspacesOperations(
  context: OnlineExperimentationContext,
): OnlineExperimentWorkspacesOperations {
  return {
    ..._getOnlineExperimentWorkspaces(context),
  };
}
