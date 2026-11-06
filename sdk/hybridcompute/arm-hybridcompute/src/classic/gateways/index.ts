// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HybridComputeManagementContext } from "../../api/hybridComputeManagementContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/gateways/operations.js";
import type {
  GatewaysListBySubscriptionOptionalParams,
  GatewaysListByResourceGroupOptionalParams,
  GatewaysDeleteOptionalParams,
  GatewaysUpdateOptionalParams,
  GatewaysCreateOrUpdateOptionalParams,
  GatewaysGetOptionalParams,
} from "../../api/gateways/options.js";
import type { Gateway, GatewayUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Gateways operations. */
export interface GatewaysOperations {
  /** The operation to get all gateways of a non-Azure machine */
  listBySubscription: (
    options?: GatewaysListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Gateway>;
  /** The operation to get all gateways of a non-Azure machine */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: GatewaysListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Gateway>;
  /** The operation to delete a gateway. */
  delete: (
    resourceGroupName: string,
    gatewayName: string,
    options?: GatewaysDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    gatewayName: string,
    options?: GatewaysDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    gatewayName: string,
    options?: GatewaysDeleteOptionalParams,
  ) => Promise<void>;
  /** The operation to update a gateway. */
  update: (
    resourceGroupName: string,
    gatewayName: string,
    parameters: GatewayUpdate,
    options?: GatewaysUpdateOptionalParams,
  ) => Promise<Gateway>;
  /** The operation to create or update a gateway. */
  createOrUpdate: (
    resourceGroupName: string,
    gatewayName: string,
    parameters: Gateway,
    options?: GatewaysCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Gateway>, Gateway>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    gatewayName: string,
    parameters: Gateway,
    options?: GatewaysCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Gateway>, Gateway>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    gatewayName: string,
    parameters: Gateway,
    options?: GatewaysCreateOrUpdateOptionalParams,
  ) => Promise<Gateway>;
  /** Retrieves information about the view of a gateway. */
  get: (
    resourceGroupName: string,
    gatewayName: string,
    options?: GatewaysGetOptionalParams,
  ) => Promise<Gateway>;
}

function _getGateways(context: HybridComputeManagementContext) {
  return {
    listBySubscription: (options?: GatewaysListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: GatewaysListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      gatewayName: string,
      options?: GatewaysDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, gatewayName, options),
    beginDelete: async (
      resourceGroupName: string,
      gatewayName: string,
      options?: GatewaysDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, gatewayName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      gatewayName: string,
      options?: GatewaysDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, gatewayName, options);
    },
    update: (
      resourceGroupName: string,
      gatewayName: string,
      parameters: GatewayUpdate,
      options?: GatewaysUpdateOptionalParams,
    ) => update(context, resourceGroupName, gatewayName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      gatewayName: string,
      parameters: Gateway,
      options?: GatewaysCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, gatewayName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      gatewayName: string,
      parameters: Gateway,
      options?: GatewaysCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, gatewayName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      gatewayName: string,
      parameters: Gateway,
      options?: GatewaysCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, gatewayName, parameters, options);
    },
    get: (resourceGroupName: string, gatewayName: string, options?: GatewaysGetOptionalParams) =>
      get(context, resourceGroupName, gatewayName, options),
  };
}

export function _getGatewaysOperations(
  context: HybridComputeManagementContext,
): GatewaysOperations {
  return {
    ..._getGateways(context),
  };
}
