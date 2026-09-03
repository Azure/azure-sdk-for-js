// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext } from "../../api/dataProtectionContext.js";
import { get } from "../../api/operationStatusBackupVaultContext/operations.js";
import type { OperationStatusBackupVaultContextGetOptionalParams } from "../../api/operationStatusBackupVaultContext/options.js";
import type { OperationResource } from "../../models/models.js";

/** Interface representing a OperationStatusBackupVaultContext operations. */
export interface OperationStatusBackupVaultContextOperations {
  /** Gets the operation status for an operation over a BackupVault's context. */
  get: (
    resourceGroupName: string,
    vaultName: string,
    operationId: string,
    options?: OperationStatusBackupVaultContextGetOptionalParams,
  ) => Promise<OperationResource>;
}

function _getOperationStatusBackupVaultContext(context: DataProtectionContext) {
  return {
    get: (
      resourceGroupName: string,
      vaultName: string,
      operationId: string,
      options?: OperationStatusBackupVaultContextGetOptionalParams,
    ) => get(context, resourceGroupName, vaultName, operationId, options),
  };
}

export function _getOperationStatusBackupVaultContextOperations(
  context: DataProtectionContext,
): OperationStatusBackupVaultContextOperations {
  return {
    ..._getOperationStatusBackupVaultContext(context),
  };
}
