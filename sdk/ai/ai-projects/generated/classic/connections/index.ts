// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../api/aiProjectContext.js";
import { list, getWithCredentials, get } from "../../api/connections/operations.js";
import {
  ConnectionsListOptionalParams,
  ConnectionsGetWithCredentialsOptionalParams,
  ConnectionsGetOptionalParams,
} from "../../api/connections/options.js";
import { Connection } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Connections operations. */
export interface ConnectionsOperations {
  /** Returns the connections available in the current project, optionally filtered by type or default status. */
  list: (options?: ConnectionsListOptionalParams) => PagedAsyncIterableIterator<Connection>;
  /** Retrieves the specified connection together with its credential values. */
  getWithCredentials: (
    name: string,
    options?: ConnectionsGetWithCredentialsOptionalParams,
  ) => Promise<Connection>;
  /** Retrieves the specified connection and its configuration details without including credential values. */
  get: (name: string, options?: ConnectionsGetOptionalParams) => Promise<Connection>;
}

function _getConnections(context: AIProjectContext) {
  return {
    list: (options?: ConnectionsListOptionalParams) => list(context, options),
    getWithCredentials: (name: string, options?: ConnectionsGetWithCredentialsOptionalParams) =>
      getWithCredentials(context, name, options),
    get: (name: string, options?: ConnectionsGetOptionalParams) => get(context, name, options),
  };
}

export function _getConnectionsOperations(context: AIProjectContext): ConnectionsOperations {
  return {
    ..._getConnections(context),
  };
}
