// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";
import type { ListConnectionsQueryParamProperties } from "../customization/parameters.js";
import type { GetConnectionResponseOutput } from "../customization/outputModels.js";

/** Get workspace optional parameters. */
export interface GetWorkspaceOptionalParams extends OperationOptions {}

/** List connections optional parameters. */
export interface ListConnectionsOptionalParams
  extends ListConnectionsQueryParamProperties,
    OperationOptions {}

/** Get connection optional parameters. */
export interface GetConnectionOptionalParams extends OperationOptions {}

/** Get connection with secrets optional parameters. */
export interface GetConnectionWithSecretsOptionalParams extends OperationOptions {}

/**
 * Connections Interface for managing connections.
 */
export interface ConnectionsOperations {
  /** List the details of all the connections (not including their credentials) */
  listConnections: (
    options?: ListConnectionsOptionalParams,
  ) => Promise<Array<GetConnectionResponseOutput>>;
  /** Get the details of a single connection, without credentials */
  getConnection: (
    connectionName: string,
    options?: GetConnectionOptionalParams,
  ) => Promise<GetConnectionResponseOutput>;
  /** Get the details of a single connections, including credentials (if available). */
  getConnectionWithSecrets: (
    connectionName: string,
    options?: GetConnectionWithSecretsOptionalParams,
  ) => Promise<GetConnectionResponseOutput>;
}
