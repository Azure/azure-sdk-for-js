// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { get } from "../../api/tieringCostOperationStatus/operations.js";
import type { TieringCostOperationStatusGetOptionalParams } from "../../api/tieringCostOperationStatus/options.js";
import type { OperationStatus } from "../../models/models.js";

/** Interface representing a TieringCostOperationStatus operations. */
export interface TieringCostOperationStatusOperations {
  /** Gets the status of async operations of tiering cost */
  get: (
    resourceGroupName: string,
    vaultName: string,
    operationId: string,
    options?: TieringCostOperationStatusGetOptionalParams,
  ) => Promise<OperationStatus>;
}

function _getTieringCostOperationStatus(context: RecoveryServicesBackupContext) {
  return {
    get: (
      resourceGroupName: string,
      vaultName: string,
      operationId: string,
      options?: TieringCostOperationStatusGetOptionalParams,
    ) => get(context, resourceGroupName, vaultName, operationId, options),
  };
}

export function _getTieringCostOperationStatusOperations(
  context: RecoveryServicesBackupContext,
): TieringCostOperationStatusOperations {
  return {
    ..._getTieringCostOperationStatus(context),
  };
}
