// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeviceRegistryManagementContext } from "../../api/deviceRegistryManagementContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrReplace,
  get,
} from "../../api/assets/operations.js";
import type {
  AssetsListBySubscriptionOptionalParams,
  AssetsListByResourceGroupOptionalParams,
  AssetsDeleteOptionalParams,
  AssetsUpdateOptionalParams,
  AssetsCreateOrReplaceOptionalParams,
  AssetsGetOptionalParams,
} from "../../api/assets/options.js";
import type { Asset, AssetUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

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
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
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
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AssetsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (resourceGroupName: string, assetName: string, options?: AssetsDeleteOptionalParams) =>
      $delete(context, resourceGroupName, assetName, options),
    update: (
      resourceGroupName: string,
      assetName: string,
      properties: AssetUpdate,
      options?: AssetsUpdateOptionalParams,
    ) => update(context, resourceGroupName, assetName, properties, options),
    createOrReplace: (
      resourceGroupName: string,
      assetName: string,
      resource: Asset,
      options?: AssetsCreateOrReplaceOptionalParams,
    ) => createOrReplace(context, resourceGroupName, assetName, resource, options),
    get: (resourceGroupName: string, assetName: string, options?: AssetsGetOptionalParams) =>
      get(context, resourceGroupName, assetName, options),
  };
}

export function _getAssetsOperations(context: DeviceRegistryManagementContext): AssetsOperations {
  return {
    ..._getAssets(context),
  };
}
