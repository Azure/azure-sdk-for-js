// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../api/aiProjectContext.js";
import { Connection } from "../../models/models.js";
import {
  ConnectionsListOptionalParams,
  ConnectionsGetWithCredentialsOptionalParams,
  ConnectionsGetOptionalParams,
} from "../../api/connections/options.js";
import {
  list,
  getWithCredentials,
  get,
} from "../../api/connections/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Connections operations. */
export interface ConnectionsOperations {
  /** List all connections in the project, without populating connection credentials */
  list: (
    options?: ConnectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<Connection>;
  /** Get a connection by name, with its connection credentials */
  getWithCredentials: (
    name: string,
    options?: ConnectionsGetWithCredentialsOptionalParams,
  ) => Promise<Connection>;
  /** Get a connection by name, without populating connection credentials */
  get: (
    name: string,
    options?: ConnectionsGetOptionalParams,
  ) => Promise<Connection>;
}

function _getConnections(context: AIProjectContext) {
  return {
    list: (options?: ConnectionsListOptionalParams) => list(context, options),
    getWithCredentials: (
      name: string,
      options?: ConnectionsGetWithCredentialsOptionalParams,
    ) => getWithCredentials(context, name, options),
    get: (name: string, options?: ConnectionsGetOptionalParams) =>
      get(context, name, options),
  };
}

export function _getConnectionsOperations(
  context: AIProjectContext,
): ConnectionsOperations {
  return {
    ..._getConnections(context),
  };
}
