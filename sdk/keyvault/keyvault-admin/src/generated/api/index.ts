// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  createKeyVault,
  KeyVaultContext,
  KeyVaultClientOptionalParams,
} from "./keyVaultContext.js";
export {
  fullBackupStatus,
  fullBackup,
  preFullBackup,
  restoreStatus,
  preFullRestoreOperation,
  fullRestoreOperation,
  selectiveKeyRestoreOperation,
  updateSetting,
  getSetting,
  getSettings,
} from "./operations.js";
