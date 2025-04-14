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
  ErrorModel_1,
  KeyVaultError,
  SASTokenParameter,
  PreBackupOperationParameters,
  RestoreOperation,
  PreRestoreOperationParameters,
  RestoreOperationParameters,
  SelectiveKeyRestoreOperation,
  SelectiveKeyRestoreOperationParameters,
  UpdateSettingRequest,
  Setting,
  KnownSettingTypeEnum,
  SettingTypeEnum,
  SettingsListResult,
  RoleAssignment,
  RoleAssignmentPropertiesWithScope,
  KnownRoleScope,
  RoleScope,
  RoleAssignmentCreateParameters,
  RoleAssignmentProperties,
  RoleDefinition,
  KnownRoleDefinitionType,
  RoleDefinitionType,
  RoleDefinitionProperties,
  KnownRoleType,
  RoleType,
  Permission,
  KnownDataAction,
  DataAction,
  RoleDefinitionCreateParameters,
  KnownVersions,
} from "./models/index.js";
export {
  KeyVaultClientOptionalParams,
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
} from "./api/index.js";
export {
  RoleAssignmentsOperations,
  RoleDefinitionsOperations,
} from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
