// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DiscoveryContext } from "../../api/discoveryContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/storageContainers/operations.js";
import type {
  StorageContainersListBySubscriptionOptionalParams,
  StorageContainersListByResourceGroupOptionalParams,
  StorageContainersDeleteOptionalParams,
  StorageContainersUpdateOptionalParams,
  StorageContainersCreateOrUpdateOptionalParams,
  StorageContainersGetOptionalParams,
} from "../../api/storageContainers/options.js";
import type { StorageContainer, StorageContainerUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a StorageContainers operations. */
export interface StorageContainersOperations {
  /** List StorageContainer resources by subscription ID */
  listBySubscription: (
    options?: StorageContainersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<StorageContainer>;
  /** List StorageContainer resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: StorageContainersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<StorageContainer>;
  /** Delete a StorageContainer */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    storageContainerName: string,
    options?: StorageContainersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a StorageContainer */
  update: (
    resourceGroupName: string,
    storageContainerName: string,
    properties: StorageContainerUpdate,
    options?: StorageContainersUpdateOptionalParams,
  ) => PollerLike<OperationState<StorageContainer>, StorageContainer>;
  /** Create a StorageContainer */
  createOrUpdate: (
    resourceGroupName: string,
    storageContainerName: string,
    resource: StorageContainer,
    options?: StorageContainersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<StorageContainer>, StorageContainer>;
  /** Get a StorageContainer */
  get: (
    resourceGroupName: string,
    storageContainerName: string,
    options?: StorageContainersGetOptionalParams,
  ) => Promise<StorageContainer>;
}

function _getStorageContainers(context: DiscoveryContext) {
  return {
    listBySubscription: (options?: StorageContainersListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: StorageContainersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      storageContainerName: string,
      options?: StorageContainersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, storageContainerName, options),
    update: (
      resourceGroupName: string,
      storageContainerName: string,
      properties: StorageContainerUpdate,
      options?: StorageContainersUpdateOptionalParams,
    ) => update(context, resourceGroupName, storageContainerName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      storageContainerName: string,
      resource: StorageContainer,
      options?: StorageContainersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, storageContainerName, resource, options),
    get: (
      resourceGroupName: string,
      storageContainerName: string,
      options?: StorageContainersGetOptionalParams,
    ) => get(context, resourceGroupName, storageContainerName, options),
  };
}

export function _getStorageContainersOperations(
  context: DiscoveryContext,
): StorageContainersOperations {
  return {
    ..._getStorageContainers(context),
  };
}
