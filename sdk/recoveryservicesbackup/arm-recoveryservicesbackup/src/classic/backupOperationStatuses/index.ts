// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { get } from "../../api/backupOperationStatuses/operations.js";
import type { BackupOperationStatusesGetOptionalParams } from "../../api/backupOperationStatuses/options.js";
import type { OperationStatus } from "../../models/models.js";

/** Interface representing a BackupOperationStatuses operations. */
export interface BackupOperationStatusesOperations {
  /**
   * Fetches the status of an operation such as triggering a backup, restore. The status can be in progress, completed
   * or failed. You can refer to the OperationStatus enum for all the possible states of an operation. Some operations
   * create jobs. This method returns the list of jobs when the operation is complete.
   */
  get: (
    vaultName: string,
    resourceGroupName: string,
    operationId: string,
    options?: BackupOperationStatusesGetOptionalParams,
  ) => Promise<OperationStatus>;
}

function _getBackupOperationStatuses(context: RecoveryServicesBackupContext) {
  return {
    get: (
      vaultName: string,
      resourceGroupName: string,
      operationId: string,
      options?: BackupOperationStatusesGetOptionalParams,
    ) => get(context, vaultName, resourceGroupName, operationId, options),
  };
}

export function _getBackupOperationStatusesOperations(
  context: RecoveryServicesBackupContext,
): BackupOperationStatusesOperations {
  return {
    ..._getBackupOperationStatuses(context),
  };
}
