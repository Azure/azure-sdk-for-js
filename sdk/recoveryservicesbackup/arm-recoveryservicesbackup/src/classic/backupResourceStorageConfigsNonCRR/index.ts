// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { patch, update, get } from "../../api/backupResourceStorageConfigsNonCRR/operations.js";
import type {
  BackupResourceStorageConfigsNonCRRPatchOptionalParams,
  BackupResourceStorageConfigsNonCRRUpdateOptionalParams,
  BackupResourceStorageConfigsNonCRRGetOptionalParams,
} from "../../api/backupResourceStorageConfigsNonCRR/options.js";
import type { BackupResourceConfigResource } from "../../models/models.js";

/** Interface representing a BackupResourceStorageConfigsNonCRR operations. */
export interface BackupResourceStorageConfigsNonCRROperations {
  /** Updates vault storage model type. */
  patch: (
    vaultName: string,
    resourceGroupName: string,
    parameters: BackupResourceConfigResource,
    options?: BackupResourceStorageConfigsNonCRRPatchOptionalParams,
  ) => Promise<void>;
  /** Updates vault storage model type. */
  update: (
    vaultName: string,
    resourceGroupName: string,
    parameters: BackupResourceConfigResource,
    options?: BackupResourceStorageConfigsNonCRRUpdateOptionalParams,
  ) => Promise<BackupResourceConfigResource>;
  /** Fetches resource storage config. */
  get: (
    vaultName: string,
    resourceGroupName: string,
    options?: BackupResourceStorageConfigsNonCRRGetOptionalParams,
  ) => Promise<BackupResourceConfigResource>;
}

function _getBackupResourceStorageConfigsNonCRR(context: RecoveryServicesBackupContext) {
  return {
    patch: (
      vaultName: string,
      resourceGroupName: string,
      parameters: BackupResourceConfigResource,
      options?: BackupResourceStorageConfigsNonCRRPatchOptionalParams,
    ) => patch(context, vaultName, resourceGroupName, parameters, options),
    update: (
      vaultName: string,
      resourceGroupName: string,
      parameters: BackupResourceConfigResource,
      options?: BackupResourceStorageConfigsNonCRRUpdateOptionalParams,
    ) => update(context, vaultName, resourceGroupName, parameters, options),
    get: (
      vaultName: string,
      resourceGroupName: string,
      options?: BackupResourceStorageConfigsNonCRRGetOptionalParams,
    ) => get(context, vaultName, resourceGroupName, options),
  };
}

export function _getBackupResourceStorageConfigsNonCRROperations(
  context: RecoveryServicesBackupContext,
): BackupResourceStorageConfigsNonCRROperations {
  return {
    ..._getBackupResourceStorageConfigsNonCRR(context),
  };
}
