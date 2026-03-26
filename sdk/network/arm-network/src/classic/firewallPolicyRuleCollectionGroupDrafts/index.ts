// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  $delete,
  createOrUpdate,
  get,
} from "../../api/firewallPolicyRuleCollectionGroupDrafts/operations.js";
import type {
  FirewallPolicyRuleCollectionGroupDraftsDeleteOptionalParams,
  FirewallPolicyRuleCollectionGroupDraftsCreateOrUpdateOptionalParams,
  FirewallPolicyRuleCollectionGroupDraftsGetOptionalParams,
} from "../../api/firewallPolicyRuleCollectionGroupDrafts/options.js";
import type { FirewallPolicyRuleCollectionGroupDraft } from "../../models/microsoft/network/models.js";

/** Interface representing a FirewallPolicyRuleCollectionGroupDrafts operations. */
export interface FirewallPolicyRuleCollectionGroupDraftsOperations {
  /** Delete Rule Collection Group Draft. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    firewallPolicyName: string,
    ruleCollectionGroupName: string,
    options?: FirewallPolicyRuleCollectionGroupDraftsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or Update Rule Collection Group Draft. */
  createOrUpdate: (
    resourceGroupName: string,
    firewallPolicyName: string,
    ruleCollectionGroupName: string,
    parameters: FirewallPolicyRuleCollectionGroupDraft,
    options?: FirewallPolicyRuleCollectionGroupDraftsCreateOrUpdateOptionalParams,
  ) => Promise<FirewallPolicyRuleCollectionGroupDraft>;
  /** Get Rule Collection Group Draft. */
  get: (
    resourceGroupName: string,
    firewallPolicyName: string,
    ruleCollectionGroupName: string,
    options?: FirewallPolicyRuleCollectionGroupDraftsGetOptionalParams,
  ) => Promise<FirewallPolicyRuleCollectionGroupDraft>;
}

function _getFirewallPolicyRuleCollectionGroupDrafts(context: NetworkManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      firewallPolicyName: string,
      ruleCollectionGroupName: string,
      options?: FirewallPolicyRuleCollectionGroupDraftsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, firewallPolicyName, ruleCollectionGroupName, options),
    createOrUpdate: (
      resourceGroupName: string,
      firewallPolicyName: string,
      ruleCollectionGroupName: string,
      parameters: FirewallPolicyRuleCollectionGroupDraft,
      options?: FirewallPolicyRuleCollectionGroupDraftsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        firewallPolicyName,
        ruleCollectionGroupName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      firewallPolicyName: string,
      ruleCollectionGroupName: string,
      options?: FirewallPolicyRuleCollectionGroupDraftsGetOptionalParams,
    ) => get(context, resourceGroupName, firewallPolicyName, ruleCollectionGroupName, options),
  };
}

export function _getFirewallPolicyRuleCollectionGroupDraftsOperations(
  context: NetworkManagementContext,
): FirewallPolicyRuleCollectionGroupDraftsOperations {
  return {
    ..._getFirewallPolicyRuleCollectionGroupDrafts(context),
  };
}
