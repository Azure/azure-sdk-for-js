// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { get } from "../../api/bmsPrepareDataMoveOperationResult/operations.js";
import { BMSPrepareDataMoveOperationResultGetOptionalParams } from "../../api/bmsPrepareDataMoveOperationResult/options.js";
import { VaultStorageConfigOperationResultResponseUnion } from "../../models/models.js";

/** Interface representing a BMSPrepareDataMoveOperationResult operations. */
export interface BMSPrepareDataMoveOperationResultOperations {
  /** Fetches operation status for data move operation on vault */
  get: (
    vaultName: string,
    resourceGroupName: string,
    operationId: string,
    options?: BMSPrepareDataMoveOperationResultGetOptionalParams,
  ) => Promise<VaultStorageConfigOperationResultResponseUnion | undefined>;
}

function _getBMSPrepareDataMoveOperationResult(context: RecoveryServicesBackupContext) {
  return {
    get: (
      vaultName: string,
      resourceGroupName: string,
      operationId: string,
      options?: BMSPrepareDataMoveOperationResultGetOptionalParams,
    ) => get(context, vaultName, resourceGroupName, operationId, options),
  };
}

export function _getBMSPrepareDataMoveOperationResultOperations(
  context: RecoveryServicesBackupContext,
): BMSPrepareDataMoveOperationResultOperations {
  return {
    ..._getBMSPrepareDataMoveOperationResult(context),
  };
}
