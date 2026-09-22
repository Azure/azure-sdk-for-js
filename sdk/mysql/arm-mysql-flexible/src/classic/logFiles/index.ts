// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MySQLManagementFlexibleServerContext } from "../../api/mySQLManagementFlexibleServerContext.js";
import { listByServer } from "../../api/logFiles/operations.js";
import type { LogFilesListByServerOptionalParams } from "../../api/logFiles/options.js";
import type { LogFile } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a LogFiles operations. */
export interface LogFilesOperations {
  /** List all the server log files in a given server. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: LogFilesListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<LogFile>;
}

function _getLogFiles(context: MySQLManagementFlexibleServerContext) {
  return {
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: LogFilesListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
  };
}

export function _getLogFilesOperations(
  context: MySQLManagementFlexibleServerContext,
): LogFilesOperations {
  return {
    ..._getLogFiles(context),
  };
}
