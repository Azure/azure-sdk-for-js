// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Client } from "@azure-rest/core-client";

import {
  getConnection,
  getConnectionWithSecrets,
  getWorkspace,
  listConnections,
} from "./connections.js";
import type {
  ConnectionsOperations,
  GetConnectionOptionalParams,
  GetConnectionWithSecretsOptionalParams,
  GetWorkspaceOptionalParams,
  ListConnectionsOptionalParams,
} from "./customModels.js";
import type { ConnectionsInternalOperations } from "./internalModels.js";

export * from "./inputOutput.js";

function getConnections(context: Client): ConnectionsInternalOperations {
  return {
    getWorkspace: (options?: GetWorkspaceOptionalParams) => getWorkspace(context, options),
    listConnections: (options?: ListConnectionsOptionalParams) => listConnections(context, options),
    getConnection: (connectionName: string, options?: GetConnectionOptionalParams) =>
      getConnection(context, connectionName, options),
    getConnectionWithSecrets: (
      connectionName: string,
      options?: GetConnectionWithSecretsOptionalParams,
    ) => getConnectionWithSecrets(context, connectionName, options),
  };
}

/**
 * Get the connections operations
 * @returns The connections operations
 **/
export function getConnectionsOperations(context: Client): ConnectionsOperations {
  return {
    ...getConnections(context),
  };
}
