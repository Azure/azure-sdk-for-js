// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { get } from "../../api/backupOperationResults/operations.js";
import type { BackupOperationResultsGetOptionalParams } from "../../api/backupOperationResults/options.js";

/** Interface representing a BackupOperationResults operations. */
export interface BackupOperationResultsOperations {
  /**
   * Provides the status of the delete operations such as deleting backed up item. Once the operation has started, the
   * status code in the response would be Accepted. It will continue to be in this state till it reaches completion. On
   * successful completion, the status code will be OK. This method expects OperationID as an argument. OperationID is
   * part of the Location header of the operation response.
   */
  get: (
    vaultName: string,
    resourceGroupName: string,
    operationId: string,
    options?: BackupOperationResultsGetOptionalParams,
  ) => Promise<void>;
}

function _getBackupOperationResults(context: RecoveryServicesBackupContext) {
  return {
    get: (
      vaultName: string,
      resourceGroupName: string,
      operationId: string,
      options?: BackupOperationResultsGetOptionalParams,
    ) => get(context, vaultName, resourceGroupName, operationId, options),
  };
}

export function _getBackupOperationResultsOperations(
  context: RecoveryServicesBackupContext,
): BackupOperationResultsOperations {
  return {
    ..._getBackupOperationResults(context),
  };
}
