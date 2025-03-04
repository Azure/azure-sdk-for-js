// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  createKeyVault,
  KeyVaultContext,
  KeyVaultClientOptionalParams,
} from "./keyVaultContext.js";
export {
  getSettings,
  getSetting,
  updateSetting,
  selectiveKeyRestoreOperation,
  selectiveKeyRestoreStatus,
  fullRestoreOperation,
  preFullRestoreOperation,
  restoreStatus,
  preFullBackup,
  fullBackup,
  fullBackupStatus,
} from "./operations.js";
export {
  RoleAssignmentsListForScopeOptionalParams,
  RoleAssignmentsGetOptionalParams,
  RoleAssignmentsCreateOptionalParams,
  RoleAssignmentsDeleteOptionalParams,
  RoleDefinitionsListOptionalParams,
  RoleDefinitionsGetOptionalParams,
  RoleDefinitionsCreateOrUpdateOptionalParams,
  RoleDefinitionsDeleteOptionalParams,
  GetSettingsOptionalParams,
  GetSettingOptionalParams,
  UpdateSettingOptionalParams,
  SelectiveKeyRestoreOperationOptionalParams,
  SelectiveKeyRestoreStatusOptionalParams,
  FullRestoreOperationOptionalParams,
  PreFullRestoreOperationOptionalParams,
  RestoreStatusOptionalParams,
  PreFullBackupOptionalParams,
  FullBackupOptionalParams,
  FullBackupStatusOptionalParams,
} from "./options.js";
