// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementContext } from "../../api/deviceRegistryManagementContext.js";
import {
  assetsListBySubscription,
  assetsListByResourceGroup,
  assetsDelete,
  assetsUpdate,
  assetsCreateOrReplace,
  assetsGet,
} from "../../api/assets/index.js";
import { Asset, AssetUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  AssetsListBySubscriptionOptionalParams,
  AssetsListByResourceGroupOptionalParams,
  AssetsDeleteOptionalParams,
  AssetsUpdateOptionalParams,
  AssetsCreateOrReplaceOptionalParams,
  AssetsGetOptionalParams,
} from "../../api/options.js";

/** Interface representing a Assets operations. */
export interface AssetsOperations {
  /** List Asset resources by subscription ID */
  listBySubscription: (
    options?: AssetsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Asset>;
  /** List Asset resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AssetsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Asset>;
  /** Delete a Asset */
  delete: (
    resourceGroupName: string,
    assetName: string,
    options?: AssetsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a Asset */
  update: (
    resourceGroupName: string,
    assetName: string,
    properties: AssetUpdate,
    options?: AssetsUpdateOptionalParams,
  ) => PollerLike<OperationState<Asset>, Asset>;
  /** Create a Asset */
  createOrReplace: (
    resourceGroupName: string,
    assetName: string,
    resource: Asset,
    options?: AssetsCreateOrReplaceOptionalParams,
  ) => PollerLike<OperationState<Asset>, Asset>;
  /** Get a Asset */
  get: (
    resourceGroupName: string,
    assetName: string,
    options?: AssetsGetOptionalParams,
  ) => Promise<Asset>;
}

function _getAssets(context: DeviceRegistryManagementContext) {
  return {
    listBySubscription: (options?: AssetsListBySubscriptionOptionalParams) =>
      assetsListBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AssetsListByResourceGroupOptionalParams,
    ) => assetsListByResourceGroup(context, resourceGroupName, options),
    delete: (resourceGroupName: string, assetName: string, options?: AssetsDeleteOptionalParams) =>
      assetsDelete(context, resourceGroupName, assetName, options),
    update: (
      resourceGroupName: string,
      assetName: string,
      properties: AssetUpdate,
      options?: AssetsUpdateOptionalParams,
    ) => assetsUpdate(context, resourceGroupName, assetName, properties, options),
    createOrReplace: (
      resourceGroupName: string,
      assetName: string,
      resource: Asset,
      options?: AssetsCreateOrReplaceOptionalParams,
    ) => assetsCreateOrReplace(context, resourceGroupName, assetName, resource, options),
    get: (resourceGroupName: string, assetName: string, options?: AssetsGetOptionalParams) =>
      assetsGet(context, resourceGroupName, assetName, options),
  };
}

export function _getAssetsOperations(context: DeviceRegistryManagementContext): AssetsOperations {
  return {
    ..._getAssets(context),
  };
}
