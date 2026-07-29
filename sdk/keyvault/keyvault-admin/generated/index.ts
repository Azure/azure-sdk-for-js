// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { KeyVaultClient } from "./keyVaultClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  FullBackupOperation,
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
  SettingTypeEnum,
  SettingsListResult,
  EkmConnection,
  EkmProxyClientCertificateInfo,
  EkmProxyInfo,
  RoleDefinition,
  RoleDefinitionType,
  RoleDefinitionProperties,
  RoleType,
  Permission,
  DataAction,
  RoleScope,
  RoleDefinitionCreateParameters,
  RoleAssignment,
  RoleAssignmentPropertiesWithScope,
  RoleAssignmentCreateParameters,
  RoleAssignmentProperties,
} from "./models/index.js";
export {
  KnownOperationStatus,
  KnownSettingTypeEnum,
  KnownRoleDefinitionType,
  KnownRoleType,
  KnownDataAction,
  KnownRoleScope,
  KnownVersions,
} from "./models/index.js";
export type {
  KeyVaultClientOptionalParams,
  DeleteEkmConnectionOptionalParams,
  UpdateEkmConnectionOptionalParams,
  CreateEkmConnectionOptionalParams,
  CheckEkmConnectionOptionalParams,
  GetEkmCertificateOptionalParams,
  GetEkmConnectionOptionalParams,
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
export type {
  RoleAssignmentsListForScopeOptionalParams,
  RoleAssignmentsGetOptionalParams,
  RoleAssignmentsCreateOptionalParams,
  RoleAssignmentsDeleteOptionalParams,
} from "./api/roleAssignments/index.js";
export type {
  RoleDefinitionsListOptionalParams,
  RoleDefinitionsGetOptionalParams,
  RoleDefinitionsCreateOrUpdateOptionalParams,
  RoleDefinitionsDeleteOptionalParams,
} from "./api/roleDefinitions/index.js";
export type { RoleAssignmentsOperations, RoleDefinitionsOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
