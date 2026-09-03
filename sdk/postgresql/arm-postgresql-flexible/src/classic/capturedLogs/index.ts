// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgreSQLManagementFlexibleServerContext } from "../../api/postgreSQLManagementFlexibleServerContext.js";
import { listByServer } from "../../api/capturedLogs/operations.js";
import type { CapturedLogsListByServerOptionalParams } from "../../api/capturedLogs/options.js";
import type { CapturedLog } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a CapturedLogs operations. */
export interface CapturedLogsOperations {
  /** Lists all captured logs for download in a server. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: CapturedLogsListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<CapturedLog>;
}

function _getCapturedLogs(context: PostgreSQLManagementFlexibleServerContext) {
  return {
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: CapturedLogsListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
  };
}

export function _getCapturedLogsOperations(
  context: PostgreSQLManagementFlexibleServerContext,
): CapturedLogsOperations {
  return {
    ..._getCapturedLogs(context),
  };
}
