// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { health, list, get } from "../../api/loadBalancerLoadBalancingRules/operations.js";
import type {
  LoadBalancerLoadBalancingRulesHealthOptionalParams,
  LoadBalancerLoadBalancingRulesListOptionalParams,
  LoadBalancerLoadBalancingRulesGetOptionalParams,
} from "../../api/loadBalancerLoadBalancingRules/options.js";
import type {
  LoadBalancingRule,
  LoadBalancerHealthPerRule,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a LoadBalancerLoadBalancingRules operations. */
export interface LoadBalancerLoadBalancingRulesOperations {
  /** Get health details of a load balancing rule. */
  health: (
    groupName: string,
    loadBalancerName: string,
    loadBalancingRuleName: string,
    options?: LoadBalancerLoadBalancingRulesHealthOptionalParams,
  ) => PollerLike<OperationState<LoadBalancerHealthPerRule>, LoadBalancerHealthPerRule>;
  /** @deprecated use health instead */
  beginHealth: (
    groupName: string,
    loadBalancerName: string,
    loadBalancingRuleName: string,
    options?: LoadBalancerLoadBalancingRulesHealthOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<LoadBalancerHealthPerRule>, LoadBalancerHealthPerRule>
  >;
  /** @deprecated use health instead */
  beginHealthAndWait: (
    groupName: string,
    loadBalancerName: string,
    loadBalancingRuleName: string,
    options?: LoadBalancerLoadBalancingRulesHealthOptionalParams,
  ) => Promise<LoadBalancerHealthPerRule>;
  /** Gets all the load balancing rules in a load balancer. */
  list: (
    resourceGroupName: string,
    loadBalancerName: string,
    options?: LoadBalancerLoadBalancingRulesListOptionalParams,
  ) => PagedAsyncIterableIterator<LoadBalancingRule>;
  /** Gets the specified load balancer load balancing rule. */
  get: (
    resourceGroupName: string,
    loadBalancerName: string,
    loadBalancingRuleName: string,
    options?: LoadBalancerLoadBalancingRulesGetOptionalParams,
  ) => Promise<LoadBalancingRule>;
}

function _getLoadBalancerLoadBalancingRules(context: NetworkManagementContext) {
  return {
    health: (
      groupName: string,
      loadBalancerName: string,
      loadBalancingRuleName: string,
      options?: LoadBalancerLoadBalancingRulesHealthOptionalParams,
    ) => health(context, groupName, loadBalancerName, loadBalancingRuleName, options),
    beginHealth: async (
      groupName: string,
      loadBalancerName: string,
      loadBalancingRuleName: string,
      options?: LoadBalancerLoadBalancingRulesHealthOptionalParams,
    ) => {
      const poller = health(context, groupName, loadBalancerName, loadBalancingRuleName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginHealthAndWait: async (
      groupName: string,
      loadBalancerName: string,
      loadBalancingRuleName: string,
      options?: LoadBalancerLoadBalancingRulesHealthOptionalParams,
    ) => {
      return await health(context, groupName, loadBalancerName, loadBalancingRuleName, options);
    },
    list: (
      resourceGroupName: string,
      loadBalancerName: string,
      options?: LoadBalancerLoadBalancingRulesListOptionalParams,
    ) => list(context, resourceGroupName, loadBalancerName, options),
    get: (
      resourceGroupName: string,
      loadBalancerName: string,
      loadBalancingRuleName: string,
      options?: LoadBalancerLoadBalancingRulesGetOptionalParams,
    ) => get(context, resourceGroupName, loadBalancerName, loadBalancingRuleName, options),
  };
}

export function _getLoadBalancerLoadBalancingRulesOperations(
  context: NetworkManagementContext,
): LoadBalancerLoadBalancingRulesOperations {
  return {
    ..._getLoadBalancerLoadBalancingRules(context),
  };
}
