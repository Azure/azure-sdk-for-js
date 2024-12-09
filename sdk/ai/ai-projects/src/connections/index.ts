
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client } from "@azure-rest/core-client";
import { OptionalRequestParameters } from "../agents/customModels.js";
import { ListConnectionsQueryParamProperties } from "../generated/src/parameters.js";
import { GetConnectionResponseOutput, GetWorkspaceResponseOutput } from "./inputOutput.js";
import { getConnection, getConnectionWithSecrets, getWorkspace, listConnections } from "./connections.js";

export interface ConnectionsOperations {
  /** Gets the properties of the specified machine learning workspace. */
  getWorkspace: (
    requestParams?: OptionalRequestParameters
  ) => Promise<GetWorkspaceResponseOutput>;
  /** List the details of all the connections (not including their credentials) */
  listConnections: (
    options?: ListConnectionsQueryParamProperties,
    requestParams?: OptionalRequestParameters
  ) => Promise<Array<GetConnectionResponseOutput>>;
  /** Get the details of a single connection, without credentials */
  getConnection: (
    connectionName: string,
    requestParams?: OptionalRequestParameters
  ) => Promise<GetConnectionResponseOutput>;
  /** Get the details of a single connections, including credentials (if available). */
  getConnectionWithSecrets: (
    connectionName: string,
    requestParams?: OptionalRequestParameters
  ) => Promise<GetConnectionResponseOutput>;
}

function getConnections(context: Client): ConnectionsOperations {
  return {
    getWorkspace: (requestParams?: OptionalRequestParameters) =>
      getWorkspace(context, requestParams),
    listConnections: (options?: ListConnectionsQueryParamProperties, requestParams?: OptionalRequestParameters) =>
      listConnections(context, {...requestParams, queryParameters: options as Record<string, unknown>}),
    getConnection: (connectionName: string, requestParams?: OptionalRequestParameters) =>
      getConnection(context, connectionName, requestParams),
    getConnectionWithSecrets: (connectionName: string, requestParams?: OptionalRequestParameters) =>
      getConnectionWithSecrets(context, connectionName, { ...requestParams, body: {ignored: ""}}),
  };
}

export function getConnectionsOperations(context: Client): ConnectionsOperations {
  return {
    ...getConnections(context),
  };
}
