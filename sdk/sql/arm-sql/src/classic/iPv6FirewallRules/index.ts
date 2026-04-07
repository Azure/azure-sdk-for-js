// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import {
  listByServer,
  $delete,
  createOrUpdate,
  get,
} from "../../api/iPv6FirewallRules/operations.js";
import type {
  IPv6FirewallRulesListByServerOptionalParams,
  IPv6FirewallRulesDeleteOptionalParams,
  IPv6FirewallRulesCreateOrUpdateOptionalParams,
  IPv6FirewallRulesGetOptionalParams,
} from "../../api/iPv6FirewallRules/options.js";
import type { IPv6FirewallRule } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a IPv6FirewallRules operations. */
export interface IPv6FirewallRulesOperations {
  /** Gets a list of IPv6 firewall rules. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: IPv6FirewallRulesListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<IPv6FirewallRule>;
  /** Deletes an IPv6 firewall rule. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serverName: string,
    firewallRuleName: string,
    options?: IPv6FirewallRulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an IPv6 firewall rule. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    firewallRuleName: string,
    parameters: IPv6FirewallRule,
    options?: IPv6FirewallRulesCreateOrUpdateOptionalParams,
  ) => Promise<IPv6FirewallRule>;
  /** Gets an IPv6 firewall rule. */
  get: (
    resourceGroupName: string,
    serverName: string,
    firewallRuleName: string,
    options?: IPv6FirewallRulesGetOptionalParams,
  ) => Promise<IPv6FirewallRule>;
}

function _getIPv6FirewallRules(context: SqlContext) {
  return {
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: IPv6FirewallRulesListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    delete: (
      resourceGroupName: string,
      serverName: string,
      firewallRuleName: string,
      options?: IPv6FirewallRulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serverName, firewallRuleName, options),
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      firewallRuleName: string,
      parameters: IPv6FirewallRule,
      options?: IPv6FirewallRulesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, serverName, firewallRuleName, parameters, options),
    get: (
      resourceGroupName: string,
      serverName: string,
      firewallRuleName: string,
      options?: IPv6FirewallRulesGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, firewallRuleName, options),
  };
}

export function _getIPv6FirewallRulesOperations(context: SqlContext): IPv6FirewallRulesOperations {
  return {
    ..._getIPv6FirewallRules(context),
  };
}
