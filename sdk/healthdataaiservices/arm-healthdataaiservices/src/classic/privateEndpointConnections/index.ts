// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HealthDataAIServicesContext } from "../../api/healthDataAIServicesContext.js";
import {
  listByDeidService,
  $delete,
  create,
  get,
} from "../../api/privateEndpointConnections/operations.js";
import type {
  PrivateEndpointConnectionsListByDeidServiceOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsCreateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "../../api/privateEndpointConnections/options.js";
import type { PrivateEndpointConnectionResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrivateEndpointConnections operations. */
export interface PrivateEndpointConnectionsOperations {
  /** List private endpoint connections on the given resource */
  listByDeidService: (
    resourceGroupName: string,
    deidServiceName: string,
    options?: PrivateEndpointConnectionsListByDeidServiceOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnectionResource>;
  /** Delete the private endpoint connection */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    deidServiceName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a Private endpoint connection */
  create: (
    resourceGroupName: string,
    deidServiceName: string,
    privateEndpointConnectionName: string,
    resource: PrivateEndpointConnectionResource,
    options?: PrivateEndpointConnectionsCreateOptionalParams,
  ) => PollerLike<
    OperationState<PrivateEndpointConnectionResource>,
    PrivateEndpointConnectionResource
  >;
  /** Get a specific private connection */
  get: (
    resourceGroupName: string,
    deidServiceName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<PrivateEndpointConnectionResource>;
}

function _getPrivateEndpointConnections(context: HealthDataAIServicesContext) {
  return {
    listByDeidService: (
      resourceGroupName: string,
      deidServiceName: string,
      options?: PrivateEndpointConnectionsListByDeidServiceOptionalParams,
    ) => listByDeidService(context, resourceGroupName, deidServiceName, options),
    delete: (
      resourceGroupName: string,
      deidServiceName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, deidServiceName, privateEndpointConnectionName, options),
    create: (
      resourceGroupName: string,
      deidServiceName: string,
      privateEndpointConnectionName: string,
      resource: PrivateEndpointConnectionResource,
      options?: PrivateEndpointConnectionsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        deidServiceName,
        privateEndpointConnectionName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      deidServiceName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, deidServiceName, privateEndpointConnectionName, options),
  };
}

export function _getPrivateEndpointConnectionsOperations(
  context: HealthDataAIServicesContext,
): PrivateEndpointConnectionsOperations {
  return {
    ..._getPrivateEndpointConnections(context),
  };
}
