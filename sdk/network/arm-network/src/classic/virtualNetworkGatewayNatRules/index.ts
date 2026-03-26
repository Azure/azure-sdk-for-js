// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  listByVirtualNetworkGateway,
  $delete,
  createOrUpdate,
  get,
} from "../../api/virtualNetworkGatewayNatRules/operations.js";
import type {
  VirtualNetworkGatewayNatRulesListByVirtualNetworkGatewayOptionalParams,
  VirtualNetworkGatewayNatRulesDeleteOptionalParams,
  VirtualNetworkGatewayNatRulesCreateOrUpdateOptionalParams,
  VirtualNetworkGatewayNatRulesGetOptionalParams,
} from "../../api/virtualNetworkGatewayNatRules/options.js";
import type { VirtualNetworkGatewayNatRule } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualNetworkGatewayNatRules operations. */
export interface VirtualNetworkGatewayNatRulesOperations {
  /** Retrieves all nat rules for a particular virtual network gateway. */
  listByVirtualNetworkGateway: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewayNatRulesListByVirtualNetworkGatewayOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualNetworkGatewayNatRule>;
  /** Deletes a nat rule. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    natRuleName: string,
    options?: VirtualNetworkGatewayNatRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    natRuleName: string,
    options?: VirtualNetworkGatewayNatRulesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    natRuleName: string,
    options?: VirtualNetworkGatewayNatRulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a nat rule to a scalable virtual network gateway if it doesn't exist else updates the existing nat rules. */
  createOrUpdate: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    natRuleName: string,
    natRuleParameters: VirtualNetworkGatewayNatRule,
    options?: VirtualNetworkGatewayNatRulesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualNetworkGatewayNatRule>, VirtualNetworkGatewayNatRule>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    natRuleName: string,
    natRuleParameters: VirtualNetworkGatewayNatRule,
    options?: VirtualNetworkGatewayNatRulesCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<VirtualNetworkGatewayNatRule>, VirtualNetworkGatewayNatRule>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    natRuleName: string,
    natRuleParameters: VirtualNetworkGatewayNatRule,
    options?: VirtualNetworkGatewayNatRulesCreateOrUpdateOptionalParams,
  ) => Promise<VirtualNetworkGatewayNatRule>;
  /** Retrieves the details of a nat rule. */
  get: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    natRuleName: string,
    options?: VirtualNetworkGatewayNatRulesGetOptionalParams,
  ) => Promise<VirtualNetworkGatewayNatRule>;
}

function _getVirtualNetworkGatewayNatRules(context: NetworkManagementContext) {
  return {
    listByVirtualNetworkGateway: (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewayNatRulesListByVirtualNetworkGatewayOptionalParams,
    ) =>
      listByVirtualNetworkGateway(context, resourceGroupName, virtualNetworkGatewayName, options),
    delete: (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      natRuleName: string,
      options?: VirtualNetworkGatewayNatRulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, virtualNetworkGatewayName, natRuleName, options),
    beginDelete: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      natRuleName: string,
      options?: VirtualNetworkGatewayNatRulesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        natRuleName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      natRuleName: string,
      options?: VirtualNetworkGatewayNatRulesDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        natRuleName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      natRuleName: string,
      natRuleParameters: VirtualNetworkGatewayNatRule,
      options?: VirtualNetworkGatewayNatRulesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        natRuleName,
        natRuleParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      natRuleName: string,
      natRuleParameters: VirtualNetworkGatewayNatRule,
      options?: VirtualNetworkGatewayNatRulesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        natRuleName,
        natRuleParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      natRuleName: string,
      natRuleParameters: VirtualNetworkGatewayNatRule,
      options?: VirtualNetworkGatewayNatRulesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        natRuleName,
        natRuleParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      natRuleName: string,
      options?: VirtualNetworkGatewayNatRulesGetOptionalParams,
    ) => get(context, resourceGroupName, virtualNetworkGatewayName, natRuleName, options),
  };
}

export function _getVirtualNetworkGatewayNatRulesOperations(
  context: NetworkManagementContext,
): VirtualNetworkGatewayNatRulesOperations {
  return {
    ..._getVirtualNetworkGatewayNatRules(context),
  };
}
