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
export {
  FullBackupStatusOptionalParams,
  FullBackupOptionalParams,
  PreFullBackupOptionalParams,
  RestoreStatusOptionalParams,
  PreFullRestoreOperationOptionalParams,
  FullRestoreOperationOptionalParams,
  SelectiveKeyRestoreOperationOptionalParams,
  UpdateSettingOptionalParams,
  GetSettingOptionalParams,
  GetSettingsOptionalParams,
  RoleAssignmentsDeleteOptionalParams,
  RoleAssignmentsCreateOptionalParams,
  RoleAssignmentsGetOptionalParams,
  RoleAssignmentsListForScopeOptionalParams,
  RoleDefinitionsDeleteOptionalParams,
  RoleDefinitionsCreateOrUpdateOptionalParams,
  RoleDefinitionsGetOptionalParams,
  RoleDefinitionsListOptionalParams,
} from "./options.js";
