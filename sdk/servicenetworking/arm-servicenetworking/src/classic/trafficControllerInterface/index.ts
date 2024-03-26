// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ServiceNetworkingContext } from "../../api/ServiceNetworkingContext.js";
import {
  TrafficController,
  TrafficControllerUpdate,
} from "../../models/models.js";
import {
  trafficControllerInterfaceGet,
  trafficControllerInterfaceCreateOrUpdate,
  trafficControllerInterfaceUpdate,
  trafficControllerInterfaceDeleteOperation,
  trafficControllerInterfaceListByResourceGroup,
  trafficControllerInterfaceListBySubscription,
} from "../../api/trafficControllerInterface/index.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  TrafficControllerInterfaceGetOptions,
  TrafficControllerInterfaceCreateOrUpdateOptions,
  TrafficControllerInterfaceUpdateOptions,
  TrafficControllerInterfaceDeleteOperationOptions,
  TrafficControllerInterfaceListByResourceGroupOptions,
  TrafficControllerInterfaceListBySubscriptionOptions,
} from "../../models/options.js";

export interface TrafficControllerInterfaceOperations {
  get: (
    subscriptionId: string,
    resourceGroupName: string,
    trafficControllerName: string,
    options?: TrafficControllerInterfaceGetOptions,
  ) => Promise<TrafficController>;
  createOrUpdate: (
    subscriptionId: string,
    resourceGroupName: string,
    trafficControllerName: string,
    resource: TrafficController,
    options?: TrafficControllerInterfaceCreateOrUpdateOptions,
  ) => PollerLike<OperationState<TrafficController>, TrafficController>;
  update: (
    subscriptionId: string,
    resourceGroupName: string,
    trafficControllerName: string,
    properties: TrafficControllerUpdate,
    options?: TrafficControllerInterfaceUpdateOptions,
  ) => Promise<TrafficController>;
  deleteOperation: (
    subscriptionId: string,
    resourceGroupName: string,
    trafficControllerName: string,
    options?: TrafficControllerInterfaceDeleteOperationOptions,
  ) => PollerLike<OperationState<void>, void>;
  listByResourceGroup: (
    subscriptionId: string,
    resourceGroupName: string,
    options?: TrafficControllerInterfaceListByResourceGroupOptions,
  ) => PagedAsyncIterableIterator<TrafficController>;
  listBySubscription: (
    subscriptionId: string,
    options?: TrafficControllerInterfaceListBySubscriptionOptions,
  ) => PagedAsyncIterableIterator<TrafficController>;
}

export function getTrafficControllerInterface(
  context: ServiceNetworkingContext,
) {
  return {
    get: (
      subscriptionId: string,
      resourceGroupName: string,
      trafficControllerName: string,
      options?: TrafficControllerInterfaceGetOptions,
    ) =>
      trafficControllerInterfaceGet(
        context,
        subscriptionId,
        resourceGroupName,
        trafficControllerName,
        options,
      ),
    createOrUpdate: (
      subscriptionId: string,
      resourceGroupName: string,
      trafficControllerName: string,
      resource: TrafficController,
      options?: TrafficControllerInterfaceCreateOrUpdateOptions,
    ) =>
      trafficControllerInterfaceCreateOrUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        trafficControllerName,
        resource,
        options,
      ),
    update: (
      subscriptionId: string,
      resourceGroupName: string,
      trafficControllerName: string,
      properties: TrafficControllerUpdate,
      options?: TrafficControllerInterfaceUpdateOptions,
    ) =>
      trafficControllerInterfaceUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        trafficControllerName,
        properties,
        options,
      ),
    deleteOperation: (
      subscriptionId: string,
      resourceGroupName: string,
      trafficControllerName: string,
      options?: TrafficControllerInterfaceDeleteOperationOptions,
    ) =>
      trafficControllerInterfaceDeleteOperation(
        context,
        subscriptionId,
        resourceGroupName,
        trafficControllerName,
        options,
      ),
    listByResourceGroup: (
      subscriptionId: string,
      resourceGroupName: string,
      options?: TrafficControllerInterfaceListByResourceGroupOptions,
    ) =>
      trafficControllerInterfaceListByResourceGroup(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    listBySubscription: (
      subscriptionId: string,
      options?: TrafficControllerInterfaceListBySubscriptionOptions,
    ) =>
      trafficControllerInterfaceListBySubscription(
        context,
        subscriptionId,
        options,
      ),
  };
}

export function getTrafficControllerInterfaceOperations(
  context: ServiceNetworkingContext,
): TrafficControllerInterfaceOperations {
  return {
    ...getTrafficControllerInterface(context),
  };
}
