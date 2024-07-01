// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DocumentDBContext } from "../../api/mongoClusterManagementContext.js";
import { FirewallRule } from "../../models/models.js";
import {
  get,
  createOrUpdate,
  $delete,
  listByMongoCluster,
} from "../../api/firewallRules/index.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  FirewallRulesGetOptionalParams,
  FirewallRulesCreateOrUpdateOptionalParams,
  FirewallRulesDeleteOptionalParams,
  FirewallRulesListByMongoClusterOptionalParams,
} from "../../models/options.js";

export interface FirewallRulesOperations {
  get: (
    resourceGroupName: string,
    mongoClusterName: string,
    firewallRuleName: string,
    options?: FirewallRulesGetOptionalParams,
  ) => Promise<FirewallRule>;
  createOrUpdate: (
    resourceGroupName: string,
    mongoClusterName: string,
    firewallRuleName: string,
    resource: FirewallRule,
    options?: FirewallRulesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<FirewallRule>, FirewallRule>;
  delete: (
    resourceGroupName: string,
    mongoClusterName: string,
    firewallRuleName: string,
    options?: FirewallRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
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
      get(
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
      createOrUpdate(
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
      $delete(
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
      listByMongoCluster(
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
