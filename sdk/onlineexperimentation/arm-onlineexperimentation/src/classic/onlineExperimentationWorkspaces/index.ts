// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OnlineExperimentationContext } from "../../api/onlineExperimentationContext.js";
import {
  OnlineExperimentationWorkspace,
  OnlineExperimentationWorkspacePatch,
} from "../../models/models.js";
import {
  OnlineExperimentationWorkspacesListBySubscriptionOptionalParams,
  OnlineExperimentationWorkspacesListByResourceGroupOptionalParams,
  OnlineExperimentationWorkspacesDeleteOptionalParams,
  OnlineExperimentationWorkspacesUpdateOptionalParams,
  OnlineExperimentationWorkspacesCreateOrUpdateOptionalParams,
  OnlineExperimentationWorkspacesGetOptionalParams,
} from "../../api/onlineExperimentationWorkspaces/options.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/onlineExperimentationWorkspaces/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a OnlineExperimentationWorkspaces operations. */
export interface OnlineExperimentationWorkspacesOperations {
  /** Gets all online experimentation workspaces in the specified subscription. */
  listBySubscription: (
    options?: OnlineExperimentationWorkspacesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<OnlineExperimentationWorkspace>;
  /** Gets all online experimentation workspaces in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: OnlineExperimentationWorkspacesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<OnlineExperimentationWorkspace>;
  /** Deletes an online experimentation workspace. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    options?: OnlineExperimentationWorkspacesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Patch an online experimentation workspace. */
  update: (
    resourceGroupName: string,
    workspaceName: string,
    properties: OnlineExperimentationWorkspacePatch,
    options?: OnlineExperimentationWorkspacesUpdateOptionalParams,
  ) => PollerLike<
    OperationState<OnlineExperimentationWorkspace>,
    OnlineExperimentationWorkspace
  >;
  /** Create an online experimentation workspace, or update an existing workspace. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    resource: OnlineExperimentationWorkspace,
    options?: OnlineExperimentationWorkspacesCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<OnlineExperimentationWorkspace>,
    OnlineExperimentationWorkspace
  >;
  /** Gets an online experimentation workspace. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    options?: OnlineExperimentationWorkspacesGetOptionalParams,
  ) => Promise<OnlineExperimentationWorkspace>;
}

function _getOnlineExperimentationWorkspaces(
  context: OnlineExperimentationContext,
) {
  return {
    listBySubscription: (
      options?: OnlineExperimentationWorkspacesListBySubscriptionOptionalParams,
    ) => listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: OnlineExperimentationWorkspacesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      options?: OnlineExperimentationWorkspacesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, options),
    update: (
      resourceGroupName: string,
      workspaceName: string,
      properties: OnlineExperimentationWorkspacePatch,
      options?: OnlineExperimentationWorkspacesUpdateOptionalParams,
    ) => update(context, resourceGroupName, workspaceName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      resource: OnlineExperimentationWorkspace,
      options?: OnlineExperimentationWorkspacesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      options?: OnlineExperimentationWorkspacesGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, options),
  };
}

export function _getOnlineExperimentationWorkspacesOperations(
  context: OnlineExperimentationContext,
): OnlineExperimentationWorkspacesOperations {
  return {
    ..._getOnlineExperimentationWorkspaces(context),
  };
}
