// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MySQLManagementFlexibleServerContext } from "../../api/mySQLManagementFlexibleServerContext.js";
import { list, get } from "../../api/longRunningBackups/operations.js";
import type {
  LongRunningBackupsListOptionalParams,
  LongRunningBackupsGetOptionalParams,
} from "../../api/longRunningBackups/options.js";
import type { ServerBackupV2 } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a LongRunningBackups operations. */
export interface LongRunningBackupsOperations {
  /** List all the backups for a given server. */
  list: (
    resourceGroupName: string,
    serverName: string,
    options?: LongRunningBackupsListOptionalParams,
  ) => PagedAsyncIterableIterator<ServerBackupV2>;
  /** Get backup for a given server. */
  get: (
    resourceGroupName: string,
    serverName: string,
    backupName: string,
    options?: LongRunningBackupsGetOptionalParams,
  ) => Promise<ServerBackupV2>;
}

function _getLongRunningBackups(context: MySQLManagementFlexibleServerContext) {
  return {
    list: (
      resourceGroupName: string,
      serverName: string,
      options?: LongRunningBackupsListOptionalParams,
    ) => list(context, resourceGroupName, serverName, options),
    get: (
      resourceGroupName: string,
      serverName: string,
      backupName: string,
      options?: LongRunningBackupsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, backupName, options),
  };
}

export function _getLongRunningBackupsOperations(
  context: MySQLManagementFlexibleServerContext,
): LongRunningBackupsOperations {
  return {
    ..._getLongRunningBackups(context),
  };
}
