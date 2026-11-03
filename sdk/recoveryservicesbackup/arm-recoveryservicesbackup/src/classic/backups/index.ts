// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { trigger } from "../../api/backups/operations.js";
import type { BackupsTriggerOptionalParams } from "../../api/backups/options.js";
import type { BackupRequestResource } from "../../models/models.js";

/** Interface representing a Backups operations. */
export interface BackupsOperations {
  /**
   * Triggers backup for specified backed up item. This is an asynchronous operation. To know the status of the
   * operation, call GetProtectedItemOperationResult API.
   */
  trigger: (
    vaultName: string,
    resourceGroupName: string,
    fabricName: string,
    containerName: string,
    protectedItemName: string,
    parameters: BackupRequestResource,
    options?: BackupsTriggerOptionalParams,
  ) => Promise<void>;
}

function _getBackups(context: RecoveryServicesBackupContext) {
  return {
    trigger: (
      vaultName: string,
      resourceGroupName: string,
      fabricName: string,
      containerName: string,
      protectedItemName: string,
      parameters: BackupRequestResource,
      options?: BackupsTriggerOptionalParams,
    ) =>
      trigger(
        context,
        vaultName,
        resourceGroupName,
        fabricName,
        containerName,
        protectedItemName,
        parameters,
        options,
      ),
  };
}

export function _getBackupsOperations(context: RecoveryServicesBackupContext): BackupsOperations {
  return {
    ..._getBackups(context),
  };
}
