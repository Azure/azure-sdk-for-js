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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Workspaces operations. */
export interface WorkspacesOperations {
  /** Resync all the keys associated with this workspace.This includes keys for the storage account, app insights and password for container registry */
  resyncKeys: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacesResyncKeysOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use resyncKeys instead */
  beginResyncKeys: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacesResyncKeysOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use resyncKeys instead */
  beginResyncKeysAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacesResyncKeysOptionalParams,
  ) => Promise<void>;
  /** Prepare Azure Machine Learning Workspace's notebook resource */
  prepareNotebook: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacesPrepareNotebookOptionalParams,
  ) => PollerLike<OperationState<NotebookResourceInfo>, NotebookResourceInfo>;
  /** @deprecated use prepareNotebook instead */
  beginPrepareNotebook: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacesPrepareNotebookOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NotebookResourceInfo>, NotebookResourceInfo>>;
  /** @deprecated use prepareNotebook instead */
  beginPrepareNotebookAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacesPrepareNotebookOptionalParams,
  ) => Promise<NotebookResourceInfo>;
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
  /** @deprecated use diagnose instead */
  beginDiagnose: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacesDiagnoseOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DiagnoseResponseResult>, DiagnoseResponseResult>>;
  /** @deprecated use diagnose instead */
  beginDiagnoseAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacesDiagnoseOptionalParams,
  ) => Promise<DiagnoseResponseResult>;
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
  /** Updates a machine learning workspace with the specified parameters. */
  update: (
    resourceGroupName: string,
    workspaceName: string,
    body: WorkspaceUpdateParameters,
    options?: WorkspacesUpdateOptionalParams,
  ) => PollerLike<OperationState<Workspace>, Workspace>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    body: WorkspaceUpdateParameters,
    options?: WorkspacesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Workspace>, Workspace>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    body: WorkspaceUpdateParameters,
    options?: WorkspacesUpdateOptionalParams,
  ) => Promise<Workspace>;
  /** Creates or updates a workspace with the specified parameters. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    body: Workspace,
    options?: WorkspacesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Workspace>, Workspace>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    body: Workspace,
    options?: WorkspacesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Workspace>, Workspace>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    body: Workspace,
    options?: WorkspacesCreateOrUpdateOptionalParams,
  ) => Promise<Workspace>;
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
    beginResyncKeys: async (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspacesResyncKeysOptionalParams,
    ) => {
      const poller = resyncKeys(context, resourceGroupName, workspaceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResyncKeysAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspacesResyncKeysOptionalParams,
    ) => {
      return await resyncKeys(context, resourceGroupName, workspaceName, options);
    },
    prepareNotebook: (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspacesPrepareNotebookOptionalParams,
    ) => prepareNotebook(context, resourceGroupName, workspaceName, options),
    beginPrepareNotebook: async (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspacesPrepareNotebookOptionalParams,
    ) => {
      const poller = prepareNotebook(context, resourceGroupName, workspaceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPrepareNotebookAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspacesPrepareNotebookOptionalParams,
    ) => {
      return await prepareNotebook(context, resourceGroupName, workspaceName, options);
    },
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
    beginDiagnose: async (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspacesDiagnoseOptionalParams,
    ) => {
      const poller = diagnose(context, resourceGroupName, workspaceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDiagnoseAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspacesDiagnoseOptionalParams,
    ) => {
      return await diagnose(context, resourceGroupName, workspaceName, options);
    },
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
      body: WorkspaceUpdateParameters,
      options?: WorkspacesUpdateOptionalParams,
    ) => update(context, resourceGroupName, workspaceName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      body: WorkspaceUpdateParameters,
      options?: WorkspacesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, workspaceName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      body: WorkspaceUpdateParameters,
      options?: WorkspacesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, workspaceName, body, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      body: Workspace,
      options?: WorkspacesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, body, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      body: Workspace,
      options?: WorkspacesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, workspaceName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      body: Workspace,
      options?: WorkspacesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, workspaceName, body, options);
    },
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
