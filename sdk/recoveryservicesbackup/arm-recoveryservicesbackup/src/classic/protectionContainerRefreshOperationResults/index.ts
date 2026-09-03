// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { get } from "../../api/protectionContainerRefreshOperationResults/operations.js";
import type { ProtectionContainerRefreshOperationResultsGetOptionalParams } from "../../api/protectionContainerRefreshOperationResults/options.js";

/** Interface representing a ProtectionContainerRefreshOperationResults operations. */
export interface ProtectionContainerRefreshOperationResultsOperations {
  /** Provides the result of the refresh operation triggered by the BeginRefresh operation. */
  get: (
    vaultName: string,
    resourceGroupName: string,
    fabricName: string,
    operationId: string,
    options?: ProtectionContainerRefreshOperationResultsGetOptionalParams,
  ) => Promise<void>;
}

function _getProtectionContainerRefreshOperationResults(context: RecoveryServicesBackupContext) {
  return {
    get: (
      vaultName: string,
      resourceGroupName: string,
      fabricName: string,
      operationId: string,
      options?: ProtectionContainerRefreshOperationResultsGetOptionalParams,
    ) => get(context, vaultName, resourceGroupName, fabricName, operationId, options),
  };
}

export function _getProtectionContainerRefreshOperationResultsOperations(
  context: RecoveryServicesBackupContext,
): ProtectionContainerRefreshOperationResultsOperations {
  return {
    ..._getProtectionContainerRefreshOperationResults(context),
  };
}
