// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { post } from "../../api/outboundRules/operations.js";
import type { OutboundRulesPostOptionalParams } from "../../api/outboundRules/options.js";
import type {
  _OutboundRuleListResult,
  ManagedNetworkSettingsBasicResource,
} from "../../models/models.js";
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
  };
}

export function _getOutboundRulesOperations(
  context: CognitiveServicesManagementContext,
): OutboundRulesOperations {
  return {
    ..._getOutboundRules(context),
  };
}
