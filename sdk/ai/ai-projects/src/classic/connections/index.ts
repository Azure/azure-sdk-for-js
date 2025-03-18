// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../api/aiProjectContext.js";
import {
  getConnectionWithSecrets,
  getConnection,
  listConnections,
  getWorkspace,
} from "../../api/connections/index.js";
import {
  GetWorkspaceResponse,
  ListConnectionsResponse,
  GetConnectionResponse,
} from "../../models/models.js";
import {
  ConnectionsGetConnectionWithSecretsOptionalParams,
  ConnectionsGetConnectionOptionalParams,
  ConnectionsListConnectionsOptionalParams,
  ConnectionsGetWorkspaceOptionalParams,
} from "../../api/options.js";

/** Interface representing a Connections operations. */
export interface ConnectionsOperations {
  /** Get the details of a single connection, including credentials (if available). */
  getConnectionWithSecrets: (
    connectionName: string,
    ignored: string,
    options?: ConnectionsGetConnectionWithSecretsOptionalParams,
  ) => Promise<GetConnectionResponse>;
  /** Get the details of a single connection, without credentials. */
  getConnection: (
    connectionName: string,
    options?: ConnectionsGetConnectionOptionalParams,
  ) => Promise<GetConnectionResponse>;
  /** List the details of all the connections (not including their credentials) */
  listConnections: (
    options?: ConnectionsListConnectionsOptionalParams,
  ) => Promise<ListConnectionsResponse>;
  /** Gets the properties of the specified machine learning workspace. */
  getWorkspace: (
    options?: ConnectionsGetWorkspaceOptionalParams,
  ) => Promise<GetWorkspaceResponse>;
}

function _getConnections(context: AIProjectContext) {
  return {
    getConnectionWithSecrets: (
      connectionName: string,
      ignored: string,
      options?: ConnectionsGetConnectionWithSecretsOptionalParams,
    ) => getConnectionWithSecrets(context, connectionName, ignored, options),
    getConnection: (
      connectionName: string,
      options?: ConnectionsGetConnectionOptionalParams,
    ) => getConnection(context, connectionName, options),
    listConnections: (options?: ConnectionsListConnectionsOptionalParams) =>
      listConnections(context, options),
    getWorkspace: (options?: ConnectionsGetWorkspaceOptionalParams) =>
      getWorkspace(context, options),
  };
}

export function _getConnectionsOperations(
  context: AIProjectContext,
): ConnectionsOperations {
  return {
    ..._getConnections(context),
  };
}
