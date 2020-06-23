// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export {
  RoleAssignmentFilter,
  RoleAssignmentPropertiesWithScope,
  RoleAssignment,
  RoleAssignmentListResult,
  RoleAssignmentProperties,
  RoleAssignmentCreateParameters,
  RoleDefinitionFilter,
  Permission,
  RoleDefinition,
  RoleDefinitionListResult,
  ErrorModel,
  RestoreOperationParameters,
  SelectiveKeyRestoreOperationParameters,
  SelectiveKeyRestoreOperation,
  FullRestoreOperation,
  RoleDefinitionsListOptionalParams,
  RoleAssignmentsListForScopeOptionalParams,
  KeyVaultClientFullBackupOptionalParams,
  KeyVaultClientFullRestoreOperationMethodOptionalParams,
  KeyVaultClientSelectiveKeyRestoreOperationMethodOptionalParams,
  FullRestoreOperationHeaders,
  SelectiveKeyRestoreOperationHeaders,
  RoleDefinitionsListResponse,
  RoleAssignmentsDeleteMethodResponse,
  RoleAssignmentsCreateResponse,
  RoleAssignmentsGetResponse,
  RoleAssignmentsListForScopeResponse,
  FullBackupResponse,
  FullBackupStatusResponse,
  FullRestoreOperationResponse,
  FullRestoreStatusResponse,
  SelectiveKeyRestoreOperationResponse,
} from "./core/models";

// export {
//   SASTokenParameter,
//   FullBackupOperation,
//   FullBackupHeaders,
//   KeyVaultError
// } from "./core/models/mappers";
// 
// export {
//   apiVersion,
//   filter,
//   jobId,
//   keyName,
//   roleAssignmentName,
//   scope,
//   vaultBaseUrl  
// } from "./core/models/parameters";
// 
// export {
//   RoleAssignments,
//   RoleDefinitions,
// } from "./core/operations";

export {
  KeyVaultClient,
  KeyVaultClientContext
} from "./core/keyVaultClient";