// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DocumentDBContext } from "../../api/mongoClusterManagementContext.js";
import { FirewallRule } from "../../models/models.js";
import {
  firewallRulesGet,
  firewallRulesCreateOrUpdate,
  firewallRulesDelete,
  firewallRulesListByMongoCluster,
} from "../../api/firewallRules/index.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  FirewallRulesGetOptionalParams,
  FirewallRulesCreateOrUpdateOptionalParams,
  FirewallRulesDeleteOptionalParams,
  FirewallRulesListByMongoClusterOptionalParams,
} from "../../models/options.js";

/** Interface representing a FirewallRules operations. */
export interface FirewallRulesOperations {
  /** Gets information about a mongo cluster firewall rule. */
  get: (
    resourceGroupName: string,
    mongoClusterName: string,
    firewallRuleName: string,
    options?: FirewallRulesGetOptionalParams,
  ) => Promise<FirewallRule>;
  /** Creates a new firewall rule or updates an existing firewall rule on a mongo cluster. */
  createOrUpdate: (
    resourceGroupName: string,
    mongoClusterName: string,
    firewallRuleName: string,
    resource: FirewallRule,
    options?: FirewallRulesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<FirewallRule>, FirewallRule>;
  /** Deletes a mongo cluster firewall rule. */
  delete: (
    resourceGroupName: string,
    mongoClusterName: string,
    firewallRuleName: string,
    options?: FirewallRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List all the firewall rules in a given mongo cluster. */
  listByMongoCluster: (
    resourceGroupName: string,
    mongoClusterName: string,
    options?: FirewallRulesListByMongoClusterOptionalParams,
  ) => PagedAsyncIterableIterator<FirewallRule>;
}

export function getFirewallRules(
  context: DocumentDBContext,
  subscriptionId: string,
) {
  return {
    get: (
      resourceGroupName: string,
      mongoClusterName: string,
      firewallRuleName: string,
      options?: FirewallRulesGetOptionalParams,
    ) =>
      firewallRulesGet(
        context,
        subscriptionId,
        resourceGroupName,
        mongoClusterName,
        firewallRuleName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      mongoClusterName: string,
      firewallRuleName: string,
      resource: FirewallRule,
      options?: FirewallRulesCreateOrUpdateOptionalParams,
    ) =>
      firewallRulesCreateOrUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        mongoClusterName,
        firewallRuleName,
        resource,
        options,
      ),
    delete: (
      resourceGroupName: string,
      mongoClusterName: string,
      firewallRuleName: string,
      options?: FirewallRulesDeleteOptionalParams,
    ) =>
      firewallRulesDelete(
        context,
        subscriptionId,
        resourceGroupName,
        mongoClusterName,
        firewallRuleName,
        options,
      ),
    listByMongoCluster: (
      resourceGroupName: string,
      mongoClusterName: string,
      options?: FirewallRulesListByMongoClusterOptionalParams,
    ) =>
      firewallRulesListByMongoCluster(
        context,
        subscriptionId,
        resourceGroupName,
        mongoClusterName,
        options,
      ),
  };
}

export function getFirewallRulesOperations(
  context: DocumentDBContext,
  subscriptionId: string,
): FirewallRulesOperations {
  return {
    ...getFirewallRules(context, subscriptionId),
  };
}
