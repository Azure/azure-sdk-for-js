// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { update, get } from "../../api/backupResourceEncryptionConfigs/operations.js";
import type {
  BackupResourceEncryptionConfigsUpdateOptionalParams,
  BackupResourceEncryptionConfigsGetOptionalParams,
} from "../../api/backupResourceEncryptionConfigs/options.js";
import type {
  BackupResourceEncryptionConfigExtendedResource,
  BackupResourceEncryptionConfigResource,
} from "../../models/models.js";

/** Interface representing a BackupResourceEncryptionConfigs operations. */
export interface BackupResourceEncryptionConfigsOperations {
  /** Updates Vault encryption config. */
  update: (
    vaultName: string,
    resourceGroupName: string,
    parameters: BackupResourceEncryptionConfigResource,
    options?: BackupResourceEncryptionConfigsUpdateOptionalParams,
  ) => Promise<void>;
  /** Fetches Vault Encryption config. */
  get: (
    vaultName: string,
    resourceGroupName: string,
    options?: BackupResourceEncryptionConfigsGetOptionalParams,
  ) => Promise<BackupResourceEncryptionConfigExtendedResource>;
}

function _getBackupResourceEncryptionConfigs(context: RecoveryServicesBackupContext) {
  return {
    update: (
      vaultName: string,
      resourceGroupName: string,
      parameters: BackupResourceEncryptionConfigResource,
      options?: BackupResourceEncryptionConfigsUpdateOptionalParams,
    ) => update(context, vaultName, resourceGroupName, parameters, options),
    get: (
      vaultName: string,
      resourceGroupName: string,
      options?: BackupResourceEncryptionConfigsGetOptionalParams,
    ) => get(context, vaultName, resourceGroupName, options),
  };
}

export function _getBackupResourceEncryptionConfigsOperations(
  context: RecoveryServicesBackupContext,
): BackupResourceEncryptionConfigsOperations {
  return {
    ..._getBackupResourceEncryptionConfigs(context),
  };
}
