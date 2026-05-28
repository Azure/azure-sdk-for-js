// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export type { KeyVaultContext, KeyVaultClientOptionalParams } from "./keyVaultContext.js";
export { createKeyVault } from "./keyVaultContext.js";
export {
  getSettings,
  getSetting,
  updateSetting,
  selectiveKeyRestoreOperation,
  selectiveKeyRestoreStatus,
  preFullRestoreOperation,
  fullRestoreOperation,
  restoreStatus,
  preFullBackup,
  fullBackup,
  fullBackupStatus,
} from "./operations.js";
export type {
  GetSettingsOptionalParams,
  GetSettingOptionalParams,
  UpdateSettingOptionalParams,
  SelectiveKeyRestoreOperationOptionalParams,
  SelectiveKeyRestoreStatusOptionalParams,
  PreFullRestoreOperationOptionalParams,
  FullRestoreOperationOptionalParams,
  RestoreStatusOptionalParams,
  PreFullBackupOptionalParams,
  FullBackupOptionalParams,
  FullBackupStatusOptionalParams,
} from "./options.js";
