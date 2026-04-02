// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  listAll,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/webApplicationFirewallPolicies/operations.js";
import type {
  WebApplicationFirewallPoliciesListAllOptionalParams,
  WebApplicationFirewallPoliciesListOptionalParams,
  WebApplicationFirewallPoliciesDeleteOptionalParams,
  WebApplicationFirewallPoliciesCreateOrUpdateOptionalParams,
  WebApplicationFirewallPoliciesGetOptionalParams,
} from "../../api/webApplicationFirewallPolicies/options.js";
import type { WebApplicationFirewallPolicy } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a WebApplicationFirewallPolicies operations. */
export interface WebApplicationFirewallPoliciesOperations {
  /** Gets all the WAF policies in a subscription. */
  listAll: (
    options?: WebApplicationFirewallPoliciesListAllOptionalParams,
  ) => PagedAsyncIterableIterator<WebApplicationFirewallPolicy>;
  /** Lists all of the protection policies within a resource group. */
  list: (
    resourceGroupName: string,
    options?: WebApplicationFirewallPoliciesListOptionalParams,
  ) => PagedAsyncIterableIterator<WebApplicationFirewallPolicy>;
  /** Deletes Policy. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    policyName: string,
    options?: WebApplicationFirewallPoliciesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    policyName: string,
    options?: WebApplicationFirewallPoliciesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    policyName: string,
    options?: WebApplicationFirewallPoliciesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or update policy with specified rule set name within a resource group. */
  createOrUpdate: (
    resourceGroupName: string,
    policyName: string,
    parameters: WebApplicationFirewallPolicy,
    options?: WebApplicationFirewallPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<WebApplicationFirewallPolicy>;
  /** Retrieve protection policy with specified name within a resource group. */
  get: (
    resourceGroupName: string,
    policyName: string,
    options?: WebApplicationFirewallPoliciesGetOptionalParams,
  ) => Promise<WebApplicationFirewallPolicy>;
}

function _getWebApplicationFirewallPolicies(context: NetworkManagementContext) {
  return {
    listAll: (options?: WebApplicationFirewallPoliciesListAllOptionalParams) =>
      listAll(context, options),
    list: (resourceGroupName: string, options?: WebApplicationFirewallPoliciesListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      policyName: string,
      options?: WebApplicationFirewallPoliciesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, policyName, options),
    beginDelete: async (
      resourceGroupName: string,
      policyName: string,
      options?: WebApplicationFirewallPoliciesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, policyName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      policyName: string,
      options?: WebApplicationFirewallPoliciesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, policyName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      policyName: string,
      parameters: WebApplicationFirewallPolicy,
      options?: WebApplicationFirewallPoliciesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, policyName, parameters, options),
    get: (
      resourceGroupName: string,
      policyName: string,
      options?: WebApplicationFirewallPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, policyName, options),
  };
}

export function _getWebApplicationFirewallPoliciesOperations(
  context: NetworkManagementContext,
): WebApplicationFirewallPoliciesOperations {
  return {
    ..._getWebApplicationFirewallPolicies(context),
  };
}
