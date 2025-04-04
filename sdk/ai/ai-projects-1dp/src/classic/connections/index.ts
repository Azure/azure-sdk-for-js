// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../api/aiProjectContext.js";
import { Connection } from "../../models/models.js";
import {
  ConnectionsListOptionalParams,
  ConnectionsGetOptionalParams,
} from "../../api/connections/options.js";
import { list, get } from "../../api/connections/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Connections operations. */
export interface ConnectionsOperations {
  /** List all connections in the project */
  list: (
    options?: ConnectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<Connection>;
  /** Get a connection by name. */
  get: (
    name: string,
    options?: ConnectionsGetOptionalParams,
  ) => Promise<Connection>;
}

function _getConnections(context: AIProjectContext) {
  return {
    list: (options?: ConnectionsListOptionalParams) => list(context, options),
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
