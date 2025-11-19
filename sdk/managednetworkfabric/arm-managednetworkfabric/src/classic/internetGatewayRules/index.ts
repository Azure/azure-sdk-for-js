// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagedNetworkFabricContext } from "../../api/managedNetworkFabricContext.js";
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
  /** API to update certain properties of the Internet Gateway Rule resource. */
  update: (
    resourceGroupName: string,
    internetGatewayRuleName: string,
    properties: InternetGatewayRulePatch,
    options?: InternetGatewayRulesUpdateOptionalParams,
  ) => PollerLike<OperationState<InternetGatewayRule>, InternetGatewayRule>;
  /** Creates an Internet Gateway rule resource. */
  create: (
    resourceGroupName: string,
    internetGatewayRuleName: string,
    resource: InternetGatewayRule,
    options?: InternetGatewayRulesCreateOptionalParams,
  ) => PollerLike<OperationState<InternetGatewayRule>, InternetGatewayRule>;
  /** Gets an Internet Gateway Rule resource. */
  get: (
    resourceGroupName: string,
    internetGatewayRuleName: string,
    options?: InternetGatewayRulesGetOptionalParams,
  ) => Promise<InternetGatewayRule>;
}

function _getInternetGatewayRules(context: ManagedNetworkFabricContext) {
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
    update: (
      resourceGroupName: string,
      internetGatewayRuleName: string,
      properties: InternetGatewayRulePatch,
      options?: InternetGatewayRulesUpdateOptionalParams,
    ) => update(context, resourceGroupName, internetGatewayRuleName, properties, options),
    create: (
      resourceGroupName: string,
      internetGatewayRuleName: string,
      resource: InternetGatewayRule,
      options?: InternetGatewayRulesCreateOptionalParams,
    ) => create(context, resourceGroupName, internetGatewayRuleName, resource, options),
    get: (
      resourceGroupName: string,
      internetGatewayRuleName: string,
      options?: InternetGatewayRulesGetOptionalParams,
    ) => get(context, resourceGroupName, internetGatewayRuleName, options),
  };
}

export function _getInternetGatewayRulesOperations(
  context: ManagedNetworkFabricContext,
): InternetGatewayRulesOperations {
  return {
    ..._getInternetGatewayRules(context),
  };
}
