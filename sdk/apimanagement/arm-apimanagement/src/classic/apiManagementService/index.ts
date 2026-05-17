// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementContext } from "../../api/apiManagementContext.js";
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
import {
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
import {
  ApiManagementServiceResource,
  ApiManagementServiceUpdateParameters,
  ApiManagementServiceBackupRestoreParameters,
  ApiManagementServiceGetSsoTokenResult,
  ApiManagementServiceCheckNameAvailabilityParameters,
  ApiManagementServiceNameAvailabilityResult,
  ApiManagementServiceGetDomainOwnershipIdentifierResult,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

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
  /** @deprecated use refreshHostnames instead */
  beginRefreshHostnames: (
    resourceGroupName: string,
    serviceName: string,
    options?: ApiManagementServiceRefreshHostnamesOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource>
  >;
  /** @deprecated use refreshHostnames instead */
  beginRefreshHostnamesAndWait: (
    resourceGroupName: string,
    serviceName: string,
    options?: ApiManagementServiceRefreshHostnamesOptionalParams,
  ) => Promise<ApiManagementServiceResource>;
  /** Updates the Microsoft.ApiManagement resource running in the Virtual network to pick the updated DNS changes. */
  applyNetworkConfigurationUpdates: (
    resourceGroupName: string,
    serviceName: string,
    options?: ApiManagementServiceApplyNetworkConfigurationUpdatesOptionalParams,
  ) => PollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource>;
  /** @deprecated use applyNetworkConfigurationUpdates instead */
  beginApplyNetworkConfigurationUpdates: (
    resourceGroupName: string,
    serviceName: string,
    options?: ApiManagementServiceApplyNetworkConfigurationUpdatesOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource>
  >;
  /** @deprecated use applyNetworkConfigurationUpdates instead */
  beginApplyNetworkConfigurationUpdatesAndWait: (
    resourceGroupName: string,
    serviceName: string,
    options?: ApiManagementServiceApplyNetworkConfigurationUpdatesOptionalParams,
  ) => Promise<ApiManagementServiceResource>;
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
  /** @deprecated use migrateToStv2 instead */
  beginMigrateToStv2: (
    resourceGroupName: string,
    serviceName: string,
    options?: ApiManagementServiceMigrateToStv2OptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource>
  >;
  /** @deprecated use migrateToStv2 instead */
  beginMigrateToStv2AndWait: (
    resourceGroupName: string,
    serviceName: string,
    options?: ApiManagementServiceMigrateToStv2OptionalParams,
  ) => Promise<ApiManagementServiceResource>;
  /** Creates a backup of the API Management service to the given Azure Storage Account. This is long running operation and could take several minutes to complete. */
  backup: (
    resourceGroupName: string,
    serviceName: string,
    parameters: ApiManagementServiceBackupRestoreParameters,
    options?: ApiManagementServiceBackupOptionalParams,
  ) => PollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource>;
  /** @deprecated use backup instead */
  beginBackup: (
    resourceGroupName: string,
    serviceName: string,
    parameters: ApiManagementServiceBackupRestoreParameters,
    options?: ApiManagementServiceBackupOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource>
  >;
  /** @deprecated use backup instead */
  beginBackupAndWait: (
    resourceGroupName: string,
    serviceName: string,
    parameters: ApiManagementServiceBackupRestoreParameters,
    options?: ApiManagementServiceBackupOptionalParams,
  ) => Promise<ApiManagementServiceResource>;
  /** Restores a backup of an API Management service created using the ApiManagementService_Backup operation on the current service. This is a long running operation and could take several minutes to complete. */
  restore: (
    resourceGroupName: string,
    serviceName: string,
    parameters: ApiManagementServiceBackupRestoreParameters,
    options?: ApiManagementServiceRestoreOptionalParams,
  ) => PollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource>;
  /** @deprecated use restore instead */
  beginRestore: (
    resourceGroupName: string,
    serviceName: string,
    parameters: ApiManagementServiceBackupRestoreParameters,
    options?: ApiManagementServiceRestoreOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource>
  >;
  /** @deprecated use restore instead */
  beginRestoreAndWait: (
    resourceGroupName: string,
    serviceName: string,
    parameters: ApiManagementServiceBackupRestoreParameters,
    options?: ApiManagementServiceRestoreOptionalParams,
  ) => Promise<ApiManagementServiceResource>;
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
  delete: (
    resourceGroupName: string,
    serviceName: string,
    options?: ApiManagementServiceDeleteOptionalParams,
  ) => PollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    serviceName: string,
    options?: ApiManagementServiceDeleteOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource>
  >;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    serviceName: string,
    options?: ApiManagementServiceDeleteOptionalParams,
  ) => Promise<ApiManagementServiceResource>;
  /** Updates an existing API Management service. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    parameters: ApiManagementServiceUpdateParameters,
    options?: ApiManagementServiceUpdateOptionalParams,
  ) => PollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    serviceName: string,
    parameters: ApiManagementServiceUpdateParameters,
    options?: ApiManagementServiceUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource>
  >;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    serviceName: string,
    parameters: ApiManagementServiceUpdateParameters,
    options?: ApiManagementServiceUpdateOptionalParams,
  ) => Promise<ApiManagementServiceResource>;
  /** Creates or updates an API Management service. This is long running operation and could take several minutes to complete. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    parameters: ApiManagementServiceResource,
    options?: ApiManagementServiceCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    parameters: ApiManagementServiceResource,
    options?: ApiManagementServiceCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serviceName: string,
    parameters: ApiManagementServiceResource,
    options?: ApiManagementServiceCreateOrUpdateOptionalParams,
  ) => Promise<ApiManagementServiceResource>;
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
    beginRefreshHostnames: async (
      resourceGroupName: string,
      serviceName: string,
      options?: ApiManagementServiceRefreshHostnamesOptionalParams,
    ) => {
      const poller = refreshHostnames(context, resourceGroupName, serviceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRefreshHostnamesAndWait: async (
      resourceGroupName: string,
      serviceName: string,
      options?: ApiManagementServiceRefreshHostnamesOptionalParams,
    ) => {
      return await refreshHostnames(context, resourceGroupName, serviceName, options);
    },
    applyNetworkConfigurationUpdates: (
      resourceGroupName: string,
      serviceName: string,
      options?: ApiManagementServiceApplyNetworkConfigurationUpdatesOptionalParams,
    ) => applyNetworkConfigurationUpdates(context, resourceGroupName, serviceName, options),
    beginApplyNetworkConfigurationUpdates: async (
      resourceGroupName: string,
      serviceName: string,
      options?: ApiManagementServiceApplyNetworkConfigurationUpdatesOptionalParams,
    ) => {
      const poller = applyNetworkConfigurationUpdates(
        context,
        resourceGroupName,
        serviceName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginApplyNetworkConfigurationUpdatesAndWait: async (
      resourceGroupName: string,
      serviceName: string,
      options?: ApiManagementServiceApplyNetworkConfigurationUpdatesOptionalParams,
    ) => {
      return await applyNetworkConfigurationUpdates(
        context,
        resourceGroupName,
        serviceName,
        options,
      );
    },
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
    beginMigrateToStv2: async (
      resourceGroupName: string,
      serviceName: string,
      options?: ApiManagementServiceMigrateToStv2OptionalParams,
    ) => {
      const poller = migrateToStv2(context, resourceGroupName, serviceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMigrateToStv2AndWait: async (
      resourceGroupName: string,
      serviceName: string,
      options?: ApiManagementServiceMigrateToStv2OptionalParams,
    ) => {
      return await migrateToStv2(context, resourceGroupName, serviceName, options);
    },
    backup: (
      resourceGroupName: string,
      serviceName: string,
      parameters: ApiManagementServiceBackupRestoreParameters,
      options?: ApiManagementServiceBackupOptionalParams,
    ) => backup(context, resourceGroupName, serviceName, parameters, options),
    beginBackup: async (
      resourceGroupName: string,
      serviceName: string,
      parameters: ApiManagementServiceBackupRestoreParameters,
      options?: ApiManagementServiceBackupOptionalParams,
    ) => {
      const poller = backup(context, resourceGroupName, serviceName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginBackupAndWait: async (
      resourceGroupName: string,
      serviceName: string,
      parameters: ApiManagementServiceBackupRestoreParameters,
      options?: ApiManagementServiceBackupOptionalParams,
    ) => {
      return await backup(context, resourceGroupName, serviceName, parameters, options);
    },
    restore: (
      resourceGroupName: string,
      serviceName: string,
      parameters: ApiManagementServiceBackupRestoreParameters,
      options?: ApiManagementServiceRestoreOptionalParams,
    ) => restore(context, resourceGroupName, serviceName, parameters, options),
    beginRestore: async (
      resourceGroupName: string,
      serviceName: string,
      parameters: ApiManagementServiceBackupRestoreParameters,
      options?: ApiManagementServiceRestoreOptionalParams,
    ) => {
      const poller = restore(context, resourceGroupName, serviceName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRestoreAndWait: async (
      resourceGroupName: string,
      serviceName: string,
      parameters: ApiManagementServiceBackupRestoreParameters,
      options?: ApiManagementServiceRestoreOptionalParams,
    ) => {
      return await restore(context, resourceGroupName, serviceName, parameters, options);
    },
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
    beginDelete: async (
      resourceGroupName: string,
      serviceName: string,
      options?: ApiManagementServiceDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, serviceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      serviceName: string,
      options?: ApiManagementServiceDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, serviceName, options);
    },
    update: (
      resourceGroupName: string,
      serviceName: string,
      parameters: ApiManagementServiceUpdateParameters,
      options?: ApiManagementServiceUpdateOptionalParams,
    ) => update(context, resourceGroupName, serviceName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      serviceName: string,
      parameters: ApiManagementServiceUpdateParameters,
      options?: ApiManagementServiceUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, serviceName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      serviceName: string,
      parameters: ApiManagementServiceUpdateParameters,
      options?: ApiManagementServiceUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, serviceName, parameters, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      parameters: ApiManagementServiceResource,
      options?: ApiManagementServiceCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serviceName: string,
      parameters: ApiManagementServiceResource,
      options?: ApiManagementServiceCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, serviceName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serviceName: string,
      parameters: ApiManagementServiceResource,
      options?: ApiManagementServiceCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, serviceName, parameters, options);
    },
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
