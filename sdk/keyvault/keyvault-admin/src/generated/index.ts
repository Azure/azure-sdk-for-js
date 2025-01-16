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
  PreRestoreOperationParameters,
  RestoreOperationParameters,
  SelectiveKeyRestoreOperationParameters,
  SelectiveKeyRestoreOperation,
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
} from "./api/index.js";
export {
  RoleAssignmentsOperations,
  RoleDefinitionsOperations,
} from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
