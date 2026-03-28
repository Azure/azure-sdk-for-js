// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
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
} from "../../api/apiManagementService/operations.js";
import type {
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
} from "../../api/apiManagementService/options.js";
import type {
  ApiManagementServiceResource,
  ApiManagementServiceUpdateParameters,
  ApiManagementServiceBackupRestoreParameters,
  ApiManagementServiceGetSsoTokenResult,
  ApiManagementServiceCheckNameAvailabilityParameters,
  ApiManagementServiceNameAvailabilityResult,
  ApiManagementServiceGetDomainOwnershipIdentifierResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ApiManagementService operations. */
export interface ApiManagementServiceOperations {
  /** Get the custom domain ownership identifier for an API Management service. */
  getDomainOwnershipIdentifier: (
    options?: ApiManagementServiceGetDomainOwnershipIdentifierOptionalParams,
  ) => Promise<ApiManagementServiceGetDomainOwnershipIdentifierResult>;
  /** Checks availability and correctness of a name for an API Management service. */
  checkNameAvailability: (
    parameters: ApiManagementServiceCheckNameAvailabilityParameters,
    options?: ApiManagementServiceCheckNameAvailabilityOptionalParams,
  ) => Promise<ApiManagementServiceNameAvailabilityResult>;
  /** Force Refresh the SSL certificate attached to the Custom Hostnames configured using secret from KeyVault on the Api Management service. */
  refreshHostnames: (
    resourceGroupName: string,
    serviceName: string,
    options?: ApiManagementServiceRefreshHostnamesOptionalParams,
  ) => PollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource>;
  /** Updates the Microsoft.ApiManagement resource running in the Virtual network to pick the updated DNS changes. */
  applyNetworkConfigurationUpdates: (
    resourceGroupName: string,
    serviceName: string,
    options?: ApiManagementServiceApplyNetworkConfigurationUpdatesOptionalParams,
  ) => PollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource>;
  /** Gets the Single-Sign-On token for the API Management Service which is valid for 5 Minutes. */
  getSsoToken: (
    resourceGroupName: string,
    serviceName: string,
    options?: ApiManagementServiceGetSsoTokenOptionalParams,
  ) => Promise<ApiManagementServiceGetSsoTokenResult>;
  /** Upgrades an API Management service to the Stv2 platform. For details refer to https://aka.ms/apim-migrate-stv2. This change is not reversible. This is long running operation and could take several minutes to complete. */
  migrateToStv2: (
    resourceGroupName: string,
    serviceName: string,
    options?: ApiManagementServiceMigrateToStv2OptionalParams,
  ) => PollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource>;
  /** Creates a backup of the API Management service to the given Azure Storage Account. This is long running operation and could take several minutes to complete. */
  backup: (
    resourceGroupName: string,
    serviceName: string,
    parameters: ApiManagementServiceBackupRestoreParameters,
    options?: ApiManagementServiceBackupOptionalParams,
  ) => PollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource>;
  /** Restores a backup of an API Management service created using the ApiManagementService_Backup operation on the current service. This is a long running operation and could take several minutes to complete. */
  restore: (
    resourceGroupName: string,
    serviceName: string,
    parameters: ApiManagementServiceBackupRestoreParameters,
    options?: ApiManagementServiceRestoreOptionalParams,
  ) => PollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource>;
  /** Lists all API Management services within an Azure subscription. */
  list: (
    options?: ApiManagementServiceListOptionalParams,
  ) => PagedAsyncIterableIterator<ApiManagementServiceResource>;
  /** List all API Management services within a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ApiManagementServiceListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ApiManagementServiceResource>;
  /** Deletes an existing API Management service. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    options?: ApiManagementServiceDeleteOptionalParams,
  ) => PollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource>;
  /** Updates an existing API Management service. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    parameters: ApiManagementServiceUpdateParameters,
    options?: ApiManagementServiceUpdateOptionalParams,
  ) => PollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource>;
  /** Creates or updates an API Management service. This is long running operation and could take several minutes to complete. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    parameters: ApiManagementServiceResource,
    options?: ApiManagementServiceCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource>;
  /** Gets an API Management service resource description. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    options?: ApiManagementServiceGetOptionalParams,
  ) => Promise<ApiManagementServiceResource>;
}

function _getApiManagementService(context: ApiManagementContext) {
  return {
    getDomainOwnershipIdentifier: (
      options?: ApiManagementServiceGetDomainOwnershipIdentifierOptionalParams,
    ) => getDomainOwnershipIdentifier(context, options),
    checkNameAvailability: (
      parameters: ApiManagementServiceCheckNameAvailabilityParameters,
      options?: ApiManagementServiceCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, parameters, options),
    refreshHostnames: (
      resourceGroupName: string,
      serviceName: string,
      options?: ApiManagementServiceRefreshHostnamesOptionalParams,
    ) => refreshHostnames(context, resourceGroupName, serviceName, options),
    applyNetworkConfigurationUpdates: (
      resourceGroupName: string,
      serviceName: string,
      options?: ApiManagementServiceApplyNetworkConfigurationUpdatesOptionalParams,
    ) => applyNetworkConfigurationUpdates(context, resourceGroupName, serviceName, options),
    getSsoToken: (
      resourceGroupName: string,
      serviceName: string,
      options?: ApiManagementServiceGetSsoTokenOptionalParams,
    ) => getSsoToken(context, resourceGroupName, serviceName, options),
    migrateToStv2: (
      resourceGroupName: string,
      serviceName: string,
      options?: ApiManagementServiceMigrateToStv2OptionalParams,
    ) => migrateToStv2(context, resourceGroupName, serviceName, options),
    backup: (
      resourceGroupName: string,
      serviceName: string,
      parameters: ApiManagementServiceBackupRestoreParameters,
      options?: ApiManagementServiceBackupOptionalParams,
    ) => backup(context, resourceGroupName, serviceName, parameters, options),
    restore: (
      resourceGroupName: string,
      serviceName: string,
      parameters: ApiManagementServiceBackupRestoreParameters,
      options?: ApiManagementServiceRestoreOptionalParams,
    ) => restore(context, resourceGroupName, serviceName, parameters, options),
    list: (options?: ApiManagementServiceListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ApiManagementServiceListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      options?: ApiManagementServiceDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      parameters: ApiManagementServiceUpdateParameters,
      options?: ApiManagementServiceUpdateOptionalParams,
    ) => update(context, resourceGroupName, serviceName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      parameters: ApiManagementServiceResource,
      options?: ApiManagementServiceCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceName, parameters, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      options?: ApiManagementServiceGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, options),
  };
}

export function _getApiManagementServiceOperations(
  context: ApiManagementContext,
): ApiManagementServiceOperations {
  return {
    ..._getApiManagementService(context),
  };
}
