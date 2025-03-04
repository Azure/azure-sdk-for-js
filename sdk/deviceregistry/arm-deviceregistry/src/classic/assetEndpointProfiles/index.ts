// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementContext } from "../../api/deviceRegistryManagementContext.js";
import {
  assetEndpointProfilesListBySubscription,
  assetEndpointProfilesListByResourceGroup,
  assetEndpointProfilesDelete,
  assetEndpointProfilesUpdate,
  assetEndpointProfilesCreateOrReplace,
  assetEndpointProfilesGet,
} from "../../api/assetEndpointProfiles/index.js";
import { AssetEndpointProfile, AssetEndpointProfileUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  AssetEndpointProfilesListBySubscriptionOptionalParams,
  AssetEndpointProfilesListByResourceGroupOptionalParams,
  AssetEndpointProfilesDeleteOptionalParams,
  AssetEndpointProfilesUpdateOptionalParams,
  AssetEndpointProfilesCreateOrReplaceOptionalParams,
  AssetEndpointProfilesGetOptionalParams,
} from "../../api/options.js";

/** Interface representing a AssetEndpointProfiles operations. */
export interface AssetEndpointProfilesOperations {
  /** List AssetEndpointProfile resources by subscription ID */
  listBySubscription: (
    options?: AssetEndpointProfilesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<AssetEndpointProfile>;
  /** List AssetEndpointProfile resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AssetEndpointProfilesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<AssetEndpointProfile>;
  /** Delete a AssetEndpointProfile */
  delete: (
    resourceGroupName: string,
    assetEndpointProfileName: string,
    options?: AssetEndpointProfilesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a AssetEndpointProfile */
  update: (
    resourceGroupName: string,
    assetEndpointProfileName: string,
    properties: AssetEndpointProfileUpdate,
    options?: AssetEndpointProfilesUpdateOptionalParams,
  ) => PollerLike<OperationState<AssetEndpointProfile>, AssetEndpointProfile>;
  /** Create a AssetEndpointProfile */
  createOrReplace: (
    resourceGroupName: string,
    assetEndpointProfileName: string,
    resource: AssetEndpointProfile,
    options?: AssetEndpointProfilesCreateOrReplaceOptionalParams,
  ) => PollerLike<OperationState<AssetEndpointProfile>, AssetEndpointProfile>;
  /** Get a AssetEndpointProfile */
  get: (
    resourceGroupName: string,
    assetEndpointProfileName: string,
    options?: AssetEndpointProfilesGetOptionalParams,
  ) => Promise<AssetEndpointProfile>;
}

function _getAssetEndpointProfiles(context: DeviceRegistryManagementContext) {
  return {
    listBySubscription: (options?: AssetEndpointProfilesListBySubscriptionOptionalParams) =>
      assetEndpointProfilesListBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AssetEndpointProfilesListByResourceGroupOptionalParams,
    ) => assetEndpointProfilesListByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      assetEndpointProfileName: string,
      options?: AssetEndpointProfilesDeleteOptionalParams,
    ) => assetEndpointProfilesDelete(context, resourceGroupName, assetEndpointProfileName, options),
    update: (
      resourceGroupName: string,
      assetEndpointProfileName: string,
      properties: AssetEndpointProfileUpdate,
      options?: AssetEndpointProfilesUpdateOptionalParams,
    ) =>
      assetEndpointProfilesUpdate(
        context,
        resourceGroupName,
        assetEndpointProfileName,
        properties,
        options,
      ),
    createOrReplace: (
      resourceGroupName: string,
      assetEndpointProfileName: string,
      resource: AssetEndpointProfile,
      options?: AssetEndpointProfilesCreateOrReplaceOptionalParams,
    ) =>
      assetEndpointProfilesCreateOrReplace(
        context,
        resourceGroupName,
        assetEndpointProfileName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      assetEndpointProfileName: string,
      options?: AssetEndpointProfilesGetOptionalParams,
    ) => assetEndpointProfilesGet(context, resourceGroupName, assetEndpointProfileName, options),
  };
}

export function _getAssetEndpointProfilesOperations(
  context: DeviceRegistryManagementContext,
): AssetEndpointProfilesOperations {
  return {
    ..._getAssetEndpointProfiles(context),
  };
}
