// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  getDomainOwnershipIdentifier,
  checkNameAvailability,
  refreshHostnames,
  applyNetworkConfigurationUpdates,
  getSsoToken,
  migrateToStv2,
  backup,
  restore,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  ApiManagementServiceGetDomainOwnershipIdentifierOptionalParams,
  ApiManagementServiceCheckNameAvailabilityOptionalParams,
  ApiManagementServiceRefreshHostnamesOptionalParams,
  ApiManagementServiceApplyNetworkConfigurationUpdatesOptionalParams,
  ApiManagementServiceGetSsoTokenOptionalParams,
  ApiManagementServiceMigrateToStv2OptionalParams,
  ApiManagementServiceBackupOptionalParams,
  ApiManagementServiceRestoreOptionalParams,
  ApiManagementServiceListOptionalParams,
  ApiManagementServiceListByResourceGroupOptionalParams,
  ApiManagementServiceDeleteOptionalParams,
  ApiManagementServiceUpdateOptionalParams,
  ApiManagementServiceCreateOrUpdateOptionalParams,
  ApiManagementServiceGetOptionalParams,
} from "./options.js";
