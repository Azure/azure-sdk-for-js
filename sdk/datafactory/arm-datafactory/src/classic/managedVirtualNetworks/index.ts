// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataFactoryManagementContext } from "../../api/dataFactoryManagementContext.js";
import { listByFactory, createOrUpdate, get } from "../../api/managedVirtualNetworks/operations.js";
import type {
  ManagedVirtualNetworksListByFactoryOptionalParams,
  ManagedVirtualNetworksCreateOrUpdateOptionalParams,
  ManagedVirtualNetworksGetOptionalParams,
} from "../../api/managedVirtualNetworks/options.js";
import type { ManagedVirtualNetworkResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ManagedVirtualNetworks operations. */
export interface ManagedVirtualNetworksOperations {
  /** Lists managed Virtual Networks. */
  listByFactory: (
    resourceGroupName: string,
    factoryName: string,
    options?: ManagedVirtualNetworksListByFactoryOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedVirtualNetworkResource>;
  /** Creates or updates a managed Virtual Network. */
  createOrUpdate: (
    resourceGroupName: string,
    factoryName: string,
    managedVirtualNetworkName: string,
    managedVirtualNetwork: ManagedVirtualNetworkResource,
    options?: ManagedVirtualNetworksCreateOrUpdateOptionalParams,
  ) => Promise<ManagedVirtualNetworkResource>;
  /** Gets a managed Virtual Network. */
  get: (
    resourceGroupName: string,
    factoryName: string,
    managedVirtualNetworkName: string,
    options?: ManagedVirtualNetworksGetOptionalParams,
  ) => Promise<ManagedVirtualNetworkResource>;
}

function _getManagedVirtualNetworks(context: DataFactoryManagementContext) {
  return {
    listByFactory: (
      resourceGroupName: string,
      factoryName: string,
      options?: ManagedVirtualNetworksListByFactoryOptionalParams,
    ) => listByFactory(context, resourceGroupName, factoryName, options),
    createOrUpdate: (
      resourceGroupName: string,
      factoryName: string,
      managedVirtualNetworkName: string,
      managedVirtualNetwork: ManagedVirtualNetworkResource,
      options?: ManagedVirtualNetworksCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        factoryName,
        managedVirtualNetworkName,
        managedVirtualNetwork,
        options,
      ),
    get: (
      resourceGroupName: string,
      factoryName: string,
      managedVirtualNetworkName: string,
      options?: ManagedVirtualNetworksGetOptionalParams,
    ) => get(context, resourceGroupName, factoryName, managedVirtualNetworkName, options),
  };
}

export function _getManagedVirtualNetworksOperations(
  context: DataFactoryManagementContext,
): ManagedVirtualNetworksOperations {
  return {
    ..._getManagedVirtualNetworks(context),
  };
}
