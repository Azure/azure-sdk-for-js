// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HealthcareApisManagementContext } from "../../api/healthcareApisManagementContext.js";
import {
  listByWorkspace,
  $delete,
  createOrUpdate,
  get,
} from "../../api/workspacePrivateEndpointConnections/operations.js";
import type {
  WorkspacePrivateEndpointConnectionsListByWorkspaceOptionalParams,
  WorkspacePrivateEndpointConnectionsDeleteOptionalParams,
  WorkspacePrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  WorkspacePrivateEndpointConnectionsGetOptionalParams,
} from "../../api/workspacePrivateEndpointConnections/options.js";
import type { PrivateEndpointConnectionDescription } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a WorkspacePrivateEndpointConnections operations. */
export interface WorkspacePrivateEndpointConnectionsOperations {
  /** Lists all private endpoint connections for a workspace. */
  listByWorkspace: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacePrivateEndpointConnectionsListByWorkspaceOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnectionDescription>;
  /** Deletes a private endpoint connection. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    privateEndpointConnectionName: string,
    options?: WorkspacePrivateEndpointConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    workspaceName: string,
    privateEndpointConnectionName: string,
    options?: WorkspacePrivateEndpointConnectionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    privateEndpointConnectionName: string,
    options?: WorkspacePrivateEndpointConnectionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update the state of the specified private endpoint connection associated with the workspace. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    privateEndpointConnectionName: string,
    properties: PrivateEndpointConnectionDescription,
    options?: WorkspacePrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<PrivateEndpointConnectionDescription>,
    PrivateEndpointConnectionDescription
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    privateEndpointConnectionName: string,
    properties: PrivateEndpointConnectionDescription,
    options?: WorkspacePrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<PrivateEndpointConnectionDescription>,
      PrivateEndpointConnectionDescription
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    privateEndpointConnectionName: string,
    properties: PrivateEndpointConnectionDescription,
    options?: WorkspacePrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  ) => Promise<PrivateEndpointConnectionDescription>;
  /** Gets the specified private endpoint connection associated with the workspace. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    privateEndpointConnectionName: string,
    options?: WorkspacePrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<PrivateEndpointConnectionDescription>;
}

function _getWorkspacePrivateEndpointConnections(context: HealthcareApisManagementContext) {
  return {
    listByWorkspace: (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspacePrivateEndpointConnectionsListByWorkspaceOptionalParams,
    ) => listByWorkspace(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      privateEndpointConnectionName: string,
      options?: WorkspacePrivateEndpointConnectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, privateEndpointConnectionName, options),
    beginDelete: async (
      resourceGroupName: string,
      workspaceName: string,
      privateEndpointConnectionName: string,
      options?: WorkspacePrivateEndpointConnectionsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        workspaceName,
        privateEndpointConnectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      privateEndpointConnectionName: string,
      options?: WorkspacePrivateEndpointConnectionsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        workspaceName,
        privateEndpointConnectionName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      privateEndpointConnectionName: string,
      properties: PrivateEndpointConnectionDescription,
      options?: WorkspacePrivateEndpointConnectionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        privateEndpointConnectionName,
        properties,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      privateEndpointConnectionName: string,
      properties: PrivateEndpointConnectionDescription,
      options?: WorkspacePrivateEndpointConnectionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        privateEndpointConnectionName,
        properties,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      privateEndpointConnectionName: string,
      properties: PrivateEndpointConnectionDescription,
      options?: WorkspacePrivateEndpointConnectionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        privateEndpointConnectionName,
        properties,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      workspaceName: string,
      privateEndpointConnectionName: string,
      options?: WorkspacePrivateEndpointConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, privateEndpointConnectionName, options),
  };
}

export function _getWorkspacePrivateEndpointConnectionsOperations(
  context: HealthcareApisManagementContext,
): WorkspacePrivateEndpointConnectionsOperations {
  return {
    ..._getWorkspacePrivateEndpointConnections(context),
  };
}
