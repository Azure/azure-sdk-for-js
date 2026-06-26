// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBForPostgreSQLContext } from "../../api/cosmosDBForPostgreSQLContext.js";
import { listByCluster, $delete, createOrUpdate, get } from "../../api/firewallRules/operations.js";
import {
  FirewallRulesListByClusterOptionalParams,
  FirewallRulesDeleteOptionalParams,
  FirewallRulesCreateOrUpdateOptionalParams,
  FirewallRulesGetOptionalParams,
} from "../../api/firewallRules/options.js";
import { FirewallRule } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FirewallRules operations. */
export interface FirewallRulesOperations {
  /** Lists all the firewall rules on cluster. */
  listByCluster: (
    resourceGroupName: string,
    clusterName: string,
    options?: FirewallRulesListByClusterOptionalParams,
  ) => PagedAsyncIterableIterator<FirewallRule>;
  /** Deletes a cluster firewall rule. */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    firewallRuleName: string,
    options?: FirewallRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    firewallRuleName: string,
    options?: FirewallRulesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    firewallRuleName: string,
    options?: FirewallRulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a new cluster firewall rule or updates an existing cluster firewall rule. */
  createOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    firewallRuleName: string,
    parameters: FirewallRule,
    options?: FirewallRulesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<FirewallRule>, FirewallRule>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    firewallRuleName: string,
    parameters: FirewallRule,
    options?: FirewallRulesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<FirewallRule>, FirewallRule>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    firewallRuleName: string,
    parameters: FirewallRule,
    options?: FirewallRulesCreateOrUpdateOptionalParams,
  ) => Promise<FirewallRule>;
  /** Gets information about a cluster firewall rule. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    firewallRuleName: string,
    options?: FirewallRulesGetOptionalParams,
  ) => Promise<FirewallRule>;
}

function _getFirewallRules(context: CosmosDBForPostgreSQLContext) {
  return {
    listByCluster: (
      resourceGroupName: string,
      clusterName: string,
      options?: FirewallRulesListByClusterOptionalParams,
    ) => listByCluster(context, resourceGroupName, clusterName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      firewallRuleName: string,
      options?: FirewallRulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, firewallRuleName, options),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      firewallRuleName: string,
      options?: FirewallRulesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, clusterName, firewallRuleName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      firewallRuleName: string,
      options?: FirewallRulesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, clusterName, firewallRuleName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      clusterName: string,
      firewallRuleName: string,
      parameters: FirewallRule,
      options?: FirewallRulesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        firewallRuleName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      firewallRuleName: string,
      parameters: FirewallRule,
      options?: FirewallRulesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        firewallRuleName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      firewallRuleName: string,
      parameters: FirewallRule,
      options?: FirewallRulesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        firewallRuleName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      clusterName: string,
      firewallRuleName: string,
      options?: FirewallRulesGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, firewallRuleName, options),
  };
}

export function _getFirewallRulesOperations(
  context: CosmosDBForPostgreSQLContext,
): FirewallRulesOperations {
  return {
    ..._getFirewallRules(context),
  };
}
