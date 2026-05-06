// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { post } from "../../api/outboundRules/operations.js";
import { OutboundRulesPostOptionalParams } from "../../api/outboundRules/options.js";
import {
  OutboundRuleBasicResource,
  ManagedNetworkSettingsBasicResource,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a OutboundRules operations. */
export interface OutboundRulesOperations {
  /** The POST API for updating the outbound rules of the managed network associated with the cognitive services account. */
  post: (
    resourceGroupName: string,
    accountName: string,
    managedNetworkName: string,
    body: ManagedNetworkSettingsBasicResource,
    options?: OutboundRulesPostOptionalParams,
  ) => PagedAsyncIterableIterator<OutboundRuleBasicResource>;
  /** @deprecated use post instead */
  beginListPostAndWait: (
    resourceGroupName: string,
    accountName: string,
    managedNetworkName: string,
    body: ManagedNetworkSettingsBasicResource,
    options?: OutboundRulesPostOptionalParams,
  ) => PagedAsyncIterableIterator<OutboundRuleBasicResource>;
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
    beginListPostAndWait: (
      resourceGroupName: string,
      accountName: string,
      managedNetworkName: string,
      body: ManagedNetworkSettingsBasicResource,
      options?: OutboundRulesPostOptionalParams,
    ) => {
      return post(context, resourceGroupName, accountName, managedNetworkName, body, options);
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
