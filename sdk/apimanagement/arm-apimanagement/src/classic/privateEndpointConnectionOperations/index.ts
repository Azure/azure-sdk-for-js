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
} from "../../api/privateEndpointConnectionOperations/operations.js";
import {
  PrivateEndpointConnectionOperationsListPrivateLinkResourcesOptionalParams,
  PrivateEndpointConnectionOperationsGetPrivateLinkResourceOptionalParams,
  PrivateEndpointConnectionOperationsListByServiceOptionalParams,
  PrivateEndpointConnectionOperationsDeleteOptionalParams,
  PrivateEndpointConnectionOperationsCreateOrUpdateOptionalParams,
  PrivateEndpointConnectionOperationsGetByNameOptionalParams,
} from "../../api/privateEndpointConnectionOperations/options.js";
import {
  PrivateEndpointConnection,
  PrivateEndpointConnectionRequest,
  PrivateLinkResource,
  PrivateLinkResourceListResult,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PrivateEndpointConnectionOperations operations. */
export interface PrivateEndpointConnectionOperationsOperations {
  /** Gets the private link resources */
  listPrivateLinkResources: (
    resourceGroupName: string,
    serviceName: string,
    options?: PrivateEndpointConnectionOperationsListPrivateLinkResourcesOptionalParams,
  ) => Promise<PrivateLinkResourceListResult>;
  /** Gets the private link resources */
  getPrivateLinkResource: (
    resourceGroupName: string,
    serviceName: string,
    privateLinkSubResourceName: string,
    options?: PrivateEndpointConnectionOperationsGetPrivateLinkResourceOptionalParams,
  ) => Promise<PrivateLinkResource>;
  /** Lists all private endpoint connections of the API Management service instance. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: PrivateEndpointConnectionOperationsListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateEndpointConnection>;
  /** Deletes the specified Private Endpoint Connection. */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionOperationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    serviceName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionOperationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    serviceName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionOperationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a new Private Endpoint Connection or updates an existing one. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    privateEndpointConnectionName: string,
    privateEndpointConnectionRequest: PrivateEndpointConnectionRequest,
    options?: PrivateEndpointConnectionOperationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    privateEndpointConnectionName: string,
    privateEndpointConnectionRequest: PrivateEndpointConnectionRequest,
    options?: PrivateEndpointConnectionOperationsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serviceName: string,
    privateEndpointConnectionName: string,
    privateEndpointConnectionRequest: PrivateEndpointConnectionRequest,
    options?: PrivateEndpointConnectionOperationsCreateOrUpdateOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
  /** Gets the details of the Private Endpoint Connection specified by its identifier. */
  getByName: (
    resourceGroupName: string,
    serviceName: string,
    privateEndpointConnectionName: string,
    options?: PrivateEndpointConnectionOperationsGetByNameOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
}

function _getPrivateEndpointConnectionOperations(context: ApiManagementContext) {
  return {
    listPrivateLinkResources: (
      resourceGroupName: string,
      serviceName: string,
      options?: PrivateEndpointConnectionOperationsListPrivateLinkResourcesOptionalParams,
    ) => listPrivateLinkResources(context, resourceGroupName, serviceName, options),
    getPrivateLinkResource: (
      resourceGroupName: string,
      serviceName: string,
      privateLinkSubResourceName: string,
      options?: PrivateEndpointConnectionOperationsGetPrivateLinkResourceOptionalParams,
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
      options?: PrivateEndpointConnectionOperationsListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionOperationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, privateEndpointConnectionName, options),
    beginDelete: async (
      resourceGroupName: string,
      serviceName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionOperationsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        serviceName,
        privateEndpointConnectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      serviceName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionOperationsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        serviceName,
        privateEndpointConnectionName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      privateEndpointConnectionName: string,
      privateEndpointConnectionRequest: PrivateEndpointConnectionRequest,
      options?: PrivateEndpointConnectionOperationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        privateEndpointConnectionName,
        privateEndpointConnectionRequest,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serviceName: string,
      privateEndpointConnectionName: string,
      privateEndpointConnectionRequest: PrivateEndpointConnectionRequest,
      options?: PrivateEndpointConnectionOperationsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        privateEndpointConnectionName,
        privateEndpointConnectionRequest,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serviceName: string,
      privateEndpointConnectionName: string,
      privateEndpointConnectionRequest: PrivateEndpointConnectionRequest,
      options?: PrivateEndpointConnectionOperationsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        privateEndpointConnectionName,
        privateEndpointConnectionRequest,
        options,
      );
    },
    getByName: (
      resourceGroupName: string,
      serviceName: string,
      privateEndpointConnectionName: string,
      options?: PrivateEndpointConnectionOperationsGetByNameOptionalParams,
    ) => getByName(context, resourceGroupName, serviceName, privateEndpointConnectionName, options),
  };
}

export function _getPrivateEndpointConnectionOperationsOperations(
  context: ApiManagementContext,
): PrivateEndpointConnectionOperationsOperations {
  return {
    ..._getPrivateEndpointConnectionOperations(context),
  };
}
