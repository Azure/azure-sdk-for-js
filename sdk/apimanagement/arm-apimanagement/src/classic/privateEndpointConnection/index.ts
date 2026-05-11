// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listPrivateLinkResources,
  getPrivateLinkResource,
  listByService,
  $delete,
  createOrUpdate,
  getByName,
} from "../../api/privateEndpointConnection/operations.js";
import {
  PrivateEndpointConnectionListPrivateLinkResourcesOptionalParams,
  PrivateEndpointConnectionGetPrivateLinkResourceOptionalParams,
  PrivateEndpointConnectionListByServiceOptionalParams,
  PrivateEndpointConnectionDeleteOptionalParams,
  PrivateEndpointConnectionCreateOrUpdateOptionalParams,
  PrivateEndpointConnectionGetByNameOptionalParams,
} from "../../api/privateEndpointConnection/options.js";
import {
  PrivateEndpointConnection,
  PrivateEndpointConnectionRequest,
  PrivateLinkResource,
  PrivateLinkResourceListResult,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrivateEndpointConnection operations. */
export interface PrivateEndpointConnectionOperations {
  /** Gets the private link resources */
  listPrivateLinkResources: (
    resourceGroupName: string,
    serviceName: string,
    options?: PrivateEndpointConnectionListPrivateLinkResourcesOptionalParams,
  ) => Promise<PrivateLinkResourceListResult>;
  /** Gets the private link resources */
  getPrivateLinkResource: (
    resourceGroupName: string,
    serviceName: string,
    privateLinkSubResourceName: string,
    options?: PrivateEndpointConnectionGetPrivateLinkResourceOptionalParams,
  ) => Promise<PrivateLinkResource>;
  /** Lists all private endpoint connections of the API Management service instance. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: PrivateEndpointConnectionListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnection>;
  /** Deletes the specified Private Endpoint Connection. */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates a new Private Endpoint Connection or updates an existing one. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    privateEndpointConnectionName: string,
    privateEndpointConnectionRequest: PrivateEndpointConnectionRequest,
    options?: PrivateEndpointConnectionCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>;
  /** Gets the details of the Private Endpoint Connection specified by its identifier. */
  getByName: (
    resourceGroupName: string,
    serviceName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionGetByNameOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
}

function _getPrivateEndpointConnection(context: ApiManagementContext) {
  return {
    listPrivateLinkResources: (
      resourceGroupName: string,
      serviceName: string,
      options?: PrivateEndpointConnectionListPrivateLinkResourcesOptionalParams,
    ) => listPrivateLinkResources(context, resourceGroupName, serviceName, options),
    getPrivateLinkResource: (
      resourceGroupName: string,
      serviceName: string,
      privateLinkSubResourceName: string,
      options?: PrivateEndpointConnectionGetPrivateLinkResourceOptionalParams,
    ) =>
      getPrivateLinkResource(
        context,
        resourceGroupName,
        serviceName,
        privateLinkSubResourceName,
        options,
      ),
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: PrivateEndpointConnectionListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, privateEndpointConnectionName, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      privateEndpointConnectionName: string,
      privateEndpointConnectionRequest: PrivateEndpointConnectionRequest,
      options?: PrivateEndpointConnectionCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        privateEndpointConnectionName,
        privateEndpointConnectionRequest,
        options,
      ),
    getByName: (
      resourceGroupName: string,
      serviceName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionGetByNameOptionalParams,
    ) => getByName(context, resourceGroupName, serviceName, privateEndpointConnectionName, options),
  };
}

export function _getPrivateEndpointConnectionOperations(
  context: ApiManagementContext,
): PrivateEndpointConnectionOperations {
  return {
    ..._getPrivateEndpointConnection(context),
  };
}
