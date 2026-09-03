// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { get } from "../../api/getTieringCostOperationResult/operations.js";
import type { GetTieringCostOperationResultGetOptionalParams } from "../../api/getTieringCostOperationResult/options.js";
import type { TieringCostInfoUnion } from "../../models/models.js";

/** Interface representing a GetTieringCostOperationResult operations. */
export interface GetTieringCostOperationResultOperations {
  /** Gets the result of async operation for tiering cost */
  get: (
    resourceGroupName: string,
    vaultName: string,
    operationId: string,
    options?: GetTieringCostOperationResultGetOptionalParams,
  ) => Promise<TieringCostInfoUnion>;
}

function _getGetTieringCostOperationResult(context: RecoveryServicesBackupContext) {
  return {
    get: (
      resourceGroupName: string,
      vaultName: string,
      operationId: string,
      options?: GetTieringCostOperationResultGetOptionalParams,
    ) => get(context, resourceGroupName, vaultName, operationId, options),
  };
}

export function _getGetTieringCostOperationResultOperations(
  context: RecoveryServicesBackupContext,
): GetTieringCostOperationResultOperations {
  return {
    ..._getGetTieringCostOperationResult(context),
  };
}
