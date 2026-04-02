// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { createOrUpdate, get } from "../../api/inboundSecurityRule/operations.js";
import type {
  InboundSecurityRuleCreateOrUpdateOptionalParams,
  InboundSecurityRuleGetOptionalParams,
} from "../../api/inboundSecurityRule/options.js";
import type { InboundSecurityRule } from "../../models/microsoft/network/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a InboundSecurityRule operations. */
export interface InboundSecurityRuleOperations {
  /** Creates or updates the specified Network Virtual Appliance Inbound Security Rules. */
  createOrUpdate: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    ruleCollectionName: string,
    parameters: InboundSecurityRule,
    options?: InboundSecurityRuleCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<InboundSecurityRule>, InboundSecurityRule>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    ruleCollectionName: string,
    parameters: InboundSecurityRule,
    options?: InboundSecurityRuleCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<InboundSecurityRule>, InboundSecurityRule>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    ruleCollectionName: string,
    parameters: InboundSecurityRule,
    options?: InboundSecurityRuleCreateOrUpdateOptionalParams,
  ) => Promise<InboundSecurityRule>;
  /** Retrieves the available specified Network Virtual Appliance Inbound Security Rules Collection. */
  get: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    ruleCollectionName: string,
    options?: InboundSecurityRuleGetOptionalParams,
  ) => Promise<InboundSecurityRule>;
}

function _getInboundSecurityRule(context: NetworkManagementContext) {
  return {
    createOrUpdate: (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      ruleCollectionName: string,
      parameters: InboundSecurityRule,
      options?: InboundSecurityRuleCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        networkVirtualApplianceName,
        ruleCollectionName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      ruleCollectionName: string,
      parameters: InboundSecurityRule,
      options?: InboundSecurityRuleCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        networkVirtualApplianceName,
        ruleCollectionName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      ruleCollectionName: string,
      parameters: InboundSecurityRule,
      options?: InboundSecurityRuleCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        networkVirtualApplianceName,
        ruleCollectionName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      ruleCollectionName: string,
      options?: InboundSecurityRuleGetOptionalParams,
    ) => get(context, resourceGroupName, networkVirtualApplianceName, ruleCollectionName, options),
  };
}

export function _getInboundSecurityRuleOperations(
  context: NetworkManagementContext,
): InboundSecurityRuleOperations {
  return {
    ..._getInboundSecurityRule(context),
  };
}
