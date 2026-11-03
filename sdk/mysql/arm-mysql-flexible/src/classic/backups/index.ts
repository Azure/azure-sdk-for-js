// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MySQLManagementFlexibleServerContext } from "../../api/mySQLManagementFlexibleServerContext.js";
import { listByServer, put, get } from "../../api/backups/operations.js";
import type {
  BackupsListByServerOptionalParams,
  BackupsPutOptionalParams,
  BackupsGetOptionalParams,
} from "../../api/backups/options.js";
import type { ServerBackup } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Backups operations. */
export interface BackupsOperations {
  /** List all the backups for a given server. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: BackupsListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<ServerBackup>;
  /** Create backup for a given server with specified backup name. */
  put: (
    resourceGroupName: string,
    serverName: string,
    backupName: string,
    options?: BackupsPutOptionalParams,
  ) => Promise<ServerBackup>;
  /** List all the backups for a given server. */
  get: (
    resourceGroupName: string,
    serverName: string,
    backupName: string,
    options?: BackupsGetOptionalParams,
  ) => Promise<ServerBackup>;
}

function _getBackups(context: MySQLManagementFlexibleServerContext) {
  return {
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: BackupsListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    put: (
      resourceGroupName: string,
      serverName: string,
      backupName: string,
      options?: BackupsPutOptionalParams,
    ) => put(context, resourceGroupName, serverName, backupName, options),
    get: (
      resourceGroupName: string,
      serverName: string,
      backupName: string,
      options?: BackupsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, backupName, options),
  };
}

export function _getBackupsOperations(
  context: MySQLManagementFlexibleServerContext,
): BackupsOperations {
  return {
    ..._getBackups(context),
  };
}
