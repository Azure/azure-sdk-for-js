// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import { post } from "../../api/outboundRules/operations.js";
import type { OutboundRulesPostOptionalParams } from "../../api/outboundRules/options.js";
import type {
  OutboundRuleBasicResource,
  ManagedNetworkSettingsBasicResource,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a OutboundRules operations. */
export interface OutboundRulesOperations {
  /** The POST API for updating the outbound rules of the managed network associated with the machine learning workspace. */
  post: (
    resourceGroupName: string,
    workspaceName: string,
    managedNetworkName: string,
    body: ManagedNetworkSettingsBasicResource,
    options?: OutboundRulesPostOptionalParams,
  ) => PagedAsyncIterableIterator<OutboundRuleBasicResource>;
  /** @deprecated use post instead */
  beginListPostAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    managedNetworkName: string,
    body: ManagedNetworkSettingsBasicResource,
    options?: OutboundRulesPostOptionalParams,
  ) => PagedAsyncIterableIterator<OutboundRuleBasicResource>;
}

function _getOutboundRules(context: AzureMachineLearningServicesManagementContext) {
  return {
    post: (
      resourceGroupName: string,
      workspaceName: string,
      managedNetworkName: string,
      body: ManagedNetworkSettingsBasicResource,
      options?: OutboundRulesPostOptionalParams,
    ) => post(context, resourceGroupName, workspaceName, managedNetworkName, body, options),
    beginListPostAndWait: (
      resourceGroupName: string,
      workspaceName: string,
      managedNetworkName: string,
      body: ManagedNetworkSettingsBasicResource,
      options?: OutboundRulesPostOptionalParams,
    ) => {
      return post(context, resourceGroupName, workspaceName, managedNetworkName, body, options);
    },
  };
}

export function _getOutboundRulesOperations(
  context: AzureMachineLearningServicesManagementContext,
): OutboundRulesOperations {
  return {
    ..._getOutboundRules(context),
  };
}
