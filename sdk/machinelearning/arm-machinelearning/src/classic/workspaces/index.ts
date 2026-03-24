// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  resyncKeys,
  prepareNotebook,
  listOutboundNetworkDependenciesEndpoints,
  listStorageAccountKeys,
  listNotebookKeys,
  listNotebookAccessToken,
  listKeys,
  diagnose,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/workspaces/operations.js";
import type {
  WorkspacesResyncKeysOptionalParams,
  WorkspacesPrepareNotebookOptionalParams,
  WorkspacesListOutboundNetworkDependenciesEndpointsOptionalParams,
  WorkspacesListStorageAccountKeysOptionalParams,
  WorkspacesListNotebookKeysOptionalParams,
  WorkspacesListNotebookAccessTokenOptionalParams,
  WorkspacesListKeysOptionalParams,
  WorkspacesDiagnoseOptionalParams,
  WorkspacesListBySubscriptionOptionalParams,
  WorkspacesListByResourceGroupOptionalParams,
  WorkspacesDeleteOptionalParams,
  WorkspacesUpdateOptionalParams,
  WorkspacesCreateOrUpdateOptionalParams,
  WorkspacesGetOptionalParams,
} from "../../api/workspaces/options.js";
import type {
  Workspace,
  NotebookResourceInfo,
  WorkspaceUpdateParameters,
  DiagnoseResponseResult,
  ListWorkspaceKeysResult,
  ListNotebookKeysResult,
  NotebookAccessTokenResult,
  ListStorageAccountKeysResult,
  ExternalFqdnResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Workspaces operations. */
export interface WorkspacesOperations {
  /** Resync all the keys associated with this workspace.This includes keys for the storage account, app insights and password for container registry */
  resyncKeys: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacesResyncKeysOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Prepare Azure Machine Learning Workspace's notebook resource */
  prepareNotebook: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacesPrepareNotebookOptionalParams,
  ) => PollerLike<OperationState<NotebookResourceInfo>, NotebookResourceInfo>;
  /** Called by Client (Portal, CLI, etc) to get a list of all external outbound dependencies (FQDNs) programmatically. */
  listOutboundNetworkDependenciesEndpoints: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacesListOutboundNetworkDependenciesEndpointsOptionalParams,
  ) => Promise<ExternalFqdnResponse>;
  /** Lists keys of Azure Machine Learning Workspace's storage account. */
  listStorageAccountKeys: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacesListStorageAccountKeysOptionalParams,
  ) => Promise<ListStorageAccountKeysResult>;
  /** Lists keys of Azure Machine Learning Workspaces notebook. */
  listNotebookKeys: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacesListNotebookKeysOptionalParams,
  ) => Promise<ListNotebookKeysResult>;
  /** Get Azure Machine Learning Workspace notebook access token */
  listNotebookAccessToken: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacesListNotebookAccessTokenOptionalParams,
  ) => Promise<NotebookAccessTokenResult>;
  /** Lists all the keys associated with this workspace. This includes keys for the storage account, app insights and password for container registry. */
  listKeys: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacesListKeysOptionalParams,
  ) => Promise<ListWorkspaceKeysResult>;
  /** Diagnose workspace setup issue. */
  diagnose: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacesDiagnoseOptionalParams,
  ) => PollerLike<OperationState<DiagnoseResponseResult>, DiagnoseResponseResult>;
  /** Lists all the available machine learning workspaces under the specified subscription. */
  listBySubscription: (
    options?: WorkspacesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Workspace>;
  /** Lists all the available machine learning workspaces under the specified resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: WorkspacesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Workspace>;
  /** Deletes a machine learning workspace. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a machine learning workspace with the specified parameters. */
  update: (
    resourceGroupName: string,
    workspaceName: string,
    body: WorkspaceUpdateParameters,
    options?: WorkspacesUpdateOptionalParams,
  ) => PollerLike<OperationState<Workspace>, Workspace>;
  /** Creates or updates a workspace with the specified parameters. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    body: Workspace,
    options?: WorkspacesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Workspace>, Workspace>;
  /** Gets the properties of the specified machine learning workspace. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacesGetOptionalParams,
  ) => Promise<Workspace>;
}

function _getWorkspaces(context: AzureMachineLearningServicesManagementContext) {
  return {
    resyncKeys: (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspacesResyncKeysOptionalParams,
    ) => resyncKeys(context, resourceGroupName, workspaceName, options),
    prepareNotebook: (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspacesPrepareNotebookOptionalParams,
    ) => prepareNotebook(context, resourceGroupName, workspaceName, options),
    listOutboundNetworkDependenciesEndpoints: (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspacesListOutboundNetworkDependenciesEndpointsOptionalParams,
    ) =>
      listOutboundNetworkDependenciesEndpoints(context, resourceGroupName, workspaceName, options),
    listStorageAccountKeys: (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspacesListStorageAccountKeysOptionalParams,
    ) => listStorageAccountKeys(context, resourceGroupName, workspaceName, options),
    listNotebookKeys: (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspacesListNotebookKeysOptionalParams,
    ) => listNotebookKeys(context, resourceGroupName, workspaceName, options),
    listNotebookAccessToken: (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspacesListNotebookAccessTokenOptionalParams,
    ) => listNotebookAccessToken(context, resourceGroupName, workspaceName, options),
    listKeys: (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspacesListKeysOptionalParams,
    ) => listKeys(context, resourceGroupName, workspaceName, options),
    diagnose: (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspacesDiagnoseOptionalParams,
    ) => diagnose(context, resourceGroupName, workspaceName, options),
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
    update: (
      resourceGroupName: string,
      workspaceName: string,
      body: WorkspaceUpdateParameters,
      options?: WorkspacesUpdateOptionalParams,
    ) => update(context, resourceGroupName, workspaceName, body, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      body: Workspace,
      options?: WorkspacesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, body, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspacesGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, options),
  };
}

export function _getWorkspacesOperations(
  context: AzureMachineLearningServicesManagementContext,
): WorkspacesOperations {
  return {
    ..._getWorkspaces(context),
  };
}
