// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list } from "../../api/loadBalancerNetworkInterfaces/operations.js";
import type { LoadBalancerNetworkInterfacesListOptionalParams } from "../../api/loadBalancerNetworkInterfaces/options.js";
import type { NetworkInterface } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a LoadBalancerNetworkInterfaces operations. */
export interface LoadBalancerNetworkInterfacesOperations {
  /** Gets associated load balancer network interfaces. */
  list: (
    resourceGroupName: string,
    loadBalancerName: string,
    options?: LoadBalancerNetworkInterfacesListOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkInterface>;
}

function _getLoadBalancerNetworkInterfaces(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      loadBalancerName: string,
      options?: LoadBalancerNetworkInterfacesListOptionalParams,
    ) => list(context, resourceGroupName, loadBalancerName, options),
  };
}

export function _getLoadBalancerNetworkInterfacesOperations(
  context: NetworkManagementContext,
): LoadBalancerNetworkInterfacesOperations {
  return {
    ..._getLoadBalancerNetworkInterfaces(context),
  };
}
