// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DnsResolverManagementContext } from "../../api/dnsResolverManagementContext.js";
import {
  listByVirtualNetwork,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/dnsForwardingRulesets/operations.js";
import type {
  DnsForwardingRulesetsListByVirtualNetworkOptionalParams,
  DnsForwardingRulesetsListOptionalParams,
  DnsForwardingRulesetsListByResourceGroupOptionalParams,
  DnsForwardingRulesetsDeleteOptionalParams,
  DnsForwardingRulesetsUpdateOptionalParams,
  DnsForwardingRulesetsCreateOrUpdateOptionalParams,
  DnsForwardingRulesetsGetOptionalParams,
} from "../../api/dnsForwardingRulesets/options.js";
import type {
  DnsForwardingRuleset,
  DnsForwardingRulesetPatch,
  VirtualNetworkDnsForwardingRuleset,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DnsForwardingRulesets operations. */
export interface DnsForwardingRulesetsOperations {
  /** Lists DNS forwarding ruleset resource IDs attached to a virtual network. */
  listByVirtualNetwork: (
    resourceGroupName: string,
    virtualNetworkName: string,
    options?: DnsForwardingRulesetsListByVirtualNetworkOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualNetworkDnsForwardingRuleset>;
  /** Lists DNS forwarding rulesets in all resource groups of a subscription. */
  list: (
    options?: DnsForwardingRulesetsListOptionalParams,
  ) => PagedAsyncIterableIterator<DnsForwardingRuleset>;
  /** Lists DNS forwarding rulesets within a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: DnsForwardingRulesetsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DnsForwardingRuleset>;
  /** Deletes a DNS forwarding ruleset. WARNING: This operation cannot be undone. All forwarding rules within the ruleset will be deleted. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    dnsForwardingRulesetName: string,
    options?: DnsForwardingRulesetsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a DNS forwarding ruleset. */
  update: (
    resourceGroupName: string,
    dnsForwardingRulesetName: string,
    parameters: DnsForwardingRulesetPatch,
    options?: DnsForwardingRulesetsUpdateOptionalParams,
  ) => PollerLike<OperationState<DnsForwardingRuleset>, DnsForwardingRuleset>;
  /** Creates or updates a DNS forwarding ruleset. */
  createOrUpdate: (
    resourceGroupName: string,
    dnsForwardingRulesetName: string,
    parameters: DnsForwardingRuleset,
    options?: DnsForwardingRulesetsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DnsForwardingRuleset>, DnsForwardingRuleset>;
  /** Gets a DNS forwarding ruleset properties. */
  get: (
    resourceGroupName: string,
    dnsForwardingRulesetName: string,
    options?: DnsForwardingRulesetsGetOptionalParams,
  ) => Promise<DnsForwardingRuleset>;
}

function _getDnsForwardingRulesets(context: DnsResolverManagementContext) {
  return {
    listByVirtualNetwork: (
      resourceGroupName: string,
      virtualNetworkName: string,
      options?: DnsForwardingRulesetsListByVirtualNetworkOptionalParams,
    ) => listByVirtualNetwork(context, resourceGroupName, virtualNetworkName, options),
    list: (options?: DnsForwardingRulesetsListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: DnsForwardingRulesetsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      dnsForwardingRulesetName: string,
      options?: DnsForwardingRulesetsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, dnsForwardingRulesetName, options),
    update: (
      resourceGroupName: string,
      dnsForwardingRulesetName: string,
      parameters: DnsForwardingRulesetPatch,
      options?: DnsForwardingRulesetsUpdateOptionalParams,
    ) => update(context, resourceGroupName, dnsForwardingRulesetName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      dnsForwardingRulesetName: string,
      parameters: DnsForwardingRuleset,
      options?: DnsForwardingRulesetsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, dnsForwardingRulesetName, parameters, options),
    get: (
      resourceGroupName: string,
      dnsForwardingRulesetName: string,
      options?: DnsForwardingRulesetsGetOptionalParams,
    ) => get(context, resourceGroupName, dnsForwardingRulesetName, options),
  };
}

export function _getDnsForwardingRulesetsOperations(
  context: DnsResolverManagementContext,
): DnsForwardingRulesetsOperations {
  return {
    ..._getDnsForwardingRulesets(context),
  };
}
