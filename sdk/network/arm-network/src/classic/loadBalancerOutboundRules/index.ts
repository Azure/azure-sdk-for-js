// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list, get } from "../../api/loadBalancerOutboundRules/operations.js";
import type {
  LoadBalancerOutboundRulesListOptionalParams,
  LoadBalancerOutboundRulesGetOptionalParams,
} from "../../api/loadBalancerOutboundRules/options.js";
import type { OutboundRule } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a LoadBalancerOutboundRules operations. */
export interface LoadBalancerOutboundRulesOperations {
  /** Gets all the outbound rules in a load balancer. */
  list: (
    resourceGroupName: string,
    loadBalancerName: string,
    options?: LoadBalancerOutboundRulesListOptionalParams,
  ) => PagedAsyncIterableIterator<OutboundRule>;
  /** Gets the specified load balancer outbound rule. */
  get: (
    resourceGroupName: string,
    loadBalancerName: string,
    outboundRuleName: string,
    options?: LoadBalancerOutboundRulesGetOptionalParams,
  ) => Promise<OutboundRule>;
}

function _getLoadBalancerOutboundRules(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      loadBalancerName: string,
      options?: LoadBalancerOutboundRulesListOptionalParams,
    ) => list(context, resourceGroupName, loadBalancerName, options),
    get: (
      resourceGroupName: string,
      loadBalancerName: string,
      outboundRuleName: string,
      options?: LoadBalancerOutboundRulesGetOptionalParams,
    ) => get(context, resourceGroupName, loadBalancerName, outboundRuleName, options),
  };
}

export function _getLoadBalancerOutboundRulesOperations(
  context: NetworkManagementContext,
): LoadBalancerOutboundRulesOperations {
  return {
    ..._getLoadBalancerOutboundRules(context),
  };
}
