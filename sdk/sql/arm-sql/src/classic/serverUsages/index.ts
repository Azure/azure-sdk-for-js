// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { listByServer } from "../../api/serverUsages/operations.js";
import type { ServerUsagesListByServerOptionalParams } from "../../api/serverUsages/options.js";
import type { ServerUsage } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ServerUsages operations. */
export interface ServerUsagesOperations {
  /** Gets server usages. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: ServerUsagesListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<ServerUsage>;
}

function _getServerUsages(context: SqlManagementContext) {
  return {
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: ServerUsagesListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
  };
}

export function _getServerUsagesOperations(context: SqlManagementContext): ServerUsagesOperations {
  return {
    ..._getServerUsages(context),
  };
}
