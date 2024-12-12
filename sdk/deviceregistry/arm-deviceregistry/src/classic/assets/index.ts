// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementContext } from "../../api/deviceRegistryManagementContext.js";
import {
  assetsGet,
  assetsCreateOrReplace,
  assetsUpdate,
  assetsDelete,
  assetsListByResourceGroup,
  assetsListBySubscription,
} from "../../api/assets/index.js";
import { Asset, AssetUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  AssetsGetOptionalParams,
  AssetsCreateOrReplaceOptionalParams,
  AssetsUpdateOptionalParams,
  AssetsDeleteOptionalParams,
  AssetsListByResourceGroupOptionalParams,
  AssetsListBySubscriptionOptionalParams,
} from "../../api/options.js";

/** Interface representing a Assets operations. */
export interface AssetsOperations {
  /** Get a Asset */
  get: (
    resourceGroupName: string,
    assetName: string,
    options?: AssetsGetOptionalParams,
  ) => Promise<Asset>;
  /** Create a Asset */
  createOrReplace: (
    resourceGroupName: string,
    assetName: string,
    resource: Asset,
    options?: AssetsCreateOrReplaceOptionalParams,
  ) => PollerLike<OperationState<Asset>, Asset>;
  /** Update a Asset */
  update: (
    resourceGroupName: string,
    assetName: string,
    properties: AssetUpdate,
    options?: AssetsUpdateOptionalParams,
  ) => PollerLike<OperationState<Asset>, Asset>;
  /** Delete a Asset */
  delete: (
    resourceGroupName: string,
    assetName: string,
    options?: AssetsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List Asset resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AssetsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Asset>;
  /** List Asset resources by subscription ID */
  listBySubscription: (
    options?: AssetsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Asset>;
}

export function getAssets(
  context: DeviceRegistryManagementContext,
  subscriptionId: string,
) {
  return {
    get: (
      resourceGroupName: string,
      assetName: string,
      options?: AssetsGetOptionalParams,
    ) =>
      assetsGet(context, subscriptionId, resourceGroupName, assetName, options),
    createOrReplace: (
      resourceGroupName: string,
      assetName: string,
      resource: Asset,
      options?: AssetsCreateOrReplaceOptionalParams,
    ) =>
      assetsCreateOrReplace(
        context,
        subscriptionId,
        resourceGroupName,
        assetName,
        resource,
        options,
      ),
    update: (
      resourceGroupName: string,
      assetName: string,
      properties: AssetUpdate,
      options?: AssetsUpdateOptionalParams,
    ) =>
      assetsUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        assetName,
        properties,
        options,
      ),
    delete: (
      resourceGroupName: string,
      assetName: string,
      options?: AssetsDeleteOptionalParams,
    ) =>
      assetsDelete(
        context,
        subscriptionId,
        resourceGroupName,
        assetName,
        options,
      ),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AssetsListByResourceGroupOptionalParams,
    ) =>
      assetsListByResourceGroup(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    listBySubscription: (options?: AssetsListBySubscriptionOptionalParams) =>
      assetsListBySubscription(context, subscriptionId, options),
  };
}

export function getAssetsOperations(
  context: DeviceRegistryManagementContext,
  subscriptionId: string,
): AssetsOperations {
  return {
    ...getAssets(context, subscriptionId),
  };
}
