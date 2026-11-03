// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceNetworkingManagementContext } from "../../api/serviceNetworkingManagementContext.js";
import {
  listByTrafficController,
  $delete,
  update,
  get,
} from "../../api/privateEndpointConnectionsInterface/operations.js";
import type {
  PrivateEndpointConnectionsInterfaceListByTrafficControllerOptionalParams,
  PrivateEndpointConnectionsInterfaceDeleteOptionalParams,
  PrivateEndpointConnectionsInterfaceUpdateOptionalParams,
  PrivateEndpointConnectionsInterfaceGetOptionalParams,
} from "../../api/privateEndpointConnectionsInterface/options.js";
import type { PrivateEndpointConnection } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrivateEndpointConnectionsInterface operations. */
export interface PrivateEndpointConnectionsInterfaceOperations {
  /** List PrivateEndpointConnection resources by TrafficController */
  listByTrafficController: (
    resourceGroupName: string,
    trafficControllerName: string,
    options?: PrivateEndpointConnectionsInterfaceListByTrafficControllerOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnection>;
  /** Delete a PrivateEndpointConnection */
  delete: (
    resourceGroupName: string,
    trafficControllerName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsInterfaceDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a PrivateEndpointConnection */
  update: (
    resourceGroupName: string,
    trafficControllerName: string,
    privateEndpointConnectionName: string,
    resource: PrivateEndpointConnection,
    options?: PrivateEndpointConnectionsInterfaceUpdateOptionalParams,
  ) => PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>;
  /** Get a PrivateEndpointConnection */
  get: (
    resourceGroupName: string,
    trafficControllerName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsInterfaceGetOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
}

function _getPrivateEndpointConnectionsInterface(context: ServiceNetworkingManagementContext) {
  return {
    listByTrafficController: (
      resourceGroupName: string,
      trafficControllerName: string,
      options?: PrivateEndpointConnectionsInterfaceListByTrafficControllerOptionalParams,
    ) => listByTrafficController(context, resourceGroupName, trafficControllerName, options),
    delete: (
      resourceGroupName: string,
      trafficControllerName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsInterfaceDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        trafficControllerName,
        privateEndpointConnectionName,
        options,
      ),
    update: (
      resourceGroupName: string,
      trafficControllerName: string,
      privateEndpointConnectionName: string,
      resource: PrivateEndpointConnection,
      options?: PrivateEndpointConnectionsInterfaceUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        trafficControllerName,
        privateEndpointConnectionName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      trafficControllerName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsInterfaceGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        trafficControllerName,
        privateEndpointConnectionName,
        options,
      ),
  };
}

export function _getPrivateEndpointConnectionsInterfaceOperations(
  context: ServiceNetworkingManagementContext,
): PrivateEndpointConnectionsInterfaceOperations {
  return {
    ..._getPrivateEndpointConnectionsInterface(context),
  };
}
