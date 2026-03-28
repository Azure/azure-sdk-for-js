// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/networkManagerRoutingConfigurations/operations.js";
import type {
  NetworkManagerRoutingConfigurationsListOptionalParams,
  NetworkManagerRoutingConfigurationsDeleteOptionalParams,
  NetworkManagerRoutingConfigurationsCreateOrUpdateOptionalParams,
  NetworkManagerRoutingConfigurationsGetOptionalParams,
} from "../../api/networkManagerRoutingConfigurations/options.js";
import type { NetworkManagerRoutingConfiguration } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkManagerRoutingConfigurations operations. */
export interface NetworkManagerRoutingConfigurationsOperations {
  /** Lists all the network manager routing configurations in a network manager, in a paginated format. */
  list: (
    resourceGroupName: string,
    networkManagerName: string,
    options?: NetworkManagerRoutingConfigurationsListOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkManagerRoutingConfiguration>;
  /** Deletes a network manager routing configuration. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    options?: NetworkManagerRoutingConfigurationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    options?: NetworkManagerRoutingConfigurationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    options?: NetworkManagerRoutingConfigurationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a network manager routing configuration. */
  createOrUpdate: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    routingConfiguration: NetworkManagerRoutingConfiguration,
    options?: NetworkManagerRoutingConfigurationsCreateOrUpdateOptionalParams,
  ) => Promise<NetworkManagerRoutingConfiguration>;
  /** Retrieves a network manager routing configuration. */
  get: (
    resourceGroupName: string,
    networkManagerName: string,
    configurationName: string,
    options?: NetworkManagerRoutingConfigurationsGetOptionalParams,
  ) => Promise<NetworkManagerRoutingConfiguration>;
}

function _getNetworkManagerRoutingConfigurations(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      networkManagerName: string,
      options?: NetworkManagerRoutingConfigurationsListOptionalParams,
    ) => list(context, resourceGroupName, networkManagerName, options),
    delete: (
      resourceGroupName: string,
      networkManagerName: string,
      configurationName: string,
      options?: NetworkManagerRoutingConfigurationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkManagerName, configurationName, options),
    beginDelete: async (
      resourceGroupName: string,
      networkManagerName: string,
      configurationName: string,
      options?: NetworkManagerRoutingConfigurationsDeleteOptionalParams,
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
      options?: NetworkManagerRoutingConfigurationsDeleteOptionalParams,
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
      routingConfiguration: NetworkManagerRoutingConfiguration,
      options?: NetworkManagerRoutingConfigurationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        networkManagerName,
        configurationName,
        routingConfiguration,
        options,
      ),
    get: (
      resourceGroupName: string,
      networkManagerName: string,
      configurationName: string,
      options?: NetworkManagerRoutingConfigurationsGetOptionalParams,
    ) => get(context, resourceGroupName, networkManagerName, configurationName, options),
  };
}

export function _getNetworkManagerRoutingConfigurationsOperations(
  context: NetworkManagementContext,
): NetworkManagerRoutingConfigurationsOperations {
  return {
    ..._getNetworkManagerRoutingConfigurations(context),
  };
}
