// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AppConfigurationManagementContext } from "../../api/appConfigurationManagementContext.js";
import {
  listDeleted,
  purgeDeleted,
  getDeleted,
  regenerateKey,
  listKeys,
  list,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/configurationStores/operations.js";
import type {
  ConfigurationStoresListDeletedOptionalParams,
  ConfigurationStoresPurgeDeletedOptionalParams,
  ConfigurationStoresGetDeletedOptionalParams,
  ConfigurationStoresRegenerateKeyOptionalParams,
  ConfigurationStoresListKeysOptionalParams,
  ConfigurationStoresListOptionalParams,
  ConfigurationStoresListByResourceGroupOptionalParams,
  ConfigurationStoresDeleteOptionalParams,
  ConfigurationStoresUpdateOptionalParams,
  ConfigurationStoresCreateOptionalParams,
  ConfigurationStoresGetOptionalParams,
} from "../../api/configurationStores/options.js";
import type {
  ConfigurationStore,
  ConfigurationStoreUpdateParameters,
  ApiKey,
  RegenerateKeyParameters,
  DeletedConfigurationStore,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ConfigurationStores operations. */
export interface ConfigurationStoresOperations {
  /** Gets information about the deleted configuration stores in a subscription. */
  listDeleted: (
    options?: ConfigurationStoresListDeletedOptionalParams,
  ) => PagedAsyncIterableIterator<DeletedConfigurationStore>;
  /** Permanently deletes the specified configuration store. */
  purgeDeleted: (
    location: string,
    configStoreName: string,
    options?: ConfigurationStoresPurgeDeletedOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Gets a deleted Azure app configuration store. */
  getDeleted: (
    location: string,
    configStoreName: string,
    options?: ConfigurationStoresGetDeletedOptionalParams,
  ) => Promise<DeletedConfigurationStore>;
  /** Regenerates an access key for the specified configuration store. */
  regenerateKey: (
    resourceGroupName: string,
    configStoreName: string,
    regenerateKeyParameters: RegenerateKeyParameters,
    options?: ConfigurationStoresRegenerateKeyOptionalParams,
  ) => Promise<ApiKey>;
  /** Lists the access key for the specified configuration store. */
  listKeys: (
    resourceGroupName: string,
    configStoreName: string,
    options?: ConfigurationStoresListKeysOptionalParams,
  ) => PagedAsyncIterableIterator<ApiKey>;
  /** Lists the configuration stores for a given subscription. */
  list: (
    options?: ConfigurationStoresListOptionalParams,
  ) => PagedAsyncIterableIterator<ConfigurationStore>;
  /** Lists the configuration stores for a given resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ConfigurationStoresListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ConfigurationStore>;
  /** Deletes a configuration store. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    configStoreName: string,
    options?: ConfigurationStoresDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a configuration store with the specified parameters. */
  update: (
    resourceGroupName: string,
    configStoreName: string,
    configStoreUpdateParameters: ConfigurationStoreUpdateParameters,
    options?: ConfigurationStoresUpdateOptionalParams,
  ) => PollerLike<OperationState<ConfigurationStore>, ConfigurationStore>;
  /** Creates a configuration store with the specified parameters. */
  create: (
    resourceGroupName: string,
    configStoreName: string,
    configStoreCreationParameters: ConfigurationStore,
    options?: ConfigurationStoresCreateOptionalParams,
  ) => PollerLike<OperationState<ConfigurationStore>, ConfigurationStore>;
  /** Gets the properties of the specified configuration store. */
  get: (
    resourceGroupName: string,
    configStoreName: string,
    options?: ConfigurationStoresGetOptionalParams,
  ) => Promise<ConfigurationStore>;
}

function _getConfigurationStores(context: AppConfigurationManagementContext) {
  return {
    listDeleted: (options?: ConfigurationStoresListDeletedOptionalParams) =>
      listDeleted(context, options),
    purgeDeleted: (
      location: string,
      configStoreName: string,
      options?: ConfigurationStoresPurgeDeletedOptionalParams,
    ) => purgeDeleted(context, location, configStoreName, options),
    getDeleted: (
      location: string,
      configStoreName: string,
      options?: ConfigurationStoresGetDeletedOptionalParams,
    ) => getDeleted(context, location, configStoreName, options),
    regenerateKey: (
      resourceGroupName: string,
      configStoreName: string,
      regenerateKeyParameters: RegenerateKeyParameters,
      options?: ConfigurationStoresRegenerateKeyOptionalParams,
    ) =>
      regenerateKey(context, resourceGroupName, configStoreName, regenerateKeyParameters, options),
    listKeys: (
      resourceGroupName: string,
      configStoreName: string,
      options?: ConfigurationStoresListKeysOptionalParams,
    ) => listKeys(context, resourceGroupName, configStoreName, options),
    list: (options?: ConfigurationStoresListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ConfigurationStoresListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      configStoreName: string,
      options?: ConfigurationStoresDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, configStoreName, options),
    update: (
      resourceGroupName: string,
      configStoreName: string,
      configStoreUpdateParameters: ConfigurationStoreUpdateParameters,
      options?: ConfigurationStoresUpdateOptionalParams,
    ) => update(context, resourceGroupName, configStoreName, configStoreUpdateParameters, options),
    create: (
      resourceGroupName: string,
      configStoreName: string,
      configStoreCreationParameters: ConfigurationStore,
      options?: ConfigurationStoresCreateOptionalParams,
    ) =>
      create(context, resourceGroupName, configStoreName, configStoreCreationParameters, options),
    get: (
      resourceGroupName: string,
      configStoreName: string,
      options?: ConfigurationStoresGetOptionalParams,
    ) => get(context, resourceGroupName, configStoreName, options),
  };
}

export function _getConfigurationStoresOperations(
  context: AppConfigurationManagementContext,
): ConfigurationStoresOperations {
  return {
    ..._getConfigurationStores(context),
  };
}
