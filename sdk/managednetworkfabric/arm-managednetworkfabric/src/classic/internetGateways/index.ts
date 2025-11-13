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
} from "../../api/internetGateways/operations.js";
import type {
  InternetGatewaysListBySubscriptionOptionalParams,
  InternetGatewaysListByResourceGroupOptionalParams,
  InternetGatewaysDeleteOptionalParams,
  InternetGatewaysUpdateOptionalParams,
  InternetGatewaysCreateOptionalParams,
  InternetGatewaysGetOptionalParams,
} from "../../api/internetGateways/options.js";
import type { InternetGateway, InternetGatewayPatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a InternetGateways operations. */
export interface InternetGatewaysOperations {
  /** Displays Internet Gateways list by subscription GET method. */
  listBySubscription: (
    options?: InternetGatewaysListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<InternetGateway>;
  /** Displays Internet Gateways list by resource group GET method. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: InternetGatewaysListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<InternetGateway>;
  /** Execute a delete on Network Fabric Service Internet Gateway. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    internetGatewayName: string,
    options?: InternetGatewaysDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Execute patch on Network Fabric Service Internet Gateway. */
  update: (
    resourceGroupName: string,
    internetGatewayName: string,
    properties: InternetGatewayPatch,
    options?: InternetGatewaysUpdateOptionalParams,
  ) => PollerLike<OperationState<InternetGateway>, InternetGateway>;
  /** Creates a Network Fabric Service Internet Gateway resource instance. */
  create: (
    resourceGroupName: string,
    internetGatewayName: string,
    resource: InternetGateway,
    options?: InternetGatewaysCreateOptionalParams,
  ) => PollerLike<OperationState<InternetGateway>, InternetGateway>;
  /** Implements Gateway GET method. */
  get: (
    resourceGroupName: string,
    internetGatewayName: string,
    options?: InternetGatewaysGetOptionalParams,
  ) => Promise<InternetGateway>;
}

function _getInternetGateways(context: ManagedNetworkFabricContext) {
  return {
    listBySubscription: (options?: InternetGatewaysListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: InternetGatewaysListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      internetGatewayName: string,
      options?: InternetGatewaysDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, internetGatewayName, options),
    update: (
      resourceGroupName: string,
      internetGatewayName: string,
      properties: InternetGatewayPatch,
      options?: InternetGatewaysUpdateOptionalParams,
    ) => update(context, resourceGroupName, internetGatewayName, properties, options),
    create: (
      resourceGroupName: string,
      internetGatewayName: string,
      resource: InternetGateway,
      options?: InternetGatewaysCreateOptionalParams,
    ) => create(context, resourceGroupName, internetGatewayName, resource, options),
    get: (
      resourceGroupName: string,
      internetGatewayName: string,
      options?: InternetGatewaysGetOptionalParams,
    ) => get(context, resourceGroupName, internetGatewayName, options),
  };
}

export function _getInternetGatewaysOperations(
  context: ManagedNetworkFabricContext,
): InternetGatewaysOperations {
  return {
    ..._getInternetGateways(context),
  };
}
