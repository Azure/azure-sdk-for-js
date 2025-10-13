// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MySQLManagementFlexibleServerContext } from "../../api/mySQLManagementFlexibleServerContext.js";
import { create } from "../../api/longRunningBackup/operations.js";
import type { LongRunningBackupCreateOptionalParams } from "../../api/longRunningBackup/options.js";
import type { ServerBackupV2 } from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a LongRunningBackup operations. */
export interface LongRunningBackupOperations {
  /** Create backup for a given server with specified backup name. */
  create: (
    resourceGroupName: string,
    serverName: string,
    backupName: string,
    options?: LongRunningBackupCreateOptionalParams,
  ) => PollerLike<OperationState<ServerBackupV2>, ServerBackupV2>;
}

function _getLongRunningBackup(context: MySQLManagementFlexibleServerContext) {
  return {
    create: (
      resourceGroupName: string,
      serverName: string,
      backupName: string,
      options?: LongRunningBackupCreateOptionalParams,
    ) => create(context, resourceGroupName, serverName, backupName, options),
  };
}

export function _getLongRunningBackupOperations(
  context: MySQLManagementFlexibleServerContext,
): LongRunningBackupOperations {
  return {
    ..._getLongRunningBackup(context),
  };
}
