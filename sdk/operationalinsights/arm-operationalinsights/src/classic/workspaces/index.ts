// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementContext } from "../../api/operationalInsightsManagementContext.js";
import {
  failover,
  reconcileNSP,
  listNSP,
  getNSP,
  failback,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/workspaces/operations.js";
import {
  WorkspacesFailoverOptionalParams,
  WorkspacesReconcileNSPOptionalParams,
  WorkspacesListNSPOptionalParams,
  WorkspacesGetNSPOptionalParams,
  WorkspacesFailbackOptionalParams,
  WorkspacesListOptionalParams,
  WorkspacesListByResourceGroupOptionalParams,
  WorkspacesDeleteOptionalParams,
  WorkspacesUpdateOptionalParams,
  WorkspacesCreateOrUpdateOptionalParams,
  WorkspacesGetOptionalParams,
} from "../../api/workspaces/options.js";
import {
  Workspace,
  WorkspacePatch,
  NetworkSecurityPerimeterConfiguration,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Workspaces operations. */
export interface WorkspacesOperations {
  /**
   * Activates failover for the specified workspace.
   *
   * The specified replication location must match the location of the enabled replication for this workspace. The failover operation is asynchronous and can take up to 30 minutes to complete. The status of the operation can be checked using the operationId returned in the response.
   */
  failover: (
    resourceGroupName: string,
    location: string,
    workspaceName: string,
    options?: WorkspacesFailoverOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use failover instead */
  beginFailover: (
    resourceGroupName: string,
    location: string,
    workspaceName: string,
    options?: WorkspacesFailoverOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use failover instead */
  beginFailoverAndWait: (
    resourceGroupName: string,
    location: string,
    workspaceName: string,
    options?: WorkspacesFailoverOptionalParams,
  ) => Promise<void>;
  /** Reconcile network security perimeter configuration for Workspace resource. */
  reconcileNSP: (
    resourceGroupName: string,
    workspaceName: string,
    networkSecurityPerimeterConfigurationName: string,
    options?: WorkspacesReconcileNSPOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use reconcileNSP instead */
  beginReconcileNSP: (
    resourceGroupName: string,
    workspaceName: string,
    networkSecurityPerimeterConfigurationName: string,
    options?: WorkspacesReconcileNSPOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use reconcileNSP instead */
  beginReconcileNSPAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    networkSecurityPerimeterConfigurationName: string,
    options?: WorkspacesReconcileNSPOptionalParams,
  ) => Promise<void>;
  /** Gets a list of NSP configurations for specified workspace. */
  listNSP: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacesListNSPOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkSecurityPerimeterConfiguration>;
  /** Gets a network security perimeter configuration. */
  getNSP: (
    resourceGroupName: string,
    workspaceName: string,
    networkSecurityPerimeterConfigurationName: string,
    options?: WorkspacesGetNSPOptionalParams,
  ) => Promise<NetworkSecurityPerimeterConfiguration>;
  /**
   * Deactivates failover for the specified workspace.
   *
   * The failback operation is asynchronous and can take up to 30 minutes to complete. The status of the operation can be checked using the operationId returned in the response.
   */
  failback: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacesFailbackOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use failback instead */
  beginFailback: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacesFailbackOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use failback instead */
  beginFailbackAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacesFailbackOptionalParams,
  ) => Promise<void>;
  /** Gets the workspaces in a subscription. */
  list: (options?: WorkspacesListOptionalParams) => PagedAsyncIterableIterator<Workspace>;
  /** Gets workspaces in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: WorkspacesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Workspace>;
  /** Deletes a workspace resource. To recover the workspace, create it again with the same name, in the same subscription, resource group and location. The name is kept for 14 days and cannot be used for another workspace. To remove the workspace completely and release the name, use the force flag. */
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
  /** Updates a workspace. */
  update: (
    resourceGroupName: string,
    workspaceName: string,
    parameters: WorkspacePatch,
    options?: WorkspacesUpdateOptionalParams,
  ) => Promise<Workspace>;
  /** Create or update a workspace. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    parameters: Workspace,
    options?: WorkspacesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Workspace>, Workspace>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    parameters: Workspace,
    options?: WorkspacesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Workspace>, Workspace>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    parameters: Workspace,
    options?: WorkspacesCreateOrUpdateOptionalParams,
  ) => Promise<Workspace>;
  /** Gets a workspace instance. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacesGetOptionalParams,
  ) => Promise<Workspace>;
}

function _getWorkspaces(context: OperationalInsightsManagementContext) {
  return {
    failover: (
      resourceGroupName: string,
      location: string,
      workspaceName: string,
      options?: WorkspacesFailoverOptionalParams,
    ) => failover(context, resourceGroupName, location, workspaceName, options),
    beginFailover: async (
      resourceGroupName: string,
      location: string,
      workspaceName: string,
      options?: WorkspacesFailoverOptionalParams,
    ) => {
      const poller = failover(context, resourceGroupName, location, workspaceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginFailoverAndWait: async (
      resourceGroupName: string,
      location: string,
      workspaceName: string,
      options?: WorkspacesFailoverOptionalParams,
    ) => {
      return await failover(context, resourceGroupName, location, workspaceName, options);
    },
    reconcileNSP: (
      resourceGroupName: string,
      workspaceName: string,
      networkSecurityPerimeterConfigurationName: string,
      options?: WorkspacesReconcileNSPOptionalParams,
    ) =>
      reconcileNSP(
        context,
        resourceGroupName,
        workspaceName,
        networkSecurityPerimeterConfigurationName,
        options,
      ),
    beginReconcileNSP: async (
      resourceGroupName: string,
      workspaceName: string,
      networkSecurityPerimeterConfigurationName: string,
      options?: WorkspacesReconcileNSPOptionalParams,
    ) => {
      const poller = reconcileNSP(
        context,
        resourceGroupName,
        workspaceName,
        networkSecurityPerimeterConfigurationName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginReconcileNSPAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      networkSecurityPerimeterConfigurationName: string,
      options?: WorkspacesReconcileNSPOptionalParams,
    ) => {
      return await reconcileNSP(
        context,
        resourceGroupName,
        workspaceName,
        networkSecurityPerimeterConfigurationName,
        options,
      );
    },
    listNSP: (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspacesListNSPOptionalParams,
    ) => listNSP(context, resourceGroupName, workspaceName, options),
    getNSP: (
      resourceGroupName: string,
      workspaceName: string,
      networkSecurityPerimeterConfigurationName: string,
      options?: WorkspacesGetNSPOptionalParams,
    ) =>
      getNSP(
        context,
        resourceGroupName,
        workspaceName,
        networkSecurityPerimeterConfigurationName,
        options,
      ),
    failback: (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspacesFailbackOptionalParams,
    ) => failback(context, resourceGroupName, workspaceName, options),
    beginFailback: async (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspacesFailbackOptionalParams,
    ) => {
      const poller = failback(context, resourceGroupName, workspaceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginFailbackAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspacesFailbackOptionalParams,
    ) => {
      return await failback(context, resourceGroupName, workspaceName, options);
    },
    list: (options?: WorkspacesListOptionalParams) => list(context, options),
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
      parameters: WorkspacePatch,
      options?: WorkspacesUpdateOptionalParams,
    ) => update(context, resourceGroupName, workspaceName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      parameters: Workspace,
      options?: WorkspacesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      parameters: Workspace,
      options?: WorkspacesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, workspaceName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      parameters: Workspace,
      options?: WorkspacesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, workspaceName, parameters, options);
    },
    get: (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspacesGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, options),
  };
}

export function _getWorkspacesOperations(
  context: OperationalInsightsManagementContext,
): WorkspacesOperations {
  return {
    ..._getWorkspaces(context),
  };
}
