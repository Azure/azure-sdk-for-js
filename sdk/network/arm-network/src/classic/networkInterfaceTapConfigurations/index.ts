// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/networkInterfaceTapConfigurations/operations.js";
import type {
  NetworkInterfaceTapConfigurationsListOptionalParams,
  NetworkInterfaceTapConfigurationsDeleteOptionalParams,
  NetworkInterfaceTapConfigurationsCreateOrUpdateOptionalParams,
  NetworkInterfaceTapConfigurationsGetOptionalParams,
} from "../../api/networkInterfaceTapConfigurations/options.js";
import type { NetworkInterfaceTapConfiguration } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkInterfaceTapConfigurations operations. */
export interface NetworkInterfaceTapConfigurationsOperations {
  /** Get all Tap configurations in a network interface. */
  list: (
    resourceGroupName: string,
    networkInterfaceName: string,
    options?: NetworkInterfaceTapConfigurationsListOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkInterfaceTapConfiguration>;
  /** Deletes the specified tap configuration from the NetworkInterface. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkInterfaceName: string,
    tapConfigurationName: string,
    options?: NetworkInterfaceTapConfigurationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkInterfaceName: string,
    tapConfigurationName: string,
    options?: NetworkInterfaceTapConfigurationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkInterfaceName: string,
    tapConfigurationName: string,
    options?: NetworkInterfaceTapConfigurationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a Tap configuration in the specified NetworkInterface. */
  createOrUpdate: (
    resourceGroupName: string,
    networkInterfaceName: string,
    tapConfigurationName: string,
    tapConfigurationParameters: NetworkInterfaceTapConfiguration,
    options?: NetworkInterfaceTapConfigurationsCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<NetworkInterfaceTapConfiguration>,
    NetworkInterfaceTapConfiguration
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    networkInterfaceName: string,
    tapConfigurationName: string,
    tapConfigurationParameters: NetworkInterfaceTapConfiguration,
    options?: NetworkInterfaceTapConfigurationsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<NetworkInterfaceTapConfiguration>,
      NetworkInterfaceTapConfiguration
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    networkInterfaceName: string,
    tapConfigurationName: string,
    tapConfigurationParameters: NetworkInterfaceTapConfiguration,
    options?: NetworkInterfaceTapConfigurationsCreateOrUpdateOptionalParams,
  ) => Promise<NetworkInterfaceTapConfiguration>;
  /** Get the specified tap configuration on a network interface. */
  get: (
    resourceGroupName: string,
    networkInterfaceName: string,
    tapConfigurationName: string,
    options?: NetworkInterfaceTapConfigurationsGetOptionalParams,
  ) => Promise<NetworkInterfaceTapConfiguration>;
}

function _getNetworkInterfaceTapConfigurations(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      networkInterfaceName: string,
      options?: NetworkInterfaceTapConfigurationsListOptionalParams,
    ) => list(context, resourceGroupName, networkInterfaceName, options),
    delete: (
      resourceGroupName: string,
      networkInterfaceName: string,
      tapConfigurationName: string,
      options?: NetworkInterfaceTapConfigurationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkInterfaceName, tapConfigurationName, options),
    beginDelete: async (
      resourceGroupName: string,
      networkInterfaceName: string,
      tapConfigurationName: string,
      options?: NetworkInterfaceTapConfigurationsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        networkInterfaceName,
        tapConfigurationName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkInterfaceName: string,
      tapConfigurationName: string,
      options?: NetworkInterfaceTapConfigurationsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        networkInterfaceName,
        tapConfigurationName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      networkInterfaceName: string,
      tapConfigurationName: string,
      tapConfigurationParameters: NetworkInterfaceTapConfiguration,
      options?: NetworkInterfaceTapConfigurationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        networkInterfaceName,
        tapConfigurationName,
        tapConfigurationParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      networkInterfaceName: string,
      tapConfigurationName: string,
      tapConfigurationParameters: NetworkInterfaceTapConfiguration,
      options?: NetworkInterfaceTapConfigurationsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        networkInterfaceName,
        tapConfigurationName,
        tapConfigurationParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      networkInterfaceName: string,
      tapConfigurationName: string,
      tapConfigurationParameters: NetworkInterfaceTapConfiguration,
      options?: NetworkInterfaceTapConfigurationsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        networkInterfaceName,
        tapConfigurationName,
        tapConfigurationParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      networkInterfaceName: string,
      tapConfigurationName: string,
      options?: NetworkInterfaceTapConfigurationsGetOptionalParams,
    ) => get(context, resourceGroupName, networkInterfaceName, tapConfigurationName, options),
  };
}

export function _getNetworkInterfaceTapConfigurationsOperations(
  context: NetworkManagementContext,
): NetworkInterfaceTapConfigurationsOperations {
  return {
    ..._getNetworkInterfaceTapConfigurations(context),
  };
}
