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
    subscriptionId: string,
    resourceGroupName: string,
    mongoClusterName: string,
    firewallRuleName: string,
    options?: FirewallRulesGetOptionalParams,
  ) => Promise<FirewallRule>;
  createOrUpdate: (
    subscriptionId: string,
    resourceGroupName: string,
    mongoClusterName: string,
    firewallRuleName: string,
    resource: FirewallRule,
    options?: FirewallRulesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  delete: (
    subscriptionId: string,
    resourceGroupName: string,
    mongoClusterName: string,
    firewallRuleName: string,
    options?: FirewallRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  listByMongoCluster: (
    subscriptionId: string,
    resourceGroupName: string,
    mongoClusterName: string,
    options?: FirewallRulesListByMongoClusterOptionalParams,
  ) => PagedAsyncIterableIterator<FirewallRule>;
}

export function getFirewallRules(context: DocumentDBContext) {
  return {
    get: (
      subscriptionId: string,
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
      subscriptionId: string,
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
      subscriptionId: string,
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
      subscriptionId: string,
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
): FirewallRulesOperations {
  return {
    ...getFirewallRules(context),
  };
}
