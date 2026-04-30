// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  replace,
  listByServer,
  $delete,
  createOrUpdate,
  get,
} from "../../api/firewallRules/operations.js";
import {
  FirewallRulesReplaceOptionalParams,
  FirewallRulesListByServerOptionalParams,
  FirewallRulesDeleteOptionalParams,
  FirewallRulesCreateOrUpdateOptionalParams,
  FirewallRulesGetOptionalParams,
} from "../../api/firewallRules/options.js";
import { FirewallRule, FirewallRuleList } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a FirewallRules operations. */
export interface FirewallRulesOperations {
  /** Replaces all firewall rules on the server. */
  replace: (
    resourceGroupName: string,
    serverName: string,
    parameters: FirewallRuleList,
    options?: FirewallRulesReplaceOptionalParams,
  ) => Promise<FirewallRule>;
  /** Gets a list of firewall rules. */
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
  ) => Promise<void>;
  /** Creates or updates a firewall rule. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    firewallRuleName: string,
    parameters: FirewallRule,
    options?: FirewallRulesCreateOrUpdateOptionalParams,
  ) => Promise<FirewallRule>;
  /** Gets a firewall rule. */
  get: (
    resourceGroupName: string,
    serverName: string,
    firewallRuleName: string,
    options?: FirewallRulesGetOptionalParams,
  ) => Promise<FirewallRule>;
}

function _getFirewallRules(context: SqlManagementContext) {
  return {
    replace: (
      resourceGroupName: string,
      serverName: string,
      parameters: FirewallRuleList,
      options?: FirewallRulesReplaceOptionalParams,
    ) => replace(context, resourceGroupName, serverName, parameters, options),
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
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      firewallRuleName: string,
      parameters: FirewallRule,
      options?: FirewallRulesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, serverName, firewallRuleName, parameters, options),
    get: (
      resourceGroupName: string,
      serverName: string,
      firewallRuleName: string,
      options?: FirewallRulesGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, firewallRuleName, options),
  };
}

export function _getFirewallRulesOperations(
  context: SqlManagementContext,
): FirewallRulesOperations {
  return {
    ..._getFirewallRules(context),
  };
}
