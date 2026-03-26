// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { listByVpnGateway, $delete, createOrUpdate, get } from "../../api/natRules/operations.js";
import type {
  NatRulesListByVpnGatewayOptionalParams,
  NatRulesDeleteOptionalParams,
  NatRulesCreateOrUpdateOptionalParams,
  NatRulesGetOptionalParams,
} from "../../api/natRules/options.js";
import type { VpnGatewayNatRule } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NatRules operations. */
export interface NatRulesOperations {
  /** Retrieves all nat rules for a particular virtual wan vpn gateway. */
  listByVpnGateway: (
    resourceGroupName: string,
    gatewayName: string,
    options?: NatRulesListByVpnGatewayOptionalParams,
  ) => PagedAsyncIterableIterator<VpnGatewayNatRule>;
  /** Deletes a nat rule. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    gatewayName: string,
    natRuleName: string,
    options?: NatRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    gatewayName: string,
    natRuleName: string,
    options?: NatRulesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    gatewayName: string,
    natRuleName: string,
    options?: NatRulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a nat rule to a scalable vpn gateway if it doesn't exist else updates the existing nat rules. */
  createOrUpdate: (
    resourceGroupName: string,
    gatewayName: string,
    natRuleName: string,
    natRuleParameters: VpnGatewayNatRule,
    options?: NatRulesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VpnGatewayNatRule>, VpnGatewayNatRule>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    gatewayName: string,
    natRuleName: string,
    natRuleParameters: VpnGatewayNatRule,
    options?: NatRulesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VpnGatewayNatRule>, VpnGatewayNatRule>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    gatewayName: string,
    natRuleName: string,
    natRuleParameters: VpnGatewayNatRule,
    options?: NatRulesCreateOrUpdateOptionalParams,
  ) => Promise<VpnGatewayNatRule>;
  /** Retrieves the details of a nat ruleGet. */
  get: (
    resourceGroupName: string,
    gatewayName: string,
    natRuleName: string,
    options?: NatRulesGetOptionalParams,
  ) => Promise<VpnGatewayNatRule>;
}

function _getNatRules(context: NetworkManagementContext) {
  return {
    listByVpnGateway: (
      resourceGroupName: string,
      gatewayName: string,
      options?: NatRulesListByVpnGatewayOptionalParams,
    ) => listByVpnGateway(context, resourceGroupName, gatewayName, options),
    delete: (
      resourceGroupName: string,
      gatewayName: string,
      natRuleName: string,
      options?: NatRulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, gatewayName, natRuleName, options),
    beginDelete: async (
      resourceGroupName: string,
      gatewayName: string,
      natRuleName: string,
      options?: NatRulesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, gatewayName, natRuleName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      gatewayName: string,
      natRuleName: string,
      options?: NatRulesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, gatewayName, natRuleName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      gatewayName: string,
      natRuleName: string,
      natRuleParameters: VpnGatewayNatRule,
      options?: NatRulesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        gatewayName,
        natRuleName,
        natRuleParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      gatewayName: string,
      natRuleName: string,
      natRuleParameters: VpnGatewayNatRule,
      options?: NatRulesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        gatewayName,
        natRuleName,
        natRuleParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      gatewayName: string,
      natRuleName: string,
      natRuleParameters: VpnGatewayNatRule,
      options?: NatRulesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        gatewayName,
        natRuleName,
        natRuleParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      gatewayName: string,
      natRuleName: string,
      options?: NatRulesGetOptionalParams,
    ) => get(context, resourceGroupName, gatewayName, natRuleName, options),
  };
}

export function _getNatRulesOperations(context: NetworkManagementContext): NatRulesOperations {
  return {
    ..._getNatRules(context),
  };
}
