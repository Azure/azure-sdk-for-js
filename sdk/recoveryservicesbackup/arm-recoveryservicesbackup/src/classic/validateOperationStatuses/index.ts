// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { get } from "../../api/validateOperationStatuses/operations.js";
import { ValidateOperationStatusesGetOptionalParams } from "../../api/validateOperationStatuses/options.js";
import { OperationStatus } from "../../models/models.js";

/** Interface representing a ValidateOperationStatuses operations. */
export interface ValidateOperationStatusesOperations {
  /**
   * Fetches the status of a triggered validate operation. The status can be in progress, completed
   * or failed. You can refer to the OperationStatus enum for all the possible states of the operation.
   * If operation has completed, this method returns the list of errors obtained while validating the operation.
   */
  get: (
    vaultName: string,
    resourceGroupName: string,
    operationId: string,
    options?: ValidateOperationStatusesGetOptionalParams,
  ) => Promise<OperationStatus>;
}

function _getValidateOperationStatuses(context: RecoveryServicesBackupContext) {
  return {
    get: (
      vaultName: string,
      resourceGroupName: string,
      operationId: string,
      options?: ValidateOperationStatusesGetOptionalParams,
    ) => get(context, vaultName, resourceGroupName, operationId, options),
  };
}

export function _getValidateOperationStatusesOperations(
  context: RecoveryServicesBackupContext,
): ValidateOperationStatusesOperations {
  return {
    ..._getValidateOperationStatuses(context),
  };
}
