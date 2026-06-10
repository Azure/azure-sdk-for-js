// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  testConnection,
  listSecrets,
  list,
  $delete,
  update,
  create,
  get,
} from "../../api/workspaceConnections/operations.js";
import type {
  WorkspaceConnectionsTestConnectionOptionalParams,
  WorkspaceConnectionsListSecretsOptionalParams,
  WorkspaceConnectionsListOptionalParams,
  WorkspaceConnectionsDeleteOptionalParams,
  WorkspaceConnectionsUpdateOptionalParams,
  WorkspaceConnectionsCreateOptionalParams,
  WorkspaceConnectionsGetOptionalParams,
} from "../../api/workspaceConnections/options.js";
import type { WorkspaceConnectionPropertiesV2BasicResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a WorkspaceConnections operations. */
export interface WorkspaceConnectionsOperations {
  /** Test machine learning workspaces connections under the specified workspace. */
  testConnection: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    options?: WorkspaceConnectionsTestConnectionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use testConnection instead */
  beginTestConnection: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    options?: WorkspaceConnectionsTestConnectionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use testConnection instead */
  beginTestConnectionAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    options?: WorkspaceConnectionsTestConnectionOptionalParams,
  ) => Promise<void>;
  /** List all the secrets of a machine learning workspaces connections. */
  listSecrets: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    options?: WorkspaceConnectionsListSecretsOptionalParams,
  ) => Promise<WorkspaceConnectionPropertiesV2BasicResource>;
  /** Lists all the available machine learning workspaces connections under the specified workspace. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspaceConnectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<WorkspaceConnectionPropertiesV2BasicResource>;
  /** Delete machine learning workspaces connections by name. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    options?: WorkspaceConnectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update machine learning workspaces connections under the specified workspace. */
  update: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    options?: WorkspaceConnectionsUpdateOptionalParams,
  ) => Promise<WorkspaceConnectionPropertiesV2BasicResource>;
  /** Create or update machine learning workspaces connections under the specified workspace. */
  create: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    options?: WorkspaceConnectionsCreateOptionalParams,
  ) => Promise<WorkspaceConnectionPropertiesV2BasicResource>;
  /** Lists machine learning workspaces connections by name. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    connectionName: string,
    options?: WorkspaceConnectionsGetOptionalParams,
  ) => Promise<WorkspaceConnectionPropertiesV2BasicResource>;
}

function _getWorkspaceConnections(context: AzureMachineLearningServicesManagementContext) {
  return {
    testConnection: (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      options?: WorkspaceConnectionsTestConnectionOptionalParams,
    ) => testConnection(context, resourceGroupName, workspaceName, connectionName, options),
    beginTestConnection: async (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      options?: WorkspaceConnectionsTestConnectionOptionalParams,
    ) => {
      const poller = testConnection(
        context,
        resourceGroupName,
        workspaceName,
        connectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginTestConnectionAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      options?: WorkspaceConnectionsTestConnectionOptionalParams,
    ) => {
      return await testConnection(
        context,
        resourceGroupName,
        workspaceName,
        connectionName,
        options,
      );
    },
    listSecrets: (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      options?: WorkspaceConnectionsListSecretsOptionalParams,
    ) => listSecrets(context, resourceGroupName, workspaceName, connectionName, options),
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspaceConnectionsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      options?: WorkspaceConnectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, connectionName, options),
    update: (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      options?: WorkspaceConnectionsUpdateOptionalParams,
    ) => update(context, resourceGroupName, workspaceName, connectionName, options),
    create: (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      options?: WorkspaceConnectionsCreateOptionalParams,
    ) => create(context, resourceGroupName, workspaceName, connectionName, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      connectionName: string,
      options?: WorkspaceConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, connectionName, options),
  };
}

export function _getWorkspaceConnectionsOperations(
  context: AzureMachineLearningServicesManagementContext,
): WorkspaceConnectionsOperations {
  return {
    ..._getWorkspaceConnections(context),
  };
}
