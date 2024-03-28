// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ServiceNetworkingContext } from "../../api/ServiceNetworkingContext.js";
import { Frontend, FrontendUpdate } from "../../models/models.js";
import {
  frontendsInterfaceGet,
  frontendsInterfaceCreateOrUpdate,
  frontendsInterfaceUpdate,
  frontendsInterfaceDeleteOperation,
  frontendsInterfaceListByTrafficController,
} from "../../api/frontendsInterface/index.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  FrontendsInterfaceGetOptions,
  FrontendsInterfaceCreateOrUpdateOptions,
  FrontendsInterfaceUpdateOptions,
  FrontendsInterfaceDeleteOperationOptions,
  FrontendsInterfaceListByTrafficControllerOptions,
} from "../../models/options.js";

export interface FrontendsInterfaceOperations {
  get: (
    subscriptionId: string,
    resourceGroupName: string,
    trafficControllerName: string,
    frontendName: string,
    options?: FrontendsInterfaceGetOptions,
  ) => Promise<Frontend>;
  createOrUpdate: (
    subscriptionId: string,
    resourceGroupName: string,
    trafficControllerName: string,
    frontendName: string,
    resource: Frontend,
    options?: FrontendsInterfaceCreateOrUpdateOptions,
  ) => PollerLike<OperationState<Frontend>, Frontend>;
  update: (
    subscriptionId: string,
    resourceGroupName: string,
    trafficControllerName: string,
    frontendName: string,
    properties: FrontendUpdate,
    options?: FrontendsInterfaceUpdateOptions,
  ) => Promise<Frontend>;
  deleteOperation: (
    subscriptionId: string,
    resourceGroupName: string,
    trafficControllerName: string,
    frontendName: string,
    options?: FrontendsInterfaceDeleteOperationOptions,
  ) => PollerLike<OperationState<void>, void>;
  listByTrafficController: (
    subscriptionId: string,
    resourceGroupName: string,
    trafficControllerName: string,
    options?: FrontendsInterfaceListByTrafficControllerOptions,
  ) => PagedAsyncIterableIterator<Frontend>;
}

export function getFrontendsInterface(context: ServiceNetworkingContext) {
  return {
    get: (
      subscriptionId: string,
      resourceGroupName: string,
      trafficControllerName: string,
      frontendName: string,
      options?: FrontendsInterfaceGetOptions,
    ) =>
      frontendsInterfaceGet(
        context,
        subscriptionId,
        resourceGroupName,
        trafficControllerName,
        frontendName,
        options,
      ),
    createOrUpdate: (
      subscriptionId: string,
      resourceGroupName: string,
      trafficControllerName: string,
      frontendName: string,
      resource: Frontend,
      options?: FrontendsInterfaceCreateOrUpdateOptions,
    ) =>
      frontendsInterfaceCreateOrUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        trafficControllerName,
        frontendName,
        resource,
        options,
      ),
    update: (
      subscriptionId: string,
      resourceGroupName: string,
      trafficControllerName: string,
      frontendName: string,
      properties: FrontendUpdate,
      options?: FrontendsInterfaceUpdateOptions,
    ) =>
      frontendsInterfaceUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        trafficControllerName,
        frontendName,
        properties,
        options,
      ),
    deleteOperation: (
      subscriptionId: string,
      resourceGroupName: string,
      trafficControllerName: string,
      frontendName: string,
      options?: FrontendsInterfaceDeleteOperationOptions,
    ) =>
      frontendsInterfaceDeleteOperation(
        context,
        subscriptionId,
        resourceGroupName,
        trafficControllerName,
        frontendName,
        options,
      ),
    listByTrafficController: (
      subscriptionId: string,
      resourceGroupName: string,
      trafficControllerName: string,
      options?: FrontendsInterfaceListByTrafficControllerOptions,
    ) =>
      frontendsInterfaceListByTrafficController(
        context,
        subscriptionId,
        resourceGroupName,
        trafficControllerName,
        options,
      ),
  };
}

export function getFrontendsInterfaceOperations(
  context: ServiceNetworkingContext,
): FrontendsInterfaceOperations {
  return {
    ...getFrontendsInterface(context),
  };
}
