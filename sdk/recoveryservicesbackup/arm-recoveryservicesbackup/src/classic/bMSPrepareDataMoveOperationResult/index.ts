// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { get } from "../../api/bMSPrepareDataMoveOperationResult/operations.js";
import type { bMSPrepareDataMoveOperationResultGetOptionalParams } from "../../api/bMSPrepareDataMoveOperationResult/options.js";
import type { VaultStorageConfigOperationResultResponseUnion } from "../../models/models.js";

/** Interface representing a bMSPrepareDataMoveOperationResult operations. */
export interface bMSPrepareDataMoveOperationResultOperations {
  /** Fetches operation status for data move operation on vault */
  get: (
    vaultName: string,
    resourceGroupName: string,
    operationId: string,
    options?: bMSPrepareDataMoveOperationResultGetOptionalParams,
  ) => Promise<VaultStorageConfigOperationResultResponseUnion | void>;
}

function _getbMSPrepareDataMoveOperationResult(context: RecoveryServicesBackupContext) {
  return {
    get: (
      vaultName: string,
      resourceGroupName: string,
      operationId: string,
      options?: bMSPrepareDataMoveOperationResultGetOptionalParams,
    ) => get(context, vaultName, resourceGroupName, operationId, options),
  };
}

export function _getbMSPrepareDataMoveOperationResultOperations(
  context: RecoveryServicesBackupContext,
): bMSPrepareDataMoveOperationResultOperations {
  return {
    ..._getbMSPrepareDataMoveOperationResult(context),
  };
}
