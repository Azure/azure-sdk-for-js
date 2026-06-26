// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DnsResolverManagementContext } from "../../api/dnsResolverManagementContext.js";
import {
  listByVirtualNetwork,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/dnsForwardingRulesets/operations.js";
import {
  DnsForwardingRulesetsListByVirtualNetworkOptionalParams,
  DnsForwardingRulesetsListOptionalParams,
  DnsForwardingRulesetsListByResourceGroupOptionalParams,
  DnsForwardingRulesetsDeleteOptionalParams,
  DnsForwardingRulesetsUpdateOptionalParams,
  DnsForwardingRulesetsCreateOrUpdateOptionalParams,
  DnsForwardingRulesetsGetOptionalParams,
} from "../../api/dnsForwardingRulesets/options.js";
import {
  DnsForwardingRuleset,
  DnsForwardingRulesetPatch,
  VirtualNetworkDnsForwardingRuleset,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

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
  delete: (
    resourceGroupName: string,
    dnsForwardingRulesetName: string,
    options?: DnsForwardingRulesetsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    dnsForwardingRulesetName: string,
    options?: DnsForwardingRulesetsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    dnsForwardingRulesetName: string,
    options?: DnsForwardingRulesetsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a DNS forwarding ruleset. */
  update: (
    resourceGroupName: string,
    dnsForwardingRulesetName: string,
    parameters: DnsForwardingRulesetPatch,
    options?: DnsForwardingRulesetsUpdateOptionalParams,
  ) => PollerLike<OperationState<DnsForwardingRuleset>, DnsForwardingRuleset>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    dnsForwardingRulesetName: string,
    parameters: DnsForwardingRulesetPatch,
    options?: DnsForwardingRulesetsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DnsForwardingRuleset>, DnsForwardingRuleset>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    dnsForwardingRulesetName: string,
    parameters: DnsForwardingRulesetPatch,
    options?: DnsForwardingRulesetsUpdateOptionalParams,
  ) => Promise<DnsForwardingRuleset>;
  /** Creates or updates a DNS forwarding ruleset. */
  createOrUpdate: (
    resourceGroupName: string,
    dnsForwardingRulesetName: string,
    parameters: DnsForwardingRuleset,
    options?: DnsForwardingRulesetsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DnsForwardingRuleset>, DnsForwardingRuleset>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    dnsForwardingRulesetName: string,
    parameters: DnsForwardingRuleset,
    options?: DnsForwardingRulesetsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DnsForwardingRuleset>, DnsForwardingRuleset>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    dnsForwardingRulesetName: string,
    parameters: DnsForwardingRuleset,
    options?: DnsForwardingRulesetsCreateOrUpdateOptionalParams,
  ) => Promise<DnsForwardingRuleset>;
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
    beginDelete: async (
      resourceGroupName: string,
      dnsForwardingRulesetName: string,
      options?: DnsForwardingRulesetsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, dnsForwardingRulesetName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      dnsForwardingRulesetName: string,
      options?: DnsForwardingRulesetsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, dnsForwardingRulesetName, options);
    },
    update: (
      resourceGroupName: string,
      dnsForwardingRulesetName: string,
      parameters: DnsForwardingRulesetPatch,
      options?: DnsForwardingRulesetsUpdateOptionalParams,
    ) => update(context, resourceGroupName, dnsForwardingRulesetName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      dnsForwardingRulesetName: string,
      parameters: DnsForwardingRulesetPatch,
      options?: DnsForwardingRulesetsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        dnsForwardingRulesetName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      dnsForwardingRulesetName: string,
      parameters: DnsForwardingRulesetPatch,
      options?: DnsForwardingRulesetsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        dnsForwardingRulesetName,
        parameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      dnsForwardingRulesetName: string,
      parameters: DnsForwardingRuleset,
      options?: DnsForwardingRulesetsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, dnsForwardingRulesetName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      dnsForwardingRulesetName: string,
      parameters: DnsForwardingRuleset,
      options?: DnsForwardingRulesetsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        dnsForwardingRulesetName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      dnsForwardingRulesetName: string,
      parameters: DnsForwardingRuleset,
      options?: DnsForwardingRulesetsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        dnsForwardingRulesetName,
        parameters,
        options,
      );
    },
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
