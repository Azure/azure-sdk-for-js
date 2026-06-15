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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    internetGatewayName: string,
    options?: InternetGatewaysDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    internetGatewayName: string,
    options?: InternetGatewaysDeleteOptionalParams,
  ) => Promise<void>;
  /** Execute patch on Network Fabric Service Internet Gateway. */
  update: (
    resourceGroupName: string,
    internetGatewayName: string,
    body: InternetGatewayPatch,
    options?: InternetGatewaysUpdateOptionalParams,
  ) => PollerLike<OperationState<InternetGateway>, InternetGateway>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    internetGatewayName: string,
    body: InternetGatewayPatch,
    options?: InternetGatewaysUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<InternetGateway>, InternetGateway>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    internetGatewayName: string,
    body: InternetGatewayPatch,
    options?: InternetGatewaysUpdateOptionalParams,
  ) => Promise<InternetGateway>;
  /** Creates a Network Fabric Service Internet Gateway resource instance. */
  create: (
    resourceGroupName: string,
    internetGatewayName: string,
    body: InternetGateway,
    options?: InternetGatewaysCreateOptionalParams,
  ) => PollerLike<OperationState<InternetGateway>, InternetGateway>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    internetGatewayName: string,
    body: InternetGateway,
    options?: InternetGatewaysCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<InternetGateway>, InternetGateway>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    internetGatewayName: string,
    body: InternetGateway,
    options?: InternetGatewaysCreateOptionalParams,
  ) => Promise<InternetGateway>;
  /** Implements Gateway GET method. */
  get: (
    resourceGroupName: string,
    internetGatewayName: string,
    options?: InternetGatewaysGetOptionalParams,
  ) => Promise<InternetGateway>;
}

function _getInternetGateways(context: AzureNetworkFabricManagementServiceAPIContext) {
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
    beginDelete: async (
      resourceGroupName: string,
      internetGatewayName: string,
      options?: InternetGatewaysDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, internetGatewayName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      internetGatewayName: string,
      options?: InternetGatewaysDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, internetGatewayName, options);
    },
    update: (
      resourceGroupName: string,
      internetGatewayName: string,
      body: InternetGatewayPatch,
      options?: InternetGatewaysUpdateOptionalParams,
    ) => update(context, resourceGroupName, internetGatewayName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      internetGatewayName: string,
      body: InternetGatewayPatch,
      options?: InternetGatewaysUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, internetGatewayName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      internetGatewayName: string,
      body: InternetGatewayPatch,
      options?: InternetGatewaysUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, internetGatewayName, body, options);
    },
    create: (
      resourceGroupName: string,
      internetGatewayName: string,
      body: InternetGateway,
      options?: InternetGatewaysCreateOptionalParams,
    ) => create(context, resourceGroupName, internetGatewayName, body, options),
    beginCreate: async (
      resourceGroupName: string,
      internetGatewayName: string,
      body: InternetGateway,
      options?: InternetGatewaysCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, internetGatewayName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      internetGatewayName: string,
      body: InternetGateway,
      options?: InternetGatewaysCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, internetGatewayName, body, options);
    },
    get: (
      resourceGroupName: string,
      internetGatewayName: string,
      options?: InternetGatewaysGetOptionalParams,
    ) => get(context, resourceGroupName, internetGatewayName, options),
  };
}

export function _getInternetGatewaysOperations(
  context: AzureNetworkFabricManagementServiceAPIContext,
): InternetGatewaysOperations {
  return {
    ..._getInternetGateways(context),
  };
}
