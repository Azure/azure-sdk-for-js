// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkContext } from "../../api/networkContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  update,
  $delete,
  createOrUpdate,
  get,
} from "../../api/profiles/operations.js";
import type {
  ProfilesListBySubscriptionOptionalParams,
  ProfilesListByResourceGroupOptionalParams,
  ProfilesUpdateOptionalParams,
  ProfilesDeleteOptionalParams,
  ProfilesCreateOrUpdateOptionalParams,
  ProfilesGetOptionalParams,
} from "../../api/profiles/options.js";
import type {
  PrivateTrafficManagerProfile,
  PrivateTrafficManagerProfileUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Profiles operations. */
export interface ProfilesOperations {
  /** Lists all Private Traffic Manager profiles within a subscription. */
  listBySubscription: (
    options?: ProfilesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateTrafficManagerProfile>;
  /** Lists all Private Traffic Manager profiles within a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ProfilesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateTrafficManagerProfile>;
  /** Updates a Traffic Manager profile. */
  update: (
    resourceGroupName: string,
    privateTrafficManagerProfileName: string,
    properties: PrivateTrafficManagerProfileUpdate,
    options?: ProfilesUpdateOptionalParams,
  ) => PollerLike<OperationState<PrivateTrafficManagerProfile>, PrivateTrafficManagerProfile>;
  /** Deletes a Private Traffic Manager profile. */
  delete: (
    resourceGroupName: string,
    privateTrafficManagerProfileName: string,
    options?: ProfilesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update a Private Traffic Manager profile. */
  createOrUpdate: (
    resourceGroupName: string,
    privateTrafficManagerProfileName: string,
    resource: PrivateTrafficManagerProfile,
    options?: ProfilesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PrivateTrafficManagerProfile>, PrivateTrafficManagerProfile>;
  /** Gets a Private Traffic Manager profile. */
  get: (
    resourceGroupName: string,
    privateTrafficManagerProfileName: string,
    options?: ProfilesGetOptionalParams,
  ) => Promise<PrivateTrafficManagerProfile>;
}

function _getProfiles(context: NetworkContext) {
  return {
    listBySubscription: (options?: ProfilesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ProfilesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    update: (
      resourceGroupName: string,
      privateTrafficManagerProfileName: string,
      properties: PrivateTrafficManagerProfileUpdate,
      options?: ProfilesUpdateOptionalParams,
    ) => update(context, resourceGroupName, privateTrafficManagerProfileName, properties, options),
    delete: (
      resourceGroupName: string,
      privateTrafficManagerProfileName: string,
      options?: ProfilesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, privateTrafficManagerProfileName, options),
    createOrUpdate: (
      resourceGroupName: string,
      privateTrafficManagerProfileName: string,
      resource: PrivateTrafficManagerProfile,
      options?: ProfilesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        privateTrafficManagerProfileName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      privateTrafficManagerProfileName: string,
      options?: ProfilesGetOptionalParams,
    ) => get(context, resourceGroupName, privateTrafficManagerProfileName, options),
  };
}

export function _getProfilesOperations(context: NetworkContext): ProfilesOperations {
  return {
    ..._getProfiles(context),
  };
}
