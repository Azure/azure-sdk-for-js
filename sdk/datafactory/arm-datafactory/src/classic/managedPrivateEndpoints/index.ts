// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementContext } from "../../api/dataFactoryManagementContext.js";
import {
  listByFactory,
  $delete,
  createOrUpdate,
  get,
} from "../../api/managedPrivateEndpoints/operations.js";
import {
  ManagedPrivateEndpointsListByFactoryOptionalParams,
  ManagedPrivateEndpointsDeleteOptionalParams,
  ManagedPrivateEndpointsCreateOrUpdateOptionalParams,
  ManagedPrivateEndpointsGetOptionalParams,
} from "../../api/managedPrivateEndpoints/options.js";
import { ManagedPrivateEndpointResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ManagedPrivateEndpoints operations. */
export interface ManagedPrivateEndpointsOperations {
  /** Lists managed private endpoints. */
  listByFactory: (
    resourceGroupName: string,
    factoryName: string,
    managedVirtualNetworkName: string,
    options?: ManagedPrivateEndpointsListByFactoryOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedPrivateEndpointResource>;
  /** Deletes a managed private endpoint. */
  delete: (
    resourceGroupName: string,
    factoryName: string,
    managedVirtualNetworkName: string,
    managedPrivateEndpointName: string,
    options?: ManagedPrivateEndpointsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a managed private endpoint. */
  createOrUpdate: (
    resourceGroupName: string,
    factoryName: string,
    managedVirtualNetworkName: string,
    managedPrivateEndpointName: string,
    managedPrivateEndpoint: ManagedPrivateEndpointResource,
    options?: ManagedPrivateEndpointsCreateOrUpdateOptionalParams,
  ) => Promise<ManagedPrivateEndpointResource>;
  /** Gets a managed private endpoint. */
  get: (
    resourceGroupName: string,
    factoryName: string,
    managedVirtualNetworkName: string,
    managedPrivateEndpointName: string,
    options?: ManagedPrivateEndpointsGetOptionalParams,
  ) => Promise<ManagedPrivateEndpointResource>;
}

function _getManagedPrivateEndpoints(context: DataFactoryManagementContext) {
  return {
    listByFactory: (
      resourceGroupName: string,
      factoryName: string,
      managedVirtualNetworkName: string,
      options?: ManagedPrivateEndpointsListByFactoryOptionalParams,
    ) => listByFactory(context, resourceGroupName, factoryName, managedVirtualNetworkName, options),
    delete: (
      resourceGroupName: string,
      factoryName: string,
      managedVirtualNetworkName: string,
      managedPrivateEndpointName: string,
      options?: ManagedPrivateEndpointsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        factoryName,
        managedVirtualNetworkName,
        managedPrivateEndpointName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      factoryName: string,
      managedVirtualNetworkName: string,
      managedPrivateEndpointName: string,
      managedPrivateEndpoint: ManagedPrivateEndpointResource,
      options?: ManagedPrivateEndpointsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        factoryName,
        managedVirtualNetworkName,
        managedPrivateEndpointName,
        managedPrivateEndpoint,
        options,
      ),
    get: (
      resourceGroupName: string,
      factoryName: string,
      managedVirtualNetworkName: string,
      managedPrivateEndpointName: string,
      options?: ManagedPrivateEndpointsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        factoryName,
        managedVirtualNetworkName,
        managedPrivateEndpointName,
        options,
      ),
  };
}

export function _getManagedPrivateEndpointsOperations(
  context: DataFactoryManagementContext,
): ManagedPrivateEndpointsOperations {
  return {
    ..._getManagedPrivateEndpoints(context),
  };
}
