// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementContext } from "../../api/deviceRegistryManagementContext.js";
import {
  discoveredAssetsGet,
  discoveredAssetsCreateOrReplace,
  discoveredAssetsUpdate,
  discoveredAssetsDelete,
  discoveredAssetsListByResourceGroup,
  discoveredAssetsListBySubscription,
} from "../../api/discoveredAssets/index.js";
import {
  DiscoveredAssetsGetOptionalParams,
  DiscoveredAssetsCreateOrReplaceOptionalParams,
  DiscoveredAssetsUpdateOptionalParams,
  DiscoveredAssetsDeleteOptionalParams,
  DiscoveredAssetsListByResourceGroupOptionalParams,
  DiscoveredAssetsListBySubscriptionOptionalParams,
} from "../../api/options.js";
import { DiscoveredAsset, DiscoveredAssetUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DiscoveredAssets operations. */
export interface DiscoveredAssetsOperations {
  /** Get a DiscoveredAsset */
  get: (
    resourceGroupName: string,
    discoveredAssetName: string,
    options?: DiscoveredAssetsGetOptionalParams,
  ) => Promise<DiscoveredAsset>;
  /** Create a DiscoveredAsset */
  createOrReplace: (
    resourceGroupName: string,
    discoveredAssetName: string,
    resource: DiscoveredAsset,
    options?: DiscoveredAssetsCreateOrReplaceOptionalParams,
  ) => PollerLike<OperationState<DiscoveredAsset>, DiscoveredAsset>;
  /** Update a DiscoveredAsset */
  update: (
    resourceGroupName: string,
    discoveredAssetName: string,
    properties: DiscoveredAssetUpdate,
    options?: DiscoveredAssetsUpdateOptionalParams,
  ) => PollerLike<OperationState<DiscoveredAsset>, DiscoveredAsset>;
  /** Delete a DiscoveredAsset */
  delete: (
    resourceGroupName: string,
    discoveredAssetName: string,
    options?: DiscoveredAssetsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List DiscoveredAsset resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: DiscoveredAssetsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DiscoveredAsset>;
  /** List DiscoveredAsset resources by subscription ID */
  listBySubscription: (
    options?: DiscoveredAssetsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<DiscoveredAsset>;
}

export function getDiscoveredAssets(
  context: DeviceRegistryManagementContext,
  subscriptionId: string,
) {
  return {
    get: (
      resourceGroupName: string,
      discoveredAssetName: string,
      options?: DiscoveredAssetsGetOptionalParams,
    ) =>
      discoveredAssetsGet(
        context,
        subscriptionId,
        resourceGroupName,
        discoveredAssetName,
        options,
      ),
    createOrReplace: (
      resourceGroupName: string,
      discoveredAssetName: string,
      resource: DiscoveredAsset,
      options?: DiscoveredAssetsCreateOrReplaceOptionalParams,
    ) =>
      discoveredAssetsCreateOrReplace(
        context,
        subscriptionId,
        resourceGroupName,
        discoveredAssetName,
        resource,
        options,
      ),
    update: (
      resourceGroupName: string,
      discoveredAssetName: string,
      properties: DiscoveredAssetUpdate,
      options?: DiscoveredAssetsUpdateOptionalParams,
    ) =>
      discoveredAssetsUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        discoveredAssetName,
        properties,
        options,
      ),
    delete: (
      resourceGroupName: string,
      discoveredAssetName: string,
      options?: DiscoveredAssetsDeleteOptionalParams,
    ) =>
      discoveredAssetsDelete(
        context,
        subscriptionId,
        resourceGroupName,
        discoveredAssetName,
        options,
      ),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: DiscoveredAssetsListByResourceGroupOptionalParams,
    ) =>
      discoveredAssetsListByResourceGroup(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    listBySubscription: (
      options?: DiscoveredAssetsListBySubscriptionOptionalParams,
    ) => discoveredAssetsListBySubscription(context, subscriptionId, options),
  };
}

export function getDiscoveredAssetsOperations(
  context: DeviceRegistryManagementContext,
  subscriptionId: string,
): DiscoveredAssetsOperations {
  return {
    ...getDiscoveredAssets(context, subscriptionId),
  };
}
