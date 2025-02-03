// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthDataAIServicesContext } from "../../api/healthDataAIServicesContext.js";
import {
  PrivateEndpointConnectionsGetOptionalParams,
  PrivateEndpointConnectionsCreateOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsListByDeidServiceOptionalParams,
} from "../../api/options.js";
import {
  privateEndpointConnectionsGet,
  privateEndpointConnectionsCreate,
  privateEndpointConnectionsDelete,
  privateEndpointConnectionsListByDeidService,
} from "../../api/privateEndpointConnections/index.js";
import { PrivateEndpointConnectionResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrivateEndpointConnections operations. */
export interface PrivateEndpointConnectionsOperations {
  /** Get a specific private connection */
  get: (
    resourceGroupName: string,
    deidServiceName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsGetOptionalParams,
  ) => Promise<PrivateEndpointConnectionResource>;
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
  /** Delete the private endpoint connection */
  delete: (
    resourceGroupName: string,
    deidServiceName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List private endpoint connections on the given resource */
  listByDeidService: (
    resourceGroupName: string,
    deidServiceName: string,
    options?: PrivateEndpointConnectionsListByDeidServiceOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnectionResource>;
}

export function getPrivateEndpointConnections(
  context: HealthDataAIServicesContext,
  subscriptionId: string,
) {
  return {
    get: (
      resourceGroupName: string,
      deidServiceName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsGetOptionalParams,
    ) =>
      privateEndpointConnectionsGet(
        context,
        subscriptionId,
        resourceGroupName,
        deidServiceName,
        privateEndpointConnectionName,
        options,
      ),
    create: (
      resourceGroupName: string,
      deidServiceName: string,
      privateEndpointConnectionName: string,
      resource: PrivateEndpointConnectionResource,
      options?: PrivateEndpointConnectionsCreateOptionalParams,
    ) =>
      privateEndpointConnectionsCreate(
        context,
        subscriptionId,
        resourceGroupName,
        deidServiceName,
        privateEndpointConnectionName,
        resource,
        options,
      ),
    delete: (
      resourceGroupName: string,
      deidServiceName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionsDeleteOptionalParams,
    ) =>
      privateEndpointConnectionsDelete(
        context,
        subscriptionId,
        resourceGroupName,
        deidServiceName,
        privateEndpointConnectionName,
        options,
      ),
    listByDeidService: (
      resourceGroupName: string,
      deidServiceName: string,
      options?: PrivateEndpointConnectionsListByDeidServiceOptionalParams,
    ) =>
      privateEndpointConnectionsListByDeidService(
        context,
        subscriptionId,
        resourceGroupName,
        deidServiceName,
        options,
      ),
  };
}

export function getPrivateEndpointConnectionsOperations(
  context: HealthDataAIServicesContext,
  subscriptionId: string,
): PrivateEndpointConnectionsOperations {
  return {
    ...getPrivateEndpointConnections(context, subscriptionId),
  };
}
