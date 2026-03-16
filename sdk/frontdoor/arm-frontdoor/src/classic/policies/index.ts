// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FrontDoorManagementContext } from "../../api/frontDoorManagementContext.js";
import {
  listBySubscription,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/policies/operations.js";
import type {
  PoliciesListBySubscriptionOptionalParams,
  PoliciesListOptionalParams,
  PoliciesDeleteOptionalParams,
  PoliciesUpdateOptionalParams,
  PoliciesCreateOrUpdateOptionalParams,
  PoliciesGetOptionalParams,
} from "../../api/policies/options.js";
import type { WebApplicationFirewallPolicy, TagsObject } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Policies operations. */
export interface PoliciesOperations {
  /** Lists all of the protection policies within a subscription. */
  listBySubscription: (
    options?: PoliciesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<WebApplicationFirewallPolicy>;
  /** Lists all of the protection policies within a resource group. */
  list: (
    resourceGroupName: string,
    options?: PoliciesListOptionalParams,
  ) => PagedAsyncIterableIterator<WebApplicationFirewallPolicy>;
  /** Deletes Policy */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    policyName: string,
    options?: PoliciesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    policyName: string,
    options?: PoliciesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    policyName: string,
    options?: PoliciesDeleteOptionalParams,
  ) => Promise<void>;
  /** Patch a specific frontdoor webApplicationFirewall policy for tags update under the specified subscription and resource group. */
  update: (
    resourceGroupName: string,
    policyName: string,
    parameters: TagsObject,
    options?: PoliciesUpdateOptionalParams,
  ) => PollerLike<OperationState<WebApplicationFirewallPolicy>, WebApplicationFirewallPolicy>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    policyName: string,
    parameters: TagsObject,
    options?: PoliciesUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<WebApplicationFirewallPolicy>, WebApplicationFirewallPolicy>
  >;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    policyName: string,
    parameters: TagsObject,
    options?: PoliciesUpdateOptionalParams,
  ) => Promise<WebApplicationFirewallPolicy>;
  /** Create or update policy with specified rule set name within a resource group. */
  createOrUpdate: (
    resourceGroupName: string,
    policyName: string,
    parameters: WebApplicationFirewallPolicy,
    options?: PoliciesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<WebApplicationFirewallPolicy>, WebApplicationFirewallPolicy>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    policyName: string,
    parameters: WebApplicationFirewallPolicy,
    options?: PoliciesCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<WebApplicationFirewallPolicy>, WebApplicationFirewallPolicy>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    policyName: string,
    parameters: WebApplicationFirewallPolicy,
    options?: PoliciesCreateOrUpdateOptionalParams,
  ) => Promise<WebApplicationFirewallPolicy>;
  /** Retrieve protection policy with specified name within a resource group. */
  get: (
    resourceGroupName: string,
    policyName: string,
    options?: PoliciesGetOptionalParams,
  ) => Promise<WebApplicationFirewallPolicy>;
}

function _getPolicies(context: FrontDoorManagementContext) {
  return {
    listBySubscription: (options?: PoliciesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    list: (resourceGroupName: string, options?: PoliciesListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      policyName: string,
      options?: PoliciesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, policyName, options),
    beginDelete: async (
      resourceGroupName: string,
      policyName: string,
      options?: PoliciesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, policyName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      policyName: string,
      options?: PoliciesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, policyName, options);
    },
    update: (
      resourceGroupName: string,
      policyName: string,
      parameters: TagsObject,
      options?: PoliciesUpdateOptionalParams,
    ) => update(context, resourceGroupName, policyName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      policyName: string,
      parameters: TagsObject,
      options?: PoliciesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, policyName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      policyName: string,
      parameters: TagsObject,
      options?: PoliciesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, policyName, parameters, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      policyName: string,
      parameters: WebApplicationFirewallPolicy,
      options?: PoliciesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, policyName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      policyName: string,
      parameters: WebApplicationFirewallPolicy,
      options?: PoliciesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, policyName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      policyName: string,
      parameters: WebApplicationFirewallPolicy,
      options?: PoliciesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, policyName, parameters, options);
    },
    get: (resourceGroupName: string, policyName: string, options?: PoliciesGetOptionalParams) =>
      get(context, resourceGroupName, policyName, options),
  };
}

export function _getPoliciesOperations(context: FrontDoorManagementContext): PoliciesOperations {
  return {
    ..._getPolicies(context),
  };
}
