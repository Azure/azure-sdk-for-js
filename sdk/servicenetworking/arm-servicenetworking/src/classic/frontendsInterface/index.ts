// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceNetworkingManagementContext } from "../../api/serviceNetworkingManagementContext.js";
import { Frontend, FrontendUpdate } from "../../models/models.js";
import {
  FrontendsInterfaceListByTrafficControllerOptionalParams,
  FrontendsInterfaceDeleteOptionalParams,
  FrontendsInterfaceUpdateOptionalParams,
  FrontendsInterfaceCreateOrUpdateOptionalParams,
  FrontendsInterfaceGetOptionalParams,
} from "../../api/frontendsInterface/options.js";
import {
  listByTrafficController,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/frontendsInterface/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FrontendsInterface operations. */
export interface FrontendsInterfaceOperations {
  /** List Frontend resources by TrafficController */
  listByTrafficController: (
    resourceGroupName: string,
    trafficControllerName: string,
    options?: FrontendsInterfaceListByTrafficControllerOptionalParams,
  ) => PagedAsyncIterableIterator<Frontend>;
  /** Delete a Frontend */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    trafficControllerName: string,
    frontendName: string,
    options?: FrontendsInterfaceDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a Frontend */
  update: (
    resourceGroupName: string,
    trafficControllerName: string,
    frontendName: string,
    properties: FrontendUpdate,
    options?: FrontendsInterfaceUpdateOptionalParams,
  ) => Promise<Frontend>;
  /** Create a Frontend */
  createOrUpdate: (
    resourceGroupName: string,
    trafficControllerName: string,
    frontendName: string,
    resource: Frontend,
    options?: FrontendsInterfaceCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Frontend>, Frontend>;
  /** Get a Frontend */
  get: (
    resourceGroupName: string,
    trafficControllerName: string,
    frontendName: string,
    options?: FrontendsInterfaceGetOptionalParams,
  ) => Promise<Frontend>;
}

function _getFrontendsInterface(context: ServiceNetworkingManagementContext) {
  return {
    listByTrafficController: (
      resourceGroupName: string,
      trafficControllerName: string,
      options?: FrontendsInterfaceListByTrafficControllerOptionalParams,
    ) => listByTrafficController(context, resourceGroupName, trafficControllerName, options),
    delete: (
      resourceGroupName: string,
      trafficControllerName: string,
      frontendName: string,
      options?: FrontendsInterfaceDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, trafficControllerName, frontendName, options),
    update: (
      resourceGroupName: string,
      trafficControllerName: string,
      frontendName: string,
      properties: FrontendUpdate,
      options?: FrontendsInterfaceUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, trafficControllerName, frontendName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      trafficControllerName: string,
      frontendName: string,
      resource: Frontend,
      options?: FrontendsInterfaceCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        trafficControllerName,
        frontendName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      trafficControllerName: string,
      frontendName: string,
      options?: FrontendsInterfaceGetOptionalParams,
    ) => get(context, resourceGroupName, trafficControllerName, frontendName, options),
  };
}

export function _getFrontendsInterfaceOperations(
  context: ServiceNetworkingManagementContext,
): FrontendsInterfaceOperations {
  return {
    ..._getFrontendsInterface(context),
  };
}
