// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { validate } from "../../api/operation/operations.js";
import type { OperationValidateOptionalParams } from "../../api/operation/options.js";
import type {
  ValidateOperationRequestResource,
  ValidateOperationsResponse,
} from "../../models/models.js";

/** Interface representing a Operation operations. */
export interface OperationOperations {
  /** Validate operation for specified backed up item. This is a synchronous operation. */
  validate: (
    vaultName: string,
    resourceGroupName: string,
    parameters: ValidateOperationRequestResource,
    options?: OperationValidateOptionalParams,
  ) => Promise<ValidateOperationsResponse>;
}

function _getOperation(context: RecoveryServicesBackupContext) {
  return {
    validate: (
      vaultName: string,
      resourceGroupName: string,
      parameters: ValidateOperationRequestResource,
      options?: OperationValidateOptionalParams,
    ) => validate(context, vaultName, resourceGroupName, parameters, options),
  };
}

export function _getOperationOperations(
  context: RecoveryServicesBackupContext,
): OperationOperations {
  return {
    ..._getOperation(context),
  };
}
