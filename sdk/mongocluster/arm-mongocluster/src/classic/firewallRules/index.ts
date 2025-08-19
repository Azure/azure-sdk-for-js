// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MongoClusterManagementContext } from "../../api/mongoClusterManagementContext.js";
import { FirewallRule } from "../../models/models.js";
import {
  FirewallRulesListByMongoClusterOptionalParams,
  FirewallRulesDeleteOptionalParams,
  FirewallRulesCreateOrUpdateOptionalParams,
  FirewallRulesGetOptionalParams,
} from "../../api/firewallRules/options.js";
import {
  listByMongoCluster,
  $delete,
  createOrUpdate,
  get,
} from "../../api/firewallRules/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FirewallRules operations. */
export interface FirewallRulesOperations {
  /** List all the firewall rules in a given mongo cluster. */
  listByMongoCluster: (
    resourceGroupName: string,
    mongoClusterName: string,
    options?: FirewallRulesListByMongoClusterOptionalParams,
  ) => PagedAsyncIterableIterator<FirewallRule>;
  /** Deletes a mongo cluster firewall rule. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    mongoClusterName: string,
    firewallRuleName: string,
    options?: FirewallRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates a new firewall rule or updates an existing firewall rule on a mongo cluster. */
  createOrUpdate: (
    resourceGroupName: string,
    mongoClusterName: string,
    firewallRuleName: string,
    resource: FirewallRule,
    options?: FirewallRulesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<FirewallRule>, FirewallRule>;
  /** Gets information about a mongo cluster firewall rule. */
  get: (
    resourceGroupName: string,
    mongoClusterName: string,
    firewallRuleName: string,
    options?: FirewallRulesGetOptionalParams,
  ) => Promise<FirewallRule>;
}

function _getFirewallRules(context: MongoClusterManagementContext) {
  return {
    listByMongoCluster: (
      resourceGroupName: string,
      mongoClusterName: string,
      options?: FirewallRulesListByMongoClusterOptionalParams,
    ) => listByMongoCluster(context, resourceGroupName, mongoClusterName, options),
    delete: (
      resourceGroupName: string,
      mongoClusterName: string,
      firewallRuleName: string,
      options?: FirewallRulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, mongoClusterName, firewallRuleName, options),
    createOrUpdate: (
      resourceGroupName: string,
      mongoClusterName: string,
      firewallRuleName: string,
      resource: FirewallRule,
      options?: FirewallRulesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        mongoClusterName,
        firewallRuleName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      mongoClusterName: string,
      firewallRuleName: string,
      options?: FirewallRulesGetOptionalParams,
    ) => get(context, resourceGroupName, mongoClusterName, firewallRuleName, options),
  };
}

export function _getFirewallRulesOperations(
  context: MongoClusterManagementContext,
): FirewallRulesOperations {
  return {
    ..._getFirewallRules(context),
  };
}
