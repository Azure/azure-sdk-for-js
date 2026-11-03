// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { get } from "../../api/protectionPolicyOperationStatuses/operations.js";
import type { ProtectionPolicyOperationStatusesGetOptionalParams } from "../../api/protectionPolicyOperationStatuses/options.js";
import type { OperationStatus } from "../../models/models.js";

/** Interface representing a ProtectionPolicyOperationStatuses operations. */
export interface ProtectionPolicyOperationStatusesOperations {
  /**
   * Provides the status of the asynchronous operations like backup, restore. The status can be in progress, completed
   * or failed. You can refer to the Operation Status enum for all the possible states of an operation. Some operations
   * create jobs. This method returns the list of jobs associated with operation.
   */
  get: (
    vaultName: string,
    resourceGroupName: string,
    policyName: string,
    operationId: string,
    options?: ProtectionPolicyOperationStatusesGetOptionalParams,
  ) => Promise<OperationStatus>;
}

function _getProtectionPolicyOperationStatuses(context: RecoveryServicesBackupContext) {
  return {
    get: (
      vaultName: string,
      resourceGroupName: string,
      policyName: string,
      operationId: string,
      options?: ProtectionPolicyOperationStatusesGetOptionalParams,
    ) => get(context, vaultName, resourceGroupName, policyName, operationId, options),
  };
}

export function _getProtectionPolicyOperationStatusesOperations(
  context: RecoveryServicesBackupContext,
): ProtectionPolicyOperationStatusesOperations {
  return {
    ..._getProtectionPolicyOperationStatuses(context),
  };
}
