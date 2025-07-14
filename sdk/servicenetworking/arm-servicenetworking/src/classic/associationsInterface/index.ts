// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceNetworkingManagementContext } from "../../api/serviceNetworkingManagementContext.js";
import { Association, AssociationUpdate } from "../../models/models.js";
import {
  AssociationsInterfaceListByTrafficControllerOptionalParams,
  AssociationsInterfaceDeleteOptionalParams,
  AssociationsInterfaceUpdateOptionalParams,
  AssociationsInterfaceCreateOrUpdateOptionalParams,
  AssociationsInterfaceGetOptionalParams,
} from "../../api/associationsInterface/options.js";
import {
  listByTrafficController,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/associationsInterface/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AssociationsInterface operations. */
export interface AssociationsInterfaceOperations {
  /** List Association resources by TrafficController */
  listByTrafficController: (
    resourceGroupName: string,
    trafficControllerName: string,
    options?: AssociationsInterfaceListByTrafficControllerOptionalParams,
  ) => PagedAsyncIterableIterator<Association>;
  /** Delete a Association */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    trafficControllerName: string,
    associationName: string,
    options?: AssociationsInterfaceDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a Association */
  update: (
    resourceGroupName: string,
    trafficControllerName: string,
    associationName: string,
    properties: AssociationUpdate,
    options?: AssociationsInterfaceUpdateOptionalParams,
  ) => Promise<Association>;
  /** Create a Association */
  createOrUpdate: (
    resourceGroupName: string,
    trafficControllerName: string,
    associationName: string,
    resource: Association,
    options?: AssociationsInterfaceCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Association>, Association>;
  /** Get a Association */
  get: (
    resourceGroupName: string,
    trafficControllerName: string,
    associationName: string,
    options?: AssociationsInterfaceGetOptionalParams,
  ) => Promise<Association>;
}

function _getAssociationsInterface(context: ServiceNetworkingManagementContext) {
  return {
    listByTrafficController: (
      resourceGroupName: string,
      trafficControllerName: string,
      options?: AssociationsInterfaceListByTrafficControllerOptionalParams,
    ) => listByTrafficController(context, resourceGroupName, trafficControllerName, options),
    delete: (
      resourceGroupName: string,
      trafficControllerName: string,
      associationName: string,
      options?: AssociationsInterfaceDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, trafficControllerName, associationName, options),
    update: (
      resourceGroupName: string,
      trafficControllerName: string,
      associationName: string,
      properties: AssociationUpdate,
      options?: AssociationsInterfaceUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        trafficControllerName,
        associationName,
        properties,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      trafficControllerName: string,
      associationName: string,
      resource: Association,
      options?: AssociationsInterfaceCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        trafficControllerName,
        associationName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      trafficControllerName: string,
      associationName: string,
      options?: AssociationsInterfaceGetOptionalParams,
    ) => get(context, resourceGroupName, trafficControllerName, associationName, options),
  };
}

export function _getAssociationsInterfaceOperations(
  context: ServiceNetworkingManagementContext,
): AssociationsInterfaceOperations {
  return {
    ..._getAssociationsInterface(context),
  };
}
