// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryContext } from "../../api/discoveryContext.js";
import {
  listByWorkspace,
  $delete,
  createOrUpdate,
  get,
} from "../../api/workspacePrivateEndpointConnections/operations.js";
import {
  WorkspacePrivateEndpointConnectionsListByWorkspaceOptionalParams,
  WorkspacePrivateEndpointConnectionsDeleteOptionalParams,
  WorkspacePrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  WorkspacePrivateEndpointConnectionsGetOptionalParams,
} from "../../api/workspacePrivateEndpointConnections/options.js";
import { WorkspacePrivateEndpointConnection } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a WorkspacePrivateEndpointConnections operations. */
export interface WorkspacePrivateEndpointConnectionsOperations {
  /** Lists all private endpoint connections for a workspace. */
  listByWorkspace: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacePrivateEndpointConnectionsListByWorkspaceOptionalParams,
  ) => PagedAsyncIterableIterator<WorkspacePrivateEndpointConnection>;
  /** Deletes the specified private endpoint connection. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    privateEndpointConnectionName: string,
    options?: WorkspacePrivateEndpointConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Approves or updates the specified private endpoint connection. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    privateEndpointConnectionName: string,
    resource: WorkspacePrivateEndpointConnection,
    options?: WorkspacePrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<WorkspacePrivateEndpointConnection>,
    WorkspacePrivateEndpointConnection
  >;
  /** Gets the specified private endpoint connection associated with the workspace. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    privateEndpointConnectionName: string,
    options?: WorkspacePrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<WorkspacePrivateEndpointConnection>;
}

function _getWorkspacePrivateEndpointConnections(context: DiscoveryContext) {
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
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      privateEndpointConnectionName: string,
      resource: WorkspacePrivateEndpointConnection,
      options?: WorkspacePrivateEndpointConnectionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        privateEndpointConnectionName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      privateEndpointConnectionName: string,
      options?: WorkspacePrivateEndpointConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, privateEndpointConnectionName, options),
  };
}

export function _getWorkspacePrivateEndpointConnectionsOperations(
  context: DiscoveryContext,
): WorkspacePrivateEndpointConnectionsOperations {
  return {
    ..._getWorkspacePrivateEndpointConnections(context),
  };
}
