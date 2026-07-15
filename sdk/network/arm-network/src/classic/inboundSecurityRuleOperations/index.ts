// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { createOrUpdate, get } from "../../api/inboundSecurityRuleOperations/operations.js";
import type {
  InboundSecurityRuleOperationsCreateOrUpdateOptionalParams,
  InboundSecurityRuleOperationsGetOptionalParams,
} from "../../api/inboundSecurityRuleOperations/options.js";
import type { InboundSecurityRule } from "../../models/microsoft/network/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a InboundSecurityRuleOperations operations. */
export interface InboundSecurityRuleOperationsOperations {
  /** Creates or updates the specified Network Virtual Appliance Inbound Security Rules. */
  createOrUpdate: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    ruleCollectionName: string,
    parameters: InboundSecurityRule,
    options?: InboundSecurityRuleOperationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<InboundSecurityRule>, InboundSecurityRule>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    ruleCollectionName: string,
    parameters: InboundSecurityRule,
    options?: InboundSecurityRuleOperationsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<InboundSecurityRule>, InboundSecurityRule>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    ruleCollectionName: string,
    parameters: InboundSecurityRule,
    options?: InboundSecurityRuleOperationsCreateOrUpdateOptionalParams,
  ) => Promise<InboundSecurityRule>;
  /** Retrieves the available specified Network Virtual Appliance Inbound Security Rules Collection. */
  get: (
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    ruleCollectionName: string,
    options?: InboundSecurityRuleOperationsGetOptionalParams,
  ) => Promise<InboundSecurityRule>;
}

function _getInboundSecurityRuleOperations(context: NetworkManagementContext) {
  return {
    createOrUpdate: (
      resourceGroupName: string,
      networkVirtualApplianceName: string,
      ruleCollectionName: string,
      parameters: InboundSecurityRule,
      options?: InboundSecurityRuleOperationsCreateOrUpdateOptionalParams,
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
      options?: InboundSecurityRuleOperationsCreateOrUpdateOptionalParams,
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
      options?: InboundSecurityRuleOperationsCreateOrUpdateOptionalParams,
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
      options?: InboundSecurityRuleOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, networkVirtualApplianceName, ruleCollectionName, options),
  };
}

export function _getInboundSecurityRuleOperationsOperations(
  context: NetworkManagementContext,
): InboundSecurityRuleOperationsOperations {
  return {
    ..._getInboundSecurityRuleOperations(context),
  };
}
