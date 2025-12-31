// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { KeyVaultClient } from "./keyVaultClient.js";
export { restorePoller, RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  FullBackupOperation,
  KnownOperationStatus,
  OperationStatus,
  ErrorModel,
  KeyVaultError,
  SASTokenParameter,
  PreBackupOperationParameters,
  RestoreOperation,
  RestoreOperationParameters,
  PreRestoreOperationParameters,
  SelectiveKeyRestoreOperation,
  SelectiveKeyRestoreOperationParameters,
  UpdateSettingRequest,
  Setting,
  KnownSettingTypeEnum,
  SettingTypeEnum,
  SettingsListResult,
  RoleDefinition,
  KnownRoleDefinitionType,
  RoleDefinitionType,
  RoleDefinitionProperties,
  KnownRoleType,
  RoleType,
  Permission,
  KnownDataAction,
  DataAction,
  KnownRoleScope,
  RoleScope,
  RoleDefinitionCreateParameters,
  RoleAssignment,
  RoleAssignmentPropertiesWithScope,
  RoleAssignmentCreateParameters,
  RoleAssignmentProperties,
  KnownVersions,
} from "./models/index.js";
export {
  KeyVaultClientOptionalParams,
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
} from "./api/index.js";
export {
  RoleAssignmentsListForScopeOptionalParams,
  RoleAssignmentsGetOptionalParams,
  RoleAssignmentsCreateOptionalParams,
  RoleAssignmentsDeleteOptionalParams,
} from "./api/roleAssignments/index.js";
export {
  RoleDefinitionsListOptionalParams,
  RoleDefinitionsGetOptionalParams,
  RoleDefinitionsCreateOrUpdateOptionalParams,
  RoleDefinitionsDeleteOptionalParams,
} from "./api/roleDefinitions/index.js";
export { RoleAssignmentsOperations, RoleDefinitionsOperations } from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
