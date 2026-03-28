// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list, get } from "../../api/loadBalancerProbes/operations.js";
import type {
  LoadBalancerProbesListOptionalParams,
  LoadBalancerProbesGetOptionalParams,
} from "../../api/loadBalancerProbes/options.js";
import type { Probe } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a LoadBalancerProbes operations. */
export interface LoadBalancerProbesOperations {
  /** Gets all the load balancer probes. */
  list: (
    resourceGroupName: string,
    loadBalancerName: string,
    options?: LoadBalancerProbesListOptionalParams,
  ) => PagedAsyncIterableIterator<Probe>;
  /** Gets load balancer probe. */
  get: (
    resourceGroupName: string,
    loadBalancerName: string,
    probeName: string,
    options?: LoadBalancerProbesGetOptionalParams,
  ) => Promise<Probe>;
}

function _getLoadBalancerProbes(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      loadBalancerName: string,
      options?: LoadBalancerProbesListOptionalParams,
    ) => list(context, resourceGroupName, loadBalancerName, options),
    get: (
      resourceGroupName: string,
      loadBalancerName: string,
      probeName: string,
      options?: LoadBalancerProbesGetOptionalParams,
    ) => get(context, resourceGroupName, loadBalancerName, probeName, options),
  };
}

export function _getLoadBalancerProbesOperations(
  context: NetworkManagementContext,
): LoadBalancerProbesOperations {
  return {
    ..._getLoadBalancerProbes(context),
  };
}
