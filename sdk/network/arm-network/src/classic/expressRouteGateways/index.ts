// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/expressRouteGateways/operations.js";
import type {
  ExpressRouteGatewaysListBySubscriptionOptionalParams,
  ExpressRouteGatewaysListByResourceGroupOptionalParams,
  ExpressRouteGatewaysDeleteOptionalParams,
  ExpressRouteGatewaysUpdateTagsOptionalParams,
  ExpressRouteGatewaysCreateOrUpdateOptionalParams,
  ExpressRouteGatewaysGetOptionalParams,
} from "../../api/expressRouteGateways/options.js";
import type {
  TagsObject,
  ExpressRouteGateway,
  ExpressRouteGatewayList,
} from "../../models/microsoft/network/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ExpressRouteGateways operations. */
export interface ExpressRouteGatewaysOperations {
  /** Lists ExpressRoute gateways under a given subscription. */
  listBySubscription: (
    options?: ExpressRouteGatewaysListBySubscriptionOptionalParams,
  ) => Promise<ExpressRouteGatewayList>;
  /** Lists ExpressRoute gateways in a given resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ExpressRouteGatewaysListByResourceGroupOptionalParams,
  ) => Promise<ExpressRouteGatewayList>;
  /** Deletes the specified ExpressRoute gateway in a resource group. An ExpressRoute gateway resource can only be deleted when there are no connection subresources. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    options?: ExpressRouteGatewaysDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    options?: ExpressRouteGatewaysDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    options?: ExpressRouteGatewaysDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates express route gateway tags. */
  updateTags: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    expressRouteGatewayParameters: TagsObject,
    options?: ExpressRouteGatewaysUpdateTagsOptionalParams,
  ) => PollerLike<OperationState<ExpressRouteGateway>, ExpressRouteGateway>;
  /** @deprecated use updateTags instead */
  beginUpdateTags: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    expressRouteGatewayParameters: TagsObject,
    options?: ExpressRouteGatewaysUpdateTagsOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ExpressRouteGateway>, ExpressRouteGateway>>;
  /** @deprecated use updateTags instead */
  beginUpdateTagsAndWait: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    expressRouteGatewayParameters: TagsObject,
    options?: ExpressRouteGatewaysUpdateTagsOptionalParams,
  ) => Promise<ExpressRouteGateway>;
  /** Creates or updates a ExpressRoute gateway in a specified resource group. */
  createOrUpdate: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    putExpressRouteGatewayParameters: ExpressRouteGateway,
    options?: ExpressRouteGatewaysCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ExpressRouteGateway>, ExpressRouteGateway>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    putExpressRouteGatewayParameters: ExpressRouteGateway,
    options?: ExpressRouteGatewaysCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ExpressRouteGateway>, ExpressRouteGateway>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    putExpressRouteGatewayParameters: ExpressRouteGateway,
    options?: ExpressRouteGatewaysCreateOrUpdateOptionalParams,
  ) => Promise<ExpressRouteGateway>;
  /** Fetches the details of a ExpressRoute gateway in a resource group. */
  get: (
    resourceGroupName: string,
    expressRouteGatewayName: string,
    options?: ExpressRouteGatewaysGetOptionalParams,
  ) => Promise<ExpressRouteGateway>;
}

function _getExpressRouteGateways(context: NetworkManagementContext) {
  return {
    listBySubscription: (options?: ExpressRouteGatewaysListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ExpressRouteGatewaysListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      options?: ExpressRouteGatewaysDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, expressRouteGatewayName, options),
    beginDelete: async (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      options?: ExpressRouteGatewaysDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, expressRouteGatewayName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      options?: ExpressRouteGatewaysDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, expressRouteGatewayName, options);
    },
    updateTags: (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      expressRouteGatewayParameters: TagsObject,
      options?: ExpressRouteGatewaysUpdateTagsOptionalParams,
    ) =>
      updateTags(
        context,
        resourceGroupName,
        expressRouteGatewayName,
        expressRouteGatewayParameters,
        options,
      ),
    beginUpdateTags: async (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      expressRouteGatewayParameters: TagsObject,
      options?: ExpressRouteGatewaysUpdateTagsOptionalParams,
    ) => {
      const poller = updateTags(
        context,
        resourceGroupName,
        expressRouteGatewayName,
        expressRouteGatewayParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateTagsAndWait: async (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      expressRouteGatewayParameters: TagsObject,
      options?: ExpressRouteGatewaysUpdateTagsOptionalParams,
    ) => {
      return await updateTags(
        context,
        resourceGroupName,
        expressRouteGatewayName,
        expressRouteGatewayParameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      putExpressRouteGatewayParameters: ExpressRouteGateway,
      options?: ExpressRouteGatewaysCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        expressRouteGatewayName,
        putExpressRouteGatewayParameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      putExpressRouteGatewayParameters: ExpressRouteGateway,
      options?: ExpressRouteGatewaysCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        expressRouteGatewayName,
        putExpressRouteGatewayParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      putExpressRouteGatewayParameters: ExpressRouteGateway,
      options?: ExpressRouteGatewaysCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        expressRouteGatewayName,
        putExpressRouteGatewayParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      expressRouteGatewayName: string,
      options?: ExpressRouteGatewaysGetOptionalParams,
    ) => get(context, resourceGroupName, expressRouteGatewayName, options),
  };
}

export function _getExpressRouteGatewaysOperations(
  context: NetworkManagementContext,
): ExpressRouteGatewaysOperations {
  return {
    ..._getExpressRouteGateways(context),
  };
}
