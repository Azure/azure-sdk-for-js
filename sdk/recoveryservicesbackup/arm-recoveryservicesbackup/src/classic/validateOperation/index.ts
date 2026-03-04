// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { trigger } from "../../api/validateOperation/operations.js";
import type { ValidateOperationTriggerOptionalParams } from "../../api/validateOperation/options.js";
import type { ValidateOperationRequestResource } from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ValidateOperation operations. */
export interface ValidateOperationOperations {
  /** Validate operation for specified backed up item in the form of an asynchronous operation. Returns tracking headers which can be tracked using GetValidateOperationResult API. */
  trigger: (
    vaultName: string,
    resourceGroupName: string,
    parameters: ValidateOperationRequestResource,
    options?: ValidateOperationTriggerOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
}

function _getValidateOperation(context: RecoveryServicesBackupContext) {
  return {
    trigger: (
      vaultName: string,
      resourceGroupName: string,
      parameters: ValidateOperationRequestResource,
      options?: ValidateOperationTriggerOptionalParams,
    ) => trigger(context, vaultName, resourceGroupName, parameters, options),
  };
}

export function _getValidateOperationOperations(
  context: RecoveryServicesBackupContext,
): ValidateOperationOperations {
  return {
    ..._getValidateOperation(context),
  };
}
