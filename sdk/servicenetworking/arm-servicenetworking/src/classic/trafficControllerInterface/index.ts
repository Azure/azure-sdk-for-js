// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceNetworkingManagementContext } from "../../api/serviceNetworkingManagementContext.js";
import { TrafficController, TrafficControllerUpdate } from "../../models/models.js";
import {
  TrafficControllerInterfaceListBySubscriptionOptionalParams,
  TrafficControllerInterfaceListByResourceGroupOptionalParams,
  TrafficControllerInterfaceDeleteOptionalParams,
  TrafficControllerInterfaceUpdateOptionalParams,
  TrafficControllerInterfaceCreateOrUpdateOptionalParams,
  TrafficControllerInterfaceGetOptionalParams,
} from "../../api/trafficControllerInterface/options.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/trafficControllerInterface/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a TrafficControllerInterface operations. */
export interface TrafficControllerInterfaceOperations {
  /** List TrafficController resources by subscription ID */
  listBySubscription: (
    options?: TrafficControllerInterfaceListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<TrafficController>;
  /** List TrafficController resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: TrafficControllerInterfaceListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<TrafficController>;
  /** Delete a TrafficController */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    trafficControllerName: string,
    options?: TrafficControllerInterfaceDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a TrafficController */
  update: (
    resourceGroupName: string,
    trafficControllerName: string,
    properties: TrafficControllerUpdate,
    options?: TrafficControllerInterfaceUpdateOptionalParams,
  ) => Promise<TrafficController>;
  /** Create a TrafficController */
  createOrUpdate: (
    resourceGroupName: string,
    trafficControllerName: string,
    resource: TrafficController,
    options?: TrafficControllerInterfaceCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<TrafficController>, TrafficController>;
  /** Get a TrafficController */
  get: (
    resourceGroupName: string,
    trafficControllerName: string,
    options?: TrafficControllerInterfaceGetOptionalParams,
  ) => Promise<TrafficController>;
}

function _getTrafficControllerInterface(context: ServiceNetworkingManagementContext) {
  return {
    listBySubscription: (options?: TrafficControllerInterfaceListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: TrafficControllerInterfaceListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      trafficControllerName: string,
      options?: TrafficControllerInterfaceDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, trafficControllerName, options),
    update: (
      resourceGroupName: string,
      trafficControllerName: string,
      properties: TrafficControllerUpdate,
      options?: TrafficControllerInterfaceUpdateOptionalParams,
    ) => update(context, resourceGroupName, trafficControllerName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      trafficControllerName: string,
      resource: TrafficController,
      options?: TrafficControllerInterfaceCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, trafficControllerName, resource, options),
    get: (
      resourceGroupName: string,
      trafficControllerName: string,
      options?: TrafficControllerInterfaceGetOptionalParams,
    ) => get(context, resourceGroupName, trafficControllerName, options),
  };
}

export function _getTrafficControllerInterfaceOperations(
  context: ServiceNetworkingManagementContext,
): TrafficControllerInterfaceOperations {
  return {
    ..._getTrafficControllerInterface(context),
  };
}
