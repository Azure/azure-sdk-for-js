// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/inboundNatRules/operations.js";
import type {
  InboundNatRulesListOptionalParams,
  InboundNatRulesDeleteOptionalParams,
  InboundNatRulesCreateOrUpdateOptionalParams,
  InboundNatRulesGetOptionalParams,
} from "../../api/inboundNatRules/options.js";
import type { InboundNatRule } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a InboundNatRules operations. */
export interface InboundNatRulesOperations {
  /** Gets all the inbound NAT rules in a load balancer. */
  list: (
    resourceGroupName: string,
    loadBalancerName: string,
    options?: InboundNatRulesListOptionalParams,
  ) => PagedAsyncIterableIterator<InboundNatRule>;
  /** Deletes the specified load balancer inbound NAT rule. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    loadBalancerName: string,
    inboundNatRuleName: string,
    options?: InboundNatRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    loadBalancerName: string,
    inboundNatRuleName: string,
    options?: InboundNatRulesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    loadBalancerName: string,
    inboundNatRuleName: string,
    options?: InboundNatRulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a load balancer inbound NAT rule. */
  createOrUpdate: (
    resourceGroupName: string,
    loadBalancerName: string,
    inboundNatRuleName: string,
    inboundNatRuleParameters: InboundNatRule,
    options?: InboundNatRulesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<InboundNatRule>, InboundNatRule>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    loadBalancerName: string,
    inboundNatRuleName: string,
    inboundNatRuleParameters: InboundNatRule,
    options?: InboundNatRulesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<InboundNatRule>, InboundNatRule>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    loadBalancerName: string,
    inboundNatRuleName: string,
    inboundNatRuleParameters: InboundNatRule,
    options?: InboundNatRulesCreateOrUpdateOptionalParams,
  ) => Promise<InboundNatRule>;
  /** Gets the specified load balancer inbound NAT rule. */
  get: (
    resourceGroupName: string,
    loadBalancerName: string,
    inboundNatRuleName: string,
    options?: InboundNatRulesGetOptionalParams,
  ) => Promise<InboundNatRule>;
}

function _getInboundNatRules(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      loadBalancerName: string,
      options?: InboundNatRulesListOptionalParams,
    ) => list(context, resourceGroupName, loadBalancerName, options),
    delete: (
      resourceGroupName: string,
      loadBalancerName: string,
      inboundNatRuleName: string,
      options?: InboundNatRulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, loadBalancerName, inboundNatRuleName, options),
    beginDelete: async (
      resourceGroupName: string,
      loadBalancerName: string,
      inboundNatRuleName: string,
      options?: InboundNatRulesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        loadBalancerName,
        inboundNatRuleName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      loadBalancerName: string,
      inboundNatRuleName: string,
      options?: InboundNatRulesDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        loadBalancerName,
        inboundNatRuleName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      loadBalancerName: string,
      inboundNatRuleName: string,
      inboundNatRuleParameters: InboundNatRule,
      options?: InboundNatRulesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        loadBalancerName,
        inboundNatRuleName,
        inboundNatRuleParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      loadBalancerName: string,
      inboundNatRuleName: string,
      inboundNatRuleParameters: InboundNatRule,
      options?: InboundNatRulesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        loadBalancerName,
        inboundNatRuleName,
        inboundNatRuleParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      loadBalancerName: string,
      inboundNatRuleName: string,
      inboundNatRuleParameters: InboundNatRule,
      options?: InboundNatRulesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        loadBalancerName,
        inboundNatRuleName,
        inboundNatRuleParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      loadBalancerName: string,
      inboundNatRuleName: string,
      options?: InboundNatRulesGetOptionalParams,
    ) => get(context, resourceGroupName, loadBalancerName, inboundNatRuleName, options),
  };
}

export function _getInboundNatRulesOperations(
  context: NetworkManagementContext,
): InboundNatRulesOperations {
  return {
    ..._getInboundNatRules(context),
  };
}
