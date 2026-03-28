// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list } from "../../api/networkInterfaceLoadBalancers/operations.js";
import type { NetworkInterfaceLoadBalancersListOptionalParams } from "../../api/networkInterfaceLoadBalancers/options.js";
import type { LoadBalancer } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a NetworkInterfaceLoadBalancers operations. */
export interface NetworkInterfaceLoadBalancersOperations {
  /** List all load balancers in a network interface. */
  list: (
    resourceGroupName: string,
    networkInterfaceName: string,
    options?: NetworkInterfaceLoadBalancersListOptionalParams,
  ) => PagedAsyncIterableIterator<LoadBalancer>;
}

function _getNetworkInterfaceLoadBalancers(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      networkInterfaceName: string,
      options?: NetworkInterfaceLoadBalancersListOptionalParams,
    ) => list(context, resourceGroupName, networkInterfaceName, options),
  };
}

export function _getNetworkInterfaceLoadBalancersOperations(
  context: NetworkManagementContext,
): NetworkInterfaceLoadBalancersOperations {
  return {
    ..._getNetworkInterfaceLoadBalancers(context),
  };
}
