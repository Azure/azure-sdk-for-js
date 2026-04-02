// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/firewallPolicyRuleCollectionGroups/operations.js";
import type {
  FirewallPolicyRuleCollectionGroupsListOptionalParams,
  FirewallPolicyRuleCollectionGroupsDeleteOptionalParams,
  FirewallPolicyRuleCollectionGroupsCreateOrUpdateOptionalParams,
  FirewallPolicyRuleCollectionGroupsGetOptionalParams,
} from "../../api/firewallPolicyRuleCollectionGroups/options.js";
import type { FirewallPolicyRuleCollectionGroup } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FirewallPolicyRuleCollectionGroups operations. */
export interface FirewallPolicyRuleCollectionGroupsOperations {
  /** Lists all FirewallPolicyRuleCollectionGroups in a FirewallPolicy resource. */
  list: (
    resourceGroupName: string,
    firewallPolicyName: string,
    options?: FirewallPolicyRuleCollectionGroupsListOptionalParams,
  ) => PagedAsyncIterableIterator<FirewallPolicyRuleCollectionGroup>;
  /** Deletes the specified FirewallPolicyRuleCollectionGroup. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    firewallPolicyName: string,
    ruleCollectionGroupName: string,
    options?: FirewallPolicyRuleCollectionGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    firewallPolicyName: string,
    ruleCollectionGroupName: string,
    options?: FirewallPolicyRuleCollectionGroupsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    firewallPolicyName: string,
    ruleCollectionGroupName: string,
    options?: FirewallPolicyRuleCollectionGroupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates the specified FirewallPolicyRuleCollectionGroup. */
  createOrUpdate: (
    resourceGroupName: string,
    firewallPolicyName: string,
    ruleCollectionGroupName: string,
    parameters: FirewallPolicyRuleCollectionGroup,
    options?: FirewallPolicyRuleCollectionGroupsCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<FirewallPolicyRuleCollectionGroup>,
    FirewallPolicyRuleCollectionGroup
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    firewallPolicyName: string,
    ruleCollectionGroupName: string,
    parameters: FirewallPolicyRuleCollectionGroup,
    options?: FirewallPolicyRuleCollectionGroupsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<FirewallPolicyRuleCollectionGroup>,
      FirewallPolicyRuleCollectionGroup
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    firewallPolicyName: string,
    ruleCollectionGroupName: string,
    parameters: FirewallPolicyRuleCollectionGroup,
    options?: FirewallPolicyRuleCollectionGroupsCreateOrUpdateOptionalParams,
  ) => Promise<FirewallPolicyRuleCollectionGroup>;
  /** Gets the specified FirewallPolicyRuleCollectionGroup. */
  get: (
    resourceGroupName: string,
    firewallPolicyName: string,
    ruleCollectionGroupName: string,
    options?: FirewallPolicyRuleCollectionGroupsGetOptionalParams,
  ) => Promise<FirewallPolicyRuleCollectionGroup>;
}

function _getFirewallPolicyRuleCollectionGroups(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      firewallPolicyName: string,
      options?: FirewallPolicyRuleCollectionGroupsListOptionalParams,
    ) => list(context, resourceGroupName, firewallPolicyName, options),
    delete: (
      resourceGroupName: string,
      firewallPolicyName: string,
      ruleCollectionGroupName: string,
      options?: FirewallPolicyRuleCollectionGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, firewallPolicyName, ruleCollectionGroupName, options),
    beginDelete: async (
      resourceGroupName: string,
      firewallPolicyName: string,
      ruleCollectionGroupName: string,
      options?: FirewallPolicyRuleCollectionGroupsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        firewallPolicyName,
        ruleCollectionGroupName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      firewallPolicyName: string,
      ruleCollectionGroupName: string,
      options?: FirewallPolicyRuleCollectionGroupsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        firewallPolicyName,
        ruleCollectionGroupName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      firewallPolicyName: string,
      ruleCollectionGroupName: string,
      parameters: FirewallPolicyRuleCollectionGroup,
      options?: FirewallPolicyRuleCollectionGroupsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        firewallPolicyName,
        ruleCollectionGroupName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      firewallPolicyName: string,
      ruleCollectionGroupName: string,
      parameters: FirewallPolicyRuleCollectionGroup,
      options?: FirewallPolicyRuleCollectionGroupsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        firewallPolicyName,
        ruleCollectionGroupName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      firewallPolicyName: string,
      ruleCollectionGroupName: string,
      parameters: FirewallPolicyRuleCollectionGroup,
      options?: FirewallPolicyRuleCollectionGroupsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        firewallPolicyName,
        ruleCollectionGroupName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      firewallPolicyName: string,
      ruleCollectionGroupName: string,
      options?: FirewallPolicyRuleCollectionGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, firewallPolicyName, ruleCollectionGroupName, options),
  };
}

export function _getFirewallPolicyRuleCollectionGroupsOperations(
  context: NetworkManagementContext,
): FirewallPolicyRuleCollectionGroupsOperations {
  return {
    ..._getFirewallPolicyRuleCollectionGroups(context),
  };
}
