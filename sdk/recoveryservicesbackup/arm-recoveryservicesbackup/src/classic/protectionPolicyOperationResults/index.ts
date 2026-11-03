// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { get } from "../../api/protectionPolicyOperationResults/operations.js";
import type { ProtectionPolicyOperationResultsGetOptionalParams } from "../../api/protectionPolicyOperationResults/options.js";
import type { ProtectionPolicyResource } from "../../models/models.js";

/** Interface representing a ProtectionPolicyOperationResults operations. */
export interface ProtectionPolicyOperationResultsOperations {
  /** Provides the result of an operation. */
  get: (
    vaultName: string,
    resourceGroupName: string,
    policyName: string,
    operationId: string,
    options?: ProtectionPolicyOperationResultsGetOptionalParams,
  ) => Promise<ProtectionPolicyResource>;
}

function _getProtectionPolicyOperationResults(context: RecoveryServicesBackupContext) {
  return {
    get: (
      vaultName: string,
      resourceGroupName: string,
      policyName: string,
      operationId: string,
      options?: ProtectionPolicyOperationResultsGetOptionalParams,
    ) => get(context, vaultName, resourceGroupName, policyName, operationId, options),
  };
}

export function _getProtectionPolicyOperationResultsOperations(
  context: RecoveryServicesBackupContext,
): ProtectionPolicyOperationResultsOperations {
  return {
    ..._getProtectionPolicyOperationResults(context),
  };
}
