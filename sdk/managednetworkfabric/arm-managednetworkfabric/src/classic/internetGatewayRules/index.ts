// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureNetworkFabricManagementServiceAPIContext } from "../../api/azureNetworkFabricManagementServiceAPIContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/internetGatewayRules/operations.js";
import type {
  InternetGatewayRulesListBySubscriptionOptionalParams,
  InternetGatewayRulesListByResourceGroupOptionalParams,
  InternetGatewayRulesDeleteOptionalParams,
  InternetGatewayRulesUpdateOptionalParams,
  InternetGatewayRulesCreateOptionalParams,
  InternetGatewayRulesGetOptionalParams,
} from "../../api/internetGatewayRules/options.js";
import type { InternetGatewayRule, InternetGatewayRulePatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a InternetGatewayRules operations. */
export interface InternetGatewayRulesOperations {
  /** List all Internet Gateway rules in the given subscription. */
  listBySubscription: (
    options?: InternetGatewayRulesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<InternetGatewayRule>;
  /** Implements Internet Gateway Rules list by resource group GET method. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: InternetGatewayRulesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<InternetGatewayRule>;
  /** Implements Internet Gateway Rules DELETE method. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    internetGatewayRuleName: string,
    options?: InternetGatewayRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    internetGatewayRuleName: string,
    options?: InternetGatewayRulesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    internetGatewayRuleName: string,
    options?: InternetGatewayRulesDeleteOptionalParams,
  ) => Promise<void>;
  /** API to update certain properties of the Internet Gateway Rule resource. */
  update: (
    resourceGroupName: string,
    internetGatewayRuleName: string,
    body: InternetGatewayRulePatch,
    options?: InternetGatewayRulesUpdateOptionalParams,
  ) => PollerLike<OperationState<InternetGatewayRule>, InternetGatewayRule>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    internetGatewayRuleName: string,
    body: InternetGatewayRulePatch,
    options?: InternetGatewayRulesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<InternetGatewayRule>, InternetGatewayRule>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    internetGatewayRuleName: string,
    body: InternetGatewayRulePatch,
    options?: InternetGatewayRulesUpdateOptionalParams,
  ) => Promise<InternetGatewayRule>;
  /** Creates an Internet Gateway rule resource. */
  create: (
    resourceGroupName: string,
    internetGatewayRuleName: string,
    body: InternetGatewayRule,
    options?: InternetGatewayRulesCreateOptionalParams,
  ) => PollerLike<OperationState<InternetGatewayRule>, InternetGatewayRule>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    internetGatewayRuleName: string,
    body: InternetGatewayRule,
    options?: InternetGatewayRulesCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<InternetGatewayRule>, InternetGatewayRule>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    internetGatewayRuleName: string,
    body: InternetGatewayRule,
    options?: InternetGatewayRulesCreateOptionalParams,
  ) => Promise<InternetGatewayRule>;
  /** Gets an Internet Gateway Rule resource. */
  get: (
    resourceGroupName: string,
    internetGatewayRuleName: string,
    options?: InternetGatewayRulesGetOptionalParams,
  ) => Promise<InternetGatewayRule>;
}

function _getInternetGatewayRules(context: AzureNetworkFabricManagementServiceAPIContext) {
  return {
    listBySubscription: (options?: InternetGatewayRulesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: InternetGatewayRulesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      internetGatewayRuleName: string,
      options?: InternetGatewayRulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, internetGatewayRuleName, options),
    beginDelete: async (
      resourceGroupName: string,
      internetGatewayRuleName: string,
      options?: InternetGatewayRulesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, internetGatewayRuleName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      internetGatewayRuleName: string,
      options?: InternetGatewayRulesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, internetGatewayRuleName, options);
    },
    update: (
      resourceGroupName: string,
      internetGatewayRuleName: string,
      body: InternetGatewayRulePatch,
      options?: InternetGatewayRulesUpdateOptionalParams,
    ) => update(context, resourceGroupName, internetGatewayRuleName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      internetGatewayRuleName: string,
      body: InternetGatewayRulePatch,
      options?: InternetGatewayRulesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, internetGatewayRuleName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      internetGatewayRuleName: string,
      body: InternetGatewayRulePatch,
      options?: InternetGatewayRulesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, internetGatewayRuleName, body, options);
    },
    create: (
      resourceGroupName: string,
      internetGatewayRuleName: string,
      body: InternetGatewayRule,
      options?: InternetGatewayRulesCreateOptionalParams,
    ) => create(context, resourceGroupName, internetGatewayRuleName, body, options),
    beginCreate: async (
      resourceGroupName: string,
      internetGatewayRuleName: string,
      body: InternetGatewayRule,
      options?: InternetGatewayRulesCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, internetGatewayRuleName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      internetGatewayRuleName: string,
      body: InternetGatewayRule,
      options?: InternetGatewayRulesCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, internetGatewayRuleName, body, options);
    },
    get: (
      resourceGroupName: string,
      internetGatewayRuleName: string,
      options?: InternetGatewayRulesGetOptionalParams,
    ) => get(context, resourceGroupName, internetGatewayRuleName, options),
  };
}

export function _getInternetGatewayRulesOperations(
  context: AzureNetworkFabricManagementServiceAPIContext,
): InternetGatewayRulesOperations {
  return {
    ..._getInternetGatewayRules(context),
  };
}
