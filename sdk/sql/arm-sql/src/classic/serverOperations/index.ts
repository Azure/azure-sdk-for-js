// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { listByServer } from "../../api/serverOperations/operations.js";
import { ServerOperationsListByServerOptionalParams } from "../../api/serverOperations/options.js";
import { ServerOperation } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ServerOperations operations. */
export interface ServerOperationsOperations {
  /** Gets a list of operations performed on the server. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: ServerOperationsListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<ServerOperation>;
}

function _getServerOperations(context: SqlManagementContext) {
  return {
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: ServerOperationsListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
  };
}

export function _getServerOperationsOperations(
  context: SqlManagementContext,
): ServerOperationsOperations {
  return {
    ..._getServerOperations(context),
  };
}
