// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext } from "../../api/horizonDbContext.js";
import { $delete, createOrReplace, list, get } from "../../api/firewallRules/operations.js";
import type {
  FirewallRulesDeleteOptionalParams,
  FirewallRulesCreateOrReplaceOptionalParams,
  FirewallRulesListOptionalParams,
  FirewallRulesGetOptionalParams,
} from "../../api/firewallRules/options.js";
import type { FirewallRule, FirewallRuleCreateOrUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FirewallRules operations. */
export interface FirewallRulesOperations {
  /** Deletes a HorizonDB pool firewall rule. */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    firewallRuleName: string,
    options?: FirewallRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    firewallRuleName: string,
    options?: FirewallRulesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    firewallRuleName: string,
    options?: FirewallRulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or replaces a HorizonDB pool firewall rule. */
  createOrReplace: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    firewallRuleName: string,
    resource: FirewallRuleCreateOrUpdate,
    options?: FirewallRulesCreateOrReplaceOptionalParams,
  ) => PollerLike<OperationState<FirewallRule>, FirewallRule>;
  /** @deprecated use createOrReplace instead */
  beginCreateOrReplace: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    firewallRuleName: string,
    resource: FirewallRuleCreateOrUpdate,
    options?: FirewallRulesCreateOrReplaceOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<FirewallRule>, FirewallRule>>;
  /** @deprecated use createOrReplace instead */
  beginCreateOrReplaceAndWait: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    firewallRuleName: string,
    resource: FirewallRuleCreateOrUpdate,
    options?: FirewallRulesCreateOrReplaceOptionalParams,
  ) => Promise<FirewallRule>;
  /** Lists all HorizonDB firewall rules in a pool. */
  list: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    options?: FirewallRulesListOptionalParams,
  ) => PagedAsyncIterableIterator<FirewallRule>;
  /** Gets information about a HorizonDB pool firewall rule. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    firewallRuleName: string,
    options?: FirewallRulesGetOptionalParams,
  ) => Promise<FirewallRule>;
}

function _getFirewallRules(context: HorizonDbContext) {
  return {
    delete: (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      firewallRuleName: string,
      options?: FirewallRulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, poolName, firewallRuleName, options),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      firewallRuleName: string,
      options?: FirewallRulesDeleteOptionalParams,
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
      options?: FirewallRulesDeleteOptionalParams,
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
    createOrReplace: (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      firewallRuleName: string,
      resource: FirewallRuleCreateOrUpdate,
      options?: FirewallRulesCreateOrReplaceOptionalParams,
    ) =>
      createOrReplace(
        context,
        resourceGroupName,
        clusterName,
        poolName,
        firewallRuleName,
        resource,
        options,
      ),
    beginCreateOrReplace: async (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      firewallRuleName: string,
      resource: FirewallRuleCreateOrUpdate,
      options?: FirewallRulesCreateOrReplaceOptionalParams,
    ) => {
      const poller = createOrReplace(
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
    beginCreateOrReplaceAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      firewallRuleName: string,
      resource: FirewallRuleCreateOrUpdate,
      options?: FirewallRulesCreateOrReplaceOptionalParams,
    ) => {
      return await createOrReplace(
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
      options?: FirewallRulesListOptionalParams,
    ) => list(context, resourceGroupName, clusterName, poolName, options),
    get: (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      firewallRuleName: string,
      options?: FirewallRulesGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, poolName, firewallRuleName, options),
  };
}

export function _getFirewallRulesOperations(context: HorizonDbContext): FirewallRulesOperations {
  return {
    ..._getFirewallRules(context),
  };
}
