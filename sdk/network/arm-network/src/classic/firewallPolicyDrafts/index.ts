// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { $delete, createOrUpdate, get } from "../../api/firewallPolicyDrafts/operations.js";
import type {
  FirewallPolicyDraftsDeleteOptionalParams,
  FirewallPolicyDraftsCreateOrUpdateOptionalParams,
  FirewallPolicyDraftsGetOptionalParams,
} from "../../api/firewallPolicyDrafts/options.js";
import type { FirewallPolicyDraft } from "../../models/microsoft/network/models.js";

/** Interface representing a FirewallPolicyDrafts operations. */
export interface FirewallPolicyDraftsOperations {
  /** Delete a draft policy. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    firewallPolicyName: string,
    options?: FirewallPolicyDraftsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a draft Firewall Policy. */
  createOrUpdate: (
    resourceGroupName: string,
    firewallPolicyName: string,
    parameters: FirewallPolicyDraft,
    options?: FirewallPolicyDraftsCreateOrUpdateOptionalParams,
  ) => Promise<FirewallPolicyDraft>;
  /** Get a draft Firewall Policy. */
  get: (
    resourceGroupName: string,
    firewallPolicyName: string,
    options?: FirewallPolicyDraftsGetOptionalParams,
  ) => Promise<FirewallPolicyDraft>;
}

function _getFirewallPolicyDrafts(context: NetworkManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      firewallPolicyName: string,
      options?: FirewallPolicyDraftsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, firewallPolicyName, options),
    createOrUpdate: (
      resourceGroupName: string,
      firewallPolicyName: string,
      parameters: FirewallPolicyDraft,
      options?: FirewallPolicyDraftsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, firewallPolicyName, parameters, options),
    get: (
      resourceGroupName: string,
      firewallPolicyName: string,
      options?: FirewallPolicyDraftsGetOptionalParams,
    ) => get(context, resourceGroupName, firewallPolicyName, options),
  };
}

export function _getFirewallPolicyDraftsOperations(
  context: NetworkManagementContext,
): FirewallPolicyDraftsOperations {
  return {
    ..._getFirewallPolicyDrafts(context),
  };
}
