// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProgrammableConnectivityContext } from "../../api/programmableConnectivityContext.js";
import { Gateway, GatewayTagsUpdate } from "../../models/models.js";
import {
  GatewaysListBySubscriptionOptionalParams,
  GatewaysListByResourceGroupOptionalParams,
  GatewaysDeleteOptionalParams,
  GatewaysUpdateOptionalParams,
  GatewaysCreateOrUpdateOptionalParams,
  GatewaysGetOptionalParams,
} from "../../api/gateways/options.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/gateways/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Gateways operations. */
export interface GatewaysOperations {
  /** List Gateway resources by subscription ID. */
  listBySubscription: (
    options?: GatewaysListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Gateway>;
  /** List Gateway resources by resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: GatewaysListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Gateway>;
  /** Delete a Gateway. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    gatewayName: string,
    options?: GatewaysDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update Gateway tags. */
  update: (
    resourceGroupName: string,
    gatewayName: string,
    properties: GatewayTagsUpdate,
    options?: GatewaysUpdateOptionalParams,
  ) => Promise<Gateway>;
  /** Create or update an APC Gateway. */
  createOrUpdate: (
    resourceGroupName: string,
    gatewayName: string,
    resource: Gateway,
    options?: GatewaysCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Gateway>, Gateway>;
  /** Get a Gateway resource by name. */
  get: (
    resourceGroupName: string,
    gatewayName: string,
    options?: GatewaysGetOptionalParams,
  ) => Promise<Gateway>;
}

function _getGateways(context: ProgrammableConnectivityContext) {
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
    update: (
      resourceGroupName: string,
      gatewayName: string,
      properties: GatewayTagsUpdate,
      options?: GatewaysUpdateOptionalParams,
    ) => update(context, resourceGroupName, gatewayName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      gatewayName: string,
      resource: Gateway,
      options?: GatewaysCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        gatewayName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      gatewayName: string,
      options?: GatewaysGetOptionalParams,
    ) => get(context, resourceGroupName, gatewayName, options),
  };
}

export function _getGatewaysOperations(
  context: ProgrammableConnectivityContext,
): GatewaysOperations {
  return {
    ..._getGateways(context),
  };
}
