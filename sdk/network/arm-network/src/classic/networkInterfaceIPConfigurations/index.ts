// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list, get } from "../../api/networkInterfaceIPConfigurations/operations.js";
import type {
  NetworkInterfaceIPConfigurationsListOptionalParams,
  NetworkInterfaceIPConfigurationsGetOptionalParams,
} from "../../api/networkInterfaceIPConfigurations/options.js";
import type { NetworkInterfaceIPConfiguration } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a NetworkInterfaceIPConfigurations operations. */
export interface NetworkInterfaceIPConfigurationsOperations {
  /** Get all ip configurations in a network interface. */
  list: (
    resourceGroupName: string,
    networkInterfaceName: string,
    options?: NetworkInterfaceIPConfigurationsListOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkInterfaceIPConfiguration>;
  /** Gets the specified network interface ip configuration. */
  get: (
    resourceGroupName: string,
    networkInterfaceName: string,
    ipConfigurationName: string,
    options?: NetworkInterfaceIPConfigurationsGetOptionalParams,
  ) => Promise<NetworkInterfaceIPConfiguration>;
}

function _getNetworkInterfaceIPConfigurations(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      networkInterfaceName: string,
      options?: NetworkInterfaceIPConfigurationsListOptionalParams,
    ) => list(context, resourceGroupName, networkInterfaceName, options),
    get: (
      resourceGroupName: string,
      networkInterfaceName: string,
      ipConfigurationName: string,
      options?: NetworkInterfaceIPConfigurationsGetOptionalParams,
    ) => get(context, resourceGroupName, networkInterfaceName, ipConfigurationName, options),
  };
}

export function _getNetworkInterfaceIPConfigurationsOperations(
  context: NetworkManagementContext,
): NetworkInterfaceIPConfigurationsOperations {
  return {
    ..._getNetworkInterfaceIPConfigurations(context),
  };
}
