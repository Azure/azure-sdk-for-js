// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisManagementContext } from "../../api/redisManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/firewallRules/operations.js";
import {
  FirewallRulesListOptionalParams,
  FirewallRulesDeleteOptionalParams,
  FirewallRulesCreateOrUpdateOptionalParams,
  FirewallRulesGetOptionalParams,
} from "../../api/firewallRules/options.js";
import { RedisFirewallRule } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a FirewallRules operations. */
export interface FirewallRulesOperations {
  /** Gets all firewall rules in the specified redis cache. */
  list: (
    resourceGroupName: string,
    cacheName: string,
    options?: FirewallRulesListOptionalParams,
  ) => PagedAsyncIterableIterator<RedisFirewallRule>;
  /** Deletes a single firewall rule in a specified redis cache. */
  delete: (
    resourceGroupName: string,
    cacheName: string,
    ruleName: string,
    options?: FirewallRulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a redis cache firewall rule */
  createOrUpdate: (
    resourceGroupName: string,
    cacheName: string,
    ruleName: string,
    parameters: RedisFirewallRule,
    options?: FirewallRulesCreateOrUpdateOptionalParams,
  ) => Promise<RedisFirewallRule>;
  /** Gets a single firewall rule in a specified redis cache. */
  get: (
    resourceGroupName: string,
    cacheName: string,
    ruleName: string,
    options?: FirewallRulesGetOptionalParams,
  ) => Promise<RedisFirewallRule>;
}

function _getFirewallRules(context: RedisManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      cacheName: string,
      options?: FirewallRulesListOptionalParams,
    ) => list(context, resourceGroupName, cacheName, options),
    delete: (
      resourceGroupName: string,
      cacheName: string,
      ruleName: string,
      options?: FirewallRulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, cacheName, ruleName, options),
    createOrUpdate: (
      resourceGroupName: string,
      cacheName: string,
      ruleName: string,
      parameters: RedisFirewallRule,
      options?: FirewallRulesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, cacheName, ruleName, parameters, options),
    get: (
      resourceGroupName: string,
      cacheName: string,
      ruleName: string,
      options?: FirewallRulesGetOptionalParams,
    ) => get(context, resourceGroupName, cacheName, ruleName, options),
  };
}

export function _getFirewallRulesOperations(
  context: RedisManagementContext,
): FirewallRulesOperations {
  return {
    ..._getFirewallRules(context),
  };
}
