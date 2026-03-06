// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../api/aiProjectContext.js";
import { list, getWithCredentials, get, getDefault } from "../../api/connections/operations.js";
import type {
  ConnectionsListOptionalParams,
  ConnectionsGetWithCredentialsOptionalParams,
  ConnectionsGetOptionalParams,
  ConnectionsGetDefaultOptionalParams,
} from "../../api/connections/options.js";
import type { Connection, ConnectionType } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";

/** Interface representing a Connections operations. */
export interface ConnectionsOperations {
  /** List all connections in the project, without populating connection credentials */
  list: (options?: ConnectionsListOptionalParams) => PagedAsyncIterableIterator<Connection>;
  /** Get a connection by name, with its connection credentials */
  getWithCredentials: (
    name: string,
    options?: ConnectionsGetWithCredentialsOptionalParams,
  ) => Promise<Connection>;
  /** Get a connection by name, without populating connection credentials */
  get: (
    name: string,
    includeCredentials?: boolean,
    options?: ConnectionsGetOptionalParams,
  ) => Promise<Connection>;
  /** Get the default connection for the project */
  getDefault: (
    connectionType: ConnectionType,
    includeCredentials?: boolean,
    options?: ConnectionsGetDefaultOptionalParams,
  ) => Promise<Connection>;
}

function _getConnections(context: AIProjectContext) {
  return {
    list: (options?: ConnectionsListOptionalParams) => list(context, options),
    getWithCredentials: (name: string, options?: ConnectionsGetWithCredentialsOptionalParams) =>
      getWithCredentials(context, name, options),
    get: (name: string, includeCredentials?: boolean, options?: ConnectionsGetOptionalParams) =>
      get(context, name, includeCredentials, options),
    getDefault: (
      connectionType: ConnectionType,
      includeCredentials?: boolean,
      options?: ConnectionsGetDefaultOptionalParams,
    ) => getDefault(context, connectionType, includeCredentials, options),
  };
}

export function _getConnectionsOperations(context: AIProjectContext): ConnectionsOperations {
  return {
    ..._getConnections(context),
  };
}
