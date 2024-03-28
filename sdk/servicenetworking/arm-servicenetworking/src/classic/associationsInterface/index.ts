// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ServiceNetworkingContext } from "../../api/ServiceNetworkingContext.js";
import { Association, AssociationUpdate } from "../../models/models.js";
import {
  associationsInterfaceGet,
  associationsInterfaceCreateOrUpdate,
  associationsInterfaceUpdate,
  associationsInterfaceDeleteOperation,
  associationsInterfaceListByTrafficController,
} from "../../api/associationsInterface/index.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  AssociationsInterfaceGetOptions,
  AssociationsInterfaceCreateOrUpdateOptions,
  AssociationsInterfaceUpdateOptions,
  AssociationsInterfaceDeleteOperationOptions,
  AssociationsInterfaceListByTrafficControllerOptions,
} from "../../models/options.js";

export interface AssociationsInterfaceOperations {
  get: (
    subscriptionId: string,
    resourceGroupName: string,
    trafficControllerName: string,
    associationName: string,
    options?: AssociationsInterfaceGetOptions,
  ) => Promise<Association>;
  createOrUpdate: (
    subscriptionId: string,
    resourceGroupName: string,
    trafficControllerName: string,
    associationName: string,
    resource: Association,
    options?: AssociationsInterfaceCreateOrUpdateOptions,
  ) => PollerLike<OperationState<Association>, Association>;
  update: (
    subscriptionId: string,
    resourceGroupName: string,
    trafficControllerName: string,
    associationName: string,
    properties: AssociationUpdate,
    options?: AssociationsInterfaceUpdateOptions,
  ) => Promise<Association>;
  deleteOperation: (
    subscriptionId: string,
    resourceGroupName: string,
    trafficControllerName: string,
    associationName: string,
    options?: AssociationsInterfaceDeleteOperationOptions,
  ) => PollerLike<OperationState<void>, void>;
  listByTrafficController: (
    subscriptionId: string,
    resourceGroupName: string,
    trafficControllerName: string,
    options?: AssociationsInterfaceListByTrafficControllerOptions,
  ) => PagedAsyncIterableIterator<Association>;
}

export function getAssociationsInterface(context: ServiceNetworkingContext) {
  return {
    get: (
      subscriptionId: string,
      resourceGroupName: string,
      trafficControllerName: string,
      associationName: string,
      options?: AssociationsInterfaceGetOptions,
    ) =>
      associationsInterfaceGet(
        context,
        subscriptionId,
        resourceGroupName,
        trafficControllerName,
        associationName,
        options,
      ),
    createOrUpdate: (
      subscriptionId: string,
      resourceGroupName: string,
      trafficControllerName: string,
      associationName: string,
      resource: Association,
      options?: AssociationsInterfaceCreateOrUpdateOptions,
    ) =>
      associationsInterfaceCreateOrUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        trafficControllerName,
        associationName,
        resource,
        options,
      ),
    update: (
      subscriptionId: string,
      resourceGroupName: string,
      trafficControllerName: string,
      associationName: string,
      properties: AssociationUpdate,
      options?: AssociationsInterfaceUpdateOptions,
    ) =>
      associationsInterfaceUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        trafficControllerName,
        associationName,
        properties,
        options,
      ),
    deleteOperation: (
      subscriptionId: string,
      resourceGroupName: string,
      trafficControllerName: string,
      associationName: string,
      options?: AssociationsInterfaceDeleteOperationOptions,
    ) =>
      associationsInterfaceDeleteOperation(
        context,
        subscriptionId,
        resourceGroupName,
        trafficControllerName,
        associationName,
        options,
      ),
    listByTrafficController: (
      subscriptionId: string,
      resourceGroupName: string,
      trafficControllerName: string,
      options?: AssociationsInterfaceListByTrafficControllerOptions,
    ) =>
      associationsInterfaceListByTrafficController(
        context,
        subscriptionId,
        resourceGroupName,
        trafficControllerName,
        options,
      ),
  };
}

export function getAssociationsInterfaceOperations(
  context: ServiceNetworkingContext,
): AssociationsInterfaceOperations {
  return {
    ...getAssociationsInterface(context),
  };
}
