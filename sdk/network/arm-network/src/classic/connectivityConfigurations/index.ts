// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/connectivityConfigurations/operations.js";
import type {
  ConnectivityConfigurationsListOptionalParams,
  ConnectivityConfigurationsDeleteOptionalParams,
  ConnectivityConfigurationsCreateOrUpdateOptionalParams,
  ConnectivityConfigurationsGetOptionalParams,
} from "../../api/connectivityConfigurations/options.js";
import type { ConnectivityConfiguration } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ConnectivityConfigurations operations. */
export interface ConnectivityConfigurationsOperations {
  /** Lists all the network manager connectivity configuration in a specified network manager. */
  list: (
    resourceGroupName: string,
    networkManagerName: string,
    options?: ConnectivityConfigurationsListOptionalParams,
  ) => PagedAsyncIterableIterator<ConnectivityConfiguration>;
  /** Deletes a network manager connectivity configuration, specified by the resource group, network manager name, and connectivity configuration name */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    options?: ConnectivityConfigurationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    options?: ConnectivityConfigurationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    options?: ConnectivityConfigurationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates/Updates a new network manager connectivity configuration */
  createOrUpdate: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    connectivityConfiguration: ConnectivityConfiguration,
    options?: ConnectivityConfigurationsCreateOrUpdateOptionalParams,
  ) => Promise<ConnectivityConfiguration>;
  /** Gets a Network Connectivity Configuration, specified by the resource group, network manager name, and connectivity Configuration name */
  get: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    options?: ConnectivityConfigurationsGetOptionalParams,
  ) => Promise<ConnectivityConfiguration>;
}

function _getConnectivityConfigurations(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      networkManagerName: string,
      options?: ConnectivityConfigurationsListOptionalParams,
    ) => list(context, resourceGroupName, networkManagerName, options),
    delete: (
      resourceGroupName: string,
      networkManagerName: string,
      configurationName: string,
      options?: ConnectivityConfigurationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkManagerName, configurationName, options),
    beginDelete: async (
      resourceGroupName: string,
      networkManagerName: string,
      configurationName: string,
      options?: ConnectivityConfigurationsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        networkManagerName,
        configurationName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkManagerName: string,
      configurationName: string,
      options?: ConnectivityConfigurationsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        networkManagerName,
        configurationName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      networkManagerName: string,
      configurationName: string,
      connectivityConfiguration: ConnectivityConfiguration,
      options?: ConnectivityConfigurationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        networkManagerName,
        configurationName,
        connectivityConfiguration,
        options,
      ),
    get: (
      resourceGroupName: string,
      networkManagerName: string,
      configurationName: string,
      options?: ConnectivityConfigurationsGetOptionalParams,
    ) => get(context, resourceGroupName, networkManagerName, configurationName, options),
  };
}

export function _getConnectivityConfigurationsOperations(
  context: NetworkManagementContext,
): ConnectivityConfigurationsOperations {
  return {
    ..._getConnectivityConfigurations(context),
  };
}
