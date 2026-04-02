// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list, get } from "../../api/loadBalancerFrontendIPConfigurations/operations.js";
import type {
  LoadBalancerFrontendIPConfigurationsListOptionalParams,
  LoadBalancerFrontendIPConfigurationsGetOptionalParams,
} from "../../api/loadBalancerFrontendIPConfigurations/options.js";
import type { FrontendIPConfiguration } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a LoadBalancerFrontendIPConfigurations operations. */
export interface LoadBalancerFrontendIPConfigurationsOperations {
  /** Gets all the load balancer frontend IP configurations. */
  list: (
    resourceGroupName: string,
    loadBalancerName: string,
    options?: LoadBalancerFrontendIPConfigurationsListOptionalParams,
  ) => PagedAsyncIterableIterator<FrontendIPConfiguration>;
  /** Gets load balancer frontend IP configuration. */
  get: (
    resourceGroupName: string,
    loadBalancerName: string,
    frontendIPConfigurationName: string,
    options?: LoadBalancerFrontendIPConfigurationsGetOptionalParams,
  ) => Promise<FrontendIPConfiguration>;
}

function _getLoadBalancerFrontendIPConfigurations(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      loadBalancerName: string,
      options?: LoadBalancerFrontendIPConfigurationsListOptionalParams,
    ) => list(context, resourceGroupName, loadBalancerName, options),
    get: (
      resourceGroupName: string,
      loadBalancerName: string,
      frontendIPConfigurationName: string,
      options?: LoadBalancerFrontendIPConfigurationsGetOptionalParams,
    ) => get(context, resourceGroupName, loadBalancerName, frontendIPConfigurationName, options),
  };
}

export function _getLoadBalancerFrontendIPConfigurationsOperations(
  context: NetworkManagementContext,
): LoadBalancerFrontendIPConfigurationsOperations {
  return {
    ..._getLoadBalancerFrontendIPConfigurations(context),
  };
}
