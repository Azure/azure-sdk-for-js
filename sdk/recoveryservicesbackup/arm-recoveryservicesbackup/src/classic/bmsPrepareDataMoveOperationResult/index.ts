// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { get } from "../../api/bmsPrepareDataMoveOperationResult/operations.js";
import type { BMSPrepareDataMoveOperationResultGetOptionalParams } from "../../api/bmsPrepareDataMoveOperationResult/options.js";
import type { VaultStorageConfigOperationResultResponseUnion } from "../../models/models.js";

/** Interface representing a BMSPrepareDataMoveOperationResult operations. */
export interface BMSPrepareDataMoveOperationResultOperations {
  /** Fetches operation status for data move operation on vault */
  get: (
    vaultName: string,
    resourceGroupName: string,
    operationId: string,
    options?: BMSPrepareDataMoveOperationResultGetOptionalParams,
  ) => Promise<VaultStorageConfigOperationResultResponseUnion>;
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
