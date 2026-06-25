// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthcareApisManagementContext } from "../../api/healthcareApisManagementContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/workspaces/operations.js";
import {
  WorkspacesListBySubscriptionOptionalParams,
  WorkspacesListByResourceGroupOptionalParams,
  WorkspacesDeleteOptionalParams,
  WorkspacesUpdateOptionalParams,
  WorkspacesCreateOrUpdateOptionalParams,
  WorkspacesGetOptionalParams,
} from "../../api/workspaces/options.js";
import { Workspace, WorkspacePatchResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Workspaces operations. */
export interface WorkspacesOperations {
  /** Lists all the available workspaces under the specified subscription. */
  listBySubscription: (
    options?: WorkspacesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Workspace>;
  /** Lists all the available workspaces under the specified resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: WorkspacesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Workspace>;
  /** Deletes a specified workspace. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacesDeleteOptionalParams,
  ) => Promise<void>;
  /** Patch workspace details. */
  update: (
    resourceGroupName: string,
    workspaceName: string,
    workspacePatchResource: WorkspacePatchResource,
    options?: WorkspacesUpdateOptionalParams,
  ) => PollerLike<OperationState<Workspace>, Workspace>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    workspacePatchResource: WorkspacePatchResource,
    options?: WorkspacesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Workspace>, Workspace>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    workspacePatchResource: WorkspacePatchResource,
    options?: WorkspacesUpdateOptionalParams,
  ) => Promise<Workspace>;
  /** Creates or updates a workspace resource with the specified parameters. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    workspace: Workspace,
    options?: WorkspacesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Workspace>, Workspace>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    workspace: Workspace,
    options?: WorkspacesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Workspace>, Workspace>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    workspace: Workspace,
    options?: WorkspacesCreateOrUpdateOptionalParams,
  ) => Promise<Workspace>;
  /** Gets the properties of the specified workspace. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacesGetOptionalParams,
  ) => Promise<Workspace>;
}

function _getWorkspaces(context: HealthcareApisManagementContext) {
  return {
    listBySubscription: (options?: WorkspacesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: WorkspacesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspacesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, options),
    beginDelete: async (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspacesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, workspaceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspacesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, workspaceName, options);
    },
    update: (
      resourceGroupName: string,
      workspaceName: string,
      workspacePatchResource: WorkspacePatchResource,
      options?: WorkspacesUpdateOptionalParams,
    ) => update(context, resourceGroupName, workspaceName, workspacePatchResource, options),
    beginUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      workspacePatchResource: WorkspacePatchResource,
      options?: WorkspacesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        workspaceName,
        workspacePatchResource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      workspacePatchResource: WorkspacePatchResource,
      options?: WorkspacesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        workspaceName,
        workspacePatchResource,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      workspace: Workspace,
      options?: WorkspacesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, workspace, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      workspace: Workspace,
      options?: WorkspacesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, workspaceName, workspace, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      workspace: Workspace,
      options?: WorkspacesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, workspaceName, workspace, options);
    },
    get: (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspacesGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, options),
  };
}

export function _getWorkspacesOperations(
  context: HealthcareApisManagementContext,
): WorkspacesOperations {
  return {
    ..._getWorkspaces(context),
  };
}
