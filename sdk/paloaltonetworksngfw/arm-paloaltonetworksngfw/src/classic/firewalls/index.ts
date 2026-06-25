// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfwContext } from "../../api/paloAltoNetworksCloudngfwContext.js";
import {
  saveLogProfile,
  getSupportInfo,
  getLogProfile,
  getGlobalRulestack,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/firewalls/operations.js";
import {
  FirewallsSaveLogProfileOptionalParams,
  FirewallsGetSupportInfoOptionalParams,
  FirewallsGetLogProfileOptionalParams,
  FirewallsGetGlobalRulestackOptionalParams,
  FirewallsListBySubscriptionOptionalParams,
  FirewallsListByResourceGroupOptionalParams,
  FirewallsDeleteOptionalParams,
  FirewallsUpdateOptionalParams,
  FirewallsCreateOrUpdateOptionalParams,
  FirewallsGetOptionalParams,
} from "../../api/firewalls/options.js";
import {
  FirewallResource,
  FirewallResourceUpdate,
  GlobalRulestackInfo,
  LogSettings,
  SupportInfo,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Firewalls operations. */
export interface FirewallsOperations {
  /** Log Profile for Firewall */
  saveLogProfile: (
    resourceGroupName: string,
    firewallName: string,
    options?: FirewallsSaveLogProfileOptionalParams,
  ) => Promise<void>;
  /** support info for firewall. */
  getSupportInfo: (
    resourceGroupName: string,
    firewallName: string,
    options?: FirewallsGetSupportInfoOptionalParams,
  ) => Promise<SupportInfo>;
  /** Log Profile for Firewall */
  getLogProfile: (
    resourceGroupName: string,
    firewallName: string,
    options?: FirewallsGetLogProfileOptionalParams,
  ) => Promise<LogSettings>;
  /** Get Global Rulestack associated with the Firewall */
  getGlobalRulestack: (
    resourceGroupName: string,
    firewallName: string,
    options?: FirewallsGetGlobalRulestackOptionalParams,
  ) => Promise<GlobalRulestackInfo>;
  /** List FirewallResource resources by subscription ID */
  listBySubscription: (
    options?: FirewallsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<FirewallResource>;
  /** List FirewallResource resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: FirewallsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<FirewallResource>;
  /** Delete a FirewallResource */
  delete: (
    resourceGroupName: string,
    firewallName: string,
    options?: FirewallsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    firewallName: string,
    options?: FirewallsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    firewallName: string,
    options?: FirewallsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a FirewallResource */
  update: (
    resourceGroupName: string,
    firewallName: string,
    properties: FirewallResourceUpdate,
    options?: FirewallsUpdateOptionalParams,
  ) => Promise<FirewallResource>;
  /** Create a FirewallResource */
  createOrUpdate: (
    resourceGroupName: string,
    firewallName: string,
    resource: FirewallResource,
    options?: FirewallsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<FirewallResource>, FirewallResource>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    firewallName: string,
    resource: FirewallResource,
    options?: FirewallsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<FirewallResource>, FirewallResource>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    firewallName: string,
    resource: FirewallResource,
    options?: FirewallsCreateOrUpdateOptionalParams,
  ) => Promise<FirewallResource>;
  /** Get a FirewallResource */
  get: (
    resourceGroupName: string,
    firewallName: string,
    options?: FirewallsGetOptionalParams,
  ) => Promise<FirewallResource>;
}

function _getFirewalls(context: PaloAltoNetworksCloudngfwContext) {
  return {
    saveLogProfile: (
      resourceGroupName: string,
      firewallName: string,
      options?: FirewallsSaveLogProfileOptionalParams,
    ) => saveLogProfile(context, resourceGroupName, firewallName, options),
    getSupportInfo: (
      resourceGroupName: string,
      firewallName: string,
      options?: FirewallsGetSupportInfoOptionalParams,
    ) => getSupportInfo(context, resourceGroupName, firewallName, options),
    getLogProfile: (
      resourceGroupName: string,
      firewallName: string,
      options?: FirewallsGetLogProfileOptionalParams,
    ) => getLogProfile(context, resourceGroupName, firewallName, options),
    getGlobalRulestack: (
      resourceGroupName: string,
      firewallName: string,
      options?: FirewallsGetGlobalRulestackOptionalParams,
    ) => getGlobalRulestack(context, resourceGroupName, firewallName, options),
    listBySubscription: (options?: FirewallsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: FirewallsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      firewallName: string,
      options?: FirewallsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, firewallName, options),
    beginDelete: async (
      resourceGroupName: string,
      firewallName: string,
      options?: FirewallsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, firewallName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      firewallName: string,
      options?: FirewallsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, firewallName, options);
    },
    update: (
      resourceGroupName: string,
      firewallName: string,
      properties: FirewallResourceUpdate,
      options?: FirewallsUpdateOptionalParams,
    ) => update(context, resourceGroupName, firewallName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      firewallName: string,
      resource: FirewallResource,
      options?: FirewallsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, firewallName, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      firewallName: string,
      resource: FirewallResource,
      options?: FirewallsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, firewallName, resource, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      firewallName: string,
      resource: FirewallResource,
      options?: FirewallsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, firewallName, resource, options);
    },
    get: (resourceGroupName: string, firewallName: string, options?: FirewallsGetOptionalParams) =>
      get(context, resourceGroupName, firewallName, options),
  };
}

export function _getFirewallsOperations(
  context: PaloAltoNetworksCloudngfwContext,
): FirewallsOperations {
  return {
    ..._getFirewalls(context),
  };
}
