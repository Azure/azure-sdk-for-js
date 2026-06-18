// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { get } from "../../api/protectedItemOperationResults/operations.js";
import { ProtectedItemOperationResultsGetOptionalParams } from "../../api/protectedItemOperationResults/options.js";
import { ProtectedItemResource } from "../../models/models.js";

/** Interface representing a ProtectedItemOperationResults operations. */
export interface ProtectedItemOperationResultsOperations {
  /** Fetches the result of any operation on the backup item. */
  get: (
    vaultName: string,
    resourceGroupName: string,
    fabricName: string,
    containerName: string,
    protectedItemName: string,
    operationId: string,
    options?: ProtectedItemOperationResultsGetOptionalParams,
  ) => Promise<ProtectedItemResource | undefined>;
}

function _getProtectedItemOperationResults(context: RecoveryServicesBackupContext) {
  return {
    get: (
      vaultName: string,
      resourceGroupName: string,
      fabricName: string,
      containerName: string,
      protectedItemName: string,
      operationId: string,
      options?: ProtectedItemOperationResultsGetOptionalParams,
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

export function _getProtectedItemOperationResultsOperations(
  context: RecoveryServicesBackupContext,
): ProtectedItemOperationResultsOperations {
  return {
    ..._getProtectedItemOperationResults(context),
  };
}
