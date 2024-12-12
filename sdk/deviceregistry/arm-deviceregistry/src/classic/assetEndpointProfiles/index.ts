// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementContext } from "../../api/deviceRegistryManagementContext.js";
import {
  assetEndpointProfilesGet,
  assetEndpointProfilesCreateOrReplace,
  assetEndpointProfilesUpdate,
  assetEndpointProfilesDelete,
  assetEndpointProfilesListByResourceGroup,
  assetEndpointProfilesListBySubscription,
} from "../../api/assetEndpointProfiles/index.js";
import {
  AssetEndpointProfile,
  AssetEndpointProfileUpdate,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  AssetEndpointProfilesGetOptionalParams,
  AssetEndpointProfilesCreateOrReplaceOptionalParams,
  AssetEndpointProfilesUpdateOptionalParams,
  AssetEndpointProfilesDeleteOptionalParams,
  AssetEndpointProfilesListByResourceGroupOptionalParams,
  AssetEndpointProfilesListBySubscriptionOptionalParams,
} from "../../api/options.js";

/** Interface representing a AssetEndpointProfiles operations. */
export interface AssetEndpointProfilesOperations {
  /** Get a AssetEndpointProfile */
  get: (
    resourceGroupName: string,
    assetEndpointProfileName: string,
    options?: AssetEndpointProfilesGetOptionalParams,
  ) => Promise<AssetEndpointProfile>;
  /** Create a AssetEndpointProfile */
  createOrReplace: (
    resourceGroupName: string,
    assetEndpointProfileName: string,
    resource: AssetEndpointProfile,
    options?: AssetEndpointProfilesCreateOrReplaceOptionalParams,
  ) => PollerLike<OperationState<AssetEndpointProfile>, AssetEndpointProfile>;
  /** Update a AssetEndpointProfile */
  update: (
    resourceGroupName: string,
    assetEndpointProfileName: string,
    properties: AssetEndpointProfileUpdate,
    options?: AssetEndpointProfilesUpdateOptionalParams,
  ) => PollerLike<OperationState<AssetEndpointProfile>, AssetEndpointProfile>;
  /** Delete a AssetEndpointProfile */
  delete: (
    resourceGroupName: string,
    assetEndpointProfileName: string,
    options?: AssetEndpointProfilesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List AssetEndpointProfile resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AssetEndpointProfilesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<AssetEndpointProfile>;
  /** List AssetEndpointProfile resources by subscription ID */
  listBySubscription: (
    options?: AssetEndpointProfilesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<AssetEndpointProfile>;
}

export function getAssetEndpointProfiles(
  context: DeviceRegistryManagementContext,
  subscriptionId: string,
) {
  return {
    get: (
      resourceGroupName: string,
      assetEndpointProfileName: string,
      options?: AssetEndpointProfilesGetOptionalParams,
    ) =>
      assetEndpointProfilesGet(
        context,
        subscriptionId,
        resourceGroupName,
        assetEndpointProfileName,
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
        subscriptionId,
        resourceGroupName,
        assetEndpointProfileName,
        resource,
        options,
      ),
    update: (
      resourceGroupName: string,
      assetEndpointProfileName: string,
      properties: AssetEndpointProfileUpdate,
      options?: AssetEndpointProfilesUpdateOptionalParams,
    ) =>
      assetEndpointProfilesUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        assetEndpointProfileName,
        properties,
        options,
      ),
    delete: (
      resourceGroupName: string,
      assetEndpointProfileName: string,
      options?: AssetEndpointProfilesDeleteOptionalParams,
    ) =>
      assetEndpointProfilesDelete(
        context,
        subscriptionId,
        resourceGroupName,
        assetEndpointProfileName,
        options,
      ),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AssetEndpointProfilesListByResourceGroupOptionalParams,
    ) =>
      assetEndpointProfilesListByResourceGroup(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    listBySubscription: (
      options?: AssetEndpointProfilesListBySubscriptionOptionalParams,
    ) =>
      assetEndpointProfilesListBySubscription(context, subscriptionId, options),
  };
}

export function getAssetEndpointProfilesOperations(
  context: DeviceRegistryManagementContext,
  subscriptionId: string,
): AssetEndpointProfilesOperations {
  return {
    ...getAssetEndpointProfiles(context, subscriptionId),
  };
}
