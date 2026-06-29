// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  migrate,
  canMigrate,
  migrationAbort,
  cdnMigrateToAfd,
  cdnCanMigrateToAfd,
  listResourceUsage,
  listSupportedOptimizationTypes,
  generateSsoUri,
  migrationCommit,
  list,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "./operations.js";
export type {
  ProfilesMigrateOptionalParams,
  ProfilesCanMigrateOptionalParams,
  ProfilesMigrationAbortOptionalParams,
  ProfilesCdnMigrateToAfdOptionalParams,
  ProfilesCdnCanMigrateToAfdOptionalParams,
  ProfilesListResourceUsageOptionalParams,
  ProfilesListSupportedOptimizationTypesOptionalParams,
  ProfilesGenerateSsoUriOptionalParams,
  ProfilesMigrationCommitOptionalParams,
  ProfilesListOptionalParams,
  ProfilesListByResourceGroupOptionalParams,
  ProfilesDeleteOptionalParams,
  ProfilesUpdateOptionalParams,
  ProfilesCreateOptionalParams,
  ProfilesGetOptionalParams,
} from "./options.js";
