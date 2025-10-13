// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MySQLManagementFlexibleServerContext } from "../../api/mySQLManagementFlexibleServerContext.js";
import { listByServer, $delete, createOrUpdate, get } from "../../api/firewallRules/operations.js";
import type {
  FirewallRulesListByServerOptionalParams,
  FirewallRulesDeleteOptionalParams,
  FirewallRulesCreateOrUpdateOptionalParams,
  FirewallRulesGetOptionalParams,
} from "../../api/firewallRules/options.js";
import type { FirewallRule } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FirewallRules operations. */
export interface FirewallRulesOperations {
  /** List all the firewall rules in a given server. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: FirewallRulesListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<FirewallRule>;
  /** Deletes a firewall rule. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serverName: string,
    firewallRuleName: string,
    options?: FirewallRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates a new firewall rule or updates an existing firewall rule. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    firewallRuleName: string,
    parameters: FirewallRule,
    options?: FirewallRulesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<FirewallRule>, FirewallRule>;
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
  context: MySQLManagementFlexibleServerContext,
): FirewallRulesOperations {
  return {
    ..._getFirewallRules(context),
  };
}
