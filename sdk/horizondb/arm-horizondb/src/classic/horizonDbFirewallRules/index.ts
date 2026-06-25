// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbContext } from "../../api/horizonDbContext.js";
import { $delete, createOrUpdate, list, get } from "../../api/horizonDbFirewallRules/operations.js";
import {
  HorizonDbFirewallRulesDeleteOptionalParams,
  HorizonDbFirewallRulesCreateOrUpdateOptionalParams,
  HorizonDbFirewallRulesListOptionalParams,
  HorizonDbFirewallRulesGetOptionalParams,
} from "../../api/horizonDbFirewallRules/options.js";
import { HorizonDbFirewallRule } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a HorizonDbFirewallRules operations. */
export interface HorizonDbFirewallRulesOperations {
  /** Deletes a HorizonDB firewall rule. */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    firewallRuleName: string,
    options?: HorizonDbFirewallRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    firewallRuleName: string,
    options?: HorizonDbFirewallRulesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    firewallRuleName: string,
    options?: HorizonDbFirewallRulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a new HorizonDB firewall rule or updates an existing rule. */
  createOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    firewallRuleName: string,
    resource: HorizonDbFirewallRule,
    options?: HorizonDbFirewallRulesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<HorizonDbFirewallRule>, HorizonDbFirewallRule>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    firewallRuleName: string,
    resource: HorizonDbFirewallRule,
    options?: HorizonDbFirewallRulesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<HorizonDbFirewallRule>, HorizonDbFirewallRule>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    firewallRuleName: string,
    resource: HorizonDbFirewallRule,
    options?: HorizonDbFirewallRulesCreateOrUpdateOptionalParams,
  ) => Promise<HorizonDbFirewallRule>;
  /** Lists all HorizonDB firewall rules in a pool. */
  list: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    options?: HorizonDbFirewallRulesListOptionalParams,
  ) => PagedAsyncIterableIterator<HorizonDbFirewallRule>;
  /** Gets information about a HorizonDB firewall rule. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    firewallRuleName: string,
    options?: HorizonDbFirewallRulesGetOptionalParams,
  ) => Promise<HorizonDbFirewallRule>;
}

function _getHorizonDbFirewallRules(context: HorizonDbContext) {
  return {
    delete: (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      firewallRuleName: string,
      options?: HorizonDbFirewallRulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, poolName, firewallRuleName, options),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      firewallRuleName: string,
      options?: HorizonDbFirewallRulesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        clusterName,
        poolName,
        firewallRuleName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      firewallRuleName: string,
      options?: HorizonDbFirewallRulesDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        clusterName,
        poolName,
        firewallRuleName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      firewallRuleName: string,
      resource: HorizonDbFirewallRule,
      options?: HorizonDbFirewallRulesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        poolName,
        firewallRuleName,
        resource,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      firewallRuleName: string,
      resource: HorizonDbFirewallRule,
      options?: HorizonDbFirewallRulesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        poolName,
        firewallRuleName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      firewallRuleName: string,
      resource: HorizonDbFirewallRule,
      options?: HorizonDbFirewallRulesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        poolName,
        firewallRuleName,
        resource,
        options,
      );
    },
    list: (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      options?: HorizonDbFirewallRulesListOptionalParams,
    ) => list(context, resourceGroupName, clusterName, poolName, options),
    get: (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      firewallRuleName: string,
      options?: HorizonDbFirewallRulesGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, poolName, firewallRuleName, options),
  };
}

export function _getHorizonDbFirewallRulesOperations(
  context: HorizonDbContext,
): HorizonDbFirewallRulesOperations {
  return {
    ..._getHorizonDbFirewallRules(context),
  };
}
