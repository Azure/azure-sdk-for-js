// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { get } from "../../api/validateOperationResults/operations.js";
import { ValidateOperationResultsGetOptionalParams } from "../../api/validateOperationResults/options.js";
import { ValidateOperationsResponse } from "../../models/models.js";

/** Interface representing a ValidateOperationResults operations. */
export interface ValidateOperationResultsOperations {
  /** Fetches the result of a triggered validate operation. */
  get: (
    vaultName: string,
    resourceGroupName: string,
    operationId: string,
    options?: ValidateOperationResultsGetOptionalParams,
  ) => Promise<ValidateOperationsResponse | undefined>;
}

function _getValidateOperationResults(context: RecoveryServicesBackupContext) {
  return {
    get: (
      vaultName: string,
      resourceGroupName: string,
      operationId: string,
      options?: ValidateOperationResultsGetOptionalParams,
    ) => get(context, vaultName, resourceGroupName, operationId, options),
  };
}

export function _getValidateOperationResultsOperations(
  context: RecoveryServicesBackupContext,
): ValidateOperationResultsOperations {
  return {
    ..._getValidateOperationResults(context),
  };
}
