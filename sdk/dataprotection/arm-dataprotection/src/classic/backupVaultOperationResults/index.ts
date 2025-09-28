// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext } from "../../api/dataProtectionContext.js";
import { get } from "../../api/backupVaultOperationResults/operations.js";
import type { BackupVaultOperationResultsGetOptionalParams } from "../../api/backupVaultOperationResults/options.js";
import type { BackupVaultResource } from "../../models/models.js";

/** Interface representing a BackupVaultOperationResults operations. */
export interface BackupVaultOperationResultsOperations {
  /** Get a BackupVaultResource */
  get: (
    resourceGroupName: string,
    vaultName: string,
    operationId: string,
    options?: BackupVaultOperationResultsGetOptionalParams,
  ) => Promise<BackupVaultResource | null>;
}

function _getBackupVaultOperationResults(context: DataProtectionContext) {
  return {
    get: (
      resourceGroupName: string,
      vaultName: string,
      operationId: string,
      options?: BackupVaultOperationResultsGetOptionalParams,
    ) => get(context, resourceGroupName, vaultName, operationId, options),
  };
}

export function _getBackupVaultOperationResultsOperations(
  context: DataProtectionContext,
): BackupVaultOperationResultsOperations {
  return {
    ..._getBackupVaultOperationResults(context),
  };
}
