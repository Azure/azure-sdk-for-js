// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PaloAltoNetworksCloudngfwContext } from "../../api/paloAltoNetworksCloudngfwContext.js";
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
import type {
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
import type {
  FirewallResource,
  FirewallResourceUpdate,
  GlobalRulestackInfo,
  LogSettings,
  SupportInfo,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

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
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    firewallName: string,
    options?: FirewallsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
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
