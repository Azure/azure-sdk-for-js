// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { post } from "../../api/outboundRules/operations.js";
import type { OutboundRulesPostOptionalParams } from "../../api/outboundRules/options.js";
import type {
  _OutboundRuleListResult,
  ManagedNetworkSettingsBasicResource,
} from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a OutboundRules operations. */
export interface OutboundRulesOperations {
  /** The POST API for updating the outbound rules of the managed network associated with the cognitive services account. */
  post: (
    resourceGroupName: string,
    accountName: string,
    managedNetworkName: string,
    body: ManagedNetworkSettingsBasicResource,
    options?: OutboundRulesPostOptionalParams,
  ) => PollerLike<OperationState<_OutboundRuleListResult>, _OutboundRuleListResult>;
  /** @deprecated use post instead */
  beginPost: (
    resourceGroupName: string,
    accountName: string,
    managedNetworkName: string,
    body: ManagedNetworkSettingsBasicResource,
    options?: OutboundRulesPostOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<_OutboundRuleListResult>, _OutboundRuleListResult>>;
  /** @deprecated use post instead */
  beginPostAndWait: (
    resourceGroupName: string,
    accountName: string,
    managedNetworkName: string,
    body: ManagedNetworkSettingsBasicResource,
    options?: OutboundRulesPostOptionalParams,
  ) => Promise<_OutboundRuleListResult>;
}

function _getOutboundRules(context: CognitiveServicesManagementContext) {
  return {
    post: (
      resourceGroupName: string,
      accountName: string,
      managedNetworkName: string,
      body: ManagedNetworkSettingsBasicResource,
      options?: OutboundRulesPostOptionalParams,
    ) => post(context, resourceGroupName, accountName, managedNetworkName, body, options),
    beginPost: async (
      resourceGroupName: string,
      accountName: string,
      managedNetworkName: string,
      body: ManagedNetworkSettingsBasicResource,
      options?: OutboundRulesPostOptionalParams,
    ) => {
      const poller = post(
        context,
        resourceGroupName,
        accountName,
        managedNetworkName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPostAndWait: async (
      resourceGroupName: string,
      accountName: string,
      managedNetworkName: string,
      body: ManagedNetworkSettingsBasicResource,
      options?: OutboundRulesPostOptionalParams,
    ) => {
      return await post(context, resourceGroupName, accountName, managedNetworkName, body, options);
    },
  };
}

export function _getOutboundRulesOperations(
  context: CognitiveServicesManagementContext,
): OutboundRulesOperations {
  return {
    ..._getOutboundRules(context),
  };
}
