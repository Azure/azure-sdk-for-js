// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { update, put, get } from "../../api/backupResourceVaultConfigs/operations.js";
import type {
  BackupResourceVaultConfigsUpdateOptionalParams,
  BackupResourceVaultConfigsPutOptionalParams,
  BackupResourceVaultConfigsGetOptionalParams,
} from "../../api/backupResourceVaultConfigs/options.js";
import type { BackupResourceVaultConfigResource } from "../../models/models.js";

/** Interface representing a BackupResourceVaultConfigs operations. */
export interface BackupResourceVaultConfigsOperations {
  /** Updates vault security config. */
  update: (
    vaultName: string,
    resourceGroupName: string,
    parameters: BackupResourceVaultConfigResource,
    options?: BackupResourceVaultConfigsUpdateOptionalParams,
  ) => Promise<BackupResourceVaultConfigResource>;
  /** Updates vault security config. */
  put: (
    vaultName: string,
    resourceGroupName: string,
    parameters: BackupResourceVaultConfigResource,
    options?: BackupResourceVaultConfigsPutOptionalParams,
  ) => Promise<BackupResourceVaultConfigResource>;
  /** Fetches resource vault config. */
  get: (
    vaultName: string,
    resourceGroupName: string,
    options?: BackupResourceVaultConfigsGetOptionalParams,
  ) => Promise<BackupResourceVaultConfigResource>;
}

function _getBackupResourceVaultConfigs(context: RecoveryServicesBackupContext) {
  return {
    update: (
      vaultName: string,
      resourceGroupName: string,
      parameters: BackupResourceVaultConfigResource,
      options?: BackupResourceVaultConfigsUpdateOptionalParams,
    ) => update(context, vaultName, resourceGroupName, parameters, options),
    put: (
      vaultName: string,
      resourceGroupName: string,
      parameters: BackupResourceVaultConfigResource,
      options?: BackupResourceVaultConfigsPutOptionalParams,
    ) => put(context, vaultName, resourceGroupName, parameters, options),
    get: (
      vaultName: string,
      resourceGroupName: string,
      options?: BackupResourceVaultConfigsGetOptionalParams,
    ) => get(context, vaultName, resourceGroupName, options),
  };
}

export function _getBackupResourceVaultConfigsOperations(
  context: RecoveryServicesBackupContext,
): BackupResourceVaultConfigsOperations {
  return {
    ..._getBackupResourceVaultConfigs(context),
  };
}
