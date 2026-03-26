// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  listAll,
  list,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/firewallPolicies/operations.js";
import type {
  FirewallPoliciesListAllOptionalParams,
  FirewallPoliciesListOptionalParams,
  FirewallPoliciesDeleteOptionalParams,
  FirewallPoliciesUpdateTagsOptionalParams,
  FirewallPoliciesCreateOrUpdateOptionalParams,
  FirewallPoliciesGetOptionalParams,
} from "../../api/firewallPolicies/options.js";
import type { TagsObject, FirewallPolicy } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FirewallPolicies operations. */
export interface FirewallPoliciesOperations {
  /** Gets all the Firewall Policies in a subscription. */
  listAll: (
    options?: FirewallPoliciesListAllOptionalParams,
  ) => PagedAsyncIterableIterator<FirewallPolicy>;
  /** Lists all Firewall Policies in a resource group. */
  list: (
    resourceGroupName: string,
    options?: FirewallPoliciesListOptionalParams,
  ) => PagedAsyncIterableIterator<FirewallPolicy>;
  /** Deletes the specified Firewall Policy. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    firewallPolicyName: string,
    options?: FirewallPoliciesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    firewallPolicyName: string,
    options?: FirewallPoliciesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    firewallPolicyName: string,
    options?: FirewallPoliciesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates tags of a Azure Firewall Policy resource. */
  updateTags: (
    resourceGroupName: string,
    firewallPolicyName: string,
    parameters: TagsObject,
    options?: FirewallPoliciesUpdateTagsOptionalParams,
  ) => Promise<FirewallPolicy>;
  /** Creates or updates the specified Firewall Policy. */
  createOrUpdate: (
    resourceGroupName: string,
    firewallPolicyName: string,
    parameters: FirewallPolicy,
    options?: FirewallPoliciesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<FirewallPolicy>, FirewallPolicy>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    firewallPolicyName: string,
    parameters: FirewallPolicy,
    options?: FirewallPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<FirewallPolicy>, FirewallPolicy>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    firewallPolicyName: string,
    parameters: FirewallPolicy,
    options?: FirewallPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<FirewallPolicy>;
  /** Gets the specified Firewall Policy. */
  get: (
    resourceGroupName: string,
    firewallPolicyName: string,
    options?: FirewallPoliciesGetOptionalParams,
  ) => Promise<FirewallPolicy>;
}

function _getFirewallPolicies(context: NetworkManagementContext) {
  return {
    listAll: (options?: FirewallPoliciesListAllOptionalParams) => listAll(context, options),
    list: (resourceGroupName: string, options?: FirewallPoliciesListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      firewallPolicyName: string,
      options?: FirewallPoliciesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, firewallPolicyName, options),
    beginDelete: async (
      resourceGroupName: string,
      firewallPolicyName: string,
      options?: FirewallPoliciesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, firewallPolicyName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      firewallPolicyName: string,
      options?: FirewallPoliciesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, firewallPolicyName, options);
    },
    updateTags: (
      resourceGroupName: string,
      firewallPolicyName: string,
      parameters: TagsObject,
      options?: FirewallPoliciesUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, firewallPolicyName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      firewallPolicyName: string,
      parameters: FirewallPolicy,
      options?: FirewallPoliciesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, firewallPolicyName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      firewallPolicyName: string,
      parameters: FirewallPolicy,
      options?: FirewallPoliciesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        firewallPolicyName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      firewallPolicyName: string,
      parameters: FirewallPolicy,
      options?: FirewallPoliciesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        firewallPolicyName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      firewallPolicyName: string,
      options?: FirewallPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, firewallPolicyName, options),
  };
}

export function _getFirewallPoliciesOperations(
  context: NetworkManagementContext,
): FirewallPoliciesOperations {
  return {
    ..._getFirewallPolicies(context),
  };
}
