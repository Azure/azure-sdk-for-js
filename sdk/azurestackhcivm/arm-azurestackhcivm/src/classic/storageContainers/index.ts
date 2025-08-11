// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import {
  listAll,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/storageContainers/operations.js";
import {
  StorageContainersListAllOptionalParams,
  StorageContainersListByResourceGroupOptionalParams,
  StorageContainersDeleteOptionalParams,
  StorageContainersUpdateOptionalParams,
  StorageContainersCreateOrUpdateOptionalParams,
  StorageContainersGetOptionalParams,
} from "../../api/storageContainers/options.js";
import { StorageContainer, StorageContainerTagsUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a StorageContainers operations. */
export interface StorageContainersOperations {
  /** Lists all of the storage containers in the specified subscription. Use the nextLink property in the response to get the next page of storage containers. */
  listAll: (
    options?: StorageContainersListAllOptionalParams,
  ) => PagedAsyncIterableIterator<StorageContainer>;
  /** Lists all of the storage containers in the specified resource group. Use the nextLink property in the response to get the next page of storage containers. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: StorageContainersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<StorageContainer>;
  /** The operation to delete a storage container. */
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
  /** The operation to update a storage container. */
  update: (
    resourceGroupName: string,
    storageContainerName: string,
    properties: StorageContainerTagsUpdate,
    options?: StorageContainersUpdateOptionalParams,
  ) => PollerLike<OperationState<StorageContainer>, StorageContainer>;
  /** The operation to create or update a storage container. Please note some properties can be set only during storage container creation. */
  createOrUpdate: (
    resourceGroupName: string,
    storageContainerName: string,
    resource: StorageContainer,
    options?: StorageContainersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<StorageContainer>, StorageContainer>;
  /** Gets a storage container */
  get: (
    resourceGroupName: string,
    storageContainerName: string,
    options?: StorageContainersGetOptionalParams,
  ) => Promise<StorageContainer>;
}

function _getStorageContainers(context: AzureStackHCIContext) {
  return {
    listAll: (options?: StorageContainersListAllOptionalParams) => listAll(context, options),
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
      properties: StorageContainerTagsUpdate,
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
  context: AzureStackHCIContext,
): StorageContainersOperations {
  return {
    ..._getStorageContainers(context),
  };
}
