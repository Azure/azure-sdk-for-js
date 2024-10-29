// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export {
  KeyVaultClient,
  KeyVaultClientOptionalParams,
} from "./keyVaultClient.js";
export { restorePoller, RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  FullBackupOperation,
  OperationStatus,
  ErrorModel,
  SASTokenParameter,
  PreBackupOperationParameters,
  RestoreOperation,
  PreRestoreOperationParameters,
  RestoreOperationParameters,
  SelectiveKeyRestoreOperationParameters,
  SelectiveKeyRestoreOperation,
  UpdateSettingRequest,
  Setting,
  SettingTypeEnum,
  SettingsListResult,
  RoleAssignment,
  RoleAssignmentPropertiesWithScope,
  RoleScope,
  RoleAssignmentCreateParameters,
  RoleAssignmentProperties,
  RoleDefinition,
  RoleDefinitionType,
  RoleDefinitionProperties,
  RoleType,
  Permission,
  DataAction,
  RoleDefinitionCreateParameters,
  Versions,
  KeyVaultError,
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
  RoleDefinitionsDeleteOptionalParams,
  RoleDefinitionsCreateOrUpdateOptionalParams,
  RoleDefinitionsGetOptionalParams,
  RoleDefinitionsListOptionalParams,
  RoleAssignmentsDeleteOptionalParams,
  RoleAssignmentsCreateOptionalParams,
  RoleAssignmentsGetOptionalParams,
  RoleAssignmentsListForScopeOptionalParams,
} from "./models/index.js";
export {
  RoleAssignmentsOperations,
  RoleDefinitionsOperations,
} from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
