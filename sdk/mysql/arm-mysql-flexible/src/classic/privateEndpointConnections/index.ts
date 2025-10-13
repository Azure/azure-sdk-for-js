// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MySQLManagementFlexibleServerContext } from "../../api/mySQLManagementFlexibleServerContext.js";
import {
  listByServer,
  $delete,
  createOrUpdate,
  get,
} from "../../api/privateEndpointConnections/operations.js";
import type {
  PrivateEndpointConnectionsListByServerOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "../../api/privateEndpointConnections/options.js";
import type {
  PrivateEndpointConnection,
  PrivateEndpointConnectionListResult,
} from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrivateEndpointConnections operations. */
export interface PrivateEndpointConnectionsOperations {
  /** Gets all private endpoint connections on a server. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: PrivateEndpointConnectionsListByServerOptionalParams,
  ) => Promise<PrivateEndpointConnectionListResult>;
  /** Deletes a private endpoint connection with a given name. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serverName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Approve or reject a private endpoint connection with a given name. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    privateEndpointConnectionName: string,
    parameters: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>;
  /** Gets a private endpoint connection. */
  get: (
    resourceGroupName: string,
    serverName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
}

function _getPrivateEndpointConnections(context: MySQLManagementFlexibleServerContext) {
  return {
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: PrivateEndpointConnectionsListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    delete: (
      resourceGroupName: string,
      serverName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serverName, privateEndpointConnectionName, options),
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      privateEndpointConnectionName: string,
      parameters: PrivateEndpointConnection,
      options?: PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        privateEndpointConnectionName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      serverName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, privateEndpointConnectionName, options),
  };
}

export function _getPrivateEndpointConnectionsOperations(
  context: MySQLManagementFlexibleServerContext,
): PrivateEndpointConnectionsOperations {
  return {
    ..._getPrivateEndpointConnections(context),
  };
}
