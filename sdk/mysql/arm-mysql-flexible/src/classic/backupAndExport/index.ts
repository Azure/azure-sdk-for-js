// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MySQLManagementFlexibleServerContext } from "../../api/mySQLManagementFlexibleServerContext.js";
import { validateBackup, create } from "../../api/backupAndExport/operations.js";
import type {
  BackupAndExportValidateBackupOptionalParams,
  BackupAndExportCreateOptionalParams,
} from "../../api/backupAndExport/options.js";
import type {
  BackupAndExportRequest,
  BackupAndExportResponse,
  ValidateBackupResponse,
} from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BackupAndExport operations. */
export interface BackupAndExportOperations {
  /** Validates if backup can be performed for given server. */
  validateBackup: (
    resourceGroupName: string,
    serverName: string,
    options?: BackupAndExportValidateBackupOptionalParams,
  ) => Promise<ValidateBackupResponse>;
  /** Exports the backup of the given server by creating a backup if not existing. */
  create: (
    resourceGroupName: string,
    serverName: string,
    parameters: BackupAndExportRequest,
    options?: BackupAndExportCreateOptionalParams,
  ) => PollerLike<OperationState<BackupAndExportResponse>, BackupAndExportResponse>;
}

function _getBackupAndExport(context: MySQLManagementFlexibleServerContext) {
  return {
    validateBackup: (
      resourceGroupName: string,
      serverName: string,
      options?: BackupAndExportValidateBackupOptionalParams,
    ) => validateBackup(context, resourceGroupName, serverName, options),
    create: (
      resourceGroupName: string,
      serverName: string,
      parameters: BackupAndExportRequest,
      options?: BackupAndExportCreateOptionalParams,
    ) => create(context, resourceGroupName, serverName, parameters, options),
  };
}

export function _getBackupAndExportOperations(
  context: MySQLManagementFlexibleServerContext,
): BackupAndExportOperations {
  return {
    ..._getBackupAndExport(context),
  };
}
