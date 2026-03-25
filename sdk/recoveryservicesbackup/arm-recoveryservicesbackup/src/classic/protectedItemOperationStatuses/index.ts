// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { get } from "../../api/protectedItemOperationStatuses/operations.js";
import type { ProtectedItemOperationStatusesGetOptionalParams } from "../../api/protectedItemOperationStatuses/options.js";
import type { OperationStatus } from "../../models/models.js";

/** Interface representing a ProtectedItemOperationStatuses operations. */
export interface ProtectedItemOperationStatusesOperations {
  /**
   * Fetches the status of an operation such as triggering a backup, restore. The status can be in progress, completed
   * or failed. You can refer to the OperationStatus enum for all the possible states of the operation. Some operations
   * create jobs. This method returns the list of jobs associated with the operation.
   */
  get: (
    vaultName: string,
    resourceGroupName: string,
    fabricName: string,
    containerName: string,
    protectedItemName: string,
    operationId: string,
    options?: ProtectedItemOperationStatusesGetOptionalParams,
  ) => Promise<OperationStatus>;
}

function _getProtectedItemOperationStatuses(context: RecoveryServicesBackupContext) {
  return {
    get: (
      vaultName: string,
      resourceGroupName: string,
      fabricName: string,
      containerName: string,
      protectedItemName: string,
      operationId: string,
      options?: ProtectedItemOperationStatusesGetOptionalParams,
    ) =>
      get(
        context,
        vaultName,
        resourceGroupName,
        fabricName,
        containerName,
        protectedItemName,
        operationId,
        options,
      ),
  };
}

export function _getProtectedItemOperationStatusesOperations(
  context: RecoveryServicesBackupContext,
): ProtectedItemOperationStatusesOperations {
  return {
    ..._getProtectedItemOperationStatuses(context),
  };
}
