// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryContext } from "../../api/discoveryContext.js";
import {
  listByStorageContainer,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/storageAssets/operations.js";
import {
  StorageAssetsListByStorageContainerOptionalParams,
  StorageAssetsDeleteOptionalParams,
  StorageAssetsUpdateOptionalParams,
  StorageAssetsCreateOrUpdateOptionalParams,
  StorageAssetsGetOptionalParams,
} from "../../api/storageAssets/options.js";
import { StorageAsset } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a StorageAssets operations. */
export interface StorageAssetsOperations {
  /** List StorageAsset resources by StorageContainer */
  listByStorageContainer: (
    resourceGroupName: string,
    storageContainerName: string,
    options?: StorageAssetsListByStorageContainerOptionalParams,
  ) => PagedAsyncIterableIterator<StorageAsset>;
  /** Delete a StorageAsset */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    storageContainerName: string,
    storageAssetName: string,
    options?: StorageAssetsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a StorageAsset */
  update: (
    resourceGroupName: string,
    storageContainerName: string,
    storageAssetName: string,
    properties: StorageAsset,
    options?: StorageAssetsUpdateOptionalParams,
  ) => PollerLike<OperationState<StorageAsset>, StorageAsset>;
  /** Create a StorageAsset */
  createOrUpdate: (
    resourceGroupName: string,
    storageContainerName: string,
    storageAssetName: string,
    resource: StorageAsset,
    options?: StorageAssetsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<StorageAsset>, StorageAsset>;
  /** Get a StorageAsset */
  get: (
    resourceGroupName: string,
    storageContainerName: string,
    storageAssetName: string,
    options?: StorageAssetsGetOptionalParams,
  ) => Promise<StorageAsset>;
}

function _getStorageAssets(context: DiscoveryContext) {
  return {
    listByStorageContainer: (
      resourceGroupName: string,
      storageContainerName: string,
      options?: StorageAssetsListByStorageContainerOptionalParams,
    ) => listByStorageContainer(context, resourceGroupName, storageContainerName, options),
    delete: (
      resourceGroupName: string,
      storageContainerName: string,
      storageAssetName: string,
      options?: StorageAssetsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, storageContainerName, storageAssetName, options),
    update: (
      resourceGroupName: string,
      storageContainerName: string,
      storageAssetName: string,
      properties: StorageAsset,
      options?: StorageAssetsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        storageContainerName,
        storageAssetName,
        properties,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      storageContainerName: string,
      storageAssetName: string,
      resource: StorageAsset,
      options?: StorageAssetsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        storageContainerName,
        storageAssetName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      storageContainerName: string,
      storageAssetName: string,
      options?: StorageAssetsGetOptionalParams,
    ) => get(context, resourceGroupName, storageContainerName, storageAssetName, options),
  };
}

export function _getStorageAssetsOperations(context: DiscoveryContext): StorageAssetsOperations {
  return {
    ..._getStorageAssets(context),
  };
}
