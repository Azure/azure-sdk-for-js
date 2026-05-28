// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerContext } from "../../api/mySQLManagementFlexibleServerContext.js";
import { listByServer, $delete, createOrUpdate, get } from "../../api/firewallRules/operations.js";
import {
  FirewallRulesListByServerOptionalParams,
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
  /** List all the firewall rules in a given server. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: FirewallRulesListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<FirewallRule>;
  /** Deletes a firewall rule. */
  delete: (
    resourceGroupName: string,
    serverName: string,
    firewallRuleName: string,
    options?: FirewallRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    serverName: string,
    firewallRuleName: string,
    options?: FirewallRulesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    serverName: string,
    firewallRuleName: string,
    options?: FirewallRulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a new firewall rule or updates an existing firewall rule. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    firewallRuleName: string,
    parameters: FirewallRule,
    options?: FirewallRulesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<FirewallRule>, FirewallRule>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    firewallRuleName: string,
    parameters: FirewallRule,
    options?: FirewallRulesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<FirewallRule>, FirewallRule>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    firewallRuleName: string,
    parameters: FirewallRule,
    options?: FirewallRulesCreateOrUpdateOptionalParams,
  ) => Promise<FirewallRule>;
  /** Gets information about a server firewall rule. */
  get: (
    resourceGroupName: string,
    serverName: string,
    firewallRuleName: string,
    options?: FirewallRulesGetOptionalParams,
  ) => Promise<FirewallRule>;
}

function _getFirewallRules(context: MySQLManagementFlexibleServerContext) {
  return {
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: FirewallRulesListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    delete: (
      resourceGroupName: string,
      serverName: string,
      firewallRuleName: string,
      options?: FirewallRulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serverName, firewallRuleName, options),
    beginDelete: async (
      resourceGroupName: string,
      serverName: string,
      firewallRuleName: string,
      options?: FirewallRulesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, serverName, firewallRuleName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      serverName: string,
      firewallRuleName: string,
      options?: FirewallRulesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, serverName, firewallRuleName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      firewallRuleName: string,
      parameters: FirewallRule,
      options?: FirewallRulesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, serverName, firewallRuleName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serverName: string,
      firewallRuleName: string,
      parameters: FirewallRule,
      options?: FirewallRulesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        firewallRuleName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      firewallRuleName: string,
      parameters: FirewallRule,
      options?: FirewallRulesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        firewallRuleName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      serverName: string,
      firewallRuleName: string,
      options?: FirewallRulesGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, firewallRuleName, options),
  };
}

export function _getFirewallRulesOperations(
  context: MySQLManagementFlexibleServerContext,
): FirewallRulesOperations {
  return {
    ..._getFirewallRules(context),
  };
}
